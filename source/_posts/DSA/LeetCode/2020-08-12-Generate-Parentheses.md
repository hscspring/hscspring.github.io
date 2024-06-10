---
title: Generate Parentheses (LeetCode 22)
date: 2020-08-12 23:00:00
categories: Coding
tags: [Recursion, Backtracking, Catalan, Stirling]
mathjax: true
---

Given *n* pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

For example, given *n* = 3, a solution set is:

```python
[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
```

<!--more-->

这道题其实蛮有趣的，LeetCode 的 Solution 给出的三种解法都是递归的思路，感觉不是特别容易理解。后来在 Discuss 里面看到了一个循环的解法，感觉和自己思路非常类似，也很容易理解。

我们首先来看这个思路。该思路有个核心理念就是：“每次在已有的结果中依间隔插入对”。比如已经有了一个结果是 `”()“`，那么在每个间隔位置插入一对：

- 在间隔 0 插入：`"()()"`
- 在间隔 1 插入：`"(())"`
- 在间隔 2 插入：`"()()"`

这种做法是保证每次插入的结果都是合理有效的。按照这个思路代码就很容易写了：

```python
def generate_parenthesis(n: int) -> List[str]:
    if n == 0: return ['']
    result = {"()"}
    # 初始 n = 1，也就是唯一的结果 ()，n 每增加 1，就多执行一次
    for i in range(n-1):
        tmp = set()
        # 对每个结果都插入
        for item in result:
            # 插入每个间隔位置
            for i in range(len(item)+1):
                # 等于在每个间隔位置插入一对 ()
                new_item = item[:i] + "()" + item[i:]
                tmp.add(new_item)
        # 这里每一轮结束后更新为最新的结果
        result = tmp
    return list(result)
```

时间复杂度主要是看一共生成多少次 new_item，在分析之前我们先看下 Solution 中的几种递归的解法。

**第一种是暴力解法**：生成所有的序列然后判断哪些是有效的。我的第一个版本就是类似的思路，不过超时了，代码如下：

```python
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        string = "(" * n + ")" * n
        return self.permutate(string)
    
    def permutate(self, s: str) -> list:
        if not s:
            return ['']
        return self.permutate_core("", s, [])

    def permutate_core(self, prefix, suffix, res) -> list:
        if not suffix:
            if self.valid(prefix) and prefix not in res:
                res.append(prefix)
        else:
            for i in range(len(suffix)):
                self.permutate_core(prefix+suffix[i], suffix[:i]+suffix[i+1:], res)
        return res
    
    def valid(self, pair: str) -> bool:
        while "()" in pair:
            pair = "".join(pair.split("()"))
        if pair:
            return False
        else:
            return True
```

主要是排列组合的代码，它的效果如下：

```python
permutate("abc")
# ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']
```

参考答案使用了不一样的思路：对于给定的 n，一个序列就是 `(` 加 n-1 个，再加 `)` 加 n-1 个，这样就可以用递归的思路不断生成。而序列是否有效可以通过判断左右括号数量差来确定，如果相等则有效，否则无效。

```python
def valid(A: list):
    res = 0
    for e in A:
        if e == "(":
            res += 1
        else:
            res -= 1
        # 注意这个地方，只要中间有右括号的数量大于左括号的情况，肯定是无效的
        if res < 0:
            return False
    return res == 0
def generateParenthesis(n: int) -> list:
    def generate(A=[]):
        if len(A) == 2 * n:
            if valid(A):
                res.append("".join(A))
        else:
            A.append("(")
            generate(A)
            A.pop()
            A.append(")")
            generate(A)
            A.pop()
    res = []
    generate()
    return res
```

注意因为是 n-1 个，所以要 pop。生成给定 n 所有序列的复杂度是 O(2^2n)，因为要生成所有的 n，所以还需要乘以 n，即：O(2^2n n)。

