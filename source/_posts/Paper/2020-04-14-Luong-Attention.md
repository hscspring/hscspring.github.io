---
title: Luong Attention 论文+代码笔记
date: 2020-04-14 12:00:00
categories: Feeling
tags: [NLP, Attention, Luong Attention]
mathjax: true
---

Paper：[1508.04025v5.pdf](https://arxiv.org/pdf/1508.04025v5.pdf)

Code：文章未提供，见 Appendix

核心思想：通过在 Decoder 的每一步使用 Encoder 信息，并对 Encoder 信息赋予不同权重来获得更好的 Decoder 结果。

<!--more-->

## What

### 动机和核心问题

针对 Attention 机制的研究比较少，本文主要探讨了两种方法的 Attention 机制：全局方法和局部方法，前者使用所有源词，类似（Bahdanau et al 2015）的模型，但架构上更简单；后者每个 time step 使用所有源词的一个子集，可以看作是在（Xu 等人，2015）中提出的硬注意力模型和软注意力模型之间的有趣混合，它比全局注意力（或软注意力）更加容易计算，而且（不像硬注意力）几乎处处可微，更加容易训练和使用。

### 模型和算法

几乎所有的翻译模型都是 Encoder-Decoder 架构：
$$
\log p(y | x)=\sum_{j=1}^{m} \log p\left(y_{j} | y_{<j}, s\right)
$$
Decoder 基本都使用 RNN，但 RNN 的结构和 Encoder 计算源句子表征 s 的方法不同（详见《相关工作》）。

使用 stacking LSTM 架构，优化：
$$
J_{t}=\sum_{(x, y) \in \mathbb{D}}-\log p(y | x)
$$
给定 target hidden state ht 和 source-side context vector ct：
$$
\tilde{\boldsymbol{h}}_{t}=\tanh \left(\boldsymbol{W}_{c}\left[\boldsymbol{c}_{t} ; \boldsymbol{h}_{t}\right]\right)
$$
该结果将通过 softmax 得到 token yt。所以主要是怎么计算 ct。

**Global Attention**

考虑 Encoder 中所有的 hidden states，此时 at 的 size 等于 source side 的 time step 数，at 就是权重向量。
$$
\begin{aligned}
\boldsymbol{a}_{t}(s) &=\operatorname{align}\left(\boldsymbol{h}_{t}, \overline{\boldsymbol{h}}_{s}\right) \\
&=\frac{\exp \left(\operatorname{score}\left(\boldsymbol{h}_{t}, \overline{\boldsymbol{h}}_{s}\right)\right)}{\sum_{s^{\prime}} \exp \left(\operatorname{score}\left(\boldsymbol{h}_{t}, \overline{\boldsymbol{h}}_{s^{\prime}}\right)\right)}
\end{aligned}
$$
其中，hs 就是 source side 的每一个 hidden state。分数的计算有三种方案：
$$
\operatorname{score}\left(\boldsymbol{h}_{t}, \overline{\boldsymbol{h}}_{s}\right)=\left\{\begin{array}{ll}
\boldsymbol{h}_{t}^{\top} \overline{\boldsymbol{h}}_{s} & \text { dot } \\
\boldsymbol{h}_{t}^{\top} \boldsymbol{W}_{a} \overline{\boldsymbol{h}}_{s} & \text { general } \\
\boldsymbol{v}_{a}^{\top} \tanh \left(\boldsymbol{W}_{a}\left[\boldsymbol{h}_{t} ; \overline{\boldsymbol{h}}_{s}\right]\right) & \text { concat }
\end{array}\right.
$$
ct 就是所有 source side hidden states 的加权平均。

![](http://qnimg.lovevivian.cn/paper-luong-attention-1.jpeg)

与 Bahdanau et al. (2015) 相比更加简化和具有一般性：

- Encoder 和 Decoder 使用 Stack 顶层的 hidden state，Bahdanau 拼接了 Encoder 的双向 LSTM 的 hidden state 和 Decoder 的非 Stack 单向 LSTM hidden state。
- 计算过程：ht →at →ct →h ̃t，Bahdanau 在每一个 time step 根据前一个 hidden state 计算：ht−1 → at → ct → ht。实际每一步都重新计算了 s（见下）。
- 使用了三种计算分数的方法，Bahdanau 只使用了拼接方法。

Bahdanau 的机制：
$$
p\left(y_{i} | y_{1}, \dots, y_{i-1}, \mathbf{x}\right)=g\left(y_{i-1}, s_{i}, c_{i}\right)
\\
s_i = f(s_{i-1}, y_{i-1}, c_i)
\\
c_i = \sum_{j=1}^{T_x} a_{ij} h_j
\\
a_{ij} = \frac{\exp(e_{ij})}{\sum_{k=1}^{T_x} \exp(e_{ik})}
\\
e_{ij} = a(s_{i-1}, h_j)
$$
每个 target yi 有一个 ci 对应。e 是 input j 附近与 output i 位置的 match 程度。si 其实就是 ht，即 target i 时刻的 hidden state。

进一步，稍微详细总结一下两者的计算过程：

- Luong Attention：
    - 计算 decoder 每一步的 output，即 ht
    - 根据 ht 和 hs 计算 at
    - 根据 at 和 hs 计算 ct（context vector）
    - 拼接 ct 和 ht 得到 h ̃t（即 Attention 后的 output）

- Bahdanau Attention：
    - 计算 decoder 每一步的 output，即 ht-1
    - 根据 ht-1 和 hs 计算 at
    - 根据 at 和 hs 计算 ct
    - 根据 ct 和 ht-1 计算得到 ht

[Stackoverflow](https://stackoverflow.com/questions/44238154/what-is-the-difference-between-luong-attention-and-bahdanau-attention) 上找到一张图比较直观：

![](https://i.stack.imgur.com/yqJpG.png)

接下来看一下代码：

```python
# 参考自：https://github.com/kevinlu1211/pytorch-batch-luong-attention
class LuongAttnDecoder(nn.Module):
    def __init__(self, hidden_size, input_size, output_size,  n_layers, dropout):
        super(LuongAttnDecoder, self).__init__()
        self.hidden_size = hidden_size
        self.input_size = input_size # embedding shape
        self.output_size = output_size
        self.n_layers = n_layers
        self.dropout = dropout
        
        self.embedding = nn.Embedding(self.output_size, self.hidden_size)
        self.attn = nn.Linear(self.hidden_size, self.hidden_size)
        self.gru = nn.GRU(self.input_size, self.hidden_size, n_layers, dropout=self.dropout)
        self.concat = nn.Linear(self.hidden_size * 2, self.hidden_size)
        self.out = nn.Linear(self.hidden_size, self.output_size)
    def forward(self, input, hidden, encoder_outputs):
        """
        input: shape = batch_size
        hidden: shape = n_layers, batch_size, hidden_size
        encoder_outputs: shape = max_length, batch_size, hidden_size
        
        here, max_length is the max length of batch sequence.
        """
        batch_size = input.size(0)
        # (1, batch_size, input_size)
        embedded = self.embedding(input).view(1, batch_size, self.input_size)
        # (1, batch_size, hidden_size), (n_layers, batch_size, hidden_size)
        output, hidden = self.gru(embedded, hidden)
        # (batch_size, 1, max_length) general score function
        attn_weights = F.softmax(torch.bmm(self.attn(output).transpose(1, 0), 
                                           encoder_outputs.permute(1, 2, 0)), 2)
        # (batch_size, 1, max_length) @ (batch_size, max_length, hidden size)
        # (batch_size, 1, hidden_size)
        context = attn_weights.bmm(encoder_outputs.transpose(0, 1))
        # (batch_size, hidden_size)
        output = output.squeeze(0)
        # (batch_size, hidden_size)
        context = context.squeeze(1)
        # (batch_size, hidden_size * 2)
        concat_input = torch.cat((output, context), 1)
        # (batch_size, hidden_size) h ̃t
        concat_output = F.tanh(self.concat(concat_input))
        # (batch_size, output_size)
        output = self.out(concat_output)
        return output, hidden, attn_weights
```

注意，这里使用了 general 计算 score，其他的类似。

**Local Attention**

Global Attention 要注意 source 里面的所有词，但是针对太长的文本序列（比如段落、文章）就太低效了。受 Xu et al.2015 等人 soft 和 hard 注意力模型的启发提出 Local Attention。

具体做法是关注一个窗口的上下文，具体而言：

- 为每个 t 时刻的 target word 生成一个对齐的位置 pt。
- ct 在 [pt−D,pt+D] 窗口范围内的 source hidden states 上加权平均计算，D 靠经验选择。

文中考虑了两个变种：

- *Monotonic* alignment (**local-m**) : pt = t
- *Predictive* alignment (**local-p**): 
    $$
    p_{t}=S \cdot \operatorname{sigmoid}\left(\boldsymbol{v}_{p}^{\top} \tanh \left(\boldsymbol{W}_{p} \boldsymbol{h}_{t}\right)\right)
    $$
    w 和 p 是模型参数，用来学习位置，S 是源句子的长度，pt ∈ [0, S]，以 pt 为中心的高斯分布处理对齐：
    $$
    \boldsymbol{a}_{t}(s)=\operatorname{align}\left(\boldsymbol{h}_{t}, \overline{\boldsymbol{h}}_{s}\right) \exp \left(-\frac{\left(s-p_{t}\right)^{2}}{2 \sigma^{2}}\right)
    $$
    align 函数和 global 的一样，根据经验设置 σ = D/2，pt 是实数，s 是窗口内以 pt 为中心的整数。

**Input-feeding**

注意力机制的决策不应该是相互独立的，应该对过去的对齐信息予以考虑。具体而言，就是将 h ̃t 和 decoder 每一步的 input 拼接后作为输入。这样就相当于携带了历史的对齐信息。

### 特点和创新

- 探讨了 Global Attention 和 Local Attention；
- Global Attention 简化了过程，使用了多种计算分数的方法；
- Local Attention 提高了计算效率，在长文本下更加有效。

## How

### 如何构造数据

Attention 最先在使用 NMT 上使用，不过其实是可以使用在任何序列建模中的（Self-Attention），我们这里以 NMT 为例，所以数据就是平行语料，首先分别处理成 one-hot 编码，需要说明的是，如果使用 SGD，长度可以不统一，如果使用 batch 训练，至少在 batch 这个层面是要统一长度的，即每个 batch 确定一个最大长度或以最大长度的 sequence 为标准，对其他的 sequence 进行 padding。

可以参考 Tensorflow 和 PyTorch 的官方教程

- [Neural machine translation with attention  |  TensorFlow Core](https://www.tensorflow.org/tutorials/text/nmt_with_attention)
- [NLP From Scratch: Translation with a Sequence to Sequence Network and Attention — PyTorch Tutorials 1.4.0 documentation](https://pytorch.org/tutorials/intermediate/seq2seq_translation_tutorial.html#attention-decoder)

这里以上面模型的仓库代码为例，它是在 batch 层面进行 padding 的。

```python
# 代码来自：https://github.com/kevinlu1211/pytorch-batch-luong-attention
"""
# 训练数据
source	target
je vais dormir .	i am going to bed .
je suis presque prete .	i am almost ready .
tu es encore un bleu .	you re still green .
c est toi qui m as entraine .	you re the one who trained me .
on apprend encore a se connaitre .	we re still getting to know each other .
"""
# 首先是 one-hot 编码 + batch，仅以 source 为例（target 一样的）
source = data["source"]
for i in range(0, n_samples, batch_size):
    source_seqs = []
    source_batch = source[i:i+batch_size]
    for source_ in source_batch:
        source_seqs.append(indexes_from_sentence(word2id_dict, source_))
        source_lengths = [len(s) for s in source_seqs]
        source_padded = [pad_seq(seq, max(source_lengths)) for seq in source_seqs]
        source_var = Variable(torch.LongTensor(source_padded)).transpose(0, 1)
        yield (source_var, source_lengths)
"""
# 数据是这样（假定 batch_size=4），注意：列才是序列编码，行是 batch，每一行是一个 time step。
'source_var': tensor([
	[  36,   11,   32,    4],
	[ 948,   12,   42,    8],
	[3938,  286, 2760, 2467],
	[  89, 2045,    7,    7],
	[ 123,    7,    3,    3],
	[ 903,    3,    0,    0],
	[   7,    0,    0,    0],
	[   3,    0,    0,    0]]),
 'source_lengths': [8, 6, 5, 5]
"""
```

这个数据会直接喂入 Encoder 中，Decoder 时喂入的就是一行，因为要按 time step 一个个生成。

### 如何开始训练

基本步骤和其他模型类似：

```python
# 代码来自：https://github.com/kevinlu1211/pytorch-batch-luong-attention
# 实例化 Encoder 和 Decoder
encoder = EncoderRNN(hidden_size, input_size, n_layers, dropout)
decoder = LuongAttnDecoderRNN(hidden_size, input_size, n_words, n_layers, dropout)
# Encoder
encoder_outputs, encoder_hidden = encoder(
    source_var, encoder.init_hidden(batch_size), source_lengths)
# Decoder
decoder_input = Variable(torch.LongTensor([Tokens.SOS_token] * batch_size))
decoder_hidden = encoder_hidden
# Train, output_size 即上面的 n_words
decoder_outputs = Variable(torch.zeros(max_target_length, batch_size, output_size))
for t in range(max_target_length):
    decoder_output, decoder_hidden, attn_weights = decoder(
        decoder_input, decoder_hidden, encoder_outputs)
    decoder_outputs[t] = decoder_output
    # 这里第一次是构造的 SOS_token，之后要使用 target
    decoder_input = target_var[t]
# Loss, logits (batch_size, max_length, output_size), target (batch_size, max_length)
loss = masked_cross_entropy(
    decoder_outputs.transpose(0, 1).contiguous(), 
    target_var.transpose(0, 1).contiguous(), 
    target_lengths)
```

这里使用的 loss function 需要 mask 掉 pad 的 Token，代码如下：

```python
# 代码来自：https://github.com/kevinlu1211/pytorch-batch-luong-attention
def masked_cross_entropy(logits, target, length):
    # logits_flat: (batch * max_length, num_classes=output_size)
    logits_flat = logits.view(-1, logits.size(-1))
    # log_probs_flat: (batch * max_length, num_classes)
    log_probs_flat = F.log_softmax(logits_flat)
    # target_flat: (batch * max_length, 1)
    target_flat = target.view(-1, 1)
    # losses_flat: (batch * max_length, 1)
    losses_flat = -torch.gather(log_probs_flat, dim=1, index=target_flat)
    # losses: (batch, max_length)
    losses = losses_flat.view(*target.size())
    # mask: (batch, max_length)
    mask = sequence_mask(sequence_length=length, max_len=target.size(1))
    losses = losses * mask.float()
    loss = losses.sum() / length.float().sum()
    return loss
```

`sequence_mask` 返回一个 target_var 的 mask Tensor。比如：

```python
"""
# target_var
tensor([[  12,   21,    4,   31],
        [  13,   13,   46,   54],
        [  44, 1844, 1961, 1938],
        [  29, 1845,    9,    9],
        [ 931,    9,    3,    3],
        [   9,    3,    0,    0],
        [   3,    0,    0,    0]])
target.size(1)
# losses
tensor([[7.8367, 7.9381, 7.8862, 7.8695, 8.0942, 7.8369, 8.1076],
        [8.0719, 7.9407, 7.8208, 7.8800, 7.8822, 8.0856, 8.3650],
        [7.9334, 7.9262, 7.9541, 7.7630, 8.1345, 8.3291, 8.3044],
        [7.7619, 7.9629, 8.0988, 7.8717, 8.1288, 8.3198, 8.2923]],
       grad_fn=<ViewBackward>)
# mask tensor
tensor([[ True,  True,  True,  True,  True,  True,  True],
        [ True,  True,  True,  True,  True,  True, False],
        [ True,  True,  True,  True,  True, False, False],
        [ True,  True,  True,  True,  True, False, False]])
"""
```

其余的都一目了然。

### 如何使用结果

Encoder 和训练时一样的，只需改一下 Decoder 每一个 time step 的 input 就可以了，代码如下：

```python
for t in range(max_target_length):
    decoder_output, decoder_hidden, attn_weights = decoder(
        decoder_input, decoder_hidden, encoder_outputs)
    topv, topi = decoder_output.data.topk(1)
    decoder_input = topi.squeeze().detach()
    print([index2word(topi[i].item()) for i in range(batch_size)])
```

### 数据和实验

使用了 WMT 英德互译的平行语料，结果如下：

![](http://qnimg.lovevivian.cn/paper-luong-attention-2.jpeg)

另外有个 Attention 机制的结果可以注意下：

![](http://qnimg.lovevivian.cn/paper-luong-attention-3.jpeg)

作者得出的结论为：

- Global + location 效果不好
- Concat 效果不好
- Global + dot 效果不错
- Local + general 效果不错

## Discussion

### 相关工作

**计算源句子表征和选择 Decoder RNN 结构的不同**：

- 使用标准 RNN 作为 Decoder，CNN 去表征源句子， s 只在初始化 decoder hidden state 时被使用。
    - [Kalchbrenner and Blunsom 2013] N.Kalchbrennerand P. Blunsom. 2013. Recurrent continuous translation models. In *EMNLP*. 
- 使用 Stack LSTM 作为 Encoder 和 Decoder， s 只在初始化 decoder hidden state 时被使用。
    - [Sutskever et al.2014] I. Sutskever, O. Vinyals, and Q. V. Le. 2014. Sequence to sequence learning with neural networks. In *NIPS*.
    - [Luong et al.2015] M.-T. Luong, I. Sutskever, Q. V. Le, O. Vinyals, and W. Zaremba. 2015. Addressing the rare word problem in neural machine translation. In *ACL*. 
- 使用 GRU 作为组件：
    -  s 只在初始化 decoder hidden state 时被使用。
        - [Cho et al.2014] Kyunghyun Cho, Bart van Merrien- boer, Caglar Gulcehre, Fethi Bougares, Holger Schwenk, and Yoshua Bengio. 2014. Learning phrase representations using RNN encoder-decoder for statistical machine translation. In *EMNLP*.
    - s 实际使用了一组 source hidden states。
        - [Bahdanau et al.2015] D. Bahdanau, K. Cho, and Y. Bengio. 2015. Neural machine translation by jointly learning to align and translate. In *ICLR*. 
        - [Jean et al.2015] Se ́bastien Jean, Kyunghyun Cho, Roland Memisevic, and Yoshua Bengio. 2015. On using very large target vocabulary for neural ma- chine translation. In *ACL*.

**注意力机制**：

- soft and hard attention: [Xu et al.2015] Kelvin Xu, Jimmy Ba, Ryan Kiros, Kyunghyun Cho, Aaron C. Courville, Ruslan Salakhutdinov, Richard S. Zemel, and Yoshua Ben- gio. 2015. Show, attend and tell: Neural image cap- tion generation with visual attention. In *ICML*.
- selective attention: [Gregor et al.2015] Karol Gregor, Ivo Danihelka, Alex Graves, Danilo Jimenez Rezende, and Daan Wier- stra. 2015. DRAW: A recurrent neural network for image generation. In *ICML*.

### 特殊情况

- Input-feeding：见 模型和算法 部分。
- Attention 机制选择：见 数据和实验 部分。

### 打开脑洞

纵观全文，核心点其实就是如何在 Decoder 的时候更好地利用 Encoder 的信息。最一开始的 Seq2Seq 架构，直接使用的是 Encoder 的 hidden state 作为 Encoder 的表征用在 Decoder 的每一步中，现在在每一步都增加了和 Encoder 的互动，这在直觉上确实很 make sense。这块其实还可以做更多的变化，不过论文中的思想确实操作简单且效果不错，而这可能正是深度学习时代所需要的——庞大的网络+简单的思想。

最后还有个小心得：看了论文才发现无论是 Tenforflow 还是 Pytorch，Tutorial 里面的 Attention 都不是原汁原味对论文的实现（想象也肯定会做一些调整的），Pytorch 没明说用的到底是哪个，Tensorflow 可是明明提到了：

> This tutorial uses [Bahdanau attention](https://arxiv.org/pdf/1409.0473.pdf) for the encoder. 

这真的把人看的有点莫名所以。所以以后最好还是先看论文，毕竟是源头。

## Appendix

- [Neural machine translation with attention  |  TensorFlow Core](https://www.tensorflow.org/tutorials/text/nmt_with_attention)
- [NLP From Scratch: Translation with a Sequence to Sequence Network and Attention — PyTorch Tutorials 1.4.0 documentation](https://pytorch.org/tutorials/intermediate/seq2seq_translation_tutorial.html)
- [nmt/attention_model.py at master · tensorflow/nmt](https://github.com/tensorflow/nmt/blob/master/nmt/attention_model.py)
- [OpenNMT-py/global_attention.py at master · OpenNMT/OpenNMT-py](https://github.com/OpenNMT/OpenNMT-py/blob/master/onmt/modules/global_attention.py)
- [kevinlu1211/pytorch-batch-luong-attention](https://github.com/kevinlu1211/pytorch-batch-luong-attention)
- [Attention and Augmented Recurrent Neural Networks](https://distill.pub/2016/augmented-rnns/)
- [Attention and Memory in Deep Learning and NLP – WildML](http://www.wildml.com/2016/01/attention-and-memory-in-deep-learning-and-nlp/)

