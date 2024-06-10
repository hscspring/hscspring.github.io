---
title: 协同过滤
date: 2020-10-22 23:00:00
categories: Coding
tags: [Recommendation, Collaborative Filtering, UserCF, ItemCF, Similarity, Jaccard, Cosine, Pearson, Minkowski]
mathjax: true
---

协同过滤是推荐领域的经典算法，它的思想非常朴素：和我们兴趣相似的人喜好也类似。所以，自然而然，只要找到和我们兴趣相似的人，将他们喜好的商品（又不在我们喜好商品的列表中）推送给我们就完成了推荐任务。本文主要介绍该算法

<!--more-->

<div class="toc"><ul class="toc-item"><li><span><a href="#相似度计算" data-toc-modified-id="相似度计算-1">相似度计算</a></span><ul class="toc-item"><li><span><a href="#明科夫斯基距离" data-toc-modified-id="明科夫斯基距离-1.1">明科夫斯基距离</a></span></li><li><span><a href="#余弦相似度" data-toc-modified-id="余弦相似度-1.2">余弦相似度</a></span></li><li><span><a href="#杰卡德相似度" data-toc-modified-id="杰卡德相似度-1.3">杰卡德相似度</a></span></li><li><span><a href="#皮尔逊相关系数" data-toc-modified-id="皮尔逊相关系数-1.4">皮尔逊相关系数</a></span></li></ul></li><li><span><a href="#基于用户的协同过滤" data-toc-modified-id="基于用户的协同过滤-2">基于用户的协同过滤</a></span></li><li><span><a href="#基于物品的协同过滤" data-toc-modified-id="基于物品的协同过滤-3">基于物品的协同过滤</a></span></li><li><span><a href="#算法评估" data-toc-modified-id="算法评估-4">算法评估</a></span></li><li><span><a href="#算法评价" data-toc-modified-id="算法评价-5">算法评价</a></span></li><li><span><a href="#参考资料" data-toc-modified-id="参考资料-6">参考资料</a></span></li></ul></div>

协同过滤是 David Goldberg 1992 年在施乐帕克研究中心的一篇题为《Using collaborative filtering to weave an information tapestry》的论文中首次使用。他设计了一个名叫 Tapestry 的系统，允许人们根据自己对文档的感兴趣程度添加标注，并利用这一信息为他人进行文档过滤。

协同过滤的基本描述如下：给定用户列表 User、商品列表 Item 和用户对商品的评级 R，Rui 表示用户 u 对商品 i 的评级。评级可以是离散的（如 “高、中、低”，“喜欢、中立、厌恶” 等）或数值的（如 12345，123）。因此 R 其实是一个 Len(Users) × Len(Item) 的矩阵，其中自然有很多空缺值，这些值就是算法需要去预测的值。

算法的基本步骤如下：

- 构造 User 对 Item 的评分数据
- 计算 User-User 或 Item-Item 相似度
- 根据给定用户 Ui 的前 n 个相似用户，或给定商品 Ii 的前 n 个商品计算并得到推荐结果

## 相似度计算

相似度有多种评价方式，这里简单介绍几种经典的相似度计算方法。需要说明的是，一般情况下，我们这里计算的是两个给定向量的相似度，向量的元素为商品的评级。比如对商品 1、2、3，用户 A 的评级为 [5,4,5]，用户 B 的评级为 [4,3,4]，对应两个向量的相似度可以衡量用户 A 和 B 的相似度；同样，对同一商品，不同用户的评级也可以用来表示该商品，进而计算两个商品的相似度。

### 明科夫斯基距离

计算相似度最简单的方法就是用两者的距离，在空间中两个向量距离越近，则越相似。给定向量 x 和 y 的 Minkowski 距离描述如下（其中 q>0）：
$$
d(x, y) = \left( \sum_{i=1}^p |x_i - y_i|^q \right)^{1/q}
$$
对于 q ≥ 1，有三种特殊形式：

- 当 q=1 时，称为绝对值（曼哈顿）距离，也被称为 “城市街区距离”：
    $$
    d(x, y) = \sum_{i=1}^p |x_i - y_i|
    $$

