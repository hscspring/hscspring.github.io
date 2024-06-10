---
title: 《Elasticsearch 权威指南》之基础入门 Note（基于 7.x）
date: 2019-07-09 19:00:00
categories: Feeling
tags: [Elasticsearch, Lucene, Search, Full-Text-Search]
---

## 目录

<div class="toc"><ul class="toc-item"><li><span><a href="#为了搜索" data-toc-modified-id="为了搜索-1"><span class="toc-item-num">1&nbsp;&nbsp;</span>为了搜索 </a></span></li><li><span><a href="#集群内的原理" data-toc-modified-id="集群内的原理-2"><span class="toc-item-num">2&nbsp;&nbsp;</span>集群内的原理 </a></span></li><li><span><a href="#数据输入和输出" data-toc-modified-id="数据输入和输出-3"><span class="toc-item-num">3&nbsp;&nbsp;</span>数据输入和输出 </a></span></li><li><span><a href="#分布式文档存储" data-toc-modified-id="分布式文档存储-4"><span class="toc-item-num">4&nbsp;&nbsp;</span>分布式文档存储 </a></span><ul class="toc-item"><li><span><a href="#新建、索引和删除" data-toc-modified-id="新建、索引和删除-4.1"><span class="toc-item-num">4.1&nbsp;&nbsp;</span>新建、索引和删除 </a></span></li><li><span><a href="#取回" data-toc-modified-id="取回-4.2"><span class="toc-item-num">4.2&nbsp;&nbsp;</span>取回 </a></span></li><li><span><a href="#更新" data-toc-modified-id="更新-4.3"><span class="toc-item-num">4.3&nbsp;&nbsp;</span>更新 </a></span></li><li><span><a href="#多文档" data-toc-modified-id="多文档-4.4"><span class="toc-item-num">4.4&nbsp;&nbsp;</span>多文档 </a></span></li></ul></li><li><span><a href="#搜索" data-toc-modified-id="搜索-5"><span class="toc-item-num">5&nbsp;&nbsp;</span>搜索 </a></span></li><li><span><a href="#映射和分析" data-toc-modified-id="映射和分析-6"><span class="toc-item-num">6&nbsp;&nbsp;</span>映射和分析 </a></span></li><li><span><a href="#请求体查询" data-toc-modified-id="请求体查询-7"><span class="toc-item-num">7&nbsp;&nbsp;</span>请求体查询 </a></span></li><li><span><a href="#排序与相关性" data-toc-modified-id="排序与相关性-8"><span class="toc-item-num">8&nbsp;&nbsp;</span>排序与相关性 </a></span></li><li><span><a href="#分布式检索" data-toc-modified-id="分布式检索-9"><span class="toc-item-num">9&nbsp;&nbsp;</span>分布式检索 </a></span><ul class="toc-item"><li><span><a href="#查询" data-toc-modified-id="查询-9.1"><span class="toc-item-num">9.1&nbsp;&nbsp;</span>查询 </a></span></li><li><span><a href="#取回" data-toc-modified-id="取回-9.2"><span class="toc-item-num">9.2&nbsp;&nbsp;</span>取回 </a></span></li><li><span><a href="#选项" data-toc-modified-id="选项-9.3"><span class="toc-item-num">9.3&nbsp;&nbsp;</span>选项 </a></span></li><li><span><a href="#游标查询-Scroll" data-toc-modified-id="游标查询-Scroll-9.4"><span class="toc-item-num">9.4&nbsp;&nbsp;</span>游标查询 Scroll</a></span></li></ul></li><li><span><a href="#索引管理" data-toc-modified-id="索引管理-10"><span class="toc-item-num">10&nbsp;&nbsp;</span>索引管理 </a></span></li><li><span><a href="#分片内部管理" data-toc-modified-id="分片内部管理-11"><span class="toc-item-num">11&nbsp;&nbsp;</span>分片内部管理 </a></span></li></ul></div>
## 为了搜索

Elasticsearch 建立在 Lucene 上，它不仅仅是一个全文搜索引擎：

- 一个分布式的实时文档存储，*每个字段* 可以被索引与搜索
- 一个分布式实时分析搜索引擎
- 能胜任上百个服务节点的扩展，并支持 PB 级别的结构化或者非结构化数据

[Install Elasticsearch with Docker | Elasticsearch Reference [7.2] | Elastic](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html)

- `docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.2.0`
- `curl http://127.0.0.1:9200/_cat/health`

- `curl 'http://localhost:9200/?pretty'`

