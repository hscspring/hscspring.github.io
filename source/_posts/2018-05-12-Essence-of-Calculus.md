---
title: 微积分的本质笔记
date: 2018-05-12 12:23:27
categories: Feeling
tags: [Calculus, Math]
---

>说明：来自：[3Blue1Brown](https://space.bilibili.com/88461692/#/channel/detail?cid=13407)，关键点的记录，用来当笔记随时查阅的。多图（69张）。 
感谢作者的付出，真心很赞。

# 目录

 <p><div class="lev1 toc-item"><a href="#导论" data-toc-modified-id="导论-1"><span class="toc-item-num">1&nbsp;&nbsp;</span>导论 </a></div><div class="lev1 toc-item"><a href="#导数的悖论" data-toc-modified-id="导数的悖论-2"><span class="toc-item-num">2&nbsp;&nbsp;</span>导数的悖论 </a></div><div class="lev1 toc-item"><a href="#用几何来求导" data-toc-modified-id="用几何来求导-3"><span class="toc-item-num">3&nbsp;&nbsp;</span>用几何来求导 </a></div><div class="lev1 toc-item"><a href="#链式法则和乘积法则" data-toc-modified-id="链式法则和乘积法则-4"><span class="toc-item-num">4&nbsp;&nbsp;</span>链式法则和乘积法则 </a></div><div class="lev1 toc-item"><a href="#指数函数求导" data-toc-modified-id="指数函数求导-5"><span class="toc-item-num">5&nbsp;&nbsp;</span>指数函数求导 </a></div><div class="lev1 toc-item"><a href="#隐函数求导" data-toc-modified-id="隐函数求导-6"><span class="toc-item-num">6&nbsp;&nbsp;</span>隐函数求导 </a></div><div class="lev1 toc-item"><a href="#极限" data-toc-modified-id="极限-7"><span class="toc-item-num">7&nbsp;&nbsp;</span>极限 </a></div><div class="lev1 toc-item"><a href="#积分与微积分基本定理" data-toc-modified-id="积分与微积分基本定理-8"><span class="toc-item-num">8&nbsp;&nbsp;</span>积分与微积分基本定理 </a></div><div class="lev1 toc-item"><a href="#面积和斜率有什么联系？" data-toc-modified-id="面积和斜率有什么联系？-9"><span class="toc-item-num">9&nbsp;&nbsp;</span>面积和斜率有什么联系？</a></div><div class="lev2 toc-item"><a href="#脚注：高阶导数" data-toc-modified-id="脚注：高阶导数-91"><span class="toc-item-num">9.1&nbsp;&nbsp;</span>脚注：高阶导数 </a></div><div class="lev1 toc-item"><a href="#泰勒级数" data-toc-modified-id="泰勒级数-10"><span class="toc-item-num">10&nbsp;&nbsp;</span>泰勒级数 </a></div>

# 导论

微积分的三个中心思想：积分、微分、两者互逆。  

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi1.jpeg)  

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi2.jpeg)  

（难怪正态分布这么多见……）  

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi3.jpeg)  

f(x) 可以是任意函数  

微积分基本定理：积分与导数之间的来回转化关系，也就是某个图像下方面积函数的导数能够还原出定义这个图像的函数。它将积分和导数两大概念联系起来。  

<!--more-->

# 导数的悖论

>数学法则只要与现实有关，都是不确定的；若是确定的，都与现实无关。——阿尔伯特·爱因斯坦

瞬时速度是很微小时间内距离的变化 (ds/dt)，真正的 “瞬时速度” 是不存在的。

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi4.jpeg)  

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi5.jpeg)  

dt 非常非常小，无限逼近0；两点连线的斜率→某一个点的斜率。  

左上角长方形里的内容才是导数的完全体。  

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi6.jpeg)  

dt 逼近0时，后面两项就能完全忽略了。  

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi7.jpeg)  

更一般滴：ds/dt (t) = 3(t)^2  

t 逼近0，一切变得简单。  

导数不是用来测量 “瞬时变化” 的，距离-时间函数的导数在 0 秒时等于 0 的真正含义是指**在第 0 秒 附近车速的最佳近似 是匀速 0 米每秒**。  

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi8.jpeg)  

但这不表示此时的车就是静止的，只说它此时的运动速度近似于匀速的 0，只是近似。  

瞬时变化率 实际上是 **变化率的最佳近似**。  

# 用几何来求导

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi9.jpeg)

so，df/dx = 2x

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi10.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi11.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi12.jpeg)

`1/x*dx = (x+dx)*-d(1/x) = -x*d(1/x) - dx*d(1/x) ≈ -x*d(1/x)`

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi13.jpeg)

`dx = 2*d√x*√x,  d√x/dx = 1/2√x`

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi14.jpeg)

`d(cos(θ))/d(θ) = d(sin(90-θ))/d(θ) = -cos(90-θ) = -sin(θ)`

