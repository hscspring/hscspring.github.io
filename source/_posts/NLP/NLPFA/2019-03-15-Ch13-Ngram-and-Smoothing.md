---
title: 自然语言计算机形式分析的理论与方法笔记(Ch13)
date: 2019-03-15 11:32:00
categories: Feeling
tags: [NLP, AI, Ngram, Smoothing]
mathjax: true
---

# 第十三章：N 元语法和数据平滑

## N 元语法

N 元语法模型利用前面 N-1 个单词来预测下一个词。一些特殊情况：标点、大小写、屈折变化等。

一个单词的概率只依赖于它前面一个单词的这种假设叫作 Markov 假设，这样的模型叫 Bi-gram，即二元语法模型，也叫一阶 Markov 模型。

N 元语法模型可以使用训练语料库 “归一化” 得到。

$$p(w_n|w_{n-1}) = \frac {C(w_{n-1}w_n)}{\sum_w C(w_{n-1}w)}$$

以 $$w_{n-1}$$ 开头的二元语法计数必定等于 $$w_{n-1}$$ 这个单词的计数，于是：

$$p(w_n|w_{n-1}) = \frac {C(w_{n-1}w_n)}{C(w_{n-1})}$$

一般化 N 元语法的参数估计：

$$p(w_n|w_{n-N+1}^{n-1}) = \frac {C(w_{n-N+1}^{n-1}w_n)}{C(w_{n-N+1}^{n-1})}$$

两个重要事实：

- N 增加时，精确度相应增加，同时生成句子的局限性增加（可选的下个词减少）
- 严重依赖于语料库

<!--more-->

## 数据平滑

N 元语法在特定语料中会有大量零概率的情况，但实际上可能并非如此，因此需要给某些零概率和低概率的 N 元语法重新赋值，这就是 “平滑”。

