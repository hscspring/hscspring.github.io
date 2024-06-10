---
title: 高性能数据处理
date: 2021-08-12 23:00:00
categories: Coding
tags: [Pandas,  Arrow, Polars, Numpy, Jax, Numba, Pandarallel]
---

最近在写深度学习开源库时，遇到了读取语料并预处理的 API，于是趁此机会整理一下之前积累的关于高性能的内容。全文包括两个部分：第一部分主要聚焦在常用工具 Pandas 处理数据时不同操作方法的性能；第二部分主要介绍一些加速数值计算的工具；第三部分主要介绍一些能够辅助增加性能的工具。

如果懒得看过程，可以直接看结论：

- 数值计算任务：`numba` 或 `Cython` 加速；使用 `.values` 计算
- 遍历的非数值计算任务：`df.itertuples` 或 `df.apply` 方法
- 数据太大 Pandas 处理不了的可以使用 Arrow 和 Polars，再不行了使用 Spark

所有测试代码在：[Note_DS/Performance.ipynb](https://github.com/hscspring/Note_DS/blob/master/Performance.ipynb)


<!--more-->

- [Pandas 性能对比](#pandas-%E6%80%A7%E8%83%BD%E5%AF%B9%E6%AF%94)
  - [循环任务](#%E5%BE%AA%E7%8E%AF%E4%BB%BB%E5%8A%A1)
    - [For循环](#for%E5%BE%AA%E7%8E%AF)
    - [iterrows方法](#iterrows%E6%96%B9%E6%B3%95)
    - [itertuple方法](#itertuple%E6%96%B9%E6%B3%95)
    - [Apply方法](#apply%E6%96%B9%E6%B3%95)
  - [批量任务](#%E6%89%B9%E9%87%8F%E4%BB%BB%E5%8A%A1)
    - [Series](#series)
    - [Numpy](#numpy)
- [加速数据任务](#%E5%8A%A0%E9%80%9F%E6%95%B0%E6%8D%AE%E4%BB%BB%E5%8A%A1)
  - [加速器](#%E5%8A%A0%E9%80%9F%E5%99%A8)
    - [numba](#numba)
    - [JAX](#jax)
  - [Cython](#cython)
  - [eval](#eval)
  - [并发](#%E5%B9%B6%E5%8F%91)
- [其他数据处理工具](#%E5%85%B6%E4%BB%96%E6%95%B0%E6%8D%AE%E5%A4%84%E7%90%86%E5%B7%A5%E5%85%B7)
- [参考](#%E5%8F%82%E8%80%83)


## Pandas 性能对比

**数据集**

本文的数据集使用 [今日头条中文新闻（文本）分类数据集](https://github.com/aceimnorstuvwxz/toutiao-text-classfication-dataset)，此数据集样例如下：

```bash
$ head -2 toutiao_cat_data.txt
# 6551700932705387022_!_101_!_news_culture_!_京城最值得你来场文化之旅的博物馆_!_保利集团,马未都,中国科学技术馆,博物馆,新中国
# 6552368441838272771_!_101_!_news_culture_!_发酵床的垫料种类有哪些？哪种更好？_!_
```

该数据集是短文本分类任务，包含 15 个类别，共 382688 条样本。每行为一条数据，以`_!_`分割的个字段，从前往后分别是 新闻 ID，分类 code，分类名称，新闻字符串（仅含标题），新闻关键词。为了提升处理效率，我们只选择 1 万条数据。

### 循环任务

假设我们需要得到 title 的分词结果，这里我们使用结巴分词。

#### For循环

最基本直观的操作：

```python
def tokenize_forloop(df):
    data = []
    for i in range(df.shape[0]):
        tokens = jieba.lcut(df.iloc[i]["title"])
        data.append(tokens)
    df["tokens"] = data
    return df

%time new = tokenize(df)
```

执行结果如下：

```bash
CPU times: user 3.06 s, sys: 220 ms, total: 3.28 s
Wall time: 3.48 s
```

#### iterrows方法

```python
def tokenize_iterrows(df):
    data = []
    for i,v in df.iterrows():
        tokens = jieba.lcut(v.title)
        data.append(tokens)
    df["tokens"] = data
    return df

%time new = tokenize_iterrows(df)
```

执行结果如下：

```bash
CPU times: user 2.76 s, sys: 45.3 ms, total: 2.8 s
Wall time: 3.09 s
```

#### itertuple方法

```python
def tokenize_itertuples(df):
    data = []
    for v in df.itertuples(index=False):
        tokens = jieba.lcut(v.title)
        data.append(tokens)
    df["tokens"] = data
    return df

%time new = tokenize_itertuples(df)
```

执行结果如下：

```bash
CPU times: user 1.26 s, sys: 13.8 ms, total: 1.28 s
Wall time: 1.29 s
```

#### Apply方法

```python
%time df["tokens"] = df["title"].apply(lambda x: jieba.lcut(x))
```

执行结果如下：

```bash
CPU times: user 1.41 s, sys: 19.1 ms, total: 1.43 s
Wall time: 1.6 s
```

可以发现 `itertuple` 方法出奇的快，甚至超过了 `apply` 方法。

### 批量任务

假设我们需要对长度进行最小最大值范围限定：

```python
def reset_len(df, series, min_len, max_len):
    df.loc[series < min_len, "length"] = min_len
    df.loc[series > max_len, "length"] = max_len
```

这种情况可以进行批量处理，也有两种不同的方式：

#### Series

```python
%timeit reset_len(df, df["length"], 5, 20)
# 982 µs ± 97.7 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)
```

#### Numpy

```python
%timeit reset_len(df, df["length"].values, 5, 20)
# 593 µs ± 38 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)
```

可以发现转成 Numpy 快了将近一倍。我们再尝试用 `apply` 处理一下：

```python
%timeit df["length"] = df["length"].apply(lambda x: deal_length(x, 5, 20))
# 5.21 ms ± 764 µs per loop (mean ± std. dev. of 7 runs, 100 loops each)
```

这个差距有 10 倍了。

**小结一下**：如果是循环任务（非数字、需要其他复杂处理的），可以使用 `apply` 或 `itertuple`，后者对于处理数据集尤其有用；如果是批量任务，可以充分利用矩阵计算快速处理，唯一要做的仅仅只是添加一个 `.values` 的后缀而已。

## 加速数据任务

如果任务中有大量数值计算和循环，可以使用 `numba`，`JAX`，`Cython` 等进行加速，其性能会远超循环方法。

### 加速器

构造一个简单的例子：

```python
import numpy as np
import numba
def integrate(a, b, N):
    s = 0
    dx = (b - a) / N
    for i in range(N):
        x = a + i * dx
        s += x * (x-1)
    return s * dx

@numba.jit
def integrate_numba(a, b, N):
    s = 0
    dx = (b - a) / N
    for i in range(N):
        x = a + i * dx
        s += x * (x-1)
    return s * dx
```

#### numba

不使用 `numba`：

```bash
df = pd.DataFrame(np.random.randint(1,100,size=(100000, 3)),columns=['a', 'b', 'N'])
%timeit df.apply(lambda x: integrate(*x), axis=1)
# 1.77 s ± 94.9 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
```

使用 `numba.jit`：

```bash
df = pd.DataFrame(np.random.randint(1,100,size=(100000, 3)),columns=['a', 'b', 'N'])
%timeit df.apply(lambda x: integrate_numba(*x), axis=1)
# 906 ms ± 45.8 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
```

再看一个批量的例子：

```python
def double_every_value_nonumba(x):
    return x*2

@numba.vectorize
def double_every_value_withnumba_vec(x):
    return x*2

@numba.jit
def double_every_value_withnumba(x):
    return x*2
```

不使用 `numba`：

```bash
df = pd.DataFrame(np.random.randint(1,100,size=(100000, 3)),columns=['a', 'b', 'N'])
%timeit df.a.apply(double_every_value_nonumba)
# 33.4 ms ± 2.37 ms per loop (mean ± std. dev. of 7 runs, 10 loops each)
```

使用 `numba.jit` 和 `apply`：

```bash
df = pd.DataFrame(np.random.randint(1,100,size=(100000, 3)),columns=['a', 'b', 'N'])
%timeit df.a.apply(double_every_value_withnumba)
# 32.8 ms ± 851 µs per loop (mean ± std. dev. of 7 runs, 10 loops each)
```

直接批量计算：

```bash
df = pd.DataFrame(np.random.randint(1,100,size=(100000, 3)),columns=['a', 'b', 'N'])
%timeit df.a * 2
# 270 µs ± 15 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)
```

使用 `.values` 批量计算：

```bash
df = pd.DataFrame(np.random.randint(1,100,size=(100000, 3)),columns=['a', 'b', 'N'])
%timeit df.a.values * 2
# 196 µs ± 13.7 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)
```

使用 `numba.vectorize`：

```bash
df = pd.DataFrame(np.random.randint(1,100,size=(100000, 3)),columns=['a', 'b', 'N'])
%timeit double_every_value_withnumba_vec(df.a)
# 284 µs ± 53.1 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)
```

使用 `numba.vectorize` 和 `.values`：

```bash
df = pd.DataFrame(np.random.randint(1,100,size=(100000, 3)),columns=['a', 'b', 'N'])
%timeit double_every_value_withnumba_vec(df.a.values)
# 83.7 µs ± 2.4 µs per loop (mean ± std. dev. of 7 runs, 10000 loops each)
```

使用 `numba.jit` 和 `.values`：

```bash
df = pd.DataFrame(np.random.randint(1,100,size=(100000, 3)),columns=['a', 'b', 'N'])
%timeit double_every_value_withnumba(df.a.values)
# 82.3 µs ± 3.59 µs per loop (mean ± std. dev. of 7 runs, 10000 loops each)
```

#### JAX

依然使用上面批量的例子：

```python
from jax import jit
@jit
def double_every_value_withjit(x):
    return x*2
```

使用 `jax`：

```bash
df = pd.DataFrame(np.random.randint(1,100,size=(100000, 3)),columns=['a', 'b', 'N'])
%timeit df.a.apply(double_every_value_withjit)
# 769 ms ± 63.1 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
```

使用 `jax` 和 `.values`：

```bash
df = pd.DataFrame(np.random.randint(1,100,size=(100000, 3)),columns=['a', 'b', 'N'])
%timeit double_every_value_withjit(df.a.values)
# 361 µs ± 30.9 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)
```

通过简单的例子对比可以发现，`numba` 比 `JAX` 要快一些。

此外还有其他一些加速器，可参考：[Make your Python code fly at transonic speeds!](https://transonic.readthedocs.io/en/latest/index.html)

### Cython

我们使用前面 `numba` 的 `integrate` 方法：

```python
%load_ext Cython
%%cython
def integrate_cython(a, b, N):
    s = 0
    dx = (b - a) / N
    for i in range(N):
        x = a + i * dx
        s += x * (x-1)
    return s * dx

%%cython
cpdef double integrate_cython_add_type(double a, double b, int N):
    cdef int i
    cdef double s, dx, x
    s = 0
    dx = (b - a) / N
    for i in range(N):
        x = a + i * dx
        s += x * (x-1)
    return s * dx

%%cython
cimport numpy as np
import numpy as np
cpdef double integrate_cython_ndarray(double a, double b, int N):
    cdef int i
    cdef double s, dx, x
    s = 0
    dx = (b - a) / N
    for i in range(N):
        x = a + i * dx
        s += x * (x-1)
    return s * dx
cpdef np.ndarray[double] apply_integrate_f(np.ndarray col_a, np.ndarray col_b, np.ndarray col_N):
    cdef Py_ssize_t i, n = len(col_N)
    cdef np.ndarray[double] res = np.empty(n)
    for i in range(len(col_a)):
        res[i] = integrate_cython_ndarray(col_a[i], col_b[i], col_N[i])
    return res
```

纯 `Cython`：

```bash
df = pd.DataFrame(np.random.randint(1,100,size=(100000, 3)),columns=['a', 'b', 'N'])
%timeit df.apply(lambda x: integrate_cython(*x), axis=1)
# 1.48 s ± 83.6 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
```

比直接使用 Python 稍微快了一点。

添加类型：

```bash
df = pd.DataFrame(np.random.randint(1,100,size=(100000, 3)),columns=['a', 'b', 'N'])
%timeit df.apply(lambda x: integrate_cython_add_type(*x), axis=1)
# 887 ms ± 76.3 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
```

这性能已经超过了使用 `numba.jit`，至少也是相差无几了。

使用 `ndarray`：

```bash
df = pd.DataFrame(np.random.randint(1,100,size=(100000, 3)),columns=['a', 'b', 'N'])
%timeit apply_integrate_f(df['a'].values, df['b'].values, df['N'].values)
# 21.7 ms ± 620 µs per loop (mean ± std. dev. of 7 runs, 10 loops each)
```

可以看到已经很好了，这里还是用了 `numpy` 的 array，总而言之，`.values` 值得被使用。

### eval

这是一个实验功能，看起来还是很强大，我们使用 `double_every_value` 方法进行测试：

```bash
df = pd.DataFrame(np.random.randint(1,100,size=(100000, 3)),columns=['a', 'b', 'N'])
%timeit df.eval('c = a * 2', inplace=True)
# 1.81 ms ± 94.7 µs per loop (mean ± std. dev. of 7 runs, 1000 loops each)
```

可以看到这个比使用了 `numba` 的 `apply` 还是快很多，但和 `.values` 和批量方法相比还是有差距。

### 并发

我们使用最一开始的文本处理任务：

```python
from pnlp import concurring
from pandarallel import pandarallel
pandarallel.initialize()

def tokenize(lst):
    data = []
    for s in lst:
        tokens = jieba.lcut(s)
        data.append(tokens)
    return data

@concurring(type="process_pool", max_workers=4)
def tokenize_mp(lst):
    data = []
    for s in lst:
        tokens = jieba.lcut(s)
        data.append(tokens)
    return data

@concurring(type="thread_pool", max_workers=4)
def tokenize_mt(lst):
    data = []
    for s in lst:
        tokens = jieba.lcut(s)
        data.append(tokens)
    return data
```

不使用并发：

```bash
df = get_data()
%timeit res = tokenize(df["title"])
# 1.56 s ± 142 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
```

可以看到和 `apply` 差不多：

```bash
df = get_data()
%timeit res = df["title"].apply(lambda x: tokenize(x))
# 1.6 s ± 76.4 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
```

多进程：

```bash
df = get_data()
%timeit res = list(tokenize_mp(df["title"]))
# 3.4 s ± 269 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
```

多线程：

```bash
df = get_data()
%timeit res = list(tokenize_mt(df["title"]))
# 1.52 s ± 96.9 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
```

多线程不适用并发快一些，但多进程反而会慢，每个进程导入包可能会有影响。

最后看下 Pandarallel：

```bash
df = get_data()
%timeit res = df["title"].parallel_apply(lambda x: tokenize(x))
# 1.36 s ± 143 ms per loop (mean ± std. dev. of 7 runs, 1 loop each)
```

还是有一定的提升。

## 其他数据处理工具

除了 Pandas，还有两个工具值得推荐：

- 如果数据对 Pandas 来说太大，但对 Spark 来说又太小，可以使用：[ Polars](https://pola-rs.github.io/polars-book/user-guide/introduction.html)
- 当然，还有它使用的高性能数据处理引擎：[Apache Arrow](https://arrow.apache.org/docs/index.html)

## 参考

- [How To Make Your Pandas Loop 71803 Times Faster | by Benedikt Droste | Towards Data Science](https://towardsdatascience.com/how-to-make-your-pandas-loop-71-803-times-faster-805030df4f06)
- [7 Enhancing Performance — Pandas Doc](https://tedboy.github.io/pandas/enhancingperf/enhancingperf.html)
- [6 ways to significantly speed up Pandas with a couple lines of code. Part 1](https://alievmagomed.com/6-ways-to-significantly-speed-up-pandas-with-a-couple-lines-of-code/)
- [Make your Python code fly at transonic speeds! — Transonic 0.4.8 documentation](https://transonic.readthedocs.io/en/latest/index.html)

