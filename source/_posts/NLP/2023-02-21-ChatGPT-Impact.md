---
title: ChatGPT 影响冲击：职业、行业与产业
date: 2023-02-21 23:30:00
categories: Feeling
tags: [AI, NLP, ChatGPT]
mathjax: false
---

2022 年末的时候，ChatGPT 横空出世，朋友第一时间关注试玩后与我分享。当时听他说效果很好，不过我并没有特别放心上，毕竟，对话机器人已经不知道来过多少轮了，都快麻了。直到过了几天他给我看了一个非常亮眼的 Case——把我们平时工作中的业务文本直接丢给 ChatGPT，让它做实体抽取任务。结果完成的非常好，甚至可以按照指定的格式（如 Json）输出，而且如果你再告诉它一些特有规则，它还能进一步提取。这就很厉害了，至少之前的对话机器人可做不到这点。于是赶紧关注起来，先看介绍——哇靠，居然有强化学习（个人兴趣，一直比较关注强化学习在 NLP 方面的应用【相关文献1和2】），顿时来了兴趣——再看，发现 InstructGPT 这篇 Paper 在 11 月已经读过了，顿时恍然——原来是这篇。然后就上淘宝买了个账号开始玩起来，玩着玩着就感觉到这东西对 NLP 这个职业的冲击，但当时并没有想到它能出圈，能影响整个行业甚至产业。

