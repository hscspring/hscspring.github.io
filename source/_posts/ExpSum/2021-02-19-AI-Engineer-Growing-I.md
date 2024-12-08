---
title: AI 工程师养成记（上）
date: 2021-02-19 23:00:00
categories: Thinking
tags: [AI, Skill]
---

- [工作篇](#%E5%B7%A5%E4%BD%9C%E7%AF%87)
  - [工作流程](#%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
    - [数据准备](#%E6%95%B0%E6%8D%AE%E5%87%86%E5%A4%87)
    - [数据分析](#%E6%95%B0%E6%8D%AE%E5%88%86%E6%9E%90)
    - [模型部署](#%E6%A8%A1%E5%9E%8B%E9%83%A8%E7%BD%B2)
    - [工程开发](#%E5%B7%A5%E7%A8%8B%E5%BC%80%E5%8F%91)
    - [运维监控](#%E8%BF%90%E7%BB%B4%E7%9B%91%E6%8E%A7)
    - [更新迭代](#%E6%9B%B4%E6%96%B0%E8%BF%AD%E4%BB%A3)
  - [工作方法](#%E5%B7%A5%E4%BD%9C%E6%96%B9%E6%B3%95)
    - [自动化](#%E8%87%AA%E5%8A%A8%E5%8C%96)
    - [批量化](#%E6%89%B9%E9%87%8F%E5%8C%96)
    - [简单化](#%E7%AE%80%E5%8D%95%E5%8C%96)
    - [边际收益最大化](#%E8%BE%B9%E9%99%85%E6%94%B6%E7%9B%8A%E6%9C%80%E5%A4%A7%E5%8C%96)
  - [有效沟通](#%E6%9C%89%E6%95%88%E6%B2%9F%E9%80%9A)
    - [明确需求](#%E6%98%8E%E7%A1%AE%E9%9C%80%E6%B1%82)
    - [绝对坐标](#%E7%BB%9D%E5%AF%B9%E5%9D%90%E6%A0%87)
    - [不同层级](#%E4%B8%8D%E5%90%8C%E5%B1%82%E7%BA%A7)
    - [讨论问题](#%E8%AE%A8%E8%AE%BA%E9%97%AE%E9%A2%98)
  - [平稳心态](#%E5%B9%B3%E7%A8%B3%E5%BF%83%E6%80%81)
    - [创业心态](#%E5%88%9B%E4%B8%9A%E5%BF%83%E6%80%81)
    - [成长心态](#%E6%88%90%E9%95%BF%E5%BF%83%E6%80%81)
    - [当下心态](#%E5%BD%93%E4%B8%8B%E5%BF%83%E6%80%81)

一转眼转行已四年时间，这是转行以来第一次写关于个人对转行后感想心得的文章。一方面是因为所跨行业过大，行业内也有很多细分领域，要进一步明确方向需要不断试探。事实上，这几年基本能碰的都折腾过了，总算逐渐坚定；另一方面也是感觉一直没有从维度上得到提升，多个领域始终处于不得要领阶段，走了非常多的弯路。这次感受源于与一位资深算法工程师的沟通，又经几篇关于算法工程师工作日常和修养的好文，再加上这些年的积累，认真反思了几日，终于感觉到自己有了质的突破。虽然技能并没有多掌握，但确实比之前强大了不少（虽然依然很弱），有点像炼气期满筑基，奋斗之路刚刚开始，是有此文。

<!--more-->

开篇之前，有必要特别说明几个注意事项：

- 本文是一个【菜鸟】成长的心得感受，以及对自己未来的指导和规划，既有总结也有展望，不一定适用于所有人，若能帮到部分同学那真是荣幸至极。
- 所举例子以 AI 算法（NLP 偏多）相关，毕竟目前从事的细分就是这个，比较熟悉一些。虽然如此，但其中的方法应该可以适用于其他类似职位。
- 内容会囊括工作、学习和生活的方方面面，这都是个人近几年实际经验的总结整理，也有一些个人价值观方面的取向，不一定正确，权当参考。

## 目录



## 工作篇

一次一次的实际经验表明，工作一定是有方法技巧的，蛮干或者盲目地干结果就是事倍功半。本篇主要围绕：工作流程、工作方法、有效沟通、平稳心态几个方面展开，最后是一篇小厂专用篇（因为这几年都在小厂）。

### 工作流程

我们首先假定已经接到一个明确的需求，但要注意，事实上需求往往是不清晰的，甚至有可能是伪需求，这块内容我们放到后面的 “沟通” 环节。拿到需求后，我们一般都会先简单分析需求，接下来的行动就有很多差别了。我们再假定它是一个比较简单的分类任务，数据和标注都有，而且样本分布也没有极度不均衡。面对这种情况，以前的我一般都会毫不犹豫地拿出最新的 最有效果的模型往上怼：如果效果好那就直接用，效果不好再说；如果性能不好，就考虑使用压缩、蒸馏等瘦身方法。这种搞法不能说一定有问题，但我觉得至少考虑问题不够全面，也不够细致。接下来，我们就以此为例展开讨论应该如何从头到尾完成一个产品的需求，是为 “工作流程”。

#### 数据准备

在需求清晰的前提下，第一步要做的是拿到数据和标注。有些标注是可以通过日志或埋点记录直接获取到的，而有些则需要组织人工进行标注。如果是组织人工标注，主要需要注意两个方面问题：第一，要让标注人员充分理解 Label 的含义，不能有模棱两可的情况出现；第二，明白标注一定会有错误。对于错误的标注，可以先跑模型然后预测数据集，将标错的样本按置信度排序后，重新标注。这样重复几个来回，错误的标注就会越来越少。

拿到数据后第一件事就是确定数据的分布，如果是均匀的那还好，如果是极度不均衡的那就要准备采样方案。有些任务可能需要在已标注数据的基础上重新构造数据集，这种情况需要准备构造方案。比如句子对模型，我们实际拿到的标注数据可能是句子加某个 Label，同一个 Label 的表示句子相似，不同 Label 表示不相似。

这一步不同的任务或不同的公司可能都不相同，比如有些公司可能没有埋点，甚至日志记录都不完整。还有些公司可能没有标注工具，只能使用 Excel 这种传统的方法。作为一名工程师，如果遇到类似的情况就应该开始考虑如何去构建这些基本组件和服务。

#### 数据分析

数据构造完成后首先要做的是熟悉任务的数据。因为有时候数据并不是我们想象中的样子，比如用户的 query、或者 ASR 之后的文本、或者来自于网页的内容，不同的数据有不同的特色。用户的 query 可能会有错误，这些错误可能往往是音近或形近导致的，也有可能有拼音输入；ASR 之后的文本可能有很多无效的口气词，当然错误是免不了的，可能更多的是发音不准导致的错误；而网页的文本则一般比较规范，不像 ASR 那么口语化，其中的错误往往也是句法、语义层面的。不同的数据会影响后续的处理以及模型的选择，所以熟悉当前任务的数据是第一步要做的。

接下来要分析数据与 Label 之间的关联性，以分类任务为例，数据样本和每个 Label 之间的关联体现在什么层级？是一些字词就能区分，还是需要字词的顺序？还是需要理解整句语义？是不是需要先进行纠错，不纠错会不会对结果产生影响？只有清楚了这些才有可能选择适合该任务的模型，训练完之后也能够对预期做出检验。比如假设只要单纯地使用字词就可以区分 Label，那 TextCNN 也许就完全足够了；如果句子本身可能有一些无效词，那 TextCNN 的效果也许比 Bert 还好。这也很容易理解，因为 Bert 的预训练是建立在正常文本上的，而且是从整体考虑的，对非正常文本这有时候反而会失效。

所以，熟悉数据、熟悉任务是非常关键的一步。那实际中有什么好的方法吗？这个除了经验外，基本也只能自己去看数据了，而且即便是有经验也最好再熟悉一次，比如不同的 ASR 产品也许犯错的种类不一样呢。实际过程中可以对样本按类别进行均匀采样，然后去观察数据。

####测试方案

很多人以为分析完数据就可以直接开干了，当然这也没问题，但我更觉得在开始之前应该先想清楚测试方案。至少应该包括以下内容：

- 正常的精准、召回、AUC。根据关注精准还是召回，如何权衡。
- 是否有任务需要特别关注的指标？比如推荐要评估多样性、覆盖率等。
- 如何测试模型的有效性？即如何评估模型真正学到了期望学到的东西。这对于之后的改进有非常重要的意义。
- 如何测试模型的性能？能否满足目标，比如多少并发下的平均响应时间。
- 如何做回归测试？主要针对系统不同组件更新对其他部分和整体的影响。
- 如何做线上 A/B 测试？主要测试组件更新后线上是否真的有效。

第一个属于常识，也是最基本的测试方法，我们需要注意的是，多种方法（比如规则+模型）配合使用时，如何确定阈值以实现整个系统效果最优。这里需要重点关注的是尽量让不同的方法互补，交叉最少。

第二个其实是从系统使用的角度考虑的。比如句子对相似度模型，我们在实际使用时往往并不是直接给一个句子对，然后判断它们是不是相似。往往会有其他一些应用场景，比如在 QA 时用来查询最相似的 Answer。这种情况我们应该测试的是召回方面的效果。

第三个是需要特别强调的。有时候我们会上来就用一个当前效果最好的模型（以前的我就经常这样），但很少思考为什么这个模型可以。这里说的为什么是指这个模型的哪个结构或配置起了作用，为什么会起作用，是不是和我们预期（分析数据阶段）的相符。所以，无论我们使用什么模型，都应该深入探究起内部机理，比如 TextCNN，我们可以把 MaxPooling 的位置给标记出来，不同的 Kernel 该位置的分布是什么样的，这些位置能否代表整句话输出对应的 Label。只有明确了这些机理，做到了心中有数，才有可能根据不同的任务和数据调整模型的结构，否则出了问题或者需要优化时只能一脸懵逼了。

后面几个基本都到系统级别了，涉及到与当次任务组件相关的其他模块。性能是保证线上服务稳定的基本，在设计模型之前就应该予以考虑，这里的考虑不止是性能的目标，还应该充分考虑公司能提供的资源。如果最终服务没有 GPU 服务器，那 GPU 并发的推理就不予考虑；如果要部署到边缘设备，那还要考虑支持哪些算子，是否需要单独开发；如果是微服务方式，则需要考虑服务间通信、缓存等因素。总之，最好能在构建模型之前就对最终的使用方式有一定的了解，这样也便于构建和使用最适合的模型。

大部分情况下，我们面临的都是一个系统，模型负责的任务可能只是其中的一个个组件。很自然地，当某个组件发生变化时，很有可能会对依赖它的其他组件产生影响。比如召回和精排，如果召回模块出了问题，后面的精排模块再怎么样结果都可能是有问题的。所以，我们在上线新的版本或使用新的模型时，一定要考虑到它可能对系统整体造成的影响。具体就是在模型发布在测试环境后要跑回归测试，确定模块之间衔接符合预期。

A/B 测试是从产品整体的角度进行评估，一般情况下我们都会让新发布的版本和之前的版本分别在不同的分组上运行一段时间，然后评估最终效果是否提升。需要特别注意分组最好能够保证在各个维度上的随机性。

科学界有句名言：“没有测量就没有科学”，放在软件开发领域依然适用，且无比正确。因为无论我们做什么任务、用什么模型，最终都是要作为产品的一部分给客户使用的。作为一名工程师，我们理应时刻站在整个系统的角度考虑问题。

####模型算法

这部分内容应该是算法工程师最核心的工作了，尤其是对于专门从事算法研究的同学。抛开研究不谈，从工业的角度来看，如果前面数据阶段已经搞得很清楚了，这一部分的工作反倒会容易很多。因为我们现在几乎所有的模型，尤其是有监督训练的模型，本质上都只是在 “记忆” 训练数据，只不过记忆的是特征。不同的模型归根结底只是记忆特征的方式不同罢了。这也就是为什么会有 “数据决定上界，模型只是不断逼近这个上界” 的说法。另外，根据实际经验，模型训练这一过程所花费的时间往往并不多，可能还不到 25%，但绝对不到 50%。而且大多数时候都是把模型跑起来然后就去干其他的了，也不用一直盯着它看。尤其是前面都搞清楚后，这里只需要等模型跑完看下结果，验证一下是否符合我们的预期即可。

当然，关于模型训练我们依然要考虑一些因素：

- 资源。最直观的是机器资源，有条件的可能使用 TPU，没条件的可能只能用普通的 CPU，或者要去租赁 GPU。资源的不同除了训练模型的代码不同外，其实更重要的是训练策略的不同。比如有几乎无限制的资源时，我们可能会多跑几组模型，多试几组参数，甚至会重新预训练大模型，自己做蒸馏压缩。当然除了机器资源，还有人力配备、时间节点等等都要予以考虑。
- 预处理。这块内容和任务强相关，但总的来说中文任务一般包括以下几个方面：
    - 字级别还是词级别的 Token。字相比词没有那么稀疏，词表也比较小，缺点是损失了部分语义。因为中文的基本构成单位是词，尤其是涉及到实体，拆开单独看可能完全是另一种意思。而词相比字，除了词表很大外，还会有未登录词的问题，另外，还需要单独做分词任务。具体使用字还是词要看任务确定。
    - 数据清洗。主要是去掉一些无关的文本，比如超链接、图片、特殊符号等等。
    - 数据归一。这个主要是处理具体的、特定的文本。比如句子级别的任务中，实体（包括人名、地名、时间、方位等）可能并没有太多意义；部分任务中具体的数字可能需要规范到不同的范围。
- 调参。俗称炼丹，主要是对同一个模型使用不同的超参数，比如 Embedding 维度，TextCNN 的 Kernel Size、Filter Size，Bert 的层数，各种 hidden size、激活函数等等。除此之外，还应该包括部分组件的调整，比如增加归一化、使用 Dropout等等。使用不同参数前依然应该遵守分析数据的方法，假定参数调整了结果会咋样，然后通过实际结果去验证我们的假设。
- 多模型。当面对一个任务，尤其是复杂任务时，我们经常会有不止一个想法（模型结构）需要验证，自然需要跑多组模型看效果。即便不是这样，最好也能尝试多个侧重点不一样的模型，这样更容易验证自己的想法。比如，我们可以同时跑 CNN 和 LSTM+CNN 判断时间顺序到底有没有起作用。

#### 模型部署

这里主要指将一个或多个深度学习模型部署为微服务的情况。这是我个人比较喜欢的方式，主要有以下好处：

- 部署使用分离。所有的推理都通过 RPC 或 RestFul 接口实现，与模型部署无关，甚至与模型本身也无关，服务模块只关心输入和输出。这样当我们需要更新模型时，只需将新模型放到对应位置即可，代码层面不用做任何改动。
- 合理利用资源。所有的模型可以统一部署到一个服务下，共享同一个服务器资源。因为模型一般是用 GPU 服务器，而普通的服务一般是用 CPU 服务器，这样的部署方式能够更合理地利用资源。
- 统一管理监控。因为所有的模型逻辑上都在一起，所以无论日常的管理还是数据的监控，实施起来都比较方便。

在部署时，推荐使用容器化部署方案，使用 k8s 或类似的集群框架对服务进行管控。这不是我们要赶潮流，主要是考虑到以下几个优点：

- 部署方便。完全不用考虑不同环境可能造成的冲突，所有的服务相互隔离。部署时通过 YAML 配置服务，实现一键全自动部署。
- 便于扩展。水平扩展可以直接添加实例，垂直扩展修改资源限制，所有配置均可通过配置文件完成，完全实现资源配置化。而集群资源不够时，直接添加节点主机即可。
- 便于管控。通过 Istio 等组件非常容易实现流量和服务管控。比如可以很容易地配置实现灰度发布，进行线上 A/B 测试，而且这些功能都是和业务解耦的。
- 节约资源。因为集群的服务其实是共享节点资源的，所以高峰时期服务会自动多占用资源（当然不会超过配置的限制），低谷时期就自动释放资源。这样其实最大限度地利用了可利用的资源，节约了成本。
- 管理方便。从管理机器变成管理服务，只要配置好相应的服务，机器只是无状态的节点，多一个少一个挂一个重启一个对服务没有影响。而且集群还支持非常细粒度的权限控制，使用权限可以按需下发到部门或个人。

当然，使用这种方案本身是有一定学习曲线的，不可能一下子掌握。另外，也要根据公司的实际情况，分清楚使用场合。

#### 工程开发

工程开发是一个工程师最核心的能力，我们常说算法工程师他首先得是个工程师，就意味着算法工程师必须要具备不错的工程能力。这块其实是编码能力，说起来很大，这里也主要谈一下自己对工程开发的一些浅显认识。

- 写好测试。注意我并没有说 “测试驱动”，因为这个往往说的人多但能做到或做好的少；而且这个并不是规范，更不是银弹，其实也有不少人并不认可。不过测试的重要性绝对是毋庸置疑的，另外我也不大会相信工程师会在写完工程后再补上测试代码。所以，即便不是测试驱动，也强烈建议在开发的同时完成测试代码，甚至可以在功能完成后把测试代码写好。这其实是对自己代码的一种自测，是代码清晰、系统稳定的基本保证，好处至少包括：
    - 代码更鲁棒。主要体现在边界和非法输入测试环节，它会强迫我们去考虑各种可能错误的输入。
    - 代码更清晰。比如有个函数同时做了几件事，在写测试的时候就会发现很不好写，因为几件事可能互相有影响导致输出不同的结果，这就能逼迫你重构代码。
    - 代码更系统。主要是指多个函数（或组件）组合或管道完成一项功能时，结果不符合预期的情况。此时如果某个函数（或组件）有完整的测试，那我们就很清楚地知道该函数（组件）一定没问题，问题肯定出在它之前或之后。
- 出错更容易排查。只要发现 Bug，很容易就知道问题出在哪里，因为报错信息一般能提示到具体的方法或函数，根据报错信息结合已知的测试范围很容易就确定到底是什么原因导致的错误。
    - 只要写一次，就会一直有效。不考虑重构的话，测试简直就是一劳永逸的事，无论代码怎么改，只要功能和输入输出不变，测试就一直有效。还有比这更美好的事吗。
    
    至于怎么写，总的建议是每个函数都应该有测试，且至少应该包括：正常功能测试、边界测试、非法输入测试，底线是核心代码必须要有测试。另外，测试也是要随着代码的演进不断重构和优化的，很多时候甚至是 Bug  让我们的测试更加完善。

- 写好注释。首先需要澄清的是，这里并不是指 “代码即注释”，“代码即注释” 应该是作为工程师群体的基本共识，不需要再多做讨论。这里主要是要解释为什么这样做，或者记录设计思路。以我的实际经验看，如果没有注释，对于稍微复杂的设计或思路，过几个月再看基本上是看不懂了，或者要想很久。所以说，注释首先是给自己看的，可以想象，自己写的代码过一阵子都看不明白，那又怎么能期望别人（尤其是接你活儿的人）能看懂呢。至于形式我觉得反倒是其次，但如果能按规范注释，当代码完成时我们可以顺便得到一份自文档，这对于爱偷懒的人绝对是福音。
- 写好文档。这恐怕是绝大部分程序员最不爱干的事了，不过还是需要澄清一下，这里指的是 “设计文档”，而不是接口或使用文档，后者我一般会倾向于使用自文档。设计文档至少应该编写两次，第一次是在项目或任务开始前，第二次是在结束后。它主要记录项目的目的、整体的构思、所使用的的技术、架构等，它是战略层面的指导方针，编写该文档的过程其实是理清自己思路的过程。如果发现自己无法完成该文档的编写，那很有可能是有些地方根本没想清楚，或者目标或需求很不明确。
- 模块化。与此相类似的还有组件化、微服务化，不过模块化是针对代码功能层面的。模块化有不少优点，比如：系统整体结构清晰，功能结构一目了然；模块之间相互解耦，便于开发和维护；模块可复用程度高，减少代码重复。感觉就像 “代码即注释” 一样，程序员天然就会在不知不觉地模块化。
- DRY。对这条原则的基本感悟是：如果代码重复第二次，就应该考虑将其变为独立功能的函数；如果重复第三次，涉及到的所有代码应该已经很好地被重构了。其实我在这里更加想表达的是，如果有能更省事的方法，就尽量尝试去用，比如泛型编程、宏、模板。
- 分层和抽象。这应该算是一种基本的设计方法，其实我们在软件开发中会经常使用，比如分词可能是一个底层服务，情感分类模型可能就是上一层的服务，对话机器人可能是更高一层的服务。不同层的抽象程度不同，底层服务相比高层服务往往更加抽象，因为它们可能被多个不同的上层调用。这样设计的主要目的还是清晰、隔离、解耦、重用，服务彼此独立且又相互依赖，通过组合形成完整的系统。

#### 运维监控

这块内容其实往往比预想重要，打个形象点的比喻，它就是我们的感官，系统现在的 “状态” 如何全靠它来展示。这里的状态主要可以分为两个方面：数据流转和服务负载。

数据流转是指流程中各个节点的输入和输出情况，节点可能是某一个服务，也可能是一个组件，甚至是一个模型，关注的是流转的内容是否正常。服务负载是指流程中各个节点的流量情况，关注的是流量的大小。这块内容之前涉及的很少，只是简单地用过一下 Istio，暂时也没有太多的感受。先记录几个自己的直观认知。

- 配置化。主要针对运维，理想状态下每个模块都有对应的配置文件，整个系统的组织就是对配置文件的组织。这在 k8s 里面是自然的，我们可以通过配置文件很方便地指定环境变量、资源配置、服务策略等，然后可以用命令行工具一键（或自动）启动或更新。与此相反的是人工手动操作或代码里写死，要尽量避免类似的行为，如果需要通过外部变量影响模块内部行为或模式，最好将这些变量映射到外部配置文件。
- 系统化。主要针对监控，当我们设计监控系统时，不仅要考虑关注的节点，还要考虑这些节点状态信息如何传输、存储、读取、展示，以及数据的流动是否会影响系统性能等多个方面。可以做个很简单的实验，一个简单的循环操作，每个循环打印结果和不打印结果性能会相差数十倍，如果要写信息，性能相差可能会更大。一个反面的例子就是无脑打印日志，不仅充斥着大量乱七八糟的无效信息，还严重影响性能。

#### 更新迭代

软件工程不同于传统的工程项目，它在实施完成后依然需要频繁地改动，这也是软件工程更加复杂的一个方面。这里除了代码层面的可扩展性，还包括版本管理和热更新，此处重点说说后两个。

- 版本管理。我们平常一般会碰到两种不良的方式：第一种，将一大堆功能堆到一个版本下面；第二种，有一个改动就生成一个版本。这一般是粗放式发展下的结果，正常情况下，版本管理应该至少考虑以下几个方面：
    - 需求推动。需求往往来自于三个方面：业务方、运营方和技术规划。无论哪种需求，我们一般都会放在需求池中，然后根据优先级规划不同的版本。版本的迭代可以按周、双周或月，不过个人不太推荐太长的迭代周期。一来容易懈怠，二来可能有新的重要需求不断出现，三来回退麻烦。比较推荐双周一版本，时间分配上，一周用来开发，一周用来规划、测试。
    - 语义化版本。这个本应该是软件开发的常识，其主要思想是将软件的变动记录为 `主版本号.次版本号.修订号` 的形式，主版本号主要是针对不兼容的改动；次版本号是针对向下兼容的功能新增；修订号是针对向下兼容的功能修正。具体可参考：[语义化版本 2.0.0 | Semantic Versioning](https://semver.org/lang/zh-CN/)。这其实是一种基于约定的方法，作为开发人员只要一看版本号就能掌握关于该版本的基本信息。
- 热更新。集群环境下热更新比较方便，我们这里主要说的是模型的更新。具体又包括以下几个方面。
    - 模型全量更新。主要是指模型整体升级，比较推荐 [tensorflow/serving: A flexible, high-performance serving system for machine learning models](https://github.com/tensorflow/serving)，不仅性能优秀，而且可以通过监控模型文件的变化自动升级到新的版本。同时，还支持 RPC 和 RestFul 两种接口，支持版本控制，支持多个模型，简直是业界良心。
    - 模型在线学习。主要指模型根据线上数据实时或准实时更新模型的情况。这块目前工作几乎还未涉及，日后更新。
    - 更新毛刺。主要指模型更新前后线上请求出现的延迟抖动现象。一般在规模很大时才会出现。爱奇艺团队针对 Tensorflow Serving 有过不错的改进尝试，被 Tensorflow 官方公号发表，具体参见：[社区分享 | TensorFlow Serving 模型更新毛刺的完全优化实践](https://mp.weixin.qq.com/s/mQTek0yWS4qAYTIpyT_T1w)。

### 工作方法

程序员这个群体中有许多非常聪明的人，毫不谦虚地说，我从小都算是比较笨的那种，一个题目往往要自己折腾很久，可能还没理解。不过这几年确实也通过工作和读书学习到一些方法。概括来说大概有以下几个方面。

#### 自动化

这恐怕是程序员最基础的直觉和认知了。对此，我的认识是：当你复制粘贴第一次时，你应该考虑是不是可以将其抽象成一个组件或工具；当你复制粘贴第二次时，组件的结构和设计应该已经比较清晰。下次再需要复制粘贴时，已经可以式用自己的组件或工具了。注意，复制粘贴并不意味着一模一样的复制，也许只是复制过来改了部分参数或代码，这种也算。当然，写成组件或工具后，还是需要继续不断迭代优化的，每次自己或别人（如果选择开源）使用后都可能会提供一些修改建议，进而使其演化的更加好用。

自动化当然不应该只体现在代码层面，工作中的方方面面都可以使用自动化，可以将它看作一种解决问题的方法，只要是整个环节重复的都可以自动化。比如我们写博客时会用到图床，一般的流程是：截取并存储图片，上传到图床服务器，获取图片链接。这个过程如果不自动完成真的会让人只剩下好心——恶心死了，可以自动化的方法有很多，比如 Mac 下面的 Alfred 里面的 Workflow 就可以很简便地实现，最终效果就是截图后自动将链接地址放到剪切板上。再比如我们经常开会，会议记录的格式肯定是差不多的，完全可以做一个会议记录的模板，每次开会时复制一下。这两个例子都不是写代码的例子，依然可以提高工作效率，所以关键是要想方设法将重复的动作抽象，重要的是要有这个意识。

自动化不应该局限在程序员群体中，而是应该将该思想和一些工具推广到全公司，尤其是非技术部门，进而提高团队的工作效率。上面刚刚提到自动化并不局限在代码层面，它更多的是一种意识，自然地非技术人员也会需要，而且可能更加需要。比如行政人员可能会手动发工资条，运营人员可能会每天下载一次报表，然后针对报表做一些统计或其他处理，这些工作其实都可以自动完成。

自动化要合理使用工具。自动化并不是高大上，或者必须要会 Python，有时候写代码反而更复杂，比如之前提到过 Workflow 图床的例子。对于非技术人员，Excel 很多时候会更加实用，比如统计、去重、切片、过滤等等，在 Excel 里面就点几下鼠标的事。所以，工具并不重要，只要能让事情 “自动” 完成，那越简单的工具就是越好工具。

#### 批量化

批量化和自动化可能比较类似，但批量化更加侧重一次完成一类工作，核心是 “批量”，而自动化核心是 “自动”。也就是说，自动化的不一定是批量的，批量的也不一定自动化。批量化一般是针对某项具体的工作内容，比如统一查找替换，统一为所有句子添加某个字符、批量下载数据等等。

作为 AI 工程师对此应该非常熟悉，模型训练中的 Batch 其实就是批量化的例子。批量往往具有统一的特点，不仅效率高，而且还能避免一条一条操作可能的错误。比如给定一个若干列的文本文档，要提取出包含数字的行，这时我们可以借助 SublimeText，利用正则找出所有的数字，然后选中所在行复制出来即可。

批量化时刻关注能否 “一次性” 将事情搞定，很多时候会体现在运筹层面，比如要下楼取快递，可以和外卖一起取；或者将要讨论的议题放在一起开会等等。总之，就是尽量将类似的行为一起完成，提高效率。

批量化的另一个角度是时间的批量化。即利用一整块时间做一件事，而不是把时间切分成很多的小块。对我个人而言，一般会选择上午作为静默时间，专注需要集中注意力完成的任务，不看消息，也基本上不动。

#### 简单化

这里的简单包含两层含义：第一层就是很容易理解的 “简单”，第二层是大道至简的 “简单”。第一层的简单和简陋有点类似，一般作为初始方案或临时方案；第二层的简单则是透过复杂冗繁的表象直达本质，整个系统层面的清晰和优美，往往是不断演化改进的产物。体现在工作方面，主要探讨两个角度。

- 模型设计。前面已经提到过，模型算法的设计应该基于任务和数据，在建模阶段，能够满足需要的前提下，应该选择简单的设计，然后不断优化。这里还是需要具体说明一下怎样的设计我认为是 “简单” 的。首先，模型有不同的模块，每个模块有单一、不同且不可或缺的分工；其次，模型的核心模块应该能代表基本假设；再次，模型不应该有一些仅适用于部分情况的特殊设计。根据实际经验，Google 的东西往往符合 “简单” 标准，比如 Doc2vec，BERT，但大部分魔改后的论文都是将其复杂化，不过这也是技术发展的必然趋势，复杂到一定阶段也许就是下一个跃迁。作为工业界的工程师，其实重点关注 GF（Google、Facebook）的前沿研究成果就差不多了，其他的（尤其是高校的）只是作为一个思路参考。毕竟，从概率角度看，GF 有技术、有数据、有人才，能出有用东西的概率比其他地方要高得多。君不见 Word2Vec，Self-Attention，BERT，RoBERTa，DeepWide 等等不都是吗，更不用说 Tensorflow，PyTorch 了。贪多嚼不烂，能把他们的东西研究透彻已经很牛逼了。
- 架构设计。架构设计本身是很复杂的一件事，看起来好像是将已有的技术各种组合在一起，但难就难在这个选择上面。同样的业务问题，不同的架构师可能设计出完全不同的架构，而且往往都能用。架构设计有几个很重要的原则，我们这里主要讨论简单原则。开头提到简单不等于简陋，同样，简单更不是简略或节省，这里的简单更多是逻辑上的，整体结构看起来很简洁。简洁架构更多是从整体复杂度的角度考虑的，模块与模块、组件与组件之间交互简单。要做到这点，一定要从实际出发，选择当下最适合的架构，略微做一定的扩展性考虑，接下来就是随着系统不断演化。需要特别注意三个点：第一，过度设计。好的架构往往是演化出来的，不断演化不断调整设计，而不是一开始就设计的那么好。第二，追求新技术。这本身是个好事，但作为架构设计者必须要综合考虑多种因素，抛开技术层面，新的技术是否稳定、团队能否 hold 住、所有者对未来的规划等等都是很重要的因素。第三，想一步到位。事实上，架构的调整往往是逐步进行的，有可能先调整某个模块，再下一个，有时候更是需要全部推翻重新设计。所以，架构设计不是一锤子买卖，它和公司实际情况包括业务、规划、成本、人员等紧密关联，是在发展中动态变化的。

#### 边际收益最大化

在经济学中，边际收益是指增加一单位的投入所能获取的收益。边际收益具有递减性，也就是说随着投入的增加，收益会逐渐下降。比如很饿的时候，第一个包子最香，吃着吃着越觉得不好吃。在工作中，尤其是 AI 工程师的工作也具有类似的性质，我们应该优先做边际收益最大化的工作，其实用通俗点的说法就是 2-8 法则：用 20% 的资源做能够起 80% 效果的事。

- 优先解决人工部分。长期来看，几乎所有企业都会面临 AI 化，就像十几年前的电子商务，这并不是 “有些” 企业的专属。关于这点，我比较认同吴恩达的观点——将 AI 比作电力。即便从客观角度看，AI 技术确实能在许多方面提升企业效率，比如客服机器人、搜索、推荐等等，区别只是做的深浅程度。即便是已经部分 AI 化的企业，也未必没有优化的空间，我们只需知道技术的存在就是为了提升整体效率，剩下的便是一点点去优化。
- 使用 AI 方法提升传统方法效果。传统方法主要包括字典、规则、机器学习等方法，这些方法目前在很多企业依然是主流，无论原因是什么，都不是不使用新技术的理由。深度学习的有效性已经不容置疑，在很多场景下都可以替换传统方法，或者进一步提升已有的效果。 作为工程师，出现新的方法和技术，即便没效果我们也该去了解了解，更不用效果这么好了。
- 综合使用不同方法的核心部分。不同的方法、不同的模型效果可能不一样，因为它们各自侧重的点不一样。在实际中，我们往往没办法一套方法走天下，即便是最新最好的也不行。 这里想表达的是，正是因为不同方法侧重点不一样，我们反而需要利用这点，选择多种方法组合，这类似于利用了每种方法的最大收益。

### 有效沟通

沟通是职场必备的软技能，当然其实在生活中也非常重要，和家人、和朋友、和另一半等等，有效地沟通不仅能提高效率，而且能增进彼此的好感。

#### 明确需求

- 真正的需求。市场营销中有一个非常经典的例子：“顾客不是想买一个 1/4 英寸的钻孔机，而是想要一个 1/4 英寸的钻孔！”如果你是产品经理或者带过项目，一定会对此深有体会。上面提到过，对于技术来说，需求可能来自业务、产品、运营等多个渠道，但这些需求里面经常会充斥着 “伪需求”，也就是用户自己其实并不知道自己要的是 “孔”。所以，在开发之前最好能充分确认需求，明白自己到底要解决什么问题。虽然我自己是技术控，不喜欢各种非技术的事情，但并不赞同在企业中无脑搞技术。企业是为客户提供产品或服务的，作为公司一员，无论什么岗位，做事都应该以此为导向，要能对得起自己的工资。
- 清晰的需求。有时候需求是清楚的，但具体细节却很模糊。比如，为了提高客服效率，需要做一个智能客服机器人，在实际中有很多非业务相关的闲聊问题，工程师按正常的流程对这些问题进行了处理。但后面却知道，对非业务的问题完全不需要去理会，直接结束对话即可。处理这些问题不仅难度大（开放），也不能增加客户满意度，而且还浪费资源（占用一条线路）。从工程师个人发展的角度看是提升了技能，但对企业来说简直毫无意义，白白浪费资源，长期来看其实也不利于个人发展。

总而言之，明确需求是工程开发的第一步，要做到这一点就要尽可能地去了解业务，了解产品的规划，要多站在公司的层面思考问题，而不仅仅是自己的一亩三分地。

#### 绝对坐标

绝对坐标是指无论哪个人从哪个角度看位置都不变，这里的关键词是 “上下文”。 

- 技术之间沟通。这里不仅指内部同事之间的沟通，也包括与外部的技术顾问或技术朋友之间的沟通。技术之间的沟通看起来好像容易些，但有时候反而会造成很大的误会。造成误会的主要原因是对话双方本身的技术背景和对项目的了解程度不同。比如我和一位大拿沟通，问对方用什么模型做分类任务比较好，大拿问了资源限制后认为可以用 BERT，但其实我任务的输入是口语化的，而且部分句子是有错误的，如果直接拿已有的预训练 BERT，并不能取得想要的效果。换句话说，大家看起来好像在谈论同一个事情，但其实说的又不是一个事情，就好像 “司机的知识” 那个故事一样，你也懂，我也懂，但也许大家的 “懂” 完全在不同的层面。所以，技术的沟通尤其应该充分告知对方上下文，给对方足够多的细节，否则很容易得到对方那个层次的解决方案。
- 与非技术人员沟通。与非技术人员的沟通看起来要难一些，但这个难更多体现在难以通俗易懂地表达出自己的观点，一般不太容易会造成误会。我们在沟通的时候时刻注意两点即可：第一，务必不要谈论任何技术细节，把技术部分当做一个黑盒子，重点、详细描述输入和输出；第二，多问一下他们到底关注什么，非技术人员大多数情况下并不关心技术。

#### 不同层级

上面讨论的是与不同职位之间的沟通，接下来讨论下和不同层级之间如何沟通。

- 管理上级。这里所谓的 “管理” 并不是对下级的那种管理，更多的是一种与上级在工作中协力合作的方法。要想管理好上级，最重要的是明白上级想要什么。大多数情况下，作为一个领导，不太会关注琐碎和无关紧要的细节，他们更多关注的是：1. 事情有没有做完（进度）；2. 有没有什么问题（质量）；3. 需不需要帮助（资源）。所以，我们应该时刻将这些信息与领导同步，让对方心中有数。这个过程中最怕两种情况：第一种，不主动汇报工作，非要等领导问起了才说。这很容易造成不必要的误会，比如你明明需要领导协调资源，或者由于客观原因导致进度延后，结果没及时汇报，当需要结果时你觉得不是自己问题，委屈巴巴，可领导上面还有领导，本来要正常上线的东西因为你上不了了，他还是最后一刻才知道，是不是看起来更不容易。第二种，碰到不确定的问题时想当然处理。这种情况可能是因为太过自信，或者侥幸心理，但无论哪种都可能导致实现的东西和想要的不同，造成人力和时间的浪费。
- 理解平级。这里的平级主要是指和你对接的本组或其他组甚至其他部门的人，平时和你对接工作比较多，级别大致也比较接近。对于他们，我觉得最主要的是要理解对方。不同的人性格不一，有的比较急躁，有的容易拖拉；不同的职位看问题的角度也不一样，有的人关注结果，有的人想了解过程。无论是什么情况，平时沟通时尝试多站在对方的角度思考对方需要什么，尽量去理解对方的难处。我记得大学时《沟通技巧》课的老师曾告诉我们，不仅要 “己所不欲勿施于人”，还应该 “人所欲施于人”。如果站在自己的角度来说，我觉得就一句话：“别给别人添麻烦”，给别人东西时仔细检查几遍，自己这边要确保在能力范围内万无一失，尤其不要出同样的错误。其实这样做也是提高我们自己的效率，毕竟有问题来来回回沟通多次也是浪费时间精力。
- 指导下属。这方面经验很少，但我们可以以一名下属的身份想象 Leader 应该怎么做，当然如果我们以后成为 Leader 也该同样如此。首先，给下属的任务应该明确、具体，符合 SMART 原则；其次，了解下属的长期规划并为其提供建议，工作中给予其尝试机会；第三，与下属深入讨论任务方案和关键细节，为其提供指导；第四，培养下属良好的工作习惯和心态，让其少走弯路；第五，了解下属性格和经历，以对方能理解和接受的方式沟通。当然，这个 list 还可以继续的，但我觉做到这五点的已经实属不易了。如果有幸遇到这样的 Leader，那就好好珍惜吧。

#### 讨论问题

这里的 “讨论” 和 “问题” 都应该有引号，讨论是指几个人或一伙人在一起探讨一个问题，往往以正式或非正式的会议形式展示。问题是指上来就直接讨论问题本身，不要再花费时间去介绍背景、来龙去脉等。这个想法是来自 Google 会议准则，但更多是被大量像老太婆裹脚布一样又臭又长的会给烦的。关于 Google 会议准则可以参考：[Google's Rules For A Great Meeting](https://www.businessinsider.com/googles-rules-for-a-great-meeting-2014-9?r=US&IR=T)。那么怎么做到这点呢？我觉得可以参考两个策略：

- 提前给相关人员发相关资料。相关人员就是和这次讨论直接相关的人，相关资料就是关于要讨论问题的上下文背景。这件事是需要会议发起人去做的，根据问题的具体情况提前相应时间发送，不要太早或太晚。要知道 N 个人的会议上一分钟时间其实是 N 分钟，作为会议发起人应时刻提醒自己这点。
- 参会人必须发表观点。这点看似有点强人所难，其实却非常合理，很简单的道理：没观点参什么会，不是浪费时间吗。有人会说，有时候确实没有观点，没什么想法，对此，我的亲身经验告诉我：如果问题确实需要讨论，一个人没有观点只能说明他没有思考，没有准备，再说明不了任何事情，没有例外。再说了，“讨论” 本来就是你有一个想法，我有一个想法，然后大家才有讨论的可能。

除此此外，会议的时间需要注意，尽量选择大家在一块的时间，尽量选择大家脑子比较清醒的时间，比如晨会结束。会议时长也应该控制，不要太长，这需要主持人注意控场，别讨论着就跑偏了。

### 平稳心态

稳定的心态也是一项重要的资本——心理资本的显著特征，是个人重要的[四种资本](https://www.yangzhiping.com/psy/capital.html)之一。这里只介绍三种个人觉得比较重要的心态。

#### 创业心态

大多数情况下，我们都只是个打工人（我相信老板应该不会看到这个），但即便是最基础的岗位，也可以以一颗创业的心态面对。具体而言，就是将你要做的事当成就好像自己的事一样，认认真真干，想法设法做得更好，通俗点说，就是要有主人翁意识。这样做的好处显而易见：首先，你的工作结果应该不会太差，你的上司和老板都会知道这点，长此以往，涨薪和升职几乎是板上钉钉的事；其次，你的个人能力会不断得到提升，虽然有可能会出现干得多错的多的情况，但错的多往往才能学到的多，需要注意的是不要老犯同样的错误；第三，这种做事和思考问题的习惯能让你长期受益；最后，这么做不吃亏，反正时间就那么过了，为什么不选择更好的状态呢。当然，这一切都是建立在你至少不厌恶这份工作的基础上的，如果你正好很厌恶现在的工作，建议马上立刻换。

#### 成长心态

接下来是成长心态，可以从两个角度去理解，第一个角度是保持学习心态，AI 工程师要学的东西非常多，技能点基本是点不完的，所以主动学习几乎是必须的。可能大家都会有种感觉，如果几个月不跟业界成果就会突然发现很多陌生的东西冒出来。我想这也正是这个岗位的魅力所在——不断学习利用新技术做最酷炫的产品，同时提高社会整体效率——我是坚信 AI 技术能够（正在）做到这一点。第二个角度是保持空杯心态，可以从两个方面去理解，首先是虚心的态度，即便是自己较为熟悉的领域，也应保持科学谨慎的态度，不要想当然，更不应该自以为是；还有就是对未知的好奇和敬畏，主要是指面对自己不熟悉或完全不知道的领域时，应该像小孩子一样充满想要了解的欲望，同时又应该像成年人一样对知识保持敬畏之心。总而言之，用乔帮主的话说就是：“Stay Hungry，Stay Foolish”。

#### 当下心态

过去的无法改变，未来的无法预测，我们唯一能主动把握的就只有此时此刻。当下心态具体可分为以下几个方面：第一，活在当下，不为过去嗟叹，不为将来忧心。用通俗地话来说，就是别净想些没用的。当然，这和总结历史、规划未来没关系。第二，不瞻前顾后，怨天尤人。我第一家公司的董事长一直强调一个观点：“没有更好就是最好”，他本意是在没有找到更好的工作之前，现在的工作就是最好的。这个观点当然可以放在除了工作外的其他地方，比如爱人；第三，珍惜拥有。既然当下的在当下是最好的，那我们能做的、应该做的就是用心对待，既要像刚拥有时那样，又要像将失去时那样。当然，如果对方正好和你相反的，那赶紧离开方为上策，因为这是迟早的事。惟愿不负韶华，一生无悔。

