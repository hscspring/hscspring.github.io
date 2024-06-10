---
title: Ubuntu16.04 安装 VirtualBox & Vagrant 管理 VirtualBox 各种问题总结
date: 2016-09-04 20:59:08
tags: [Ubuntu, VirtualBox, Vagrant]
categories: Feeling
---

## Ubuntu 下安装 VirtualBox

- [Ubuntu下轻松安装virtualbox](http://blog.csdn.net/flm2003/article/details/8168628)

注意：  
- 务必要仔细查看用户手册上对系统和必要环境的依赖。
- 如果 kernel header 不一致，需要更新 kernel：  
  - `sudo apt-get install linux-headers-generic` 或者  
  - `sudo apt-get install linux-headers-$(uname -r)`  
  `uname -r` 等于你的版本内核，比如我的：`4.4.0-21-generic`
- 如果不能[重装VBox](http://askubuntu.com/questions/762136/cannot-reinstall-virtualbox-on-ubuntu-16-04)，需要修改BIOS设置：  
  - Security 中的 Secure Boot 设置为“Disabled" （一般设置这个就可以了吧）
  - Startup中的 UEFI/Legacy Boot 选 Both
  - Priority 选 Legacy First，CSM Support 选 Yes
  包括类似 Surface Pro，都可以这样操作。
  另外，由于现在的主板很多都带有 UEFI Secure Boot 功能，可能导致使用USB设备启动不了系统。用此方法也可以搞定。
  参考至： [电脑无法从USB启动可能是 UEFI Secure Boot 在捣鬼！](http://blog.csdn.net/tanaya/article/details/8846779)



## 使用 Vagrant 管理 VirtualBox

- [Vagrant：程序员的VirtualBox](http://wp.fungo.me/linux/vagrant-for-programmer-ch1.html)  

注意：  

- 如果在 `vagrant up` 时碰到[VirtualBox is complaining that the kernel module is not loaded](https://github.com/lynnaloo/xtuple-vagrant/issues/13)，可能需要这个命令：  
  - `sudo /usr/lib/virtualbox/vboxdrv.sh setup`  
  注意此命令支持Ubuntu15.0，16.0，其他版本不一定支持。  
  - 或者 `sudo /etc/init.d/vboxdrv setup`  
  参见：[vagrant-virtualbox-failed](https://gist.github.com/geraldvillorente/977d16624e079ba12741)  
- 如果输入在 `vagrant up` 时出现以下错误，可能需要重新安装  vagrant，地址在这里：[vagrantup](http://www.vagrantup.com/downloads.html)   

```
$ vagrant package
No usable default provider could be found for your system.  

$ vagrant package --base vagrant-ubuntu64
Vagrant has detected that you have a version of VirtualBox installed that is not supported by this version of Vagrant.   
Please install one of the supported versions listed below to use Vagrant: 4.0, 4.1, 4.2, 4.3, 5.0

```
   可参考这两个地方：  
   - [Unable to vagrant up - how to set “providers”](http://stackoverflow.com/questions/29450437/unable-to-vagrant-up-how-to-set-providers)
   - [Make Virtualbox 5.1 final version compatible](https://github.com/mitchellh/vagrant/issues/7578)  
