---
title: 机器之眼：树莓派摄像头
date: 2021-07-03 23:00:00
categories: Coding
tags: [RaspberryPi, Camera, ffmpeg, vlc, motion]
mathjax: false
---

如果把树莓派比作机器人的大脑，那么摄像头相当于机器人的眼睛，我们需要使用摄像头不间断获取图片或视频流，然后通过图像识别技术判断「眼前」的物品/人，进而做出一些响应。目前已调通，可以通过摄像头获取实时画面，所以赶紧记录一下。

<!--more-->

硬件安装可以参考[视频演示如何给树莓派安装摄像头模块 | 树莓派实验室](https://shumeipai.nxez.com/2013/10/07/raspberry-pi-to-install-the-camera-module.html)，其实很简单，把摄像头带状线缆插到板子对应位置上就行。然后在 `sudo raspi-config` 中启动摄像头，此时，已经可以使用摄像头进行拍照或录制视频了，命令：

```bash
$ raspistill -o image.jpg
$ raspivid -o video.h264 -t 100000
```

接下来是让摄像头持续获取实时画面，也是本文重点记录的内容。主要包括三个工具的介绍，分别是：VLC、FFMEG 和 Motion。

### VLC

先安装：

```bash
$ sudo apt-get install vlc
```

然后使用 http 协议传输：

```bash
$ raspivid -o - -t 0 -n -vf -w 640 -h 480 -fps 15|cvlc -vvv stream:///dev/stdin --sout '#standard{access=http,mux=ts,dst=:8160}' :demux=h264
```

几个重要参数：

- fps 帧率
- -t 0 无延时
- -n 不显示预览窗口
- -vf -hf 垂直、水平翻转

注意，如果已经开了 motion，要先关掉：

```bash
$ sudo /etc/init.d/motion stop
```

这时候，任何一个和树莓派处于同一内网的设备都可以用 VLC 之类的设备通过访问树莓派地址加上面的端口来接收视频流了。比如我用自己的 Mac，打开 VLC，填好地址：

![](http://qnimg.lovevivian.cn/raspi-camera-0.jpg)

效果如图：

![](http://qnimg.lovevivian.cn/raspi-camera-1.jpg)

当然，也可以推送 rtsp 流，输出换成 rtsp 相关的即可：

```bash
$ raspivid -o - -t 0 -n -vf -w 640 -h 480 -fps 15|cvlc -vvv stream:///dev/stdin --sout '#rtp{sdp=rtsp://:8160/}' :demux=h264
```

访问地址要注意修改为：`rtsp://host:port/`，特别注意不要少写了最后那个斜杠 `/`，上面的 http 没关系。

效果如图：

![](http://qnimg.lovevivian.cn/raspi-camera-2.jpg)

关于两者的对比看下这篇文章：[Remlab: Video on Demand: RTSP vs HTTP](https://www.remlab.net/op/vod.shtml)。

接下来试一下直播推流，这个首先要在自己的电脑上起一个推流服务器，然后把树莓派的视频流推到服务器上，再用电脑的客户端访问电脑服务器上的（直播）视频。

```bash
# 本机启动推流服务器
$ docker run -it --rm -p 1935:1935 --name nginx-rtmp tiangolo/nginx-rtmp
# 树莓派上启动推流
$ raspivid -o - -t 0 -n -vf -w 640 -h 480 -fps 15 | cvlc -vvv stream:///dev/stdin --sout '#standard{access=rtmp,mux=ffmpeg{mux=flv},dst=rtmp://192.168.0.124:1935/live}' :demux=h264
```

注意这里的 dst 就是本机刚刚启动的推流服务器地址。成功播放（直播）流：

![](http://qnimg.lovevivian.cn/raspi-camera-3.jpg)

注意，此时播放器的地址 host 是「127.0.0.1」。

### FFMPEG

FFMPEG 可以做与 VLC 同样的事情，而且可以直接从摄像头读到数据流。我们以直播推流为例：

```bash
$ ffmpeg -f video4linux2  -r 12 -s 640x480 -i /dev/video0 -vcodec libx264 -f flv -vf vflip rtmp://192.168.0.124/live/
```

效果如图：

![](http://qnimg.lovevivian.cn/raspi-camera-4.jpg)

推流服务默认端口是 1935，所以如果本机 Server 是 1935 的话，推流时可以不写端口号，否则要写 Server 对应的端口号。

FFMPEG 还支持一个输入多个输出，可以同时推流和录制。FFMPEG 对我们后面的应用非常重要，以为它支持 Python 包调用，我们需要精确控制摄像头什么时候拍摄，拍多少张等等。

Python 包：

- [wchill/ffmpy3: Pythonic interface for FFmpeg/FFprobe command line](https://github.com/wchill/ffmpy3)
- [kkroening/ffmpeg-python: Python bindings for FFmpeg - with complex filtering support](https://github.com/kkroening/ffmpeg-python)

需要注意的是，使用 Python 包的前提是已经在系统里安装好了 ffmpeg。

### Motion

Motion 是轻量级的监控软件，有动作捕捉功能——当画面发生变动时，保存当时的图片和视频；当然，如果画面没动，就不用保存。

安装使用 apt，然后是一些配置（可根据需要灵活抉择）：

- 启动后台守护进程：
    - 修改 `/etc/default/motion`，更改设置： `start_motion_daemon=yes`
    - 修改 `/etc/motion/motion.conf`，更改设置：`daemon on`
- 其他配置也都在 `/etc/motion/motion.conf`
    - 只有树莓派自己可以看到流媒体：`stream_localhost off`
    - 流媒体帧速率最大值（每秒）：`stream_maxrate 30`，表示每秒 30 帧
    - 动作捕捉阈值：`threshold 1500`，有超过阈值的像素点发生变化则认为有动作发生
- 启动：`sudo service motion start`

启动后，就可以在局域网其他机器上用浏览器打开：`host:8081` 看到实时拍摄的视频流了。这里的 8081 是默认端口，可以在配置文件中自行配置（stream_port）。如果画面有变化，捕捉到的图片和视频存储在默认目录：`/var/lib/motion` 下面，也可以在配置文件中修改（target_dir）。

### Reference

- [树莓派开始，玩转 Linux (豆瓣)](https://book.douban.com/subject/30259573/)
- [(19) Raspberry Pi stream camera video using raspivid in rtsp protocol, view in Android using VLC app. - YouTube](https://www.youtube.com/watch?v=-K2ETC9mmFY)
- [树莓派监控（3）— 树莓派监控推流和保存 – cc's blog](https://www.ccarea.cn/archives/693)
- [大概是最简单的 rtmp 推流服务器搭建方法 - 知乎](https://zhuanlan.zhihu.com/p/52631225)
