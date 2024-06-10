---
title: Hard-SVM, Soft-SVM 和 KKT
date: 2020-08-13 12:00:00
categories: Feeling
tags: [SVM, Hard-SVM, Soft-SVM, KKT, Machine Learning, Hinge Loss]
mathjax: true
---

SVM 是机器学习在神经网络兴起前最经典、有效的算法。它的思想主要是用一个超平面对数据集进行划分，但是能够分开数据集的超平面一般都有无数个，支持向量机的做法是 “间隔最大化”，也就是选择 “支持向量” 到分割平面距离之和最大的，进而将问题转换为一个凸优化问题。

支持向量机根据数据集可分程度的不同分为：

- 线性可分支持向量机：数据线性可分，硬间隔支持向量机
- 线性（不可分）支持向量机：数据近似线性可分，软间隔支持向量机
- 非线性支持向量机：数据线性不可分，核技巧 + 软间隔最大化

SVM 是一套完整的数据处理算法，核方法的引入使得它具有了对非线性数据的处理能力。具体的方式是将低维数据映射到高维，这样原来不可分的数据自然就可分了。比如假设两类数据点完全是均匀随机分布的，此时如果在平面内无论使用直线还是曲线都无法将它们分开，但假设我们有能力让某一类数据点全部脱离二维进入三维（此处可以想象桌子上散乱着小米和钢珠，你猛地用双手拍桌子，小米会跳起来进入第三维），那它们之间任意的平面都可以轻易将它们隔开。事实上，神经网络使用了类似的方法，感知机的中间隐层做的也是类似的事情。

本部分只介绍线性可分支持向量机和线性支持向量机。

<!--more-->

<div class="toc"><ul class="toc-item"><li><span><a href="#硬间隔支持向量机" data-toc-modified-id="硬间隔支持向量机-1">硬间隔支持向量机</a></span><ul class="toc-item"><li><span><a href="#最大化间隔" data-toc-modified-id="最大化间隔-1.1">最大化间隔</a></span></li><li><span><a href="#对偶问题" data-toc-modified-id="对偶问题-1.2">对偶问题</a></span></li><li><span><a href="#KKT-条件" data-toc-modified-id="KKT-条件-1.3">KKT 条件</a></span></li><li><span><a href="#算法" data-toc-modified-id="算法-1.4">算法</a></span></li></ul></li><li><span><a href="#软间隔支持向量机" data-toc-modified-id="软间隔支持向量机-2">软间隔支持向量机</a></span><ul class="toc-item"><li><span><a href="#合页损失" data-toc-modified-id="合页损失-2.1">合页损失</a></span></li><li><span><a href="#对偶问题" data-toc-modified-id="对偶问题-2.2">对偶问题</a></span></li><li><span><a href="#KKT-条件" data-toc-modified-id="KKT-条件-2.3">KKT 条件</a></span></li><li><span><a href="#算法" data-toc-modified-id="算法-2.4">算法</a></span></li></ul></li><li><span><a href="#参考资料" data-toc-modified-id="参考资料-3">参考资料</a></span></li></ul></div>

## 硬间隔支持向量机

这种情况是最简单最基本的，即数据是线性可分的。

给定数据集：

$$
T = \{(x_i, y_i)\}_{i=1}^n,\qquad x_i \in R^p, y_i \in \{-1, 1\}
$$

可以找到一个分类超平面：$$w^* · x + b^* = 0$$ 和对应的决策函数：$$f(w) = sign (w^{*}x + b^*)$$

使得 y = 1 时，wx + b > 0，y = -1 时，wx + b < 0。

李航《统计学习方法》中有一个几何间隔的概念也比较重要，它主要解决当 w 和 b 等比例缩放时，超平面不变但函数间隔同比例变化的情况。具体做法是对函数间隔进行规范化约束，就变成了几何间隔。

> 一个点距离超平面的远近可以表示分类的确信程度，y 表示分类是否正确，所以 y(wx + b) 可以表示分类的**正确性和确信度**，这就是函数间隔的概念。——李航《统计学习方法》

### 最大化间隔

超平面关于样本点 (xi, yi) 的函数间隔定义如下：
$$
\hat{\gamma}_i = y_i(w·x_i + b)
$$

超平面关于样本的函数间隔就是所有样本点的最小值：

$$
\hat{\gamma} = \min \hat{\gamma}_i
$$

对应的几何间隔就是对函数间隔进行规范化（除以一个 L2 范数）：

