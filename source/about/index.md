---
title: 关于我
date: 2018-04-07 22:29:12
---

知乎：[长琴](https://www.zhihu.com/people/haosc) | 公众号：[技术与人](https://mp.weixin.qq.com/s/10zLlVRF6NZ4EgD-enJqIg)。

**“相信使命和生命同样重要。致力于用技术改善世界，用认知重塑思维。”**

对深入研究和理解算法原理乐此不疲，并作为终生追求。业余时间正在做的事儿:

- 写能帮助普通大众提升效率的软件。
- 做能帮助行业新人更好入门的教程。

【**个人画像**】

深耕一线的 **AI 算法工程师 / 架构师**。 有着非典型的跨界背景：从经济学研究、到组织管理、再到全面转型算法，完成跨界进化。曾任 NLP 负责人与 CTO，但比起管理，更喜欢写代码和搞模型。

目前依然坚持**一线训推与开发**，努力打造工业级高性能 AI 系统。主要关注 LLM、RL、多模态及推理加速等方向，懂点语音，也懂点前后端，图像不太懂。会（上过生产）Python、Java、JavaScript、Elixir、一点 C++ 和 Rust。

期望成为**模型后训练+推理优化+业务工程 综合架构师**。核心宗旨：**落地导向、全栈视角、问题解决**。

【**技术关注**】

- **LLM**：上下文工程（压缩/超长/跟随）、模型架构、实时学习、自进化学习。
- **强化学习**：Agentic RL、Embodied AI。
- **多模态**：对齐、融合、语音、视频。
- **推理部署**：蒸馏量化、异构计算、端侧推理。


【**生活志趣**】

- **读书**：哲学、AI、计算机、编程、架构、经济、思维、科学、科幻、文学、历史、个人成长、运动健身等多个方面。
- **音乐**：古典、史诗、摇滚、后摇、纯音。也弹吉他，会拉一点中提琴。
- **运动**：跑步、健身、太极，各类球如足球、羽毛球、壁球、篮球、桌球、乒乓球，各类棋，各类牌。

## 开源项目

负责的开源项目和教程。

### 🚀 1. 前沿与核心 (Frontier & Core)
> 包含大模型微调、推理服务化工具，以及相关的底层实现剖析实战。

| 项目 | 类型 | 角色 | 简介 |
| --- | --- | --- | --- |
| [hscspring/lightinfer](https://github.com/hscspring/lightinfer) | 工具 | 独立负责 | 将模型Inference转为HTTP Server                               |
| [hscspring/promptlog](https://github.com/hscspring/promptlog) | 工具 | 独立负责 | 提示词版本控制记录工具                                       |
| [hscspring/hcgf](https://github.com/hscspring/hcgf)          | 工具 | 独立负责 | 简单易用的LLM微调工具                                        |
| [hscspring/bytepiece-rs](https://github.com/hscspring/bytepiece-rs) | 工具 | 独立负责 | Rust+Python版本的 Bytepiece Tokenizer                        |
| [hscspring/llama.np](https://github.com/hscspring/llama.np)  | 算法 | 独立负责 | LLaMA推理纯NumPy实现                                         |
| [hscspring/ALL4AI](https://github.com/hscspring/ALL4AI) | 聚合 | 独立负责 | AI相关工具、项目集 |
| [datawhalechina/HuggingLLM](https://github.com/datawhalechina/hugging-llm) | 教程【开发】 | 负责人 | 蝴蝶书《ChatGPT原理与应用开发》[视频](https://aiplusx.momodel.cn/classroom/class/658d3ecd891ad518e0274bce?activeKey=intro) |
| [datawhalechina/llm-cookbook](https://github.com/datawhalechina/llm-cookbook) | 教程【开发】 | 发起人 | 面向开发者的 LLM 入门教程，吴恩达大模型系列 |
| 百度 [大模型应用开发技巧与实战](https://aistudio.baidu.com/course/introduce/28611) | 教程【开发】 | 负责人 | 大模型原理与应用开发范式 |
| 开放原子基金会 [开源大模型入门](https://www.devedu.net/goods/show/46) | 教程【开发】 | 负责人 | 大模型应用开发范式 |
| [datawhalechina/llm-deploy](https://github.com/datawhalechina/llm-deploy) | 教程【推理】 | 负责人 | 大模型/LLM推理和部署理论与实践 |
| [datawhalechina/hands-on-llama](https://github.com/datawhalechina/hands-on-llama) | 教程【推理】 | 独立负责 | 以LLaMA为例基于NumPy介绍LLM推理相关知识 |
| 上海AILab [InternLM/Tutorial](https://github.com/InternLM/Tutorial/tree/camp1) | 教程【推理】 | 负责人   | 《书生·浦语大模型实战营》量化部署实践，[视频](https://www.bilibili.com/video/BV1iW4y1A77P/?vd_source=25267fdf6ac60f2b1937c53c36aa5ee7) |
| [datawhalechina/hands-on-llm](https://github.com/datawhalechina/hands-on-llm) | 教程【算法】 | 独立负责 | 从理论到训练再到上线全流程 |
| 魔搭 [datawhalechina/sora-tutorial](https://github.com/datawhalechina/sora-tutorial) | 教程【算法】 | 负责人 | 《Sora原理与技术实战》Transformer解析，[视频](https://www.bilibili.com/video/BV17Z421a71d/?vd_source=25267fdf6ac60f2b1937c53c36aa5ee7) |

### 🧰 2. 基础与筑基 (Foundation & Base)
> 包含自然语言处理底层工具、分词器实现，以及数据科学必备的框架库实战。

| 项目 | 类型 | 角色 | 简介 |
| --- | --- | --- | --- |
| [hscspring/pnlp](https://github.com/hscspring/pnlp)          | 工具 | 独立负责 | 常用的NLP处理工具                                            |
| [hscspring/cppjieba](https://github.com/hscspring/cppjieba)  | 工具 | 独立负责 | 结巴分词的C++版本                                            |
| [hscspring/hnlp](https://github.com/hscspring/hnlp)          | 工具 | 独立负责 | 一个易用的、开发中的传统NLP训练框架                          |
| [hscspring/Multi-Label-Text-Classification](https://github.com/hscspring/Multi-Label-Text-Classification-for-Chinese) | 算法 | 独立负责 | 多标签分类                                                   |
| [hscspring/ptcls](https://github.com/hscspring/ptcls/tree/main) | 算法 | 独立负责 | Token分类                                                    |
| [hscspring/All4NLP](https://github.com/hscspring/All4NLP)    | 聚合 | 独立负责 | NLP相关工具、项目集                                          |
| [datawhalechina/巨硬的 NumPy](https://github.com/datawhalechina/powerful-numpy) | 教程 | 独立负责 | NumPy教程，[视频：从小白到入门_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Ym4y1U7at/?share_source=copy_web&vd_source=cea86f777e9ba73f1a486c90773fcb03) |
| [数据科学一级 -AI 学习 - 阿里云天池](https://tianchi.aliyun.com/course/1069) | 教程 | 部分负责 | 阿里云天池《数据科学》NumPy 课程 |

### 🛠️ 3. 工程与应用 (Engineering & App)
> 包含全栈脚手架、并发控制库、网络请求工具，以及我独立开发上线的一些实用产品网页。

| 项目 | 类型 | 角色 | 简介 |
| --- | --- | --- | --- |
| [hscspring/xhttpy](https://github.com/hscspring/xhttpy)      | 工具 | 独立负责 | 大一统的HTTP/API请求工具                                     |
| [hscspring/create-vibe-app](https://github.com/hscspring/create-vibe-app) | 工具 | 独立负责 | Vibe Coding脚手架                                            |
| [hscspring/pararun](https://github.com/hscspring/pararun)    | 工具 | 独立负责 | 脚本并发执行库                                               |
| [hscspring/yoc](https://github.com/hscspring/yoc)            | 应用 | 独立负责 | GitHub年度报告。[国外](https://yoc-nine.vercel.app/) [国内](https://yoc.huggingai.cn/) |
| [hscspring/toolhub](https://github.com/hscspring/toolhub)    | 应用 | 独立负责 | 好用的工具集合网站。[国外](https://toolhub-web.vercel.app/) [国内](https://toolhub.huggingai.cn/) |
| [hscspring/SuitJOB](https://github.com/hscspring/SuitJOB)    | 应用 | 独立负责 | 根据岗位描述和要求匹配岗位。[国外](https://suit-job.vercel.app/) [国内](https://suitjob.huggingai.cn/) |
| [hscspring/uuid-by-string](https://github.com/hscspring/uuid-by-string) | 工具 | 独立负责 | UUID生成                                                     |
| [datawhalechina/sweetalk-design-pattern](https://github.com/datawhalechina/sweetalk-design-pattern) | 教程 | 负责人 | 基于《大话设计模式》对设计原则和模式进行解读 |

### 🧠 4. 认知与成长 (Cognition & Growth)

| 项目                                                         | 类型 | 角色     | 简介                                      |
| ------------------------------------------------------------ | ---- | -------- | ----------------------------------------- |
| [datawhalechina/daily-interview](https://github.com/datawhalechina/daily-interview) | 教程 | 部分负责 | 面经，包括机器学习，CV，NLP，推荐，开发等 |

## 开源社群

- 知乎专栏：
    - [NLP 点滴 - 知乎](https://www.zhihu.com/column/lovenlp)
    - [多模态点滴 - 知乎](https://www.zhihu.com/column/c_1857730227255504896)
    - [技术与人 · 编程点滴 - 知乎](https://www.zhihu.com/column/c_1986696308027839732)
    - [时间的侧面 - 知乎](https://www.zhihu.com/column/c_1986694600249845277)
- Rust 中文社区日报编辑、专栏作者（已暂停）。
    - Rust 日报：[Search - Rust 语言中文社区](https://rustcc.cn/search?q=%E9%95%BF%E7%90%B4)
    - Rust与AI 专栏：[Search - Rust 语言中文社区](https://rustcc.cn/search?q=Rust%E4%B8%8EAI)
- Datawhale Paper 分享。
    - 视频：[Paper 分享](https://www.bilibili.com/medialist/detail/ml1760686270)
- LLM 相关技术活动主讲嘉宾/评委。
    - `20260310` 飞书玩虾大会 GEEK 专场嘉宾：[【飞行社】📚 🦞 玩“虾”大会 Day2-周二晚见](https://www.feishu.cn/community/course/content?course_id=7613765188436626367&class_id=7613765188520512458&lesson_id=7613771397420026814&content_id=7613771397457775562)
    - `20260308` AI 黑客松高校联赛导师、评委：[就在本周，邀你观战｜嘉宾揭晓&观众招募开启](https://mp.weixin.qq.com/s/WYfqI6p8glQP0ZC0sES7IA)
    - `20251121` 非凡 AI 百大创造先锋：[AI Creators 100 - 飞书云文档](https://uniquecapital.feishu.cn/wiki/Hck2wlaxTifbjdk0oincaUFqnQd)
    - `20250923` 云栖大会魔搭Agent挑战赛评委：[MCP&Agent挑战赛](https://modelscope.cn/active/aihackathon-mcp-agent)
    - `20250227` 嘉程资本创业流水席第251期：[2月27日，探讨DeepSeek R1技术解析与应用趋势！架构论文/技术影响/应用场景｜嘉程创业流水席第251期](https://mp.weixin.qq.com/s/DkksIqGQKadXt8IqVD-y0g)
    - `20250225` 大工大创业沙龙第111期：DeepSeek解密
    - `20250215` 2025 iFLYTEK 开发者TALK 杭州站：[揭秘DeepSeek核心技术与应用构建 | 开发者TALK开年首站落地杭州](https://mp.weixin.qq.com/s/OQDMd4jU1BHp80DoF9kAzg)，[文章](https://yam.gift/2025/02/17/NLP/LLM-Training/2025-02-17-DeepSeek-R1/)、[PPT](https://github.com/datawhalechina/hugging-llm/tree/main/resources)
    - `20240817` OpenAIGC 第二届开发者大赛评委：[顶峰相见，OPENAIGC开发者大赛8月17日上海决赛开启！](https://mp.weixin.qq.com/s/CE7NTPi_M6JYdu-1oPMSzA)
    - `20231223` 早早聊：[前端搞 AI | Datawhale X 早早聊喊你来玩转 AI 开发啦](https://www.zaozao.run/conf/c76)
    - `20231216` 讯飞星火 AI 开发者 TALK：[携手知名开发者社区，畅谈大模型实际应用 | AI 开发者 TALK](https://mp.weixin.qq.com/s/-ix8xXSm421QfmfD7lVTLg)
    - `20231125` 苏州 GDG：[2023 苏州 Devfest AI 专场预告 - 程序猿媛们在 LLM 浪潮中的新机遇](https://mp.weixin.qq.com/s/MudtoqKhASsU-80axnNiCQ)
    - `20231104` OpenAIGC 开发者大赛评委：[初赛结果公示 & 决赛日议程 —2023 第一届 OPENAIGC 开发者大赛](https://mp.weixin.qq.com/s/AWtUDm7HR9mlFPYbP-Vngg)
    - `20231024` 1024 浙江程序员节：[【工作动态】2023 浙江程序员节活动预告](https://mp.weixin.qq.com/s/hL9ZqL1fs3Fc-EZi2JfE_Q)


## 公开作品

- 《[GarmentGPT: Compositional Garment Pattern Generation via Discrete Latent Tokenization | OpenReview](https://openreview.net/forum?id=XzXKnazRBF)》
    - 蹭了一篇 ICLR 2026，基于之前的一些实验和讨论，始料未及。
- 《ChatGPT原理与应用开发》
    - [2024年度影响力新书奖+2024年度影响力作者奖](https://mp.weixin.qq.com/s/wuEMOMU7JzqVilpCrld1Cg)、[2024年度影响力新书奖重磅出炉!](https://mp.weixin.qq.com/s/FAMs0Ojh7Dgdn89MHYZ4Jg)、[人工智能畅销图书TOP10](https://mp.weixin.qq.com/s/vGaRszquaL_bEpukBPyXRQ)
    - [《Datawhale蝴蝶书》出版了！](https://mp.weixin.qq.com/s/cIn3-hL9DSOJf2S2_MihNw)
    - GitHub：[datawhalechina/hugging-llm: HuggingLLM, Hugging Future.](https://github.com/datawhalechina/hugging-llm)
- 《[[2305.13246] Interactive Natural Language Processing](https://arxiv.org/abs/2305.13246)》
    - 负责部分内容。
    - [Interactive Natural Language Processing: Language Model as Agent | Springer Nature Link](https://link.springer.com/book/9783032062635)
    - GitHub：[Paper List for a new paradigm of NLP: Interactive NLP](https://github.com/InteractiveNLP-Team/awesome-InteractiveNLP-papers)
- 《ChineseFLAN》
    - 负责部分数据集。
    - 地址：[BAAI/COIG-PC · Datasets at Hugging Face](https://huggingface.co/datasets/BAAI/COIG-PC)
