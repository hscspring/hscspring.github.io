---
title: Transformer 论文笔记
date: 2019-08-04 23:00:00
categories: Feeling
tags: [NLP, Attention, Transformer, Self-Attention, Position-Encoding]
mathjax: true
---

Paper: https://arxiv.org/pdf/1706.03762.pdf

Code: https://github.com/tensorflow/models/tree/master/official/nlp/transformer

Tool: https://github.com/tensorflow/tensor2tensor

Attention 核心思想：Multi-Head Attention 关注不同位置不同表示子空间的信息，且更容易训练。

## Abstract

一个完全基于 Attention 的架构。更容易并行训练，提高训练速度。

## Introduction

RNN 的固有属性使其难以并行化（即使通过 factorization tricks 和 conditional computation 可以得到改善），Attention 对依赖关系建模，不考虑输入输出的距离。本文提出的 Transformer 采用了完全的 Attention 机制描述输入和输出的整体依赖关系，在训练速度和效果上都有明显提升。

<!--more-->

## Background

ByteNet 和 ConvS2S 通过卷积网络并行计算所有输入和输出位置的隐层表示，它们用来关联从任意两个输入或输出位置的信号的操作数随着距离的增加而增长（ByteNet 对数增长，ConvS2S 线性增长），导致更加难以学习到远距离的依赖关系。Transformer 将这个操作数减到常数，虽然由于平均注意力加权位置而导致有效性降低，但可以通过 Multi-Head Attention 来消除这种影响。

Self-attention，也称 intra-attention，它通过关联序列的不同位置计算序列的表示。

## Model Architecture

![](http://qnimg.lovevivian.cn/paper-attention-is-all-you-need-1.jpeg)

### Encoder and Decoder Stacks

- Encoder
    - 6 层，每层两个子层：一个 multi-head self-attention 层和一个位置敏感的全连接层
    - 子层周围使用残差连接，然后标准化，即每个子层的输出为：LayerNorm(x + Sublayer(x))
    - 所有子层和 embedding 的输出均为 512 维
- Decoder
    - 除了 Encoder 中的子层，还引入第三个子层，即 encoder stack 的输出
    - 修改 self-attention 子层防止位置出现在后续位置，这个 mask 保证位置 i 的预测值只依靠输出中 i 之前的位置

### Attention

一个 Attention 函数：将一个 query 和一组 key-value 对映射为一个 output。query，key，value，output 都是向量，output 就是所有 value 的加权求和，权重由 query 和相应的 key 的函数计算。

**Scaled Dot-Product Attention**
$$
\text { Attention }(Q, K, V)=\operatorname{softmax}\left(\frac{Q K^{T}}{\sqrt{d_{k}}}\right) V
$$
query 和 key 的维度为 dk，一组 Q 的维度为 n×dk

两个最常用的 attention 函数：

- additive attention：使用含有一个隐层的前馈网络计算
- dot-product attention：实际更快更省空间

dk 较小时两种方法差不多，dk 比较大时，additive 比 dot-product 表现更好，作者他们猜测因为增长太大导致 softmax 很小的梯度，所以用 sqrt(dk) scale 了。

**Multi-Head Attention**
$$
\text { MultiHead(} Q, K, V )=\text { Concat (head, }, \ldots, \text { head }_{\mathrm{h}} ) W^{O}
$$

$$
\text { where head }_{i}=\text { Attention }\left(Q W_{i}^{Q}, K W_{i}^{K}, V W_{i}^{V}\right)
$$

$$
W_{i}^{Q} \in \mathbb{R}^{d_{\mathrm{model}} \times d_{k}}, W_{i}^{K} \in \mathbb{R}^{d_{\mathrm{model}} \times d_{k}}, W_{i}^{V} \in \mathbb{R}^{d_{\mathrm{model}} \times d_{v}}
$$

$$
W^{O} \in \mathbb{R}^{h d_{v} \times d_{\mathrm{model}}}
$$

- 文章采用 8 个并行的 attention（也就是 head）
- dk = dv = dmodel/h = 64

![](http://qnimg.lovevivian.cn/paper-attention-is-all-you-need-2.jpeg)

**Applications of Attention**

三种不同的用法：

- 在 encoder-decoder attention 层，query 来自上一个 decoder layer，memory keys 和 values 来自 encoder 的 output
- encoder 包含 self-attention，key value 和 query 来自相同的位置，即前一层的输出。encoder 的每个位置都可以注意到前一层的所有位置
- decoder 与 encoder 类似，通过将所有不合法连接 mask 以防止左边信息溢出（见左上图）

### Position-wise Feed-Forward Networks

$$
\mathrm{FFN}(x)=\max \left(0, x W_{1}+b_{1}\right) W_{2}+b_{2}
$$

- input, output 均为 dmodel（512）维
- inner-layer 为 2048 维

### Embeddings and Softmax

- embedding 为 dmodel（512）维
- embedding layer，权重乘以 sqrt(dmodel)

- 两个 embedding 和 softmax 前的线性变换使用相同的权重

### Positional Encoding

维度为 dmodel（512）
$$
\begin{aligned} P E_{(p o s, 2 i)} &=\sin \left(\operatorname{pos} / 10000^{2 i / d_{\text { model }}}\right) \\ P E_{(p o s, 2 i+1)} &=\cos \left(\operatorname{pos} / 10000^{2 i / d_{\text { model }} }\right)\end{aligned}
$$

- pos 位置
- i 维度

## Why Self-Attention

- 每个 layer 的计算复杂度
- 并行化
- 网络中远程依赖之间的路径长度

几种网络的对比：

![](http://qnimg.lovevivian.cn/paper-attention-is-all-you-need-3.jpeg)

## Train

- Adam: β1 = 0.9, β2 = 0.98 and  ε = 10^−9
- Learning Rate = `d_model^{-0.5} * min(step_num^-0.5, step_num*warmup_steps^-1.5)`
    - warmup_steps 时线性增加 lr
    - 之后将其与步数的倒数平方根成比例减小
    - warmup_steps = 4000
- Regularization
    - Residual Dropout: 
        - 在每一个子层的输出使用（加 input 和 标准化之前，即直接对 Sublayer(x) 使用 ）
        - 在 encoder 和 decoder 中，embedding 和 position encoding 求和后使用
        - Pdrop = 0.1
    - Label Smoothing: εls = 0.1

## Appendix

- [The Annotated Transformer](http://nlp.seas.harvard.edu/2018/04/03/attention.html)
- [The Illustrated Transformer – Jay Alammar – Visualizing machine learning one concept at a time](https://jalammar.github.io/illustrated-transformer/)

