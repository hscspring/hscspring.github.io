---
title: Longest Palindromic Substring (LeetCode 5)
date: 2019-08-03 23:00:00
categories: Coding
tags: [Palindromic, DP, Manacher]
---

Given a string **s**, find the longest palindromic substring in **s**. You may assume that the maximum length of **s** is 1000.

**Example 1:**

```python
Input: "babad"
Output: "bab"
Note: "aba" is also a valid answer.
```

**Example 2:**

```python
Input: "cbbd"
Output: "bb"
```

<!--more-->

这道题解法比较多，所以特意拿来记录一下，我自己的解法应该是一种从中间到两头的算法。

第一种解法是将字符串 S 翻转为 S' 后看二者的最长的共同子串。这种解法有个问题，就是如果有有个非回文串正好是共同子串结果就不对。Solution 中给出一个例子：*S* = "abacdfgdcaba"，*S*′ = "abacdgfdcaba"，结果显然不对。所以我们需要检查公共子串是否是回文串。

第二种解法就是 Brute Force 了，其实也是最简单的方法，O(N) 判断是否为回文串，O(N^2) 生成所有的字符串，提交目测是会超时的。

第三种解法是动态规划法，这种算法非常有意思，经常让人感觉特别的 smart，我们来看看是怎么处理的。

Solution 中定义 Pij = true if substring Si, Sj is a palindrome, otherwise false: 
$$
P(i, j)=\left(P(i+1, j-1) \text { and } S_{i}==S_{j}\right)
$$
Base case:
$$
\begin{array}{l}{P(i, i)=t r u e} \\ {P(i, i+1)=\left(S_{i}==S_{i+1}\right)}\end{array}
$$
到这里应该没啥难理解的，我们来写写代码：

```python
def longestPalindrome(s: str) -> str:
    """
    Find the longest palindromic substring in a given s.
    
    Parameters
    -----------
    s: str
        A given string.
    
    Returns
    --------
    The longest palindromic substring.
    """
    res = ""
    max_len = 0
    n = len(s)
    T = [[0]*n for i in range(n)]
    # Base
    for i in range(n):
        T[i][i] = 1
        max_len = 1
        res = s[i]
    for i in range(n-1):
        if s[i] == s[i+1]:
            T[i][i+1] = 1
            max_len = 2
            res = s[i:i+2]
    # Normal
    # 这里需要注意下，因为 T[i][j] 是依赖于 T[i+1][j-1] 的，所以我们应该先的到 T[i+1]
    for i in range(n-1, -1, -1):
        for j in range(n):
            if i+1 <= j-1 and s[i] == s[j] and T[i+1][j-1]:
                T[i][j] = 1
                if j-i+1 > max_len:
                    max_len = j-i+1
                    res = s[i:j+1]
    return res

assert longestPalindrome("babad") in ["bab", "aba"]
assert longestPalindrome("a") == "a"
assert longestPalindrome("aa") == "aa"
assert longestPalindrome("cbbd") == "bb"
assert longestPalindrome("abcd") in ["a", "b", "c", "d"]
```

