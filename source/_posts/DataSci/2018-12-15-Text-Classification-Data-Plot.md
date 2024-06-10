---
title: 绘制文本分类数据
date: 2018-12-15 14:00:00
categories: Coding
tags: [Matplotlib, Seaborn, Python, Visualization]
---

问题的起因是最近做的一个项目需要在后端绘制 Scatter，横轴是 float 数据，纵轴是分类的文本标签。具体的要求是：

- 每个数据集可能有若干个主体，也就是一个画布可能需要绘制多幅图；
- 每幅图的分类类型并不一定相同，但整体类别是知道的；比如：共有 8 种颜色 ”红橙黄绿青蓝紫“，但主体 1 的类别可能是 ”红橙黄“，主体 2 的类别可能是 ”红黄绿“；
- 要保证同一种类别在图中的颜色标记是一样的，比如：红色类别是红色，那么如果某一个主体的类别中没有红色类别，其他类别在画图时也不应使用红色；
- 要保证类别的顺序按给定的顺序；比如给定的顺序是 ”红橙黄绿青蓝紫“，主体 1 的类别是 ”红橙黄“，那绘制出来的图像 y 轴必须是按照这个顺序下来的，如果是 ”红黄蓝“ 也是类似。

本来项目是用 NodeJS 写的，后端画图找了不少工具都不太好用（前端工具巨多），后来用了 [plotly/plotly-nodejs](https://github.com/plotly/plotly-nodejs)，但是表现力方面差强人意，而且由于是调用 RESTFul API，数据点太多时会超时，本身也会有网络请求耗时。最后就想到用 Python 在内部起一个 server，使用 Matplotlib 或 Seaborn 绘图。

Seaborn 一行命令就可以绘制，而且参数可以自动把不同的主体区分开；Matplotlib 就稍微麻烦些，不能直接实现预期的目的，后来经过试验，发现可以将类别转为数字然后再将数字的 y 轴转为 string 即可。

Notebook 在这里：[text-classification-data](https://github.com/hscspring/Note_DS/blob/master/Visualization/text-classification-data.ipynb)，或用 nbviewer 打开：[Jupyter Notebook Viewer](http://nbviewer.jupyter.org/github/hscspring/Note_DS/blob/master/Visualization/text-classification-data.ipynb)

