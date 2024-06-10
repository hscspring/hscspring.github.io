---
title: 句子表征综述
date: 2022-03-27 23:30:00
categories: Thinking
tags: [AI, NLP, Sentence Representation]
mathjax: false
---

早上收到从 Google Scholar 推送的宗成庆老师团队 2019 年的一篇 Paper：《Towards Sentence-Level Brain Decoding with Distributed Representations》，看这个题目觉得挺有趣就翻开读了读。这篇 Paper 研究的核心是：从大脑激活的模式解码整个句子，即构建解码器，通过分布式表示将大脑活动与句子刺激联系起来。并比较了句子表示与高级认知功能相关的不同大脑区域的对应关系，发现**有监督的结构化表示模型最准确地探索了人类大脑的语言图谱**。句子的表征 NLPer 们应该都很熟悉，那大脑的激活又是怎么弄呢？作者使用了 Nature 的一篇论文《Toward a universal decoder of linguistic meaning from brain activation》【1】中的研究成果，这篇论文主要研究从图像数据中解码语言（单词和句子）意义，结果表明，解码表示甚至可以区分语义相似的句子，并捕捉到句子之间意义关系的相似结构。这就是说，我们在看到不同的单词和句子时，大脑内部显示出不同的状态，这种状态甚至在很相似的句子之间也表现的不同。关于项目的详细情况可以查阅【2】（我没细看 :D）。

宗老师这篇 Paper 正好涉及到两个我个人比较感兴趣的点：认知科学和句子表征，关于这两个方面，我之前的几篇小文都涉及过，比如：

