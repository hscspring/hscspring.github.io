---
title: Programming Language Environment Cheat Sheet
date: 2024-03-06 23:00:00
categories: Feeling
tags: [Python, Rust, NodeJS]
mathjax: false
---

编程语言环境相关备忘（我只想复制粘贴）。

<!--more-->

## Python

```bash
# ~/.condarc
channels:
  - defaults
show_channel_urls: true
default_channels:
  - http://mirrors.aliyun.com/anaconda/pkgs/main
  - http://mirrors.aliyun.com/anaconda/pkgs/r
  - http://mirrors.aliyun.com/anaconda/pkgs/msys2
custom_channels:
  conda-forge: http://mirrors.aliyun.com/anaconda/cloud
  msys2: http://mirrors.aliyun.com/anaconda/cloud
  bioconda: http://mirrors.aliyun.com/anaconda/cloud
  menpo: http://mirrors.aliyun.com/anaconda/cloud
  pytorch: http://mirrors.aliyun.com/anaconda/cloud
  simpleitk: http://mirrors.aliyun.com/anaconda/cloud

# 不同步
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/linux-64/
conda config --set show_channel_urls yes


conda config --show
conda remove package
conda env remove --name <env_name>
conda create --name myclone --clone myenv
conda create --prefix=path_tgt --clone /path/to/src
conda create -n venv_name python=3.11

# ~/.pip/pip.conf
[global]
index-url = https://mirror.baidu.com/pypi/simple

[install]
trusted-host = mirror.baidu.com
               pypi.ngc.nvidia.com
```

## Cuda

```bash
# Centos8
sudo rpm -i cuda-repo-rhel8-12-2-local-12.2.2_535.104.05-1.x86_64.rpm
sudo dnf -y module install nvidia-driver:535-dkms
sudo dnf -y install cuda-12-2

# Ubuntu
cat /usr/include/x86_64-linux-gnu/cudnn_v*.h | grep CUDNN_MAJOR -A 2
# Centos8
cat /usr/include/cudnn_version.h | grep CUDNN_MAJOR -A 2
```

- https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html#driver-installation
- https://developer.nvidia.com/cuda-12-2-2-download-archive?target_os=Linux&target_arch=x86_64&Distribution=RHEL&target_version=8&target_type=rpm_local
- https://www.dell.com/support/kbdoc/en-us/000216077/how-to-install-nvidia-driver-in-rhel

## Rust

```bash
# ~/.cargo/config
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"

# 替换成你偏好的镜像源
replace-with = 'ustc'

# 清华大学
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"

# 中国科学技术大学
[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"

# 上海交通大学
[source.sjtu]
registry = "https://mirrors.sjtug.sjtu.edu.cn/git/crates.io-index"
```

## NodeJS

```bash
nvm ls
nvm use <version>
```

