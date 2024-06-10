---
title: Python 编码笔记整理
date: 2017-03-05 18:00:00
tags: [Python]
categories: Coding
---

## 目录
 <p><div class="lev1 toc-item"><a href="#Python-中文编码" data-toc-modified-id="Python-中文编码-1"><span class="toc-item-num">1&nbsp;&nbsp;</span>Python 中文编码</a></div><div class="lev2 toc-item"><a href="#字符串和编码" data-toc-modified-id="字符串和编码-11"><span class="toc-item-num">1.1&nbsp;&nbsp;</span>字符串和编码</a></div><div class="lev2 toc-item"><a href="#存储和执行时的状态" data-toc-modified-id="存储和执行时的状态-12"><span class="toc-item-num">1.2&nbsp;&nbsp;</span>存储和执行时的状态</a></div><div class="lev2 toc-item"><a href="#Python-字符串" data-toc-modified-id="Python-字符串-13"><span class="toc-item-num">1.3&nbsp;&nbsp;</span>Python 字符串</a></div><div class="lev3 toc-item"><a href="#encode" data-toc-modified-id="encode-131"><span class="toc-item-num">1.3.1&nbsp;&nbsp;</span><code>encode</code></a></div><div class="lev3 toc-item"><a href="#decode" data-toc-modified-id="decode-132"><span class="toc-item-num">1.3.2&nbsp;&nbsp;</span><code>decode</code></a></div><div class="lev3 toc-item"><a href="#str" data-toc-modified-id="str-133"><span class="toc-item-num">1.3.3&nbsp;&nbsp;</span><code>str</code></a></div><div class="lev3 toc-item"><a href="#type" data-toc-modified-id="type-134"><span class="toc-item-num">1.3.4&nbsp;&nbsp;</span><code>type</code></a></div><div class="lev1 toc-item"><a href="#实际程序中的编码" data-toc-modified-id="实际程序中的编码-2"><span class="toc-item-num">2&nbsp;&nbsp;</span>实际程序中的编码</a></div><div class="lev2 toc-item"><a href="#Python-源代码中的说明" data-toc-modified-id="Python-源代码中的说明-21"><span class="toc-item-num">2.1&nbsp;&nbsp;</span>Python 源代码中的说明</a></div><div class="lev2 toc-item"><a href="#要循环处理字符串的时候需要解码" data-toc-modified-id="要循环处理字符串的时候需要解码-22"><span class="toc-item-num">2.2&nbsp;&nbsp;</span>要循环处理字符串的时候需要解码</a></div><div class="lev2 toc-item"><a href="#字符匹配的时候需要解码" data-toc-modified-id="字符匹配的时候需要解码-23"><span class="toc-item-num">2.3&nbsp;&nbsp;</span>字符匹配的时候需要解码</a></div><div class="lev2 toc-item"><a href="#结巴分词" data-toc-modified-id="结巴分词-24"><span class="toc-item-num">2.4&nbsp;&nbsp;</span>结巴分词</a></div><div class="lev3 toc-item"><a href="#jieba-分词后词语变为-unicode-编码" data-toc-modified-id="jieba-分词后词语变为-unicode-编码-241"><span class="toc-item-num">2.4.1&nbsp;&nbsp;</span>jieba 分词后词语变为 unicode 编码</a></div><div class="lev3 toc-item"><a href="#去掉标点符号" data-toc-modified-id="去掉标点符号-242"><span class="toc-item-num">2.4.2&nbsp;&nbsp;</span>去掉标点符号</a></div><div class="lev1 toc-item"><a href="#读存文档时的编码" data-toc-modified-id="读存文档时的编码-3"><span class="toc-item-num">3&nbsp;&nbsp;</span>读存文档时的编码</a></div><div class="lev2 toc-item"><a href="#读取文档注意事项" data-toc-modified-id="读取文档注意事项-31"><span class="toc-item-num">3.1&nbsp;&nbsp;</span>读取文档注意事项</a></div><div class="lev2 toc-item"><a href="#txt-文档" data-toc-modified-id="txt-文档-32"><span class="toc-item-num">3.2&nbsp;&nbsp;</span>txt 文档</a></div><div class="lev2 toc-item"><a href="#codecs" data-toc-modified-id="codecs-33"><span class="toc-item-num">3.3&nbsp;&nbsp;</span><code>codecs</code></a></div><div class="lev2 toc-item"><a href="#JSON" data-toc-modified-id="JSON-34"><span class="toc-item-num">3.4&nbsp;&nbsp;</span><code>JSON</code></a></div><div class="lev2 toc-item"><a href="#直接存储-Unicode" data-toc-modified-id="直接存储-Unicode-35"><span class="toc-item-num">3.5&nbsp;&nbsp;</span>直接存储 Unicode</a></div><div class="lev2 toc-item"><a href="#直接存储-String" data-toc-modified-id="直接存储-String-36"><span class="toc-item-num">3.6&nbsp;&nbsp;</span>直接存储 String</a></div><div class="lev1 toc-item"><a href="#参考资料" data-toc-modified-id="参考资料-4"><span class="toc-item-num">4&nbsp;&nbsp;</span>参考资料</a></div>

