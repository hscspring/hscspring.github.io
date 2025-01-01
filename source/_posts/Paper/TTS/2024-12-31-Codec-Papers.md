---
title: 音频Codec论文速览
date: 2024-12-31 23:00:00
categories: Feeling
tags: [AI, TTS, Codec]
mathjax: false
---

Codec相关论文。

<!--more-->

### 202411 `DST` CUHK

[A Comparative Study of Discrete Speech Tokens for Semantic-Related Tasks with Large Language Models](https://arxiv.org/abs/2411.08742)

连续（DST）、离散（CST）Token对比（基于LLM的语义任务，如ASR、音素识别、关键词识别、语音翻译、意图分类和情绪识别等）。

连续特征明显优于离散特征，尤其是在需要精细语义理解的任务上。其原因是：

- 有限的Token粒度。
- 低效的信息保留。

离散Token分成声学和语义，前者一般使用压缩方法，Encoder-Decoder的RVQ为主流；后者使用聚类方法从SSL中提取特征，类的序号就是离散Token。

影响DST的因素：

- bitrate R：`log2⁡V⋅C⋅Rs`，V是词表大小，C是码本数，Rs是每秒的codes数。码本大效果好但收益递减。
- 离散Token的不均衡问题：20%的Token占总出现次数的5%。这种不均匀分布在 LLM 训练过程中引入了噪音，因为模型可能会更多地关注频率更高的Token，而未能充分学习较不常见的Token，导致由未充分利用Token表示的语音片段的泛化能力不佳。
- Tokenizer的鲁棒性：复杂音频（噪音、不同发音方式、远近距离麦克风录音等）导致离散Token难以有效捕捉语义，但先经过ASR预训练能提升将近10个点。

离散Token还有提升空间吗？

- 更大的LLM提升更多。8B比0.5B整体提升明显，在ASR、音素识别、语音翻译、关键词识别上和连续Token接近，意图分类和情绪识别任务和连续Token依然有较大差距。
- 不同层捕捉不同信息，适合不同任务。

更大的LLM实验结果其实能说明一个有意思的问题：**对需要对音频整体把握理解才能判断的任务，离散Token不擅长**。这其实很make sense，离散Token可能更多体现出和文本相关的语音信息，需要整体宏观感知的信息可能被割裂了。

### 202410 `DM-Codec` Amazon ☆

[DM-Codec: Distilling Multimodal Representations for Speech Tokenization](https://arxiv.org/abs/2410.15017v1)

![](https://arxiv.org/html/2410.15017v1/extracted/5939010/figures/tokenizer_v4.png)

音频：

- 声学：Audio codec
- 语义：自监督模型（SM Guided）
- 语言学上下文：LM Guided，提供对语音表示的基本见解，允许对不同上下文中的单词进行更细致的理解。

蒸馏什么？

- 文本：使用LM获取每个Token的表征（平均所有层的hidden，因为每一层获取了不同的信息）。损失L是S和Q'的余弦相似度。
- 语音：使用SM获取表征，也是平均所有层的hidden。损失S是Q'和A的余弦相似度。
- 损失LS=损失L+损失S

模型：

- RVQ第一层蒸馏LM、SM的平均到1-8层。
- Encoder-Decoder基于SEANet。
- Discriminator：MSD、MPD、MS-STFT。

目标：

- Reconstruction Loss：time-domain (L1) + frequency-domain (L1 + L2)，确保保留关键属性。
- Adversarial Loss：generator + discriminator
- Feature Matching Loss：比较每个判别器的内部层在所有维度上的特征，防止生成器过拟合。
- RVQ Commitment Loss：指导编码器生成的输出与RVQ过程中对应的量化值尽可能接近。
- Generator Loss：2个蒸馏Loss + 2个重建Loss + Generator的Loss + FM Loss + RVQ Loss。

消融：

- 联合蒸馏：蒸馏LM的权重越高，WER越低；（0.2,0.8）达到最低。
- RVQ层：RVQ-1更有效地捕捉了上下文表示，而RVQ-1:8则融入了更多细致的语义和声学方面。
- 蒸馏模型：BERT+wav2vec2.0 获得最佳表现。
- 蒸馏的层：平均所有层表现最好。

### 202410 `DC-Spin` MIT

[DC-Spin: A Speaker-invariant Speech Tokenizer for Spoken Language Models](https://arxiv.org/abs/2410.24177)

DC-Spin 提取具有丰富语音信息且对输入变化具有弹性的说话人不变Token。具体来说，使用辅助码本扩展说话人不变聚类（Spin），Spin是一种自监督微调方法，

一个好的Tokenizer的关键条件：

- 包含丰富的语音或语义信息。
- 保持声学细节。
- 对扰动（噪音、混响、说话人改变等）鲁棒。
- 轻量、快速、支持实时交互。

Speaker-invariant Clustering (Spin)：

- 通过在线聚类和交换预测捕获语音信号中的与说话者无关的内容。
- 训练时，通过随机调整基频和共振峰频率，使每个话语听起来像是不同的说话人，但内容相同。
- 原始话语和扰动后的一起传给SSL，每个话语的帧级别输出被转为一系列概率分布，其中包含一个可学习的码本。概率分布被平滑处理以强制使用完整的码本，并作为训练目标。
- 最后，该模型通过最小化原始码字分布与扰动输出中的平滑目标之间的交叉熵损失来执行交换预测，反之亦然。

Spin 作为 Tokenizer：

![](https://arxiv.org/html/2410.24177v1/x2.png)

- 阶段1：使用伪标签（来自K-Means或Spin units）预训练一个Encoder（SpinHuBERT）。
- 阶段2：ASR/PR (phoneme recognition)微调。迫使模型忽略冗余信息并提取语音中的内容。
- 阶段3：DC-Spin微调。两个码本：第一个主码本提取下游任务使用的离散Token；第二个辅助码本捕获细粒度音标单元。

### 202410 `CST` CUHK

[Continuous Speech Tokenizer in Text To Speech](https://arxiv.org/abs/2410.17081)

解决离散Token的信息损失问题。

重采样后通过编码器获得连续语音Token。具体做法不详。

TTS：Speech Token和Text Embedding拼接在一起作为LM的输入。

Loss：

- Tokenizer重建：Loss_ASR + Loss_REC，后者是 𝔸' = AD⁢(Cont-SpeechTokenizer⁢(𝔸)) 与𝔸的相似度，前者是ASR-Decoder⁢(𝔸') 得到的文本和真实文本的CTC Loss。
- LM：Continuous Token的MSE（区别于离散的SoftMax）。

> 没有太多细节，结论不明。

### 202410 `Speech Discrete Representation` Edinburgh

[Do Discrete Self-Supervised Representations of Speech Capture Tone Distinctions?](https://arxiv.org/abs/2410.19935)

使用 k-means 找到的离散符号是否充分捕捉到语音中的语气（声调）。结果发现，使用离散符号会导致声调信息的大量丢失，即使对于语言专用的 SSL 模型也是如此。

SSL：

- SSL 语音表示（wav2vec2.0、HuBERT）形式被证明可以对说话人和语音信息进行编码。

离散语音表示的好处：

- VQ-VAE 模型使用量化表示会迫使它捕获更稳健和有意义的信息，从而减少不必要的可变性。
- 使用简单的任务无关聚类技术（如 k-means）从已经训练的模型（如HuBERT）中量化 Latents 也很常见。
- 离散符号与语音类别之间存在很强的相关性，但与说话人特征（如性别）的相关性较弱。离散符号还捕获了子语音动态，表明离散序列能够捕获语音产生的细粒度细节。

潜在问题：

- 离散化可以有效地过滤掉非语言特征，如背景噪音或说话人身份，但也存在权衡，最明显的是选择最佳码本大小：足够大以捕获所需的语音细节，但其他方面尽可能小以方便后续（语言）建模。

结论：

- 所有模型都很好地执行元音分类，但在声调方面做得较差；并且在从连续表示转变为离散表示时有明显的性能下降。
- 对声调语言（如中文）使用离散化的解决方案不在于使用特定语言的数据训练（或微调）SSL 模型，而在于**改进离散化方法**。显而易见的解决方案是某种形式的任务感知离散化，它保留了下游任务所需的区别（比如语气）。