- 当 q=2 时，就是欧几里得（欧式）距离：
    $$
    d(x, y) = \left( \sum_{i=1}^p |x_i - y_i|^2 \right)^{1/2}
    $$

- 当 q=∞ 时，称为切比雪夫距离：
    $$
    d(x, y) = \max_{1 \le i \le p} \sum_{i=1}^p |x_i - y_i|
    $$

知道距离，只要取倒数，就可以表示相似度，即距离越小相似度越大。

### 余弦相似度

余弦相似度衡量的是两个向量的夹角，两向量夹角越小，相似度越高。
$$
\mathrm{similarity}(x,y) = \frac{x y^T}{||x||\ ||y||} \\
= \frac{\sum_{i=1}^{n} x_{i} y_{i}}{\sqrt{\sum_{i=1}^{n} x_{i}^{2}} \sqrt{\sum_{i=1}^{n} y_{i}^{2}}}
$$

### 杰卡德相似度

Jaccard 相似度适合衡量两个集合的相似度。
$$
J(x, y) = \frac{|x \cap y|}{|x \cup y|}
$$
Jaccard 相似度有个需要注意的点：当两个集合分布不均匀时，会受较大集合的影响。举个极端的例子，假设 x 元素数量很少且全部包含在 y 中，当 y 元素数量很多时，结果会非常小，这显然是有问题的。这种情况一般会将分母替换为元素数量较小的集合。
$$
\frac{|x \cap y|}{|x|}
$$
不过这样依然有问题，假设 y 是很热门的物品，则会导致几乎所有物品与 y 的相似度都很高，这显然不合理（因为其实并不是 y 和其他物品相似，只是 y 热门）。因此，需要对热门物品 y 进行惩罚。
$$
\frac{|x \cap y|}{\sqrt{|x|\   |y|}}
$$
即便如此，对于极度热门的物品，上面的惩罚依然不够。即著名 Harry Potter Problem：当某个商品非常热门时，基于物品的协同过滤算法（购买 X 的也购买了 Y）会将该商品推荐给所有人，仅仅因为大多数人买了它（和 X 根本没关系）。这个和 TF-IDF 算法神似——高频词不一定是关键词，有可能每个文档都出现了这些词，只有词频高且出现的文档数也少的词才有可能是关键词。因此要对 y 进一步惩罚：
$$
\frac{|x \cap y|}{|x|^{1-\alpha}\   |y|^{\alpha}}
$$
α 为调节参数，值越大惩罚力度越大。

另外，也需要对活跃用户（比如专门购买了很多物品刷单的）进行惩罚，活跃用户对物品相似度的贡献应该小于不活跃用户。
$$
\frac{\sum_{u \in x \cap y} \frac{1}{ \log(1+ |N(u)|)} }{|x|^{1-\alpha}\   |y|^{\alpha}}
$$
其中 N(u) 表示用户 u 购买的物品数量。

### 皮尔逊相关系数

Pearson correlation coefficient 衡量的是两个向量的线性相关性，当数据不规范（偏离均值过大）时，倾向于给出更好的结果。因为它在计算过程中使用了平均值，一定程度上减小了评分偏置的影响。在实际应用中，这其实有助于避免不同用户打分偏好不同带来的影响，比如有的用户喜欢打高分，有的喜欢打低分，有的乱打分。
$$
\rho_{X,Y} = \frac{ \mathrm{cov}(X,Y)}{\sigma_X \sigma_Y} \\
\frac{\mathbb{E}[X Y]-\mathbb{E}[X] \mathbb{E}[Y]}{\sqrt{\mathbb{E}\left[X^{2}\right]-(\mathbb{E}[X])^{2}} \sqrt{\mathbb{E}\left[Y^{2}\right]-(\mathbb{E}[Y])^{2}}}
$$
cov 是协方差，σ 是标准差。