# Python 中文编码

Python 中文编码是新人常见的一个问题，其实这是一个涉及到 Python 字符串、编码、IO 读写等方面的问题。

<!--more-->

## 字符串和编码

计算机只能处理数字，文本需要转为数字。最早的计算机采用 8 个 bit（比特，计算机最小数据单位） 作为一个 byte（字节，存储和传输容量的一种基本计量单位）。所以一个字节表示的最大整数是 255（二进制：11111111 = 十进制 255：2^7 + 2^6 +...+ 2^1 +2^0），更大整数需要更多字节。

最早只有 127 个字母（英文的大小写字母和数字，一些符号等）被编码到计算机，这个编码表就是 `ASCII`，没有中文。  
中文至少需要两个字节，并且不能和已有的 `ASCII` 冲突，于是有了中国制定的 `GB2312` 编码，用来把中文编进去。  

全世界很多语言，就会有很多编码，因此 `Unicode` 就出现了，从字面意思也可以看出这是一套“整合”的编码。不过由于中文等语言编码长度很长，就会导致只使用英文的文本多占用很多存储空间，在存储和传输上十分不方便。于是，出现了把 Unicode 转化为“可变长编码”的 `UTF-8` 编码。

`UTF-8` 编码把一个 Unicode 字符根据不同的数字大小编码成 1-6 个字节：  
- 英文字母 1 个字节
- 汉字通常 3 个字节
这样，无论传输什么文本，`UTF-8` 都能节省空间。总结下就是，`ASCII` 实际可以看成是 `UTF-8` 的一部分，所以之前的软件现在也能使用，这个也可以看作是一种向下兼容。

## 存储和执行时的状态

在计算机内存中，统一使用 Unicode 编码；当需要保存到硬盘，或者在网络上传输时，就转为 UTF-8 编码  

记事本编辑时，从文件读取的 UTF-8 字符被转为 Unicode 字符到内存里；编辑完成保存时，把 Unicode 转换为 UTF-8 保存  

浏览网页时，服务器会把生成的 Unicode 转换为 UTF-8 再传输导浏览器，所以很多网页是用 UTF-8 编码的

## Python 字符串

Python 诞生早于 Unicode 标准发布，所以最早只支持 ASCII 编码（不支持中文），后来增加了对 Unicode 的编码，就是看到的 `u'...'`，就表示是用 Unicode 编码的


```python
print u'中文'
```

    中文



```python
u'中'
```




    u'\u4e2d'




```python
u'A'
```




    u'A'




```python
u'\u0041'
```




    u'A'



`u'中'` 和 `u'\u4e2d'` 一致，`\u` 后面是十六进制的 Unicode 码。  

对英文来说，字符串 `'xxx'` 可以看作是 ASCII 编码，也可以看作是 UTF-8 编码，但是 `u'xxx'` 一定是 Unicode 编码  

Unicode 转换为 UTF-8 用 encode，相反则用 decode：  

### `encode`


```python
u'ABC'.encode('utf-8') # 没变化，但占用的存储空间不同，UTF-8 占用的少
```




    'ABC'




```python
u'中文'.encode('utf-8') # 1 个 Unicode 的汉字转为 3 个字节
```




    '\xe4\xb8\xad\xe6\x96\x87'




```python
len(u'ABC'), len('ABC') # 长度一样
```




    (3, 3)




```python
len(u'中文'), len(u'中文'.encode('utf-8'))
```




    (2, 6)



### `decode`

`decode` 可以把 UTF-8 表示的字符串转换为 Unicode 字符串


```python
'abc'.decode('utf-8')
```




    u'abc'




```python
'\xe4\xb8\xad\xe6\x96\x87'.decode('utf-8')
```




    u'\u4e2d\u6587'




```python
print '\xe4\xb8\xad\xe6\x96\x87'.decode('utf-8')
```

    中文


### `str`

用 str 也可以把 unicode 重新编码 utf-8