$$
\gamma_i = y_i(\frac{w}{\left\|w\right\|}·x + \frac{b}{||w||}) \\
\gamma = \min \gamma_i
$$

然后就是重点的优化问题了，也就是让所有样本点间隔最小的最大，形式化为：
$$
\max_{w, b}\quad \gamma \\
s.t.\quad y_i(\frac{w}{\left\|w\right\|}·x + \frac{b}{||w||}) \ge \gamma, \quad i=1,2,...,N
$$
几何间隔替换为函数间隔（$$\gamma = \frac{\hat \gamma}{||w||}$$）：
$$
\max_{w, b}\quad \frac{\hat{\gamma}}{\left\|w\right\|} \\
s.t.\quad y_i(w·x + b) \ge \hat\gamma, \quad i=1,2,...,N
$$
可以等价地改写为：
$$
\min_{w,b} \frac{1}{2} \left\|w\right\|^2 \\
s.t.\quad y_i(w·x_i + b) - 1 \ge 0, \quad i=1,2,...,N, \quad(1)
$$
这是因为 γ 的取值并不影响目标函数的优化，所以可以令其等于 1。而此式子就是硬间隔（线性可分）支持向量机的学习算法。约束为 0 时对应的向量即为支持向量。

### 对偶问题

该问题的最优解可以用拉格朗日对偶性通过求解对偶问题得到，优点包括：

- 对偶问题更容易求解
- 自然引入核函数进而推广到非线性分类

构造拉格朗日函数：
$$
L(w, b, \alpha) = \frac{1}{2} \left\|w\right\|^2 + \sum_{i=1}^N\alpha_i(1-y_i(w · x_i + b)), \quad \alpha_i \ge 0, \quad (2)
$$
原始问题是极小极大问题：
$$
\min_{w,b} \max_{\alpha} L(w, b, \alpha), \quad \alpha_i \ge 0
$$
因为 α(1-yi(wxi+b)) ≤ 0，所以一定存在极大值，且极大值为 0，所以此式与原始问题（式 1）等价。

对偶问题为：
$$
\max_{\alpha} \min_{w,b}  L(w, b, \alpha), \quad \alpha_i \ge 0
$$
这样其实通过拉格朗日函数把带约束的优化问题转化成了无约束优化。

对 min 部分，可以通过对 L 求偏导并令其等于 0 求得：
$$
\frac {\partial L}{\partial b} = -\sum_{i=1}^N \alpha_iy_i = 0 \\
\frac {\partial L}{\partial w} = w - \sum_{i=1}^N \alpha_i y_i x_i = 0
$$
代入式（2）得：
$$
L(w,b,\alpha) = \frac{1}{2} \sum_{i=1}^N \sum_{j=1}^N \alpha_i\alpha_j y_iy_j (x_i · x_j) + \sum_{i=1}^N \alpha_i ( 1- y_i(\sum_{i=1}^N \alpha_iy_ix_i·x_i + b))  \\
= -\frac{1}{2} \sum_{i=1}^N \sum_{j=1}^N \alpha_i\alpha_j y_iy_j (x_i · x_j) + \sum_{i=1}^N\alpha_i
$$
然后是对 α 求极大值，可以等价地表示为：
$$
\max_\alpha \quad -\frac{1}{2} \sum_{i=1}^N \sum_{j=1}^N \alpha_i\alpha_j y_iy_j (x_i · x_j) + \sum_{i=1}^N\alpha_i \Leftrightarrow \\
\min_\alpha \quad \frac{1}{2} \sum_{i=1}^N \sum_{j=1}^N \alpha_i\alpha_j y_iy_j (x_i · x_j) - \sum_{i=1}^N\alpha_i \quad (3)\\
s.t.\quad \sum_{i=1}^N \alpha_iy_i = 0 ,\quad \alpha_i \ge 0, \quad i = 1, 2, ..., N
$$
该式即为对偶最优化问题的最终形式，与式（1）等价。

### KKT 条件

**原问题和对偶问题具有强对偶关系的充要条件是 KKT 条件**（李航《统计学习方法》附录 C 定理 C.3），可得：
$$
\frac{\partial L}{\partial w} = w - \sum_{i=1}^N \alpha_i y_i x_i = 0 \\
\frac{\partial L}{\partial b} = -\sum_{i=1}^N \alpha_iy_i = 0 \\
\alpha_i(1-y_i(w · x_i + b)) = 0 \\
1-y_i(w · x_i + b) \le 0 \\
\alpha_i \ge 0, \quad i=1,2,3,...,N
$$
其中最重要的是第三个式子，叫**对偶互补条件**。当数据不在支持向量上时，α 一定为 0，真正起作用的就是在支持向量上的点，即第四个条件等于 0。

