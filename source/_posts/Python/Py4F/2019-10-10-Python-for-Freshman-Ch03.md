---
title: Python 小白快速从入门到放弃：使用框架
date: 2019-10-10 23:00:00
categories: Coding
tags: [Python, Django]
---

随着学习的不断深入，我们肯定会越来越不满足只在 Jupyter Notebook 中写一些小任务。我们可能会希望做一个 Web 应用，或者一个小程序，甚至是一个 APP。对于这种系统性的工程项目，框架就必不可少了，它可以极大地提高我们的效率。这节课我们就以 Python 的 Django 框架为例来开发一个小的 Web 应用程序。

<!--more-->

## Django 简介

Python 的 Web 框架有很多个，各有特色，很难说哪个比其他的有绝对压倒性优势，之所以用 Django 是因为它相对比较系统，能自动帮我们做不少工作，也是为了省点事；而且怎么说毕竟也是用户最多的框架之一了，用来入门还是可以的。

在 Django 框架下，可以完成后端和前端，不过前端我们一般会采用其他框架（比如 React，Vue）。Django 自己声称它是一个模型 - 模板 - 视图（model-template-view）框架。项目围绕 App 组织，每一个 App 都有其自己的模型、视图以及测试设置，像一个小项目。Django 项目基本上就是一个小 App 的集合，每一个 App 都负责一个特定的子系统。整个项目就像搭积木一样就这样堆起来了。

**快速感受**

```bash
$ pip install Django
# 创建一个项目根目录
$ mkdir webapp && cd "$_"
# 创建一个 project
$ django-admin startproject order_server
# 迁移数据
$ python manage.py migrate
```

此时，我们已经用下面的命令可以启动项目了（是不是感觉很简单）：

```python
$ python manage.py runserver
```

它甚至还自带了一个管理后台：http://127.0.0.1:8000/admin/

**项目概览**

上面的三步完成后，如果我们去查看它的目录，应该是这样子的：

```bash
.
├── db.sqlite3
├── manage.py
└── order_server
    ├── __init__.py
    ├── settings
    ├── urls.py
    └── wsgi.py
```

它们分别代表什么呢？

