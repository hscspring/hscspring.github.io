---
title: 正则表达式笔记
date: 2017-09-04 22:00:00
categories: Coding
tags: [Regular Expression, Python, Regex]
---

## 操作

### compile

- compile 常用的表达式更高效：使用编译的表达式能避免高速缓存查找开销，将编译工作转移到应用程序启动时，而不是程序响应用户操作
- 在字符串前加个 `r` 反斜杠就不会被任何特殊方式处理
- `re.findall(rf'{t}', s)`: **`f` 表示 `t` 可以使用变量**
- `re.compile(pattern, re.IGNORECASE)`: IGNORECASE 忽略大小写
- `re.compile(pattern, re.MULTILINE)`: 是否按行匹配，带参数按行，不带参数整个字符串为整体（不考虑换行符）
- `re.compile(pattern, re.DOTALL)`: 默认不匹配换行符，带参数匹配换行符
- `re.compile(pattern, re.Unicode | re.VERBOSE)`: 让 pattern 看起来更易读。多个标志可以通过按位 OR-ing 它们来指定。如 `re.I | re.M` 被设置成 I 和 M 标志
- 嵌入标志（编译表达式无法添加标志时，可以在表达式字符串本身内嵌入标志）
  - 打开不区分大小写匹配项: `(?i)` 添加到 pattern 的最前面就好
  - `i: IGNORECASE; m: MULTILINE; s: DOTALL; u: UNICODE; x: VERBOSE`

<!--more-->

### 无捕获组和命名组

- `(?:pattern)`: 无捕获组，对于修改已有组尤其有用，因为你可以不用改变所有其他组号的情况下添加一个新组。
- `(?P<name>...)` 定义一个命名组，`(?P=name)` 则是对命名组的逆向引用；逆向引用允许你指定先前捕获组的内容，该组也必须在字符串当前位置被找到。举个例子，如果组 1 的内容能够在当前位置找到的话，`\1` 就成功否则失败。除了用数字指定组，它可以用名字来指定，如：`(\b\w+)\s+\1` 也可以被写成 `(?P<word>\b\w+)\s+(?P=word)`
    - `re.compile(r'(\w+)\1\1\1')`: 匹配一个字重复四次的那个「字」
    - `re.compile(r'((\w+)\2+)')`: 匹配重复两次或两次以上的，返回对应的值和那个重复的「字」，必须整个用括号括起来

### 条件表达式

`条件：(?(id)yes-expression|no-expression)`,  id 是 group name or number

- `yes-expression` is the pattern to use if the group has a value，如果 group 有返回值时执行 
- `no-expression` is the pattern to use otherwise. 
- `(?=(<.*>$)|([^<].*[^>]$))`
- `条件表达式例子1：(?(name)(?=(\w+))|(?=([^<].*[^>]$)))`，如果找到 `name`，执行前面的，否则执行后面的
- `条件表达式例子2：(?(name)(?P<brackets>(?=(<.*>$)))|(?=([^<].*[^>]$)))`
- `调用（非条件表达式）：(?P<email>(?P=first_name)\.(?P=last_name)@([\w\d.]+\.)+(com|org|edu))`

### 环视

- `(?!pattern)`: 前向否定，不匹配 pattern，匹配不是 bat 或 exe 后缀的：`.*[.](?!bat$|exe$).*$`；`re.compile(r'Isaac(?!Asimov)')`：Isaac 前面有 Asimov **不**能匹配 Isaac
- `(?=pattern)`: 前向肯定，匹配，A positive look ahead assertion，条件不占匹配符；`re.compile(r'Isaac(?=Asimov)')`：Isaac 前面有 Asimov 才能匹配 Isaac
- `(?<!noreply)` 后向否定，放在匹配到的 username 下和 `(?!noreply@.*$)` 放在最前面匹配是一样的；`re.compile(r'(?<!Asimov)Isaac')`：Isaac 后面有 Asimov **不**能匹配 Isaac
- `(?<=@)`: 后向肯定，A positive look behind assertion, must use a fixed length pattern；`re.compile(r'(?<=Asimov)Isaac')`：Isaac 后面有 Asimov 才能匹配 Isaac