根据 KKT 条件可得：
$$
w^* = \sum_{i=1}^N \alpha_i y_i x_i \\
1 - y_i(\sum_{i=1}^N \alpha_i y_i (x_i · x_j) + b) = 0 \\
b^* = y_j - \sum_{i=1}^N \alpha_i y_i (x_i · x_j) \quad (y_j^2 = 1)
$$
进而得到分离超平面和决策函数：
$$
\sum_{i=1}^N \alpha_i^* y_i (x_i · x) + b^* = 0  \\
f(x) = sign \left( \sum_{i=1}^N \alpha_i^* y_i (x_i · x) + b^* \right)
$$
`w*` 和 `b*` 只依赖于 αi 大于 0 的样本点 (xi, yi)，**这些样本点就是支持向量**，其他样本点则对结果无影响。

### 算法

- 输入：线性可分数据集 `T = {(x1,y1), (x2, y2), ..., (xn, yn} `，其中 `xi ∈ R^n, yi ∈ {+1, -1} , i=1,2,...,N`
- 输出：分离超平面和分类决策函数

最大间隔法根据式（1）直接求得 w 和 b 的最优解。

利用对偶问题求解算法如下：

- 构造并求解对偶问题（3），得到最优解 `α* = (α1*, α2*,  ..., αN*)^T`
- 根据 KKT 计算 `w*`，并选择 `α*` 的一个正分量计算 `b*`，二者都依赖 `αi* > 0` 的点（支持向量）
- 根据 `w*, b*` 求得分离超平面和决策函数

## 软间隔支持向量机

当数据集线性不可分（意味着某些样本点不满足函数间隔大于等于 1 的约束条件）时，上面的算法就不再适用了，于是就需要软（允许一点点错误）间隔最大化。于是可以将目标函数写作：
$$
\min_{w,b} \frac{1}{2} \left\|w\right\|^2 + loss
$$

我们令：

$$
Z_i = {y_{i}\left(w \cdot x_{i}+b\right)}
$$

### 合页损失

目标函数中的 loss 代表那一点点错误，可以有不同的定义方式：

- 0-1 损失：犯错误的点（不满足条件的点）的个数
    $$
    loss = \sum_{i = 1}^{N} \mathbb{I}\left\{Z_i<1\right\}
    $$
    0-1 损失的问题是不连续，不便于目标函数后续处理（如求导）。

