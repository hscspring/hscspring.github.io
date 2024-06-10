---
title: 建模调参
date: 2020-09-24 23:00:00
categories: Coding
tags: [Data Science, Machine Learning, Tuning, Model Evaluation, Data Preprocess]
mathjax: true
---

通过前面的 [EDA](https://yam.gift/2020/09/18/ML/2020-09-18-EDA/) 和[特征工程](https://yam.gift/2020/09/21/ML/2020-09-21-FeatureEngineering/)探索，想必应该已经对数据有了比较深入的了解，那么接下来就是利用之前所学来建模看看实战效果了。因为之前是系统性学习，所以并不一定所有的技术都要用到，而且建模应该是个结合对数据已有了解的基础上进行重新思考的过程。

本文分为以下几个部分：

- 重新思考梳理 Pipeline 流程
- 建模
- 调参

<!--more-->

<div class="toc"><ul class="toc-item"><li><span><a href="#Pipeline" data-toc-modified-id="Pipeline-1">Pipeline</a></span></li><li><span><a href="#建模" data-toc-modified-id="建模-2">建模</a></span></li><li><span><a href="#调参" data-toc-modified-id="调参-3">调参</a></span></li><li><span><a href="#参考资料" data-toc-modified-id="参考资料-4">参考资料</a></span></li></ul></div>

数据来自：[零基础入门金融风控-贷款违约预测-天池大赛-阿里云天池](https://tianchi.aliyun.com/competition/entrance/531830/introduction)

代码 Notebook 在这里：[ModelParameters](https://github.com/hscspring/AI-Methods/blob/master/ML-DeepUnderstand/ModelParameters.ipynb)，或用 [nbviewer](https://nbviewer.jupyter.org/github/hscspring/AI-Methods/blob/master/ML-DeepUnderstand/ModelParameters.ipynb) 查看。

## Pipeline

这里的 Pipeline 主要是指数据预处理环节，并不包括建模和调参。也就是说，Pipeline 的输入是原始的数据，输出是最终的特征矩阵。以下只是个人观点，有不当之处还望指正。

- 依次分析特征，明确以下几个问题，并以此进行粗处理：
    - 哪些特征对问题无明显意义？
    - 哪些特征只有唯一一个值？
    - 哪些特征可以拆分成两个或多个表示？比如时间可以拆分成年月日。
    - 哪些特征可以组合？
- 对特征进行归类，分别处理为以下类别：
    - 0-1 特征：直接用原始值作为特征。
    - 数值特征、不需要分桶：直接用原始值作为特征。对需要 log 处理的 log 化。
    - 数值特征、需要分桶：分桶后用 WOE 作为特征。
    - 对象特征、不需要分桶：直接编码后作为特征。
    - 对象特征、需要分桶：先编码，分桶后用 WOE 作为特征。
- 转换：
    - 对象特征是否可转为数值。
    - 对象特征是否需要转为频率。
- 异常值处理：
    - 对不需要分桶且符合正态分布（或 log 后）的使用基于高斯分布的方法，或 3sigma。
    - 否则，可以尝试分桶。
- 缺失值处理：
    - 对于要分桶的，将其单独作为一桶。
    - 不分桶的，对象特征按照众数填充，数值特征按照均值填充。
- 分桶、编码获得最后特征：
    - 对需要分桶的特征进行分桶，可以采用等距（数值特征）、等频（类别特征）、卡方或基于决策树的算法等。
    - 对不需要分桶的对象特征 OneHot（或序号）编码。
- 转换数据类型：
    - 将 int 的数据都转为极值范围内的 int 编码（float 同理）以节约空间。

通过上面几步，我们就可以得到最初的特征矩阵，然后就可以初步建立模型了。至于特征交互和特征选择则需要视模型而定，比如深度学习模型就不太需要做交互。

上面 Pipeline 的过程中会用到一系列的工具，可以将这些工具预先实现好，便于调用。主要包括以下一些功能：

**整体信息**：

```python
# 查看缺失值特征
data.isna().sum()
```

**基本信息**：

```python
# 基本统计信息
data[fea].describe()
# Unique Value Number
data[fea].nunique()
# Unique Value
data[fea].unique()
# 不同 value 的频次，类似于 Counter
data[fea].value_counts(dropna=False).sort_index()
```

**单特征相关分布图**：

- 单特征（看情况是否 log）分布
- 单特征箱图、小提琴图
- 单特征不同 Label（或其他离散属性）分布

```python
def plot_feature_distribution(df: pd.DataFrame, feature: str, hue: Optional[str] = None):
    rows = 2
    if hue:
        hue = df[hue]
        
    fig, axs = plt.subplots(nrows=rows, ncols=2, figsize=(15, 4*rows))
    
    sns.histplot(x=df[feature], hue=hue, ax=axs[0, 0])
    sns.kdeplot(x=df[feature], hue=hue, ax=axs[0, 1])
    
    sns.boxplot(x=hue, y=df[feature], hue=hue, ax=axs[1, 0])
    sns.violinplot(x=hue, y=df[feature], hue=hue, ax=axs[1, 1])

plot_feature_distribution(data, fea, hue=label)
```

**两特征相关分布图**：

- 两变量散点图
- 两变量折线图

```python
def plot_feature_relations(df: pd.DataFrame, x: str, y: str, hue: str):
    if hue:
        hue = df[hue]
    fig, axs = plt.subplots(nrows=1, ncols=2, figsize=(15, 4))
    
    sns.scatterplot(x=df[x], y=df[y], hue=hue, ax=axs[0])
    sns.lineplot(x=df[x], y=df[y], hue=hue, ax=axs[1])

plot_feature_relations(data, fea1, fea2, hue=label)
```

数据处理：

```python
# 替换
data[fea].replace(to_replace=str1, value=str2, inplace=True)
# NA 值判断
pd.isna()
pd.notna()
# FillNA
data[feas] = data[feas].fillna(data[feas].mean())
# 低维类别特征 OneHot 编码
data = pd.get_dummies(data, columns=feas, drop_first=True)
# 高维类别特征 转换后编码或可直接作为特征
for fea in feas:
    data[fea+'_cnts'] = data.groupby([fea])['id'].transform('count')
    data[fea+'_rank'] = data.groupby([fea])['id'].rank(ascending=False).astype(int)
    del data[fea]
# 合并拆分
data = pd.concat([train, test], axis=0, ignore_index=True)
train = data[data[label].notnull()].reset_index(drop=True)
test = data[data[label].isnull()].reset_index(drop=True)
```

## 建模

机器学习的模型很多，但最经典的主要是以下几种：

- LR 逻辑回归
- SVM 支持向量机
- 决策树

**逻辑回归**

通俗来说，逻辑回归就是线性变换加一个非线性的类似 Sigmoid 的激活，关于激活函数可以看[这里](https://yam.gift/2020/07/05/AIBK/2020-07-05-Activation/)，具体而言就是每个特征一个系数，乘以每一项对应的数据后，所得的结果被归一化到 0-1 之间，一般以 0.5 做区分。

形式上，逻辑回归满足下面的概率分布：
$$
P(Y=1|x) = \frac{\exp(w \cdot x + b)}{1 + \exp(w \cdot x + b)} \\
P(Y=0|x) = \frac{1}{1 + \exp(w \cdot x + b)} 
$$
w 和 b 都是参数，w 被称为权值向量，b 被称为偏置。exp 的值越接近正无穷，概率值越接近 1，越接近负无穷，概率值越接近 0。逻辑回归使用极大似然法估计参数。

![](http://qnimg.lovevivian.cn/ml-modelparameters-1.jpeg)

逻辑回归的特点如下：

- 优点：
    - 计算简单，训练速度快
    - 可解释性好
    - 参数占用空间小，推理快
- 缺点：
    - 需要预先处理缺失值和异常值
    - 不能解决非线性问题
    - 准确率不高，很难拟合真实数据分布

**SVM 支持向量机**

在深度学习之前的时代，支持向量机是最强大的分类器，它形式优美严谨，而且可以通过核方法解决非线性问题，模型收敛速度也比较高效，是工业界的标配。SVM 通过最大化数据间隔来获得分割数据的超平面，通过应用拉格朗日对偶性将原始优化问题转为对偶问题进行优化求解（更容易求解，并很自然地引入核函数进而推广到非线性分类问题）。详细可以参照下面两篇文章：

- [Hard-SVM, Soft-SVM 和 KKT | Yam](https://yam.gift/2020/08/13/ML/2020-08-13-SVM-Hard-Soft-KKT/)
- [核方法 和 SMO | Yam](https://yam.gift/2020/09/09/ML/2020-09-09-Kernel-SMO/)

SVM 的特点如下：

- 优点：
    - 具有正则化参数可以避免过拟合
    - 使用核技巧解决非线性问题
    - 通过对偶问题转为凸优化问题，有较为高效的解决方法（如 SMO）
    - 近似于测试错误率的界限，有大量理论证实有效
- 缺点：
    - 如果特征数超过数据样本数时容易过拟合
    - 不适合大规模数据
    - 只有二分类

**决策树**

决策树是一种自上而下对样本数据进行树形分类的过程，内部节点表示特征，叶子节点表示类别，有向边为特征的不同拆分。一棵决策树的生成一般包括：

- 特征选择：即特征对数据集的分类能力，一般用信息增益或信息增益比衡量。
- 树的构造：主要包括 ID3（最大信息增益）、C4.5（最大信息增益比）和 CART 算法（最大基尼系数）。
- 树的剪枝：一般有两种方法：预剪枝（生成决策树过程中提前停止树的增长）和后剪枝（在已生成的过拟合决策树上进行剪枝）。

决策树的特点如下：

- 优点：
    - 简单直观，计算量仅与特征数相关
    - 数据不需要预处理、归一化，不需要处理缺失数据
    - 既可以处理离散值也可以处理连续值
- 缺点：
    - 容易过拟合
    - 由于采用贪心算法，容易得到局部最优解

**集成方法**

集成学习的思想是通过构建多个学习器来完成机器学习任务，一般可分为两种方式：一种是串行的，学习器之间有着强依赖关系；另一种是并行的，学习器之间相互独立。前者是 Boosting，代表算法是 AdaBoost 和 GBDT，后者是 Bagging，代表算法是随机森林。由于是组合了多个学习器，集成方法泛化能力一般比单一分类器好。

Boosting 和 Bagging 主要区别如下：

- 样本选择：Bagging 是从原始数据集中有放回选取，每轮训练集之间是独立的；Boosting 每一轮训练数据不变，只是每个样本的权重会发生变化，因此同样的数据在不同的分类器中起的作用是不同的。
- 样例权重：Bagging 是均匀取样，每个样本权重一样；Boosting 根据分类结果调整权重，分错的样本权重更大。
- 预测函数：Bagging 所有分类器权重相等；Boosting 每个分类器权重不同，分类误差小的权重大。
- 并行计算：Bagging 各个分类器可以并行生成，Boosting 只能按顺序。

**模型评估**

机器学习中一般把数据集划分为训练集和测试集，前者用于训练模型，后者用于测试模型。通常都会假设测试集和训练集都是来自同一样本（独立同分布采样），但测试集应尽量与训练集互斥，即测试集样本尽量不在训练集中出现，这样才能真正检验模型是否 ”学习“ 到特征。

对数据集的而划分一般有三种方法：

- 留出法：将数据集划分为两个互斥的集合，分别作为训练集和测试集。划分时尽量保持数据分布的一致性。实际使用时，一般要采用若干次随机划分、重复进行试验评估后取平均值作为评估结果。划分比例一般选择大约 2/3~4/5 的样本用于训练。

- 交叉验证法：将数据集划分为 k 个大小相似的互斥子集，每个子集尽可能保持数据分布的一致性（通过分层采样）。每次用 k-1 个子集的并集训练，剩下那个测试，共 k 次训练；又由于划分子集有多种方式，通常会使用不同的划分重复 p 次，最终结果就是 p 次 k 个训练结果的均值。如常见的 ”10 次 10 折交叉验证“。k=样本数时，得到交叉验证法的一个特例——留一法：m 个样本被划分为 m 个子集，训练集比初始数据集只少了一个样本。

- 自助法：有放回地从原始数据集中采样 m 次得到包含 m 个样本的数据集作为训练集，没出现在训练集中的样本作为测试集。样本在 m 次采样中始终没有被采到的概率是：
    $$
    (1-\frac{1}{m})^m \\
    \lim_{m \rightarrow \infty} (1-\frac{1}{m})^m \rightarrow \frac{1}{e} \approx 0.368
    $$
    该方法在数据集小、难以有效划分训练/测试集时很有用，而且因为能从初始数据集中产生多个不同的训练集，对集成学习方法有很大好处。但这种方法产生的数据集改变了初始数据集的分布，这会引入估计偏差。

小结如下：

- 数据量充足时，采用留出法或 k 折交叉验证法
- 数据量小且难以有效划分时采用自助法
- 数据量小且可以有效划分时采用留一法

**模型评价**

一般使用 AUC 或 F1-Score 作为评价指标，具体可参考：[Metrics | Yam](https://yam.gift/2020/09/15/ML/2020-09-15-Metrics/)。

## 调参

常见的有三种方法：

- 贪心调参：按照对模型影响大小依次调优直到所有参数调整完毕。优点是操作简单，缺点是可能陷入局部最优。关于树模型各个参数的影响程度如下：
    - 1 max_depth, num_leaves
    - 2 min_data_in_leaf, min_child_weight
    - 3 bagging_fraction, feature_fraction, bagging_freq
    - 4 reg_lambda, reg_alpha
    - 5 min_split_gain
- 网格搜索：使用从参数网格中指定的值进行调整。适合于小数据集。
- 贝叶斯调参：给定优化目标，不断添加样本点更新目标函数的后验分布，直到基本贴合真实分布。也就是每次调参考虑了上一次参数的信息。基本步骤如下：
    - 定义优化函数
    - 建立模型
    - 定义待优化的参数
    - 得到优化结果并返回要优化的分数指标

```python
# 贝叶斯
def rf_cv_lgb(
    num_leaves, 
    max_depth, 
    bagging_fraction, 
    feature_fraction, 
    bagging_freq, 
    min_data_in_leaf, 
    min_child_weight, 
    min_split_gain, 
    reg_lambda, 
    reg_alpha):
    model_lgb = lgb.LGBMClassifier(
        boosting_type='gbdt', 
        objective='binary', 
        metric='auc',
        learning_rate=0.1, 
        n_estimators=5000,
        num_leaves=int(num_leaves), 
        max_depth=int(max_depth), 
        bagging_fraction=round(bagging_fraction, 2),
        feature_fraction=round(feature_fraction, 2),
        bagging_freq=int(bagging_freq), 
        min_data_in_leaf=int(min_data_in_leaf),
        min_child_weight=min_child_weight, 
        min_split_gain=min_split_gain,
        reg_lambda=reg_lambda, 
        reg_alpha=reg_alpha,
        n_jobs=-1)
    val = cross_val_score(
        model_lgb, X_train, y_train, cv=5, scoring='roc_auc'
    ).mean()
    
    return val

from bayes_opt import BayesianOptimization
bayes_lgb = BayesianOptimization(
    rf_cv_lgb, 
    {
        'num_leaves':(10, 200),
        'max_depth':(3, 20),
        'bagging_fraction':(0.5, 1.0),
        'feature_fraction':(0.5, 1.0),
        'bagging_freq':(0, 100),
        'min_data_in_leaf':(10,100),
        'min_child_weight':(0, 10),
        'min_split_gain':(0.0, 1.0),
        'reg_alpha':(0.0, 10),
        'reg_lambda':(0.0, 10),
    }
)
bayes_lgb.maximize(n_iter=10)
```

## 参考资料

- [统计学习方法（第2版） (豆瓣)](https://book.douban.com/subject/33437381/)
- [百面机器学习 (豆瓣)](https://book.douban.com/subject/30285146/)
- [机器学习 (豆瓣)](https://book.douban.com/subject/26708119/)
- [team-learning-data-mining/Task4 建模调参.md at master · datawhalechina/team-learning-data-mining](https://github.com/datawhalechina/team-learning-data-mining/blob/master/FinancialRiskControl/Task4%20%E5%BB%BA%E6%A8%A1%E8%B0%83%E5%8F%82.md)
- [Overview of seaborn plotting functions — seaborn 0.11.0 documentation](https://seaborn.pydata.org/tutorial/function_overview.html)
- [machine learning - Advantages and disadvantages of SVM - Cross Validated](https://stats.stackexchange.com/questions/24437/advantages-and-disadvantages-of-svm)

