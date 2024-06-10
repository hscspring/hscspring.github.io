---
title: 线性代数的本质笔记
date: 2018-05-13 09:23:27
categories: Feeling
tags: [Linear Algebra, Math]
---

>说明：来自：[3Blue1Brown](https://space.bilibili.com/88461692/#/channel/detail?cid=9450)，关键点的记录，用来当笔记随时查阅和再学习的。多图。 
>感谢作者的付出，真心很赞。
>
>吐槽一下：B 站真的不是看学术视频的好地方，乱七八糟的弹幕每次要屏蔽，连续暂停会卡顿，快进快退会卡顿。
>
>后面六个视频要多看几遍。

# 目录

 <p><div class="lev1 toc-item"><a href="#序言" data-toc-modified-id="序言-1"><span class="toc-item-num">1&nbsp;&nbsp;</span>序言 </a></div><div class="lev1 toc-item"><a href="#向量究竟是什么？" data-toc-modified-id="向量究竟是什么？-2"><span class="toc-item-num">2&nbsp;&nbsp;</span>向量究竟是什么？</a></div><div class="lev1 toc-item"><a href="#线性组合、张成的空间与基" data-toc-modified-id="线性组合、张成的空间与基-3"><span class="toc-item-num">3&nbsp;&nbsp;</span>线性组合、张成的空间与基 </a></div><div class="lev1 toc-item"><a href="#矩阵与线性变换" data-toc-modified-id="矩阵与线性变换-4"><span class="toc-item-num">4&nbsp;&nbsp;</span>矩阵与线性变换 </a></div><div class="lev1 toc-item"><a href="#矩阵乘法与线性变换复合" data-toc-modified-id="矩阵乘法与线性变换复合-5"><span class="toc-item-num">5&nbsp;&nbsp;</span>矩阵乘法与线性变换复合 </a></div><div class="lev2 toc-item"><a href="#三维空间中的线性变换" data-toc-modified-id="三维空间中的线性变换-51"><span class="toc-item-num">5.1&nbsp;&nbsp;</span>三维空间中的线性变换 </a></div><div class="lev1 toc-item"><a href="#行列式" data-toc-modified-id="行列式-6"><span class="toc-item-num">6&nbsp;&nbsp;</span>行列式 </a></div><div class="lev1 toc-item"><a href="#逆矩阵、列空间与零空间" data-toc-modified-id="逆矩阵、列空间与零空间-7"><span class="toc-item-num">7&nbsp;&nbsp;</span>逆矩阵、列空间与零空间 </a></div><div class="lev2 toc-item"><a href="#非方阵" data-toc-modified-id="非方阵-71"><span class="toc-item-num">7.1&nbsp;&nbsp;</span>非方阵 </a></div><div class="lev1 toc-item"><a href="#点积与对偶性" data-toc-modified-id="点积与对偶性-8"><span class="toc-item-num">8&nbsp;&nbsp;</span>点积与对偶性 </a></div><div class="lev1 toc-item"><a href="#叉积的标准介绍" data-toc-modified-id="叉积的标准介绍-9"><span class="toc-item-num">9&nbsp;&nbsp;</span>叉积的标准介绍 </a></div><div class="lev1 toc-item"><a href="#以线性变换的思想看叉积" data-toc-modified-id="以线性变换的思想看叉积-10"><span class="toc-item-num">10&nbsp;&nbsp;</span>以线性变换的思想看叉积 </a></div><div class="lev1 toc-item"><a href="#基变换" data-toc-modified-id="基变换-11"><span class="toc-item-num">11&nbsp;&nbsp;</span>基变换 </a></div><div class="lev1 toc-item"><a href="#特征向量与特征值" data-toc-modified-id="特征向量与特征值-12"><span class="toc-item-num">12&nbsp;&nbsp;</span>特征向量与特征值 </a></div><div class="lev1 toc-item"><a href="#抽象向量空间" data-toc-modified-id="抽象向量空间-13"><span class="toc-item-num">13&nbsp;&nbsp;</span>抽象向量空间 </a></div>


# 序言

几何水平上的理解能让你判断出解决特定问题需要用什么样的工具，感受到他们为什么有用，以及如何解读最终结果。数值水平上的理解则能让你顺利应用这些工具。

# 向量究竟是什么？

将向量看作运动（就像在数轴上一样）。

看作空间中的箭头，看作数字列表。

# 线性组合、张成的空间与基

将向量看作单位向量的缩放（缩放向量并相加）：选择标量，对向量分别进行缩放，然后把结果相加。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi1.jpeg)