当 X 和 Y 为样本观测值时，一般用 r 表示（sample correlation coefficient）：
$$
r_{x y}= \frac{\sum_{i=1}^{n}\left(x_{i}-\bar{x}\right)\left(y_{i}-\bar{y}\right)}{\sqrt{\sum_{i=1}^{n}\left(x_{i}-\bar{x}\right)^{2}} \sqrt{\sum_{i=1}^{n}\left(y_{i}-\bar{y}\right)^{2}}} \\
= \frac{n \sum x_{i} y_{i}-\sum x_{i} \sum y_{i}}{\sqrt{n \sum x_{i}^{2}-\left(\sum x_{i}\right)^{2}} \sqrt{n \sum y_{i}^{2}-\left(\sum y_{i}\right)^{2}}}
$$

代码实现起来都比较简单，就不再赘述。直接用现成的开源包：

```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics.pairwise import euclidean_distances

def calc_similarity(lst1: list, lst2: list, sim_type="pearson") -> float:
    if len(lst1) <= 1:
        return 0.0
    if sim_type == "pearson":
        sim = np.corrcoef((lst1, lst2))[0][1]
    elif sim_type == "cosine":
        sim = cosine_similarity((lst1, lst2))[0][1]
    else:
        sim = 1/(1 + euclidean_distances((lst1, lst2)))
    if np.isnan(sim):
        sim = 0.0
    return sim
```

值得注意的是，我们这里并没有 Jaccard 的实现，因为它计算的是集合相似度，和计算距离不太一样。但它的应用却非常广泛，因为很多时候我们并没有 “评分”，比如以购买商品为例，能得到的数据就是哪些用户购买或未购买商品，购买了商品 A 和 B 的用户就构成了两个集合。

## 基于用户的协同过滤

它的思想非常简单：当需要为用户 A 推荐商品时，可以先找到和他兴趣相似的其他用户，然后把那些用户喜欢但 A 没听过的商品推荐给 A。**这里面假定相似用户偏好也相似**。所以，第一步是要找到与给定用户兴趣相似的其他用户；然后将这些用户喜欢但目标用户没听说过的商品推荐给目标用户，进而完成推荐任务。