- Additive
    - 给取出来的二元语法的计数全部加一，即：(ci + 1)/(N+V)，V 是词表大小，因为每个都加一，所以分母加 V，$$p*(w_n|w_{n-1}) = \frac {C(w_{n-1}w_n) + 1}{C(w_{n-1}) + V}$$。
    - 一个很大的问题是，每个二元语法计数加一，对应的一元语法加 V，如果某个一元语法本来出现的次数很少的话，会使其概率发生急剧变化。比如：“蝴蝶 吃饭”，我们假设它在语料中出现了 1 次，“蝴蝶” 出现了 2 次，本来的概率是 1/2=0.5，如果词表大小是 1000，概率就会变成 2/(1000+2)。当然，如果 “蝴蝶 吃饭” 没有出现在语料中，那这样的概率是可以接受的。问题就在于那些出现概率本身不高的词。
    - 同样的问题也表现在未登录词上，会给较高的概率，尤其词表非常大的时候。这相当于人为稀释了所有在训练数据中词的概率（意味着提高了未登录词的概率）。根本原因还是数据太稀疏。
    - 除了上面介绍的加一，还可以加 α（一个比较小的数），大同小异，可以参考：[LM](https://yam.gift/2017/10/14/SLP/2017-10-14-Language-Model/)

- Witten-Bell
    - 1991年提出，思想：看一个零概率 N 元语法的概率可以用首次看一个 N 元语法的概率模拟，即借助 “第一次看过的事物” 的数量估计 “从没见过的事物” 的概率。
    - 所有零的 N 元语法的全部概率为：T/(N+T)，N 表示所有 Ngram 数，T 表示不重复的 Ngram 数。假设有 Z 个零次 Ngram，每个的概率为：T/((N+T)Z)；非零次的 Ngram，每个的概率为：Ci/(N+T)。

- Good-Turing

    - 1953 年提出，思想：用观察计数较高的 N 元语法数的方法，来重新估计概率，并把它指派给零计数或低计数的 N 元语法。新的平滑计数：$$c^* = (c+1) \frac{N_{c+1}}{N_C}$$

    - c 表示从未出现过的 N 元语法计数，比如 c=0，Nc=10 万 表示 10 万个 N 元语法计数为 0，c\*=(0+1) × N_(c+1)/Nc；依次类推可以求出 c=1、2…… 时的 c\*，进而可以使用 c\* 来表示原来的计数 c。出现 0 次的自然也被 c=0 对应的 c\*（一般是一个比较小的数）替换，也就实现了平滑。

    - 实际上，并不是对于所有的计数 c 都使用打折，较大的计数是可靠的，Katz（首先把 Good-Turing 打折算法用于 N 元语法平滑）建议取某个阈值 k=5：

        $$c^* = \frac{(c+1)\frac{N_{c+1}}{N_c} -c \frac{(k+1)N_{k+1}}{N_1}} {1-\frac{(k+1)N_{k+1}}{N_1}}, 1≤ c ≤ k$$

上面的方法都是解决零频率 N 元语法问题，此外还可以通过利用对应的 N-1 元或更低元的语法来计算。主要有两种方法：Backoff 和 Interpolation，Backoff 中，只有当阶数较高的 N 元语法中存在零计数时，才把阶数较高的 N  元语法降为阶数较低的 N 元语法。

- Katz Smoothing (Backoff)
    - 1987 年提出
    - $$\hat {P}(w_i|w_{i-2}w_{i-1}) = {P(w_i|w_{i-2}w_{i-1}), c(w_{i-2}w_{i-1}w_i) > 0}$$
    - $$\hat {P}(w_i|w_{i-2}w_{i-1}) = {\alpha_1 P(w_i|w_{i-1}), c(w_{i-2}w_{i-1}w_i) = 0\ and\ c(w_{i-1}w_i) > 0}$$
    - $$\hat {P}(w_i|w_{i-2}w_{i-1}) = {\alpha_2 P(w_i), other}$$
    - α 的目的是使等式的结果为真正的概率，保证：$$\sum_{i,j} P(w_n|w_iw_j) = 1$$

- Jelinek-Mercer Smoothing (Deleted Interpolation)
    - 1980 年提出，使用线性插值把不同阶的语法结合起来，不同阶通过权值加权
    - $$\hat {P}(w_n|w_{n-1}w_{n-2}) = {\lambda_1 P(w_n|w_{n-1}w_{n-2}) +\lambda_2 P(w_n|w_{n-1}) + \lambda_3 P(w_n)},\ \sum_i \lambda_i = 1$$
    - 实际不仅仅只为三元语法训练三个 λ，还把每一个 λ 看成上下文的函数。

另外还有以下两种表现不错的平滑算法，可以参考：[LM](https://nbviewer.jupyter.org/github/hscspring/Note_NLP/blob/master/CMU-NeuralNetworksforNLP2017/02-lm/02-lmNote.ipynb)

- Absolute Discounting: Discounting of the counts for frequent N-grams is necessary to save some probability mass for the smoothing algorithm to distribute to the unseen N-grams.
- Kneser-Ney Smoothing: Augments absolute discounting with a more sophisticated way to handle the lower-order unigram distribution.

对于大语料，可以使用非常简单的 Stupid Backoff：放弃了计算真实的概率分布，高阶没有折扣概率，如果高阶 N-gram 的计数为零，只需退回到低阶 N-gram，使用固定权重，可以参考：[LM](https://nbviewer.jupyter.org/github/hscspring/Note_NLP/blob/master/CMU-NeuralNetworksforNLP2017/02-lm/02-lmNote.ipynb)。

**Add-One and Witten-Bell Example**（语料中共有 1616 个不同的 Type），假设咱们需要平滑下面 Bi-gram：

| 原始统计表  | I    | want | to   | eat  | Chinese | food | lunch | ...  | Nw   | Tw   | Zw   |
| ----------- | ---- | ---- | ---- | ---- | ------- | ---- | ----- | ---- | ---- | ---- | ---- |
| **I**       | 8    | 1087 | 0    | 12   | 0       | 0    | 0     |      | 3437 | 95   | 1521 |
| **want**    | 3    | 0    | 786  | 0    | 6       | 8    | 6     |      | 1215 | 76   | 1540 |
| **to**      | 3    | 0    | 10   | 860  | 3       | 0    | 12    |      | 3256 | 130  | 1486 |
| **eat**     | 0    | 0    | 2    | 0    | 19      | 2    | 52    |      | 938  | 124  | 1492 |
| **Chinese** | 2    | 0    | 0    | 0    | 0       | 120  | 1     |      | 213  | 20   | 1592 |
| **food**    | 19   | 0    | 17   | 0    | 0       | 0    | 0     |      | 1506 | 82   | 534  |
| **lunch**   | 4    | 0    | 0    | 0    | 0       | 1    | 0     |      | 459  | 45   | 1571 |
| ...         |      |      |      |      |         |      |       |      |      |      |      |

| 原始 prob | I    | want | to   | eat  | Chinese | food | lunch |
| ----------- | ---- | ---- | ---- | ---- | ------- | ---- | ----- |
| **I**       | .0023 | .32 | 0    | .0038 | 0       | 0    | 0     |
| **want**    | .0025 | 0    | .65 | 0    | .0049   | .0066 | .0049 |
| **to**      | .00092 | 0    | .0031 | .26 | .00092  | 0    | .0037 |
| **eat**     | 0    | 0    | .0021 | 0    | .02    | .0021 | .055 |
| **Chinese** | .0094 | 0    | 0    | 0    | 0       | .56 | .0047 |
| **food**    | .013 | 0    | .011 | 0    | 0       | 0    | 0     |
| **lunch**   | .0087 | 0    | 0    | 0    | 0       | .0022 | 0     |

- Add-One

计算 Bi-gram 的 probability：$$P(w_n|w_{n-1}) = (C(w_{n-1} w_n)+1)/(C(w_n)+V)$$

| 加一 prob   | I      | want   | to     | eat    | Chinese | food   | lunch  |
| ----------- | ------ | ------ | ------ | ------ | ------- | ------ | ------ |
| **I**       | .0018  | .22    | .0002  | .0028  | .0002   | .0002  | .0002  |
| **want**    | .0014  | .00035 | .28    | .00035 | .0025   | .0032  | .0025  |
| **to**      | .00082 | .00021 | .0023  | .18    | .00082  | .00021 | .0027  |
| **eat**     | .00039 | .00039 | .0012  | .00039 | .0078   | .0012  | .021   |
| **Chinese** | .0016  | .00055 | .00055 | .00055 | .00055  | .066   | .0011  |
| **food**    | .0064  | .00032 | .0058  | .00032 | .00032  | .00032 | .00032 |
| **lunch**   | .0024  | .00048 | .00048 | .00048 | .00048  | .00096 | .00048 |

加一平滑后的数量：使用上面的 prob × C(Wn)

| 加一 Smooth | I    | want | to   | eat  | Chinese | food | lunch |
| ----------- | ---- | ---- | ---- | ---- | ------- | ---- | ----- |
| **I**       | 6    | 740  | .68  | 8.84 | .68     | .68  | .68   |
| **want**    | 2    | .42  | 331  | .42  | 3       | 4    | 3     |
| **to**      | 3    | .69  | 8    | 594  | 3       | .69  | 9     |
| **eat**     | .37  | .37  | 1    | .37  | 7.4     | 1    | 20    |
| **Chinese** | .36  | .12  | .12  | .12  | .12     | 15   | .24   |
| **food**    | 10   | .48  | 9    | .48  | .48     | .48  | .48   |
| **lunch**   | 1.1  | .22  | .22  | .22  | .22     | .44  | .22   |

- Witten-Bell

根据 T/(N+T)Z 和 Ci/(N+T) 分别计算为 0 和不为 0 概率，如：95/((3437+95) × 1521)，8/(3437+95)。

| WB prob | I    | want | to   | eat  | Chinese | food | lunch |
| ----------- | ---- | ---- | ---- | ---- | ------- | ---- | ----- |
| **I**       | .0023 | .31 | .0000177 | .0037 | .0000177 | .0000177 | .0000177 |
| **want**    | .0023 | .000038 | .61 | .000038 | .0046   | .0062 | .0046 |
| **...**   |       |         |          |         |          |          |          |


| WB Smooth | I    | want | to   | eat  | Chinese | food | lunch | ...  | Nw   |
| ----------- | ---- | ---- | ---- | ---- | ------- | ---- | ----- | ---- | ---- |
| **I**       | 7.78 | 1057.76 | .061 | 12.65 | .06     | .06  | .06   |      | 3437 |
| **want**    | 2.82 | .046 | 739.73 | .046 | 5.65  | 7.53 | 5.65  |      | 1215 |
| **...**    |      |         |        |       |         |      |       |      |      |

以上具体计算可以参考代码：[Smoothing](https://nbviewer.jupyter.org/github/hscspring/All4NLP/blob/master/Ngram/Smoothing.ipynb)


Ngram 可以用于处理上下文有关的错误，基本思想是：对于句子中的每个单词生成它的一切可能的错误拼写，或者是只包括排版印刷错误而造成的错拼，或者是也包括同音词造成的错拼，然后选出使该句子具有最高先验概率的拼写。此外还有 Bayes 分类法、Bayes 分类法与三元语法结合、判定表方法、基于转换的学习方法、潜在语义分析法、筛选算法（效果最好）。

## 小结

- N 元语法
    - 一个单词的概率只依赖于它前面一个单词的这种假设叫作 Markov 假设，这样的模型叫 Bi-gram，即二元语法模型，也叫一阶 Markov 模型。
    - N 增加时，精确度相应增加，同时生成句子的局限性增加（可选的下个词减少）；严重依赖于语料库。
- 数据平滑
    - Add-One (Add-α)：简单，未登录词或低概率词会被给予过高的概率。
    - Witten-Bell：看一个零概率 N 元语法的概率可以用首次看一个 N 元语法的概率模拟。
    - Good-Turing：可以复杂，但简单修改也能工作的很好；仍然没有区分不同类型的罕见事件。
    - Katz Smoothing (Backoff)/Jelinek-Mercer Smoothing (Deleted Interpolation)：利用对应的 N-1 元或更低元的语法（结合不同阶）来计算；前者只有当阶数较高的 N 元语法中存在零计数时，才把阶数较高的 N  元语法降为阶数较低的 N 元语法。。
    - Absolute Discounting/Kneser-Ney Smoothing：前者对 N 元语法计数进行绝对折扣；后者假设过去在更多情境中出现的词语更有可能出现在某些新的语境中。
- 具体表现

    - Jelinek-Mercer 在小型训练集上表现更好； Katz 在大型训练集上表现更好。
    - Katz 平滑对大数量的 N-gram 表现良好； Kneser-Ney 最适合小数量。
    - 在低（非零）计数的 Ngram 上，Jelinek-Mercer 优于 Katz。
    - Absolute Discounting 优于 Linear Discounting。
- 应用场景
    - Applications like Text Categorization Add one smoothing can be used.
    - State of the art technique Kneser-Ney Smoothing: both interpolation and backoff versions can be used.
    - Very large training set like web data like Stupid Backoff are more efficient.



这章虽然是非常简单的 Ngram 语法，但 Smoothing 的各种算法却非常有意思，从中可以深刻地感受到对一个简单问题处理的智慧，我想这可能也是算法的魅力吧。关于 Witten-Bell Smoothing 找了好久才找到一个容易理解的资料（参考文献 2），更多关于 N-gram 和 Smoothing 可以参阅：[LM](https://nbviewer.jupyter.org/github/hscspring/Note_NLP/blob/master/CMU-NeuralNetworksforNLP2017/02-lm/02-lmNote.ipynb)



**参考文献**：

- [Computational Linguistics](https://gawron.sdsu.edu/compling/course_core/lectures/smoothing.htm) 加一平滑的例子不错。
- [Foundations of Artificial Intelligence · Advanced AI Techniques - Lectures](http://gki.informatik.uni-freiburg.de/teaching/ws0607/advanced/lecture.html) 参考了 7b 的 Witten-Bell 平滑。
- [20050421-smoothing-tutorial.pdf](https://nlp.stanford.edu/~wcmac/papers/20050421-smoothing-tutorial.pdf) 和 [scribe6.pdf](https://www.cl.uni-heidelberg.de/courses/ss15/smt/scribe6.pdf) 比较全面介绍了各种平滑算法的思想。
- [All4NLP/Ngram at master · hscspring/All4NLP](https://github.com/hscspring/All4NLP/tree/master/Ngram) 有两个不错的 PPT。

还有几个可以的课件：

- [CS546:Learning and NLP Lec 6: Ngrams and Backoff Models](http://l2r.cs.uiuc.edu/~danr/Teaching/CS546-09/Lectures/Lec5-Stat-09-ext.pdf)
- [lect05-smoothing.pdf](https://www.cs.jhu.edu/~jason/665/PDFSlides/lect05-smoothing.pdf)
- [lect03-smooth](http://www.cs.virginia.edu/~kc2wc/teaching/NLP16/slides/03-smooth.pdf)
- [CS136a_Lect11_PerplexityAndSmoothing](http://www.cs.brandeis.edu/~cs136a/CS136a_Slides/CS136a_Lect11_PerplexityAndSmoothing.pdf)