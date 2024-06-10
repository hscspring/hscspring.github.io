---
title: Funnel Transformer 论文笔记
date: 2020-10-13 23:00:00
categories: Feeling
tags: [NLP, Funnel Transformer, Transformer, Self-Attention, Pooling]
mathjax: true
---

Paper：[[2006.03236] Funnel-Transformer: Filtering out Sequential Redundancy for Efficient Language Processing](https://arxiv.org/abs/2006.03236)

Code：[Funnel-Transformer/tensorflow at master · laiguokun/Funnel-Transformer](https://github.com/laiguokun/Funnel-Transformer/tree/master/tensorflow)

核心思想：Block 卷积的 Transformer。

<!--more-->

## What

### 动机和核心问题

Self-Attention 在机器学习和 NLP 领域取得了不错的进展，而且更大的模型、更长的预训练时间效果会更好。但是预训练太昂贵，即便只是精调，比起传统的 NLP 模型依然需要大量资源。这就限制了在更多领域的应用。

对于上面提到的挑战，已经有很多同行做了尝试，从与训练后处理的角度看，典型方法包括：蒸馏、剪枝和量化。而另外一种思路是设计新的架构，该架构不仅具备低 资源/表现 比，同时至少在某些领域能像 Transformer 一样具有伸缩性（即如果增大模型，效果会相应变好）。这种思路的方法大都是在 Transformer 架构上重新设计 block，比如：

- 寻找更好的细微操作和宏模块设计：
    - David R So, Chen Liang, and Quoc V Le. The evolved transformer. *arXiv preprint arXiv:1901.11117*, 2019.
    - DaoyuanChen,YaliangLi,MinghuiQiu,ZhenWang,BofangLi,BolinDing,HongboDeng,Jun Huang, Wei Lin, and Jingren Zhou. Adabert: Task-adaptive bert compression with differentiable neural architecture search. *arXiv preprint arXiv:2001.04246*, 2020.

- 将 full pairwise attention 替换为局部操作
    - 卷积：Zhanghao Wu, Zhijian Liu, Ji Lin, Yujun Lin, and Song Han. Lite transformer with long-short range attention. *arXiv preprint arXiv:2004.11886*, 2020.
    - 动态卷积：Felix Wu, Angela Fan, Alexei Baevski, Yann N Dauphin, and Michael Auli. Pay less attention with lightweight and dynamic convolutions. *arXiv preprint arXiv:1901.10430*, 2019.

- 优化现有 block 的隐层大小组合
    - Zhiqing Sun, Hongkun Yu, Xiaodan Song, Renjie Liu, Yiming Yang, and Denny Zhou. Mobilebert: a compact task-agnostic bert for resource-limited devices. *arXiv preprint arXiv:2004.02984*, 2020.

上面这些方法的通用策略就是识别出多余的操作或表示，然后替换为更有效的。

本文受此启发，重点关注始终在 Transformer 所有层中保持完整长度的隐层表示序列引起的潜在冗余。直觉上，对很多 NLP 任务都只需要抽取一个向量表示整个序列即可，并不需要保留所有信息到 Token 粒度。因此对这类任务完整长度的隐层状态可能包含了可观的冗余。这其实和图像识别类似，随着卷积网络层次的加深，特征的大小降低。另外，语言的先验也鼓励将相近的 Token 合并成大的语义单元（短语、词组），很自然就导致更短的序列。

具体地，就是逐步减少自注意力模型中隐层表示的序列大小（如长度），显然这能够减少计算量和内存占用。更重要地是，这节省下来的资源可以用来构建更深（或更宽）的模型。

另外，因为 MLM 需要 Token 的表示，本文设计了一个简单的策略从减小长度的隐层状态 decode 完整长度的序列。这样的话，模型就不需要更改预训练目标，而且也能够适应那些需要 Token 级别的下游任务（如标注）。

### 模型和算法

- Transformer 架构
- 预训练目标使用 Bert 的 MLM

然后是两个核心问题：

- 能否设计一种通用的模型，它与 Transformer 有相同的表示能力，但是可以通过压缩完整的隐层状态序列为一个更加紧密的形式而更加有效？
- 对于这个压缩的表示，模型如何能够保持能力为预训练产生 Token 级别的表示？

问题的答案就在本文提出的架构（如下图所示）中：

![](http://qnimg.lovevivian.cn/paper-funneltransformer-1.jpeg)

为了继承 Transformer 的优势，模型保留了由残差连接和层归一化包装的交叉 Self-Attention 和 FFN 子模块的总体框架。不同的是，当 layer 变深时，逐步减少隐层状态的序列长度，另外，对 Token 级别的任务，一个简单的 Decoder 用来从压缩的 Encoder output 重建完整序列 Token 级别的表示。

### Encoder

Encoder 由一系列的 block 组成，每个 block 包含若干个 Transformer Layer，同一个 block 内部 hidden states 的序列长度一致，不同 block 之前进行 Pooling 操作。
$$
h' \leftarrow Pooling(h) \\
s.t. \quad h \in \mathbb{R}^{T \times D}, h' \in \mathbb{R}^{T' \times D} \\
T' < T
$$

在 h' 传到下个新的 block 时，并不是直接把 h' 喂进新 block 的第一个 Self-Attention 层，而是只把 h' 当做 query，key  和 value 依然用没有 Pooling 的 h：
$$
h \leftarrow LayerNorm(h' + SelfAttntion(Q=h', KV=h))
$$
Self-Attention 的输出和 h' 的长度一致。

另外一种做法自然是 qkv 都是用 h'，但是这种情况下压缩只受 Pooling 操作控制，该操作在 Attention 模块之前就结束了，所以简单的 Pooling 方法（如平均）不能达到很好的压缩。而只有 q 使用 h' 时，压缩不仅依赖 Pooling 如何执行，而且依赖 Self-Attention 如何加权求和未 Pooling 的序列以形成每个 Pooling 后的向量。此时的 Attention 可以看作是一种线性压缩——将 T 大小变为 T'。

实践中，简单的 stride mean pooling 表现不错，本文尝试了 stride=2，widowSize=2 的配置，这能够减少一半的长度，每个 Pooling 后的隐层状态相当于 2 个没有 Pooling 的隐层向量窗口。直观上，这种类型的合并大致遵循语言学上的先验，即附近的 Token 可以逐渐合并（或压缩）为更大的语义成分。

另外需要注意的是，`[CLS]` Token 并不会被 Pooling，否则会损坏它本身的意义。不过在具体操作时还是有一个小 trick（Appendix  A.1）。因为输入的序列长度一般是 2^p（如 512），如果要在 Pooling 操作后保持 `[CLS]` 完整的话，长度就会变成 2^p+1。这种不规则的长度会使计算速度降低 15%。所以本文在这里采用了简单的截断处理，以保证长度始终为 2^p。举个例子：

```python
# 假设输入是二维的
x = torch.randint(100, [2, 511])
print(x.shape)
xx = x[:, None, :, None]
xxx = F.avg_pool2d(xx, (2,1), stride=(2,1), ceil_mode=True)
xxx[:, 0, :, 0].shape
# 输入：torch.Size([2, 511])
# 输出：torch.Size([2, 256])，此时再加上 CLS 的话就变成 257 维了

# 假设输入是三维的
x = torch.randint(100, [2, 511, 768])
print(x.shape)
xx = x[:, None, :, :]
xxx = F.avg_pool2d(xx, (2,1), stride=(2,1), ceil_mode=True)
xxx[:, 0].shape
# torch.Size([2, 511, 768])
# torch.Size([2, 256, 768])
```

#### 代码：Encoder

这里参考 transformers 的实现（为了说明方便做了一定修改）：

```python
# From https://github.com/huggingface/transformers
class FunnelEncoder(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.config = config
        self.attention_structure = FunnelAttentionStructure(config)
        # block_sizes example: [4, 4, 4]
        # 将生成 4+4+4=12 个 FunnelLayer
        self.blocks = nn.ModuleList(
            [
                nn.ModuleList([FunnelLayer(config, block_index) for _ in range(block_size)])
                for block_index, block_size in enumerate(config.block_sizes)
            ]
        )

    def forward(
        self,
        inputs_embeds,
        attention_mask,
        token_type_ids
    ):
        # inputs_embeds: batch_size × seq_len × hidden_size
        # attention_mask: batch_size × seq_len
        # token_type_ids: batch_size × seq_len

        # attention_inputs = (position_embeds, token_type_mat, attention_mask, cls_mask)
        attention_inputs = self.attention_structure.init_attention_inputs(
            inputs_embeds,
            attention_mask=attention_mask,
            token_type_ids=token_type_ids,
        )
        # position_embeds: 
        # token_type_mat: batch_size × seq_len × seq_len
        # attention_mask: batch_size × seq_len, 和上面输入的一样
        # cls_mask: seq_len × seq_len
        
        hidden = inputs_embeds

        all_hidden_states = (inputs_embeds,)
        all_attentions = ()
        
        for block_index, block in enumerate(self.blocks):
            pooling_flag = hidden.size(1) > 2
            # 第一个 block 不做 Pooling
            pooling_flag = pooling_flag and block_index > 0
            if pooling_flag:
                # 计算 pooled_hidden
                pooled_hidden, attention_inputs = \
                self.attention_structure.pre_attention_pooling(hidden, attention_inputs)
            for (layer_index, layer) in enumerate(block):
                for repeat_index in range(self.config.block_repeats[block_index]):
                    do_pooling = (repeat_index == 0) and (layer_index == 0) and pooling_flag
                    if do_pooling:
                        query = pooled_hidden
                        key = value = hidden if self.config.pool_q_only else pooled_hidden
                    else:
                        query = key = value = hidden
                    layer_output = layer(query, key, value, attention_inputs)
                    hidden = layer_output[0]
                    if do_pooling:
                        # 后处理
                        attention_inputs = self.attention_structure.post_attention_pooling(attention_inputs)
                    all_attentions = all_attentions + layer_output[1:]
                    all_hidden_states = all_hidden_states + (hidden,)

        return BaseModelOutput(last_hidden_state=hidden, hidden_states=all_hidden_states, attentions=all_attentions)
```

Encoder 的结构不复杂，如果不考虑 FunnelLayer（包括一个 MultiheadAttention 和一个 FFN，这地方作者做了一些优化，比较复杂），有几个地方要注意：对 attention_inputs 的初始化、Pooling 操作和 Pooling 之后对 inputs 的处理。

#### 代码：Attention Inputs 初始化

```python
class FunnelAttentionStructure(nn.Module):
    def init_attention_inputs(self, input_embeds, attention_mask, token_type_ids):
        self.pooling_mult = 1
        self.seq_len = seq_len = input_embeds.size(1)
        position_embeds = self.get_position_embeds(
            seq_len, input_embeds.dtype, input_embeds.device)
        token_type_mat = self.token_type_ids_to_mat(token_type_ids)
        
        cls_mask = (
            F.pad(input_embeds.new_ones([seq_len - 1, seq_len - 1]), (1, 0, 1, 0))
        )
        return (position_embeds, token_type_mat, attention_mask, cls_mask)
```

初始化这里 cls_mask 是对输入的 `[CLS]` token 进行 mask，给定 `batch_size × seq_len × hidden_size` 的 input_embeds，对应的 mask 为 `seq_len × seq_len`，举例如下：

```python
# 假设 seq_len = 4
cls_mask = tensor([
    [0., 0., 0., 0.],
    [0., 1., 1., 1.],
    [0., 1., 1., 1.],
    [0., 1., 1., 1.]])
```

token_type 的处理代码如下：

```python
def token_type_ids_to_mat(token_type_ids):
    """Convert `token_type_ids` to `token_type_mat`."""
    token_type_mat = token_type_ids[:, :, None] == token_type_ids[:, None]
    # Treat <cls> as in the same segment as both A & B
    cls_ids = token_type_ids == 2 # 2 is cls_token_type_id
    cls_mat = cls_ids[:, :, None] | cls_ids[:, None]
    return cls_mat | token_type_mat

# example
token_type_ids = tensor([[0, 0, 0, 0], [0, 0, 0, 0]])
token_type_ids_to_mat(token_type_ids) = tensor([
    [[True, True, True, True],
     [True, True, True, True],
     [True, True, True, True],
     [True, True, True, True]],

    [[True, True, True, True],
     [True, True, True, True],
     [True, True, True, True],
     [True, True, True, True]]])
```

#### 代码：Position Embedding

position_embeds 的处理就比较复杂了，本文使用了 Transformer-XL 的相对位置注意力，详细可参考附录 A.2，看了下感觉写的比较简略，还得去看下原论文才行。代码如下：

```python
def get_position_embeds(seq_len):
    d_model = config.d_model # 768
    freq_seq = torch.arange(0, d_model // 2, 1.0)
    inv_freq = 1 / (10000 ** (freq_seq / (d_model // 2)))
    rel_pos_id = torch.arange(-seq_len * 2, seq_len * 2, 1.0)
    zero_offset = seq_len * 2
    # 2*(seq_len*2) × d_model/2
    sinusoid = rel_pos_id[:, None] * inv_freq[None]
    sin_embed = nn.Dropout(config.hidden_dropout)(torch.sin(sinusoid))
    cos_embed = nn.Dropout(config.hidden_dropout)(torch.cos(sinusoid))
    # 2*(seq_len*2) × d_model
    pos_embed = torch.cat([sin_embed, cos_embed], dim=-1)
    pos = torch.arange(0, seq_len)
    pooled_pos = pos
    position_embeds_list = []
    
    for block_idx in range(config.num_blocks):
        # 2 种类型的位置 embedding
        # 第一种：不 pooling kv
        if block_idx == 0:
            position_embeds_pooling = None
        else:
            pooled_pos = stride_pool_pos(pos, block_idx)
            stride = 2 ** (block_index - 1)
            rel_pos = relative_pos(pos, stride, pooled_pos, shift=2)
            
            rel_pos = rel_pos[:, None] + zero_offset
            rel_pos = rel_pos.expand(rel_pos.size(0), d_model)
            position_embeds_pooling = torch.gather(pos_embed, 0, rel_pos)
        # 第二种：pooling kv
        # 循环内改变了 pos
        pos = pooled_pos
        stride = 2 ** block_idx
        rel_pos = relative_pos(pos, stride)
        
        rel_pos = rel_pos[:, None] + zero_offset
        rel_pos = rel_pos.expand(rel_pos.size(0), d_model)
        position_embeds_no_pooling = torch.gather(pos_embed, 0, rel_pos)
        
        position_embeds_list.append([position_embeds_no_pooling, position_embeds_pooling])
    return position_embeds_list
```

这里的 `stride_pool_pos` 主要是跨位，另外处理了 `CLS` 的问题：

```python
def stride_pool_pos(pos_id, block_idx):
    if config.separate_cls:
        # cls 的位置
        cls_pos = pos_id.new_tensor([-(2 ** block_idx) + 1])
        pooled_pos_id = pos_id[1:-1] if config.truncate_seq else pos_id[1:]
        return torch.cat([cls_pos, pooled_pos_id[::2]], 0)
    else:
        return pos_id[::2]
```

另一个函数 `relative_pos` 主要用来构建 pos 和 pooled_pos 之间的相对位置向量：

```python
def relative_pos(pos, stride, pooled_pos=None, shift=1):
    if pooled_pos is None:
        pooled_pos = pos
    ref_point = pooled_pos[0] - pos[0]
    num_remove = shift * len(pooled_pos)
    max_dist = ref_point + num_remove * stride
    min_dist = pooled_pos[0] - pos[-1]
    return torch.arange(max_dist, min_dist, -1, -stride)
```

这里看的有点迷，完全是 “知其然不知其所以然”，不过还是发现个疑惑：第一种 embedding 时用的 pos 在第 2 个 block 开始就已经变了（实际使用的是 pooled_pos），这是为啥？

曾经拿起 Transformer-XL 的论文又没看，果然落下的坑虽迟但到。。。

#### 代码：PrePooling

然后是 Attention 前的 Pooling 操作。我们这里只看 pooling q 的情况：

```python
def pre_attention_pooling(output, attention_inputs):
    position_embeds, token_type_mat, attention_mask, cls_mask = attention_inputs
    token_type_mat = stride_pool(token_type_mat, 1)
    cls_mask = stride_pool(cls_mask, 0)
    output = pool_tensor(output, mode=config.pooling_type)
    return output, (position_embeds, token_type_mat, attention_mask, cls_mask)
```

主要是对 `token_type, cls_mask` 和 `hidden_output` 做了 Pooling，比如：

```python
stride_pool(token_type_mat, 1) # (batch_size, seq_len//2+1, seq_len)
stride_pool(cls_mask, 0) # (seq_len//2+1, seq_len)
pool_tensor(input_embeds) # (batch_size, seq_len//2+1, hidden_size)
```

所不同的是，针对 `hidden_output` 的 Pooling 要稍微复杂些，因为它们的数值大小是有意义的。

#### 代码：PostPooling

再接下来是 Attention 后的 Pooling 后的处理。

```python
def post_attention_pooling(attention_inputs):
    position_embeds, token_type_mat, attention_mask, cls_mask = attention_inputs
    token_type_mat = stride_pool(token_type_mat, 2)
    cls_mask = stride_pool(cls_mask, 1)
    attention_mask = pool_tensor(attention_mask, mode="min")
    return position_embeds, token_type_mat, attention_mask, cls_mask
```

与上面的类似，只是以不同的维度或方式。

#### 代码：FunnelLayer

最后看一下 layer，它包括两个模块：MultiheadAttention 和 PositionwiseFFN。后者就是标准 Transformer 里面的 FFN，不再赘述。前者与标准 SelfAttention 最大的不同就是增加了 position 和 token_type 的 Attention，看起来有点复杂。

```python
class FunnelRelMultiheadAttention(nn.Module):
    def __init__(self, config, block_index):
        super().__init__()
        self.config = config
        self.block_index = block_index
        d_model, n_head, d_head = config.d_model, config.n_head, config.d_head

        self.hidden_dropout = nn.Dropout(config.hidden_dropout)
        self.attention_dropout = nn.Dropout(config.attention_dropout)

        self.q_head = nn.Linear(d_model, n_head * d_head, bias=False)
        self.k_head = nn.Linear(d_model, n_head * d_head)
        self.v_head = nn.Linear(d_model, n_head * d_head)

        self.r_w_bias = nn.Parameter(torch.zeros([n_head, d_head]))
        self.r_r_bias = nn.Parameter(torch.zeros([n_head, d_head]))
        self.r_kernel = nn.Parameter(torch.zeros([d_model, n_head, d_head]))
        self.r_s_bias = nn.Parameter(torch.zeros([n_head, d_head]))
        self.seg_embed = nn.Parameter(torch.zeros([2, n_head, d_head]))

        self.post_proj = nn.Linear(n_head * d_head, d_model)
        self.layer_norm = nn.LayerNorm(d_model, eps=config.layer_norm_eps)
        self.scale = 1.0 / (d_head ** 0.5)
    
    def forward(self, q, k, v, attn_inputs, output_attention=False):
        # q => (batch_size × context_len × d_model)
        # k,v => (batch_size × seq_len × d_model)
        position_embeds, token_type_mat, attention_mask, cls_mask = attention_inputs
        batch_size, context_len, _ = q.shape
        seq_len = k.shape[1]
        n_head, d_head = self.config.n_head, self.config.d_head
        
        q_head = self.q_head(q).view(batch_size, context_len, n_head, d_head)
        k_head = self.k_head(k).view(batch_size, seq_len, n_head, d_head)
        v_head = self.v_head(v).view(batch_size, seq_len, n_head, d_head)
        
        q_head = q_head * self.scale
        r_w_bias = self.r_w_bias * self.scale
        # batch_size × n_head × content_len × seq_len
        content_score = torch.einsum("bind,bjnd->bnij", q_head + r_w_bias, k_head)
        # 新增的两个 attn
        positional_attn = self.relative_positional_attention(
            position_embeds, q_head, seq_len, cls_mask)
        token_type_attn = self.relative_token_type_attention(
            token_type_mat, q_head, cls_mask)
        
        attn_score = content_score + positional_attn + token_type_attn
        
        if attention_mask is not None:
            attn_score = attn_score - 1e6 * (1 - attention_mask[:, None, None].float())
        attn_prob = torch.softmax(attn_score, dim=-1, dtype=dtype)
        attn_prob = self.attention_dropout(attn_prob)
        # batch_size × context_len × n_head × d_head
        attn_vec = torch.einsum("bnij,bjnd->bind", attn_prob, v_head)
        # batch_size × context_len × d_model
        attn_out = self.post_proj(
            attn_vec.reshape(batch_size, context_len, n_head * d_head))
        attn_out = self.hidden_dropout(attn_out)
        output = self.layer_norm(query + attn_out)
        return (output, attn_prob) if output_attentions else (output,)
```

注意，输入的 q 可能是 Pooling 后的，此时 size 是 `(batch_size, seq_len//2+1, hidden_size)`，而 k 和 v 的则是 `(batch_size, seq_len, hidden_size)`，源代码注释中 contenxt_len 和 seq_len 正好是反过来的，我觉得现在这样更加容易理解些。如果不考虑 `positional_attn, token_type_attn`，整体看起来就和 Transformer 的 SelfAttention 非常相似。

接下来首先看 positional_attn：

```python
def relative_positional_attention(position_embeds, q, seq_len, cls_mask):
    # q => batch_size × context_len × n_head × d_head 
    shift = 2 if q.shape[1] != seq_len else 1
    r = position_embeds[self.block_index][shift-1]
    v = self.r_r_bias * self.scale
    w_r = self.r_kernel
    r_head = torch.einsum("td,dnh->tnh", r, w_r)
    # batch_size × n_head × context_len × max_rel_len
    positional_attn = torch.einsum("binh,tnh->bnit", q+v, r_head)
    # batch_size × n_head × context_len × seq_len
    positional_attn = _relative_shift_gather(positional_attn, seq_len, shift)
    if cls_mask is not None:
        positional_attn *= cls_mask
    return positional_attn
```

可以看出，positional_attn 其实就是 q 和 position_embeds 的一个分数。

再看 token_type_attn：

```python
def relative_token_type_attention(token_type_mat, q, cls_mask=None):
    # q => batch_size × context_len × n_head × d_head
    # token_type_mat => batch_size × context_len × seq_len
    batch_size, context_len, seq_len = token_type_mat.shape
    r_s_bias = self.r_s_bias * self.scale
    # batch_size × n_head × context_len × 2
    token_type_bias = torch.einsum("bind,snd->bnis", q + r_s_bias, self.seg_embed)
    # batch_size × n_head × context_len × seq_len
    token_type_mat = token_type_mat[:, None].expand(
        [batch_size, q.shape[2], context_len, seq_len])
    # batch_size × n_head × context_len
    diff_token_type, same_token_type = torch.split(token_type_bias, 1, dim=-1)
    # batch_size × n_head × context_len × seq_len
    token_type_attn = torch.where(
        token_type_mat, 
        same_token_type.expand(token_type_mat.shape),
        diff_token_type.expand(token_type_mat.shape)
        )
    if cls_mask is not None:
        token_type_attn *= cls_mask
    return token_type_attn
```

可以看出，最后的 attention 根据 token_type_mat 和 token_type_bias 确定。

以上就是 Encoder 部分，代码大致看懂了，不过还是有点 “知其然不知其所以然” 的感觉，应该就是位置 Embedding 和 Attention 部分没有彻底弄清楚，总感觉有个地方没打通（一直觉得位置编码这个不复杂，没想到这么绕），先挖个坑，留待以后填补吧。

### Decoder

为了恢复 Encoder 完整序列的隐状态，本文采用了上采样，而且是一个大的扩展比例（如前图所示）。具体而言，给定 M 个 block 的输出序列长度 Tm = T/2^(M-1)，通过重复每个隐向量 2^(M-1) 次来上采样到完整序列。但是这样每次采样得到的向量几乎一样，因此本文提取了第一个 block 的最后一层隐向量（仍然具有完整的序列长度），然后将该向量与 2^(M-1) 个重复相似向量相加得到 Token 级别的表示（类似残差连接）。另外，在 Decoder 中并不是只有一层，本文使用了 2 层。最后需要注意，Decoder 只有在 Token 级别的预测任务中需要。

核心代码如下：

```python
class FunnelDecoder(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.config = config
        self.attention_structure = FunnelAttentionStructure(config)
        self.layers = nn.ModuleList(
            [FunnelLayer(config, 0) for _ in range(config.num_decoder_layers)]
        )

    def forward(
        self,
        final_hidden,
        first_block_hidden,
        attention_mask=None,
        token_type_ids=None):
        upsampled_hidden = upsample(
            final_hidden,
            stride=2 ** (len(self.config.block_sizes) - 1),
            target_len=first_block_hidden.shape[1],
            separate_cls=self.config.separate_cls,
            truncate_seq=self.config.truncate_seq,
        )
        hidden = upsampled_hidden + first_block_hidden
        attention_inputs = self.attention_structure.init_attention_inputs(
            hidden,
            attention_mask=attention_mask,
            token_type_ids=token_type_ids,
        )

        for layer in self.layers:
            layer_output = layer(hidden, hidden, hidden, attention_inputs)
            hidden = layer_output[0]
```

注意 `FunnelLayer` 中的 `block_index` 取 0，因为并不需要 Pooling。最后返回的 hidden 就是 Decoder 最后一层的 hidden states，也就是恢复序列长度的隐向量，其 size 为 `batch_size × seq_len × hidden_size`。

### 复杂度分析

这一节主要就复杂度方面和 Bert 做了对比，结果是 L12H768 的 Bert 的层数实际上小于 B6-6-6H768（3个 block 每个 block 6 层）的 Funnel，同时后者效果优于前者。当然，需要注意的是，后者整体的参数数量更多。如果使用类似 ALBERT 那样的参数共享的方法，比如 B6-3x2-3x2H768（将第二和第三个 block 中每两层的参数绑定在一起），参数和 Bert 一样，但是效果会下降。详细报告可参考下面的《数据和实验》部分。

### 特点和创新

通过类似卷积的操作对 Token 长度的隐向量进行压缩，同时通过一个 Decoder 也能保证恢复到 Token 级别的预测输出。

## How


### 如何使用

如果是在 `transformers` 下使用，那和其他的模型没有区别：

```python
# From https://github.com/huggingface/transformers
from transformers import FunnelTokenizer, FunnelBaseModel
import torch
tokenizer = FunnelTokenizer.from_pretrained('funnel-transformer/small-base')
model = FunnelBaseModel.from_pretrained('funnel-transformer/small-base', return_dict=True)
inputs = tokenizer("Hello, my dog is cute", return_tensors="pt")
outputs = model(**inputs)
last_hidden_states = outputs.last_hidden_state
```

更多详细使用说明可以参考文档：[Funnel Transformer — transformers 3.3.0 documentation](https://huggingface.co/transformers/model_doc/funnel.html)。

官方文档：[laiguokun/Funnel-Transformer](https://github.com/laiguokun/Funnel-Transformer) 也有具体的使用说明，不再赘述。

预训练代码只有 Tensorflow 的代码，共分为两步：

- 将原始文本转为 tfrecord
- 执行预训练

首先看第一步——数据准备。Tokenizer 就是 Transformer 系列通用的（BPE），没太多说的。对于原始文本的格式要求如下：

```markdown
This is the first sentence.
This is the second sentence and also the end of the paragraph.<eop>
Another paragraph.

Another document starts here.
```

具体而言就是：

- 文档之间要用空行隔开
- 每一段后要加段落标记
- 另外每一行为一句。

在转为 tfrecord 之前得到的数据包括：所有的 Token ids 和按句对应的 Sent type ids，连续两句的 Token type 不相同。Label 和 Bert 的一样，连续两句为 1，否则为 0。

原始数据转换完成后然后就可以预训练了。训练输入的特征（mask 等）在 `input_func_builder` 中单独做处理，这个处理方式挺不错的。训练的 loss 可以选择 MLM 或 Electra，后者除了 MLM 外，还将 Decoder 采样的结果（生成器）重新喂入模型，判断能否还原原始结果（判别器），默认为 MLM。

### 数据和实验

两种基本的配置

- Base：1M Steps，256 BatchSize，Wikipedia+Book Corpus（Bert）
- Large：500K Steps，8192 BatchSize，Wikipedia+Book+ClueWeb+Gigaword+CommonCrawl Corpus（XLNet and ELECTRA）

还有诸多训练细节可以参照 Appendix B 中关于实验设置和超参数。

**Base**

![](http://qnimg.lovevivian.cn/paper-funnel-transformer-1.jpeg)

注意：参数共享会导致效果下降。

![](http://qnimg.lovevivian.cn/paper-funnel-transformer-2.jpeg)

**Large**

训练目标函数选择了 ELECTRA。

![](http://qnimg.lovevivian.cn/paper-funnel-transformer-3.jpeg)

**Ablation**

![](http://qnimg.lovevivian.cn/paper-funnel-transformer-4.jpeg)

主要包括以下几个方面：

- Pooling 操作：Mean/Max，Top-Attn
- Pool-query-only
- Block layout：3-blocks，2-blocks，4-blocks
- Rel-Attn

得出的结论如下：

- Mean/Max 优于 Top-Attn
- Pool-query-only 和不对 `CLS` Pooling 操作能够带来明显的提升
- 相对位置参数化（Rel-Attn）是性能提升的关键，作者推测因为 Pooling 操作会损坏输入中带的绝对位置信息，因此高层（后面）的 block 可能没有足够的位置信息来学习到足够好的 Attention
- 3 个 block 取的最好效果

## Discussion

### 相关工作

自下而上的模型：Sandeep Subramanian, Ronan Collobert, Marc’Aurelio Ranzato, and Y-Lan Boureau. Multi- scale transformer language models. *arXiv preprint arXiv:2005.00581*, 2020.

在精调中软消除不重要的词向量（序列长度会减少）：Saurabh Goyal, Anamitra Roy Choudhary, Venkatesan Chakaravarthy, Saurabh ManishRaje, Yogish Sabharwal, and Ashish Verma. Power-bert: Accelerating bert inference for classification tasks. arXiv preprint arXiv:2001.08950, 2020.

分层 RNN：Rui Lin, Shujie Liu, Muyun Yang, Mu Li, Ming Zhou, and Sheng Li. Hierarchical recurrent neural network for document modeling. In *Proceedings of the 2015 Conference on Empirical Methods in Natural Language Processing*, pages 899–907, 2015.

**图像领域**

具有残差连接的压缩 Encoder 和扩展 Decoder 框架：Olaf Ronneberger, Philipp Fischer, and Thomas Brox. U-net: Convolutional networks for biomedical image segmentation. In International Conference on Medical image computing and computer-assisted intervention, pages 234–241. Springer, 2015.

Stride Pooling：Dominik Scherer, Andreas Müller, and Sven Behnke. Evaluation of pooling operations in convolutional architectures for object recognition. In International conference on artificial neural networks, pages 92–101. Springer, 2010.

**图神经网络**

尝试以不同的方式逐渐减少节点的数量，并获得用于监督分类的单个矢量表示：

- Zhitao Ying, Jiaxuan You, Christopher Morris, Xiang Ren, Will Hamilton, and Jure Leskovec. Hierarchical graph representation learning with differentiable pooling. In Advances in neural information processing systems, pages 4800–4810, 2018.
- Hongyang Gao and Shuiwang Ji. Graph u-nets. arXiv preprint arXiv:1905.05178, 2019.
- Junhyun Lee, Inyeop Lee, and Jaewoo Kang. Self-attention graph pooling. arXiv preprint
    arXiv:1904.08082, 2019.

### 打开脑洞

这篇文章看起来真费劲，而且最重要的是位置编码那里还没有完全看懂。思想嘛的确很简单，但具体做起来，只能说——细节处全是魔鬼。整体而言，我觉得算是一篇比较新颖的文章，将 Self-Attention block 当做 CNN 的块，不得不说是很有想法的压缩方式，这样得到的整体向量可能更具有抽象性和概括性，毕竟它的 CLS 可是来自压缩后的 Self-Attention，当然这有个前提假设：语言文本具有某种意义上Token 级别的抽象特征。嗯，也许如果可以的话，放在图像领域可能更加适合。另外，代码写的也挺清晰的，就是注释略微少了点，函数也没有 annotation，有些地方看起来就不太方便。最后，再次感慨一下，看论文不看代码真的等于没看，论文半小时就看完了也能大致知道核心思想，代码起码能看两天。