---
title: 自然语言处理（NLP）知识地图
date: 2017-04-09 18:00:00
tags: [NLP, DeepLearning]
categories: Feeling
---

 <p><div class="lev1 toc-item"><a href="#什么是-NLP" data-toc-modified-id="什么是-NLP-1"><span class="toc-item-num">1&nbsp;&nbsp;</span>什么是 NLP</a></div><div class="lev1 toc-item"><a href="#NLP-有什么用？" data-toc-modified-id="NLP-有什么用？-2"><span class="toc-item-num">2&nbsp;&nbsp;</span>NLP 有什么用？</a></div><div class="lev1 toc-item"><a href="#NLP-要学什么" data-toc-modified-id="NLP-要学什么-3"><span class="toc-item-num">3&nbsp;&nbsp;</span>NLP 要学什么</a></div><div class="lev1 toc-item"><a href="#深度学习与-NLP" data-toc-modified-id="深度学习与-NLP-4"><span class="toc-item-num">4&nbsp;&nbsp;</span>深度学习与 NLP</a></div><div class="lev1 toc-item"><a href="#扩展阅读" data-toc-modified-id="扩展阅读-5"><span class="toc-item-num">5&nbsp;&nbsp;</span>扩展阅读</a></div><div class="lev1 toc-item"><a href="#参考资料" data-toc-modified-id="参考资料-6"><span class="toc-item-num">6&nbsp;&nbsp;</span>参考资料</a></div>
![](http://qnimg.lovevivian.cn/NLPmap.png)

<!--more-->

# 什么是 NLP

计算机领域中自然语言处理（Natural Language Processing: NLP）的目的，就是让计算机能够理解和生成人类语言。  

- 自然语言处理是一门交叉学科，包括计算机科学，人工智能和语言学
- 目标：让计算机去处理或“理解”自然语言, 完成一些有用的任务例如问答系统，机器翻译
- 完全理解或者表示语言的意义（甚至去定义它）都是一个虚幻的目标
- 完美的理解语言是一个“[AI-complete](https://en.wikipedia.org/wiki/AI-complete)”的问题

# NLP 有什么用？

- 拼写检查
- 同义词查找&替换


- 文本分类与情感分析
 - 例如对教科书的文本进行分级，对长文本进行正负情绪判断
 - 市场营销或者金融交易领域的情感分析


- 信息检索与问答系统


- 关键词、信息提取
 - 从网页中提取有用的信息例如产品价格，日期，地址，人名或公司名等
- 自动文摘
- 自动写作


- 机器翻译
- 语音翻译


- 语音识别
- 人机对话


- ……

# NLP 要学什么

- [语言学](https://zh.wikipedia.org/zh-hans/%E8%AF%AD%E8%A8%80%E5%AD%A6)
  - 语言学是研究所有人类语文发展有关的一门学术科目（通常只有根据语言，非文字）。
  - 语言学研究句法和词语等语言的描述，也研究语言的发展史。
- [语音学](https://zh.wikipedia.org/zh-hans/%E8%AF%AD%E9%9F%B3%E5%AD%A6)
  - 发音语音学
  - 声学语音学
  - 听觉语音学
- 概率论
  - 贝叶斯
  - 马尔科夫
- 信息论
  - 香农、熵
- 机器学习
- 形式语言与自动机
  - 形式语言包括：短语结构语言、上下文有关语言、上下文无关语言、正则语言等
  - 自动机包括：图灵机、有穷自动机、下推自动机、线性有界自动机
- 语言知识库
- 语言模型
  - n 元语法
  - 数据平滑
- 自动分词、命名实体识别、词性标注
  - 自动分词就是让计算机自动区分出汉字组成的词语
  - 命名实体识别就是分词之后能够根据各种短语形式判断出哪个词表示的是一个物体或组织或人名或……
  - 词性标注就是在给定句子中判定每个词的语法范畴，识别出“名动形、数量代、副介连助叹拟声”
- 句法分析
  - 确定句子的句法结构或句子中词汇之间的依存关系
  - 句法结构分析
  - 依存关系分析：词与词之间的依存关系
- 语义分析
  - 词义消歧
  - 语义角色标注
- 篇章分析
  - 理解篇章
  - 分析篇章结构

# 深度学习与 NLP

- 神经网络语言模型
- 卷积神经网络 CNN
- 词向量
  - localist representation 与 distributed representation
  - word embedding
      - 基于霍夫曼树的 Hierarchical Softmax 技术
      - 基于 Negative Sampling 的模型
- 递归神经网络 RNN
  - LSTM
  - GRU
- Transformer
    - BERT 系列
    - GPT 系列

# 扩展阅读

- [Deep Learning in Neural Networks: An Overview](https://arxiv.org/pdf/1404.7828.pdf)
- [斯坦福大学深度学习与自然语言处理](http://www.52nlp.cn/%E6%96%AF%E5%9D%A6%E7%A6%8F%E5%A4%A7%E5%AD%A6%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E4%B8%8E%E8%87%AA%E7%84%B6%E8%AF%AD%E8%A8%80%E5%A4%84%E7%90%86%E7%AC%AC%E4%B8%80%E8%AE%B2%E5%BC%95%E8%A8%80)
  - [Stanford University CS224d: Deep Learning for Natural Language Processing](http://cs224d.stanford.edu/index.html)
- [PowerPoint Presentation - ICASSP_DeepTextLearning](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/ICASSP_DeepTextLearning_v07.pdf)

# 参考资料

- [统计自然语言处理（第2版）](https://book.douban.com/subject/25746399/)
- [warmheartli/ChatBotCourse](https://github.com/warmheartli/ChatBotCourse)
