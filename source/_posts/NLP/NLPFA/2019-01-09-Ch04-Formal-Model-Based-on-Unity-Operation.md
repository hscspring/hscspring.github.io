---
title: 自然语言计算机形式分析的理论与方法笔记(Ch04)
date: 2019-01-09 11:32:00
categories: Feeling
tags: [NLP, AI, Unity Operation]
---

# 第四章：基于合一运算的形式模型

短语结构语法有局限性，其中最大的问题就是生成能力过于强大，区分歧义结构能力很差，常常会产生大量的歧义句子或不合格句子。于是就出现了本章将要讨论的这些能够避免这种局限性的新的语法理论。

<!--more-->

## 中文信息 MMT 模型

作者在 20 世纪 80 年代初期提出了 “多叉多标记树形图分析法”，又叫做 “中文信息 MMT 模型”。

为了改进短语结构语法中的二叉树，MMT 模型使用多叉树。因为汉语的很多形式不便用二叉树描述：

- 兼语式
- 状述宾式
- 双宾语

MMT 模型提出了树形图的多值标记函数概念，采用多个标记来描述树形图中结点特性。主要针对短语结构语法单标记分析能力太弱生成能力太强的弱点，更适合汉语：

- 汉语句子中的词组类型（或词类）与句法功能之间不存在简单的一一对应关系。因此描述句子时，除了组成成分的词类或词组类型特征外，还须给出句法功能特征，才不致产生歧义。
- 汉语句子中的词组类型（或词类）和句法功能都相同的成分，与句中其他成分的语义关系还可能不同，句法功能与语义关系也不是简单一一对应的。因此，还须给出语义关系特征。
- 航雨中单词固有的语法特征和语义特征，对于判断词组结构的性质往往有很大参考价值，因此额外标记语法和语义特征的多标记就便于判断词组性质。

MMT 中采用若干特征和它们的值来描述汉语。由特征和它们的值构成的描述系统叫做 “特征/值” 系统。汉语的 “特征/值” 系统：

- 词类特征和它的值：CAT
  - 名词、处所词、方位词、时间词、区别词、数词、量词、体词性代词、谓词性代词、动词、形容词、副词、介词、连词、助词、语气词、拟声词、感叹词、标点符号和公式等共 20 个值
  - 每个特征可再取子值进一步分类
- 词组类型特征和它的值：K
  - 动词词组、名词词组、形容词词组、数词词组，共 4 个
- 单词的固有语义特征和它的值：SEM
  - 固有语义特征即单词的语义类别，表示孤立的单词的语义
  - 物象、物资、现象、时空、测度、抽象、属性、行动，共 8 个
- 单词的固有语法特征和它的值：GRM
  - 可以具有子值
- 句法功能特征：SF
  - 句子自动分析中产生，不是单词或词组本身固有的。可以有子值
  - 主语、谓语、宾语、定语、状语、补语、述语、中心语，共 8 个
- 语义关系特征：SM
  - 句子自动分析中产生，孤立的单词谈不上语义关系。可以有子值
  - 主体者、对象者、受益者、时刻、时段、时间起点、时间终点、空间点、空间段、空间起点、空间终点、初态、末态、原因、结果、目的、工具、方式、条件、内容、范围、比较、伴随、程度、附加、修饰等
- 逻辑关系特征：LR
  - 单词与单词或词组与词组之间存在的逻辑关系就是 Chomsky 所说的 “题元关系”。一般没有子值
  - 论元0（它是句子的深层主语）、论元1（它是句子的深层直接宾语）、论元2（它是句子的深层间接宾语），共 3 个值

MMT 的 “双态原则”（DSP）：

- 静态特征：CAT、SEM、GRM
- 动态特征：K、SF、SM、LR
  - K：一般根据静态特征可以推算
  - SF：通过上下文信息推算
  - SM 和 LR：多步演绎和推理
- 实际操作时，先从词典中查询静态特征，然后在此基础上求解动态特征。

汉语自动分析的步骤：

- 切词
- 标注
- 将静态特征相容的单词结合成词组并求出词组类型特征
- 由静态特征和词组类型特征出发，计算句法功能特征，进一步计算语义关系特征和逻辑关系特征

汉语的自动生成过程相反：根据分析得到的句法功能、语义关系和逻辑关系特征，并根据汉语单词的静态特征进行词序调整及必要的词性变化，产生出合格的句子。

## Kaplan 的词汇功能语法

美国语言学家 R. M. Kaplan 和 J. Bresnan 于 1982 年在《词汇功能语法——一个语法表示的形式系统》一文中提出。不仅可以解释幼儿的语言习得的机制，而且还可以理解人类处理自然语言的行为。两个来源：

