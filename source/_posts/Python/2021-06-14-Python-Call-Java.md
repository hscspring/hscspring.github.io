---
title: Python 调用 Java
date: 2021-06-14 20:00:00
categories: Coding
tags: [Python, Java, jpype]
mathjax: true
---

一直以为这样的情况不会出现，但它还是出现了：一段 Java 代码+引用 Jar 包，一段 Python 代码要使用 Java 代码中某个方法。本来想用 Python 重新实现一遍，又觉得这简直是浪费时间，何不直接在 Python 代码中使用 Java 代码的该方法呢？应该特别简单，分分钟搞定的事情，结果还是掉坑里了，特此记录，以备后查。

<!--more-->

首先，进一步明确下需求。为了方便，将实际的例子替换为一个比较简单的例子来记录说明；另外，实际也不使用 IDE，就是个简单的脚本任务。

来咯，Java 的代码：

```java
// Encoder.java
import java.io.IOException;
import net.iharder.Base64;

public class Encoder {

    public String encode(String text) throws IOException {
        return Base64.encodeObject(text);
    }

    public static void main(String[] args) throws IOException {
        Encoder er = new Encoder();
        String text = "love u";
        String code = er.encode(text);
        System.out.println(code);
    }
}
```

这里的 `net.iharder.Base64` 是一个 jar 包，编译后执行：

```bash
javac -cp base64-2.3.9.jar:. Encoder.java
java -cp base64-2.3.9.jar:. Encoder
# rO0ABXQABmxvdmUgdQ==
```

现在，假设有一段 Python 代码需要调用上面 `encode`方法。

[5 Ways of Calling Java from Python](https://web.archive.org/web/20170729052824/http://baojie.org/blog/2014/06/16/call-java-from-python/) 这里介绍了 5 种方法：

- [jpype-project/jpype: JPype is cross language bridge to allow python programs full access to java class libraries.](https://github.com/jpype-project/jpype)
- [bartdag/py4j: Py4J enables Python programs to dynamically access arbitrary Java objects](https://github.com/bartdag/py4j)
- [CellProfiler/python-javabridge: Python wrapper for the Java Native Interface](https://github.com/CellProfiler/python-javabridge)
- [JCC · PyPI](https://pypi.org/project/JCC/)
- [kivy/pyjnius: Access Java classes from Python](https://github.com/kivy/pyjnius)

简单瞅了眼，发现前两个无论从 API、维护还是适用方面都优于后面的，这里以 `jpype` 为例说明。

具体的，有两种方式，一种直接调用编译后的 `class` 文件：

```python
import jpype

jpype.startJVM(convertStrings=False)

JDClass = jpype.JClass("Encoder")
jd = JDClass()

res = jd.encode("love u")
print(res)

jpype.shutdownJVM()
```

此时目录如下：

```bash
├── Encoder.class
├── Encoder.java
├── encode.py
└── net
    └── iharder
        ├── Base64$1.class
        ├── Base64$InputStream.class
        ├── Base64$OutputStream.class
        └── Base64.class
```

或者直接使用 jar 包：

```bash
jar cvf Encoder.jar Encoder.class
```

代码如下：

```python
import jpype
import os

deps = os.getcwd() + "/base64-2.3.9.jar"
jar = os.getcwd() + "/Encoder.jar"

jpype.startJVM(
    # jpype.getDefaultJVMPath(),
    "-ea",
    classpath=[deps, jar], # 或 "-Djava.class.path=%s:%s" % (deps, jar),
    convertStrings=False,
)

Base64 = jpype.JClass("net.iharder.Base64")
res = Base64.encodeBytes([3, 34, 116, 9])
print(res)

JDClass = jpype.JClass("Encoder")
jd = JDClass()
res = jd.encode("love u")
print(res)

jpype.shutdownJVM()
```

此时目录如下：

```bash
├── Encoder.class
├── Encoder.jar
├── Encoder.java
├── base64-2.3.9.jar
└── encode.py
```

只使用两个 jar 文件即可。

另外，如果需要切换 java 版本，可以使用如下命令：

```bash
sudo update-alternatives --config javac
sudo update-alternatives --config java
```

**参考资料**

- [Calling Java from Python](https://code-maven.com/calling-java-from-python)
- [Ubuntu安装java和使用update-java-alternatives进行切换 - 简书](https://www.jianshu.com/p/38f6f2539e9c)