```python
#-*- coding: utf-8 -*- 

str('中文')
```




    '\xe4\xb8\xad\xe6\x96\x87'




```python
str('\xe4\xb8\xad\xe6\x96\x87')
```




    '\xe4\xb8\xad\xe6\x96\x87'



### `type`


```python
type(u'中文')
```




    unicode




```python
type('中文') # 中文字符串是 UTF-8 编码
```




    str




```python
'中文'
```




    '\xe4\xb8\xad\xe6\x96\x87'




```python
type('\xe4\xb8\xad\xe6\x96\x87'.decode('utf-8')) # UTF-8 码转为 Unicode
```




    unicode



# 实际程序中的编码

## Python 源代码中的说明

在保存源代码时要声明程序的编码类型为 utf-8，这样当 Python 解释器去读取源代码时就会明白：

- `!/usr/bin/env python2.7`  
- `-*- coding: utf-8 -*-`  

第一行告诉 Linux/OS X 这是一个 Python 可执行程序  
第二行告诉 Python 解释器，按照 UTF-8 读取源代码，否则源代码中的中文可能会乱码

## 要循环处理字符串的时候需要解码


```python
#-*- coding: utf-8 -*- 

token = "，.!?？：:"

for t in token:
    print t
```

    �
    �
    �
    .
    !
    ?
    �
    �
    �
    �
    �
    �
    :



```python
# 解码
for t in token.decode('utf-8'):
    print t
```

    ，
    .
    !
    ?
    ？
    ：
    :


把字符串 decode 为 utf-8 后，就可以被遍历**循环**了。

## 字符匹配的时候需要解码


```python
#-*- coding: utf-8 -*- 

token = "，。！？：；".decode('utf8')
string_list = ['我', '是', '中国', '人' ,'，', '我', '爱', '她', '。']

for t in token:
    
    for s1 in string_list:
        
        if t == s1: # 逗号和句号无法匹配的，因为编码不同
            print t
```

    /home/evil_rabbit/anaconda2/lib/python2.7/site-packages/ipykernel/__main__.py:10: UnicodeWarning: Unicode equal comparison failed to convert both arguments to Unicode - interpreting them as being unequal



```python
for t in token:
    
    for s1 in string_list:
        
        if t == s1.decode('utf-8'): # 编码相同，可以匹配；UTF-8 转为 Unicode
            print t
```

    ，
    。



```python
'我'
```




    '\xe6\x88\x91'




```python
for t in token:
    
    for s1 in string_list:
        
        if t.encode('utf-8') == s1: # 编码相同，可以匹配
            print t
```

    ，
    。


## 结巴分词

### jieba 分词后词语变为 unicode 编码


```python
#-*- coding: utf-8 -*- 

import jieba

string = "我是中国人，我喜欢编程、音乐、运动、看书。"

string_list = []

seg = jieba.cut(string)

for word in seg:
    string_list.append(word)

print string_list
```

    [u'\u6211', u'\u662f', u'\u4e2d\u56fd', u'\u4eba', u'\uff0c', u'\u6211', u'\u559c\u6b22', u'\u7f16\u7a0b', u'\u3001', u'\u97f3\u4e50', u'\u3001', u'\u8fd0\u52a8', u'\u3001', u'\u770b\u4e66', u'\u3002']


### 去掉标点符号


```python
#-*- coding: utf-8 -*- 

import jieba

string = "我是中国人，我喜欢编程、音乐、运动、看书。"

string_list = []

seg = jieba.cut(string)

for i in seg:
    string_list.append(i)

token = "，。！？：；、".decode('utf-8')

filter_seg = [fil for fil in string_list if fil not in token]

for word in filter_seg:
    
    print word
```

    我
    是
    中国
    人
    我
    喜欢
    编程
    音乐
    运动
    看书



```python
#-*- coding: utf-8 -*- 

import jieba

string = "我是中国人，我喜欢编程、音乐、运动、看书。"

string_list = []

seg = jieba.cut(string)

for i in seg:
    string_list.append(i)

token = "，。！？：；、".decode('utf-8')

for word in string_list:
    
    if word not in token:
        print word
```

    我
    是
    中国
    人
    我
    喜欢
    编程
    音乐
    运动
    看书


# 读存文档时的编码

## 读取文档注意事项

为了避免每次都要 close 文件，建议使用 with


```python
with open('/./xx.txt', 'r') as f:
    f.read()
```

`read()` 会一次性读取全部内容，如果文件太大，可以用 `read(size)` 读取 size 个字节的内容。  
或者调用 `readline()` 按行读取；调用 `readlines()` 一次读取所有内容并按行返回 list


