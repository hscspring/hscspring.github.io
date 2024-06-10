---
title: Unix Cheat Sheet
date: 2021-07-02 23:00:00
categories: Coding
tags: [Unix, Linux, Raspberrypi]
mathjax: false
---

Unix & Linux 相关备忘。

<!--more-->


## Linux通用

```bash
# 操作系统
uname -a
# LSB 和特定版本的相关信息
lsb_release -a
cat /etc/os-release
# cpu
cat /proc/cpuinfo | grep 'core id'
sudo lshw -class processor
sudo dmidecode -t 4
ncpu
lscpu
# 上传下载
sftp user@host # get, put 方法
scp
# 帮助
whatis
man
info
# 设置时间
sudo date --set "2021-07-01 01:00:00" 
sudo date -s "2021-07-01 01:00:00"
# IP地址查询
dns-sd -q google.com
# 查找
find
locate
# 进程
ps -eo pid,command  # -e 列出全部进程 -o 输出格式
# 按指定列排序

ps aux | awk '{print $1, $2, $3, $11}' | sort -n -k3 -r | head -n 10
# 重定向
ls 1> output.log 2> error.log # 1是标准输出 2是错误
ls &> output_error.log # &标准输出+错误
grep abc < content # 重定向 grep 的标准输入来自 content
grep abc < content &> out_error.log
# 管道
grep xxx < input.txt | sort # input中包含 xxx 的行按字母表排序

# 文本搜索
# -r recursive; -n line number; -w whole word match; -l lower-case -e pattern
grep -rnw 'path/to' -e 'pattern'
# --include/exclude/exclude_dir
grep --include=\*.{c,h} -rnw '/path/to/somewhere/' -e "pattern"
grep --exclude=\*.o -rnw '/path/to/somewhere/' -e "pattern"
grep --exclude-dir={dir1,dir2,*.dst} -rnw '/path/to/search/' -e "pattern"

# nvidia-smi
nvidia-smi -l 5 # 5秒刷新一次（推荐）
watch -n 1 -d nvidia-smi # 1秒刷新，只改中间数字

# 用户/组
sudo adduser xxx
sudo deluser --remove-home xxx
su xxx # 切换成用户xxx
sudo groupadd yyy # 创建用户组
sudo groupdel yyy
groups [xxx]  # 查看组，xxx 表示用户名
id [xxx] # 查看id
/etc/passwd # user:passwd:uid:gid:description:userdir:shell
/etc/group # gname:gpasswd:gid:userlist
# 文件
Owner/OwnerGroup/Other # 三级权限
chown # 改变文件的 Owner 和 OwnerGroup
chmod # 改变文件权限标志；444 表示三类用户权限；4读取 2写入 1执行，求和
# 删除某个日期之前的
find . ! -newermt "2020-05-29 00:00:00" | xargs rm -rf
# 删除某个日期之后的
find . -maxdepth 1 -type f -newermt "2024-04-26" -exec rm {} \;
# 删除某个端口
sudo lsof -i tcp:2222 | grep ssh  | awk '{print $2}' | xargs kill -9
sudo fuser -k 5000/tcp
# 隧道
ssh -N -f -L localhost:3307:192.168.1.51:3306 username@host -i file
```

### 防火墙

```bash
# firewall防火墙
systemctl status firewalld       # 查看状态
systemctl start firewalld
firewall-cmd --list-ports       # 查看放行端口
firewall-cmd --reload           # 重启
firewall-cmd --zone=public --add/remove-port=80/tcp --permanent 	# 开放端口，参数分别为：作用域、端口格式、永久生效
systemctl start/stop firewalld.service
systemctl disable firewalld.service      # 禁止开机启动

# iptable防火墙
service iptables status
service iptables stop            # 关闭
service iptables save            # 保存规则
iptables -L -n -v                # 查看规则
iptables -F                      # 清空规则
iptables -A INPUT/OUTPUT -p tcp --dport 80 -j REJECT/ACCEPT # 禁止/允许端口80访问/出去的数据包
systemctl start iptabels         # 打开
systemctl enable iptables        # 开机启动
systemctl disable iptables       # 开机关闭
```

- https://www.fosslinux.com/134387/iptables-vs-firewalld-choosing-your-linux-firewall-solution.htm

实践时可以同时使用，也可以使用其中一个（`firewall-cmd`是`iptables`在Red Hat系列发行版的抽象工具），可以的话同时配置Nginx白名单。

```bash
# firewall
firewall-cmd --list-all
firewall-cmd --list-all-zones
# 外网开一个访问端口
firewall-cmd --zone=public --add-port=<external_port>/tcp --permanent
# 开一个白名单
firewall-cmd --permanent --add-source=<external_host> --zone=public --add-service=http
firewall-cmd --zone=internal --remove-source=121.41.67.83 --permanent
# 内网访问2个端口
firewall-cmd --zone=internal --add-port=<internal port1>/tcp --permanent
firewall-cmd --zone=internal --add-port=<internal port2>/tcp --permanent
firewall-cmd --reload

# 删除当前所有的端口访问规则
firewall-cmd --zone=public --remove-service=ssh --permanent   # 举例：删除SSH服务的访问规则，如有其他服务也一并删除
firewall-cmd --zone=public --remove-port=1-65535/tcp --permanent   # 删除所有端口访问规则
firewall-cmd --reload   # 重新加载防火墙规则使其生效

# 添加允许访问 1234 端口的规则
firewall-cmd --zone=public --add-port=1234/tcp --permanent   # 添加对 1234 端口的访问规则
firewall-cmd --reload   # 重新加载防火墙规则使其生效
```