**第二种是回溯法**：这种方法其实是在第一种的思路上做了优化——生成的时候就直接生成有效的序列。我最喜欢的一种方法，感觉设计的非常巧妙。其主要思想是：如果 `(` 的个数小于 n，那么可以增加 `(`，如果 `)` 个数小于 `(` 个数，可以增加 `)`。

```python
def generateParenthesis(n: int) -> list:
    def backtrack(s='', left=0, right=0):
        if len(s) == 2*n:
            res.append(s)
        if left < n:
            backtrack(s+"(", left+1, right)
        if right < left:
            backtrack(s+")", left, right+1)
    res = []
    backtrack()
    return res
```

复杂度是第 n 个 Catalan number，递归形式如下：
$$
C_{0}=1 \text { and } C_{n+1}=\sum_{i=0}^{n} C_{i} C_{n-i} \text { for } n \geq 0
$$
二项式形式如下：
$$
C_{n}=\frac{1}{n+1}\left(\begin{array}{c}
2 n \\
n
\end{array}\right)
$$
递归实现的复杂度是指数增长，使用动态规划复杂度是 O(n^2)，二项式的复杂度是 O(n)，代码如下：

```python
def binomial(n: int, k: int) -> int:
    # C(n,k) = C(n, n-k)，减少计算量
    if n-k < k:
        k = n - k
    # C(n, k) = A(n, k) / k! = n(n-1)...(n-k+1)/k!
    res = 1
    for i in range(k):
        res *= (n-i)
        res /= (k+1)
    return res
def catalan(n: int):
    return binomial(2*n, n)/(n+1)
```

递归和动态规划的实现（包括二项式的实现）可以参考：[Program for nth Catalan Number - GeeksforGeeks](https://www.geeksforgeeks.org/program-nth-catalan-number/)

Catalan number 的渐近上界是 $$4^n/n \sqrt{n}$$，这也就是第二种方法的复杂度。求解这个渐进界需要用到[斯特林公式](https://en.wikipedia.org/wiki/Stirling%27s_approximation)：
$$
n !=\sqrt{2 \pi n}\left(\frac{n}{e}\right)^{n}\left(1+\Theta\left(\frac{1}{n}\right)\right)
$$
那我们试着求解一下，稍微写详细一点：
$$
C_{n}=\frac{1}{n+1}\left(\begin{array}{c}
2 n \\
n
\end{array}\right) \\
= \frac{1}{n+1}(2n)!/(n!n!) \\
= \frac{1}{n+1} \frac{2 \sqrt{\pi n} (\frac{2n}{e})^{2n} \left(1+\Theta\left(\frac{1}{2n}\right)\right)}{2 \pi n (\frac{n}{e})^{2n} \left(1+\Theta\left(\frac{1}{n}\right)\right)} \\
= \frac{1}{n+1} \frac{4^n \left(1+\Theta\left(\frac{1}{2n}\right)\right)}{\sqrt{\pi n} \left(1+\Theta\left(\frac{1}{n}\right)\right)} \\
= O(\frac{4^n}{n \sqrt{n}})
$$
所以，该式不仅是它的渐近上界，同时也是一个渐近紧确的上界。

这时候，我们可以尝试分析一下一开始那种解法的复杂度，显然它要略高于上面这种解法，因为为每个间隔插入 `()` 的时候其实是包含了对称的重复序列的，比如原序列为 `()()`，那么在插入时会出现 3 次 `()()()`，这包括 2 次重复，粗略推算一下大致会多出 (2n-1)/(n-1) 倍的操作，但这个并没有影响到复杂度，所以最开始解法的复杂度应该与本解法一致。

**第三种**其实也是对第一种的优化，和第二种非常类似，具体的，起始括号和结尾括号必须在索引 0 和 2i + 1 处。然后，之间的 2c 个元素必须（分别）是有效序列。

```python
def generateParenthesis(n: int) -> list:
    if n == 0:
        return ['']
    res = []
    for i in range(n):
        for left in generateParenthesis(i):
            for right in generateParenthesis(n-1-i):
                res.append("({}){}".format(left, right))
    return res
```

它的复杂度和第二种一样。



