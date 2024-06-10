---
title: 特征工程
date: 2020-09-21 23:00:00
categories: Coding
tags: [Machine Learning, Data Science, Feature Engineering, binning, LOF, Isolation Forest, IQR, RFE, Chi2, Z-Score]
mathjax: true
---

常听一句话说 “你还能玩儿出花来”，我觉得特征工程就是这么个把那些看上去普普通通的 “数据” 玩儿出花的过程。如果用 DIKW 模型（Data Information Knowledge Wisdom）来理解，Data 显然就是原始的一个个数据值，Information 就是对数据进行分析、处理后得到的具有一定意义的东西。

严格的定义如下：特征工程是对原始数据进行一系列工程处理，将其提炼为特征根，作为模型的输入。它旨在去除原数据中的杂质和冗余，使得模型与预测值之间能够以此建立联系。

<!--more-->

<div class="toc"><ul class="toc-item"><li><span><a href="#数据预处理" data-toc-modified-id="数据预处理-1">数据预处理</a></span></li><li><span><a href="#异常值处理" data-toc-modified-id="异常值处理-2">异常值处理</a></span></li><li><span><a href="#数据分箱" data-toc-modified-id="数据分箱-3">数据分箱</a></span></li><li><span><a href="#特征交互" data-toc-modified-id="特征交互-4">特征交互</a></span></li><li><span><a href="#特征归一化" data-toc-modified-id="特征归一化-5">特征归一化</a></span></li><li><span><a href="#特征选择" data-toc-modified-id="特征选择-6">特征选择</a></span></li><li><span><a href="#参考资料" data-toc-modified-id="参考资料-7">参考资料</a></span></li></ul></div>