- Bresnan 感到转换生成语法把转换完全放在句法中不能对许多语言现象做出合适的解释，提出的将语法中的大部分放到词库内进行处理的模式
- Kaplan 认为人脑对于语言处理并不完全按照转换生成语法的模式进行，用计算机模拟人脑处理语言

> Chomsky 虽然认为语言知识存在于大脑和心理之中，但是认为语法规则并不直接体现在心理活动过程之中，语法的研究只能用数学、逻辑的方法模拟心理过程，而不能采用一般心理学实验的方法。
>
> Bresnan 认为语法学应该是地道的心理学，每条语法规则都应该在心理活动中有所体现，都可以看作是行为的模型。
>
> 你怎么看呢？我自己好像更偏向于 Chomsky，借助《思考，快与慢》中的观点，大多数情况下，人都是偏好使用 “省事” 的方法，也就是说即便说话时我们的确可以 “思考” 一下语法规则，但大部分时候我们是 “脱口而出”。不过对他的后半段不是特别认同。

### 词汇功能语法的理论框架

![](http://qnimg.lovevivian.cn/book-2017-fengzhiwei-nlp-6.jpeg)

- 概念结构：概念之间在逻辑上的关系
- 题旨结构：由不同的题旨角色构成
  - 任何概念所要表达的情景都要由一个或多个角色充当论元，而每一个概念转换成语言表达方式时规定要出现的论元就叫做题旨角色
  - 题旨结构是语言经过筛选后保存下来的概念结构的骨架，是相对于抽象的句法结构时赋予每个论元不同语义角色的依据
- 词汇映射理论：用于解释**题旨结构与词汇项目的对应关系**。经过词汇映射理论得到完整的词汇之后，便进入了句法的范围。

词汇功能语法的一个基本思想：语法功能与表示语义的谓词论元结构一端的联系可以通过词汇规则改变，但是语法功能和表示句法结构一端的关系却不能通过任何规则加以改变。句法不存在任何的转换机制。这就是 “直接句法编码原则”：句法部分的句法功能不能被另一个语法功能所代替。因而词汇功能语法的成分结构是单一的。

- 词汇功能语法由：词库、句法、语义解释三部分组成。
  - 表示语义的谓词论元结构首先从词库里通过词汇编码分配到一个语法功能。词条取得正确的语法功能编码后就可以构成词汇输入进入到句法部分。
  - 句法部分有两个表达层次：成分结构和功能结构
    - 成分结构：表示句子成分先后次序，由一组短语结构规则映射而成的树形结构。代表句子的句法排列和语音表达。
    - 功能结构：语言的内部结构，表述各语言成分之间的关系，代表句子的语义。
  - 功能结构具有普遍性，成分结构具有差异性。成分结构描述语言的表层结构，其中的单词承载了大多数语法信息，功能等式规定了语法信息的组合方法，经过有限步骤运算后，便得到最终组合结果——功能结构。为了确保功能结构的正确性，还需对合格性进行判别。Kaplan 和 Bresnan 证明了，由成分结构到功能结构的运算在数学上是 “有定解的”，而且所有的运算都只需要 “合一” 这种简单的运算方式（信息冲突时运算失败，不冲突时成功）。

### 词汇功能语法的模式

![](http://qnimg.lovevivian.cn/book-2017-fengzhiwei-nlp-7.jpeg)

- **成分结构**是句法描写的一个平面，由上下文无关的短语结构语法表示，形式是一般意义上的短语结构树。树形图上的结点带有句子中的词或短语预示的功能信息，这些信息由语法规则右部符号**所带的** “功能等式” 表示
  - 规则采用向上单箭头（表示直接支配成分）和向下单箭头（表示被支配成分）表示支配关系
  - 带有功能等式 ↑=↓ 的结点称为 “功能中心语”，表示父结点和子结点共享了全部信息
  - （↑SUBJ）=↓ 和（↑OBJ）=↓ 功能等式表示相应结点所代表的功能信息在父结点中的具体功能
    - （↑OBJ）=↓ 表示该结点继承了父结点的宾语（OBJ）特征
    - （↑OBJ）表示该结点的全部功能信息就是支配它的结点的宾语功能信息
    - ↓ 表示该符号本身（即被直接支配的成分）
  - 双箭头 “⇑⇓” 表示成分结构中范畴之间非直接支配的依赖关系，特别是远距离的支配关系。必须成对使用：凡是有 “⇓” 关系的成分必须依附于有 “⇑” 关系的成分。
  - 限制性功能等式：规定属性必须带某个指定的值，如规定某个 NP 是单数还是复数，可以根据语言分析的实际情况制定
- **词汇**按词的不同意义立项，词汇项所含的信息有语法范畴和功能等式，功能等式形式与短语结构规则中的一致
  - 如：he: N，（↑PRED）= `'he'`，表示父结点具有功能 PRED（谓词），具体信息为 `he`
  - 注意动词的 PRED，采用 “谓词论元结构” 来表示谓词**所带论元**的多少及每个论元的逻辑语义，如：（↑PRED）=`'read(SUBJ)(OBJ)>'` 表示 read 的论元分别是父结点的主语和宾语。
  - 词汇中的信息以 “定义性功能等式” 和 “限制性功能等式”（带有符号 c）的形式来记录，详见 P.208 persuades 的例子
- **功能结构**是词汇功能语法句法描写的另一个平面，是一个属性值矩阵，第一列表示属性，第二列表示相应属性所取的值
  - 左列首纵行：语法功能或语法特殊标记，叫做 “限定成分”
  - 对应的是限定值，有三种形式：简单符号、语义形式和子功能结构（有自己的限定成分和限定值，具有递归性）
  - 详见 P.209 “he reads the book” 的例子
- 成分结构和功能结构之间存在对应关系，这是一个句子的成分结构能够转变为相应的功能结构的基本根据。将成分结构转为功能结构应该通过**功能描述**进行，三个步骤：
  - 将成分结构进行语法功能编码，并插入词项
  - 把功能变项(f1,...fn)分配给 S 结点及其他各个附有 ↓ 的结点
  - 用功能变项代替成分结构中的所有↑和↓，得到句子的功能描写
- 由功能描写转为功能结构主要由定位和合并两个算子完成：定位算子首先定出功能描写中功能等式两边的名称在功能结构中所处的位置，然后由合并算子按照功能结构的格式将功能描写等式两边的内容横向排列。详见 P.214 例子。功能结构不仅可以描述完整的句子，也可以描述不成句子的短语。
- **合格性条件**制约：
  - 功能唯一性：任何功能结构中，每一个属性最多只能有一个值
  - 功能完备性：
    - 任一功能结构为局部功能完备的，当且仅当该功能结构包含它的所有谓词所管辖的所有语法功能
    - 任一功能结构为功能完备的，当且仅当该功能结构内的所有功能结构都是局部功能完备的
    - 每个由谓词论元结构规定的语法功能都必须在功能结构中出现
  - 功能接应性：
    - 任一功能结构为局部功能接应的，当且仅当该功能结构所包含的可被管辖的语法功能都为一个局部谓词所管辖
    - 任一功能结构为功能接应的，当且仅当该功能结构内所有功能结构都是局部功能接应的
    - 每个出现的语法功能都是由谓词论元结构所管辖的

### 词汇映射理论

词汇映射理论（Lexical Mapping Theory，LMT）：题旨结构与词汇中的谓词-论元结构之间存在映射关系。两个特征给语法功能和题旨角色分类：

- +r（+restricted）表示语义是否受限，受限+不受限-
- +o（objective）表示语法表现是否具备宾语性，具备+不具备-

词汇映射理论还规定了题旨角色的层次：agent 施事者 > beneficiary 受惠者/ recipient 接受者 > experiencer 经验者 > instrument 工具 > patient 受事者 / theme 涉事者 > locative 方位。/ 表示二者择一，> 表示优先关系。

- 理论依据是动词谓语与角色在语义组合上存在一种先后次序，即层级序列中较低位置上的角色与谓语动词的组合先于层级序列中处于较高位置上的角色与谓语动词的组合，因此，处于较低位置上的角色容易被词汇化。
- 另一个依据来自谓语动词一致关系标记的语法化序列：处于语法化序列较前位置上的角色也就是处于层级序列较高位置上的角色。即角色层级越高，越有资格跟动词发生一致关系。因此，题旨角色层级结构中最高层级上的角色叫做 “逻辑主语”，经常由施事者充当。

根据词汇映射理论，只要知道了表达概念的题旨结构，就可以预测语法功能的表达方式和谓词论元结构，而知道了谓词论元结构就可以预测各种语言中可能出现的表层结构。

## Martin Kay 的功能合一语法

美国计算语言学家 Martin Key 1985 年在 ”功能合一语法“ 这一新的语法理论中，提出了 ”复杂特征集“ 的概念，用功能描述表示。功能描述由一组描述元组成，每个描述元是一个成分集、一个模式或一个带值的属性，最主要的是 ”属性/值“ 偶对。属性是一个符号，值是一个符号或者是另一个功能描述。

把功能描述看作非结构性的特征集，就可用集合论的标准处理，但功能描述需要考虑相容性：如果两个功能描述都包含一个共同的属性但值不同，则不相容。

功能合一语法采用 ”合一“ 的运算方式对复杂特征集进行运算。寻找某种项对变量的置换，从而使表达式一致的过程叫做合一。功能合一语法使用合一运算合并**相容的功能描述**（合并原有特征，构造新的特征结构），不相容时合一失败（检查特征相容性和规则执行的前提条件），产生空集。

- 合一运算可以对信息相加
- 合一运算是幂等的
- 空白项是合一运算的幺元
- 特征值相容时相同的特征可以合一

功能合一语法最大的特点是在词条定义、句法规则、语义规则和句子的描述中，全面、系统地使用复杂特征集。

## Gazdar 的广义短语结构语法

改进的短语结构语法，初创于 20 世纪 70 年代，代表人物是英国语言学家 Gerald Gazdar，Ivan Sag，Ewan Klein 和 美国语言学家 Geoffrey Pullum。广义短语结构语法不仅主张句法结构只有一个平面，而且主张每一个句法结构都跟一个语义解释相对应。与传统短语结构语法的区别：

- 短语结构语法：表示句子结构的树形图直接通过规则重写形成并得到解释，重写规则可以直接推导出树形结构
- 广义短语结构语法：规则系统要经过一系列合格性条件检验才能跟句子表层结构联系起来，每条规则只产生一个候选的局部树形结构，通过检验则接受。还参照 Montague 语法，接受了其 ”规则对规则假说“，认为语法中每条局法规则都必须有一条语义规则与之联系，语义规则的作用在于解释由局法规则得出的树形结构。

广义短语结构语法在进行语义解释时，首先将树形结构中每一个父节点上的句法特征、句法范畴翻译成内涵逻辑表达式，再根据 Montague 语法对这些表达式进行模型论的解释。句法特征是进行特征制约的媒介，分为三类：

- 主特征：17 个，可以从上而下扩散
- 次特征：3 个，可以从下而上渗透
- 一般特征：10 个

广义短语结构采用复杂特征描述句法，所有句法特征都由 <特征，特征值> 构成。句法描写就是给树形图各结点标上特征值。特征可以通过两种途径进入树形图：

- 通过句法中的直接支配规则，叫做 ”继承性特征“
- 不通过句法规则直接进入，叫做 ”获取性特征“

广义短语结构语法通过短语结构规则描述句子的树形结构，同时又通过特征系统对树形结构进行制约，使其在整体上正确反映语言的现实。可以分为句法规则系统，特征制约系统和语义解释系统三部分。

### 句法规则系统

上下文无关的短语结构语法，三部分组成：编号、直接支配规则、语义解释。句法范畴主要以 ”X 阶标理论“ 为基础，词汇范畴（如 N, V, A, P）为 0 阶，短语范畴（如 NP, VP, AP, PP）为词汇范畴的 2 阶投射，中间层次为词汇范畴的 1 阶投射。

X 阶句法范畴分为两类：

- 主范畴：N, V, A, P 及它们的 1 阶 或 2 阶投射范畴组成
- 小范畴：主范畴外的其他范畴，包括 DET, COMP, CONJ 等，没有投射

根据是否有次范畴化特征（记为 SUBCAT，是该范畴在形成句子时所欠缺的所有范畴的集合）分为：

- 词汇范畴：所有小范畴词汇和阶数为 1 的主范畴词汇在词库中有次范畴化特征
- 非词汇范畴：所有其他投射阶数为 1 或 2 的主范畴没有次范畴化特征

如 N 的 0 阶，1 阶，2 阶投射分别为：N, N', NP。

短语是 ”内部中心语“ 的投射，最高为 2 阶，中心语为 0 阶。广义短语结构规则有两种：

- 直接支配规则 ID：表示直接支配关系，如 VP→V NP PP
  - 词汇直接支配规则：中心语有次范畴化特征
  - 非词汇直接支配规则：中心语不具备范畴化特征
- 线性前置规则 LP：表示前后位置关系，如 V < NP < PP

### 元规则

广义短语结构语法从规则生成规则的机制，主要用于描述某项父结点中子结点成分数量的增减或特征变化。由模式结构和目标结构两部分组成。如：

- 模式结构：P0→W，Pm，P0 为父结点，W 为范畴的任何变项，Pm（m=0或1）为由 P0 直接支配的结点

- 目标结构：a0→a1,...,ak，a0 和 P0 属于同一主范畴，最多只能有一个 ai 是 W 的变项，最多只能有一个 ai 与 Pm 相对应的。

以上形式为：如果 P0→W，Pm 是一条词汇直接支配规则，那么 a0→a1,...,ak 也是一条词汇直接支配规则。元规则的作用就是将所有符合模式结构的直接支配规则转变成由目标结构所表示的直接支配规则，扩大语法中直接支配规则的数量。

### 特征制约系统

规则和树形结构之间存在某种投射功能，决定哪些特征容许或不容许，保证了广义短语结构语法的正确性。有如下原则：

- 特征共现原则（FCR）：22 条特征共现限制
- 默认特征规定（FSD）
- 主特征规约（HFC）：在直接支配规则 C0→...,Cn 中，如果 Cn 是 C0 的中心语，那么结点 Cn 的获取性主特征应该与 C0 的主特征保持一致。保证主特征在树形图中自上而下传递。
- 次特征原则（FFP）：只适用于次特征，规定了次特征在树形图中自下而上传递的原则。
- 控制一致原则（CAP）
  - 目标成分 C 在同一个局部树形结构有控制成分 C'，C 的控制特征的值和 C' 范畴相同；如果 C 没有控制成分 C'，那么 C 的控制特征的值必须与 C 的父结点控制特征的值相同。
  - 检验主谓语之间的一致关系

- 线性前置陈述（LPS）：对经过直接支配规则（没有顺序）处理后的局部树形结构确定兄弟结点的顺序。

进行句子剖析时，首先根据元规则展开直接支配规则，满足 CAP，HFC 和 FFP 的条件下，做出部分的剖析树，然后使用 FCR 和 FSD 检查范畴特征，最后使用 LPS 检验表层线性顺序，完成句子自动剖析。

## Shieber 的 PATR

20 世纪 80 年代，斯坦福大学的 Stuart M. Shieber 研制了 PATR。一个 PATR 语法包括一套规则和一个词表；一个 PATR 的规则包括一个上下文无关的短语结构规则和一套特征约束，与短语结构规则的成分相联系的特征结构使用合一的方法进行运算。词表中的词项记录语言中的单词及其相关特征，用来替换短语结构规则中的终极符号。

- PATR 的基本数据结构是特征结构，用 “属性-值” 矩阵表示，属性值可以是简单值或复杂值，各组成部分可通过路径（特征结构中一个或多个属性名形成的序列）描述，不同路径可以共享相同的值。

  特征结构的基本运算是 “合一”，合一表达式（规则）由左部和右部组成。左部是一个特征路径，右部是一个简单的值或另一个路径。路径的第一个成分是短语结构规则中的某一个符号。PATR 的规则也可以使用变量 X 抽象表示。

- PATR 的词表也用复杂特征表示。

PATR 的优点：

- 简单：只使用合一运算
- 灵活：可以在 LFG，GPSG 中使用进行句法剖析
- 陈述：与顺序无关
- 模块：规则和词表模块化

## Pollard 的中心驱动的短语结构语法

1984 年，C. Pollard 和 I. A. Sag 提出了中心语驱动的短语结构语法（Head-Driven Phrase Structure Grammar, HPSG）。是在广义短语结构语法上提出的一种形式模型，强调中心语的作用，整个语法系统由中心语驱动，显示出强烈的词汇主义倾向。

- 中心语驱动的短语结构语法重视词汇（特别是中心语）的作用，根据中心语的次范畴化特征就可以方便地把中心语的语法信息与句子中其他成分的语法信息联系起来，使得整个句子中的信息以中心语为核心而串通起来。他们把 SUBCAT 做成一个成分表来取值。

- 中心语驱动的短语结构语法采用复杂特征结构描述词语或短语信息。
  - SYN 表示句法结构
  - ARG-ST 表示论元结构（也可以不用论元结构，使用指定语 SPR 和补足语 COMPS 来描述）
  - SEM 表示语义结构
    - MODE：五个备选属性，陈述、疑问、祈使、指称、none
    - INDEX：对应所描述的情景或事件
    - RESTR：事件成立必须满足的条件

- 中心语驱动的短语结构语法采用 ”类特征结构“，语言中的语音、单词、短语、句子都属于不同的类，分别要求不同的属性特征相对应。语言中客观存在一个词类体系结构。词汇类体系结构中存在上层类和下层类：适合于上层类的每一个特征也适合于下层类；与上层类相关的每一个约束都影响到下层类，这种 ”约束承袭“ 是单值的（不允许例外发生），这与实际不符，因此 HPSG 提出 ”约束缺省承袭“ 的概念，上层类缺省的约束规则可以被下层类特殊的、例外的约束规则**覆盖和否定**。词汇类体系结构简化了 HPSG 的词汇操作：
  - 一定的类对应一定的属性特征，不需要描述所有特征
  - 类及其属性特征是一个有规律的层级体系，只要知道了一个符号在整个层级体系中的位置，就可以自动获得它的大部分句法和语义特征，不需要逐一地去单独描述

- 一个完整的词位描述包括两部分：词位的基础信息；上层类承袭来的信息（单亲承袭体系，即只能存一个父结点获取信息；多亲承袭体系）。

- 中心语驱动的短语结构语法的词汇规则是一个产生式的装置，其形式为：X→Y，词汇规则有两种：

  - 形态规则：说明如何从一个词位产生具有屈折变化的词项
  - 派生规则：说明如何由一个词位产生另一个相关的词位

- 中心语驱动的短语结构语法的词汇体系运作：

  ![](http://qnimg.lovevivian.cn/book-2017-fengzhiwei-8.jpeg)


- 中心语驱动的短语结构语法中，所有语言单位通过特征结构来表示，特征结构要表示语音、句法和语义等信息；再把这些特征值结合起来，就可以确定语言单位的声音和意义之间在语法上的关系。语法也以特征结构的方式表示，这些结构也就是语言单位的合格性的限制条件。
- 中心语驱动的短语结构语法的早期模型中，一个句子的结构可以形式地用表示式来描述。最简单的表示式包括 `[PHON]` 和 `[SYSTEM]` 两大部分，分别表示语音和句法+语义部分（`(SYNtax), (SEMantics)`）。在句法语义部分：
  - LOC 表示实位成分，用于记录在句子中实际位置的信息
    - CAT：表示范畴，说明句子成分的形态和句法特征
    - CONTENT：表示含义，说明句子成分的语义特征
  - NON-LOC 表示空位成分，用于记录有远距离关系的空位信息
- 中心语驱动的短语结构语法词汇信息流通原则：
  - 中心语特征原则：在有中心语的短语中，父结点的 HEAD 的特征值同中心语子结点的 HEAD 的特征值在结构上共享。
  - 奉献原则：在有中心语的短语中，父结点的 CONTENT 的特征值与中心语子结点的 CONTENT 的特征值等同。意味着父结点的 CONTENT 来自子结点。
  - 饱和原则：在有中心语的短语中，父结点的 SUBCAT 之值等于其中心语子结点上的 SUBCAT 之值减去补足语子结点上的有关特征值。说明中心语子结点上的 SUBCAT 之值是饱和的。
  - 暂存量词继承原则：说明中心补足语的信息暂存于逻辑量词中，在分析时可渗透到树形图的顶端。
  - 修饰语原则：描述了非中心语子结点的修饰语的值与中心语子结点的语义特征关系。
  - 空位特征原则：说明远距离空位成分的特征值与其父结点特征值的传递关系。
- 1999 年，I. Sag 和 T. Wasow 在《句法理论的形式导论》中采用更直观和简洁的规则和原则：

  - 中心语—补足语原则：补足语是中心语在句法上要求的同现成分，用 COMPS 表示（一个属性特征列表），该原则要求所有的补足语实现为中心语的兄弟结点。
  - 中心语—指定语原则：指定语就是动词中心语的主语，名词中心语的限定成分用 SPR（的属性）表示。中心语总是先与补足语捆绑，再作为一个 phrase 与指定语捆绑。
  - 中心语—修饰语原则：修饰语是修饰中心语的成分，用 MOD（的属性）来表示。
  - 中心语特征原则（句法）：父结点和中心子结点的中心语特征值合一。
  - 值传递原则（句法）：除非特别说明，父结点的指定语 SPR 和补足语 COMPS 的特征值与中心子结点的特征值相同。
  - 语义承袭原则：父结点 MODE 和 INDEX 特征值与中心子结点相同。
  - 语义组合原则：父结点 RESTR 值等于所有子结点 RESTR 值之和。
  - 论元实现原则
  - 回指一致原则
  - 约束原则

- 中心语驱动的短语结构语法（HPSG）没有上下文无关短语结构语法（CFG）的 S 概念，初始符号是一个满足约束条件的 phrase，可参考 P270 图 4.77。HPSG 表示式包括 SYNSEM，DRTS 和 PHON 三个部分。本质上仍然是一种上下文无关的短语结构语法，但是包含了更加丰富的信息。
  - SYNSEM 描述短语或单词的句法语义的限制特征，大致相当于 CFG 左边部分信息，但包含的信息更多。
  - DRTS 构成短语各组成成分的特征，每一个组成成分又可以是一个完全的 HPSG 表示式，大致相当于 CFG 右边部分信息，但是没有包含关于这些成分的前后顺序信息。
  - PHON 描述 DRTS 中各组成成分的前后顺序及这些成分的发音，相当于 CFG 右边部分的前后顺序信息。

- 中心语驱动的短语结构语法自底向上分析算法大致过程：
  - 把输入句子中的单词的词汇表示式与词典中的词汇表示式合一；
  - 直到没有单词可以合一时，把已经合一的表示式同短语的子结点的表示式同该语法中短语的表示式合一，直到句子饱和；
  - 如果所有的表示式都合一结束，并且所有表示式中的 PHON 的值全部得到说明，则构造出句子 S 的整个结构；否则分析失败。

## Pereira 和 Warren 的定子句语法

1975 年 A. Colmerauer 证明了 CFG 可以翻译为 “定子句”，定子句是一阶谓词逻辑的一个受限子集。1980 年英国爱丁堡大学的 F.Pereira 和 D.Warren 正式提出定子句语法（DCG），并证明 DCG 是一种扩充的 CFG。但 CFG 只是一种语言的描述语法，DCG 则是一种语言的推理语法。另外，DCG 表达的语法规则经过简单转换可直接成为 Prolog 的可执行程序。定子句语法的基本思想是：语法的符号不仅仅是原子符号，而且可以使广义的逻辑项。

如 CFG 的规则：sentence → noun_phrase, verb_phrase 表示一个句子由名词短语和动词短语组成，在定子句语法中表示：如果存在一个名词短语和动词短语，那么存在一个句子的推理过程，用一阶谓词表示如下：

`(∀U)(∀V)(∀W)[NP(U)∧VP(V)∧concatenate(U,V,W)→S(W)]`

∀ 表示全称量词，∧ 表示逻辑合取，→ 表示蕴涵，具有三个变元的谓词 concatenate(U,V,W) 取真值当且仅当词串 W 是词串 U 和 V 经过毗连运算的结果。相当于：存在一个句法结构 S，使词串 W 成为满足语法规则集 P 的一个分析。

可以把定子句看成左部至多只含有一个谓词的规则，如上面的规则可以写为：

`sentence(s0, s): - noun_phrase(s0, s1), verb_phrase(s1, s)`

s s0 s1 为字符串的指针，解释为：如果 s0 到 s1 之间是一个名词短语，s1 到 s 是一个动词短语，那么 s0 到 s 就是一个句子。

Prolog 语言相关：

- 数据对象叫 “项”，可以是一个常量、变量或者复合项
  - 常量：包括整数和原子
  - 变量：首字母为英文大写字母的符号串
  - 复合项：具有一定结构的数据对象
    - 谓词：由一个谓词名和一个或多个变元组成，每个变元也可以是一个复合项
    - 表：用 `[]` 表示，表中元素之间用逗号分隔
- 子句：一个逻辑程序仅仅由一系列子句组成
  - Horn 子句：也就是定子句，由一个头和一个体组成
    - 头只能包含零个或一个谓词
    - 体可以包含零个或多个谓词
  - 三种形式：
    - 头和体非空：`P: - Q,R,S.`，如果 Q R S 均为真则 P 为真；“，” 表示合取，“—” 读作 “如果”。
    - 体为空：`P.`，表示 P 无条件成立，是一条事实
    - 头为空：`?: - P,Q.`，P 和 Q 是否为真？

定子句语法规则形式为：`<非终极符号> → <规则体>`

- 非终极符号是一个词或者短语标记，用 Prolog 的原子标记
- 规则体由一个或多个条目组成，用逗号隔开，每个条目或者是一个非终极符号，或者是一个终极符号的序列（用 Prolog 的表标记，其中每一个终极符号可以是任意 Prolog 的项）。

定子句语法对 CFG 做了如下改进：

- 在定子句语法的规则中，非终极符号可以是具有多个变元的复合项，可以携带有关上文、转换、结构等多方面信息，使得句法和语义信息像复杂特征一样可以作为变元在规则内部传递，从而实现了上下文相关的约束机制，增加了定子句语法描述自然语言复杂特征的能力。
- 定子句语法规则的右部可以引进不属于语法本身的测试条件和动作，进一步增加规则的约束能力。

## 小结

本章介绍了几种对短语结构语法进行改进的形式模型，主要是基于合一运算（寻找某种项对变量的置换，从而使表达式一致的过程叫做合一）的形式模型。

- 中文信息 MMT 模型：
  - 作者在 20 世纪 80 年代初期提出。
  - MMT 模型提出了树形图的多值标记函数概念，采用多个标记来描述树形图中结点特性。主要针对短语结构语法单标记分析能力太弱生成能力太强的弱点。
  - MMT 中采用若干特征和它们的值来描述汉语。由特征和它们的值构成的描述系统叫做 “特征/值” 系统。

- Kaplan 的词汇功能语法：
  - 美国语言学家 R. M. Kaplan 和 J. Bresnan 于 1982 年提出。不仅可以解释幼儿的语言习得的机制，而且还可以理解人类处理自然语言的行为。
  - 词汇功能语法的一个基本思想：语法功能与表示语义的谓词论元结构一端的联系可以通过词汇规则改变，但是语法功能和表示句法结构一端的关系却不能通过任何规则加以改变。句法不存在任何的转换机制。
  - 理论框架：
    - 概念结构
    - 题旨结构
    - 词汇映射理论：题旨结构与词汇中的谓词-论元结构之间存在映射关系
    - 词汇功能语法由：词库、句法、语义解释三部分组成
  - 模式
    - 成分结构是句法描写的一个平面，由上下文无关的短语结构语法表示，形式是一般意义上的短语结构树
    - 词汇按词的不同意义立项，词汇项所含的信息有语法范畴和功能等式，功能等式形式与短语结构规则中的一致
    - 功能结构是词汇功能语法句法描写的另一个平面，是一个属性值矩阵，第一列表示属性，第二列表示相应属性所取的值
    - 合格性条件制约包括功能唯一性、完备性和接应性

- Martin Kay 的功能合一语法
  - 美国计算语言学家 Martin Key 1985 年在 ”功能合一语法“ 这一新的语法理论中，提出了 ”复杂特征集“ 的概念，用功能描述表示。
  - 功能合一语法采用 ”合一“ 的运算方式对复杂特征集进行运算。
  - 功能合一语法最大的特点是在词条定义、句法规则、语义规则和句子的描述中，全面、系统地使用复杂特征集。
- Gazdar 的广义短语结构语法
  - 初创于 20 世纪 70 年代，代表人物是英国语言学家 Gerald Gazdar，Ivan Sag，Ewan Klein 和 美国语言学家 Geoffrey Pullum。
  - 改进的短语结构语法，不仅主张句法结构只有一个平面，而且主张每一个句法结构都跟一个语义解释相对应。在进行语义解释时，首先将树形结构中每一个父节点上的句法特征、句法范畴翻译成内涵逻辑表达式，再根据 Montague 语法对这些表达式进行模型论的解释。
  - 广义短语结构采用复杂特征描述句法，所有句法特征都由 <特征，特征值> 构成。
  - 广义短语结构语法通过短语结构规则描述句子的树形结构，同时又通过特征系统对树形结构进行制约，使其在整体上正确反映语言的现实。可以分为句法规则系统，特征制约系统和语义解释系统三部分。
    - 规则有两种：直接支配规则 ID 和线性前置规则 LP。
    - 制约系统是：规则和树形结构之间存在某种投射功能，决定哪些特征容许或不容许，保证了广义短语结构语法的正确性。
- Shieber 的 PATR
  - 20 世纪 80 年代，斯坦福大学的 Stuart M. Shieber 研制了 PATR。一个 PATR 语法包括一套规则和一个词表；
    - 一个 PATR 的规则包括一个上下文无关的短语结构规则和一套特征约束，与短语结构规则的成分相联系的特征结构使用合一的方法进行运算。
    - 词表中的词项记录语言中的单词及其相关特征，用来替换短语结构规则中的终极符号。
  - PATR 的基本数据结构是特征结构，用 “属性-值” 矩阵表示，特征结构的基本运算是 “合一”，PATR 的词表也用复杂特征表示。
- Pollard 的中心驱动的短语结构语法
  - 1984 年，C. Pollard 和 I. A. Sag 提出了中心语驱动的短语结构语法（Head-Driven Phrase Structure Grammar, HPSG）。是在广义短语结构语法上提出的一种形式模型，强调中心语的作用，整个语法系统由中心语驱动，显示出强烈的词汇主义倾向。
  - 采用复杂特征结构描述词语或短语信息。
    - SYN 表示句法结构
    - ARG-ST 表示论元结构
    - SEM 表示语义结构
  - 采用 ”类特征结构“，语言中的语音、单词、短语、句子都属于不同的类，分别要求不同的属性特征相对应。
  - 一个完整的词位描述包括两部分：词位的基础信息；上层类承袭来的信息。
  - 词汇规则是一个产生式的装置，其形式为：X→Y，词汇规则有两种：
    - 形态规则：说明如何从一个词位产生具有屈折变化的词项
    - 派生规则：说明如何由一个词位产生另一个相关的词位
  - 所有语言单位通过特征结构来表示，特征结构要表示语音、句法和语义等信息；再把这些特征值结合起来，就可以确定语言单位的声音和意义之间在语法上的关系。
  - 中心语驱动的短语结构语法（HPSG）没有上下文无关短语结构语法（CFG）的 S 概念，初始符号是一个满足约束条件的 phrase。
- Pereira 和 Warren 的定子句语法
  - 1975 年 A. Colmerauer 证明了 CFG 可以翻译为 “定子句”，定子句是一阶谓词逻辑的一个受限子集。1980 年英国爱丁堡大学的 F.Pereira 和 D.Warren 正式提出定子句语法（DCG），并证明 DCG 是一种扩充的 CFG。
  - DCG 是一种语言的推理语法。表达的语法规则经过简单转换可直接成为 Prolog 的可执行程序。
  - 定子句语法的基本思想是：语法的符号不仅仅是原子符号，而且可以使广义的逻辑项。
  - 定子句语法规则形式为：`<非终极符号> → <规则体>`
    - 非终极符号是一个词或者短语标记，用 Prolog 的原子标记
    - 规则体由一个或多个条目组成，用逗号隔开，每个条目或者是一个非终极符号，或者是一个终极符号的序列（用 Prolog 的表标记，其中每一个终极符号可以是任意 Prolog 的项）。



本章稍微有一点难，而且看起来特别复杂，尤其是词汇功能语法和中心驱动的短语结构语法，其中词汇功能语法有一小部分没有完全看懂。