---
title: Jupyter Notebook Cheat Sheet
date: 2021-06-07 23:00:00
categories: Feeling
tags: [Jupyter, Python]
mathjax: true
---

Jupyter Notebook 的相关备忘。

<!--more-->

### 命令

**pip**

```python
# 执行 bash 命令
!
%

# 安装到指定目录
!pip install xx -t ~/your/path
import sys
sys.path.append("~/your/path")
```

**magic**

```python
# 列出魔术方法
%lsmagic

# 设置环境变量
%env OMP_NUM_THREADS=4

# matplotlib
%matplotlib inline

# 支持的类型: 'png','jpg','png2x','svg','pdf','jpeg','retina' 
%config InlineBackend.figure_format = 'retina'

# 执行 Python 文件
%run your_python.py

# 当前 cell 写到文件
%%writefile path_to_py_file.py

# 读取外部 Python 文件
%pycat path_to_py_file.py

# Python gdb 工具
%pdb

# 性能分析工具
%load_ext scalene
```

更多：[Built-in magic commands — IPython 7.24.1 documentation](https://ipython.readthedocs.io/en/stable/interactive/magics.html)

**display**

```python
# 一并展示所有输出
from IPython.core.interactiveshell import InteractiveShell
InteractiveShell.ast_node_interactivity = "all"
```

### 安装启动

**插件**

```bash
pip install jupyter_contrib_nbextensions
# 不再需要
# jupyter contrib nbextension install --user
# jupyter nbextension enable codefolding/main
```

**远程服务器本地访问**

```bash
# 使用 ssh
ssh remote_name@remote_address -L 127.0.0.1:remode_port:127.0.0.1:local_port
```

```python
# 使用 jupyter 自带
# 生成配置文件
jupyter notebook --generate-config
# 生成 Token
ipython
from notebook.auth import passwd
passwd()
# 配置文件
vim ~/.jupyter/jupyter_notebook_config.py
# 修改配置
c.NotebookApp.allow_remote_access=True 
c.NotebookApp.ip='*' 
c.NotebookApp.open_browser=False
c.NotebookApp.password="sha1:3......."
c.NotebookApp.port=9999
# 服务器启动
jupyter notebook # or
jupyter notebook --config /path/to/jupyter_notebook_config_backup.py
# 本地访问
http://remote_address:9999/
```

**后台运行**

```bash
nohup jupyter notebook > jupyter.log 2>&1 &
```

**旧版本**

实在受不了7.0以上版本。删除所有已有的安装包重新安装旧版本。

```bash
$ pip uninstall jupyter notebook jupyter_contrib_nbextensions ...
$ rm -rf /usr/local/lib/python3.9/site-packages/jupyter*
$ rm -rf ~/.jupyter
$ rm /usr/local/bin/jupyter*

$ pip install notebook==6.0.0 # 建议6.0.0以上版本
$ pip install jupyter
$ pip install jupyter_contrib_nbextensions==0.7.0 # 最新版本，后面没维护了

$ jupyter-notebook --NotebookApp.token="" --NotebookApp.password="" # no pwd and token
```

然后就可以畅游旧版本了，错误全部忽略不管。