如果选择不同的基向量会怎样？

它同样允许我们在**一对数和二维向量之间自由转化**。但这种变换关系与之前用 i 帽和 j 帽的变换关系完全不同。

每当我们用数字描述向量时，它都依赖于我们正在使用的基。
![](http://qnimg.lovevivian.cn/video-xiandaibenzhi2.jpeg)

但当共线时，它们张成的空间就是终点落在一条直线上的向量的集合。

两个向量张成的空间实际上是问仅通过向量加法与向量数乘这两种基础运算，能获得的所有可能向量的集合是什么？

Trick：单个向量看作箭头；多个向量看作点（否则会太拥挤）。所以对大部分二维向量对来说，它们张成的空间是整个无限大的二维平面；但如果共线，它们张成的空间就是一条直线。

三维与二维类似：当你缩放第三个向量时，它将前两个向量张成的平面沿它的方向来回异动，从而扫过整个空间。另一种思考方式是：利用自由变化的三个标量，从而得到空间中所有的三维向量。

一组向量中如果有至少一个是多余的（没有对张成空间做出任何贡献，如二维的共线、三维的共面等），也就是移除那个向量而不减小张成的空间，此时它们是 “线性相关” 的。另一种表述是，其中一个向量可以表示为其他向量的线性组合，因为这个向量已经落在其他向量张成的空间之中。

另一方面，如果所有向量都给张成的空间增加了新的维度，它们就被称为 “线性无关” 的。

空间的一组基的严格定义：张成该空间的一个线性无关向量的集合。

<!--more-->

# 矩阵与线性变换

变换=函数，变换暗示要用 “运动” 思考。

线性代数的线性变换，两条性质：

- 直线在变换后仍然保持为直线
- 原点必须保持固定

应该把线性变换看作是 “保持网格线平行且等距分布” 的变换。

如何用数值描述线性变换（你给它一个向量的坐标，它能给你变换后向量的坐标）？

实际结果是：只需要记录两个基向量变换后的位置，其他向量会随之而动。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi4.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi5.jpeg)

一个二维线性变换仅由四个数字完全确定：变换后的基向量各自的坐标。通常将这些坐标放在一个格子中，称为矩阵。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi6.jpeg)

所以，矩阵就是变换后的基向量组合（张成的空间，列就是其中的一个基向量），矩阵乘以向量就是将向量变换（映射）到矩阵张成的空间中。

反过来，给定一个矩阵就代表一种对空间的特定变换。

如果两个向量列相关，那么这个变换将整个二维空间挤压到它们所在的一条直线上，也就是这两个线性相关向量所张成的一维空间。

总结：线性变换是操纵空间的一种手段，它保持网格线平行且等距分布，并且保持原点不动。可以用变换后基向量描述，以这些基向量坐标为列所构成的矩阵就是对线性变换的描述。矩阵向量乘法就是计算线性变换作用于给定向量的一种途径。

# 矩阵乘法与线性变换复合

复合变换（两种变换），实际根据跟踪基向量，可以看作一个变换。

如：对一个给定向量进行旋转然后剪切，结果应该与复合变换作用的结果完全相同。因为新矩阵应当捕捉到了旋转然后剪切的相同总体效应。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi7.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi8.jpeg)

所以每次将两个函数复合时，总是要从右向左读。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi9.jpeg)

## 三维空间中的线性变换

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi10.jpeg)

与二维完全类似。

# 行列式

线性变换改变面积的比例，被称为这个变换的行列式。

只需要检验一个矩阵的行列式是否为 0，就能了解这个矩阵所代表的变换是否将空间压缩到更小的维度。

行列式为负数表示空间翻转，但绝对值依然表示区域面积的缩放比例。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi11.jpeg)

三维的行列式是体积缩放的比例。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi12.jpeg)

如果 bc 均不为 0，那么 bc 项表示平行四边形在对角线方向上拉伸或压缩了多少。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi13.jpeg)