正式开始之前，我们首先弄清楚数据。一般情况下，我们可以拿到类似这样的数据（以电影数据集 [MovieLens | GroupLens](https://grouplens.org/datasets/movielens/) 为例），它的评分数据如下：

```python
userId,movieId,rating,timestamp
1,1,4.0,964982703
1,3,4.0,964981247
1,6,4.0,964982224
```

我们需要将这些数据转换为二维，用一个嵌套字典比较容易，结果类似这样：

```python
{
    '1': {
        '1': 4.0,
        '3': 2.5,
        '47': 5.0
    },
    '2': {
        '3': 5.0,
        '50': 3.0
    }
}
```

其中，外层的 key 是用户，内层的 key 是商品（这里是电影），value 是评分。代码如下：

```python
from typing import Dict, List, Tuple
from pathlib import Path
import pnlp

def load_and_build_data(file_path: Path) -> Tuple[Dict, Dict]:
    uir = pnlp.MagicDict()
    iur = pnlp.MagicDict()
    lines = pnlp.read_csv(file_path)
    for uid, iid, rating, _ in lines[1:]:
        rating = float(rating)
        uir[uid][iid] = rating
        iur[iid][uid] = rating
    return (uir, iur)
```

**寻找兴趣相似用户**

为了避免每次都要完整遍历一遍所有用户，可以先把相似矩阵求出来，以用户相似矩阵 M 为例，Mij 就表示用户 i 和用户 j 的相似度。这里要注意的是，我们计算两个用户相似度时，如果使用的相似度计算方法不是 Jaccard 时，应该用他们共同的评分商品来计算，也就是保证两个向量长度一致。

```python
def get_similarity_matrix(data: Dict[str or int, Dict]):
    similarity_matrix = np.zeros((len(data), len(data)))
    has_calced = set()
    for i, key in enumerate(data):
        for j, other_key in enumerate(data):
            if i == j:
                continue
            if (i, j) in has_calced:
                continue
            key_items = data[key]
            other_key_items = data[other_key]
            both_items = set(key_items) & set(other_key_items)
            key_item_ratings = [key_items[i] for i in both_items]
            other_key_item_ratings = [other_key_items[i] for i in both_items]
            key_other_similarity = calc_similarity(key_item_ratings, other_key_item_ratings)
            similarity_matrix[i][j] = key_other_similarity
            similarity_matrix[j][i] = key_other_similarity
            has_calced.add((j, i))
    return similarity_matrix
```

该函数既可以用来计算用户相似度矩阵，也可以用来计算商品相似度矩阵。需要说明的是，我们只需计算一个三角矩阵即可，另一半可以跳过提高速度。代码非常简单，不再赘述。

**利用相似用户进行推荐**

根据上一步我们很容易就得到给定用户对其他用户的相似度向量，排序后去前面若干（假设为 n）个作为推荐源。这 n 个用户评过级的商品肯定是不一致的，假设我们从其中某个用户那里获得一个商品，该商品目标用户不知道，那接下来自然而然是要给出目标用户对该商品可能的评分。这样我们就能获得一个列表，该列表中的商品均是用户不知道的，并且有对应的评分。然后我们把评分高的推送给目标用户就完成了推荐任务。

要计算目标用户对其不知道商品可能的评分，很容易就想到用选中的其他相似用户对商品的评分，然后根据用户相似度进行加权平均。
$$
R_{u,p} = \frac{\sum_{s \in S} (\mathrm{sim}_{u, s} \cdot R_{s,p})}{\sum_{s \in S} \mathrm{sim}_{u,s} }
$$
s 就是和给定用户 u 相似的用户，S 自然就是 s 的集合，Rsp 就是用户 s 对商品 p 的评分。需要说明的是，如果用户 s 对某个 p 没有评级，那此时 Rsp=0，分母也不需要加该用户 s 和 u 的相似度。

上面这种评分方式有个问题：有些用户倾向于打高分，而有些用户倾向于打低分，假设他们相似度接近时，倾向于打高分的用户对最后的结果影响较大；同时，目标用户也可能有这种倾向，这会导致最终的结果可能不够准确。因此一般更推荐下面这种评分方式。
$$
R_{u,p} = \bar{R_u} + \frac{\sum_{s \in S} \left( \mathrm{sim}_{u,s} \cdot (R_{s,p} - \bar{R_s}) \right)}{\sum_{s \in S} \mathrm{sim}_{u,s}}
$$
这里在加权计算其他用户的评分时，减掉了该用户的平均评分，这样就将其他用户的 “个人因素” 剔除了；同时，额外增加一项目标用户的平均评分，则是将目标用户的 “个人因素” 放大了。

```python
def get_usercf_recommendations(
    user_data: Dict[str or int, Dict], 
    item_data: Dict[str or int, Dict],
    user: str or int, 
    sim_k: int, 
    topn: int
) -> List[Tuple[int or str, float]]:
    recommend_dict = {}
    # 目标用户的平均评分（个人因素）
    base_score = np.mean(list(user_data[user].values()))
    users = list(user_data)
    user_idx = users.index(user)
    # 目标用户不知道的商品
    can_recommend = [(idx, v) for (idx, v) in enumerate(item_data) if v not in user_data[user]]
    for item_idx, item in can_recommend:
        weighted_score = 0.0
        corr_sum = 0.0
        # 前 sim_k 个与目标用户相似的用户 index
        for sim_user_idx in similarity_matrix[user_idx].argsort()[-sim_k: ]:
            corr = similarity_matrix[user_idx][sim_user_idx]
            # 相关性小于等于 0 的就不要了
            if corr <= 0:
                continue
            sim_user = users[sim_user_idx]
            # 用户 sim_user s 没有对 item p 评分的不计算
            if item not in user_data[sim_user]:
                continue
            sim_user_base = np.mean(list(user_data[sim_user].values()))
            weighted_score += corr * (user_data[sim_user][item] - sim_user_base)
            corr_sum += corr
        # 如果相似用户那里计算失败，那这个商品就跳过了
        if corr_sum == 0.0:
            continue
        recommend_dict[item] = base_score + weighted_score / corr_sum
    sort = sorted(recommend_dict.items(), key=lambda x:x[1], reverse=True)[:topn]
    return sort
```

上面代码的计算效率并不高，主要是因为 “目标用户不知道的商品” 里面可能有很多对相似用户来说也是 “不知道的商品”，这就导致了很多无效操作。事实上，我们可以直接对相似用户的评分商品进行处理。

```python
def get_usercf_recommendations(
    user_data: Dict[str or int, Dict], 
    user: str or int, 
    sim_k: int, 
    topn: int
)-> List[Tuple[int or str, float]]:
    recommend_dict = {}
    weighted_score_dict = {}
    corr_sum_dict = {}
    base_score = np.mean(list(user_data[user].values()))
    users = list(user_data)
    user_idx = users.index(user)
    for sim_user_idx in similarity_matrix[user_idx].argsort()[-sim_k: ]:
        corr = similarity_matrix[user_idx][sim_user_idx]
        if corr <= 0:
            continue
        sim_user = users[sim_user_idx]
        sim_user_base = np.mean(list(user_data[sim_user].values()))
        for item in user_data[sim_user]:
            # 如果相似用户的评分商品目标用户已经知道了，则跳过
            if item in user_data[user]:
                continue
            weighted_score = weighted_score_dict.get(item, 0.0)
            weighted_score_dict[item] = weighted_score + corr * (user_data[sim_user][item] - sim_user_base)
            corr_sum = corr_sum_dict.get(item, 0.0)
            corr_sum_dict[item] = corr_sum + corr
    for item in weighted_score_dict:
        recommend_dict[item] = base_score + weighted_score_dict[item] / corr_sum_dict[item]
    sort = sorted(recommend_dict.items(), key=lambda x:x[1], reverse=True)[:topn]
    return sort
```

经测试，优化后的运行速度是之前的 1/30，也就是效率提高了近 30 倍。当然，我们也可以先获得相似用户的评分商品，剔除目标用户知道的商品后，作为候选列表。

**优缺点**

- 数据稀疏性。很多实际项目中，用户真正购买的商品可能只占所有商品很少的比例，这就导致大多数用户对大多数商品都是不知道的，算法很难找到目标用户的相似用户，这就导致该算法不适合正反馈获取较困难的应用场景（没有正反馈就没法推荐）。代表性的例子就是低频商品购买，如酒店预订。
- 不适合用户量大的情况。用户量大时，相似度矩阵的计算和存储开销都非常大。我们估算一下，假设用户为 100 万，那么相当于维护一个 100 万 × 100 万的浮点数矩阵，一个 float64 占 8 个字节，总共占用空间 7 个多 T，太太太不现实了。
- 对于用户少、物品多、时效性强的场合比较适合。比如新闻推荐，因为相比用户对新闻的兴趣偏好，新闻的及时性、热点往往更加重要，所以正好用于发现热点（比如将大家都关注的某个新闻推荐给其他用户）和跟踪热点。同时还具有推荐新信息的能力，这是因为算法按人进行推荐很有可能发现用户的潜在兴趣。

因此，虽然基于用户的协同过滤技术实现很简单，也适用于很多场景，但缺点太明显，很多实际项目一般会使用基于商品的协同过滤作为最初的推荐系统实现。

## 基于物品的协同过滤

它的基本思想是根据不同用户对物品的评分来计算物品之间的相似性，然后把目标用户喜欢物品类似的物品推荐给用户。所以，第一步是计算物品之间的相似性，确定给定物品的前 n 个相似物品，然后根据相似物品的评分计算给定物品评分，最终得到可推荐列表，排序后将前面的物品推荐给目标用户。**这里的假设是商品 A 和 B 相似是因为喜欢商品 A 的用户也喜欢商品 B**（因为衡量商品相似的标准是用户对它的评分）。

算法基本流程和上部分基于用户的协同过滤基本一致，最终的评分公式也很相似：
$$
R_{u,p} = \bar{R_p} + \frac{\sum_{k \in K} \left( \mathrm{sim}_{p,k} \cdot (R_{u,k} - \bar{R_k}) \right)}{\sum_{k \in K} \mathrm{sim}_{p,k}}
$$
Ruk 表示用户 u 对商品 k 的评分，商品 k 则属于商品 p 的相似商品 K 的元素。也就是说，给定目标用户不知道的商品 p，通过用户评过分的若干相似物品 K，可以根据上式计算 p 的评分。只要得到用户不知道商品的列表和对应的评分，自然可以完成推荐。

计算相似度矩阵可以用之前的代码，不再赘述。推荐相关代码如下：

```python
def get_itemcf_recommendations(
    user_data: Dict[str or int, Dict], 
    item_data: Dict[str or int, Dict],
    user: str or int, 
    sim_k: int, 
    topn: int
)-> List[Tuple[int or str, float]]:
    recommend_dict = {}
    items = list(item_data)
    can_recommend = [(idx, v) for (idx, v) in enumerate(item_data) if v not in user_data[user]]
    for item_idx, item in can_recommend:
        base_score = np.mean(list(item_data[item].values()))
        weighted_score = 0.0
        corr_sum = 0.0
        # 通过该用户评过分且与给定 Item 最相似的 Item 计算分数
        for sim_item_idx in similarity_matrix[item_idx].argsort()[-sim_k: ]:
            corr = similarity_matrix[item_idx][sim_item_idx]
            if corr <= 0:
                continue
            sim_item = items[sim_item_idx]  
            # 如果用户对相似物品没有打过分，跳过该物品
            if user not in item_data[sim_item]:
                continue
            sim_item_base = np.mean(list(item_data[sim_item].values()))
            weighted_score += corr * (item_data[sim_item][user] - sim_item_base)
            corr_sum += corr
        # 如果相似度计算失败，跳过该商品
        if corr_sum == 0.0:
            continue
        recommend_dict[item] = base_score + weighted_score / corr_sum
    sort = sorted(recommend_dict.items(), key=lambda x:x[1], reverse=True)[:topn]
    return sort
```

**优缺点**

- 数据稀疏性。与前面分析类似，因为数据稀疏缺乏计算相似性的数据，导致热门商品具有很强的头部效应，容易跟大量商品相似，但尾部商品却很少被推荐。
- 不适合大量商品的情况。理由与前面类似，相似度矩阵计算与存储的消耗太大。
- 适用于物品少、用户多、用户兴趣比较稳定、物品更新速度不是太快的场合。比如电影、书籍推荐。

## 算法评估

**召回率**

这里的召回率与机器学习的类似，就是在测试集上，用户标记喜欢的物品集合中有多少是系统推荐给用户的。假设对用户 u 推荐了 N 个物品 Rn，用户喜欢的集合为 Tu：
$$
\mathrm{Recall} = \sum_{u} \frac{|R(u) \cap T(u)|} {|T(u)|}
$$
**精准率**

相应地，准确率衡量的是推荐的物品中，用户喜欢的占推荐物品的比例：
$$
\mathrm{Precision} = \sum_{u} \frac{|R(u) \cap T(u)|} {|R(u)|}
$$
**覆盖率**

反应算法挖掘长尾的能力，表示最终推荐列表中包含多大比例的物品。
$$
\mathrm{Coverage} = \frac{ \cup_{u \in U} R(u) }{|I|}
$$
**新颖度**

根据推荐列表中物品的平均流行度衡量，如果有很多热门物品则说明推荐的新颖度低。

## 算法评价

**数据稀疏问题**

之前提到处理数据稀疏向量弱的导致的头部效应问题其实是协同过滤算法的天然缺陷，体现在模型上其实就是泛化能力太弱。矩阵分解技术通过使用 更稠密的隐向量表示用户和物品，挖掘用户和物品的隐含兴趣和隐含特征，在一定程度上弥补了这个问题。

**只利用了交互信息**

这个问题更加直观，因为协同过滤只利用了用户和物品的交互信息，并没有利用用户和物品自身的属性，这就造成了信息的遗漏。用户画像、商品画像等方法正是因此而出现。


## 参考资料

- [team-learning-rs/RecommendationSystemFundamentals at master · datawhalechina/team-learning-rs](https://github.com/datawhalechina/team-learning-rs/tree/master/RecommendationSystemFundamentals)
- [Pearson correlation coefficient - Wikiwand](https://www.wikiwand.com/en/Pearson_correlation_coefficient)
- [大数据数学基础（R语言描述） (豆瓣)](https://book.douban.com/subject/30771192/)
- [MinHash LSH Ensemble — datasketch 1.0.0 documentation](http://ekzhu.com/datasketch/lshensemble.html)

