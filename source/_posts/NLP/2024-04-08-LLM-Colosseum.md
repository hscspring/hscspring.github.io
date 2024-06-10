---
title: LLM打街霸
date: 2024-04-08 23:00:00
categories: Coding
tags: [AI, LLM, LLM-Colosseum]
mathjax: false
---

国外的一个项目，看了一下比较简单，于是也拿过来玩儿一下。由于原项目没支持中文，就简单支持了一下，顺便简单地重构了一下代码。

- 代码地址（Fork）：https://github.com/hscspring/llm-colosseum
- 项目原地址：https://github.com/OpenGenerativeAI/llm-colosseum

![](https://qnimg.lovevivian.cn/blog-llm-colosseum-1.jpg)

<!--more-->

## 设计

项目的整体逻辑非常简单，直接使用LLM生成对应的Action，其他都交给diambra了。核心逻辑就下面这几行代码。

```python
while True:
    observation, reward = env.step(actions)
    # use LLM
    actions = payer.robot.plan(position_prompt, action_prompt, reward_prompt)
    payer.robot.observe(observations, actions, reward)
```

LLM根据当前位置和奖励情况输出下一步的Action。示例如下：

```bash
你是世界上最好、最具侵略性的街头霸王 III 3rd Strike 玩家。
你的角色是 Ken。 你的目标是击败另一个对手。你用一个动作列表来做出响应。
你离对手很远。靠近对手。你的对手在左边。

你的最后一个动作是 Medium Punch. 对手的最后一个动作是 Down+Right.
你当前的分数是 -26.0。 你输了。继续攻击对手，但不要被击中。
为了增加你的分数，向对手移动并攻击对手。为了防止你的分数下降，不要被对手击中。

你可以使用的动作如下：
- Move Closer
- Move Away
- Fireball
- Megapunch
- Hurricane
- Megafireball
- Super attack 2
- Super attack 3
- Super attack 4
- Low Punch
- Medium Punch
- High Punch
- Low Kick
- Medium Kick
- High Kick
- Low Punch+Low Kick
- Medium Punch+Medium Kick
- High Punch+High Kick
- Jump Closer
- Jump Away
----
回复一个动作列表。格式应为：“- <动作名称>，用换行分隔。
比如，如果对手离你比较近，你就输出：
- Move closer
- Medium Punch

再比如，如果对手离你比较远，你就输出：
- Fireball
- Move closer
```

这个Prompt每一轮都会更新，然后LLM会输出对应的Action，比如：

```bash
- Move Closer
- Medium Punch
- Low Kick
- Move Away
- Fireball
```

由于使用同一个角色，同样的提示词，所以结果还是有一定参考意义的。

## 运行

启动非常简单，根据原网站安装好后，先启动引擎，然后启动执行脚本。如下所示：

```bash
# 先启动engine
docker run -it --rm --name engine -p 50051:50051 \
  -v $HOME/.diambra/credentials:/tmp/.diambra/credentials \
  -v $HOME/.diambra/roms:/opt/diambraArena/roms \
  docker.io/diambra/engine:latest

# 执行脚本
LAN=zh LOG=debug DIAMBRA_ENVS=localhost:50051 python3.11 script.py  glm-3-turbo qwen-turbo
```

这里的`LAN`可以指定语言，可选为`zh`和`en`，`LOG`可以指定日志级别，`debug`会输出每一次的Prompt，`info`则只输出玩家动作。最后两个是模型对应的名称，默认有下面一些。

```python
MODELS = {
    "GLM": {
        "glm-4",
        "glm-3-turbo",
    },
    "QWEN": {
        "qwen-plus",
        "qwen-turbo",
        "qwen1.5-72b-chat",
        "qwen1.5-14b-chat",
        "qwen1.5-7b-chat",
        "qwen1.5-1.8b-chat",
    },
}
```

如果不提供两个名称（PK的对象），则随机从上面的模型里选择两个。

因为都是通过API进行调用的，所以需要提供千问和智谱的Key，写在`.env`里，`source .env`即可。如果需要使用本地LLM或其他API，修改`agent/llm.py`即可。注意让LLM的输出为字符串。

## 结果

主要测了千问和智谱系列，测试结果仅供参考；）。以“行”为基准查看，1表示该模型胜过了列上的模型，0则相反。

中文结果：

![](https://qnimg.lovevivian.cn/proj-llm-colosseum-1.jpg)

英文结果：

![](https://qnimg.lovevivian.cn/proj-llm-colosseum-2.jpg)

其实相差不太大，关注中文结果，我们发现，qwen-turbo、glm-turbo、glm-4不相上下。专门对qwen-turbo和glm-turbo进行了PK，结果也不是稳定的，双方互有输赢。感兴趣的朋友可以进一步探索，比如使用其他模型、调试提示词、更换角色、更换游戏等。值得一提的是，如果更换角色，相应的动作列表、基本配置可能需要修改；如果更换游戏，则需要改更多的配置。

## 最后

LLM的测评是个非常有意思的话题，迄今为止主流做法还是各种数据集榜单，肯定不是最好的方法，但简单、直观，起码可以做个参考。有Paper在训练LLM的同时训练一个评测的LLM——即用LLM评测LLM。还有放在竞技场上的评测，给定输入，随机选择2个模型输出，由用户投票“好”的输出，最终统计所有模型的得分。当然还有很多非常规的评测方法，不过本项目又给我们提供了一个新的好玩儿的思路。其实这种思路就是“放在实际场景”评测的特殊版本，这种评测显然看起来更加合理些。
