---
title: 模型融合
date: 2020-09-26 23:00:00
categories: Coding
tags: [Data Science, Machine Learning, Voting, Stacking, Blending, StratifiedKFold]
mathjax: true
---

模型融合思想很简单，就是将多种不同类型的模型结合起来共同预测结果——”三个臭皮匠，顶个诸葛亮“。模型融合主要有以下方法：

- 平均：简单平均和加权平均
- 投票：简单投票和加权投票
- stacking：多层模型，利用预测结果再拟合预测
- blending：选取部分数据预测，得到的值作为新特征

<!--more-->

<div class="toc"><ul class="toc-item"><li><span><a href="#平均和投票" data-toc-modified-id="平均和投票-1">平均和投票</a></span></li><li><span><a href="#Stacking" data-toc-modified-id="Stacking-2">Stacking</a></span></li><li><span><a href="#Blending" data-toc-modified-id="Blending-3">Blending</a></span></li><li><span><a href="#参考资料" data-toc-modified-id="参考资料-4">参考资料</a></span></li></ul></div>

数据来自：[零基础入门金融风控-贷款违约预测-天池大赛-阿里云天池](https://tianchi.aliyun.com/competition/entrance/531830/introduction)

代码 Notebook 在这里：[ModelFusing](https://github.com/hscspring/AI-Methods/blob/master/ML-DeepUnderstand/ModelFusing.ipynb)，或用 [nbviewer](https://nbviewer.jupyter.org/github/hscspring/AI-Methods/blob/master/ML-DeepUnderstand/ModelFusing.ipynb) 查看。

## 平均和投票

这两个比较简单，平均就是多个模型的均值。投票可以用 sklearn 的 VotingClassifier：

```python
vclf = VotingClassifier(
    estimators=[('lr', clf1), ('rf', clf2), ('xgb', clf3)],
    voting='soft',
    weights=[2, 1, 1]
)
vclf = vclf.fit(x_train, y_train)
vclf.predict(x_test)
```

这里要注意下这个 voting 参数，可以选择 soft 或 hard，两者的区别在于：

- soft 是把模型预测出来的 probability 平均后取大的作为预测值
- hard 是把模型预测出来的 label 按出现次数多的作为预测值

举个例子：

```python
# 代码来自 sklearn 源码
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
clf1 = LogisticRegression(multi_class='multinomial', random_state=1)
clf2 = RandomForestClassifier(n_estimators=50, random_state=1)
clf3 = GaussianNB()
X = np.array([[-1, -1], [-2, -1], [-3, -2], [1, 1], [2, 1], [3, 2]])
y = np.array([0,0,0,1,1,1])
clf1.fit(X, y)
clf2.fit(X, y)
clf3.fit(X, y)

# soft
# (num_clfs, num_data, num_clss) => (3, 6, 2)
probas = np.asarray([clf.predict_proba(X) for clf in [clf1, clf2, clf3]])
# (num_data, num_clss) => (6, 2)
avg = np.average(probas, axis=0)
# (num_data, ) => (6,)
maj = np.argmax(avg, axis=1)

# hard
# (num_data, num_clfs) => (6, 3)
predictions = np.asarray([clf.predict(X) for clf in [clf1, clf2, clf3]]).T
# (num_data, ) => (6,)
maj = np.apply_along_axis(
    lambda x: np.argmax(np.bincount(x)), 
    axis=1, 
    arr=predictions
)
```

其中 `np.bincount` 是统计非负整数数组中每个值的出现次数：

```python
np.bincount([3]) # array([0, 0, 0, 1]) 0-3 的个数
np.bincount([1,5]) # array([0, 1, 0, 0, 0, 1]) 0-5 的个数
np.bincount([1,2,2,5]) # array([0, 1, 2, 0, 0, 1])
```

然后取出现次数最多的作为预测值。

## Stacking

Stacking 的思想是从一系列基模型中获得的预测结果作为特征来训练模型。训练基模型时，一般会使用 K 折交叉验证。Stacking 的基本步骤如下：

- 将训练数据划分成 k 个互斥子集
- 使用某个基模型在 k-1 个子集上训练，剩下 1 个子集上测试；重复 k 次后所有训练数据都有一个预测值，将该预测值作为一个新的特征
- 用模型训练所有的训练数据（不使用 K-fold），用来预测测试集，结果同样作为新特征
- 在所有的基模型上重复步骤 2-3，将会得到新的新特征（每个模型对应一个）
- 使用所有训练集对应的新特征训练 final 模型，然后在测试集上进行预测得到最终结果

`sklearn` 有这个功能，不过这个很简单，我们也可以自己实现一下：

```python
from dataclasses import dataclass
import numpy as np
from sklearn.model_selection import StratifiedKFold
from typing import List

@dataclass
class SkModel:
    
    model: type
    
    def fit(self, X: np.array, y: np.array):
        return self.model.fit(X, y)

    def predict(self, X: np.array, pred_type: str):
        if pred_type == "label":
            return self._predict(X)
        else:
            return self._predict_prob(X)
    
    def _predict(self, X: np.array):
        return self.model.predict(X)
    
    def _predict_prob(self, X: np.array):
        probs = self.model.predict_proba(X)
        return probs[:, 1]

@dataclass
class Stacking:
    
    estimators: List
    final_estimator: type
    n_folder: int = 5
    pred_type: str = "label"
    
    def __post_init__(self):
        self.X_train = np.array([])
        self.y_train = np.array([])
    
    def fit(self, X: np.array, y: np.array):
        self.X_train = X
        self.y_train = y
        pred_fea_list = []
        for model in self.estimators:
            pred_fea = self._stack(model, X, y)
            pred_fea_list.append(pred_fea)
        pred_feas = np.concatenate(pred_fea_list, axis=1)
        self.final_estimator.fit(pred_feas, y)
        return self
    
    def _stack(self, model: type, X: np.array, y: np.array):
        skf = StratifiedKFold(n_splits=self.n_folder)
        val_preds = np.empty((X.shape[0], 1))
        clf = SkModel(model)
        for i, (train_ids, val_ids) in enumerate(skf.split(X, y)):
            xtr, ytr = X[train_ids], y[train_ids]
            xval, _ = X[val_ids], y[val_ids]
            clf.fit(X=xtr, y=ytr)
            val_pred = clf.predict(xval, self.pred_type)
            val_preds[val_ids] = val_pred.reshape(-1, 1)
        return val_preds
    
    def predict(self, X: np.array):
        pred_fea_list = []
        for model in self.estimators:
            clf = SkModel(model)
            clf.fit(self.X_train, self.y_train)
            pred_fea = clf.predict(X, self.pred_type)
            pred_fea_list.append(pred_fea.reshape(-1, 1))
        pred_feas = np.concatenate(pred_fea_list, axis=1)
        return self.final_estimator.predict(pred_feas)
    
    def score(self, X: np.array, y: np.array):
        ypreds = self.predict(X)
        return sum(ypreds == y) / len(y)
```

和 `sklearn` 的 `StackingClassifier` 对比一下：

```python
from sklearn.datasets import load_iris
from sklearn.naive_bayes import GaussianNB
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
from sklearn.ensemble import StackingClassifier
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, stratify=y, random_state=42)

clf1 = RandomForestClassifier(n_estimators=10, random_state=42)
clf2 = GaussianNB()
clff = LogisticRegression()

# sklearn 
estimators = [
    ('rf', clf1),
    ('svr', make_pipeline(StandardScaler(), clf2))
]
clf = StackingClassifier(
    estimators=estimators, final_estimator=clff
)
clf.fit(X_train, y_train).score(X_test, y_test)
0.9210526315789473

# custom
sk = Stacking([clf1, clf2], clff)
sk.fit(X_train, y_train).score(X_test, y_test)
# 0.9210526315789473
```

补充说明一下 `StratifiedKFold`，它是 K-fold 的变种，folds 是通过保留每个类别样本的百分比来操作的。拿官方文档的例子来说明：

```python
from sklearn.model_selection import StratifiedKFold, KFold
import numpy as np
X, y = np.ones((51, 1)), np.hstack(([0] * 45, [1] * 6))
skf = StratifiedKFold(n_splits=5)
for train, test in skf.split(X, y):
    print('train -  {}   |   test -  {}'.format(
        np.bincount(y[train]), np.bincount(y[test])))
print("-"*50)
kf = KFold(n_splits=3)
for train, test in kf.split(X, y):
    print('train -  {}   |   test -  {}'.format(
        np.bincount(y[train]), np.bincount(y[test])))
    
"""
train -  [30  4]   |   test -  [15  2]
train -  [30  4]   |   test -  [15  2]
train -  [30  4]   |   test -  [15  2]
--------------------------------------------------
train -  [28  6]   |   test -  [17]
train -  [28  6]   |   test -  [17]
train -  [34]   |   test -  [11  6]
"""
```

上面方括号里的两个数字分别是 label（0 和 1）的数量，显然，`StratifiedKFold` 在训练和测试数据集中都保留了类别的比例，而 KFold 却没有。所以如果 Label 不均衡，最好不要使用 KFold。

## Blending

Blending 和 Stacking 非常相似，基本步骤如下：

- 训练集划分为 base 和 holdout 两部分
- 在 base 训练集上训练 base 模型，预测 heldout 和 测试集
- final 模型使用 heldout 的原始特征和预测结果作为特征训练
- final 模型使用测试集的原始特征和预测结果作为特征进行预测

相比 Stacking 的优势如下：

- 比 Stacking 简单
- 可以防止信息泄露（base 和 final 使用不同的数据）

不足如下：

- 使用的数据少了
- final 模型可能在 holdout 上过拟合
- CV（Cross-Validator）相比一个简单的 holdout 会更加稳固

还是直接上代码：

```python
@dataclass
class Blending:
    
    estimators: List
    final_estimator: type
    holdout_ratio: float = 0.2
    random_state: int = 42
    
    def __post_init__(self):
        self.X_train = np.array([])
        self.X_holdout = np.array([])
        self.y_train = np.array([])
        self.y_holdout = np.array([])
    
    def fit(self, X: np.array, y: np.array):
        (self.X_train, self.X_holdout, 
         self.y_train, self.y_holdout) = self.split_holdout(X, y)
        pred_fea_list = []
        for model in self.estimators:
            model.fit(X=self.X_train, y=self.y_train)
        holdout_final_feas = self.get_final_features(self.X_holdout)
        self.final_estimator.fit(X=holdout_final_feas, y=self.y_holdout)
        return self
    
    def get_final_features(self, X: np.array):
        pred_fea_list = []
        for model in self.estimators:
            pred = model.predict(X)
            pred_fea_list.append(pred.reshape(-1, 1))
        pred_feas = np.concatenate(pred_fea_list, axis=1)
        final_feas = np.concatenate((X, pred_feas), axis=1)
        return final_feas
    
    def split_holdout(self, X: np.array, y: np.array):
        X_train, X_holdout, y_train ,y_holdout = train_test_split(
            X, y, 
            test_size=self.holdout_ratio, 
            random_state=self.random_state)
        return X_train, X_holdout, y_train, y_holdout
    
    def predict(self, X: np.array):
        final_feas = self.get_final_features(X)
        return self.final_estimator.predict(final_feas)
    
    def score(self, X: np.array, y: np.array):
        ypreds = self.predict(X)
        return sum(ypreds == y) / len(y)
```

还是用上面的数据测试：

```python
bl = Blending([clf1, clf2], clff)
bl.fit(X_train, y_train).score(X_test, y_test)
# 0.9210526315789473
```

以上就是常用的模型融合方法，其实设计思路都挺浅显的，实际应用时，感觉最好选择算法模型不相同（互补）的分类器，比如可以选树模型 GBDT、SVM、随机森林、KNN 等。另外要注意的是，模型融合大多见于比赛，实际应用时不光要考虑性能，很多时候还要考虑解释性，一般不会这么做。

## 参考资料

- [Stacking and Blending — An Intuitive Explanation | by Steven Yu | Medium](https://medium.com/@stevenyu530_73989/stacking-and-blending-intuitive-explanation-of-advanced-ensemble-methods-46b295da413c)
- [Do you want to learn about stacking, blending and ensembling machine learning models?](https://www.linkedin.com/pulse/do-you-want-learn-stacking-blending-ensembling-machine-soledad-galli/)
- [sklearn.ensemble.StackingClassifier — scikit-learn 0.23.2 documentation](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.StackingClassifier.html#sklearn.ensemble.StackingClassifier)
- [3.1. Cross-validation: evaluating estimator performance — scikit-learn 0.23.2 documentation](https://scikit-learn.org/stable/modules/cross_validation.html#cross-validation)
- [Kaggle Ensembling Guide | MLWave](https://mlwave.com/kaggle-ensembling-guide/?lipi=urn%3Ali%3Apage%3Ad_flagship3_pulse_read%3BPZ4T3JLHTu%2BOWNI0d5kFbg%3D%3D)
- [team-learning-data-mining/Task5 模型融合.md at master · datawhalechina/team-learning-data-mining](https://github.com/datawhalechina/team-learning-data-mining/blob/master/FinancialRiskControl/Task5%20%E6%A8%A1%E5%9E%8B%E8%9E%8D%E5%90%88.md)