- 距离损失：

    - 如果 Z ≥ 1，loss = 0，也就是硬间隔的约束化条件
    - 如果 Z < 1，loss = 1-Z，
    
    该损失也叫合页损失（Hinge Loss），形式为：
    $$
    loss = \max \{0, 1-Z_i\}
    $$
    即当 Z ≥ 1 时，为 0，Z < 1 时为一条直线，损失函数连续。图像为：
    
    ![](http://qnimg.lovevivian.cn/ml-svm-1.jpeg)

这样我们得到的软间隔的目标函数如下：
$$
\min_{w,b} \frac{1}{2} \left\|w\right\|^2 + C\sum_{i=1}^{N} \max \{0, 1-y_i(w \cdot x_i + b)\} \\
s.t.\quad y_i(w \cdot x_i + b) \ge 1, \quad i=1,2,...,N
$$
我们引入：
$$
\xi_i = 1 - y_i(w \cdot x_i + b), \quad \xi_i \ge 0
$$
目标函数可以写为：
$$
\min_{w,b} \frac{1}{2} \left\|w\right\|^2 + C\sum_{i=1}^{N}\xi_i \quad (4)  \\
s.t.\quad y_i(w \cdot x_i + b) \ge 1 - \xi_i,  \quad i=1,2,...,N \\
\xi_i \ge 0, \quad i=1,2,...,N
$$
这可以认为是对每个样本点引入一个大于等于 0 的松弛变量 xi，使得函数间隔加上 xi 后大于等于 1，即：
$$
y_i(w \cdot x_i + b) \ge 1 - \xi_i
$$
式（4）即为线性不可分支持向量机的学习问题（原始问题），这是一个凸二次规划问题。w 的解唯一，b 的解可能不唯一，而是存在一个区间。线性不可分支持向量机包含线性可分支持向量机，是更加一般的形式。

### 对偶问题

构造原始问题（4）的拉格朗日函数：
$$
L(w, b, \xi, \alpha, \mu) = \frac{1}{2} \left\|w\right\|^2 + C\sum_{i=1}^{N}\xi_i + \sum_{i=1}^N \alpha_i(1-\xi_i - y_i(w · x_i + b)) + \sum_{i=1}^N \mu_i (-\xi_i) \\
\alpha_i \ge 0, \mu_i \ge 0, \quad i=1,2,...,N
$$
原始问题是极小（关于 w,b,xi）极大（关于 α μ）问题，对偶问题是极大极小问题。首先求 L 对 w,b,xi 的极小：
$$
\nabla_w L = w - \sum_{i=1}^N \alpha_i y_i x_i = 0 \\
\nabla_b L = - \sum_{i=1}^N \alpha_i y_i = 0 \\
\nabla_\xi L = C - \alpha_i - \mu_i = 0
$$
代入 L 方程得：
$$
\min_{w,b,\xi} L(w, b, \xi, \alpha, \mu) = -\frac{1}{2} \sum_{i=1}^N \sum_{j=1}^N \alpha_i\alpha_j y_iy_j (x_i · x_j) + \sum_{i=1}^N\alpha_i
$$
再对上式求 α 的极大，就得到对偶问题：
$$
\max_\alpha \quad -\frac{1}{2} \sum_{i=1}^N \sum_{j=1}^N \alpha_i\alpha_j y_iy_j (x_i · x_j) + \sum_{i=1}^N\alpha_i \\
s.t. \quad \sum_{i=1}^N \alpha_i y_i = 0 \\
C - \alpha_i - \mu_i = 0 \\
\alpha_i \ge 0, \mu_i \ge 0, \quad i=1,2,...,N
$$
将约束条件消去 μ，即得到原始问题（4）最终的对偶问题：
$$
\min_\alpha \quad \frac{1}{2} \sum_{i=1}^N \sum_{j=1}^N \alpha_i\alpha_j y_iy_j (x_i · x_j) - \sum_{i=1}^N\alpha_i \quad (5)\\
s.t.\quad \sum_{i=1}^N \alpha_iy_i = 0 \\
\quad \quad \quad \quad 0 \le \alpha_i \le C \quad i = 1, 2, ..., N
$$
对比（3）可以发现两者的区别就是对 α 的上界约束。

### KKT 条件

根据 KKT 条件可得：
$$
\nabla_w L = w - \sum_{i=1}^N \alpha_i y_i x_i = 0 \\
\nabla_b L = - \sum_{i=1}^N \alpha_i y_i = 0 \\
\nabla_\xi L = C - \alpha_i - \mu_i = 0 \\
\alpha_i(1-\xi_i - y_i(w · x_i + b)) = 0 \\
\mu_i (-\xi_i) = 0 \\
y_i(w \cdot x_i + b) \ge 1 - \xi_i \\
\xi_i \ge 0 \\
\alpha_i \ge 0 \\
\mu_i \ge 0, \quad i=1,2,3,...,N
$$

由此可得 w 和 b 的解以及分离超平面和分类决策函数，其形式与硬间隔支持向量机一致。

同时，KKT 的**对偶互补条件**可整理为：
$$
\begin{aligned}
\alpha_{i}=0 & \Rightarrow y_{i}\left(w \cdot x_{i}+b\right) \geq 1 \\
\alpha_{i}=C & \Rightarrow y_{i}\left(w \cdot x_{i}+b\right) \leq 1 \\
0<\alpha_{i}<C & \Rightarrow y_{i}\left(w \cdot x_{i}+b\right)=1
\end{aligned}
$$

### 算法

- 输入：数据集 `T = {(x1,y1), (x2, y2), ..., (xn, yn} `，其中 `xi ∈ R^n, yi ∈ {+1, -1} , i=1,2,...,N`
- 输出：分离超平面和分类决策函数

利用对偶问题求解算法如下：

- 选择惩罚参数 C，构造并求解对偶问题（5），得到最优解 `α* = (α1*, α2*,  ..., αN*)^T`
- 根据 KKT 计算 `w*`，并选择 `α*` 的一个分量 `0 < αj* < C` 计算 `b*`
- 根据 `w*, b*` 求得分离超平面和决策函数


## 参考资料

- [统计学习方法（第2版） (豆瓣)](https://book.douban.com/subject/33437381/)
- [【机器学习】【白板推导系列】【合集 1～23】_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili](https://www.bilibili.com/video/BV1aE411o7qd?p=28)