保持所有其他端口关闭。

```bash
iptables -P FORWARD DROP
iptables -A INPUT -p tcp --dport <external port> --src <whitelist host1> -j ACCEPT
iptables -A INPUT -p tcp --dport <external port> -j DROP
iptables -L -n -v
service iptables save
```

关掉「转发」，设置白名单可访问，其他全部拒绝。上面的设置也可以通过添加一个来实现：

```bash
iptables -N <custom_name>
iptables -A <custom_name> --src <whitelist host1> -j ACCEPT
iptables -A <custom_name> -j DROP
iptables -I INPUT -m tcp -p tcp --dport <external port> -j <custom_name> 
```

### Nginx

```bash
#  nginx: [emerg] bind() to 0.0.0.0:80 failed (13: permission denied)
sudo semanage port -l | grep http_port_t
sudo semanage port -a -t http_port_t  -p tcp 8000


allow 45.43.23.21;
allow 44.23.13.10;
deny all;

server
{
	allow 45.43.23.21;
	deny all;
	server_name: www.host.com;
    location /api/ {
    	allow 45.43.23.0/24;
  		deny all;
        proxy_pass http://127.0.0.1:8000; # 配置1
        proxy_pass http://127.0.0.1:8000/; # 配置2
    }
}
# 请求 http://www.host.com/api/method/ 时
# 配置1 => http://127.0.0.1:8000/api/method/
# 配置2 => http://127.0.0.1:8000/method/
# 配置1会拼接location，配置2会忽略location。
```

`proxy_pass` 在是否有`/`的情况下工作方式不同：

- https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass
- https://dev.to/manthanank/nginx-cheatsheet-a-quick-reference-guide-o0m

白名单可以设置在任意位置，表示不同的scope配置。

### SSH

```bash
# 白名单
vim /etc/ssh/sshd_config
AllowUsers username@whitelist_ip1 username@whitelist_ip2 ...
sudo systemctl restart sshd
```

### Centos自定义安装

```bash
# 搜索
yum search
https://pkgs.org/

# 下载
yumdownloader --destdir ~/rpm --resolve vim-common

# 解压/安装
cd /path/to/your/centos && rpm2cpio /path/to/x.rpm | cpio -id
# rpm2cpio outputs the .rpm file as a .cpio archive on stdout.
# cpio reads it from from stdin
# -i means extract (to the current directory)
# -d means create missing directory

# 配置环境变量
export PATH="/usr/tmp/centos/usr/sbin:/var/tmp/centos/usr/bin:/var/tmp/centos/bin:$PATH"
export MANPATH="/var/tmp/centos/usr/share/man:$MANPATH"
L='/lib:/lib64:/usr/lib:/usr/lib64'
export LD_LIBRARY_PATH="/var/tmp/centos/usr/lib:/var/tmp/centos/usr/lib64:$L"
```

- [How to install packages in Linux (CentOS) without root user with automatic dependency handling? - Stack Overflow](https://stackoverflow.com/questions/36651091/how-to-install-packages-in-linux-centos-without-root-user-with-automatic-depen)

## Raspberrypi

```bash
# CPU info
lscpu
# 内存
free -h
# 内存和交换内存
free -g
# 列出所有的 PCI 硬件
lspci | grep -e "NVIDIA"
# 磁盘
sudo fdisk -l
# USB
lsusb
# 各种配置
sudo raspi-config
# 更新固件
sudo rpi-update
# 温度
vcgencmd measure_temp
# 核心电压
vcgencmd measure_volts core
# 开机启动 /etc/init.d
vim /etc/init.d/test # 创建脚本
sudo service test start # 脚本切换状态
sudo update-rc.d cron defaults # 软链接
# 蓝牙
bluetoothd -v # 版本
systemctl status[start/stop/enable] bluetooth # 状态/启动/停止/开启启动
bluetoothctl # 进入蓝牙 Shell
list # 显示可用的蓝牙模块
scan on # 开启扫描
devices # 打印扫描到的蓝牙设备和 MAC 地址、名称
sudo hciconfig hci0 up[down] # 启动/关闭蓝牙模块，hci0 指 0号HCI设备（树莓派的蓝牙适配器）
hcidump # 蓝牙设备工作日志
# 摄像头
raspistill -o image.jpg
raspivid -o video.h264 -t 10000  # 10000ms = 10s
# 进程树
pstree
```

## Errors

- [git - "error: gnutls_handshake() failed" when connecting to https servers - Ask Ubuntu](https://askubuntu.com/questions/186847/error-gnutls-handshake-failed-when-connecting-to-https-servers)
- [linux - What is difference between arm64 and armhf? - Stack Overflow](https://stackoverflow.com/questions/37790029/what-is-difference-between-arm64-and-armhf)