试用一句话解释：det(M1M2) = det(M1)det(M2)

# 逆矩阵、列空间与零空间

求解 Ax=v 意味着我们去寻找一个向量 x，使得它在变换后与 v 重合。

- 行列式不为零时，存在逆变换（A 的逆矩阵）

  ![](http://qnimg.lovevivian.cn/video-xiandaibenzhi14.jpeg)


- 行列式为零时，A 将空间压缩到更低的维度，此时没有逆变换（不能将一条线 “解压缩” 为一个平面）
  - 即使不存在逆变换，解依然可能存在。比如该变换将空间压缩为一条直线，向量 v 正好处于这条直线上。
  - 三维压缩为一条直线时，与平面相比，解存在的难度更高了，即使两种情况行列式都为零。

秩：代表变换后空间的维数。列空间的维数。

列空间：无论是直线、平面还是空间，所有可能的变换结果的集合被称为矩阵的 “列空间”。

矩阵的列告诉我们基向量变换后的位置，这些变换后的基向量张成的空间就是所有可能的变换结果。

零向量一定会被包含在列空间中，因为线性变换必须保持原点位置不变。

对于一个满秩变换来说，唯一能在变换后落在原点的就是零向量自身；但是对于一个非满秩的矩阵来说，它将空间压缩到一个更低的维度上，也就是说会有一系列列向量在变换后成为零向量。比如：一个三维线性变换将空间压缩到一条直线上，就有一整个平面上的向量在变换后落在原点。

零空间：变换后落在原点的向量的集合，被称为矩阵的 “零空间” 或 “核”。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi15.jpeg)

## 非方阵

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi16.jpeg)

该矩阵所张成的空间是三维空间中一个过原点的二维平面。但这个矩阵是满秩的，因为列空间的维数与输入空间的维数相等。

表示将二维空间映射到三维空间上。矩阵有两列表明输入空间有两个基向量，有三行表示每一个基向量在变换后都用三个独立的坐标来描述。

将该矩阵转置后类似，将三维空间映射到二维空间。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi17.jpeg)

接收二维向量，产生一个数：如果在一条直线上有一系列等距分布的点，在映射到数轴之后，它们将保持等距分布。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi18.jpeg)

# 点积与对偶性

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi19.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi20.jpeg)

- 两个向量指向大致相同时，点积为正
- 垂直时，一个向量在另一个向量的投影为零向量，点积为零
- 指向基本相反时，点积为负

点积计算与顺序无关。对称性：

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi22.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi21.jpeg)

但是被投影向量的长度变为原来的两倍。反过来也类似。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi23.jpeg)

但是被投影向量的长度保持不变。

所以，即便对称性被破坏，在这两种理解方式下，缩放向量对点积结果的影响是相同的。

为什么点积和投影有联系？对偶性。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi24.jpeg)

感觉就像 “点积”。将向量转化为数的线性变换和这个向量本身有着某种关系。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi25.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi26.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi27.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi28.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi29.jpeg)

即便数轴在二维空间，上述函数的输出结果还是数，而不是二维向量。应该把它看作一个接收两个坐标并输出一个坐标的函数。根据这个投影，定义一个从二维向量到数的线性变换，找到能够描述这个变换的 1×2 矩阵：

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi30.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi32.jpeg)

可以通过对称性进行推理：

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi33.jpeg)

所以说，如果要问 i 帽在投影之后落在哪个数上，答案就应该是 u 帽向 x 轴投影所得到的数。而 u 帽向 x 轴投影得到的数就是 u 帽的横坐标。因此根据对称性，i 帽向斜着的数轴上的投影所得到的数就是 u 帽的横坐标。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi34.jpeg)

所以，描述投影变换的 1×2 矩阵的两列，就分别是 u 帽的两个坐标。而空间中任意向量经过投影变换的结果，也就是投影矩阵与这个向量相乘，和这个向量与 u 帽的点积在计算上完全相同。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi37.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi35.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi36.jpeg)

这就是为什么与单位向量的点积可以解读为将向量投影到单位向量所在的直线上所得到的投影长度。

对于向量与给定非单位向量的点积可以解读为，首先朝给定向量上投影，然后将投影的值与给定向量长度相乘。

**总结一下过程：**

