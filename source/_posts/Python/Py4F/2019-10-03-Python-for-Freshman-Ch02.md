---
title: Python 小白快速从入门到放弃：使用模块
date: 2019-10-03 23:00:00
categories: Coding
tags: [Python, Module, PyPI]
---

上节介绍了函数，简单理解就是实现特定功能的一组代码，方便复用。本节介绍的模块其实就是把函数组合起来作为模块，让更加便利地完成任务。使用模块我们可以非常迅速地实现很多任务，而不用自己动手实现。Python 中的模块分为内置的（Python 安装后就有的）和社区模块（需要通过 `pip install xxx` 安装的）。

<!--more-->

## 内置模块

Python 的内置模块都在这里：[Built-in Functions — Python 3.7.5rc1 documentation](https://docs.python.org/3/library/functions.html)，大致浏览一下即可，具体到某个任务需要用到的时候我们再去仔细阅读文档。我们举几个例子。

**例子一：**对一个 list 排序，list 的元素我们简单起见假设都为整数。

如果不使用内置模块，或者我们不知道有内置模块已经实现了这个功能，那就需要自己写代码实现了：

```python
lst = [3, 5, 2, 1, 7, 9]

def quick_sort(lst):
    if len(lst) <= 1:
        return lst
    pivot = lst.pop() # 弹出最后一个元素，lst 少了最后一个元素
    small = []
    big = []
    for i in lst:
        if i < piovt:
            small.append(i)
        else:
            big.append(i)
    return quick_sort(small) + [piovt] + quick_sort(big)
```

这是快排的实现，很容易理解：如果只有一个元素或者为空时，就返回这个元素；否则我们随机选择（这里选了最后一个）一个元素作为 pivot，然后将 lst 分为两部分（比 pivot 小的，比 pivot 大的），然后重复执行同样的操作就可以排好了。当然，你可能想到用其他方法，比如每次选择最小（或最大）的放到新的 list，直到原来的 list 为空为止：

```python
def choose_sort(lst):
    res = []
    while lst != []:
        mini = min(lst)
        for i in lst:
            if i == mini:
                res.append(i)
                lst.remove(i)
    return res
```

这个就很好理解了：只要 lst 不为空，我们就首先找出那个最小的值，然后遍历 lst，把与最小值相等的元素先全部拿出来放到新的列表里，同时记得从原来的列表里删除这些元素。

用自己的方法实现当然没有任何问题，但如果有内置模块时，一般推荐使用，除了简单省事外，它们一般都比我们自己写的性能要好。就拿排序来说，很简单的一个调用就可以了，就跟调用自己写的函数一样：

```python
sorted(lst)
```

而且，内置函数一般都会有很多其他功能，就拿 `sorted` 来说，它支持正序、反序，也支持以任意的指定标准来排，比如：

```python
lst = [3, 5, 2, 1, 7, 9, 4, 8, 6]
# 按先奇数后偶数排序
sorted(lst, key=lambda x: x%2 == 0) # => [3, 5, 1, 7, 9, 2, 4, 8, 6]
# x%2 是取余数操作，余数为 0 是偶数，为 1 是奇数；
# 为 0 是偶数，== 0，就是 True，等于 1；反之等于 0；0 < 1，所以奇数就在前面

# 按先奇数后偶数同时奇数和偶数内部从大到小排序
new = sorted(lst, reverse=True)
sorted(new, key=lambda x: x%2 == 0) # => [9, 7, 5, 3, 1, 8, 6, 4, 2]
```

如果列表的元素是稍微复杂的数据结构，那使用内置模块就更加便利了，比如：

```python
lst = [{"name": "张xx", "age": 10}, {"name": "李x", "age": 30}, {"name": "王xxx", "age": 20}]
# 按年龄排序
sorted(lst, key=lambda x: x["age"]) # 结果就是张、王、李
# 按名字长度排序
sorted(lst, key=lambda x: len(x["name"])) # 结果就是李、张、王
```

Python 中还有一部分内置的模块叫标准库：[The Python Standard Library — Python 3.7.5rc1 documentation](https://docs.python.org/3/library/index.html)，这部分需要 import 进来使用，不需要安装。标准库也是非常有质量保证的，能用到的推荐使用。

**例子二：**统计一段文本的词频。

我们首先自己实现：

```python
text = """
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
"""

def get_words_freq(text):
    res = {}
    words_list = text.split() # 使用 \n 或空格分隔
    for w in words_list:
        if w in res:
            res[w] = res[w] + 1
        else:
            res[w] = 1
    return res
```

给出的文本是 The Zen of Python，只要在 Jupyter Notebook 中输入 `import this` 就可以看到了。这段代码非常简单：首先获取词列表，然后遍历，如果词没在字典里，就让它的值等于 1，否则就让它的值加 1。

我们使用内置的标准库：

```python
import collections
words_list = text.split()
words_freq = collections.Counter(words_list)
```

结果是一样的，看起来好像没有啥特别方便的，但我们刚刚已经提到了，这些模块一般还有很多其他功能，比如：

```python
# 统计出现频率最高的 k 个词
words_freq.most_common(k)
# 统计出现频率最低的 k 个词
words_freq.most_common()[-k:]
```

无论是内置模块还是内置标准库，一般情况下直接拿来使用都是没有问题的，比较有质量保证。这相当于有人已经帮你把一部分功能实现好了，你只要直接调用他写好的函数就行了。需要说明的是，刚开始我们可能并不知道有哪些可以用到自己的任务中，遇到这种情况不要着急，上网搜搜和你类似的任务，看看别人是怎么实现的，别人用了你看到后自然就知道了。这样时间久了，自然就知道很多了，不需要专门刻意去学一遍这个。

## PyPI 包

既然官方能够提供内置模块和标准库，那自然也会有其他各种各样的模块可以提供出来供大家使用。这就是 [PyPI · The Python Package Index](https://pypi.org/) 了，在这里可以找到大量的全球各地程序猿实现的各种功能模块。安装一般都很简单，使用 pip 命令：`pip install package_name` 即可安装到本地的 Python 环境中，使用方法一般都会有相应的介绍文档。

这里我们也举一个例子，使用一个叫 pnlp 的包，这个包是我当时写的一个非常简单的预处理工具。为什么会写这么个工具呢？理由很简单：因为这些功能在我平时工作中会大量用到，每次都要把代码复制过来，或者把包含该代码的文件 import 到需要的地方，感觉特别麻烦。那现在就很方便了，我只需要 `import pnlp` 就可以使用里面内置的那些我需要的功能了。在 PyPI 里面直接搜索 pnlp 或者直接访问：[pnlp · PyPI](https://pypi.org/project/pnlp/) 就可以看到相关的介绍，Homepage 一般都链接到 GitHub 源代码仓库。简单介绍下其中一个功能吧：

```python
from pnlp import ptxt

pt = ptxt.Text(text, "eng")
pt.extract.mats # 所有的英文单词 list，剔除了标点、特殊符号等
pt.clean # 所有的非英文
```

这个包写的非常简单，仅有少量功能，而且后来发现用处貌似并没有我设想的那么大，主要因为不同任务的预处理一般都是不一样的，每次都需要针对性地做一些修改。不过既然已经发布了，也就那样了，如果以后有其他不错的补充时再 update 吧。

## 你的模块

刚刚提到我们可以把自己常用的或者实现了某个特定功能的模块传到 PyPI 方便自己日后使用，这里就来简单介绍下这个流程。官方这里也有个对应的文档：[Distributing Python Modules — Python 3.7.5rc1 documentation](https://docs.python.org/3/distributing/index.html) 可以参考。

- 首先安装需要的工具：`pip install setuptools wheel twine`

- 调整结构：一般是把你的所有源代码都放到一个目录下，然后和 LICENSE, README 一起放到项目的根目录下

    ```bash
    ├── LICENSE
    ├── README.md
    ├── your_pkg_name
    │   ├── __init__.py # 添加 name = "your_pkg_name"
    │   ├── source1.py
    │   ├── source2.py
    │   ├── ...
    │   └── tests # 测试
    ```

- 添加 `setup.py`：关于包设置的脚本，是关于你模块的 meta 信息，字段可以看[这里](https://packaging.python.org/tutorials/packaging-projects/)

- 创建 package：`python setup.py sdist bdist_wheel` 生成的 dist 文件夹就是你要上传到 PyPI 的文件

- 上传 package：`python3 -m twine upload --repository-url https://test.pypi.org/legacy/ dist/*`

    - 这里用的 repository url 是一个测试地址，正式地址是：`https://upload.pypi.org/legacy/`，建议先使用测试地址测试无误后再替换为正式地址正式发布

    - 这一步需要输入你在 PyPI 的用户名和密码，所以还需要先注册个账号

    - 上传后可以在 https://test.pypi.org/project/your_pkg_name 访问到你的包

- 安装 package：

    - 测试的通过 `pip install --index-url https://test.pypi.org/simple/ --no-deps your_pkg_name` 命令安装
    - 正式的通过 `pip install your_pkg_name` 安装，建议指定国内源：`pip install -i https://pypi.douban.com/simple your_pkg_name`

这样便成功创建了自己的包，为社区做出了一份贡献。需要说明的是，不太建议重复造轮子，如果网上能找到类似的功能，看了源代码觉得能满足自己需要的时候，直接拿来用即可；也不太建议造太专用的轮子，就是那些只能实现特定任务的功能，这样的话其他人很难复用。如果你的模块确实解决了某一类问题，且网上还没找到很好的实现，这时候发布成模块是非常不错的选择。

## 小结

本节主要介绍了模块（包）的使用以及如何创建发布自己的模块。使用模块是很自然的一件事，因为我们的目标就是完成任务，既然已经有相应的模块实现了我们需要的功能，自然拿来直接用了。这在复杂任务和大型项目中就更加如此了。而且如果我们稍微留意点的的话，就会发现绝大多数包本身也依赖其他的包。你可以灵活使用内置模块、标准库和 PyPI 上的包，就像搭积木一样。借助这些各式各样的模块就可以更加高效地完成任务。


