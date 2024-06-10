---
title: AINLP GPU 使用体验指南
date: 2019-12-09 21:00:00
categories: Feeling
tags: [Computer, ssh, GPU]
---

[AINLP-DBC GPU](https://gpu.ainlp.cn/home) 是一个 GPU 算力服务平台，采用 DBC TOKEN 进行结算。在这里可以租用 GPU，也可以将自己的 GPU 出租出去。

## 注册

第一步：[创建钱包](https://gpu.ainlp.cn/gpu/myWallet)

这里需要输入密码，之后会产生一个加密后的私钥文件，下载继续后会产生你真正的私钥。一定要记住你的密码并在物理介质上保存好加密后的私钥文件以及你的私钥。只有通过密码+加密的私钥文件，或者私钥才能打开你的钱包，如果都丢了，就等于你的钱包没了。

第二步：充值 DBC

点击 “如何购买 DBC” 链接，选择自己喜欢的方式充值即可，推荐使用支付宝，点击 “继续” 后，充值一定金额（比如 1块或者 0.1 块）就好了。这步其实就是给你的钱包地址充值一定数额的 DBC。大概等个几十秒就能在 “我的钱包” 里看到你购买金额对应的 DBC 数量了。

第三步：[绑定邮箱](https://gpu.ainlp.cn/gpu/myMachineUnlock)

点击 “绑定邮箱” 后，输入邮箱地址，会给你发送一个类似 `请输入如下数量dbc:0.7311,验证有效期为30分钟` 内容的邮件，将对应的额度（比如这里的 0.7311）输入 “验证的 DBC 数量” 框即可完成绑定。

第四步：[选择机器](https://gpu.ainlp.cn/gpu/list)

在列表中选择一台符合自己要求的机器，点击 “租用” 后，填写租用时长（最短 1 小时），等待大约 1 分钟左右（验证机器环境），确认支付后就可以正式使用了。

<!--more-->

## 使用

在使用之前有一点必须先特别强调下：当你所用的机子过了租用时间后，你是【**没办法再登陆的**】。所以一定要及时做好相关文件的保存、传输（后面会说到具体方法，邮件中也有这块内容），别训练了半天最后啥都没了。

当支付成功后，会有一封邮件发送到你的邮箱，这封邮件里包含了很多信息，主要包括：

- 机器的 SSH 登陆信息
- 环境配置信息
- 注意事项
- 常见问题汇总

> 需要说明下，下面所有 **“本地机器”** 的操作都是在 Mac 下执行的，Linux 应该类似，Windows 可能会稍微不同，大家注意按需调整。

### 登陆 ssh

```bash
$ ssh -p 52909 root@110.80.33.140
The authenticity of host '[110.80.33.140]:52909 ([110.80.33.140]:52909)' can't be established.
ECDSA key fingerprint is SHA256:Nsub+uKd2LK7XmjB/n91gRXNk2sJOAX7PnXF7vZkhWU.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '[110.80.33.140]:52909' (ECDSA) to the list of known hosts.
root@110.80.33.140's password:
```

这里先输入 yes，然后输入邮件中的密码，就可以直接登陆到远程机器里面了。接下来，这台机子就是你的了。你可以把它当做自己的本地电脑一样使用。

如果你租用的时间不长，那密码改不改问题不大，否则你需要修改一下登陆密码：

```bash
$ passwd root
```

然后输入你的新密码即可。`exit` 退出后，应该可以用你的新密码重新登陆了：

```bash
$ ssh -p 52909 root@110.80.33.140
```

如果你租用的时间非常非常长，那你可能需要把你自己本地的公钥添加到远程机器，这样每回也不用输入密码了。首先你看自己的 `~/.ssh/` 目录下面有没有类似 `id_rsa.pub` 这样的文件，如果有的话，这个文件就是你的公钥了。如果没有，你需要生成一下自己的公钥：

```bash
$ ssh-keygen
```

按提示就可以生成了。默认会在刚刚提到的目录下面生成一个 `id_rsa.pub` 的文件，把文件内容复制粘贴到服务器的 `~/.ssh/authorized_keys` 里面即可，复制完成后，该文件看起来是这样的：

```bash
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDlIDJhabMAPo2Gxxx..... xxxxx@gmail.com
ssh-rsa
```

这里可以添加多个 key，你要是有多台需要登录的本地机子，可以把它们的 public key 都放到这里，每个一行。此时你就可以不用密码直接登录了：

```bash
$ ssh -p 52909 root@110.80.33.140
```

如果你还觉得输入的东西太长，可以给远程机器配置一个别名，具体来说，在本地的 `~/.ssh` 目录下新建一个 `config` 文件，然后输入下面的内容保存：

```bash
Host remote # 随便起个什么名字都可以，我这里起了个 remote
HostName 110.80.33.140
User root
Port 52909
```

这时候，你就可以用你起得名字登陆了，效果就是下面这个样子：

```bash
$ ssh remote
Welcome to Ubuntu 16.04.4 LTS (GNU/Linux 4.4.0-169-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage
Last login: Mon Dec  9 19:22:05 2019 from 125.119.237.196
(base) root@7977d9bc0881:~#
```

### 查看配置

首先，我们讲一下 Screen，这里有一份教程可以了解下：[linux 技巧：使用 screen 管理你的远程会话](https://www.ibm.com/developerworks/cn/linux/l-cn-screen/index.html)，如果觉得教程太长，那只要记住下面几个命令即可：

```bash
# 创建：screen -S name（随便输一个名字）
# 查看：screen -ls
# 进入：screen -r name（随便输的那个名字）
# 退回到命令行，让程序在 screen 后台自动运行：Control + a + d
```

先查看一下，就会发现已经有一个在运行的 screen 了，这个可以理解，其实就是邮件中给的那个 jupyter notebook。这里我们可以创建很多个 screen，比如创建两个：

```bash
$ screen -ls
There are screens on:
	6541.another    (12/09/19 19:33:02)	(Detached)
	5939.new	(12/09/19 19:32:29)	(Detached)
```

然后我们可以进入自己创建的 screen，注意如果用 `exit` 退出的话就彻底退出这个 screen 了。

当然，我们还可以再创建一个 jupyter notebook：

```bash
$ screen - S jp
$ jupyter-notebook password # 设置一个密码
$ nohup jupyter notebook --ip 0.0.0.0 --port 8889 --no-browser --allow-root > jupyter.log 2>&1 & # 注意换一个端口
```

然后在邮箱中给的那个 jupyter notebook 的端口上加 1，输入刚刚设置的密码，就可以登录新的 jupyter notebook 了：

![](http://qnimg.lovevivian.cn/jupyter-notebook-screen-snapshot-1.jpeg)

接下来看一下 GPU 的配置，有个最基本的命令：

```bash
$ nvidia-smi

Mon Dec  9 19:35:02 2019
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 430.50       Driver Version: 430.50       CUDA Version: 10.1     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  P102-100            On   | 00000000:02:00.0 Off |                  N/A |
| 71%   35C    P8     8W / 250W |      0MiB / 10156MiB |      0%      Default |
+-------------------------------+----------------------+----------------------+

+-----------------------------------------------------------------------------+
| Processes:                                                       GPU Memory |
|  GPU       PID   Type   Process name                             Usage      |
|=============================================================================|
|  No running processes found                                                 |
+-----------------------------------------------------------------------------+
```

然后是机器的监控信息，我们一般使用 [htop](https://github.com/hishamhm/htop)，不过需要安装一下：

```bash
$ apt-get install htop
$ htop
```

大概就长这个样子（退出按 q 即可）：![](http://qnimg.lovevivian.cn/htop-screen-snap-1.jpeg)

Linux 下面还有很多工具，这块不是重点，如果对相关的内容感兴趣，可以看[这里](https://github.com/hscspring/AIToolBox)。

其他一些配置相关的查看可以查看邮件中的【常见问题汇总】。

### 文件同步

推荐使用 [libfuse/sshfs: A network filesystem client to connect to SSH servers](https://github.com/libfuse/sshfs)，直接把远程机器上的文件夹挂载到本地，当然首先你需要根据 README 在本地机器上安装好，然后就很简单了：

```bash
# remote_gpu 是我随便建的一个文件夹，你可以挂载到任意文件夹
$ sshfs -p 52909 root@110.80.33.140:/root/code ~/Documents/remote_gpu
```

这样你就把远程机器的 `/root/code/` 目录挂载到本地机器的 `~/Documents/remote_gpu` 下了。如果你想取消挂载也很简单（注意不能在该目录执行，随便换个其他目录即可）：

```bash
$ umount ~/Documents/remote_gpu
```

一旦你挂载好了，这两台机器的文件夹就可以看做同一个文件夹了，无论你在哪边操作，另外一边都会发生相同的变更。比如我在本地把一个文件复制到 `~/Documents/remote_gpu` 里面，实际上相当于直接传输到远程机器的 `/root/code` 下面。

这里需要注意三点：

- 操作会有延时，肯定没有你本地复制文件夹那么快。
- 如果文件很大，强烈建议`压缩后`传输同步。也就是说，你可以只把训练完成后需要的文件压缩后，放到这个同步目录，这样可以省时间。
- 远程机器到时间后会强制自动退出，此时本地机器的文件也会丢失（因为它本质还在远程），所以记得及时把文件复制到本地。最简单的方法是用 [Crontab](https://tecadmin.net/crontab-in-linux-with-20-examples-of-cron-schedule/) 创建个定时复制任务（如果碰到创建不成功的情况，可以看看[这个](https://stackoverflow.com/questions/22743548/cronjob-not-running)）。

当然，如果你觉得很麻烦的话，也可以直接用 scp，这个更简单，可以参考这里：[Linux SSH 远程文件传输命令 scp - VPS 侦探](https://www.vpser.net/manage/scp.html)。如果想同步到云盘的，可以参考邮件中的【常见问题汇总】。

## 小结

这是一个远程服务器使用的小小指南，主要针对那些对类 Unix 操作系统不太熟悉的同学，这些内容也只能算是非常基础的入门知识了。[AINLP](https://gpu.ainlp.cn/home) 推出的这个服务无论使用还是性价比都是值得推荐的：对前者，在你购买时长期间内，这台机器等于完全是你独占的，你可以随意 DIY 这台机子；对后者，大部分机器的价格都是 1.5 元/小时 的样子，配置低一些的只要 0.5元/小时 左右，这个价格在目前是相当有竞争力的，说实话电费可能都不止这个价。