- `db.sqlite3` 是数据库文件，默认使用 [SQLite](https://www.sqlite.org/index.html)，这是一个轻巧的、零配置、无服务器的数据库。
- `manage.py` 是管理命令行启动任务的，在执行命令之前会先从 settings 那里读取配置。
- `order_server` 是本项目配置、url 和 wsgi 入口，该文件夹本身也是一个包

这里我们把 `settings.py` 分拆成按开发和产品，这样在配置开发环境（比如 Database）时比较方便。

## 设计

其实这里才是真正项目的起点，我们需要根据业务场景对工程进行设计。此处，我们依然延续之前的内容，做一个订单服务系统。简单起见，我们只做一个给用户展示菜单（就之前的 `print_order`）、用户点菜提交、将用户订单返回的功能。

**App**

前面提到 Django 是围绕着 App 来搞得，我们首先来设计 App。对于我们这个非常简单的小任务来说，只需要两个 App 就足够了，分别是：针对用户的和针对订单的。需要注意的是，我们尽量根据功能拆分 App 而不要根据场景（比如 Web，App，小程序这样），就像函数一样，一个 App 就做一件事。用  [DjangoCon 2008: James Bennett-Reusable Apps](https://www.youtube.com/watch?v=A-S0tqpPga4&feature=youtu.be) 的观点就是：App = some bit of funtionality，Site = several apps。这也是我喜欢 Django 的最重要的原因。所以，这里我们两个 App 就有了，分别是：auth 和 order。

```bash
# 创建一个 App
$ python manage.py startapp authenticate
$ python manage.py startapp order
# 每一个 App 的目录
.
├── __init__.py
├── admin.py
├── apps.py
├── migrations
│   └── __init__.py
├── models.py
├── tests.py
└── views.py
```

- `admin.py`：管理后台相关的
- `apps.py`：自动生成的配置文件，不要管
- `migrations`：数据库更新的
- `models.py`：数据库模型
- `views.py`：实现接口功能

**API**

App 确定后，我们先设计对外的 API，也就是前端将来要请求的地址。简单起见，authenticate 模块我们只设计注册和登陆接口；order 模块只设计菜单展示、点菜接口。分别如下：

- auth: 
    - `/auth/sign_up/`
    - `/auth/login/`
- order:
    - `/order/show_menu/`
    - `/order/submit_order/`

**DataBase**

接下来就是数据库的表了，auth 这里有点特殊，因为 Django 已经为我们创建好了用户表，所以我们得重新起个名字，比如叫 UserProfile；order 涉及到两张表，一张是 food，一张是 order，分别对应菜品和订单。menu 是 food 的组合。

- auth_user_profile 表：
    - phone：手机号，也将作为 auth_user 表的用户名
    - nickname：昵称
    - identity：身份（VIP，VVIP，NORMAL）
- order_menu 表：
    - name：菜名
    - price：价格
    - sold_out: 是否售罄
- order_order 表：
    - order_number: 订单编号
    - user_id：用户 id，用户登陆后自动返给前端的，之后的请求都会带上
    - food_id：菜品 id
    - amount：份数

另外，所有表都要有 id，创建时间和更新时间。

## 理想流程

API 有常用的 [REST API](https://www.restapitutorial.com/)，或比较新的 [GraphQL](https://graphql.org/)，我们这里以 REST 为例。

```bash
$ pip install djangorestframework
$ pip install djangorestframework_simplejwt
$ pip install django-cors-headers
```

首先需要安装 [restframework](https://www.django-rest-framework.org/)，[simplejwt](https://github.com/davesque/django-rest-framework-simplejwt) 和 [cors-headers](https://github.com/adamchainz/django-cors-headers)。第一个是专门为 rest 接口服务的；第二个是用户鉴权用的，这块已经非常成熟了，我们拿现成的过来用就行；第三个是解决跨域问题的（否则前端没办法访问），端口不同属于不同域，其他不同域的情况还包括协议不同如 http 和 https，域名不同。Django 的全局配置一般都在 settings 文件夹下面的配置文件中，我们根据文档和自己的需要配置即可，具体的大家可以看代码，这里不涉及细节了。

然后准备开始具体业务逻辑的实现，可以分别实现每个 App，每个 App 除了上面提到已有的这些内容外，还需要添加一个 `urls.py` 和 `serializers.py`，前者是把本模块的接口放在一起作为整体提供给配置文件同目录的 `urls.py`，后者是 REST 接口序列化的，可以自定义字段。

**`urls.py`**

主要定义 API 的各种接口 URL。这里有两个地方要注意的：

- 每个模块下面的 URLs 都要汇总到 `order_server` 这个模块下面，具体的地址是二者的 join
- 模块下的 URLs 在 POST 请求时注意跨域问题

**`models.py`**

主要定义数据结构（也就是数据库的表），这里可以通过官方文档进一步了解（比如不同类型的字段、ForeignKey 等）。有两点需要注意：

- 一个 model 中也可以引用其他 App 的 model，比如 Order 中引用 User
- `models.py` 中做了调整，记得要 makemigrations 和 migrate，无论是马上做还是事后一起做

```python
$ python manage.py makemigrations # 后面可以跟某个 App 的名字，也可以不跟（就是所有 App）
$ python manage.py migrate
```

前者创建迁移代码（在每个 App 下面的 migrations 文件夹下面），后者将数据变化更新到数据库。

**`views.py`**

包括 `serializers.py`，主要处理业务逻辑。需要注意的是，它也像 model 一样可以相互组合灵活使用。比如我们的 `/api/auth/login/` 接口其实就直接用了 [simplejwt](https://github.com/davesque/django-rest-framework-simplejwt) 的 view，并没有（也不需要）自己实现。我们每做完一个接口后，可以通过 [Postman](https://www.getpostman.com/) 看一下调用情况。

**`tests`**

正常情况下在开发的同时还需要在 `tests` 下面添加每个函数和类对应的测试，测试的好处不需要多说，大家切记，只要你开始做项目（包括公开发布包或模块）了，测试时刻跟上。

测试一般包括各种正常、异常的情况：正常请求返回结果是否符合预期、异常请求能否被预期捕获。异常请求通常使用一些边界条件。测试在项目小的时候很不明显（甚至有些麻烦），但随着项目的不断扩充，如果没有测试简直就是噩梦：意味着每改动一个地方，所有的接口可能得全部人工测试一遍（包括那些边界请求）。除此之外，写测试还有个几个好处：第一，一次写好，之后几乎不用再更改，但一直能发挥作用；第二，为不熟悉项目的同事提供了一个非常好的教程，通过阅读测试代码可以快速知道模块的功能；第三，方便排查错误——测试通过的地方一般不会有问题。在本例中，我也简单地写了一些测试供大家参考。

以上涉及的代码及接口调用文档在这里：[Python-for-Freshman](https://github.com/hscspring/Python-for-Freshman/tree/master/webapp)，额外提一句，如果能给到前端一个完善的 API 文档（无论何种形式），会节约彼此很多时间。有很多文档生成工具，比如 [Sphinx](http://www.sphinx-doc.org/en/master/)。

## 补充说明

**启动**

因为我们只是简单演示了一个基本功能，所以要想完成演示，还需要完善几个地方：

- 创建用户：这个可以通过注册的 API 完成

- 创建菜品：这个可以直接通过对应的（简单）接口完成

当然，现在这样还远远谈不上完善，比如更新打折比例需现在是用字典配置的，在业务比较简单时没啥问题，当业务变复杂、感觉不太方便时可以独立成一个 App（比如 Marketing 或 Produce）。

**Bug**

我们每个人几乎可以肯定会碰到 Bug，我自己当然也不例外。比如这次就碰到了两个：第一个来自 `simplejwt`，主要是和 restframework 本身的验证冲突了；第二个来自 serializers 的 `HyperlinkedModelSerializer`，具体的问题和 [这个](https://stackoverflow.com/questions/20550598/django-rest-framework-could-not-resolve-url-for-hyperlinked-relationship-using) 有点类似。还有其他一些小的 Bug，比如忘记在 `settings.py` 中添加 App，变量名写错之类。

而且，使用框架还有个和前面讲的写代码不一样的问题，就是很多 Bug 是对框架不熟悉导致的。越是操作简单方便的，出现 Bug 后可能越难定位。

**其他**

本例中的所有做法只是很多种可能的一种，当然会有其他方法能达到同样的目的，如果大家看了 restframework 的文档就会发现，光是[验证](https://www.django-rest-framework.org/api-guide/authentication/)就有好多种方法。这种不同不仅体现在代码层面，也体现在设计层面和具体实现过程，不同人可能各方面思路都不相同，所以推荐大家多阅读大神的或优秀的开源项目，看看他们是怎么做的。

由于作者本人经验尚浅，其中可能有一些不太合理的地方，比如 food_id 返回是不是合理？再比如错误处理，最好能统一设计好，我们这里就比较随意了。再比如点菜后订单的更新是否要根据菜品循环呢，是不是可以把点的菜作为一个 dict（需要 postgresSQL 或 MySQL 支持）存起来？总之，一个项目（或工程）要考虑的绝不仅仅是写代码的问题，还有诸多如设计、安全、性能、与前端配合等等都不能忽略。大家感兴趣的话可以看些软件设计类的书，当然最重要的是——多做项目。

## 小结

本节我们以 Django 为例简要概述了如何从零开发一个后端服务，这并不是一个 Django 教程，所以我们重点讲了下设计和基本流程，其中的细节大家可以在网上搜索，下面也列出来一些。其他框架其实多少也有些类似，如果有机会也可以多尝试一下。我的观点还是和开篇的那些观点类似：不要讨论哪个框架好，或者某个比另一个好，根据业务的需要选择适合自己的就是最好的。

由于是拿 Django 举例的，最后再简单放几个相关教程，大家也可以上网自己搜喜欢的。

- [Django Web Framework (Python) - Learn web development | MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django)
- [JustDjango - YouTube](https://www.youtube.com/channel/UCRM1gWNTDx0SHIqUJygD-kQ)

- [CodingEntrepreneurs - YouTube](https://www.youtube.com/channel/UCWEHue8kksIaktO8KTTN_zg)