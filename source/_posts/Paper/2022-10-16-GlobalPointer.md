---
title: Global Pointer：Novel Efficient Span-based Approach for NER
date: 2022-10-16 23:00:00
categories: Feeling
tags: [AI, NLP, NER, GP, Global Pointer, Span, Class Imbalance Loss]
mathjax: true
---

Paper：[[2208.03054] Global Pointer: Novel Efficient Span-based Approach for Named Entity Recognition](https://arxiv.org/abs/2208.03054)

Code：https://github.com/bojone/bert4keras

一句话概述：全局指针识别 NER，Span 预测得到 NER 类型。

摘要：NER 任务是从一段文本中识别出预先定义的语义实体类型。SOTA 方案通常会因为捕获底层文本的细粒度语义信息而受到影响。基于 Span 的方法克服了这种缺陷，但性能是个问题。本文提出基于 Span 的 NER 框架——全局指针（GP），通过乘法注意力机制利用相对位置，目标是考虑开始和结束位置的全局视图来预测实体。除了设计了两个模块（Token 表征和 Span 预测）来识别实体外，还引入了一种新的损失函数来解决标签不均衡问题，另外还引入了一种简单有效的近似方法减少参数。实验表明 GP 胜过现有方案，此外损失函数也表现出有效性。

<!--more-->

## 核心方法

整体结构图如下：

![](https://qnimg.lovevivian.cn/paper-gp-1.jpg)

简单来说，就是对每个 Label 都预测一个矩阵（也叫多头），除了正常的实体，还可以解决嵌套实体和多类型实体。

Token 的表征使用 PLM（上图为 BERT），接下来是 Span 预测，文中使用两个前馈层，它们依赖 Span 的开始和结束位置。
$$
q_{i,\alpha} = W_{q,\alpha} h_i + b_{q, \alpha} \\
k_{i,\alpha} = W_{k,\alpha} h_i + b_{k, \alpha}
$$
q 和 k 是用来识别实体类型 α 的 Token 向量，分数（注意力）为：
$$
s_{\alpha}(i, j) = q_{i, \alpha}^{T} k_{j, \alpha}
$$
为了利用边界信息，使用 ROPE【1】将位置信息显式地注入模型。打分函数变为：
$$
\begin{aligned}
s_\alpha(i, j) &=\left(\mathcal{R}_i q_{i, \alpha}\right)^{\top}\left(\mathcal{R}_j k_{j, \alpha}\right) \\
&=q_{i, \alpha}^{\top} \mathcal{R}_i^{\top} \mathcal{R}_j k_{j, \alpha} \\
&=q_{i, \alpha}^{\top} \mathcal{R}_{j-i} k_{j, \alpha}
\end{aligned}
$$
**减少参数**

考虑到每一个实体类型都有一个参数矩阵，当实体类型增加时参数会增加。因此，本文提出了 Efficient GP，核心思想是共享打分矩阵参数。具体而言，将 NER 任务分为两个子任务：提取和分类，即先提取实体，再判断类别。此时，提取等价于 NER 任务只有一种实体。新的打分函数为：
$$
s_\alpha(i, j)=\left(W_q h_i\right)^{\top}\left(W_k h_j\right)+w_\alpha^{\top}\left[h_i ; h_j\right]
$$
前面是共享部分，后面是 Span 起始和结束位置向量的拼接。当新增一个实体类型时，参数只增加 2v（v 是 PLM Token 向量的大小）。

为了进一步减少参数，可以将 hi 替换为 `[qi;ki]`，最终打分函数为：
$$
s_\alpha(i, j)=q_i^{\top} k_j+w_\alpha^{\top}\left[q_i ; k_i ; q_j ; k_j\right]
$$
`[qi;ki;qj;kj]` 就是 Span 的表征。此时，新增一个实体类型新增的参数为 4d（d 是最终 Token 向量大小）。

**不均衡标签损失**

单标签分类的交叉熵损失函数为：
$$
\log \frac{e^{s_t}}{\sum_{i=1}^n e^{s_i}}\\
=-\log \frac{1}{\sum_{i=1}^n e^{s_i-s_t}}\\
=\log \left(1+\sum_{i=1, i \neq t}^n e^{s_i-s_t}\right)
$$
考虑多标签分类，损失函数为：
$$
\log \left(1+\sum_{i \in \Omega_{n e g}} e^{s_i} \sum_{j \in \Omega_{p o s}} e^{-s_j}\right)
$$
目标是使目标类分数不低于非目标类分数。由于标签数量不确定，引入一个额外的类型 TH 作为阈值，期望目标类分数大于阈值，非目标类分数小于阈值。损失函数变为：
$$
\log \left(1+\sum_{i \in \Omega_{n e g}, j \in \Omega_{p o s}} e^{s_i-s_j}+\sum_{i \in \Omega_{n e g}} e^{s_i-s_{T H}}+\sum_{j \in \Omega_{p o s}} e^{s_{T H}-s_j}\right) \\
= \log \left(e^{s_{T H}}+\sum_{i \in \Omega_{n e g}} e^{s_i}\right)+\log \left(e^{-s_{T H}}+\sum_{j \in \Omega_{p o s}} e^{-s_j}\right)
$$
令阈值=0，最终的损失函数为：
$$
\log \left(1+\sum_{i \in \Omega_{n e g}} e^{s_i}\right)+\log \left(1+\sum_{j \in \Omega_{p o s}} e^{-s_j}\right)
$$
推理时，只要 `Sα > 0`，就表示对应的实体类型为 α。

## 实验结果

在几个数据集上效果如下：

![](https://qnimg.lovevivian.cn/paper-gp-2.jpg)

一些参数如下：dropout 0.1，30 epochs，2e-5 LR，batch size 32，用 BERT-base 初始化 GP，Adam 优化器。

性能对比如下：

![](https://qnimg.lovevivian.cn/paper-gp-3.jpg)

关于相对位置和不均衡标签损失函数的实验结果如下：

![](https://qnimg.lovevivian.cn/paper-gp-4.jpg)

相对位置非常关键！

关于 Efficient GP 的实验：

![](https://qnimg.lovevivian.cn/paper-gp-5.jpg)

精心设计的减少参数的机制还能提升性能。

最后是实体长度和密度的实验：

![](https://qnimg.lovevivian.cn/paper-gp-6.jpg)

分类如下：

- L1：Length<3
- L2：3<=Length<6
- L3：L>=6
- D1：Dense<=0.1
- D2：0.1<Dense<=0.3
- D3：Dense>0.3

这个结果很有意思：密度和长度中等的效果都不好。

## 小结

GP 的两个模块拆分和新的 Loss 都非常值得借鉴。另外，苏神的公式推导真的很精彩，这篇 Paper 算是之前好几篇博文的一个总结输出了，推荐去作者[个人网站](https://kexue.fm/)阅读原始博文，理解思路成型过程。

## 参考文献

【1】[[2104.09864] RoFormer: Enhanced Transformer with Rotary Position Embedding](https://arxiv.org/abs/2104.09864)
