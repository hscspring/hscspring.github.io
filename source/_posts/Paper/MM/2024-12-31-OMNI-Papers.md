---
title: OMNI论文速览
date: 2024-12-31 23:00:00
categories: Feeling
tags: [AI, OMNI]
mathjax: false
---

OMNI相关论文。

<!--more-->

### 202412 `GLM-4-Voice` Zhipu ☆

[GLM-4-Voice: Towards Intelligent and Human-Like End-to-End Spoken Chatbot](https://arxiv.org/abs/2412.02612)

单码本（CosyVoice）12.5Hz，两阶段（1Trillion Token预训练+SFT），Text-Audio交叉。

LLaMA-OMNI和mini-omni缺乏拟人性，因为没有专门的语音预训练。

SLM路线：

- 2021 Facebook GSLM：https://github.com/facebookresearch/fairseq/tree/main/examples/textless_nlp/gslm
- 2023 Google AudioLM：https://google-research.github.io/seanet/audiolm/examples/
- 2023 Facebook TWIST：https://pages.cs.huji.ac.il/adiyoss-lab/twist/
- 2024 Moshi：https://github.com/kyutai-labs/moshi
- 2024 Meta Spirit-LM：https://github.com/facebookresearch/spiritlm

A2A路线：

- 2023 复旦 SpeechGPT：https://github.com/0nutation/SpeechGPT
- 2024 复旦 AnyGPT：https://github.com/OpenMOSS/AnyGPT
- 2024 Moshi：https://github.com/kyutai-labs/moshi
- 2024 中科院 LLaMA-OMNI：https://github.com/ictnlp/LLaMA-Omni
- 2024 清华 mini-omni：https://github.com/gpt-omni/mini-omni
- 2024 阿里 OmniFlatten：https://omniflatten.github.io/
- 2024 腾讯 Freeze-OMNI：https://github.com/VITA-MLLM/Freeze-Omni

要构建拟人端到端+高智力ChatBot，模型必须：

- 综合理解语音并提供语义精准的回复。
- 遵循用户指令。

根据LLM的成功经验，**预训练**是必须的。这也是本文最重要的观点，也是最终效果的保证。

关于Speech Tokenizer（下图左）：

- 声学Token用来重建音频，额外信息需要高采样率或额外的向量量化（如多码本）。
- 语义Token则丢弃不包含语义的额外信息，但也能合成低质量的音频。

![](https://qnimg.lovevivian.cn/paper-glm4-voice-1.jpg)

关于Speech Decoder（上图右）：

- Token Encoder + Conditional Flow Matching Model + HiFi-GAN vocoder
- 多人预训练+单人高质量微调

关于交错：13Text Token + 26 Speech Token，12.5Hz

总体延迟：Speech Tokenization（Block t）+ LLM Prefilling （N speech_tokens）+ LLM Decoding（13 Text + 10 Speech）+ Speech Decoding（10 Speech Token）

训练：

- 预训练：Speech-Text交错数据、无监督音频数据、Speech--Text对数据。
- SFT：多轮、风格控制。
- 两个子任务：语音输入-文本输出，文本输出-语音输出。

![](https://qnimg.lovevivian.cn/paper-glm4-voice-2.jpg)


### 202411 `Freeze-Omni, MM Align` Tencent

[VITA-MLLM/Freeze-Omni: ✨✨Freeze-Omni: A Smart and Low Latency Speech-to-speech Dialogue Model with Frozen LLM](https://github.com/VITA-MLLM/Freeze-Omni)

LLM固定，三阶段，6w多轮对话数据，LLM能力不降（已有方案的问题），双工。

- 使用ASR数据对齐Speech Encoder和LLM，然后固定LLM，使用Prompt Embedding让模型SpeechInput -> TextOutput。
- 使用Text-Speech数据对训练基于自回归的Speech Decoder，输出Codec，使用LLM的hidden state将Speech Decoder的输出转移到LLM的输出文本空间，达到TextInput -> SpeechOut。
- 基于Chunk的Speech-Speech微调。

![](https://arxiv.org/html/2411.00774v1/x1.png)

阶段1 Speech Encoder：

- 基于Chunk，Speech到连续特征再到LLM的Embedding空间。
- 三阶段训练：ASR（Encoder）、ASR（LLM Adapter）、QA（Prompt Embedding）。

![](https://arxiv.org/html/2411.00774v1/x2.png)

阶段2 Speech Decoder：

- NAR + AR + Codec。
- 三阶段训练：单码本Codec训练、NAR+AR、NAR Prefix Decoder（用于将语音解码器与 LLM 的输出紧密耦合）。

![](https://arxiv.org/html/2411.00774v1/x3.png)

阶段3 Duplex：

- VAD然后Chunk by Chunk给到OMNI。
- LLM后接一个分类器预测状态（0表示LLM可以继续接受Chunk，1和2表示当前Chunk是最后一段语音，1表示LLM可以终止用户并进入生成阶段、2表示不需要终止用户）。
- model as a server策略，用户的VAD触发后给Model Server发送Chunk。

### 202411 `SALMONN-omni, Full-duplex` Tsing

[SALMONN-omni: A Codec-free LLM for Full-duplex Speech Understanding and Generation](https://arxiv.org/abs/2411.18138)

双工，加入”思考“机制，依赖Embedding而不是离散Token（第一个）。

无code的挑战：

- 流式输入输出
- 同时处理输入输出流
- 处理自然对话中的复杂动态，如对话轮次切换、打断、重叠语音、其他声音等

![](https://arxiv.org/html/2411.18138v1/x2.png)

具体做法：

- 有”说话“和”没说话“两个状态，用`start_speak`和`end_speak`两个特殊Token标记。
- 对话别切成chunk block，block编码成Embedding，LLM基于Embedding生成Word Embedding，然后用来合成语音。纯端到端，没有文本。
- 引入”think“机制（特殊Token），输出并没有明确强制包含（背后的思想是反映人的思维过程：内部思想和口头表达不一定相同，也不一定明确传达0）。用于应对两个挑战：
    - 非说话状态下，`start_speak`之前的Token难以确定。
    - 说话状态下，LLM已经完成生成文本Embedding，但语音合成器仍在生成和播放回答。


### 202410 `OmniFlatten` Ali ☆

[OmniFlatten: An End-to-end GPT Model for Seamless Voice Conversation](https://arxiv.org/abs/2410.17799)

双工，三阶段：模态对齐、单工、双工。挑战：低延时、自然交互。

[mini-omni](https://github.com/gpt-omni/mini-omni) 和 [LLaMA-Omni](https://github.com/ictnlp/LLaMA-Omni/tree/main) 是单工的。

[Moshi](https://github.com/kyutai-labs/moshi)：并行框架GPT-based模型本身不支持，需要复杂的设计（声码延迟、inner monologue）。

[SyncLLM](https://syncllm.cs.washington.edu/)：引入了重复数据删除策略来减轻无声语音对模型语义能力的影响。本文通过显式文本标记预测来增强对话模型的语义能力。

[本文](https://omniflatten.github.io/)：三阶段后训练（无需预训练）、不改变LLM。

先使用ASR和TTS数据将LLM变成多模态LLM，保证LLM可以理解生成语音+文本。

然后就是三个阶段微调：

- 用户输入和系统输出的文本和语音流展平为单个序列（即展平四个流数据）来训练模型进行半双工对话。
- 移除用户输入文本流，对剩下的三个流进行细粒度分块和对齐，展平这些块，并继续使用结果展平的三个流数据训练模型。
- 构建由只包含输入和输出语音的展平的两个流数据，并继续训练模型专注于语音生成。

![](https://arxiv.org/html/2410.17799v1/x1.png)

交互打平输出：先输出固定chunk大小的文本Token，然后是固定chunk大小的语音Token。

Audio 编码：CosyVoice；解码：OT-CFM到Mel，HifiGAN到Audio。

模态对齐：

- ASR: ` [A⁢S⁢R]⁢[S⁢O⁢S]⁢S_seq⁢[E⁢O⁢S]⁢[S⁢O⁢T]⁢T_seq⁢[E⁢O⁢T]`
- TTS: `[T⁢T⁢S]⁢[S⁢O⁢T]⁢T_seq⁢[E⁢O⁢T]⁢[S⁢O⁢S]⁢S_seq⁢[E⁢O⁢S]`

半双工训练：

![](https://arxiv.org/html/2410.17799v1/x2.png)

全双工三流训练：Chunking+Speech-Text基于Chunk对齐，固定大小，2Token文本对应10Token语音。

![](https://arxiv.org/html/2410.17799v1/x3.png)

全双工双流训练：

![](https://arxiv.org/html/2410.17799v1/x4.png)

