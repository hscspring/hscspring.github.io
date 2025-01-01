---
title: SLM论文速览
date: 2024-12-31 23:00:00
categories: Feeling
tags: [AI, SLM, MM Fusion]
mathjax: false
---

SLM相关论文。

<!--more-->


### 202411 `MM-Representation` KIT

[How do Multimodal Foundation Models Encode Text and Speech? An Analysis of Cross-Lingual and Cross-Modal Representations](https://arxiv.org/abs/2411.17666)

研究不同模态内部表示：

- 跨模态表示在模型层收敛，但不包括专门用于文本和语音处理的初始层。这个算是常识。
- 长度适配对于减少文本和语音之间的跨模态差距至关重要。这个比较新颖。
- 语音比文本表示有更大的跨语言差异。这个符合常理，同样的文本语音表达多种多样。
- 没有明确训练用于模态不可知表示的模型，模态差距比语言差距更突出。这个符合常理。

分析工具：Singular Vector Canonical Correlation Analysis（SVCCA），其对仿射变换的不变性适用于比较来自不同架构和维度的特征。

比较的模型：

- Seamless：[facebookresearch/seamless_communication: Foundational Models for State-of-the-Art Speech and Text Translation](https://github.com/facebookresearch/seamless_communication)
- SONAR：[facebookresearch/SONAR: SONAR, a new multilingual and multimodal fixed-size sentence embedding space, with a full suite of speech and text encoders and decoders.](https://github.com/facebookresearch/SONAR)
- SALMONN：[bytedance/SALMONN: SALMONN: Speech Audio Language Music Open Neural Network](https://github.com/bytedance/SALMONN)

关于长度适配的结论：对于Seamless和SALMONN，虽然它们的长度适配和窗口级Q-Former在减小模态差距方面产生了**轻微积极影响**，但这种效果似乎仅限于高资源和中等资源语言。

> 看论文描述并不是摘要中说的至关重要，结论值得商榷。

另外，本文选择的几个模型差别挺大，尤其是SALMONN，其实是一个AudioLLM，和Speech Translation本身是有区别的，前者输入输出语义并不相同。

### 202410 `SFM, 语音模型知识探索` CMU

[What Do Speech Foundation Models Not Learn About Speech?](https://arxiv.org/abs/2410.12948)

哪些副（非）语言特征被学习到？多说话人检测和口音分类等任务上表现良好，但情绪识别和压力检测仍然具有挑战性。

这些特征在不同层怎么呈现？早期的Layer捕获可泛化的特征，而中间和后面的Layer包含更多特定于任务的信息。

在下游任务上的有效性？Whisper 和 Qwen2-Audio 等模型在各层之间表现出稳定的性能，而 HuBERT 和 Wav2Vec 则表现出更多变化。强大的Zero-Shot性能也与更好的表示学习相关。

结论：好的预训练模型非常重要。

### 202410 `Speech理解` CUHK

[Roadmap towards Superhuman Speech Understanding using Large Language Models](https://arxiv.org/abs/2410.13268)

给出了语音理解的5个等级：

- Speech Recognition Level：识别文本。
- Basic Paralinguistic Perception Level：感知语音中基本副语言特征的能力，例如语气、音调、音量、节奏和语速。
- Non-semantic Comprehension Level：理解和解释更复杂的非语义信息，例如情绪、讽刺和骄傲等状态。
- Speech Specialist Level： 集成了专家级别的抽象声学知识来处理一些特定的复杂任务。
- Speech AGI level：可以整合来自各个领域的知识并执行一般和专业任务，有可能超越人类专家。

### 202410 `Ichigo` HomebrewResearch ☆

[Ichigo: Mixed-Modal Early-Fusion Realtime Voice Assistant](https://arxiv.org/abs/2410.15316)

对标Qwen-Audio，输入文本/语音（离散Token），输出文本。

语音使用Whisper-VQ编码音频，单码本、扩充词表。

3阶段训练：

- 预训练：扩展词表语音Token。ASR数据，是通过Instruction来学习的，而不是硬编码`<|transcribe|>`。
- 指令微调：QA能力。2轮89%，4轮6%，其他声音数据5%（噪音）。
- 增强微调：真实场景的交互。70%的Speech Instruction提示词，20%的Speech 文本 Instruction提示词和10%的纯文本提示词。


### 202410 `MM Fusion, TTS-LLaMA, MoLE-Llama` Meta ☆

[Get Large Language Models Ready to Speak: A Late-fusion Approach for Speech Generation](https://arxiv.org/abs/2410.20336)

PEFT+LLM+TTS

两阶段TTS-LLaMA：

- 微调LLaMA输入文本生成语义Token（包含语义和韵律信息）。扩充词表+PEFT。语义Token基于Google USM并使用[BEST-RQ](https://github.com/HarunoriKawano/BEST-RQ)提取出4096个Token。
- 声学LM（0.2B）将语义Token转为声学Token（多码本），然后用Vocoder合成语音。声学Token基于RVQ。

三阶段MoLE-LLaMA：

- 同上一阶段。
- Text-Lora微调：回复文本能力。
- MOE LLaMA和两个Lora。

![](https://arxiv.org/html/2410.20336v1/extracted/5956681/Figures/mole-llama.png)

### 202410 `NeuGPT, MM Fusion` HKUST

[ NeuGPT: Unified multi-modal Neural GPT](https://arxiv.org/abs/2410.20916v1)

关注brain-to-text解码，一篇关于神经信号离散化（也有文本、语音）的文章。

Audio用SpeechTokenizer，和AnyGPT非常类似。神经信号有多个通道，在每个时间步将所有通道的Token按通道顺序绑定在一起（类似于音频多码本打平），并在每个时间步之前插入一个`<nts>` Token。

微调数据是3个模态22配对的pair。