# 链式法则和乘积法则

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi15.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi16.jpeg)

dx 是很小很小的数，为了直观画成比较宽的样子。

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi17.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi18.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi19.jpeg)

# 指数函数求导

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi20.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi21.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi22.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi23.jpeg)

接下来用链式法则，应用到所有指数函数求导：  

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi24.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi25.jpeg)

事实上，微积分中指数函数基本都是以 `e^{某常数*t}` 的形式出现的。

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi26.jpeg)

之所以以 e 为底数，指数上的那个常数就有了一目了然的定义。在许多自然现象里，变化率都和变化量成正比。那个常数就是变化率和数量的比例系数。  

比如投资收益：  

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi27.jpeg)  

和一杯热水在室内温度的变化：

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi28.jpeg)

# 隐函数求导

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi29.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi30.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi31.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi32.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi34.jpeg)

它实际是表示你从 (x,y) 点开始，走了 (dx,dy) 这一点小段距离后，x^2+y^2 的值相应变化了多少。 

当你把每一小步都落在这个圆上的时候，你等于就是需要 S 的值保持不变，dS=0。 

要保证每一步都踩在圆上，条件就是要让表达式 `2x*dx + 2y*dy` 一直等于 0。 

严格意义上讲，这个条件实际是**保证每一步都落在过圆的一条切线上**，而不是圆本身。但步子足够小的话，就没区别了。

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi35.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi36.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi37.jpeg)

# 极限

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi38.jpeg)

右边的式子就是导数的正式定义。h 和 dx 是一回事。  

dx 可以解读为一个具体的，有限小的变化量。随时考虑 dx 逼近于 0 时的情况。

我们讨论极限时，讨论的是**当变量逼近于 0 时的影响，而非无穷小的变化量的影响**。

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi39.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi43.jpeg)

导数可以帮助我们求极限。  

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi42.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi40.jpeg)

可导意味着在无限放大后可以被看作是直线。  

可以去 x 为离 a 十分相近的值，求 x 逼近于 a 时的极限值。

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi41.jpeg)

变化量 dx 取的越小，这个比值就越精确，所以这个比值就等于极限值的精确值。  

当求 0/0 类极限时，可以对分子分母求导，然后再把数代入。这就是罗必塔法则。  

导数的定义就是计算 0/0 型的极限。

# 积分与微积分基本定理

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi45.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi47.jpeg)

事实上，有无数个原函数（因为常数的导数为 0，所以可以给原函数增加一个常数项 C），但是积分的下限确定了 C 的值。

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi48.jpeg)

对任意函数求积分的时候，是在把 x 在一定范围内的所有 `f(x)*dx` 值加起来，然后求 dx 趋近于 0 时，加和趋近的值。  

求积分的第一步是找原函数，使其导数等于积分内的函数。

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi49.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi50.jpeg)

# 面积和斜率有什么联系？

求平均高度？

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi51.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi52.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi53.jpeg)

平均高度 = 面积/宽度

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi54.jpeg)

函数的平均值提供了另外一种角度去看待为何积分和求导是互逆的运算。

另一个角度：sin(x)（高度）的平均值就是原函数（cos(x)）从 x=0 到 x=pi 所有切线斜率的平均值。

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi55.jpeg)

从这个角度考虑，在某一区间上的所有切线的平均斜率就等于起点和终点连线的斜率。

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi58.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi56.jpeg)

当问题可以通过细分然后再相加的方式估算的话，可以用微积分解决（上一章）。

如果在有限个数量的情形，可以用相加的方法解决问题，那么推广到连续变量，也就是无限个数量中的话，可以用积分来描述（本章）。**这种直觉特别在概率中经常出现**。

## 脚注：高阶导数

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi59.jpeg)

# 泰勒级数

泰勒级数很大程度上就是为了在**某个点**附近用多项式函数去近似其他函数。其原因是多项式比别的函数友好。好计算，好求导，好积分。

用导数的方法去找近似：

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi60.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi61.jpeg)

几个要点： 

- 阶乘的形式是自然而然出现的。

- 往近似多项式中添加更高次项时，低阶的项并不会因此而改变。多项式任意 n 阶的导数在 x=0 时的值都由唯一的一个系数控制。


![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi62.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi63.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi64.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi65.jpeg)

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi67.jpeg)

累加有限多项的式子叫做 “泰勒多项式”，累加无限多项就是 “泰勒级数”。

收敛：一个级数加的越多，它的和越接近某个确定的数值，这个级数 “收敛” 到那个值。也可以说，累加无限多项的和，即这个级数就 “等于” 它收敛到的值。

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi69.jpeg)

发散：能让多项式和收敛的最大取值范围叫做这个泰勒级数的收敛半径。

![](http://ohjwan9tm.bkt.clouddn.com/video-weijifenbenzhi68.jpeg)