---
title: 机器之脑：树莓派初使用
date: 2021-07-01 23:00:00
categories: Coding
tags: [RaspberryPi, Tutorial]
mathjax: false
---


拖延症太厉害了，这次终于下定决心要把自己一直想做的小弟（同时兼小秘）给做起来，什么时候做好不知道，但不能不开始。第一步要整的就是大脑，用一块树莓派承载，里面慢慢给灌上各种软件和模型。本文主要整理记录树莓派初始配置操作，主要针对的是**远程 ssh 无屏幕连接无桌面版**树莓派（4B），请注意限制条件，其他的操作也类似。

<!--more-->

首先，应该有一个读卡器和内存卡，把操作系统烧进内存卡里，具体可以参考这里：[使用 Etcher 给 SD 卡安装树莓派系统 | 树莓派实验室](https://shumeipai.nxez.com/2019/04/17/write-pi-sd-card-image-using-etcher-on-windows-linux-mac.html)。如果卡里原来有东西，要先格式化，否则可能导致烧录失败。相关软件可以到这里下载：[树莓派资源下载 | 树莓派实验室](https://shumeipai.nxez.com/download)。

烧好后，第二步要配一下 wifi，配置方法比较多，推荐直接在烧好的系统 boot 目录下增加一个 `wpa_supplicant.conf` 文件（内容如下所示），然后把卡插到树莓派，启动电源后就可以自动登录并连接 wifi 了，之后就可以在同一个 wifi 环境下用另一台电脑远程 ssh 登录了。具体可以参考这里：[无屏幕和键盘配置树莓派 WiFi 和 SSH | 树莓派实验室](https://shumeipai.nxez.com/2017/09/13/raspberry-pi-network-configuration-before-boot.html)。

```bash
country=CN
update_config=1
ctrl_interface=/var/run/wpa_supplicant

network={
    scan_ssid=1
    ssid="your_wifi_name"
    psk="your_wifi_password"
}
```

这个文件在启动后会自动添加到 `/etc/wpa_supplicant/` 下，同时还有一些其他的配置文件生成。另外，印象中烧好后 `/boot` 目录下就有一个空的名为 ssh 的文件夹，就不用创建了，如果没有的话自己创建下就行。树莓派在后面的版本都支持这种方式自动启用 ssh 服务。

接下来，第三步就是登陆了，在自己的电脑上（此处以类 Unix 系统为例）登陆：

```bash
ssh pi@raspberrypi.local
```

这个地址是固定的，pi 是默认用户名，密码默认是 raspberry，登陆后如图所示：

![](http://qnimg.lovevivian.cn/practice-raspberrypi-1.jpg)

注意，root 用户需要修改密码后才能使用：

```bash
$ sudo passwd root
```

另外，也可以参考 [AINLP GPU 使用体验指南 | Yam](https://yam.gift/2019/12/09/Help/2019-12-09-AINLP-GPU-Guide/) 配置一下免密码（把公钥加到树莓派的 authorized_keys 里面）登陆。

接下来的操作就把它当做一个 Linux 系统来就行了，不过还是有一些特殊的命令的，可以参考这个 CheatSheet：[Linux Cheat Sheet]()。另外，[热门内容和标签 | 树莓派实验室](https://shumeipai.nxez.com/hot-explorer#beginner) 里面的《新手指南》PDF 可以读一下，是个很不错的入门指南。

最后，就是让它用起来更好用一些，为此，我们需要大致做以下一些事情（和第一次整 Linux 一样）。

**更新国内源**

要注意不同的操作系统及版本，对应的源都不一样。这里以清华大学源为例：[清华大学开源软件镜像站 | Tsinghua Open Source Mirror](https://mirrors.tuna.tsinghua.edu.cn/)，搜索框输入 ras 就可以看到 `raspbian` 了，点旁边的那个问号进去找到对应的 Linux 版本。如果要查看自己树莓派的 Linux 版本，可以使用如下命令：

```bash
$ lsb_release -a
No LSB modules are available.
Distributor ID:	Raspbian
Description:	Raspbian GNU/Linux 10 (buster)
Release:	10
Codename:	buster
```

配置方式上面都有，修改对应文件复制粘贴进去即可。注意编辑文件时需要加 `sudo` 命令。最后执行以下更新命令：

```bash
$ sudo apt-get update
```

**配置 Locale、键盘布局**

可以在 `sudo raspi-config` 里面配置，也可以直接编辑 `/etc/default/locale`：

```bash
LANG=en_GB.UTF-8
LC_ALL=en_GB.UTF-8
LANGUAGE=en_GB.UTF-8
```

如果要显示中文可以参考这里：[如何让树莓派显示中文？ | 树莓派实验室](https://shumeipai.nxez.com/2016/03/13/how-to-make-raspberry-pi-display-chinese.html)，主要就是安装个中文字体，然后将 LANG 改成中文的：

```bash
$ sudo apt-get install ttf-wqy-zenhei
# LANG=zh_CN.UTF-8
```

因为我们不需要桌面版，所以也不用安装输入法，只要能显示中文字体就行。

键盘布局也可以在 config 里面配置，或者编辑 `/etc/default/keyboard`：

```bash
XKBLAYOUT="us"
```

**换 Shell**

当然是使用 zsh 无疑了，插件选择就多了，这里有个测评可以关注一下：[(2) A comparison of all the ZSH plugin mangers I used : zsh](https://www.reddit.com/r/zsh/comments/ak0vgi/a_comparison_of_all_the_zsh_plugin_mangers_i_used/)

- 安装 zsh：[Installing ZSH · ohmyzsh/ohmyzsh Wiki](https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH)
- 安装 ohmyzsh：[ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)

然后配置一下插件，比如：git debian z fd ripgrep jsontools vi-mode 等，需要注意的是这里有些插件只是增加了一些快捷方式，真正要实现插件功能是需要安装具体插件的，比如 z fd 和 ripgrep。可以参考 wiki 页面。然后配置一下主题，默认是【robbyrussell】，可以使用随机模式。

至此，一些基本配置也结束了，如果有其他个性化需要，大部分按 Linux 处理就行，不再赘述。关于最后这步配置的，可以参考这里：[hscspring/AIToolBox: My AI Basic Tool Box](https://github.com/hscspring/AIToolBox)。