[Running Kibana on Docker | Kibana User Guide [7.2] | Elastic](https://www.elastic.co/guide/en/kibana/current/docker.html#bind-mount-config)

- `docker run --link YOUR_ELASTICSEARCH_CONTAINER_NAME_OR_ID:elasticsearch -p 5601:5601 {docker-repo}:{version}`

- http://localhost:5601

存储数据到 Elasticsearch 的行为叫做 *索引*，但在索引一个文档之前，需要确定将文档存储在哪里。

一个 Elasticsearch 集群可以 包含多个 *索引* ，相应的每个索引可以包含多个 *类型* 。 这些不同的类型存储着多个 *文档* ，每个文档又有 多个 *属性* 。

<!--more-->

```bash
########## Add data ##########
PUT /megacorp/_doc/1
{
    "first_name" : "Yam",
    "last_name" :  "Smith",
    "age" :        25,
    "about" :      "I love to go rock climbing",
    "interests": [ "sports", "music" ]
}
PUT /megacorp/_doc/2
{
    "first_name" :  "Jane",
    "last_name" :   "Smith",
    "age" :         32,
    "about" :       "I like to collect rock albums",
    "interests":  [ "music" ]
}

PUT /megacorp/_doc/3
{
    "first_name" :  "Douglas",
    "last_name" :   "Fir",
    "age" :         35,
    "about":        "I like to build cabinets",
    "interests":  [ "forestry" ]
}

########## light search ##########
GET /megacorp/_search
GET /megacorp/_search?q=last_name:Smith

########## query expression search ##########
GET /megacorp/_search
{
    "query" : {
        "match" : {
            "last_name" : "Smith"
        }
    }
}

########## complex search ##########
GET /megacorp/_search
{
    "query" : {
        "bool": {
            "must": {
                "match" : {
                    "last_name" : "smith" 
                }
            },
            "filter": {
                # filter
                "range" : {
                    "age" : { "gt" : 30 } // gt == greater than
                }
            }
        }
    }
}

########## full-text search ##########
GET /megacorp/_search
{
    "query" : {
        "match" : {
            "about" : "rock climbing" // in "about" property
        }
    }
}

########## phrase search 精确匹配一系列单词或者短语 ##########
GET /megacorp/_search
{
    "query" : {
        "match_phrase" : {
            "about" : "rock climbing"
        }
    }
}

########## highlight search ##########
GET /megacorp/_search
{
    "query" : {
        "match_phrase" : {
            "about" : "rock climbing"
        }
    },
    "highlight": {
        "fields" : {
            "about" : {}
        }
    }
}

########## aggregation search ##########
# 雇员中最受欢迎的兴趣爱好
GET /megacorp/_search
{
  "aggs": {
    "all_interests": {
      "terms": { "field": "interests.keyword" }
    }
  }
}
# 叫 Smith 的雇员中最受欢迎的兴趣爱好
GET /megacorp/_search
{
  "query": {
    "match": {
      "last_name": "smith"
    }
  },
  "aggs": {
    "all_interests": {
      "terms": {
        "field": "interests.keyword"
      }
    }
  }
}
# 查询特定兴趣爱好员工的平均年龄
GET /megacorp/_search
{
    "aggs" : {
        "all_interests" : {
            "terms" : { "field" : "interests.keyword" },
            "aggs" : {
                "avg_age" : {
                    "avg" : { "field" : "age" }
                }
            }
        }
    }
}
```

Elasticsearch 尽可能地屏蔽了分布式系统的复杂性。这里列举了一些在后台自动执行的操作：

- 分配文档到不同的容器 或 *分片* 中，文档可以储存在一个或多个节点中
- 按集群节点来均衡分配这些分片，从而对索引和搜索过程进行负载均衡
- 复制每个分片以支持数据冗余，从而防止硬件故障导致的数据丢失
- 将集群中任一节点的请求路由到存有相关数据的节点
- 集群扩容时无缝整合新节点，重新分配分片以便从离群节点恢复

## 集群内的原理

一个运行中的 Elasticsearch 实例称为一个 节点，而集群是由一个或者多个拥有相同 `cluster.name` 配置的节点组成， 它们共同承担数据和负载的压力。当有节点加入集群中或者从集群中移除节点时，集群将会重新平均分布所有的数据。用户可以将请求发送到 *集群中的任何节点* ，包括主节点。 每个节点都知道任意文档所处的位置，并且能够将我们的请求直接转发到存储我们所需文档的节点。 

查看集群状态：`curl -X GET "localhost:9200/_cluster/health?pretty"`

索引（保存相关数据的地方）实际上是指向一个或者多个物理 *分片* 的 *逻辑命名空间* 。

一个 *分片* 是一个底层的 *工作单元* ，它仅保存了 全部数据中的一部分。一个分片是一个 Lucene 的实例，以及它本身就是一个完整的搜索引擎。*文档被存储和索引到分片内*，分片又被分配到集群内的各个节点里，应用程序是直接与索引而不是与分片进行交互。

一个分片可以是 *主* 分片或者 *副本* 分片。 索引内任意一个文档都归属于一个主分片，所以主分片的数目决定着索引能够保存的最大数据量。

一个副本分片只是一个主分片的拷贝。 副本分片作为硬件故障时保护数据不丢失的冗余备份，并为搜索和返回文档等读操作提供服务。相同分片的副本不会放在同一节点。

在索引建立的时候就已经确定了主分片数，但是副本分片数可以随时修改。

```bash
# 创建索引
PUT /blogs
{
   "settings" : {
      "number_of_shards" : 5, # 5 个主分片
      "number_of_replicas" : 1 # 1 个副本（每个主分片 1 个副本）
   }
}

GET /_cluster/health
{
    "status": "yellow",
    "unassigned_shards": 5,
}
```

yellow 表示主分片正常运行，副本分配没有全部处在正常状态——没有被分配到任何节点。在同一个节点上既保存原始数据又保存副本是没有意义的，因为一旦失去了那个节点，我们也将丢失该节点上的所有副本数据。

## 数据输入和输出

Elastcisearch 是分布式的 *文档* 存储。它能存储和检索复杂的数据结构 -- 序列化成为 JSON 文档 -- 以 *实时*的方式。在 Elasticsearch 中， *每个字段的所有数据* 都是 *默认被索引的* 。 即每个字段都有为了快速检索设置的专用倒排索引。

在大多数应用中，多数实体或对象可以被序列化为包含键值对的 JSON 对象。 一个 *键* （**不可以包含英文句号**）可以是一个字段或字段的名称，一个 *值* 可以是一个字符串，一个数字，一个布尔值， 另一个对象，一些数组值，或一些其它特殊类型诸如表示日期的字符串，或代表一个地理位置的对象。

在 Elasticsearch 中，术语 *文档* 有着特定的含义。它是指最顶层或者根对象 , 这个根对象被序列化成 JSON 并存储到 Elasticsearch 中，指定了唯一 ID。

文档元数据：

- `_index`：共同特性被分组到一起的文档集合
- `_type`：不同类型（即将取消，原因：[Removal of mapping types](https://www.elastic.co/guide/en/elasticsearch/reference/master/removal-of-types.html)，可修改为 `_doc`）
- `_id`

```bash
PUT /{index}/_doc/{id}
{
  "title": "My First blog entry",
  "text":  "Missing somebody...",
  "date":  "2014/01/01"
}
# or 自动生成的 ID 是 URL-safe、 基于 Base64 编码且长度为 20 个字符的 GUID 字符串
POST /{index}/_doc/
{
  "title": "My second blog entry",
  "text":  "Still trying this out...",
  "date":  "2015/01/01"
}

####### 取回 #######
# 取回部分字段
GET /website/_doc/1?_source=title,text
# 取回多个文档
GET /website/_mget
{
  "ids" : [ "2", "1" ]
}
GET /website/_mget
{
   "docs" : [
      {
         "_index" : "website",
         "_id" :    2
      },
      {
         "_index" : "website",
         "_id" :    1,
         "_source": "views" # 指定返回的字段
      }
   ]
}
# Only source
GET /website/_doc/1/_source
# 检查是否存在
curl -i -XHEAD http://localhost:9200/website/blog/3
HEAD /website/_doc/4

####### 更新文档 #######
# 更新文档 = 重建索引，使用与创建相同的 API，在内部旧文档已删除并增加一个新文档
# 部分更新
POST /website/_update/1
{
    "doc" : {
      "tags" : [ "testing" ],
      "views": 0
   }
}
# 使用脚本更新
POST /website/_update/1
{
   "script" : "ctx._source.views+=1"
}
# 添加新内容
POST /website/_update/1
{
   "script" : {
       // if the tag exists, it still gets added, since this is a list
       "source": "ctx._source.tags.add(params.new_tag)", 
       "params" : {
           "new_tag" : "search"
       }
   }
}
# 删除基于其内容的文档
POST /website/_update/1
{
    "script" : {
        "source": "ctx.op = ctx._source.views == params.count ? 'delete' : 'none'",
        "params" : {
            "count": 1
        }
    }
}
# 第一次运行这个请求时， upsert 值作为新文档被索引，初始化 views 字段为 1
# 在后续的运行中，由于文档已经存在， script 更新操作将替代 upsert 进行应用，对 views 计数器进行累加
POST /website/_update/1
{
   "script" : "ctx._source.views+=1",
   "upsert": {
       "views": 1
   }
}

####### 创建新文档 #######
/{index}/_doc/{id}
/{index}/_doc
/{index}/_create/{id}

####### 删除文档，删除（无论是否存在）会增加 version 号 #######
DELETE /website/_doc/1

####### 批量处理 #######
{ action: { metadata }}\n
{ request body        }\n
# action 必须是以下选项之一:
# create 如果文档不存在，那么就创建它。
# index 创建一个新文档或者替换一个现有的文档。
# update 部分更新一个文档。
# delete 删除一个文档。
# example
POST /_bulk
{ "delete": { "_index": "website", "_id": "123" }} // oper 1
{ "create": { "_index": "website", "_id": "123" }} // oper 2
{ "title":    "My first blog post" }
{ "index":  { "_index": "website"}} // oper 3
{ "title":    "My second blog post" }
{ "update": { "_index": "website", "_id": "123", "retry_on_conflict" : 3} } // oper 4
{ "doc" : {"title" : "My updated blog post"} } 
```

处理冲突：乐观并发，如果源数据在读写当中被修改，更新将会失败。

每个文档都有一个 `_version` （版本）号，当文档被修改时版本号递增。 Elasticsearch 使用这个 `_version` 号来确保变更以正确顺序得到执行。如果旧版本的文档在新版本之后到达，它可以被简单的忽略。

可以利用 `_version` 号来确保 应用中相互冲突的变更不会导致数据丢失。可以通过指定想要修改文档的 `version` 号来达到这个目的。 如果该版本不是当前版本号，请求将会失败。

怎么做取决于我们的应用需求。我们可以告诉用户说其他人已经修改了文档，并且在再次保存之前检查这些修改内容。 或者获取到最新的文档并尝试重新应用这些修改。所有文档的更新或删除 API，都可以接受 `version` 参数。

外部版本号的处理方式和内部版本号的处理方式不同， Elasticsearch 不是检查当前 `_version` 和请求中指定的版本号是否相同， 而是检查当前 `_version` 是否 *小于* 指定的版本号。 如果请求成功，外部的版本号作为文档的新 `_version` 进行存储。外部版本号不仅在索引和删除请求是可以指定，而且在 *创建* 新文档时也可以指定。

## 分布式文档存储

索引文档时，文档存储的分片：`shard = hash(routing) % number_of_primary_shards`，routing 默认是文档 id，通过 hash 生成一个数字。这个分布在 `0` 到 `number_of_primary_shards-1` 之间的余数，就是我们所寻求的文档所在分片的位置。这就解释了为什么我们要在创建索引的时候就确定好主分片的数量（**默认是 1 个 index 分配 5 个主分片**）并且永远不会改变这个数量：因为如果数量变化了，那么所有之前路由的值都会无效，文档也再也找不到了。

### 新建、索引和删除

![](https://www.elastic.co/guide/cn/elasticsearch/guide/current/images/elas_0402.png)

在主副分片和任何副本分片上面 成功新建，索引和删除文档所需要的步骤顺序：

1. 客户端向 `Node 1` 发送新建、索引或者删除请求。
2. 节点使用文档的 `_id` 确定文档属于分片 0 。请求会被转发到 `Node 3`，因为分片 0 的主分片目前被分配在 `Node 3` 上。
3. `Node 3` 在主分片上面执行请求。如果成功了，它将请求并行转发到 `Node 1` 和 `Node 2` 的副本分片上。一旦所有的副本分片都报告成功，`Node 3` 将向协调节点报告成功，协调节点向客户端报告成功。

有一些可选的请求参数可以影响这个过程，可能以数据安全为代价提升性能：

- consistency：
    - `one` （只要主分片状态 ok 就允许执行*写*操作）
    - `all`（必须要主分片和所有副本分片的状态没问题才允许执行*写*操作）
    -  `quorum` 默认值，即大多数（`int( (primary + number_of_setting_replicas) / 2 ) + 1`）的分片副本状态没问题就允许执行*写*操作

- timeout：如果没有足够的副本分片 Elasticsearch 会等待，默认情况下，它最多等待 1 分钟。 可以使用 timeout 参数 使它更早终止：100 100 毫秒，30s 是 30 秒。

### 取回

![](https://www.elastic.co/guide/cn/elasticsearch/guide/current/images/elas_0403.png)

从主分片或者副本分片检索文档的步骤顺序：

1、客户端向 `Node 1` 发送获取请求。

2、节点使用文档的 `_id` 来确定文档属于分片 `0` 。分片 `0` 的副本分片存在于所有的三个节点上。 在这种情况下，它将请求转发到 `Node 2` 。

3、`Node 2` 将文档返回给 `Node 1` ，然后将文档返回给客户端。

在处理读取请求时，协调结点在每次请求的时候都会通过轮询所有的副本分片来达到负载均衡。

### 更新

![](https://www.elastic.co/guide/cn/elasticsearch/guide/current/images/elas_0404.png)

更新一个文档的步骤：

1. 客户端向 `Node 1` 发送更新请求。
2. 它将请求转发到主分片所在的 `Node 3` 。
3. `Node 3` 从主分片检索文档，修改 `_source` 字段中的 JSON ，并且尝试重新索引主分片的文档。 如果文档已经被另一个进程修改，它会重试步骤 3 ，超过 `retry_on_conflict` 次后放弃。
4. 如果 `Node 3` 成功地更新文档，它将新版本的文档并行转发到 `Node 1` 和 `Node 2` 上的副本分片，重新建立索引。 一旦所有副本分片都返回成功， `Node 3` 向协调节点也返回成功，协调节点向客户端返回成功。

`update` API 还接受 `routing` 、 `replication` 、 `consistency`和 `timeout` 参数。

当主分片把更改转发到副本分片时， 它不会转发更新请求。 相反，它转发完整文档的新版本。请记住，这些更改将会异步转发到副本分片，并且不能保证它们以发送它们相同的顺序到达。

### 多文档

![](https://www.elastic.co/guide/cn/elasticsearch/guide/current/images/elas_0405.png)

使用单个 `mget` 请求取回多个文档所需的步骤顺序：

1. 客户端向 `Node 1` 发送 `mget` 请求。
2. `Node 1` 为每个分片构建多文档获取请求，然后并行转发这些请求到托管在每个所需的主分片或者副本分片的节点上。一旦收到所有答复， `Node 1` 构建响应并将其返回给客户端。

可以对 `docs` 数组中每个文档设置 `routing` 参数。

![](https://www.elastic.co/guide/cn/elasticsearch/guide/current/images/elas_0406.png)

`bulk` API 按如下步骤顺序执行：

1. 客户端向 `Node 1` 发送 `bulk` 请求。
2. `Node 1` 为每个节点创建一个批量请求，并将这些请求并行转发到每个包含主分片的节点主机。
3. 主分片一个接一个按顺序执行每个操作。当每个操作成功时，主分片并行转发新文档（或删除）到副本分片，然后执行下一个操作。 一旦所有的副本分片报告所有操作成功，该节点将向协调节点报告成功，协调节点将这些响应收集整理并返回给客户端。

`bulk` API 还可以在整个批量请求的最顶层使用 `consistency` 参数，以及在每个请求中的元数据中使用 `routing` 参数。

## 搜索

*搜索（search）* 可以做到：

- 在类似于 `gender` 或者 `age` 这样的字段 上使用结构化查询，`join_date` 这样的字段上使用排序，就像 SQL 的结构化查询一样。
- 全文检索，找出所有匹配关键字的文档并按照*相关性（relevance）* 排序后返回结果。
- 以上二者兼而有之。

```bash
########## 空搜索 ##########
GET /_search
GET /_search?timeout=10ms # 超时前返回已经成功获取的结果

########## 多索引，多类型 ##########
# 在所有的索引中搜索所有的类型
GET /_search
GET /_all/_search
# 在 gb 索引中搜索所有的类型
GET /gb/_search
# 在 gb 和 us 索引中搜索所有的文档
GET /gb,us/_search
# 在任何以 g 或者 u 开头的索引中搜索所有的类型
GET /g*,u*/_search

########## 分页 ##########
# 每页展示 5 条结果，可以用下面方式请求得到 1 到 3 页的结果
GET /_search?size=5
GET /_search?size=5&from=5
GET /_search?size=5&from=10

########## 轻量搜索 ##########
# 查询字符串搜索非常适用于通过命令行做即席查询
# 不推荐直接向用户暴露查询字符串搜索功能，除非对于集群和数据来说非常信任他们。
# 查询在 tweet 类型中 tweet 字段包含 elasticsearch 单词的所有文档
GET /*-tweet/_search?q=tweet:elasticsearch
# 查询在 name 字段中包含 john 并且在 tweet 字段中包含 mary 的文档
GET /_search?q=%2Bname%3Ajohn+%2Btweet%3Amary
# 返回包含 mary 的所有文档
GET /_search?q=mary
```

在分布式系统中，对结果排序的成本随分页的深度成指数上升。这就是 web 搜索引擎对任何查询都不要返回超过 1000 个结果的原因。

## 映射和分析

```bash
# 映射（模式定义）
# 不同字段索引方式不同，搜索结果也不同
GET /gb-tweet/_mapping
```

*精确值* 如它们听起来那样精确。例如日期或者用户 ID，但字符串也可以表示精确值，例如用户名或邮箱地址。对于精确值来讲，`Foo` 和 `foo` 是不同的，`2014` 和 `2014-09-15` 也是不同的。

*全文* 是指文本数据（通常以人类容易识别的语言书写），例如一个推文的内容或一封邮件的内容。

精确值很容易查询。查询全文数据要微妙的多。我们问的不只是 “这个文档匹配查询吗”，而是 “该文档匹配查询的程度有多大？” 

我们很少对全文类型的域做精确匹配。相反，我们希望在文本类型的域中搜索。不仅如此，我们还希望搜索能够理解我们的 *意图* 。为了促进这类在全文域中的查询，Elasticsearch 首先 *分析* 文档，之后根据结果创建 *倒排索引* 。*倒排索引* 适用于快速的全文搜索。

分析的功能：

- 字符过滤器：分词前整理字符串，如去掉 HTML，将 `&` 转为 and
- 分词器：将字符串分为单个词条
- Token 过滤器：小写，删除无用词（StopWords），增加词条（如同义词）

```bash
# 使用 API 查看分析器如何分析
GET /_analyze
{
  "analyzer": "standard",
  "text": "The question is 我 喜欢 她。❤️" # 输入的文本
}
```

为了能够将时间域视为时间，数字域视为数字，字符串域视为全文或精确值字符串， Elasticsearch 需要知道每个域中数据的类型。这个信息包含在映射中。

```bash
##### 查看映射情况 #####
GET /gb-user/_mapping

##### 自定义域映射 #####
# 域最重要的属性是 type 。对于不是 text 的域，一般只需要设置 type 
{
    "number_of_clicks": {
        "type": "integer"
    }
}
# text 域映射的两个最重要属性是 index 和 analyzer 。
# index 属性控制怎样索引字符串。它可以是 true or false，表示索引或不索引。
# analyzer 属性指定在搜索和索引时使用的分析器：standard(default), english..
{
    "tweet": {
        "type":     "text",
        "analyzer": "standard"
    }
}

##### 更新映射 #####
DELETE /gb
PUT /gb 
{
  "mappings": {
      "properties" : {
      "tweet" : {
      "type" :    "text",
      "analyzer": "english"
      },
      "date" : {
      "type" :   "date"
      },
      "name" : {
      "type" :   "text"
      },
      "user_id" : {
      "type" :   "long"
      }
    }
  }
}
# 增加
PUT /gb/_mapping
{
  "properties" : {
    "tag" : {
      "type" :    "text",
      "analyzer":  "english"
    }
  }
}
```

默认， `text` 类型域会被认为包含全文。就是说，它们的值在索引前，会通过 一个分析器，针对于这个域的查询在搜索前也会经过一个分析器。

可以更新一个映射来添加一个新域，但不能将一个存在的域从 `analyzed` 改为 `not_analyzed` 。因为该域的数据可能已经被索引。

`tag` 域 可以包含多个标签，以数组的形式索引标签，对于数组，没有特殊的映射需求。任何域都可以包含 0、1 或者多个值，就像全文域分析得到多个词条。这暗示 *数组中所有的值必须是相同数据类型的* 。如果通过索引数组来创建新的域，Elasticsearch 会用数组中第一个值的数据类型作为这个域的 `类型` 。

下面三种域被认为是空的，它们将不会被索引：

```js
"null_value":               null,
"empty_array":              [],
"array_with_null_value":    [ null ]
```

为了能让 Elasticsearch 有效地索引内部类，它把文档转化成这样（即把嵌套扁平化）：

```js
{
    "tweet":            [elasticsearch, flexible, very],
    "user.id":          [@johnsmith],
    "user.gender":      [male],
    "user.age":         [26],
    "user.name.full":   [john, smith],
    "user.name.first":  [john],
    "user.name.last":   [smith]
}
```

内部对象的数组扁平化：

```js
{
    "followers": [
        { "age": 35, "name": "Mary White"},
        { "age": 26, "name": "Alex Jones"},
        { "age": 19, "name": "Lisa Smith"}
    ]
}
// 注意：{age: 35} 和 {name: Mary White} 之间的相关性已经丢失了
{
    "followers.age":    [19, 26, 35],
    "followers.name":   [alex, jones, lisa, smith, mary, white]
}
// 将 followers 字段类型设置为 nested 而不是 object 后，每一个嵌套对象都会被索引为一个 隐藏的独立文档
{
    "followers.name": [mary, white],
    "followers.age: 35
}
{
    "followers.name": [alex, jones],
    "followers.age: 26
}
{
    "followers.name": [lisa, smith],
    "followers.age: 19
}
```

## 请求体查询

因为带请求体的 `GET` 请求并不被广泛支持，所以 `search` API 同时支持 `POST` 请求：

```bash
##### 空查询 #####
GET /website/_search # or POST
{
  "from": 0,
  "size": 10
}

##### 查询表达式 #####
# match_all 等于空查询
GET /website/_search
{
    "query": {
        "match_all": {}
    }
}
GET /_search
{	
	# QUERY_NAME:
    "query": {
    	# FIELD_NAME
        "match": {
        	# ARGUMENT: VALUE
            "text": "missing"
        }
    }
}
# 合并查询语句
{
    "bool": {
        "must":     { "match": { "text": "elasticsearch" }},
        "must_not": { "match": { "title":  "mary" }},
        "should":   { "match": { "tweet": "full text" }},
        "filter":   { "range": { "age" : { "gt" : 30 }} }
    }
}
# 查询信件正文包含 business opportunity 的星标邮件，或者在收件箱正文包含 business opportunity 的非垃圾邮件
{
    "bool": {
        "must": { "match":   { "email": "business opportunity" }},
        "should": [
            { "match":       { "starred": true }},
            { "bool": {
                "must":      { "match": { "folder": "inbox" }},
                "must_not":  { "match": { "spam": true }}
            }}
        ],
        "minimum_should_match": 1
    }
}
```

当使用于 *查询情况* 时，查询就变成了一个 “评分” 的查询。和不评分的查询类似，也要去判断这个文档是否匹配，同时它还需要判断这个文档匹配的有 *多好*（匹配程度如何）。 此查询的典型用法是用于查找以下文档：

- 查找与 `full text search` 这个词语最佳匹配的文档
- 包含 `run` 这个词，也能匹配 `runs` 、 `running` 、 `jog` 或者 `sprint`
- 包含 `quick` 、 `brown` 和 `fox` 这几个词 — 词之间离的越近，文档相关性越高
- 标有 `lucene` 、 `search` 或者 `java` 标签 — 标签越多，相关性越高

过滤（filtering）的目标是减少那些需要通过评分查询（scoring queries）进行检查的文档。一般情况下，一个 filter 会比一个评分的 query 性能更优异，并且每次都表现的很稳定。

```bash
# 匹配所有文档，默认
{ "match_all": {}}
# 如果在一个全文字段上使用 match 查询，在执行查询前，它将用正确的分析器去分析查询字符串
{ "match": { "tweet": "About Search" }}
# 如果在一个精确值的字段上使用它， 例如数字、日期、布尔或者一个 not_analyzed 字符串字段，那么它将会精确匹配给定的值：
{ "match": { "age":    26           }}
{ "match": { "date":   "2014-09-01" }}
{ "match": { "public": true         }}
{ "match": { "tag":    "full_text"  }}
# multi_match 查询可以在多个字段上执行相同的 match 查询：
# 任何一个 field match 就会返回
{
    "multi_match": {
        "query":    "full text search",
        "fields":   [ "title", "body" ]
    }
}
# range 查询找出那些落在指定区间内的数字或者时间：
{
    "range": {
        "age": {
            "gte":  20, # gt 大于 gte 大于等于 lt 小于 lte 小于等于
            "lt":   30
        }
    }
}
# term 查询被用于精确值 匹配，这些精确值可能是数字、时间、布尔或者那些 not_analyzed 的字符串：
# term 查询对于输入的文本不 分析 ，所以它将给定的值进行精确查询。
{ "term": { "age":    26           }}
{ "term": { "date":   "2014-09-01" }}
{ "term": { "public": true         }}
{ "term": { "tag":    "full_text"  }}
# terms 查询和 term 查询一样，但允许指定多值进行匹配。如果这个字段包含了指定值中的任何一个值，那么这个文档满足条件：
# terms 查询对于输入的文本不分析。它查询那些精确匹配的值（包括在大小写、重音、空格等方面的差异）。
{ "terms": { "tag": [ "search", "full_text", "nosql" ] }}
# exists 查询和 missing 查询被用于查找那些指定字段中有值 (exists) 或无值 (missing) 的文档。
# 经常用于某个字段有值的情况和某个字段缺值的情况。
{
    "exists":   {
        "field":    "title"
    }
}
```

对于精确值的查询，可能需要使用 filter 语句来取代 query，因为 filter 将会被缓存。

`bool` 查询将多查询组合在一起，接收以下参数：

- **`must`**

    文档 *必须* 匹配这些条件才能被包含进来。

- **`must_not`**

    文档 *必须不* 匹配这些条件才能被包含进来。

- **`should`**

    如果满足这些语句中的任意语句，将增加 `_score` ，否则，无任何影响。它们主要用于修正每个文档的相关性得分。

- **`filter`**

    *必须* 匹配，但它以**不评分、过滤模式**来进行。这些语句对评分没有贡献，只是根据过滤标准来排除或包含文档。

每一个子查询都独自地计算文档的相关性得分。一旦他们的得分被计算出来， `bool` 查询就将这些得分进行合并并且返回一个代表整个布尔操作的得分。

```bash
# 查找 title 字段匹配 how to make millions 并且不被标识为 spam 的文档。
# 那些被标识为 starred 或在 2014 之后的文档，将比另外的文档有更高的排名。如果两者都满足，排名将更高：
{
    "bool": {
        "must":     { "match": { "title": "how to make millions" }},
        "must_not": { "match": { "tag":   "spam" }},
        "should": [
            { "match": { "tag": "starred" }},
            { "range": { "date": { "gte": "2014-01-01" }}}
        ]
    }
}
```

如果没有 `must` 语句，那么至少需要能够匹配其中的一条 `should` 语句。但，如果存在至少一条 `must` 语句，则对 `should` 语句的匹配没有要求。

如果不想因为文档的时间而影响得分，可以用 `filter` 语句来重写前面的例子：

```bash
{
    "bool": {
        "must":     { "match": { "title": "how to make millions" }},
        "must_not": { "match": { "tag":   "spam" }},
        "should": [
            { "match": { "tag": "starred" }}
        ],
        "filter": {
          "range": { "date": { "gte": "2014-01-01" }} 
        }
    }
}
```

通过将 range 查询移到 `filter` 语句中，将它转成不评分的查询，将不再影响文档的相关性排名。由于它现在是一个不评分的查询，可以使用各种对 filter 查询有效的优化手段来提升性能。

如果需要通过多个不同的标准来过滤文档，`bool` 查询本身也可以被用做不评分的查询。简单地将它放置到 `filter` 语句中并在内部构建布尔逻辑：

```bash
{
    "bool": {
        "must":     { "match": { "title": "how to make millions" }},
        "must_not": { "match": { "tag":   "spam" }},
        "should": [
            { "match": { "tag": "starred" }}
        ],
        "filter": {
          "bool": { 
              "must": [
                  { "range": { "date": { "gte": "2014-01-01" }}},
                  { "range": { "price": { "lte": 29.99 }}}
              ],
              "must_not": [
                  { "term": { "category": "ebooks" }}
              ]
          }
        }
    }
}
```

constant_score 将一个不变的常量评分应用于所有匹配的文档。它被经常用于只需要执行一个 filter 而没有其它查询（例如，评分查询）的情况下。可以使用它来取代只有 filter 语句的 `bool` 查询。在性能上是完全相同的，但对于提高查询简洁性和清晰度有很大帮助。

```bash
{
    "constant_score":   {
        "filter": {
            "term": { "category": "ebooks" } 
        }
    }
}
```

`validate-query` API 可以用来验证查询是否合法

```bash
GET website/_validate/query
{
  "query": {
    "constant_score":   {
        "filter": {
            "term": { "tags": "testing" } 
        }
    }
  }
}
# 为了找出 查询不合法的原因，可以将 explain 参数 加到查询字符串中：
GET website/_validate/query?explain
```

## 排序与相关性

```bash
##### 按字段值排序 #####
# 计算 _score 的花销巨大，通常仅用于排序
# 如果无论如何你都要计算 _score ， 可以将 track_scores 参数设置为 true 
GET /_search
{
    "query" : {
        "bool" : {
            "filter" : { "term" : { "user_id" : 1 }}
        }
    },
    "sort": { "date": { "order": "desc" }}
    # 也可以指定一个字段排序："sort": "number_of_children"
}

##### 多级排序 #####
GET /_search
{
    "query" : {
        "bool" : {
            "must":   { "match": { "tweet": "manage text search" }},
            "filter" : { "term" : { "user_id" : 2 }}
        }
    },
    "sort": [
        { "date":   { "order": "desc" }},
        { "_score": { "order": "desc" }}
    ]
}

##### 多值字段排序 #####
# 一个多值的字段仅仅是多个值的包装（无序）
# 对于数字或日期，你可以将多值字段减为单值，这可以通过使用 min 、 max 、 avg 或是 sum 排序模式
"sort": {
    "dates": {
        "order": "asc",
        "mode":  "min"
    }
}

##### 字符串排序与多字段 #####
# 用两种方式对同一个字符串进行索引，将在文档中包括两个字段： analyzed 用于搜索， not_analyzed 用于排序
# 以全文 analyzed 字段排序会消耗大量的内存。
"tweet": { 
    "type":     "string",
    "analyzer": "english",
    "fields": {
        "raw": { 
            "type":  "string",
            "index": "not_analyzed"
        }
    }
}
GET /_search
{
    "query": {
        "match": {
            "tweet": "elasticsearch"
        }
    },
    "sort": "tweet.raw"
}
```

查询语句会为每个文档生成一个 `_score` 字段。评分的计算方式取决于查询类型 不同的查询语句用于不同的目的： `fuzzy` 查询会计算与关键词的拼写相似程度，`terms` 查询会计算 找到的内容与关键词组成部分匹配的百分比，但是通常我们说的 *relevance* 是我们用来计算全文本字段的值相对于全文本检索词相似程度的算法。

Elasticsearch 的相似度算法 被定义为检索词频率 / 反向文档频率， *TF/IDF* ，包括以下内容：

- **检索词频率**：检索词在该字段出现的频率？出现频率越高，相关性也越高。 字段中出现过 5 次要比只出现过 1 次的相关性高。

- **反向文档频率**：每个检索词在索引中出现的频率？频率越高，相关性越低。

- **字段长度准则**：字段的长度是多少？长度越长，相关性越低。 

单个查询可以联合使用 TF/IDF 和其他方式，比如短语查询中检索词的距离或模糊查询里的检索词相似度。

相关性并不只是全文本检索的专利。也适用于 yes|no 的子句，匹配的子句越多，相关性评分越高。

如果多条查询子句被合并为一条复合查询语句 ，比如 bool 查询，则每个查询子句计算得出的评分会被合并到总的相关性评分中。

输出 `explain` 可以得到详细的计算信息，但代价是十分昂贵的，它只能用作调试工具 。JSON 形式的 `explain` 描述是难以阅读的， 但是转成 YAML 会好很多，只需要在参数中加上 `format=yaml` 。

在 `Elasticsearch` 中，`Doc Values` 就是一种列式存储结构，默认情况下每个字段的 `Doc Values` 都是激活的，`Doc Values` 是在索引时创建的，当字段索引时，`Elasticsearch` 为了能够快速检索，会把字段的值加入倒排索引中，同时它也会存储该字段的 `Doc Values`。`Elasticsearch` 中的 `Doc Values` 常被应用到以下场景：

- 对一个字段进行排序
- 对一个字段进行聚合
- 某些过滤，比如地理位置过滤
- 某些与字段相关的脚本计算

## 分布式检索

搜索需要一种更加复杂的执行模型因为我们不知道查询会命中哪些文档：这些文档有可能在集群的任何分片上。 一个搜索请求必须询问我们关注的索引（index or indices）的所有分片的某个副本来确定它们是否含有任何匹配的文档。搜索被执行成一个两阶段过程，我们称之为 *query then fetch* 。

### 查询

在初始 *查询阶段* 时， 查询会广播到索引中每一个分片拷贝（主分片或者副本分片）。 每个分片在本地执行搜索并构建一个匹配文档的 *优先队列*。一个 *优先队列* 仅仅是一个存有 *top-n* 匹配文档的有序列表。优先队列的大小取决于分页参数 `from` 和 `size` 。

查询阶段包含以下三个步骤:

1. 客户端发送一个 `search` 请求到 `Node 3` ， `Node 3` 会创建一个大小为 `from + size` 的空优先队列。
2. `Node 3` 将查询请求转发到索引的每个主分片或副本分片中。每个分片在本地执行查询并添加结果到大小为 `from + size` 的本地有序优先队列中。
3. 每个分片返回各自优先队列中所有文档的 ID 和排序值给协调节点，也就是 `Node 3` ，它合并这些值到自己的优先队列中来产生一个全局排序后的结果列表。

### 取回

当一个搜索请求被发送到某个节点时，这个节点就变成了协调节点。 这个节点的任务是广播（广播请求到索引中每一个节点的分片拷贝）查询请求到所有相关分片并将它们的响应整合成全局排序后的结果集合，这个结果集合会返回给客户端。每个分片在本地执行查询请求并且创建一个长度为 `from + size` 的优先队列 — 也就是说，每个分片创建的结果集足够大，均可以满足全局的搜索请求。 分片返回一个轻量级的结果列表到协调节点，它仅包含文档 ID 集合以及任何排序需要用到的值，例如 `_score` 。

分布式阶段由以下步骤构成：

1. 协调节点辨别出哪些文档需要被取回并向相关的分片提交多个 `GET` 请求。
2. 每个分片加载并 *丰富* 文档，如果有需要的话，接着返回文档给协调节点。
3. 一旦所有的文档都被取回了，协调节点返回结果给客户端。

### 选项

参数 `preference` 允许 用来控制由哪些分片或节点来处理搜索请求。最有用的值是某些随机字符串，它可以避免 *bouncing results* 问题。

>Bouncing Results: 每次用户刷新页面，搜索结果表现是不同的顺序。 让同一个用户始终使用同一个分片，这样可以避免这种问题， 可以设置 `preference` 参数为一个特定的任意值比如用户会话 ID 来解决。

参数 `timeout` 告诉 分片允许处理数据的最大时间。如果没有足够的时间处理所有数据，这个分片的结果可以是部分的，甚至是空数据。**最有效的操作**，很可能查询会超过设定的超时时间。

在搜索的时候，不用搜索索引的所有分片，而是通过指定几个 `routing` 值来限定只搜索几个相关的分片。

缺省的搜索类型是 `query_then_fetch`，搜索类型 `dfs_query_then_fetch` 有预查询阶段，这个阶段可以从所有相关分片获取词频来计算全局词频，能改善相关性精度。

### 游标查询 Scroll

`scroll` 查询 可以用来对 Elasticsearch 有效地执行大批量的文档查询，而又不用付出深度分页那种代价。游标查询允许我们 先做查询初始化，然后再批量地拉取结果。 这有点儿像传统数据库中的 *cursor* 。游标查询会取某个时间点的快照数据。 查询初始化之后索引上的任何变化会被它忽略。 它通过保存旧的数据文件来实现这个特性，结果就像保留初始化时的索引 *视图* 一样。启用游标查询可以通过在查询的时候设置参数 `scroll` 的值为我们期望的游标查询的过期时间。

```bash
GET /gb-tweet/_search?scroll=1m # 保持查询窗口 1 分钟
{
    "query": { "match_all": {}},
    "sort" : ["_doc"], 
    "size":  1000
}
# 这个查询的返回结果包括一个字段 _scroll_id`， 它是一个base64编码的长字符串 ((("scroll_id"))) 。 现在我们能传递字段 `_scroll_id 到 _search/scroll 查询接口获取下一批结果：
GET /_search/scroll
{
    "scroll": "1m", 
    "scroll_id" : "cXVlcnlUaGVuRmV0Y2g7NTsxMDk5NDpkUmpiR2FjOFNhNnlCM1ZDMWpWYnRROzEwOTk1OmRSamJHYWM4U2E2eUIzVkMxalZidFE7MTA5OTM6ZFJqYkdhYzhTYTZ5QjNWQzFqVmJ0UTsxMTE5MDpBVUtwN2lxc1FLZV8yRGVjWlI2QUVBOzEwOTk2OmRSamJHYWM4U2E2eUIzVkMxalZidFE7MDs="
}
```

当查询的时候， 字段 `size` 作用于单个分片，所以每个批次实际返回的文档数量最大为 `size * number_of_primary_shards` 。

## 索引管理

```bash
##### 创建索引 #####
PUT /my_index
{
    "settings": { ... any settings ... },
    "mappings": {
        "type_one": { ... any mappings ... },
        "type_two": { ... any mappings ... },
        ...
    }
}
# 如果想禁止自动创建索引，可以通过在 config/elasticsearch.yml 的每个节点下添加下面的配置：
action.auto_create_index: false

##### 删除索引 #####
DELETE /my_index
# 删除多个
DELETE /index_one,index_two
DELETE /index_*
# 删除所有
DELETE /_all
DELETE /*
# 配置使得删除只限于特定名称指向的数据
action.destructive_requires_name: true

##### 索引设置 #####
PUT /my_temp_index
{
    "settings": {
        "number_of_shards" :   1, # default=5, 创建后不可修改
        "number_of_replicas" : 0, # default=1，可以随时修改
    }
}
# 更改
PUT /my_temp_index/_settings
{
    "number_of_replicas": 1
}

##### 配置分析器 #####
PUT /spanish_docs
{
    "settings": {
        "analysis": {
            "analyzer": {
                "es_std": {
                    "type":      "standard",
                    "stopwords": "_spanish_" # 启用 spanish 停用词列表
                }
            }
        }
    }
}
# es_std 分析器不是全局的 -- 它仅仅存在于我们定义的 spanish_docs 索引中
GET /spanish_docs/_analyze
{
  "analyzer": "es_std",
  "text": "El veloz zorro marrón"
}

##### 自定义分析器 #####
PUT /my_index
{
    "settings": {
        "analysis": {
            "char_filter": { ... custom character filters ... },
            "tokenizer":   { ...    custom tokenizers     ... },
            "filter":      { ...   custom token filters   ... },
            "analyzer":    { ...    custom analyzers      ... }
        }
    }
}
# 完整的索引
PUT /my_index
{
    "settings": {
        "analysis": {
            "char_filter": {
                "&_to_and": {
                    "type":       "mapping",
                    "mappings": [ "&=> and "]
            }},
            "filter": {
                "my_stopwords": {
                    "type":       "stop",
                    "stopwords": [ "the", "a" ]
            }},
            "analyzer": {
                "my_analyzer": {
                    "type":         "custom",
                    "char_filter":  [ "html_strip", "&_to_and" ],
                    "tokenizer":    "standard",
                    "filter":       [ "lowercase", "my_stopwords" ]
            }}
}}}
GET /my_index/_analyze
{
  "analyzer": "my_analyzer",
  "text": "The quick & brown fox"
}

# 最重要的，将分析器应用在某个字段
PUT /my_index/_mapping
{
    "properties": {
        "title": {
            "type":      "text",
            "analyzer":  "my_analyzer"
        }
    }
}
```

`standard` 分析器是用于全文字段的默认分析器， 对于大部分西方语系来说是一个不错的选择。 它包括了以下几点：

- `standard` 分词器，通过单词边界分割输入的文本。
- `standard` 语汇单元过滤器，目的是整理分词器触发的语汇单元（但是目前什么都没做）。
- `lowercase` 语汇单元过滤器，转换所有的语汇单元为小写。
- `stop` 语汇单元过滤器，删除停用词 -- 对搜索相关性影响不大的常用词，如 `a` ， `the` ， `and` ， `is` 。

默认情况下，停用词过滤器是被禁用的。如需启用它，你可以通过创建一个基于 `standard` 分析器的自定义分析器并设置 `stopwords` 参数。 可以给分析器提供一个停用词列表，或者告知使用一个基于特定语言的预定义停用词列表。

一个 *分析器* 就是在一个包里面组合了三种函数的一个包装器， 三种函数按照顺序被执行:

- **字符过滤器**：字符过滤器 用来 `整理` 一个尚未被分词的字符串。一个分析器可能有 0 个或者多个字符过滤器。
- **分词器**：一个分析器 *必须* 有一个唯一的分词器。 分词器把字符串分解成单个词条或者词汇单元。

- **词单元过滤器**：经过分词，作为结果的 *词单元流* 会按照指定的顺序通过指定的词单元过滤器 。

*类型* 在 Elasticsearch 中表示一类相似的文档。 类型由 *名称* — 比如 `user` 或 `blogpost` — 和 *映射* 组成。

对于元数据，Elasticsearch 在 `_source` 字段存储代表文档体的 JSON 字符串。和所有被存储的字段一样， `_source` 字段在被写入磁盘之前先会被压缩。这个字段的存储几乎总是我们想要的，因为它意味着下面的这些：

- 搜索结果包括了整个可用的文档 —— 不需要额外的从另一个的数据仓库来取文档。
- 如果没有 `_source` 字段，部分 `update` 请求不会生效。
- 当你的映射改变时，你需要重新索引你的数据，有了_source 字段你可以直接从 Elasticsearch 这样做，而不必从另一个（通常是速度更慢的）数据仓库取回你的所有文档。
- 当你不需要看到整个文档时，单个字段可以从 `_source` 字段提取和通过 `get` 或者 `search` 请求返回。
- 调试查询语句更加简单，因为你可以直接看到每个文档包括什么，而不是从一列 id 猜测它们的内容。

然而，存储 `_source` 字段的确要使用磁盘空间。如果上面的原因没有一个是重要的，可以用下面的映射禁用 `_source` 字段：

```bash
# 禁用 _source 字段
PUT /my_index
{
    "mappings": {
        "_source": {
        "enabled":  false
        }
    }
}
# 获取特定字段
GET /_search
{
    "query":   { "match_all": {}},
    "_source": [ "title", "created" ]
}
```

当 Elasticsearch 遇到文档中以前 未遇到的字段，它用 *dynamic mapping* 来确定字段的数据类型并自动把新的字段添加到类型映射。

```bash
PUT /my_index2
{
    "mappings": {
          "dynamic":      "strict", 
          "properties": {
              "title":  { "type": "text"},
              "stash":  {
                  "type":     "object",
                  "dynamic":  true 
              }
          }
    }
}
# 使用该动态映射可以给 stash 对象添加新的可检索的字段
POST /my_index/_doc/1
{
    "title":   "This doc adds a new field",
    "stash": { "new_field": "Success!" }
}
# 对根节点对象 my_type 进行同样的操作会失败
PUT /my_index2/_doc/1
{
    "title":     "This throws a StrictDynamicMappingException",
    "new_field": "Fail!"
}
```

把 `dynamic` 设置为 `false` 一点儿也不会改变 `_source` 的字段内容。 `_source` 仍然包含被索引的整个 JSON 文档。只是新的字段不会被加到映射中也不可搜索。

```bash
# 关闭日期检测
PUT /my_index3
{
    "mappings": {
        "date_detection": false
    }
}
```

Elasticsearch 判断字符串为日期的规则可以通过 `dynamic_date_formats` setting  来设置。

使用 `dynamic_templates` 可以完全控制 新检测生成字段的映射，甚至可以通过字段名称或数据类型来应用不同的映射。

```bash
PUT /my_index
{
    "mappings": {
        "dynamic_templates": [
        { "es": {
        "match":              "*_es",  # 匹配字段名以 _es 结尾的字段。
        "match_mapping_type": "text",
        "mapping": {
        "type":           "text",
        "analyzer":       "spanish"
        }
        }},
        { "en": {
        "match":              "*",  # 匹配其他所有字符串类型字段。
        "match_mapping_type": "text",
        "mapping": {
        "type":           "text",
        "analyzer":       "english"
        }
        }}
        ]
}}
```

`match_mapping_type` 允许应用模板到特定类型的字段上，就像有标准动态映射规则检测的一样， (例如 `string` 或 `long`)。`match` 参数只匹配字段名称， `path_match` 参数匹配字段在对象上的完整路径，所以 `address.*.name`将匹配这样的字段：

```bash
{
    "address": {
        "city": {
            "name": "New York"
        }
    }
}
```

`unmatch` 和 `path_unmatch`将被用于未被匹配的字段。

对现有数据重新索引：[Reindex API | Elasticsearch Reference [7.2] | Elastic](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html)

```bash
# 索引别名
PUT /my_index_v1 
PUT /my_index_v1/_alias/my_index_alias # 别名 my_index_alias 指向 my_index_v1
# 检测这个别名指向哪个索引，或哪些别名指向这个索引
GET /*/_alias/my_index_alias
GET /my_index_v1/_alias/*
# 重新索引
PUT /my_index_v2
{
    "mappings": {
        "properties": {
            "tags": {
                "type":   "text",
                "index":  "true"
            }
        }
    }
}
# 从旧索引迁移到新索引
POST /_aliases
{
    "actions": [
        { "remove": { "index": "my_index_v1", "alias": "my_index_alias" }},
        { "add":    { "index": "my_index_v2", "alias": "my_index_alias" }}
    ]
}
```

## 分片内部管理

倒排索引被写入磁盘后是 *不可改变* 的：它永远不会修改。 如果需要让一个新文档可被搜索需要重建整个索引。

怎样在保留不变性的前提下实现倒排索引的更新？ 用更多的索引。通过增加新的补充索引来反映新近的修改，而不是直接重写整个倒排索引。每一个倒排索引都会被轮流查询到 -- 从最早的开始 -- 查询完后再对结果进行合并。

一个 *Lucene 索引* 我们在 Elasticsearch 称作 *分片* 。 一个 Elasticsearch *索引*是分片的集合。 当 Elasticsearch 在索引中搜索的时候， 他发送查询到每一个属于索引的分片 (Lucene 索引)，然后像 *执行分布式检索* 提到的那样，合并每个分片的结果到一个全局的结果集。

Elasticsearch 基于 Lucene, 这个 java 库引入了 *按段搜索* 的概念。 每一 *段* 本身都是一个倒排索引， 但 *索引* 在 Lucene 中除表示所有 *段* 的集合外， 还增加了 *提交点* 的概念。

逐段搜索会以如下流程进行工作：

1. 新文档被收集到内存索引缓存。
2. 不时地，缓存被 *提交* ：
    - 一个新的段 -- 一个追加的倒排索引 -- 被写入磁盘。
    - 一个新的包含新段名字的 *提交点* 被写入磁盘。
    - 磁盘进行 *同步* — 所有在文件系统缓存中等待的写入都刷新到磁盘，以确保它们被写入物理文件。
3. 新的段被开启，让它包含的文档可见以被搜索。
4. 内存缓存被清空，等待接收新的文档。

段是不可改变的，所以既不能从把文档从旧的段中移除，也不能修改旧的段来进行反映文档的更新。 取而代之的是，每个提交点会包含一个 `.del` 文件，文件中会列出这些被删除文档的段信息。

- 当一个文档被 “删除” 时，它实际上只是在 `.del` 文件中被 *标记* 删除。一个被标记删除的文档仍然可以被查询匹配到， 但它会在最终结果被返回前从结果集中移除。

- 文档更新也是类似的操作方式：当一个文档被更新时，旧版本文档被标记删除，文档的新版本被索引到一个新的段中。 可能两个版本的文档都会被一个查询匹配到，但被删除的那个旧版本文档在结果集返回前就已经被移除。

Lucene 允许新段被写入和打开 -- 使其包含的文档在未进行一次完整提交时便对搜索可见。 这种方式比进行一次提交代价要小得多，并且在不影响性能的前提下可以被频繁地执行。在 Elasticsearch 中，写入和打开一个新段的轻量的过程叫做 *refresh* 。 默认情况下每个分片会每秒自动刷新一次。这就是为什么我们说 Elasticsearch 是 *近* 实时搜索: 文档的变化并不是立即对搜索可见，但会在一秒之内变为可见。

```bash
# 刷新所有索引
POST /_refresh 
# 刷新 blog 索引
POST /blogs/_refresh 
# 降低刷新频率
PUT /my_logs
{
  "settings": {
    "refresh_interval": "30s" 
  }
}
```

尽管刷新是比提交轻量很多的操作，它还是会有性能开销。 当写测试的时候， 手动刷新很有用，但是不要在生产环境下每次索引一个文档都去手动刷新。 

`refresh_interval` 可以在既存索引上进行动态更新。 在生产环境中，当你正在建立一个大的新索引时，可以先关闭自动刷新，待开始使用该索引时，再把它们调回来。

```bash
PUT /website/_settings
{ "refresh_interval": -1 } 

PUT /website/_settings
{ "refresh_interval": "1s" } 
```

即使通过每秒刷新（refresh）实现了近实时搜索，我们仍然需要经常进行完整提交来确保能从失败中恢复。但在两次提交之间发生变化的文档怎么办？Elasticsearch 增加了一个 *translog* ，或者叫事务日志，在每一次对 Elasticsearch 进行操作时均进行了日志记录。

translog 提供所有还没有被刷到磁盘的操作的一个持久化纪录。当 Elasticsearch 启动的时候， 它会从磁盘中使用最后一个提交点去恢复已知的段，并且会重放 translog 中所有在最后一次提交后发生的变更操作。

translog 也被用来提供实时 CRUD 。当你试着通过 ID 查询、更新、删除一个文档，它会在尝试从相应的段中检索之前， 首先检查 translog 任何最近的变更。这意味着它总是能够实时地获取到文档的最新版本。

执行一个提交并且截断 translog 的行为在 Elasticsearch 被称作一次 *flush* 。 分片每 30 分钟被自动刷新（flush），或者在 translog 太大的时候也会刷新。

```bash
# 手动刷新
POST /website/_flush 
POST /_flush?wait_if_ongoing # 所有
```

在重启节点或关闭索引之前执行 flush 有益于索引。当 Elasticsearch 尝试恢复或重新打开一个索引， 它需要重放 translog 中所有的操作，所以如果日志越短，恢复越快。

在文件被 `fsync` 到磁盘前，被写入的文件在重启之后就会丢失。默认 translog 是每 5 秒被 `fsync` 刷新到硬盘， 或者在每次写请求完成之后执行 (e.g. index, delete, update, bulk)。这个过程在主分片和复制分片都会发生。对于一些大容量的偶尔丢失几秒数据问题也并不严重的集群，使用异步的 fsync 还是比较有益的。这个行为可以通过设置 `durability` 参数为 `async` 来启用：

```bash
PUT /my_index/_settings
{
    "index.translog.durability": "async", # default="request"
    "index.translog.sync_interval": "5s"
}
```

如果决定使用异步 translog 的话，需要 *保证* 在发生 crash 时，丢失掉 `sync_interval` 时间段的数据也无所谓。

由于自动刷新流程每秒会创建一个新的段 ，这样会导致短时间内的段数量暴增。而段数目太多会带来较大的麻烦。 每一个段都会消耗文件句柄、内存和 cpu 运行周期。更重要的是，每个搜索请求都必须轮流检查每个段；所以段越多，搜索也就越慢。Elasticsearch 通过在后台进行段合并来解决这个问题。小的段被合并到大的段，然后这些大的段再被合并到更大的段。段合并的时候会将那些旧的已删除文档 从文件系统中清除。 被删除的文档（或被更新文档的旧版本）不会被拷贝到新的大段中。

段合并会在索引和搜索时自动进行：

1、 当索引的时候，刷新（refresh）操作会创建新的段并将段打开以供搜索使用。

2、 合并进程选择一小部分大小相似的段，并且在后台将它们合并到更大的段中。这并不会中断索引和搜索。

3、 合并完成时：

- 新的段被刷新（flush）到了磁盘。写入一个包含新段且排除旧的和较小的段的新提交点。
- 新的段被打开用来搜索。
- 老的段被删除。

`optimize` API 大可看做是 *强制合并* API 。它会将一个分片强制合并到 `max_num_segments` 参数指定大小的段数目。 这样做的意图是减少段的数量（通常减少到一个），来提升搜索性能。`optimize` API *不应该* 被用在一个活跃的索引 —— 一个正积极更新的索引。

在特定情况下，使用 `optimize` API 颇有益处。例如在日志这种用例下，每天、每周、每月的日志被存储在一个索引中。 老的索引实质上是只读的；它们也并不太可能会发生变化。如果想要对索引执行 `optimize`，需要先使用分片分配（查看 迁移旧索引）把索引移到一个安全的节点，再执行。

## 参考

- [基础入门 | Elasticsearch: 权威指南 | Elastic](https://www.elastic.co/guide/cn/elasticsearch/guide/cn/getting-started.html)