网上有很多个 DP 的版本，但我觉得这个版本是最容易理解的，它参考自[这里](https://leetcode.com/problems/longest-palindromic-substring/discuss/121496/Python-DP-solution)，其余的版本也都类似，最精简的是下面这个版本，它同样出自刚刚的参考链接。

```python
def longestPalindrome(s):
    dp = [[0] * len(s) for i in range(len(s))]
    ans = ""
    max_length = 0
    for i in range(len(s) - 1, -1, -1):
        for j in range(i, len(s)):
            if s[i] == s[j] and (j - i < 2 or dp[i+1][j-1] == 1):
                dp[i][j] = 1
                if ans == "" or max_length < j - i + 1:
                    ans = s[i:j+1]
                    max_length = j - i + 1
    return ans
```

事实上，我们知道 j-i 一定是大于等于 2 的，如果 j-i < 2 也就是我们 Base 的两种情况：

-  `j-i=1 and s[i] == s[j]`，此时 `dp[i][j] = 1` 等价于 `dp[i][i+1] = 1`
- `j-i=0 and s[i] == s[j]`，此时 `dp[i][j] = 1` 等价于 `dp[i][i] = 1`

所以这种简化实质上并没有减少多少操作，而且看起来不甚直观（当然理解了会好些）。在此基础上还可以进一步简化，也就是用 `len(ans)` 直接代替  `max_length`，这个就不那么重要了，略过。

第四种解法就是从中间向两端延伸，我先把自己的版本讲解一下，然后我们简单地提一下如何优化。

当时的思路是这样的：

- 从第一个元素开始向两端延伸，直到超出边界或两端元素不相等为止；
- 然后下一个元素直到所有元素执行一遍，每次延伸完算一下所获得回文串的长度，如果比之前长则更新；
- 在向两端延伸时，只有一个需要特别注意的地方，就是我们按偶数个或奇数个个数延伸
    - 如果是奇数个，则不考虑当前元素
    - 如果是偶数个，则考虑当前元素

代码如下：

```python
def longestPalindrome(s):
    n = len(s)
    res = ""
    for i in range(n):
        j, k = 1, 1
        while i-j >= 0 and i+j < n and s[i-j] == s[i+j]:
            j += 1
        while i-(k-1) >=0 and i+k < n and s[i-(k-1)] == s[i+k]:
            k += 1
        psj = s[i-j+1: i+j]
        psk = s[i-(k-1)+1: i+k]
        ps = psj if len(psj) > len(psk) else psk
        if len(ps) > len(res):
            res = ps
```

我觉得这种解法是除 Brute Force 外最容易理解的，非常的直观明了。如果想要对其进行优化，只需把 while 和 psx 这一段抽象成一个函数即可，如下所示：

```python
def longestPalindrome(s):
    n = len(s)
    res = ""
    for i in range(n):
        # odd number center
        ps1 = pad(s, i, i)
        # even number center
        ps2 = pad(s, i, i+1)
        if len(ps1) > len(res):
            res = ps1
        if len(ps2) > len(res):
            res = ps2
    return res

def pad(s, l, r):
    while l >= 0 and r < n and s[l] == s[r]:
        l -= 1
        r += 1
    return s[l+1:r] # from l+1 to r-1 because the last loop will compute one more time
```

这个解法也非常容易理解，而且看起来更加清晰，它参考自[这里](https://www.youtube.com/watch?v=WjBwSyXN5v4)。

第四种解法的时间复杂度和 DP 一样，也是 O(N^2)，空间复杂度为 O(1)。还有其他类似的一些解法，比如[这个](https://leetcode.com/problems/longest-palindromic-substring/discuss/2925)，但其本质和咱们上面提到的没什么区别，就此略过。

最后我们看下第五种算法，也是唯一一种 O(N) 时间复杂度的算法。这个算法名字叫 [Manacher's Algorithm](https://www.hackerrank.com/topics/manachers-algorithm)，我一开始看了这个：[Programming Problems and Competitions :: HackerRank](https://www.hackerrank.com/topics/manachers-algorithm)，结果到后面没看懂，后来又发现了这个视频：[Longest Palindromic Substring O(N) Manacher's Algorithm - YouTube](https://www.youtube.com/watch?v=nbTSfrEfo6M)，看了两遍才基本看懂，感觉很神奇，下面的代码也是仿照视频中的代码写的。其实写代码不难，难在对算法本身的理解。

接下来我简单地说一下该算法的基本思想以及其中的一些小 trick。

- 每隔一个字符添加一个标记，比如 “#”，防止连续出现的重复字符对算法造成干扰（因为两个连续重复的字符都是其中心）

- 每一个字符作为中心向两边延伸（Expanding for every center）

- 回文串是中心对称的，这意味着如果知道了中心左边字符对应的长度，右边的长度可以直接通过对称性得到。比如：ababa，前 3 个字符对应的回文串长度分别是 1 3 5，那后两个自然就是 3 和 1。

- 接下来有两种不同的越界情况，即回文串左边或右边还有字符（还是以上一条的例子说明）。

    - 当右边（也就是后两个字符）有字符时，它们 center 的回文串长度一定大于等于对称的左边。比如 ababab，后三个字符实际上是 5 3 1。所以，就从复制过来的对称左边的长度开始 expanding，比如倒数第 3 个，复制过来的 center 长度是 3，那么就从 3 开始往外 expanding，也就意味着 aba 是不需要执行的，只要向外 expanding 1 个字符即可。
    - 当左边（也就是最前面）有字符时，同样从原来的长度开始扩展。比如 bababa，第 3 个字符作为 center 时长度本来是 3，现在向外 expanding 1 个字符，变为 5。原来对称的右边此时不能直接复制新得到的长度，比如第 2 个字符作为 center 现在的长度是 3，不能直接复制到原来对称的右边（即最后一个字符），因为最后一个字符作为 center 的长度明显是 1。也就是说，越界时，对称性不一定成立。此时，对称的右边字符作为 center 时的长度变为：`右边界-字符的 index`，比如倒数第 2 个字符，长度并不是原来对称的 5，而是 `13-10`（`@b#a#b#a#b#a$`）。

- 整理之后就是（截图来自那个视频）：

  ![](http://qnimg.lovevivian.cn/leetcode-longest-palindromic-substring-1.jpeg)

具体代码如下：

```python
def longestPalindrome(s):
    T = '#'.join('${}@'.format(s))
    p = [0] * len(T)
    c = r = 0
    for i in range(1, len(T)-1):
        mirr = 2*c - i # c + (i - c)
        if i < r:
            p[i] = min(r-i, p[mirr])
        while T[i+(1+p[i])] == T[i-(1+p[i])]:
            p[i] += 1
        if i + p[i] > r:
            c = i
            r = i + p[i]
    max_len, center_id = max((n, i) for i,n in enumerate(p))
    res = s[(center_id-max_len)//2: (center_id+max_len)//2]
    return res
```

可以看出该算法的核心就是利用回文串的对称性减少计算。这里也有一个类似的解法：[Manacher algorithm in Python O(n) - LeetCode Discuss](https://leetcode.com/problems/longest-palindromic-substring/discuss/3337/Manacher-algorithm-in-Python-O(n))，其实基本是一样的，毕竟思路就是那样的。另外，这里：[Taro Kuriyama | Visualization](https://tarokuriyama.com/projects/palindrome2.php#linear_algo) 有也有一个解法，可以参考一下。