- [NLP 与 AI | Yam](https://yam.gift/2018/07/22/NLP/2018-07-22-NLP-and-AI/)
- [语言、AI、情感 | Yam](https://yam.gift/2017/09/07/NLP/2017-09-07-Language-AI-Emotion/)
- [NLP 表征的历史与未来 | Yam](https://yam.gift/2020/12/12/NLP/2020-12-12-NLP-Representation-History-Future/)

抛开认知部分不谈，句子表征也是一个很有意思的方向，因为相比「词」，「句子」才是基本的『语义单位』。恰巧这篇 Paper 中也提到了不少句子表征的方法，正好一起来个梳理，顺便表达一点自己的脑洞。

<!--more-->

谈到句子表征，在 Embedding 之前主要是基于「计数」进行表示（共现矩阵），具体可以看这篇[文章](https://yam.gift/2021/10/27/NLP/2021-10-27-Senta/)，这一时期的代表是 TF-IDF ，不过计数方法没有考虑上下文顺序，而且维度往往较高（词表大小），需要使用类似 SVD 这样的降维方法。需要说明的是，这个计数既可以在整个文档上进行，也可以在一个范围的滑动窗口内进行。

到了深度学习时代，我们一定会首先想到 2013 年的 Word2Vec——没错，句子是由词构成的，有了词向量，句子向量自然而然呼之欲出了。直觉看，直接对每个词的**向量拼接、求和、逐元素相乘、取平均值或最大值**，得到的向量都可以表示为句子向量。当然，这里面也有一些花样，比如加权重求和：权重可以根据词性、句法结构等设定一个固定值，然后对每个位置的词向量乘权重再求和；权重也可以根据输入向量来，输出向量的_每个元素_都根据输入元素向量进行加权求和。具体可查看参考文献【3】的第 3.2 节和第 4.2 节。在这种简单操作词向量得到句子向量的搞法中最有名的就是 [FastText](https://github.com/facebookresearch/fastText)，它是用词向量的平均值作为句子向量的，以此为基础的分类模型（FastText 自带的分类模型）长期以来都是 Baseline。另外还有一个很直观的做法，就是利用训练 Word2Vec 的方法，将「句子」看成「词」，这样得到的就是句子向量了。不过这一类做法都有一些弊病，比如简单平均或求和会损失很多信息；将句子当做词训练需要对每个文档都进行训练，泛化能力太弱。

参考文献【3】还提到一类方法（函数方法）比较有意思，该方法中，一些词是由标准向量表示的参数的形式，而另一些词是对这些参数应用一些函数的函子，比如将形容词定义为函子，名词作为参数。还有模型将短语树中的每个节点与一个向量和一个矩阵相关联，其中向量包含节点的含义，矩阵显示节点如何改变相邻单词或短语的含义。可以看出，这类方法一般涉及到词法和句法。

2014 年，Google（还就是词向量的 Mikolov 等人）发表了一篇专门处理句子向量的 Paper——Doc2Vec（参考文献【4】）。其思想是在**每句话前面增加一个额外的「段落」Token 作为段落的向量表征**，可以将它视为当前上下文没有覆盖的「记忆」，或者该段落的主题，因此常被称为 PV-DM 模型（Distributed Memory Model of Paragraph Vectors）。训练过程中预测上下文词时，需要使用（拼接）这个段落向量。在同一个段落内，不同的滑动窗口中该向量是共享的，词向量和原来一样，同一个词全局是一个向量。推理时，新的没出现过的文档的表示会被增加到已有的段落向量 D 中，然后固定词向量矩阵 W，SoftMax 参数 U 和 b，并执行梯度下降去更新 D 的参数，D 会被用在一个标准分类器上进行标签预测。[Gensim](https://radimrehurek.com/gensim/models/doc2vec.html) 集成了这个功能。Doc2Vec 相比 BOW 有两个优势：继承了词向量的语义；考虑了词序。另外这篇 Paper 还介绍了一种不考虑词序的方法——直接根据段落 Token 的表征预测该段落随机窗口中的随机 Token，该方法也被称为 PV-DBOW（Distributed Bag of Words version of Paragraph Vector）。PV-DM 在大多数任务上效果较好，PV-DM + PV-DBOW  通常更加一致。

Doc2Vec 虽然是一个很大的进步，但推理时每次都要更新参数，这就很不友好了；而且它本质上还是 BOW 那一套无监督的方法，相比监督算法稍弱了些。随着深度学习的进一步发展，模型开始逐渐变得复杂，而词向量也慢慢成为了一个最基本的组件。此时，句子的表征方式就开始变得多样化了，因为不同的架构对词向量的「使用方式」不同。但总的来说，不同的架构通过对词向量进行一系列编码后会得到一个不错的句子表征。词向量的重要性在不断下降（只是一个中间结果），我们会直接使用「整体」的表征，这个整体可以是一个句子，或者一个段落，甚至一篇文章。TextCNN 和 RNN 是早期的两个 NLP 基础模型架构，前者一般用于分类任务，通过多个卷积核（滤波器）对输入的特征进行滑动扫描，得到相应的高维特征，再使用最大或平均池化得到该通道的特征，最后将特征拼接后作为整体句子的表征。TextCNN 由于效果不错再加上性能强劲，长期以来不止作为 Baseline 存在，也是线上推理的首选架构。它最大的问题是没考虑全局语义，滤波器的大小一般是 2 3 4，也是常用的 Ngram 的 N 的取值。RNN 一般用于序列任务，因为它是一个时序模型，处理时从前到后一个 Token 接着一个 Token 处理，最后一个 Token 的表示往往就是整个句子的表示，因为它携带了之前所有位置的信息。RNN 主要有两个问题，一个是慢，另一个是梯度衰减和爆炸，虽然有 LSTM 和 GRU 对后一个问题有所缓解，但长距离依赖的问题依然突出，导致 RNN 类的模型会将语义更多「关注」在后面的 Token 上。关于这方面的更多内容可以看这篇文章：[NLP 表征的历史与未来 | Yam](https://yam.gift/2020/12/12/NLP/2020-12-12-NLP-Representation-History-Future/)。

Paper 中还介绍了一些在预训练时代之前的方法。首先是结构化表示模型（关注句子的顺序和结构）中的「无监督方法」，典型代表是 Skip-thought，通过训练一个基于 RNN（GRU）的 Encoder-Decoder 模型，该模型通过 Decoder 重建编码（Encoder）句子的上下文，类似 CBOW 的方式，通过中间的句子生成上下文的句子，共享语义和句法属性的句子被映射到相似的向量表示。训练完之后，Encoder 就可以作为一个句向量抽取模块了。可以看出这种方法结合了 Word2Vec 的无监督思想和当时较好的模型架构，现在回头看也是一种不错的创新。要说不足，就是训练速度太慢了。关于详细的训练细节和可以查阅参考文献【5】。

然后是「非结构化模型」下的 Pooling 方法，代表分别是：FastSent（参考文献【6】）和 SIF（参考文献【7】）。FastSent 主要思想是将当前句子的词向量加起来作为句子向量，然后预测上下文句子，这相比 Skip-thought 训练速度就快一些了。SIF（Smooth Inverse Frequency）对词向量进行加权平均，频率越高权重越小，相当于对高频词下采样。另外，对加权平均后的向量，减掉第一主成分向量（语法相关的最常见的话语，通过计算一组句子的第一主成分来估计）得到最终的句子向量。可以看出，这种方法可以用在任意类型的词向量上。当然，还有更简单的 Pooling 方法，就是将平均和最大池化拼接起来，直观上看可以捕获句子的互补语义信息。但总的来说，非结构化模型忽略了句子中词的顺序和句子的结构，更多的是「以词表义」，后面的方法开始逐步转向结构化表示模型。

结构化表示模型中无监督的代表是 Skip-thought，上文已经介绍过了，Quick-thought（参考文献【8】）可以看成是高级版的 Skip-thought，它将句子预测公式化为分类任务，极大地提升了训练速度。具体来说，给定一个句子及其上下文，分类器根据它们的向量表示将上下文句子与其他对比句子区分开来。还有一些其他的细节，比如对给定句子和候选集使用不同的 Encoder，测试时会使用两个 Encoder 结果的拼接；向量交互采用简单的点乘让分类器参数最小，从而期望 Encoder 能学到更好的表征；训练时采用一个窗口内句子是/不是上下文的二分类任务，而未采用负采样。Quick-thought 的想法现在看来都非常优雅，已经有了对比学习的影子。

无监督的说完了，自然少不了有监督方法了。代表是 InferSent（参考文献【9】）和 GenSen（参考文献【10】），前者是单任务，后者是多任务。InferSent 是 FaceBook 2018 年提出来的，主要思想是利用有监督数据集学习句子表征，结果表明推理数据集效果最好，论文认为它是一项高级理解任务，涉及推理句子中的语义关系。在分类之前，两个输入的句子（前提和假设）会进入共享的 Encoder 分别得到表征，然后有三种不同的交互策略：拼接、逐元素相乘和向量差绝对值。对于 Encoder，论文使用了 7 种不同的结构：RNN、LSTM、拼接 BiGRU 双向最后的隐向量、BiLSTM+平均池化、BiLSTM+最大池化、BiLSTM+自注意力、分层卷积（4 个卷积层+最大池化），最终的效果是 BiLSTM+最大池化最好。GenSen 采用多任务学习的框架，多个任务共享 Encoder，论文假设通过在相当多的弱相关任务上训练学习到的句子表示将更好地推广到训练数据以外的新任务，因为这个过程编码了多个模型的归纳偏差。任务采用 Seq2Seq 架构，Encoder 结构是 BiGRU，Decoder 是单向 GRU。

总而言之，在预训练时代之前其实已经有了各式各样的成果了，不同的表示方法、不同的训练范式、不同的模型架构可谓百花齐放，这里面很多思路现在回过头看都会忍不住让人点赞。但总的来说可以归纳成下面几类：

- 如何表示
    - 词向量 Pooling（拼接、求和、平均、加权平均、最大）
    - 压缩到一个 Token（Doc2Vec）
    - 借助模型架构（RNN 为主）
- 如何学习
    - 以词学句，将句子看成是词的集合。
    - 以句学句，对句子整体进行表征。

- 如何训练
    - 有监督 VS 无监督
    - 单任务 VS 多任务

终于我们到了预训练时代，但其实并没有太多要说的，无论是 Bert，还是之后的 T5，MetaLearning，Prompt 等等，除了在 Pooling 方面由于模型变大，可以 Pooling 不同层，在句子表征方面并无更多创新。不过由于特征抽取能力提升，最终效果也跟着水涨船高，从词或句的角度看，似乎已经用尽了全部力气。也许，下一个创新会从段到句（见[一篇旧文](https://yam.gift/2020/12/12/NLP/2020-12-12-NLP-Representation-History-Future/)）？毕竟，当我们看一段话和一句话时模式看起来好像并不相同。让我们拭目以待。

**参考**：

- 【1】[Toward a universal decoder of linguistic meaning from brain activation | Nature Communications](https://www.nature.com/articles/s41467-018-03068-4)
- 【2】[OSF | Toward a universal decoder of linguistic meaning from brain activation](https://osf.io/crwz7/)
- 【3】[Reyhaneh Hashempour | From Word Vectors to Sentence Vector](https://lct-master.org/getfile.php?id=3759&n=1&dt=TH&ft=pdf&type=TH)
- 【4】[Distributed Representations of Sentences and Documents](https://arxiv.org/pdf/1405.4053v2.pdf)
- 【5】[ryankiros/skip-thoughts: Sent2Vec encoder and training code from the paper "Skip-Thought Vectors"](https://github.com/ryankiros/skip-thoughts)
- 【6】[fh295/SentenceRepresentation](https://github.com/fh295/SentenceRepresentation)
- 【7】[PrincetonML/SIF: sentence embedding by Smooth Inverse Frequency weighting scheme](https://github.com/PrincetonML/SIF)
- 【8】[lajanugen/S2V: ICLR 2018 Quick-Thought vectors](https://github.com/lajanugen/S2V)[lajanugen/S2V: ICLR 2018 Quick-Thought vectors](https://github.com/lajanugen/S2V)
- 【9】[facebookresearch/InferSent: InferSent sentence embeddings](https://github.com/facebookresearch/InferSent)
- 【10】[Maluuba/gensen: Learning General Purpose Distributed Sentence Representations via Large Scale Multi-task Learning](https://github.com/Maluuba/gensen)