过年的时候，在用它写春节祝福时发现 Prompt 技能不够用了，搜了一下才发现是自己狭隘了，于是赶紧补充了一波，写下了这篇 Prompt 工程：[ChatGPT Prompt 工程：设计、实践与思考 | Yam](https://yam.gift/2023/01/25/NLP/2023-01-25-ChatGPT-Prompt-Engineering/)。然后，我感觉好像应该差不多了吧，没想到，一切才刚刚开始……现在，大家都知道了……在 Prompt 工程中，我在文末写到：“本想继续谈谈关于 ChatGPT 对 NLP 行业甚至 AI 领域的影响，以及是否马上就会出现强 AI，以及与此相关的影响等，由于与本文主旨关系不大，我将择文再议”。其实后面一直想写，只不过因为要研究 ChatGPT 的实现和[标注](https://yam.gift/2023/02/19/NLP/2023-02-19-ChatGPT-Labeling/)，所以耽搁到现在，现在总算可以把这个坑给填上，只不过我把影响范围进一步扩大了——到产业级别。

本文主要就 ChatGPT 对职业、行业和产业的影响展开讨论，为了避免被其他信息影响，最近一段时间几乎没看（刻意为之）类似新闻或文章，所以内容更多会偏主观，仅供参考。

<!--more-->

接下来，我们首先分析对职业的冲击，然后讨论对行业的影响，最后再说说对产业的改变。我相信 ChatGPT 的影响和冲击是深入且全面的，这是技术上的一次突破，也是 AI 领域的一剂强心针，甚至可以算是一场革命。它带来的影响到底是什么、会怎么影响，各方利弊如何，我们该做什么、怎么做，这些都值得我们思考，下面我们将分别探讨这些问题。

## 职业冲击

在 Prompt 工程那篇一开始，我提到了在那之前的一次群讨论，大概意思是：ChatGPT 抹平了任务、行业、语言，以后不用分各种 task，不用刷榜，也不用搞什么行业微调，NLP 工程师得考虑转行了。如今距离那次讨论有一个多月了，我的观点依然不变——NLP 工程师不容乐观。有个类似的知乎问题里，不少同行也持类似观点。当然，也有人用 BERT 当时的情况举例，觉得 NLP 工程师不过是从微调 BERT 到使用 ChatGPT。对于这点我也认同，对于存活下来的 NLP 工程师当然是的——但问题是，可能并不需要那么多 NLP 工程师了。也就是说，这个职业本身正在受到严重冲击，甚至可能彻底消亡。

我们来一点一点分析。首先看 NLP 工程师常见的任务有哪些，大概不外乎：情感分析、文本分类（包含多标签分类）、语义相似度计算、命名实体识别、阅读理解、简单推理、文本摘要、关键词提取、文本生成、翻译。差不多了吧，我相信大多数的 NLP 工程师平时用的最多的应该就是三个：分类、语义相似度和命名实体识别。ChatGPT 完成的怎么样，相信试过的人都知道。这意味着，任何一个人，即便不具备 NLP 相关知识和技能，也可以通过 ChatGPT 完成这些 NLP 任务。我们先不考虑当下各种问题，单说这个可能性，难道还不能让作为 NLP 工程师的你感觉到岌岌可危？事实上，很多 NLP 工程师和我一样，最近几个月含焦量爆棚，我自己有时候觉都睡不着。

再来看看目前可能存在的问题吧。

- 第一个是 Prompt 工程。这个其实不算什么问题，NLP 工程师熟悉任务可能描述的更清楚一些，但其他人稍稍了解一下也可以做到；而且，即便写的不那么好，它也能给你返回不错的结果。再说，Prompt 工程以后都可能不需要了，这是 OpenAI CEO 说的（相关文献【3】，字幕【4】）。
- 第二个是垂直领域微调问题。OpenAI 提供了微调接口，你只要准备好数据，它帮你微调一个定制版模型；而且你可以累加式地调，有新的一批数据就丢给它。这个工作，有手就行。另外，微调和从头训练可不一样，并不需要那么高的成本，也不需要那么多的时间。
- 第三个是费用问题。这个目前确实不好说，但我相信会越来越便宜的，一个是因为规模效益，另一个是竞品也会相继出现。如果你还是对 API 调用这种形式心存疑惑，不妨看看目前百度 NLP、阿里 TTS/ASR 等服务的情况。八个字概括：应用广泛，价格便宜。

其实还有一些问题，比如生成结果不可控，结果不知道是否真实（这个 Bing 已经解决了），以及网络问题等等。这些其实都不用太展开，我们这里只说对大部分 NLP 工程师来说，你得（不得不）承认，如果 ChatGPT 可以自由地使用，完成目前工作中的 NLP 任务并不需要太多专业知识，后端完全可以绕过算法把很多任务做掉。只要这一点就可以断定这个职业未来堪忧。

之所以没有说死，是因为其中还有一些工作是 LMAS 短期内不太好解决的。比如知识图谱链接等，尤其是知识库非常庞大的时候，不见得可以很轻松地把所有知识都微调到 LLM 里。再比如有些非常垂直（或者数据保密）的领域，LLM 根本拿不到数据，自然也难以学到相关知识。此外，还有不少需要私有化的场景，这种场合可能并不需要这么大的模型（也就不需要私有化大模型）。但总的来说，NLP 本身的圈子在缩减，即便存活下来也很不乐观。

为什么？为什么 ChatGPT 出现就成这样了，之前 BERT 就不会？我觉得这里有一个非常关键的点，就是 ChatGPT 本身具备的足够强大的 In-Context 能力，让其在完全不需要调整模型的情况下可以很好地完成相关任务。我们不妨在重新思考一下「模型」是什么。程序员都比较喜欢组件化、模块化，但模型（尤其是大模型）往往是端到端，我跟朋友开玩笑说这真是不讲武德。模型让之前很多靠特征工作的工程师失去了价值（图像、音频更加明显），圈内人都在卷模型了，各种架构满天飞，榜单被一篇篇 SOTA 都快刷烂了。工业界虽说只是微调，但毕竟还是要掌握一些专业知识的，不同任务之间还是有区别的，甚至还会结合一些专业知识，比如翻译、纠错等。但现在，一切都过去了，现在连刷 Paper 看到有些落伍的标题都觉得索然无味——真的没有吸引力了。不管什么任务，只要简单引导一下，都能完成的相当不错，还瞎折腾啥呢。而且它的能力还在不断提升，真如 ChatGPT 的使命所说：“开发通用人工智能，确保它安全，然后部署到全世界，使其最大限度地造福全人类。” NLP 工程师只是第一批罢了。

那么，作为 NLP 工程师能做什么呢？首先可以肯定，NLP 工程师依然是需要的，只是职位大概会变少，可能只有一些顶级研究机构和大厂会设置少量职位，但毕竟这也是职位；而且考虑到上面说的数据隐私、私有化等情况，其实还是有一部分机会的。所以，如果身处这些位置的话就比较幸运，只需不断学习提升自己即可。对于大多数 NLP 工程师来说，趁早调整自己的方向可能是不得不做的。可以选择的方向非常多，如果只讨论职业的连续性，可以考虑 AI 工程师、AI 产品经理、AI 架构、AI 技术经理等职位。其实，不光是 NLP 工程师，其他算法工程师未来如果要继续从事这份工作的话，也得考虑往 AI 全栈发展。图像、文本、语音之间的边界区分越来越模糊，多模态是未来表征的一大趋势。强化学习也会运用的更加广泛，再加上世界知识建模，AI 的发展已经逐渐呈现出大一统的状态。只会一两样怎么可能适应未来的需要。关于这点在多年前的【相关文献1】中已经简单讨论过，直到现在我依然比较相信这个框架：深度学习根本是在表征表示，强化学习根本是在策略规则，以及还需要的世界知识（常识）。强化学习为什么是 ChatGPT 的关键，主要是因为现实中的指标在 Case 上特别模糊，标注都很难进行，这时候只有一些指导性的原则规则在。具体可参考：[ChatGPT 标注指南：任务、数据与规范 | Yam](https://yam.gift/2023/02/19/NLP/2023-02-19-ChatGPT-Labeling/)。当然，这个转变是需要过程的，并不是说马上就会受到冲击，但未雨绸缪一定没有坏处。

## 行业影响

这一部分呢我们主要分析 ChatGPT 会对哪些行业场景产生影响，可能会怎样影响，以及会有什么利弊。由于行业本身比较宽泛，所以我们可以聚焦一些具体场景或产品/应用，这样可能画面感更强。这个真是随便一想就可以列出一些，比如：

- 交互类产品：个人助理、智能音箱、陪聊机器人、游戏 NPC、智能客服等。
- 虚拟人应用：虚拟接待、虚拟主播等。
- 营销广告：各种创意激发、头脑风暴。
- 文字创造应用：文案编写、稿件撰写、文章编辑、辅助写作（书籍、剧本）、书籍文章总结等。
- 问答类产品：知识问答、情感辅导、心理咨询等偏专业服务。
- 教育培训服务：一对一教学培训、编程学习、语言学习、面试辅导等。
- 代码提示生成：集成 IDE，或自动根据注释完成代码。

可以看到，绝大部分其实还是聚焦在它的「生成」能力，也就是创造力方面。这点是可以理解的，ChatGPT 最强大的就是其对用户问题的理解力以及基于理解的回复生成能力。这样的能力自然可以应用到多个领域，可以说只要和创造相关的领域就都有其用武之地。更进一步的是，不少公司已经把 ChatGPT 作为一个统一服务的入口。通过这个入口，用户可以享受到公司内部的所有服务。其实，必应的对话搜索框也可以看作是这一类的应用。当然，也不止是这种生成任务的场景，其实 NLP 的所有任务它都能做，这点我们在上面已经分析过了。不过真正突破性的还是生成能力，以及其对问题的理解能力。总的来说，如果非要说会对哪些行业产生影响，个人觉得是几乎所有服务类行业，只是说有些行业影响深，有些行业影响浅。为什么会有这个结论呢？其实很简单，如今的 ChatGPT，除了事实能力和知识更新能力还有缺陷外，其他方面我们几乎可以把它当做一个真人，而且还是一个专家（几乎堪比真正的专家），比如你可以让他扮演一个经验丰富的销售人员，或者一个技艺高超的程序员等，更多示例可以参考【相关文献8】，他几乎可以被看作一个万事通。我们想象如果每个人都可以自由地获取到他的服务和能力，又有哪些服务行业不能被影响到呢？工作或职业这种依赖知识和技能的东西正是他所擅长的，剩下的可能是和人类情绪感受息息相关的了，比如美食、运动、感情等等。

对于具体怎么影响，过程和形式如何，这个由于行业之间差异较大，再加上很多不确定性，我们只能通过头脑风暴的方式窥探一二。首先，可以肯定的是，会涌现出一批专门基于 ChatGPT 能力的应用：营销文案、智能客服、翻译、文学创作、搜索问答等等。可能是终端应用层，也可能是中间层，只有我们想不到，没有他人做不到，这一批新生应用有可能会催生出几个独角兽公司。其次，ChatGPT 会作为超级工具被当前各行业所使用，各行各业都会尽其所能挖掘在本行业中的使用场景和可能性。这恐怕也是主流的一种形式，毕竟他本质上只是工具（这对 AI 也是一样），它和互联网还不太一样，互联网是一个新的场所，可以把很多东西搬到网上，这叫互联网+；但是 AI 却不是这样，它更多的是赋能，也就是 +AI。比如说用大模型来寻找新的分子结构，AI 辅助写作软件使用 ChatGPT 提高能力等等。第三，ChatGPT 会被作为基础服务供任何人自由获取，个人或几个人能够做的事情甚至可比此前成百上千人的团队。其结果就是全社会行业被极大丰富，可能会涌现出很多之前不存在的新事物，包括新的服务、新的职业等等。当然，产品和服务的设计可能会成为决定性因素，技术的差距将会被无限缩小。不一而足，但无论如何，相信 AI 一定会深入到全社会每一个领域，就好像现在无处不在的电一样，这个观点还是吴恩达之前提的，说 AI 是新的电力，但恐怕连他都没想到这么快就能看到了。

最后，我们专门分析一下对整个 AI 行业的影响，这部分内容不讨论具体场景，只是分析这一波（以及之前的 AI 生图）对整个 AI 行业研究和发展会造成咋样的影响。目前看来，至少有以下几个趋势是不可避免的：

第一，模态之间的界限会越来越模糊。记得在 [ChatGPT Prompt 工程：设计、实践与思考 | Yam](https://yam.gift/2023/01/25/NLP/2023-01-25-ChatGPT-Prompt-Engineering/) 中提到，NLP 的行业、语种和任务已经被抹平；同理，各种不同的模态也将被抹平。未来，可能只有 AI 算法工程师和传统的机器学习算法工程师这两种算法工程师。对于多模态，大多数人认为的可能还是文本、图像、音频；不过【相关文献5】中对多模态的定义个人觉得更加值得参考，它是站在计算机处理的视角把多模态看作是「异质信号」。也就是说，不同的模态主要是信号不一样，除了常见的三种模态，文中还列了其他 7 种（共 10 种）模态。你说我只会其中一个这在未来合适嘛……

第二，算法之间的界限会越来越模糊。这个我们已经多次强调过了，以后一定是世界知识、强化学习、深度学习，甚至其他（如符号主义）等多种算法的融合。这是复杂问题的解决之道——一定有一个简单清晰的框架，但是又不会简单到只有一点。世界是复杂的，人是复杂的，我们做研究往往只能增加一堆假设（比如经济学中的各种假设），构建简单模型，关注其中的核心要素。但是，要想在现实世界中应用，很多假设就得去掉了。从 Google 的 [Say Can](https://say-can.github.io/) 到微软的 [ChatGPT for Robotics](https://www.microsoft.com/en-us/research/group/autonomous-systems-group-robotics/articles/chatgpt-for-robotics/)，这些令人惊艳、血脉偾张的工作无一不是综合多种算法的成果。我相信对一个热爱本行业的人来说，只会感觉到振奋和激动。如果我们只会其中一种算法，这也不太合适吧……

第三，AI 研究和应用会越来越两极化。以前，无论是高校还是企业，都可以一边搞应用，同时还能搞点创新，比如魔改个网络结构，调整一下损失函数之类的，尤其是各大厂、科研机构和小巨头干这事儿比较多，也造福了很多中小企业，大家把方法抄过来咔咔就用在自己这里。不过以后这种现象可能要发生变化了。ChatGPT 出来以后，GPT3 一下成了香饽饽，但是 1750 亿的参数让训练本身（无论是技术上还是资源上）成了一个巨大的门槛。国内能干这事儿的没几家，能干出来的可能更少。那比如说，我现在有个新想法，我觉得 Enc-Dec 的模式更符合人类大脑运作过程——先 Enc 想再 Dec 说，我觉得如果能干到 1750 亿参数，能力不亚于 GPT3。好了，现在谁来验证这个想法（其实我感觉 Google 早就开始做了……）？为什么人有从众心理，因为有人趟过坑了，这样安全呀——这是几千万年进化的结果。未来 AI 会越来越火，可研究的东西也会更多，但能研究的机构却不多，AI 不再平民化（当然也之前也没平民化，只是以后更甚）。但是应用侧却由于 LMAS 而更加平民化，这就导致了中间的算法工程师有点尴尬，大部分可能不得不在夹缝中求生存。

那么，作为身处潮流中的人应该怎么做呢？我觉得很简单——拥抱 AI，拥抱变化。从产品到服务，从代码到架构，都应该从原来的思维方式转变为 AI 下的新方式，将 AI 思维作为一种基本的思考方式。这样说可能有点抽象，简单来说就是，无论做什么，先想想能否用 AI 来解决或提供解决方案，如果可以，怎么去用好它。总的来说，我们相信、也愿意相信，相信 AI 能够改善世界，让世界变得更美好；也相信人类也会因 AI 获得更多快乐和幸福。

## 产业调整

这个问题比较宏大，自己对这块研究也不深入，所以只能简单聊聊。主要从三个方面来展开：政策、资金和人才。

国家早在2017年就已出台《新一代人工智能规划》，2022年又发布《关于加快场景创新以人工智能高水平应用促进经济高质量发展的指导意见》，要求全社会促进人工智能与实体经济深度融合。虽说政策是宏观的，没有具体细节，但至少总体方向是偏AI的，也就是说这条赛道肯定是没有问题的。至于说会不会变成“新土木”，个人觉得不会，至少不完全会。软件行业虽然发展了几十年，但计算机却是一直在创新、突破，不断有新的应用形态出现，Web1.0、Web2.0到Web3.0，从大规模团队协作到敏捷开发，从单机到分布式，从成百上千人的团队到效率更高却只有十几人的团队……一切都在变，从这个角度看，当下的技术变为“新土木”是可能的。但从计算机科学的角度看，未来只会更加重要、越来越重要。这从本质上和传统的技术是不同的，相较传统技术，计算机技术明显更加通用，更加灵活。

连续多家ChatGPT相关的创业公司获得巨额投资，资金仿佛终于找到了一个出口，纷纷涌入。资本往往是最敏感的，之所以如此青睐ChatGPT和AIGC，一方面是因为其他行业都已经看到了尽头或短期内没有突破的可能，另一方面也是因为由ChatGPT引领的这一波变革的确可能带来很多变化，有人不是说整个行业都可能需要重构吗。这次就跟四五年前的四小龙（商汤、旷视、依图、云从）一样，虽然不知道能持续多久，但至少当前是热乎乎的，这已经很好了好吧。资本都是看预期的，在所有人没看到之前就早早进入，如果一切都在轨道上了，那已经是收获的季节了。所以，几乎可以肯定，未来很多年，AI这条赛道都是资金热捧的赛道，无论AGI（通用人工智能）是否出现，或什么时候出现，对资金来说这不重要，重要的是，它有可能出现，这就足够了。

我想这也是为什么明明从业者感觉已经很卷，人才已经供大于求了，很多高校近一两年才开始开设人工智能相关课程的原因所在。行业和技术的发展很难以当下的情况进行预判，从宏观角度来看，既然确定这条赛道是未来的主赛道之一，那就没有理由不为此早做准备。至于短期内的阵痛，那是难以避免的，总好过未来措手不及导致无法上车带来的长痛。对个人来说，有时候上不了车还有其他选择，但对一个国家来说，上不了车可能就再也没有机会了。但反过来说，个人的机遇有时候也就那么短短几年，错过了就只能做其他选择了，很难再次调整，在整个大势面前，个人力量太过渺小。不过这里有一点不太明朗，那就是AI（或其他算法）是非常高效的，是否像其他行业的发展一样需要那么多人，答案不确定。所以，只能先把人才基数做上去，到时候优胜劣汰，技术的效率越高，竞争越激烈。当然，如果AI已经高效到不需要绝大部分人时，那又是另外一个问题了。

## 文献参考

**相关文献**

- 【1】 [NLP 与 AI | Yam](https://yam.gift/2018/07/22/NLP/2018-07-22-NLP-and-AI/)
- 【2】[【Whalepaper第37期】NLP论文研读：Towards Extreme Multi-Task Scaling for Transfer Learning_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1M3411j7gn/?vd_source=25267fdf6ac60f2b1937c53c36aa5ee7)
- 【3】[OpenAI CEO Sam Altman | AI for the Next Era - YouTube](https://www.youtube.com/watch?v=WHoWGNQRXb0)
- 【4】[AI for the Next Era | Greylock](https://greylock.com/greymatter/sam-altman-ai-for-the-next-era/)
- 【5】Paul Pu Liang, HighMMT: Quantifying Modality & Interaction Heterogeneity for High-Modality Representation Learning, Carnegie Mellon University, 2022
- 【6】Michael Ahn, Do As I Can, Not As I Say: Grounding Language in Robotic Affordances, Google, 2022
- 【7】Sai Vemprala, ChatGPT for Robotics: Design Principles and Model Abilities, Microsoft, 2023
- 【8】[f/awesome-chatgpt-prompts: This repo includes ChatGPT prompt curation to use ChatGPT better.](https://github.com/f/awesome-chatgpt-prompts)