我们有一个从二维空间到数轴的线性变换，它并不是由向量数值或点积运算定义得到的，而只是通过将空间投影到给定数轴上来定义。但是因为这个变换是线性的，所以它必然是可以用某个 1×2 矩阵描述，又因为 1×2 矩阵与二维向量相乘的计算过程和转置矩阵并求点积的计算过程相同，所以这个投影变换必然会与某个二维向量相关。这里的启发是：任何时候看到一个线性变换，它的输出空间是一维数轴，无论它是如何定义的，空间中会存在唯一的向量 v 与之相关，应用变换与向量 v 做点积是一样的。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi38.jpeg)

对偶：

- 一个向量的对偶是由它定义的线性变换。
- 一个多维空间到一维空间的线性变换的对偶是多维空间中的某个特定向量。

再总结一下，表面上看，点积是理解投影的有利几何工具，并且方便检验两个向量的指向是否相同。不过更进一步，**两个向量点乘，就是将其中一个向量转化为线性变换。不把向量看作空间中的箭头，而把它看作线性变换的物质载体，会更容易理解向量。向量仿佛是一个特定变换的概念性记号，因为对我们来说，想象空间中的向量比想象整个空间移动到数轴上更加容易**。

# 叉积的标准介绍

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi39.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi40.jpeg)

当两个向量垂直时，和它们指向接近时相比，叉积更大。因为当两条边接近垂直时，平行四边形的面积会更大。

如果放大其中一个向量，叉积放大同样倍。

真正的叉积是通过两个三维向量生成的一个新的三维向量。叉积的结果是一个向量，不是一个数。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi41.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi42.jpeg)

# 以线性变换的思想看叉积

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi43.jpeg)

对偶：每当看到一个从空间到数轴的线性变换，你都能够找到一个向量，被称为这个变换的对偶向量，使得应用线性变换与对偶向量点乘等价。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi44.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi45.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi46.jpeg)

函数是线性的，因此可以用对偶性。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi47.jpeg)

对偶性的整体思路是：从多维空间到一维空间的变换的特别之处在于你可以将这个矩阵立起来，并且将整个变换看作与这个特定向量的点积。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi48.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi49.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi50.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi51.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi52.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi53.jpeg)

换句话说，我们找到的线性函数对于给定向量的作用，是将这个向量投影到垂直于 v 和 w 的直线上，然后将投影长度与 v 和 w 张成的平行四边形的面积相乘。

但是，这和垂直于 v 和 w 且长度为平行四边形面积的向量与 (x,y,z) 点乘是同一回事。更重要的是，如果你选择了合适的向量方向，点积为正的情况就会与 (x,y,z)、v 和 w 满足右手定则的情况相吻合。

这意味着我们找到了一个向量 p 使得 p 与和某个向量 (x,y,z) 点乘时，所得结果等于一个 3×3 矩阵的行列式，这个矩阵的三列分别为 (x,y,z)、v 的坐标和 w 的坐标。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi54.jpeg)

**总结：**

首先定义了一个三维空间到数轴的线性变换，并且它是根据向量 v 和 w 来定义的；然后通过两种不同的方式来考虑这个变换的对偶向量，即应用这个变换和与对偶向量点乘等价。一方面，计算方法引导你使用下面这种技巧：在矩阵第一列中插入 i 帽、j 帽和 k 帽，然后计算行列式；但从几何角度思考，可以推断出这个对偶向量必然与 v 和 w 垂直，并且其长度与这两个向量张成的平行四边形的面积相同。这两种方法给出了同一个变换的对偶向量，因此这两个向量必然相同。

# 基变换

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi55.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi56.jpeg)

把矩阵看作我们对詹妮弗的向量的误解，也就是在我们的坐标系中具有相同坐标的向量变换为她真正想表示的向量。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi58.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi59.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi57.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi60.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi61.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi62.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi63.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi64.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi65.jpeg)

首先，我们不用她的语言描述这一过程。而是用基变换矩阵转化为用我们的语言描述，这个矩阵的列代表的是用我们的语言描述的她的基向量。此时给出的是同样一个向量，不过是用我们的语言来描述的。

然后，将所得结果左乘线性变换（逆时针旋转90°）矩阵，此时给出的是变换后的向量，但仍然是用我们的语言来描述的。

