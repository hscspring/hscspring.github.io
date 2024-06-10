---
title: 预训练模型与传统方法在排序上有啥不同？
date: 2022-04-23 23:00:00
categories: Feeling
tags: [AI, NLP, Pretrain, CE BERT, BM25, Rank]
mathjax: true
---

Paper：[[2204.07233] How Different are Pre-trained Transformers for Text Ranking?](https://arxiv.org/abs/2204.07233)

一句话概述：BM25 粗排+CE 精排，你值得拥有。

摘要：近年来与传统的检索模型和反馈方法相比，大规模预训练的效果有了显著提高。不过这些结果主要是基于 [MS Macro/ TREC](https://github.com/microsoft/MSMARCO-Passage-Ranking) 设置，非常特殊，我们对模型为什么好的理解是分散的。本文在文档检索任务上分析了 BERT 的交叉编码器与传统的 BM25 ，研究两个问题：第一，它们的相似之处在哪里？深度学习方法在多大程度上包含了 BM25 的能力，性能的提升是否由于相同文档的排名更高。第二，它们的不同之处是什么？深度学习方法能否检索 BM25 漏掉的文档。

<!--more-->

BERT 的超多参数让它可以处理更长的依赖和复杂的句子结构。当用在排序中时，可以通过在 query 和 document 之间构造深度交互用于揭示复杂的相关性模式。但我们对其相关性估计的基本匹配原则知之甚少，还有模型中编码了哪些特征，以及与传统的稀疏排序器（如 BM25）的关系等。

本文首先通过回答以下问题深入了解 CE（Cross-Encoder）BERT和 BM25（排名）的相互关系：

- CE 和 BM25 排名有何不同？
- CE 能否对 BM25 检索到的文档进行更好地排名？
- CE 能否更好地找到 BM25 漏掉的文档？

然后，隔离和量化「精确和软文档」匹配对整体性能的贡献，具体就是探索以下问题：

- CE 是否包含「精确匹配」？
- CE 还能找到「不可能」的相关结果吗？

之前的相关工作并不太多，主要包括：

- 将 BERT 当做黑盒，经验性地发现精确的 query 匹配和 query 的重要性似乎起着重要作用。
- 测试并定义 IR 公理，或试图通过正则化来执行这些公理。
- 强制实施稀疏编码，并将神经网络排名与稀疏检索相关联。不过这个工作分别独立编码 query 和文档，更加关注（BERT 和 BM25）交互，而不是相互关系。

**实验设置**如下：

- 使用原始的 BERT CE，输入是 query 和文档的拼接，最后 CLS 接二分类，判断相关还是不相关。
- BM25（不带 stemming）获取 top-1000 文档，CE 重排。

Baseline 如下：

![](https://qnimg.lovevivian.cn/paper-pretrained-for-rank.jpg)

另外，下面的描述中，10 100 等分别表示 1-10，10-100，即约定数字表示范围的上界。

**问题1**：CE 和 BM25 排名有何不同？

结果如下图（a）所示：

- CE 和 BM25 在顶部差异很大（CE@10 33%），低排名（CE@1000 60%）时相反。
- CE 将许多文档提升到更高的级别。
- BM25 排名靠前的文档很少被 CE 评为低，说明精确匹配是一种重要的基础排名策略。

**问题2**：CE 能否对 BM25 检索到的文档进行更好地排名？

结果如图（bcd）所示：

- 图（b 第一个）显示，二者都对高度相关的文档表现出 CE@10 的低一致（40%），暗示了两种方法在靠前排名的相关性。
- 相关文档（图c 第一行）观察到两者在前排有有 46% 的交叉，32% 来自 BM25@100，意味着 BM25 低估了许多文档的相关性。另外，出现在较低级别中的高度相关文档源自 BM25 中的高级别（图b图c 第一列），说明 CE 失败并低估了这些文档的相关性。
- 在考虑两种方法都排名较低的文档时，发现@1000的完美一致（图b右下），表明这两种方法将相同（高度）相关的文档标识为不相关。
- 对不相关文档（图d），CE 从低排名中给 CE@10 带来了大量不相关文件，高估了 BM25 正确认为不相关的文档。

**问题3**：CE 能否更好地找到 BM25 漏掉的文档？

结果如图（bc）CE@10 所示：

- 图b：42% 高相关但在 BM25@100 里的被排到 CE@10，13% BM@500；图c 结果类似。说明 CE 可以提取 BM25 漏掉的相关文档，即使原来的排名非常低也没关系。

![](https://qnimg.lovevivian.cn/paper-pretrained-for-rank-2.jpg)

**问题4**：CE 是否包含「精确匹配」？

把文档中所有非查询词替换为 `[MASK]` Token，强制它仅依赖查询词和文档之间的精确匹配。结果如下表（第一行）所示，仅有 query 的 CE 比 BM25 差了很多，说明 CE 没有充分利用精确匹配。

**问题5**：CE 还能找到「不可能」的相关结果吗？

MASK 掉文档中出现的 query 词，模型只使用文档的上下文（此时由于文档中没有 query 词，BM25 返回是随机的）。结果如下表（第二行）所示，相比正常情况掉了不少点，但比第一行结果好很多，说明 CE 能够从上下文中填充 MASK 掉的 Token。

![](https://qnimg.lovevivian.cn/paper-pretrained-for-rank-3.jpg)

**结论**

- 排名靠前的文档通常排名非常不同，但排名底部的文档似乎存在更强的一致性。
- CE 低估了 BM25 正确排名的一些高度相关的文档，同时又高估了不相关的文档。精度的提高主要源于将高度相关的文档从 BM25 的后面提到前面。这也说明了 BM25 可用于召回或粗排，而 CE 则主要用于精排。
- CE 无法仅基于 query 词精确匹配进行排名（效果远差于 BM25），但把文档中的 query 词 MASK 掉后 CE 依然可以排序，尽管性能有所下降。这也是深度学习模型相比传统方法的真正优势。

本文主要探索了深度学习语义排序和传统以词匹配为主的排序，这一类的文章并不多见，不过也许——因为这个太直观了？因为这个背后的本质其实有点类似传统的稀疏表征和稠密表征的区别，结果显然是——显然的——两者各有所长，应当结合使用。另外说一句，这篇论文看着不复杂，但读起来特别吃力，不知道其他小伙伴有没有这种感觉。