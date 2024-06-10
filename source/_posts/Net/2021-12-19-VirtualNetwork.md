---
title: 虚拟网络指南
date: 2021-12-19 23:00:00
tags: [CS, Network, Virtual Network, NAT, Host-only, Bridge]
categories: Coding
---

问题的研究总是源于现实，这不，一直对虚拟机的几种网络懵懵懂懂，直到有个需求冒出来，这才想办法（有机会）一把撸掉。

业务背景描述：一台 Win10 的主机，跟了我很多年的 ThinkPad，只有 4 核 4G；由于工作、生活各种需要，里面用 VirtualBox 装了个 Ubuntu18 的虚拟机。平时写代码，跑个实验啥的就都在虚拟机上。突然需要在局域网多台终端上能够访问到虚拟机中的某个服务，自然少不了要一番配置，研究一天后终于把几个主流模式差不多搞清楚了，特记录如下。当然，尚有诸多细节留待日后继续研究。

先把官方文档的一张表放这里：

| Mode       | VM→Host | VM←Host  | VM1←→VM2 | VM→Net/LAN       | VM←Net/LAN |
| ---------- | ------- | -------- | -------- | ---------------- | ---------- |
| Host-only  | +       | +        | +        | —（共享网卡后+） | —          |
| Internal   | —       | —        | +        | —                | —          |
| Bridged    | +       | +        | +        | +                | +          |
| NAT        | +       | 端口转发 | -        | +                | 端口转发   |
| NATservice | +       | 端口转发 | +        | +                | 端口转发   |

表格来自：https://www.virtualbox.org/manual/ch06.html

<!--more-->

### 桥接模式

![](https://qnimg.lovevivian.cn/virtual-network-bridged.jpg)

一句话描述：虚拟机和主机共享真实上网的网卡，两者互通。

虚拟机 IP 地址一般在桥接网卡的同一子网内，自动获取。此时：

- 主机可以 ping 通虚拟机
- 虚拟机可以 ping 通主机
- 虚拟机之间可以 ping 通
- 主机可以上网，虚拟机也可以上网（如果不可以，需要配置一下 DNS 服务器）
- 虚拟机可以与主机同一网段内的其他主机互通

其他配置：

- 桥接网卡（界面名称）一定要选主机正在上网的网卡，根据[文档](https://www.virtualbox.org/manual/ch06.html)描述，这里貌似只能选物理卡
- 混杂模式：拒绝
- 勾选接入网线

虚拟机（主机是无线网时）需**手动配置IP 地址（与主机地址在同一网段）、网关和 DNS 服务器**。MAC 地址（与主机 MAC 一致），一般选择本模式后会自动一致，无须再次配置。

再次强调，如果主机有用的是无线网卡（wireless），由于不支持混杂模式，虚拟机和主机之间是无法 ping 通的，官方[文档](https://www.virtualbox.org/manual/ch06.html)和[论坛](https://forums.virtualbox.org/viewtopic.php?t=98133)都有相关描述。此时可以在登陆虚拟机后，将其物理（MAC）地址设置为无线网卡的地址，然后手动指定 IP 地址为和主机同一网段的其他地址，重新连接后即可桥接。这里的 IP 地址如果自动获取的话会得到和主机一样的 IP，因为 DHCP 会根据 MAC 地址分发 IP。这个技巧是在这篇博文中看到的：[How To Use Your Wireless Adapter With VirtualBox Bridge Mode – Revolution Digital](https://www.revolutionweb.com.au/computer-security/use-wireless-adapter-virtualbox-bridge-mode/)。

### NAT

![](https://qnimg.lovevivian.cn/virtual-network-nat.jpg)

一句话描述：主机被当做路由器，主机可通过端口转发访问虚拟机。

虚拟机的 IP 地址一般是 `10.0.2.x`，网关是 `10.0.2.2`，此时：

- 虚拟机可以 ping 通主机
- 主机 ping 不通虚拟机，如果要访问虚拟机，需要使用端口转发
  - 主机 IP 一般是 `127.0.0.1` 或者 `localhost`
  - 子系统 IP 指虚拟机
- 主机可以上网虚拟机也可以上网
- 虚拟机之间不通（NAT 网络是通的）
- 主机同一局域网的其他主机无法访问虚拟机，如需访问需要做服务和端口映射，此时主机 IP 可以写主机自己的 IP，这样其他局域网用户就可以通过该 IP 访问到虚拟机。但虚拟机可以访问到和主机同一网段内的其他主机。

其他配置：

- 混杂模式：拒绝
- 勾选接入网线

虚拟机 IP 地址等全部自动获取。这种模式比较常见，且基本能实现日常所需大多数网络需求。

### Host-only

![](https://qnimg.lovevivian.cn/virtual-network-host-only.jpg)

一句话描述：主机与虚拟机通过虚拟卡互通，仅主机可访问虚拟机。

虚拟机的 IP 地址一般是 `192.168.56.x`，有一张虚拟网卡 `192.168.56.1` 作为网关，此时：

- 虚拟机可以互相 ping 通
- 主机和虚拟机之间 ping 不通，因为虚拟网卡网段和主机往往不在一起，不过主机可以 ping 通虚拟网卡（`56.1` 网关），虚拟机也可以 ping 通虚拟网卡。
- 虚拟机自然也不可以上网
- 如果需要虚拟机和主机相互 ping 通且虚拟机可以上网，则需将主机的物理卡和虚拟卡在逻辑上连在一起，具体而言就是将上网的物理卡共享给界面名称选的那张虚拟卡。
- 还有可能需要在虚拟机上手动设置 IP 地址、网关和 DNS 服务器。
- 主机同一局域网的其他主机无法访问虚拟机，但虚拟机可以访问到和主机同一网段内的其他主机。

其他配置：

- 必须（也只能）选 Host-only 虚拟卡
- 混杂模式：拒绝
- 勾选接入网线

虚拟机 IP 地址等全部自动获取。另外需要说明的是，在实验过程中发现，如果主机重启了，可能需要重新共享一下，否则虚拟机无法自动获取 IP 地址，即使手动设置后也无法连接宿主机，可能来来回回配多了，导致虚拟网卡哪里有点问题。

### 参考资料

查了不少资料，中文的除了这两篇还可以（也有一些小坑要注意规避），其他的（尤其是 CSDN）我就不多说了。

- [虚拟机网络模型详解，看这篇就够了（图文并茂） - 云 + 社区 - 腾讯云](https://cloud.tencent.com/developer/article/1432433)
- [VirtualBox 网络设置 详解 VirtualBox 虚拟机网络环境解析和搭建 - NAT、桥接、Host-Only、Internal、端口映射_IT 技术_赛顿软件](http://www.systonsoft.com/article/292921.html)