最后，将所得结果左乘基变换矩阵的逆，从而得到变换后的向量，然而使用詹妮弗的语言来描述的。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi66.jpeg)

可以对任意矩阵 v 进行这样的变换：基变换、线性变换、基变换的逆，这三个矩阵的复合给出的就是用詹妮弗语言描述的线性变换矩阵。它接收詹妮弗语言描述的向量，并输出用詹妮弗语言描述的变换后的向量。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi67.jpeg)

**矩阵乘积仍然代表着同一个变换，只不过是从其他人的角度来看的**。

# 特征向量与特征值

特征值：衡量特征向量在变换中拉伸或压缩比例的因子。

特征向量：在变换中停留在它张成的空间里。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi68.jpeg)

但是有些向量留在它们张成的空间里：

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi69.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi70.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi71.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi72.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi73.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi74.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi75.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi76.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi77.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi78.jpeg)

二维线性变换可能不存在特征向量：

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi79.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi80.jpeg)

另一个有意思且值得思考的例子是剪切：

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi81.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi82.jpeg)

**属于单个特征值的特征向量不一定在一条直线上**，一个简单的例子是将所有向量变为两倍的矩阵：

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi83.jpeg)

**特征基**：

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi85.jpeg)

对角矩阵：

- 所有基向量都是特征向量。
- 矩阵的对角元是它们所属的特征值。
- 对角矩阵与自己多次相乘很容易计算。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi86.jpeg)

对于基向量同时也是特征向量的情况可能并不常见，但是**如果变换有许多特征向量，多到能选出一个张成全空间的集合，那么就能变换坐标系，使得这些特征向量就是基向量（用特征向量作为基）**。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi87.jpeg)

取出你想用作新基的向量的坐标，在这里指的是两个特征向量，然后将坐标作为一个矩阵的列，这个矩阵就是基变换矩阵。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi88.jpeg)

所得的矩阵是同一个变换，不过是从新基向量所构成的坐标系的角度来看的。用特征向量来完成这件事的意义在于，这个新矩阵必然是对角的，并且对角元为对应的特征值。这是因为，它所处的坐标系的基向量在变换中只进行了缩放。

如果计算矩阵的 100 次幂，一种更容易的做法是先变换到特征基，在那个坐标系中计算，然后转换回标准坐标系。并非所有矩阵都能对角化，比如剪切变换，它的特征向量不够多，并不能张成全空间。

# 抽象向量空间

坐标描述实际上依赖于你所选的基向量。

行列式和特征向量与所选坐标系无关。行列式是一个变换对面积的缩放比例，特征变换则是在变换中留在它所张成的空间中的向量。

函数是实际上是另一种向量。

抽象性带来的好处是能够得到一般性的结论：

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi89.jpeg)

这两条性质的一个重要推论是：

一个线性变换可以通过它对基向量的作用来完全描述，这使得矩阵向量乘法成为可能。

因为任一向量都能表达为基向量以某种方式进行线性组合，所以求一个向量变换后的结果，实际上就是求出变换后的基向量以相同方式进行线性组合的结果。这点对函数来说同样正确。

求导也是线性运算：

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi90.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi91.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi92.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi93.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi94.jpeg)

求导满足线性性质使这一过程成为可能。

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi95.jpeg)

什么是向量？

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi96.jpeg)

![](http://qnimg.lovevivian.cn/video-xiandaibenzhi98.jpeg)

公理是媒介，而不是自然法则。

把所有的结论抽象地表达出来，也就是说仅仅根据这些公理表达，而不是集中于某一种特定的向量上，像是空间中的箭头或者函数等。

这就是为什么每本教科书都会根据可加性和成比例来定义线性变换，而不是用网格线保持平行且等距分布来定义，即便后者更加直观。

在现代理论中，向量的形式并不重要，箭头、一组数、函数、π生物等等都无所谓，它可以是任何东西，只要向量相加和数乘的概念遵守上面的公理即可。就好像问 “3” 是什么一样，遇到具体情况时它代表三个东西的集合，但在数学里它被看作所有三个东西的集合的抽象概念，从而让你能用一个概念就能推出所有三个东西的集合。向量也是如此，它有多种体现，但是数学把它抽象成 “向量空间” 这样一个无形的概念。