```python
for line in f.readlines():
    line.strip() # 去掉末尾的 '\n'
```

## txt 文档

- txt 文档存储时要另存为 utf-8 编码。txt 文档默认编码为 ascii
- 列表内容存储回 txt 文档时，要把 Python 里的 unicode 编码为 utf-8。只有编码为 utf-8，才能正常在 txt 文档中显示出来  

  - `encode('utf-8')`
  - str()


```python
#-*- coding: utf-8 -*- 

import jieba

string = "我是中国人，我喜欢编程、音乐、运动、看书。"

string_list = []

seg = jieba.cut(string)

for i in seg:
    string_list.append(i)

token = "，。！？：；、".decode('utf-8') # 对 UTF-8 的字符串解为 Unicode

filter_seg = [fil for fil in string_list if fil not in token]

f = open('output.txt', 'w')

for word in filter_seg:
    f.write(word.encode('utf-8') + ' ')
    #f.write(str(word)+' ') # 不成功，采用 encode
f.close()
```

如果读取非 ASCII 编码的文本文件，可以用二进制模式打开，再解码；或者给 `open` 函数传入 `encoing` 参数


```python
# GBK 编码的文件
f = open('./xx.txt', 'rb') # 二进制读取
u = f.read().decode('gbk')
```


```python
f = open('/./xx.txt', 'r', encoding='gbk')
f.read()
```

遇到编码不规范的文件，可以给 `open` 函数一个 `errors` 的参数


```python
f = open('/./xx.txt', 'r', encoding='gbk', errors='ignore') # 忽略错误编码
```

## `codecs`

python 的 `codecs` 模块可以帮助我们在读取文件时自动转换编码，直接读出 Unicode


```python
# GBK 编码的文件
import codecs
with codecs.open('/./xx.txt', 'r', 'gbk') as f:
    f.read()
```

## `JSON`

JSON 是不同语言的标准格式，速度快，而且可以直接在 Web 页面读取，非常方便。  
因此，我们可以将一些需要调取的 dict 存储为 JSON。  
另外一个原因，JSON 标准规定编码是 UTF-8，所以 Python 内置的 `json` 模块让我们很方便地在 Python 的 `str` 与 JSON 字符串之间转换。


```python
import json
d = dict(name='Bob', age=20, score=88)
json.dumps(d) # dumps 返回一个 str，内容就是标准的 JSON
```




    '{"age": 20, "score": 88, "name": "Bob"}'




```python
json_str = '{"age": 20, "score": 88, "name": "Bob"}'
json.loads(json_str) # 成功读取
```




    {u'age': 20, u'name': u'Bob', u'score': 88}



实际操作中，可以直接将 `json.dumps(d)` 写入 txt 文档，读取时 `json.loads(f.read())` 即可。

## 直接存储 Unicode

不将 Unicode 转为实际的文本存储字符集，而是将 Unicode 的内存编码值直接存储，读取文件时再反向转换回来


```python
# 存储
# 从 Unicode 到 Unicode-escape
# unicodestr.encode('unicode-escape')
u'中文'.encode('unicode-escape')
```




    '\\u4e2d\\u6587'




```python
# 读取
# 从 Unicode-escape 到 Unicode
# unicodestr.decode('unicode-escape')
'\\u4e2d\\u6587'.decode('unicode-escape')
```




    u'\u4e2d\u6587'




```python
print(u'\u4e2d\u6587')
```

    中文


## 直接存储 String

对于 UTF-8 编码的字符串，在存储时也可以直接存储编码值


```python
# 存储
# 从 UTF-8 到 string-escape
# utf8str.encode('string-escape')
'中文'.encode('string-escape')# 注意 '中文' 是 UTF-8
```




    '\\xe4\\xb8\\xad\\xe6\\x96\\x87'




```python
# 读取
# 从 string-escape 到 UTF-8
# utf8str.decode('string-escape')
'\\xe4\\xb8\\xad\\xe6\\x96\\x87'.decode('string-escape')# 注意 string '中文' 是 UTF-8
```




    '\xe4\xb8\xad\xe6\x96\x87'



# 参考资料

- [廖雪峰 Python 教程：廖神教程强烈推荐](http://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000)
- [python 的中文编码_乱码问题的解决方法和探寻](http://blog.sina.com.cn/s/blog_6285b6f60100u15a.html)  
- [初探 python 编码](http://blog.csdn.net/liuxincumt/article/details/8183391)
- [Python 中 Unicode 字符串](http://bbs.csdn.net/topics/390388139)

