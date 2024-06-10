---
title: LLM Tiny Pretrain：H2O-Danube and Stable LM
date: 2024-02-03 23:00:00
categories: Feeling
tags: [AI, NLP, LLM, H2O-Danube, Pre-training, Stable LM]
mathjax: true
---

[StableLM](https://huggingface.co/collections/stabilityai/stable-lm-650852cfd55dd4e15cdcb30a) 一直致力于小模型（从7B、3B 到 1.6B），不过 License 商用有些限制，[H2O-Danube](http://arxiv.org/abs/2401.16818) 是 Apache2.0 的小模型（1.8B），整体指标略逊于 StableLM。本文通过这两篇 Paper，记录小模型的预训练。

<!--more-->

### 模型架构

都是 Decoder Only 的。

Danube 主要是 Llama2 + Mistral，具体来说：

- Sliding window，窗口大小 4096，这个是来自 Mistral 的 Local Attention。
- RoPE，苏神的旋转位置编码，以绝对位置编码相对位置信息。
- GQA：省内存的，kv heads 为 8，Attention heads 为 32。
- RMSNorm，无 bias Linear，不 tie 词向量。

可以看到，除了 Sliding window，基本和 Llama2 是一样的。

Stable LM 也是基于 Llama 的（用的是 GPT-NeoX 库），具体来说：

- RoPE 应用前 25% 的 Head embedding（每个 Head 的前 25% 个维度，q 和 k 在应用 RoPE 前 Hidden 维度上取前 25%）。
- LayerNorm。
- FFN 和 Attention 的 output 无 bias，但是 qkv 有。

模型配置对比如下。

|                   | Stable LM  | H2O-Danube |
| ----------------- | ---------- | ---------- |
| Hidden Size       | 2048       | 2560       |
| Intermediate Size | 5632       | 6912       |
| Hidden Layers     | 24         | 24         |
| Heads             | 32         | 32/8       |
| Sequence Length   | 4096       | 16384      |
| Vocab Size        | 100352     | 32000      |
| Parameters        | 1644515328 | 1831201280 |

没想到模型细节居然相差这么多，Stable LM 的配置相对陈旧一些，Danube 基本都是最新的配置，看起来应该跟 SOTA 一些，不过居然没打过。模型配置上的差别已经这么小了吗。。

### 训练过程

基本都是三阶段：预训练、SFT、DPO。Danube 的技术报告里提到一些细节，如下。

- 预训练
    - FFN 和 Attention 里所有的 Linear 都搞成 FP8，`lm_head` 保持 BF16。
    - AdamW β1=0.9，β2=0.95。
    - Cosine LR scheduler，Warmup 2.36B tokens 到 2e-4，然后 decay 到 1e-5。
    - Weight decay=0.1，Gradient clipping=1.0。
- SFT
    - 1 Epoch with Batch Size=8
    - LR=1e-5 with Short warmup + Cosine LR scheduler
- DPO（两轮）
    - LoRA with r = 4, alpha =16
    - 1 Epoch with BatchSize=2
    - LR=1e-5/3e-6（第一轮/第二轮） + Cosine LR scheduler
    - DPO beta = 0.2

Stable LM 虽然没有相关 Paper，不过预训练使用的是 [EleutherAI/gpt-neox](https://github.com/EleutherAI/gpt-neox)，SFT 用的是内部脚本，DPO 则采用了 Huggingface 的对齐库：[alignment-handbook](https://github.com/huggingface/alignment-handbook)。

根据之前经验，这个训练过程基本也是比较成熟了，或者说，成熟的参数（比如 AdamW）比较稳定，其他的就看具体需要来配置了。

### 评测情况

我们看下 Danube 给出的测评结果，先看在 Open LLM Leaderboard 上的效果。

![](https://qnimg.lovevivian.cn/paper-danube-eva1.jpg)

上面是预训练后的结果，Danube 没有用数学相关数据集，结果 GSM 很差，去除该数据集，比 Qwen 和 Stable LM 略差一些。

![](https://qnimg.lovevivian.cn/paper-danube-eva2.jpg)

上面是最终模型效果，GSM 因为用了数学数据所以上升了，整体比 Stable LM 略差一些，比 Qwen 稍好一点。

另外，额外看一下预训练后的模型在常识推理、世界知识和阅读理解 Benchmark 上的测评情况。

![](https://qnimg.lovevivian.cn/paper-danube-eva3.jpg)

这个结果和前面的差不多，但重点关注一下 Token 数。考虑到几个模型用到的数据集都差不多（开源数据集），这在一定程度上进一步验证了 Scale Law。

### 关于小模型

根据笔者的实际经验，7B 级别的模型的理解能力就比较弱了，如果把 7B 这个级别看作 base 版，那本文讨论的就是 tiny 版了。按这个标准看，tiny 版的基本属于弱智了，我们可以理解为依然在 BERT 时代的套路上，这个级别的模型可以认为并没有理解能力。

那我们是否有必要关注小模型呢？笔者觉得，如果从业务使用的角度来看，只要有效的方法就是好方法，这自然包括小模型。至于业务场景，常见的依然是自然语言生成方面的任务，比如文字创作、文本续写、润色修改、生成式摘要、对话、问答等。

那为什么在大模型时代之前，自然语言生成的效果比较差呢。笔者觉得主要有两个方面原因。第一，原来的模型并没有做现在这样的指令对齐操作，这就导致模型不能理解指令。从使用者的角度来看，能理解指令自然感觉上“聪明”一些，谁会去关心它为什么聪明或不聪明呢。第二，原来的模型更没有偏好对齐操作，也就是说，生成的内容层次不齐（从那个时代过来的、做过生成式任务的读者应该深有感触），这就使得它很难在产品中大量使用。所以，当时可控生成这个领域很火，是一个专门的主题。经过偏好对齐后，模型基本上都能生成还不错的内容，还是从使用者的角度看，就会从直觉上感觉这模型不错。这里面有一点需要特别说明，其实小模型即使经过 SFT 和 DPO 之后，在某些方面依然不行，但它在训练过的数据上还行。而训练数据涵盖的比较全面，这就导致了一般人使用时都会觉得不错，因为一般人能想到的范围都已经被模型数据覆盖了。感兴趣的读者不妨挑一个 7B 的模型在私有数据上进行测试，你会发现它在很多时候都不尽如人意。

这也是为什么现在越来越多的研究和模型在关注 SFT 数据的准备，甚至为了让其具备推理能力而增加很多带推理步骤的数据。虽然在笔者看来，SFT 其实没有什么新意，但它确实能最直接的产生效果。有监督训练嘛，数据质量决定模型上限，rubbish 进 rubbish 出。这也就是咱们刚刚提到的，用户并不关心你怎么做到的，他们只关心你做到了什么。

从笔者的角度看，大模型最值得关注的就是两个方面。第一个就是涌现现象，它不仅仅是一个现象，更与语言、思维、认知有关，它是大模型之所以如此火的根本所在。第二个就是笔者一直关注强调的强化学习的应用，比如这篇几年前写的文章：[NLP与AI](https://yam.gift/2018/07/22/NLP/2018-07-22-NLP-and-AI/)。强化学习本质是在学习规则，而我们的语言（包括整个世界）中就有很多内在的规则，这些规则就像经络一样，看不见但却在底层默默发挥着作用。除此之外，另外比较好玩儿和有意思的方向是量化推理部署，这个大多是工程实践，但能看到非常多精妙的优化。

### 小结

本文对两个代表的小模型进行了梳理对比，虽然之前没怎么关注过这个方面，但结果和预期的基本差不多，小模型还是更趋向于业务实际应用。有没有前途？有的！主要从两个角度考虑：第一，端侧推理的需要，尤其是没有网络的环境，“小”（动词）模型几乎是必经之路；第二，多 Agent 智能，多个能完成简单功能的小模型组合成复杂的系统。其实第二个笔者觉得更值得去探索，从多个组合到复杂系统，这中间有相当多值得探索的地方。不过笔者觉得这个方向会更加关注 “组合”，而不是 “小模型”，“小模型” 只是方法，有机 “组合” 才是目的。
