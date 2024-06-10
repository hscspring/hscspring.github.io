---
title: Transformer 代码笔记
date: 2020-04-23 23:00:00
categories: Feeling
tags: [NLP, Attention, Transformer, Multi-Head Attention, Self-Attention, Encoder, Decoder]
mathjax: true
---

之前写过一篇关于 [Attention Is All You Need](https://arxiv.org/pdf/1706.03762.pdf) 的 [论文笔记](https://yam.gift/2019/08/04/Paper/2019-08-04-Transformer-Paper/)，不过那时候写的笔记都没有深入 Code 环节，再加上其实已经有了一篇 [The Annotated Transformer](http://nlp.seas.harvard.edu/2018/04/03/attention.html)，也没必要做重复工作。不过现在 Transformer 已经大放异彩到几乎成为了标准配件，所以觉得有必要单独拿出来就组件角度再次学习一遍，于是就有了这篇文章。

本文代码主要基于 [OpenNMT](https://github.com/OpenNMT/OpenNMT-py)，另外也参考了一点 [fairseq](https://github.com/pytorch/fairseq)，这俩都是 PyTorch 实现的。Tensorflow 实现的版本相对更多一些，详见 Appendix 部分。

<!--more-->

Transformer 中，无论 Encoder 还是 Decoder，Self-Attention 都是一个更加基础的组件，除此之外还有一个 PositionEncoder。我们就先看一下这两个更基础的组件，然后再分别学习 Encoder 和 Decoder。

## Multi-Head Attention

以下代码来自 OpenMNT，先看模型的定义（为了便于理解，做了部分删减和调整）：

```python
# From https://github.com/OpenNMT/OpenNMT-py
class MultiHeadedAttention(nn.Module):
    def __init__(self, head_count, model_dim, dropout=0.1):
        assert model_dim % head_count == 0
        self.dim_per_head = model_dim // head_count
        self.model_dim = model_dim

        super(MultiHeadedAttention, self).__init__()
        self.head_count = head_count

        self.linear_keys = nn.Linear(model_dim, head_count * self.dim_per_head)
        self.linear_values = nn.Linear(model_dim, head_count * self.dim_per_head)
        self.linear_query = nn.Linear(model_dim, head_count * self.dim_per_head)
        self.softmax = nn.Softmax(dim=-1)
        self.dropout = nn.Dropout(dropout)
        self.final_linear = nn.Linear(model_dim, model_dim)
```

可以看出这其实就是对 model_dim 做了拆分，比如你的输入是一个 `(batch_size, seq_length, embed_dim)` 的 Tensor，这里其实就是对 embed_dim 按指定的 head_count 做了拆分，拆成了三个部分，也就是所谓 Self-attention（自注意力）。

接下来是重要的 forward：

```python
def forward(self, key, value, query, mask=None):
    batch_size = key.size(0)
    dim_per_head = self.dim_per_head
    head_count = self.head_count
    key_len = key.size(1)
    query_len = query.size(1)

    def shape(x):
        """Projection."""
        return x.view(
            batch_size, -1, head_count, dim_per_head).transpose(1, 2)

    def unshape(x):
        """Compute context."""
        return x.transpose(1, 2).contiguous().view(
            batch_size, -1, head_count * dim_per_head)
    
    # 1) Project key, value, and query.
    # (batch_size, seq_len, head_count * dim_per_head)
    key = self.linear_keys(key)
    value = self.linear_values(value)
    query = self.linear_query(query)
    # (batch_size, head_count, seq_len, dim_per_head)
    key = shape(key)
    value = shape(value)
    query = shape(query)

    key_len = key.size(2)
    query_len = query.size(2)

    # 2) Calculate and scale scores. (q·k^t)/sqrt(d_k)
    # **Scaled Dot-Product Attention**
    query = query / math.sqrt(dim_per_head)
    # (batch_size, head_count, seq_len, dim_per_head) * (batch_size, head_count, dim_per_head, seq_len)
    #  => (batch_size, head_count, query_len, key_len)
    query_key = torch.matmul(query, key.transpose(2, 3))
    scores = query_key
    scores = scores.float()
    
    if mask is not None:
        mask = mask.unsqueeze(1)  # (batch_size, 1, 1, seq_len)
        scores = scores.masked_fill(mask, -1e18)
    
    # 3) Apply attention dropout and compute context vectors.
    attn = self.softmax(scores).to(query.dtype)
    drop_attn = self.dropout(attn)
    # (batch_size, head_count, seq_len, dim_per_head)
    context_original = torch.matmul(drop_attn, value)
    # **concat**: (batch_size, seq_len, head_count * dim_per_head)
    context = unshape(context_original)
    # (batch_size, seq_len, model_dim)
    output = self.final_linear(context)

    # Return multi-head attn
    # (batch_size, head_count, query_len, key_len)
    attns = attn.view(batch_size, head_count, query_len, key_len)
    return output, attns
```

归纳一下步骤：

- 线性变换后把输入的维度（`head_count * dim_per_head`）展开。

- 根据以下公式计算 Attention，Softmax 是返回的 Attention，它的维度为：`(batch_size, head_count, seq_len, dim_per_head)`。

    $$
    \text { Attention }(Q, K, V)=\operatorname{softmax}\left(\frac{Q K^{T}}{\sqrt{d_{k}}}\right) V
    $$

- Attention 经过 dropout 后与 V 相乘得到 context，它的维度为：`(batch_size, head_count, seq_len, dim_per_head)`，还原后经过线性变换作为 output 输出，其维度与输入的 qkv 维度一致。

这么一看它的思想并不复杂，其实就是把输入的 Query，Key 和 Value 变为 Value 的加权（Attention）结果，权重来自 Q 和 K。为了进一步理解，我们可以假设 head_count = 1，其实它的本质就是 K 和 Q 矩阵乘法 Softmax 后得到 Attention，然后与 V 相乘后得到加权后的 context，再线性变换得到 output。

这个思想和最一开始的 Attention 是类似的，不同的是之前的 Attention 是根据 Encoder 的 output 和 Decoder 每个 time step 的 output 去计算的；而 Self-attention 是根据 K 和 Q 计算的，K 和 Q 有几种不同的用法，其实是包括了之前的 Attention：

- query 来自上一个 Decoder layer，memory keys 和 values 来自 Encoder 的 output，可以参考 [Luong Attention](https://yam.gift/2020/04/14/Paper/2020-04-14-Luong-Attention/)。
- Encoder 包含 Self-attention，key value 和 query 来自相同的位置，即前一层的输出。Encoder 的每个位置都可以注意到前一层的所有位置。
- Decoder 与 Encoder 类似，不同的是需要将所有不合法连接 mask 以防止左边信息溢出，这里应该是因为 Decoder 时后面的 Token 还没有生成，自然不能用来计算 Attention。

这让 Attention 这种机制更加普遍，有没有更加理解那个标题《Attention Is All You Need》。作者当时的想法可能是，既然能够通过 Encoder 的 Output 来计算 Attention 权重，那是不是也可以根据 Encoder（或 Decoder）的前一层来计算下一层的 “Attention” 权重呢，于是就有了这篇文章。

再抽象一点去思考，其实它就是利用已有信息去计算一个更加 “好” 的 Context 表示。这也给了我们一点启示，一些好的机制是不是也可以迁移到更泛的领域呢？Transformer 的这种机制可以说是里程碑式的创新和进步，它采用了和 RNN 完全不同的建模机制，相比 RNN 的按 token 粒度切分，它从 Hidden 的粒度去切分，达到了相当的效果，训练过程却更加高效。自然这种建模方式也可以同时按 token 粒度切分去构建语言模型（比如 GPT-2），其实也就是上面的第三种用法。

## Position Encoder

位置编码主要用于对位置不敏感的模型，所以 Transformer 是需要的，最常见的就是绝对位置编码，可以把索引作为编码，或者随机初始化让模型自己学习。一般位置编码会加在 WordEmbedding 上。

Transformer 中使用了相对位置编码中一种称为 Sinusoidal Positional Encoding 的技术：
$$
\begin{aligned} P E_{(p o s, 2 i)} &=\sin \left(\operatorname{pos} / 10000^{2 i / d_{\text { model }}}\right) \\ P E_{(p o s, 2 i+1)} &=\cos \left(\operatorname{pos} / 10000^{2 i / d_{\text { model }} }\right)\end{aligned}
$$
其中，pos 是位置，i 是维度。

```python
# From https://github.com/OpenNMT/OpenNMT-py
class PositionalEncoding(nn.Module):
    def __init__(self, dropout, dim, max_len=5000):
        # (max_len, dim)
        pe = torch.zeros(max_len, dim)
        # (max_len, 1)
        position = torch.arange(0, max_len).unsqueeze(1)
        # (dim/2)，式子括号里分母
        div_term = torch.exp(
            (torch.arange(0, dim, 2, dtype=torch.float) * -(math.log(10000.0) / dim)))
        # (max_len, dim/2)，0,2,4... 列
        pe[:, 0::2] = torch.sin(position.float() * div_term)
        # (max_len, dim/2)，1,3,5... 列
        pe[:, 1::2] = torch.cos(position.float() * div_term)
        # (max_len, 1, dim)
        pe = pe.unsqueeze(1)
        super(PositionalEncoding, self).__init__()
        self.dropout = nn.Dropout(p=dropout)
        self.dim = dim
    def forward(self, emb, step=None):
        """Embed inputs.
        Args:
            emb (FloatTensor): Sequence of word vectors
                ``(seq_len, batch_size, self.dim)``
            step (int or NoneType): If stepwise (``seq_len = 1``), use
                the encoding for this position.
        """
        emb = emb * math.sqrt(self.dim)
        if step is None:
            # 给 emd 加 position encoding
            emb = emb + self.pe[:emb.size(0)]
        else:
            emb = emb + self.pe[step]
        emb = self.dropout(emb)
        return emb
```

有些代码 emb 的 batch_size 在前，此时只要 `pe.unsqueeze(0)` 即可。此外，论文里提到的 [这篇文章](https://arxiv.org/pdf/1705.03122.pdf) 有其他一些位置编码技术可以参考。

## Transformer Encoder

Encoder 是由 N 个 Encoder Layer 组成，它的实现也比较简单：

```python
# From https://github.com/OpenNMT/OpenNMT-py
class TransformerEncoder(EncoderBase):
    """
    Args:
        num_layers (int): number of encoder layers
        d_model (int): size of the model
        heads (int): number of heads
        d_ff (int): size of the inner FF layer
        dropout (float): dropout parameters
        embeddings (onmt.modules.Embeddings):
          embeddings to use, should have positional encodings
    Returns:
        (torch.FloatTensor, torch.FloatTensor):
        * embeddings ``(src_len, batch_size, model_dim)``
        * memory_bank ``(src_len, batch_size, model_dim)``
    """
    def __init__(self, num_layers, d_model, heads, d_ff, dropout,
                 attention_dropout, embeddings):
        super(TransformerEncoder, self).__init__()

        self.embeddings = embeddings
        self.transformer = nn.ModuleList(
            [TransformerEncoderLayer(d_model, heads, d_ff, dropout, attention_dropout)
             for i in range(num_layers)])
        self.layer_norm = nn.LayerNorm(d_model, eps=1e-6)
    def forward(self, src, lengths):
        # (seq_len, batch_size, embedding_size)
        emb = self.embeddings(src)
        # (batch_size, seq_len, embedding_size)
        out = emb.transpose(0, 1).contiguous()
        # lengths: (batch_size, )
        # (batch_size, 1, seq_len)
        mask = ~sequence_mask(lengths).unsqueeze(1)
        for layer in self.transformer:
            out = layer(out, mask)
        out = self.layer_norm(out)
        return emb, out.transpose(0, 1).contiguous(), lengths
```

Encoder 就是几个 EncoderLayer，在看 Layer 之前，提一下这个 mask，这里的 mask 其实是根据你输入 batch 中 sequence 的长度对 pad 部分进行 mask，因为 padding 部分其实是无意义的，所以这里会被设置为一个很小的负数。还是举个例子：

```python
# 样例数据 (seq_len, batch_size)
{'source_var': tensor([
    [  11,   48,    4,   32],
    [  49, 2573,   54,   17],
    [1186,  637, 3453, 1159],
    [  52,  747,    7,    7],
    [ 164,    7,    3,    3],
    [1187,    3,    0,    0],
    [ 128,    0,    0,    0],
    [1188,    0,    0,    0],
    [   7,    0,    0,    0],
    [   3,    0,    0,    0]]),
 'source_lengths': [10, 6, 5, 5]
}
# 返回的 mask 为 (batch_size, 1, 1, seq_len)
tensor([[[False, False, False, False, False, False, False, False, False, False]],

        [[False, False, False, False, False, False,  True,  True,  True,  True]],

        [[False, False, False, False, False,  True,  True,  True,  True,  True]],

        [[False, False, False, False, False,  True,  True,  True,  True,  True]]])
```

上面的 `out` 和 `mask` 都会传入 TransformerEncoderLayer：

```python
# From https://github.com/OpenNMT/OpenNMT-py
class TransformerEncoderLayer(nn.Module):
    """
    A single layer of the transformer encoder.
    Args:
        d_model (int): the dimension of keys/values/queries in
                   MultiHeadedAttention, also the input size of
                   the first-layer of the PositionwiseFeedForward.
        heads (int): the number of head for MultiHeadedAttention.
        d_ff (int): the second-layer of the PositionwiseFeedForward.
        dropout (float): dropout probability(0-1.0).
    """

    def __init__(self, d_model, heads, d_ff, dropout, attention_dropout,
                 max_relative_positions=0):
        super(TransformerEncoderLayer, self).__init__()

        self.self_attn = MultiHeadedAttention(heads, d_model, dropout=attention_dropout)
        self.feed_forward = PositionwiseFeedForward(d_model, d_ff, dropout)
        self.layer_norm = nn.LayerNorm(d_model, eps=1e-6)
        self.dropout = nn.Dropout(dropout)

    def forward(self, inputs, mask):
        """
        Args:
            inputs (FloatTensor): ``(batch_size, src_len, model_dim)``
            mask (LongTensor): ``(batch_size, 1, src_len)``
        Returns:
            (FloatTensor):
            * outputs ``(batch_size, src_len, model_dim)``
        """
        input_norm = self.layer_norm(inputs)
        context, _ = self.self_attn(
            input_norm, input_norm, input_norm, mask=mask, attn_type="self")
        out = self.dropout(context) + inputs
        return self.feed_forward(out)
```

可以看出这部分就是 [论文](https://yam.gift/2019/08/04/Paper/2019-08-04-Attention-Is-All-You-Need/) 中左边那部分，包含两个子模块：Multi-Head Attention 和 Feed Forward。都是归一化后传入对应的模块，然后结果和输入来一个残差连接。这里 `PositionwiseFeedForward` 的归一化没有体现出来，是在它的内部完成的，这个组件在 Decoder 也会用到，它的定义如下：

```python
# From https://github.com/OpenNMT/OpenNMT-py
class PositionwiseFeedForward(nn.Module):
    """ A two-layer Feed-Forward-Network with residual layer norm.

    Args:
        d_model (int): the size of input for the first-layer of the FFN.
        d_ff (int): the hidden layer size of the second-layer
            of the FNN.
        dropout (float): dropout probability in :math:`[0, 1)`.
    """
    def __init__(self, d_model, d_ff, dropout=0.1):
        super(PositionwiseFeedForward, self).__init__()
        self.w_1 = nn.Linear(d_model, d_ff)
        self.w_2 = nn.Linear(d_ff, d_model)
        self.layer_norm = nn.LayerNorm(d_model, eps=1e-6)
        self.dropout_1 = nn.Dropout(dropout)
        self.relu = nn.ReLU()
        self.dropout_2 = nn.Dropout(dropout)

    def forward(self, x):
        """Layer definition.
        Args:
            x: ``(batch_size, input_len, model_dim)``
        Returns:
            (FloatTensor): Output ``(batch_size, input_len, model_dim)``.
        """
        inter = self.dropout_1(self.relu(self.w_1(self.layer_norm(x))))
        output = self.dropout_2(self.w_2(inter))
        return output + x
```

所以，mask 最终是在 Multi-Head Attention 里面把 input 中长度填充的部分给 mask 掉。如果不 mask，那些位置的值就是 pad 的元素值（一般为 0），Encoder 时这里可以选择 mask（提供 lengths）或者不 mask。现在大部分的操作都是会 mask 的。再举个例子：

```python
# lengths
# (batch_size, )，每个元素为序列的长度
lens = torch.Tensor([5, 4, 3, 2])
# (batch_size, 1, 1, seq_len), (4, 1, 1, 5)
mask = ~sequence_mask(lens).unsqueeze(1)
# (batch_size, head_count, query_len, key_len)
score = torch.randint(1, 10, (4, 8, 5, 5))
# (batch_size, head_count, query_len, key_len)
score = score.masked_fill(mask, -1e18)
```

以上就是 Encoder 部分了，简单总结一下：

- 它由 N 个 EncoderLayer 构成
- 每个 EncoderLayer 包含两个组件：MultiHeadedAttention 和 PositionwiseFeedForward，两个组件都是以归一化的 input 作为输入，输出和 input 做残差连接。
- mask 主要对输入中长度补足的 Token 做处理（设置为一个很小的负数）。

这里的 Attention 也就是 Self-Attention，key query 和 value 来自相同的位置，Attention 的是前一层的位置。

## Transformer Decoder

Decoder 要复杂一些，我们先以这篇 [文章](http://nlp.seas.harvard.edu/2018/04/03/attention.html) 为例，和 OpenNMT 的大同小异，只不过后者考虑了更多的情况，其中和 Encoder 中重复或类似的部分就一笔带过了。

```python
# From: http://nlp.seas.harvard.edu/2018/04/03/attention.html
class Decoder(nn.Module):
    "Generic N layer decoder with masking."
    def __init__(self, layer, N):
        super(Decoder, self).__init__()
        self.layers = clones(layer, N)
        self.norm = LayerNorm(layer.size)
        
    def forward(self, x, memory, src_mask, tgt_mask):
        for layer in self.layers:
            x = layer(x, memory, src_mask, tgt_mask)
        return self.norm(x)

class DecoderLayer(nn.Module):
    "Decoder is made of self-attn, src-attn, and feed forward (defined below)"
    def __init__(self, size, self_attn, src_attn, feed_forward, dropout):
        super(DecoderLayer, self).__init__()
        self.size = size
        self.self_attn = self_attn
        self.src_attn = src_attn
        self.feed_forward = feed_forward
        self.sublayer = clones(SublayerConnection(size, dropout), 3)
 
    def forward(self, x, memory, src_mask, tgt_mask):
        "Follow Figure 1 (right) for connections."
        m = memory
        x = self.sublayer[0](x, lambda x: self.self_attn(x, x, x, tgt_mask))
        x = self.sublayer[1](x, lambda x: self.src_attn(m, m, x, src_mask))
        return self.sublayer[2](x, self.feed_forward)

class SublayerConnection(nn.Module):
    """
    A residual connection followed by a layer norm.
    Note for code simplicity the norm is first as opposed to last.
    """
    def __init__(self, size, dropout):
        super(SublayerConnection, self).__init__()
        self.norm = LayerNorm(size)
        self.dropout = nn.Dropout(dropout)

    def forward(self, x, sublayer):
        "Apply residual connection to any sublayer with the same size."
        return x + self.dropout(sublayer(self.norm(x)))
```

Decoder Layer 由三个部分组成，对应了三个核心组件：Masked Multi-Head Attention，Multi-Head Attention 和 FeedForward，FeedForward 和 Encoder 中的一样，即 PositionwiseFeedForward，前两个 Attention 分别对应第一部分（Multi-Head Attention）中的另外两种用法（第一种就是 Encoder 中的 Self-Attention）。说了是不同的用法，自然组件其实是一样的（上面的 self_attn 和 src_attn 其实是一个），只是怎么使用的问题。前者其实是使用了 masked Self-Attention，和 Encoder 中的情况非常类似，只不过这里 mask 的是后面未生成的位置；后者其实就是类似 [Luong Attention](https://yam.gift/2020/04/14/Paper/2020-04-14-Luong-Attention/) 的机制，key 和 value 来自 Encoder 的 outputs，query 来自 Decoder，这也是最开始的 Attention。所以我们只需重点关注一下这个 masked Self-Attention 即可，具体而言就是这个 mask 如何使用的问题。

```python
# From: http://nlp.seas.harvard.edu/2018/04/03/attention.html
class Batch:
    "Object for holding a batch of data with mask during training."
    def __init__(self, src, trg=None, pad=0):
        self.src = src
        self.src_mask = (src != pad).unsqueeze(-2)
        if trg is not None:
            self.trg = trg[:, :-1]
            self.trg_y = trg[:, 1:]
            self.trg_mask = self.make_std_mask(self.trg, pad)
            self.ntokens = (self.trg_y != pad).data.sum()
    @staticmethod
    def make_std_mask(tgt, pad):
        "Create a mask to hide padding and future words."
        tgt_mask = (tgt != pad).unsqueeze(-2)
        tgt_mask = tgt_mask & Variable(subsequent_mask(tgt.size(-1)))
        return tgt_mask
```

先看一个例子：

```python
# 假设输入的 sequence 为 (batch_size, seq_len)
ts = torch.Tensor([[2, 3, 1], 
                   [2, 3, 0]]).type(torch.LongTensor)

# (batch_size, 1, seq_len)
(ts != 0).unsqueeze(-2)
"""
tensor([[[ True,  True,  True]],

        [[ True,  True, False]]])
"""

# (1, seq_len, seq_len)
subsequent_mask(ts.size(-1))
"""
tensor([[[ True, False, False],
         [ True,  True, False],
         [ True,  True,  True]]])
"""

# (batch_size, seq_len, seq_len)
(ts != 0).unsqueeze(-2) & subsequent_mask(ts.size(-1))
"""
tensor([[[ True, False, False],
         [ True,  True, False],
         [ True,  True,  True]],

        [[ True, False, False],
         [ True,  True, False],
         [ True,  True, False]]])
"""
```

其实这里是做了两个层面的 mask，第一个 mask 掉 padding 的位置，第二个 mask 掉未来的位置。再举一个真实的例子：

```python
# (batch_size, seq_len)
batch.src # (1, 8)
# tensor([[   61,    89,   560,   129,    11,   159, 57977,     3]])

# (batch_size, seq_len)
batch.src_mask # (1, 1, 8)
# tensor([[[True, True, True, True, True, True, True, True]]])

# (batch_size, seq_len)
batch.trg # (1, 9)
# tensor([[    2,    59,  1348,    12,    90, 32926,    70,    16,     5]])

# (batch_size, 1, seq_len)
batch.trg_mask # (1, 9, 9)
"""
tensor([[[ True, False, False, False, False, False, False, False, False],
         [ True,  True, False, False, False, False, False, False, False],
         [ True,  True,  True, False, False, False, False, False, False],
         [ True,  True,  True,  True, False, False, False, False, False],
         [ True,  True,  True,  True,  True, False, False, False, False],
         [ True,  True,  True,  True,  True,  True, False, False, False],
         [ True,  True,  True,  True,  True,  True,  True, False, False],
         [ True,  True,  True,  True,  True,  True,  True,  True, False],
         [ True,  True,  True,  True,  True,  True,  True,  True,  True]]])
"""
```

这里如果你的输入输出都是单句，第一个 mask 其实是没意义的，因为每句都是完整的，不需要截断或者 padding，自然也就不需要 mask padding 的位置了。

以上就是 Decoder 部分了， 简单总结一下：

- 它由 N 个 DecoderLayer 构成
- 每个 DecoderLayer 包含三个组件：Masked Multi-Head Attention，Multi-Head Attention 和 PositionwiseFeedForward，均以归一化的 input 作为输入，输出和 input 做残差连接（注意看 SublayerConnection）。
- Masked Multi-Head Attention 主要对未来的 Token 位置进行 mask，Multi-Head Attention 其实是一个 Context Attention，它的 key value 均为 Encoder 的 outputs。

补充一下残差连接那里的实现说明：

```python
# 注意这里 self_attn 的参数 x 不是前面的那个 x
sublayer[0](x, lambda x: self_attn(x, x, x, tgt_mask))
# 实际上是这样的，后面的 x 是 self_attn 的参数
sublayer[0](x, lambda y: self_attn(y, y, y, tgt_mask))
```

再举个小例子：

```python
x = "X"
def attn(x):
    return x + " attned"
def norm(x):
    return x + " normed"
def sublayer_connection_forward(x, sublayer):
    return x + sublayer(norm(x))
sublayer_connection_forward(x, lambda x: attn(x))
# 'XX normed attned'
```

这里的 `sublayer_connection_forward` 其实就相当于上面的 `sublayer[i]`，sublayer 其实就是那个 lambda 函数，所以 sublayer 是先调用了 norm，再调用 attn，然后和 x 做了残差连接。这个和 Encoder 中是一样的，作者这里抽象了一个 SublayerConnection，个人觉得是非常优雅的。

## Appendix

- [trax/transformer.py at master · google/trax](https://github.com/google/trax/blob/master/trax/models/transformer.py)
- [models/official/nlp/transformer at master · tensorflow/models](https://github.com/tensorflow/models/tree/master/official/nlp/transformer)
- [OpenNMT-tf/transformer.py at master · OpenNMT/OpenNMT-tf](https://github.com/OpenNMT/OpenNMT-tf/blob/master/opennmt/models/transformer.py)
- [tensor2tensor/transformer.py at master · tensorflow/tensor2tensor](https://github.com/tensorflow/tensor2tensor/blob/master/tensor2tensor/models/transformer.py)