在之前的 [EDA](https://yam.gift/2020/09/18/ML/2020-09-18-EDA/) 过程中，我们已经对数据有了非常全面的了解，也粗略提到了一些 Naive 的处理方法，本文就正式进行实施处理。

数据来自：[零基础入门金融风控-贷款违约预测-天池大赛-阿里云天池](https://tianchi.aliyun.com/competition/entrance/531830/introduction)

代码 Notebook 在这里：[FeatureEngineering](https://github.com/hscspring/AI-Methods/blob/master/ML-DeepUnderstand/FeatureEngineering.ipynb)，或用 [nbviewer](https://nbviewer.jupyter.org/github/hscspring/AI-Methods/blob/master/ML-DeepUnderstand/FeatureEngineering.ipynb) 查看。

## 数据预处理

首先就是删除掉唯一值的特征，该特征没有任何意义：

```python
uniq_value_feas = [col for col in data.columns if data[col].nunique() <= 1]
data = data.drop(columns=uniq_value_feas)
```

然后是缺失值处理，缺失值一般是不直接删除的，一个是因为真实场景中缺失值是正常现象，删数据很容易导致数据都被删完了；第一个是因为被删除的数据可能正好是非常有用的数据；再就是预测数据也可能有缺失值（这时候总不能删数据了吧），此时最好能够先把数据填充后再预测。所以一般采取填充处理，常见的填充方法主要有：

- 0 值填充：即缺失值都填充为 0，这显然过于 Naive，尤其是那些有意义的数值特征如金额、年纪等。
- 用缺失值上面或下面的值替换：这种填充的假设是相近的数据具有类似的特征。这个假设显然也是很 Naive 的。
- 统计值填充：包括众数、平均值、中位数、四分位、八分位等。这个方法对于某些特征比较有效，比如用均值填充年纪的缺失值相对而言比较合理。
- 插值拟合：这个前提是假设我们有一列完整数据的特征，且该特征与有缺失值特征之间有一定关系，此时可以通过回归拟合得到缺失值。

```python
# 0 填充
data.fillna(0)
# 上面的值填充
data.fillna(axis=0, method='ffill')
# 下面的值填充且设置最多只填充两个连续的缺失值
data.fillna(axis=0, method='bfill', limit=2)
# 统计值填充
data[feas] = data[feas].fillna(data[feas].mean())
```

不同的特征适用的方法有所不同，实际操作时应该根据该特征的特性选择对应的填充方法，而不是简单粗暴地对所有特征使用同一种方法。

接下来是时间特征处理，这个其实算是比较特殊的数据处理。我们要根据具体的特征确定时间处理的方式，有些可能需要年份（月份）或具体日，有些则可能需要换算成天数。

```python
data['issueDate'] = pd.to_datetime(data['issueDate'], format='%Y-%m-%d')
startdate = datetime.strptime('2007-06-01', '%Y-%m-%d')
data['issueDateDT'] = data['issueDate'].apply(lambda x: x-startdate).dt.days
```

最后是对类别型特征进行转换，使其变为数值特征。包括两种情况：一种是对非数值特征数值化；另一种是对数值（这里的数值其实并没有 “数” 所代表的意义，只是个代码，所以要重新编码）编码。

具体有以下几种方法：

- 序号编码：适用于类别间存在大小关系的特征。比如级别高中低，可以对应 321。
- OneHot 编码：适用于不具有大小关系的特征。比如地名。
- 二进制编码：先给每个类别赋予一个序号 ID，然后对 ID 进行二进制编码，最终得到和 OneHot 类似的 0-1 向量，但是维度更小。

对于只有两个类别的，一般使用 0-1 编码。

```python
grade_dct = dict(zip(['A', 'B', 'C', 'D', 'E', 'F', 'G'], range(10, 80, 10)))
data['grade'] = data['grade'].map(grade_dct)
```

对于多个（又不是特别多的）类别的，可以使用类别编码（OneHot、二进制等）。特别多的类别则考虑分桶。

这里可以根据实际情况进行判断，比如 “贷款目的” 这个特征，虽然一般都有十几个值，但这种特征适合进行 OneHot  编码（分桶不太合适），而邮政编码或地区编码这种就完全可以分桶，这很 make  sense，因为它们本身的意义就是可以聚类的。

```python
data = pd.get_dummies(
    data, 
    columns=one_hot_feas, 
    drop_first=True)
```

注意，这里的 `drop_first=True` 表示删掉 OneHot 后的第一个特征，因为这个特征其实就是其他 OneHot 都为 0 时的情况，这也可以减少特征数。

## 异常值处理

所谓异常值（离群点）就是指特征中有些观测值和其他值不属于同一个分布（看起来有很明显的偏离），由于异常值的高方差可能会导致模型拟合效果不好。异常值可能是原始数据有误，也可能是它本来的分布就是这样（比如检测混合在正常用户中的骗子）。如果异常值是非常重要的信息，比如前面提到的例子，则模型必须纳入这些异常值。这里明显需要一些领域相关的专业知识。

异常值产生的常见原因包括：

- 数据错误（人为错误）
- 测量误差（仪器误差）
- 实验误差（数据提取或执行错误）
- 有意的（虚假异常值用于检测模型）
- 数据处理错误（数据处理或数据集意外突变）
- 采样错误（从错误或多种来源提取或混合数据）
- 自然数据（不是错误，数据新颖）

在异常值检测时，需要牢记：**为什么需要检测异常值**？

常用的异常值检测方法包括：基于统计的方法、基于密度的方法、基于聚类的方法、孤立森林、有监督方法。

**统计学方法包括**：

- 均方差：在统计学中，假设数据（一维）服从正态分布，则大约 99.7% 的数据会在均值的三个标准差（3 sigma 准则）范围内。
- 箱型图：IQR = Q3-Q1（上下四分位之差），包含了一半观测值，基本思想是利用 IQR 估算数据的最小（Q1 - k × IQR）和最大值（Q3 + k × IQR），k 一般取 1.5。超出最小值最大值范围的即为异常值。
- 基于高斯分布的方法：假设数据服从高斯分布，可以通过定义覆盖正常数据的曲线（一维）或超球面（多维）来使用，超出该形状的即视为异常值。该技术对多维数据的实现称为最小协方差决定因子，简称 MCD。
- 最大标准残差检验法（Grubb 检验）：假设数据（一维）服从正态分布，计算 Z 分数，然后根据阈值（一般取 2.5，3，3.5）确定异常值。

```python
# 均方差
def find_outliers_by_3segama(data, fea):
    data_std = np.std(data[fea])
    data_mean = np.mean(data[fea])
    outliers_cut_off = data_std * 3
    lower_rule = data_mean - outliers_cut_off
    upper_rule = data_mean + outliers_cut_off
    data[fea+'_outliers'] = data[fea].apply(lambda x:str('异常值') if x > upper_rule or x < lower_rule else '正常值')
    return data
anomaly_feas = [fea for fea in data.columns 
                if data[fea].nunique() > 100 and fea not in numerical_discrate_feas]
for fea in anomaly_feas:
    data_train = find_outliers_by_3segama(data, fea)
    print(data[fea+'_outliers'].value_counts())
    print(data.groupby(fea+'_outliers')['label'].sum())
    print()

# 箱型图
rows = len(anomaly_feas)
fig, axes = plt.subplots(nrows=rows, ncols=1, figsize=(12, 4*rows))
for i, fea in enumerate(anomaly_feas):
    sns.boxplot(x="label", y=fea, data=data, ax=axes[i])

# 高斯分布
from sklearn.covariance import EllipticEnvelope
ee = EllipticEnvelope(contamination=0.01)
yhat = ee.fit_predict(X)
# 不等于 -1 的即为正常点
mask = yhat != -1
```

**基于聚类或密度的方法**：

- KNN，Average KNN
- 局部异常因子 LOF 算法。
    - 另一种对中高维数据集进行离群值检测的算法，它通过测量给定数据点相对于其相邻点的局部密度偏差反映异常程度。局部密度从 k 个最近邻获取，LOF 分数等于它 k 个最近邻的平均局部密度与自身局部密度之比。正常点期望局部密度类似其邻居的局部密度，异常值数据预期具有较小的局部密度。
    - LOF算法的优势在于，它考虑了数据集的局部和全局属性：即使在异常样本具有不同底层密度的数据集中，它也可以表现良好。问题不在于样本有多孤立，而是相对于周围邻域而言有多孤立。

```python
# LOF
from sklearn.neighbors import LocalOutlierFactor
clf = LocalOutlierFactor(n_neighbors=2)
clf.fit_predict(X)
```

**孤立森林 Isolation Forest 算法**

高维数据集的方法，基于随机森林。它基于对正常数据进行建模的方式，以隔离数量很少且特征空间不同的异常。具体而言，通过随机选择一个特征，然后在该特征的最小和最大值之间随机选择一个分割值来 “孤立” 观察结果。由于递归分割可以表示为一棵树，因此 “孤立” 一个样本所需的分割次数就等于从根节点到终止节点的路径长度。在这样的随机树的森林中，平均路径长度可以度量样本正常性和决策函数。随机分割产生的异常路径会明显较短，因此当随机树的森林为特定样本共同产生较短的路径长度时，它们很可能是异常的。

```python
from sklearn.ensemble import IsolationForest
clf = IsolationForest(random_state=0).fit(X)
clf.predict([[0.1], [0], [90]])
```

**有监督方法**

即根据 Label 建立有监督模型，利用模型判断异常值。

Sklearn 有几种不同算法的对比：[Comparing anomaly detection algorithms for outlier detection on toy datasets — scikit-learn 0.23.2 documentation](https://scikit-learn.org/stable/auto_examples/miscellaneous/plot_anomaly_comparison.html#sphx-glr-auto-examples-miscellaneous-plot-anomaly-comparison-py)。

异常值一般有下面几种处理方法：

- 直接删除
- 视为缺失值
- 平均值修正
- 不处理

```python
# 删除
data = data.drop(lof_drop_index)
for fea in anomaly_feas:
    data = data[data[fea+'_outliers']=='正常值']
data = data.reset_index(drop=True)
```

## 数据分箱

数据分箱是通过将数据放入按一定算法设计的 Bucket 中，进而将**连续特征值或多状态的离散特征值**离散化。数据分箱的主要目的是：降低变量复杂性，减少噪声对模型的影响，使模型更加稳定。

数据分箱的优点如下：

- 离散特征的增加和减少很容易，易于模型快速迭代
- 稀疏向量运算速度更快
- 对异常数据有更强的鲁棒性，比如年龄为 200 的异常值，可以分入 “>60” 这个 Bucket 进而排除影响
- 方便处理缺失值，即将缺失值作为单独的一个箱子
- 单个变量离散化后相当于引入了非线性
- 离散化后可以进行特征交叉
- 离散化后模型对轻微变化不敏感，更加稳定
- 离散化相当于进行了一定程度的泛化（局部平滑），降低了过拟合的风险
- 将所有变量变换到相似的尺度
- 数据的特征内的值跨度比较大时，在使用欧氏距离作为相似度函数时有大吃小的问题，分箱可以是其中的解决方法之一

数据分箱的方法如下：

- 无监督方法
    - 等距，即固定宽度分箱，比如 10 20 30 这样，如果横跨多个数量级，可以使用幂次。如 10 的 n 次方。
    - 等频，即根据分位数分箱，一般根据 0 25% 50%  75% 和 1 分位点划分，也可以根据十分位划分。
    - 聚类，即对数据进行聚类，同一类属于一箱。
- 有监督方法
    - 卡方：将属性值按照大小排序后，每个属性值作为一组，然后利用卡方检验，自底向上，将具有最小卡方值的相邻区间合并，直到满足停止条件（卡方值不低于事先设定的阈值，或分组数达到设置的最大分组数）。
    - Best-KS：这里的 KS 算的分箱区间内累计 bad rate 和累计 good rate 差的绝对值，最大值即为 KS。自顶向下，计算出 KS 最大的值作为划分点，将数据集一分为二，分别重复上一步，直到 KS 值变化低于阈值或分组数达到最大分组数为止。
    - 信用评分建模 IV 最大化：和 Best-KS 类似，将评价指标替换为 IV 值。
    - 单变量决策树算法：基于决策树，自顶向下，依次计算相邻元素的中位数作为候选切分点，选择切分后基尼值下降程度最大的点作为最优切分点，重复直到满足终止条件（如叶子结点样本量的比例低于 5%、分组数达到要求的最大分组数等）。

数据分箱的基本原则包括：

- 最小的分箱数据占比不低于 5%
- 箱内不能是同一种 Label 的数据
- 连续型变量和有序型变量在经过分箱后要保证 Bad Rate 的单调性

```python
# 等距
np.floor_divide(data[fea], 1000)
np.floor(np.log10(data[fea]))
# 等频（分成 10 箱）
pd.qcut(data[fea], 10, labels=False)
```

上面的等距分箱法是很简单自然的方法，拿第一个举例，本来是 1000 1200 1500 2000 的数值，运算之后自然就分成了两箱：`[1, 1, 1, 2]`。当然也可以用 `pd.qcut` 做等距分箱，效果类似。

其实分箱就是利用某些特征或算法，将该特征或算法认为是同一组的放在一个箱里。分完箱后，需要根据里面不同 Label 的情况进行 WOE 编码，使用编码后的值作为该箱的特征值，具体可参考 [Metrics | Yam](https://yam.gift/2020/09/15/ML/2020-09-15-Metrics/) 评分卡一节。WOE 全称 Weight of Evidence，其大小代表了负正样本的比例，因此比直接用箱子序号作为特征会更好。

关于有监督方法的实现网上特别多，大部分代码质量都一般般，不过发现一个[包](https://github.com/guillermo-navas-palencia/optbinning)可以使用。使用方法比较简单：

```python
from optbinning import OptimalBinning

optb = OptimalBinning(name=fea, dtype="numerical", solver="cp")
optb.fit(data.fea, data.label)
# 划分点
optb.splits
# 整体情况（见下图）
optb.binning_table.build()
# 转换
optb.transform(data.fea)
```

![](http://qnimg.lovevivian.cn/ml-featureegineering-1.jpeg)

此外，还支持类型变量的分箱，以及连续 Label、多标签等。详细可参考[文档](http://gnpalencia.org/optbinning/index.html)

## 特征交互

组合特征一般是把一阶离散特征两两组合，构成高阶组合特征。比如特征一是性别（男、女），特征二是婚姻状况（已婚、未婚），组合后就有四组特征：已婚男、已婚女、未婚男、未婚女。这在某些场景下会特别有用。如果特征数比较少（比如上面的），两两组合问题不大，但有时候特征数可能会非常庞大（比如用户 ID、商品 ID 可能会达到千万甚至亿级别），此时复杂度会变得非常高。在这种情况下，一般使用低维度的向量来表示（等价于使用矩阵分解对参数降维）。

```python
# 对 fea1 的各个值计算 label 的均值
temp_dict = data.groupby([fea1])['label'].agg(['mean']).reset_index().rename(
    columns={'mean': fea1 + '_target_mean'})
temp_dict.index = temp_dict[fea1].values
temp_dict = temp_dict[fea + '_target_mean'].to_dict()
data[col + '_target_mean'] = data[col].map(temp_dict)
# 将 fea2 与 fea1 组合
data['grade_to_mean_' + fea2] = data[fea1] / data.groupby([fea2])[fea1].transform('mean')
data['grade_to_std_' + fea2] = data[fea1] / data.groupby([fea2])[fea1].transform('std')
```

分母为 fea2（每个 unique value）下 fea1 的均值或标准差，其对应值等于 `np.mean(data[data.fea2==value][fea1])`，这里的 value 就是 data.fea2 对应的 unique value。

实际问题中，我们往往需要面对多种高维特征，而不是简单的两两组合，而且这种组合也容易存在参数过多、过拟合的问题。另外，也不是所有组合出来的特征都是有意义的。因此，需要一种有效的方法帮助我们找到哪些特征需要组合。其中，基于决策树的特征组合寻找方法中，每一条从根节点到叶节点的路径都可以看做一种特征组合方式。构造决策树时，可以采用梯度提升决策树（思想是每次都在之前构建的决策树的残差上构建下一棵决策树）。

## 特征归一化

归一化是为了消除特征之间的量纲影响，以便不同特征之间具有可比性。最常用的有两种方法：

- 线性函数归一化（Min-Max Scaling）：分子是特征值与最小值的差，分母是最大值与最小值的差，显然，每个特征值都会被缩放到 0-1 区间内。

- 零均值归一化（Z-Score Normalization）：将数据映射到均值为 0 标准差为 1 的分布上，具体而言，假设特征值的均值为 μ 标准差为 σ，归一化公式定义为：
    $$
    z = \frac{x - \mu}{\sigma}
    $$

在随机梯度下降求解优化问题中，归一化后更容易找到最优解。如下图所示：

![](http://qnimg.lovevivian.cn/ml-featureengineering-2.jpeg)

所以，线性回归、逻辑回归、SVM、神经网络等模型通常需要归一化，但决策树模型不需要，因为决策树分裂的主要依据是数据集关于特征 x 的信息增益比（信息增益的一种校正，防止选择取值较多的特征），这跟是否经过归一化无关。

特征 x 对训练数据集 D 的信息增益定义为 D 的经验熵与给定特征 x 下 D 的经验条件熵之差：
$$
g(D, x) = H(D) - H(D|x)
$$
H(D) 表示对数据集 D 进行分类的不确定性，H(D|x) 表示在特征 x 给定的条件下对数据集 D 进行分类的不确定性。它们的差（信息增益）就表示由于特征 x 而使得对数据集 D 的分类的不确定性减少的程度。因此，信息增益大的特征具有更强的分类能力。同时，也可以发现，这与是否归一化并无关系。

## 特征选择

特征选择的目的是精简掉无用的特征，以降低模型的复杂度，提高推理速度。特征选择方法主要包括：

- 基于特征间关系筛选

    - 方差选择法：先计算各个特征的方差，然后根据设定的阈值，选择方差大于阈值的特征。

    - 相关系数法：Pearson 相关系数是一种最简单的理解特征之间关系的方法，它衡量的是特征之间的线性相关性。

    - 卡方检验：检测自变量对因变量的相关性。假设自变量有 N 种取值，因变量有 M 种取值，考虑自变量 i 因变量 j 的样本频数的观察值与期望的差距。
        $$
        \chi_c^2 = \sum \frac{(O_i - E_i)^2}{E_i}
        $$
        具体可以看[这里](https://towardsdatascience.com/chi-square-test-for-feature-selection-in-machine-learning-206b1f0b8223)，解释的非常通俗易懂。

    - 互信息法：互信息也可以用来评价自变量和因变量的相关性（注意上面提到的信息增益，其实就是互信息。就是说，在决策树学习中的信息增益等价于数据集中类与特征的互信息。）

- Wrapper（RFE）

    - 递归特征消除法：使用一个基模型进行多轮训练，每轮训练后，消除若干权重系数的特征，再基于新的特征进行下一轮训练。

- Embedded

    - 基于惩罚项的特征选择法：使用带惩罚项的基模型，除了筛选出特征外，同时也进行降维。 
    - 基于树模型的特征选择法：GBDT 也可作为基模型进行特征选择。

```python
# 方差选择法
from sklearn.feature_selection import VarianceThreshold
X = VarianceThreshold(threshold=0.1).fit_transform(data, data["label"])

# 相关系数法
from sklearn.feature_selection import SelectKBest
from scipy.stats import pearsonr
sk = SelectKBest(k=5) # 选择 k 个最好的特征
X = sk.fit_transform(data, data["label"])

# 卡方（需要 X 为正，即半正定矩阵）
from sklearn.feature_selection import chi2
sk = SelectKBest(chi2, k=5)
X = sk.fit_transform(data, data["label"])

# 互信息
from minepy import MINE
def mic(x, y):
    m = MINE()
    m.compute_score(x, y)
    return (m.mic(), 0.5)
sk = SelectKBest(
    lambda X, Y: array(map(lambda x: mic(x, Y), X.T)).T, k=2)
X = sk.fit_transform(data, data["label"])

# RFE
from sklearn.feature_selection import RFE
from sklearn.linear_model import LogisticRegression
rfe = RFE(estimator=LogisticRegression(), 
          n_features_to_select=2)
X = sk.fit_transform(data, data["label"])

# 基于惩罚项
from sklearn.feature_selection import SelectFromModel
from sklearn.linear_model import LogisticRegression
sf = SelectFromModel(
    LogisticRegression(penalty="l1", C=0.1)
)
X = sf.fit_transform(data_train_filter, data_train.isDefault)

# 基于树模型
from sklearn.feature_selection import SelectFromModel
from sklearn.ensemble import GradientBoostingClassifier
sf = SelectFromModel(
    GradientBoostingClassifier())
X = sf.fit_transform(data_train_filter, data_train.isDefault)
```

## 参考资料

- [统计学习方法（第2版） (豆瓣)](https://book.douban.com/subject/33437381/)
- [百面机器学习 (豆瓣)](https://book.douban.com/subject/30285146/)
- [智能风控答疑文档 - 知乎](https://zhuanlan.zhihu.com/p/77095933)
- [team-learning-data-mining/Task3 特征工程.md at master · datawhalechina/team-learning-data-mining](https://github.com/datawhalechina/team-learning-data-mining/blob/master/FinancialRiskControl/Task3%20%E7%89%B9%E5%BE%81%E5%B7%A5%E7%A8%8B.md)
- [2.7. Novelty and Outlier Detection — scikit-learn 0.23.2 documentation](https://scikit-learn.org/stable/modules/outlier_detection.html#id1)
- [yzhao062/anomaly-detection-resources: Anomaly detection related books, papers, videos, and toolboxes](https://github.com/yzhao062/anomaly-detection-resources#12-tutorials)
- [A Brief Overview of Outlier Detection Techniques | by Sergio Santoyo | Towards Data Science](https://towardsdatascience.com/a-brief-overview-of-outlier-detection-techniques-1e0b2c19e561)
- [(24 封私信) 有哪些比较好的做异常值检测的方法？ - 知乎](https://www.zhihu.com/question/38066650)
- [Python数据分箱，计算woe，iv - 知乎](https://zhuanlan.zhihu.com/p/38440477)
- [特征离散化（一） 之 卡方分箱_SkullSky的博客-CSDN博客](https://blog.csdn.net/SkullSky/article/details/100672855)
- [特征离散化（四） 之 bestKS分箱_SkullSky的博客-CSDN博客](https://blog.csdn.net/SkullSky/article/details/105646062)
- [【有监督分箱】方法二： Best-KS分箱_hxcaifly的博客-CSDN博客](https://blog.csdn.net/hxcaifly/article/details/84593770?utm_medium=distribute.pc_relevant.none-task-blog-title-5&spm=1001.2101.3001.4242)
- [python实现连续变量最优分箱--CART算法_weixin_42097808的博客-CSDN博客](https://blog.csdn.net/weixin_42097808/article/details/80172824)
- [数据挖掘模型中的IV和WOE详解_一些杂七杂八的想法-CSDN博客](https://blog.csdn.net/kevin7658/article/details/50780391)