上面的只支持固定长度，如果要使用可变长度，需要 `regex` 包：[mrabarnett / mrab-regex — Bitbucket](https://bitbucket.org/mrabarnett/mrab-regex)

-  `regex.compile(rf'(?<![{quantifier}]+\w*)(之一)([{punc}]?)')`: 非固定宽度否定逆序环视，用后面的符号即做隔断，在结尾又可不存在。不等于 “数量词” + XXX + 之一，且标点结尾的；注意：quantifier 是变量
- `regex` 的环视**可以跳跃查找，而普通的 `re` 只能连在一起**。举个例子：找到 非量词 + 之一
    - 普通正则：`(!量词)\w+之一`：这样因为 `\w` 包括了量词，所以并不能查找出来
    - 环视方法：`(?<!量词)\w+之一`：可以分成三部分：非量词+其他词+之一
-  再几个例子：
    -  `regex.match(r'(?(?=\d)\d+|\w+)', '123abc')` 匹配到 123
    -  `regex.match(r'(?(?=\d)\d+|\w+)', 'abc123')` 匹配到 abc123，只能匹配第二个
    -  `regex.match(r'(?:(?=\d)\d+\b|\w+)', '123a')` 匹配到 123a，匹配第二个
    -  `regex.match(r'(?(?=\d)\d+\b|\w+)', '123a')` 结果为 None，第一个如果匹配到就不会再到第二个
    -  `regex.match(r'(?(?=\d)\d+\b|\w+)', 'abc')` 匹配到 abc，匹配第二个
    -  `regex.match(r'(?(?=\d)\d+\b|\w+)', '123')` 匹配到 123，匹配第一个

### 匹配查找

- `re.search()`
  - 使用 pattern 扫描文本
  - 如果找到则返回 Match 对象，否则返回 `None`，`match.start(), match.end()` 或 `match.span()` 返回匹配到对象的起止位置
  - **`pattern.search()`**：返回子串，而不是 `re.search()` 的整个字符串
- `re.match()`
  - 只有 pattern 在文本的最开始才返回结果，否则返回 `None`
- `re.findall()`
  - `finditer` 返回一个迭代器，可以使用 `match.start(), match.end()` 返回起止位置
  - `re.findall(r'a((a*)(b*))',t)`: 类似这种，第一个 a 是不返回到结果的，只返回括号里面的
- 如果没有匹配到的话，`match()` 和 `search()` 将返回 `None`。如果成功的话，就会返回一个 `MatchObject` 实例，其中有这次匹配的信息：它是从哪里开始和结束，它所匹配的子串等等。`findall()` 在它返回结果时不得不创建一个列表。
- `groups()`
  - **返回匹配到的字符序列**，不需要再用起止位置确定返回的字符串
  - `group(index)`: 返回单独的一个 group（匹配到的结果）
  - `match.groupdict()` 返回 `{名字:值}` 的字典
  - 组可以被嵌套。计数的数值可以通过从左到右计算打开的括号数来确定。`The groups()` 方法返回一个包含所有小组字符串的元组，从 **1** 到 所含的小组号。
- list 作为参数：`re.compile('二' + str(["位", "十", "百", "千", "万", "亿"]))` 
    - 和 list 的顺序有关，所以首字一样的，长的放前面，否则长的匹配不到（肯定模式）
    - 会匹配到空格（list 元素中间有空格）
    - 还会匹配到单个词里面的每个词中间字的组合（肯定模式）。
    - 不推荐这样的写法。

### 分割替换

- `split(string [, maxsplit = 0])`
  - `p2 = re.compile(r'(\W+)')`: 打印出定界符，如果不需要则为：`p = re.compile(r'\W+')`
  - `re.compile().split(text, num)`: num 非 0 时，最多分成 num 段
- `sub(replacement, string[, count = 0])` 
  - 可选参数 count 是模式匹配后替换的最大次数；count 必须是非负整数。缺省值是 0 表示替换所有的匹配。 
  - 空匹配只有在它们没有紧挨着前一个匹配时才会被替换掉。`re.compile('x*').sub('-', 'abxd')`: `'-a-b-d-'`
  - 可以指定用 `(?P<name>...)` 语法定义的命名组。"`\g<name>`" 将通过组名 "name" 用子串来匹配，并且 "`\g<number>`" 使用相应的组号。使用它可以消除组号和周围文字数字之间的任何歧义。
  - 替换也可以是一个函数，该函数将会被模式中每一个不重复的匹配所调用。
  - `subn()` 返回修改后的字符串和替换的数量
- `replace`: 更快的替换
-  `translate()`: 从一个字符串中删除单个字符或用另一个字符来替代它
  - 可以用 `re.sub('\n',' ', s)` 这样来实现，但 `translate()` 能够实现这两个任务，而且比任何正则表达式操作起来更快。
  - `translate` 需要配合` string.maketrans` 使用。例如：`import string` 后 `'a1b3'.translate(string.maketrans('ab', 'cd'))` 


## 要义

### 数量

- `{}` 多少次
- `*` 等于 `{0,}`，0 次或任意正次数
- `+`  等于 `{1,}`，1 次或任意正次数
- `?`  等于 `{0,1}`，0 次或 1 次
- pattern 后面加「?」（英文的问号）就是非贪婪匹配，默认是贪婪匹配（匹配尽可能多的字符）。也就是匹配数量少的次数（也就是 {} 左边的数字次数）

### 转义

- 范围
  - `[ab]`: a or b，`[\w\d.+-]` 里面的「.+-」就是代表自身
  - `a[ab]+`: aa... or ab...
  - `a[ab]+?`: aa or ab
  - `[^-. ]+`: 不含 `-, ., 空格` 的，用补集来匹配不在区间范围内的字符，其做法是把 `^` 作为**类别**的**首个字符**；其它地方的 `^` 只会简单匹配 `^` 字符本身
  - `[A-Z][a-z]+`: 一个大写字母后面跟着小写字母
  - 元字符在类别里（`[]` 里）并不起作用
  - `\p{L}+` 匹配任意的 letter，比如 abc
  -  `\p{N}+` 匹配任意的 number，比如 123
- 小数点
  - `.` 表示任何单独的字符，除了换行符（\n）
  - `a.*b`: a 后面任意字符，b 结尾
  - `a.*?b`: a 后面任意字符，b 结尾，非贪婪
- 反斜杠
  - `\d`: a digit
  - `\D`: a non-digit
  - `\s`: whitespace(tab, space, newline, etc.)
  - `\S`: non-whitespace
  - `\w`: alphanumeric 字母数字
  - `\W`: non-alphanumeric 非字母数字（标点，符号如#等）
  - `\`: 转义
- 大多数字母和字符一般都会和自身匹配

### 位置

- `^`: string or line 开始
- `$`: string or line 结尾
- `\A`: string 开始
- `\Z`: string 结尾
- `\b`: empty string at the beginning or end of a word
- `\B`: empty string not at the beginning or end of a word
- 例子
  - `r'^\w+',     # word at start of string`
  - `r'\A\w+',    # word at start of string`
  - `r'\w+\S*$',  # word at end of string, with optional punctuation`
  - `r'\w+\S*\Z', # word at end of string, with optional punctuation`
  - `r'\w*t\w*',  # word containing 't'`
  - `r'\bt\w+',   # 't' at start of word`
  - `r'\w+t\b',   # 't' at end of word`
  - `r'\Bt\B',    # 't', not start or end of word`

### 逻辑

- `()`: 分组，视为整体
- `|`: 管道符，要么用左边的字符串匹配，要么用右边的匹配

## 例子

```python
p_email = re.compile('''
                     (?P<email>
                     [\w+\d]+
                     @
                     .+
                     )''', re.UNICODE | re.VERBOSE)
p_telephone = re.compile('''
                         (?P<telephone>
                         \+\d{1,4}\s\d{3}\s.+
                         | \d{3,4}-\d{8}.*
                         )''', re.UNICODE | re.VERBOSE)
p_cellphone = re.compile('''
                         (?P<cellphone>
                         \+\d{1,4}\s\d{11}
                         | \d{11} 
                         )''', re.UNICODE | re.VERBOSE)
```

## 参考

- [6.2. re — Regular expression operations — Python 3.6.2 documentation](https://docs.python.org/3/library/re.html)
- Python Module of the Week上的讲 Python 的 re 包 https://pymotw.com/2/re/，可参考[笔记](https://nbviewer.jupyter.org/github/hscspring/All4NLP/blob/master/Re/Python-Re-Pymotw.ipynb)
- Ubuntu Wiki上的 [Python正则表达式操作指南 - Ubuntu中文](http://wiki.ubuntu.com.cn/Python%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F%E6%93%8D%E4%BD%9C%E6%8C%87%E5%8D%97)，可参考[笔记](https://nbviewer.jupyter.org/github/hscspring/All4NLP/blob/master/Re/Python-Re-How-to-Regex.ipynb)
- 关于 Regex 的[笔记](https://nbviewer.jupyter.org/github/hscspring/All4NLP/blob/master/Re/Regex.ipynb)
- [Regular-Expressions.info - Regex Tutorial, Examples and Reference - Regexp Patterns](https://www.regular-expressions.info/)

## 高阶

- Regex 工具
  - regexper 可视化：https://regexper.com/
  - pythex 在线测试正则表达式 http://pythex.org/
  - regex101 另一个很漂亮的在线正则表达式测试器 https://regex101.com/

- 进阶阅读
  * re2 一个更快的Cython实现 https://pypi.python.org/pypi/re2/
  * pyahocorasick 用字典树和Aho-Corasick自动机实现的超快的正则引擎 https://pypi.python.org/pypi/pyahocorasick/
  * PythonVerbalExpressions 类自然语言构造正则表达式 https://github.com/VerbalExpressions/PythonVerbalExpressions
  * Exrex 从正则表达式生成随机字符串  https://github.com/asciimoo/exrex
  * PyParsing 构造正则语法（和更多规则）和提取的引擎 http://pyparsing.wikispaces.com/
  * Parsley 更人性化的正则表达语法 http://parsley.readthedocs.io/en/latest/tutorial.html



