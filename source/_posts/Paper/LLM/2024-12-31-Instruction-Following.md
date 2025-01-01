---
title: LLM指令跟随论文速览
date: 2024-12-31 23:00:00
categories: Feeling
tags: [AI, LLM, Instruction Following]
mathjax: false
---

LLM指令跟随相关论文。

<!--more-->


### 202411 `Instruction Tuning` Allen

[Stronger Models are NOT Stronger Teachers for Instruction Tuning](https://arxiv.org/abs/2411.07133)

更大更强的模型合成训练数据并不一定对小模型有用（大模型悖论：更大和更强的模型不一定是较小模型的更强教师），现有指标无法精确预测响应生成器的有效性，因为它们忽略了教师与正在微调的基本模型之间的兼容性。基于此，本文开发了一种新的指标，称为兼容性调整奖励 （CAR） 来衡量响应生成器（教师模型）的有效性。

问题1：哪些模型生成Instruction的响应（合成数据）最有效？

- 同一族的大模型（如405B）相比小一点的模型并不总是增强小模型的指令跟随能力。
- 开源模型效果比GPT-4好。

问题2：如何为某个base模型确定最有效的响应生成器？

- 对齐数据选择的现有指标（质量、难度、响应长度）未能考虑被微调模型与响应生成模型之间的兼容性。
- 本文将寻找最有效响应生成器的任务制定为风险回报问题。通过计算兼容性调整奖励 （CAR） 来解决这个问题，其中兼容性是风险因素。通过要微调的base模型的平均响应损失来量化的，较高的平均损失表示较低的兼容性，因此风险较高。

注意，本文的base模型是1.5B-4B的模型，响应生成器是1.5B-405B的各类开源模型。

评估base模型微调效果的两个指标：

- win rate（WR）：GPT更偏好的比率。
- length-controlled with rate（LC）：考虑响应长度减少WR的影响。

主要发现：

- 大模型悖论：大不一定能提升base的指令跟随能力。
- **同族互助**：同一族模型的生成响应有更好的效果。
- 开源 > 闭源：可能就是不兼容导致的结果。
- 大的`tempreture`和`top_p`有更好的效果。
- 拒绝采样能轻微提升效果。

衡量（响应生成器的有效性与微调base模型的指令跟踪能力之间的相关性）指标：

- Reward：Reward Model
- Difficulty：PPL和IFD（Instruction Following Difficulty）
- Length：响应长度
- CAR：兼容性调整奖励（和Reward对比）

$$
\operatorname{CAR}\left(\mathcal{D}_i, \theta\right)=\frac{r\left(\mathcal{D}_i\right)}{1+\beta \cdot L\left(\mathcal{D}_i, \theta\right)}
$$

r是平均Reward，L是响应Di的平均Loss：
$$
L\left(\mathcal{D}_i, \theta\right)=-\frac{1}{\left|\mathcal{D}_i\right|} \sum_{y_i \in \mathcal{D}_i} \log p_\theta\left(y_i\right)
$$
为什么不能只考虑兼容性，因为如果模型为每个问题生成简单、低质量的响应，这种情况下兼容性很高，但整体质量更低。

### 202411 `IOPO` Ali

[IOPO: Empowering LLMs with Complex Instruction Following via Input-Output Preference Optimization](https://arxiv.org/abs/2411.06208)

IPIO = Input-Output Perference Optimization，同时考虑输出和输入。

![](https://arxiv.org/html/2411.06208v1/x1.png)

现有的研究都是针对评估指令跟随的。本文：

- 提出TRACE基准，提升LLM跟踪复杂细粒度约束指令的能力。
- IPIO方法：同时关注输入X。

**TRACE：**

- 构建步骤：
    - 分类约束（内容、情景、风格、格式、示例5类、26个维度）。
    - 约束扩充：单一到多种约束。
    - 结构化指令：任务描述、约束、输入。
    - 质量控制：确保指令有效，比如解决描述和约束之间的冗余。
    - 回复生成和评估：用LLM评估响应遵循指令约束的程度，完美10分的座位SFT数据集。
- 评估准则：用GPT-4o，评估每个约束的得分，只有当复杂指令中的所有约束都完全遵循时，响应才被认为是正确的。

**IPIO：**

两个输入`(x1, x2)`和两个对应的输出`(y1, y2)`，对应`g1={<x1, y1>, <x2, y2>}`要优于`g2={<x1, y2>, <x2, y1>}`。

Loss就是DPO的扩展：
$$
\begin{aligned}
& \mathcal{L}_{\mathrm{IOPO}}\left(\pi_\theta\right)=-\mathbb{E}_{x_1, y_1, x_2, y_2 \sim D}\left\{\operatorname { l o g } \left[\sigma \left(\frac { 1 } { 2 } \left(2 \beta \log \frac{\pi_\theta\left(y_1 \mid x_1\right)}{\pi_{\mathrm{ref}}\left(y_1 \mid x_1\right)}\right.\right.\right.\right. \\
& -\beta \log \frac{\pi_\theta\left(y_2 \mid x_1\right)}{\pi_{\mathrm{ref}}\left(y_2 \mid x_1\right)}-\beta \log \frac{\pi_\theta\left(y_1 \mid x_2\right)}{\pi_{\mathrm{ref}}\left(y_1 \mid x_2\right)}+2 \beta \log \frac{\pi_\theta\left(y_2 \mid x_2\right)}{\pi_{\mathrm{ref}}\left(y_2 \mid x_2\right)} \\
& \left.\left.\left.\left.-\beta \log \frac{\pi_\theta\left(y_1 \mid x_2\right)}{\pi_{\mathrm{ref}}\left(y_1 \mid x_2\right)}-\beta \log \frac{\pi_\theta\left(y_2 \mid x_1\right)}{\pi_{\mathrm{ref}}\left(y_2 \mid x_1\right)}\right)\right)\right]\right\}
\end{aligned}
$$

### 202410 `指令跟随` IBM

[Evaluating the Instruction-following Abilities of Language Models using Knowledge Tasks](https://arxiv.org/abs/2410.12972)

评估指令跟随能力。Instruction策略值得借鉴。结果显示模型越大能力越强。

### 202410 `系统消息优化` UMich

[SPRIG: Improving Large Language Model Performance by System Prompt Optimization](https://arxiv.org/abs/2410.14826)

单个优化的系统提示与针对每个单独任务优化的任务提示表现相当。将系统和任务级优化结合起来会带来进一步的改进（互补效应）。优化的系统提示可以有效地跨模型族、参数大小和语言进行泛化。

系统提示由组件（完整语义最小单位）构成，然后通过添加、重述、交换、删除尝试不同组合。

哪种类型的系统提示最有用？

- CoT全过程主导地位。
- Role-Based（你是一个XX）在后期比较重要。
- “好”相关的组件（你是一个聪明的助手，很多默认的系统提示）被选择的机会低于随机。
- 不存在一个普遍的顺序，组合更重要。

任务和系统提示优化器是否正在学习相同的策略？

- 系统和任务提示优化都可以提高性能。
- 系统提示和任务提示优化之间有很大互补潜力。

哪种任务收益最大？

- 数学和推理任务最能从系统提示优化中受益。
- 基于知识的任务从提示优化中受益最少。
- 任务提示在提高社交理解方面更有效。
- 系统提示对语言理解任务更有效。

