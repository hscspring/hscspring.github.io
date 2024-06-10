---
title: Python 小白快速从入门到放弃：在开始前
date: 2019-04-10 23:00:00
categories: Coding
tags: [Python]
---

> 说明：本教程只适用于之前没接触过编程然后又想学点编程知识的同学，他们的目的主要有两个：第一，解决日常工作中的一些重复劳动或者自己做一个好玩儿的小项目；第二，尝试一种新的思维或 ”面对世界“ 的方式。本教程将围绕这两个目的展开。

<!--more-->

## 原则

- Learn by doing
    编程是动手性极强的技能，要想熟练运用只能动手。

    > Talk is cheap. Show me the code. -- Linus Torvalds

- Feeling and Thingking
    每一个领域都有其独特的认识世界的方式，每当我们新进入一个领域，其实就是以这个领域独特的方式去探索和认识这个世界。举个例子，比如一个苹果，物理学家看到的可能是它的受力情况（牛顿？:D），化学家看到的可能是它的元素构成，美术家看到的可能是它的结构和形状，当然吃货看到的可能是它的口味如何……计算机同样如此。因此，你可以尝试以这样的方式去感受和体验，然后去思考和感悟。你会发现学习是一件非常美好的事情，进而你会发现生活以及这个世界的美好。

- efficiency and result
    我们会比较关注效率和效果，遵循的原则是：先学会用，在使用中学习进而改造。

> 上面说名言的那位叫 Linus Torvalds 的童鞋可是位大牛人，你可以瞅一眼 [维基百科](https://link.jianshu.com/?t=https://en.wikipedia.org/wiki/Linus_Torvalds)，他创建了一个操作系统 Linux。我们现在用的是 Windows 的操作系统，Linux 是完全不同于 Windows 的另外一套系统，是 Unix 的开源实现，Mac 也是类 Unix 系统。感兴趣可以阅读：[linux 和 unix 的区别](https://www.2cto.com/os/201109/104824.html)。
>
> 操作系统你可以把它理解为连接人和计算机底层的桥梁，它把你的操作行为传输给计算机来执行。它是一台计算机最基本的系统软件，其他所有程序都得跑在操作系统上，通过操作系统与硬件联系。

## 安装

这步不应该成为障碍。Mac 用户直接用 `brew install python` 就可以安装，也可以通过 `brew install python@x.x.x` 安装指定版本。有两个特别的东西需要说明一下（但不是必须步骤）。

### 环境变量

环境变量就是告诉操作系统编译器运行的路径，就是当你在任意打开的命令窗口输入 Python 或运行 Python 程序时，命令台会自动沿着路径找到 Python 的编译器。简单来说有点类似与快捷方式，而且是针对系统的，你可以在系统的任何目录运行 Python 程序。否则你就只能每次跑到 Python 的安装目录里面跑程序啦。

Win 系统在控制面板中打开系统，选择高级系统设置，点到 “高级” 标签，然后选择 “环境变量”，再选中 `Path` ，点击 “编辑”，然后在最前面增加 Python 的安装目录，用分号结束即可，就像这样：
`C:\Python27;C:\Python27\Scripts;` 增加这么两条即可，其中，`C:\Python27` 就是你 Python 的安装目录。然后你就可以在任意地方打开 cmd 命令，运行 Python 了。Unix 类操作系统在 `~/.bashrc` 中配置（zsh 的配置文件是 `.zshrc`），如果需要添加某个环境变量的话，可以在里面增加 `export PATH="/path/to/bin:$path"` 一行即可，当登录以及每次打开新的 shell 时，这个配置文件将被读取并生效。

### IDE

IDE 全称是：Integrated Development Environment，叫集成开发环境。就是把代码的编辑、编译、调试、图形界面（GUI）都捆在一起了；言下之意就是说如果你安装了 IDE，你在里面写的程序它能帮你运行（它会自己去找你已经安装好的编译器），而且还是图形界面。

你可以使用自己喜欢的任意一款 IDE，但对于本教程的用户来说，推荐使用 [Jupyter Notebook](https://jupyter.org/)

```bash
pip install jupyter # 安装 jupyter
pip install jupyter_contrib_nbextensions # 安装插件
jupyter contrib nbextension install --user # 安装一些必要的文件
jupyter nbextension enable codefolding/main # 激活
jupyter notebook
```

理由如下：

- 直接反馈结果
- 方便记笔记
- 方便一点一点尝试代码

## 一些观点

- 编程（对任何语言）入门或做一些小任务都不难，所以要有信心。
- 99% 的问题都可以通过 Google 找到，所以不要问一些现成的问题。
- 这个教程不是必须的，它出现的目的是方便开头提到这些同学，让他们的注意力不至于拐弯拐的太厉害。
- 不讨论也不要问哪门语言最好，或某门语言比另一门好。
- 不讨论也不要问哪个编辑器或 IDE 最好，或某个比另一个好。
- 时刻记住自己的目的：解决问题、体验新事物。





