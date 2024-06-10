---
title: Longest Substring Without Repeating Characters (LeetCode 3)
date: 2019-07-13 18:00:00
categories: Coding
tags: [Substring, Slide]
---

Given a string, find the length of the **longest substring** without repeating characters.

<!--more-->

**Example 1:**

```markdown
Input: "abcabcbb"
Output: 3 
Explanation: The answer is "abc", with the length of 3. 
```

**Example 2:**

```markdown
Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

**Example 3:**

```markdown
Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. 
             Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

这道题是做了几十道觉得需要整理后的第一道，之所以单独拿出来是因为它的解法非常有意思，涉及到一种数组或字符串常用的抽象结构：滑动窗口。随着窗口的从头到尾移动，问题得到解决，时间复杂度 O(N)。

这道题的 Brute Force 方法比较简单：生成所有的子串，判断没有重复子串的长度，时间复杂度 O(N^3)。接下来仔细分析一下滑动窗口的处理方式。正式开始之前，有一个地方需要特别注意一下：substring 是连续的 string。

- 首先，我们选择一个长度为 1 的窗口，此时 substring 的长度也为 1；

- 然后，我们把窗口向右扩大 1 个单位，此时窗口里面有 2 个元素，那么 substring 的长度是多少呢？这里我们要检查新加进来的这个字符已经在窗口中了，分为两种情况：
    - 如果新进来的元素没有在窗口中，则更新 substring 长度，继续向右扩大窗口；
    - 如果新进来的元素在窗口中，则从头开始挨个删除窗口中的元素，直到该元素不在窗口中为止

- 最后，返回 substring 长度

代码（以 Python 为例）看起来应该是这样：

```python
def lengthOfLongestSubstring(s: str) -> int:
    """
    Return the length of the longest substring of a given string.
    
    Parameters
    ----------
    s: str
        The given string, could be ""
    Returns
    -------
    The length of the longest substring: int
    """
    res = 0
    slide = []
    n = len(s)
    i,j = 0,0
    while i < n:
        if s[i] not in slide:
            slide.append(s[i])
            i += 1
            res = max(res, len(slide))
        else:
            while s[i] in slide:
                slide.remove(s[j])
                j += 1
    return res

# Test case
assert lengthOfLongestSubstring("abcabcbb") == 3
assert lengthOfLongestSubstring("") == 0
assert lengthOfLongestSubstring("aaaaaa") == 1
assert lengthOfLongestSubstring("a") == 1
assert lengthOfLongestSubstring("pwwkew") == 3
assert lengthOfLongestSubstring("dvdf") == 3
```

这样子看起来应该没啥问题，但其实有几个地方可以优化：

- `element in []` 这个操作其实是 O(N) 的，完全可以用哈希表代替（Python 或 Java 中是 set 或 dict）
- 我们可以把 j 也放到外面的循环中
- 我们没必要从 slide 的开头开始删，如果我们能够记住 slide 中元素在 s 中的位置，那么就可以直接把该位置前的元素都删了，换句话说，新的 slide 可以从该位置之后开始

```python
# 优化1
res = 0
slide = set()
n = len(s)
i,j = 0,0
while i < n:
    if s[i] not in slide:
        slide.add(s[i])
        i += 1
        res = max(res, len(slide))
    else:
        while s[i] in slide:
            slide.remove(s[j])
            j += 1
# 优化2
res = 0
slide = set()
n = len(s)
i,j = 0, 0
while i < n and j < n:
    if s[i] not in slide:
        slide.add(s[i])
        i += 1
        res = max(res, len(slide)) # or i - j
    else:
        slide.remove(s[j])
        j += 1
# 优化3
res = 0
slide = dict()
n = len(s)
i,j = 0,0
while i < n:
    if s[i] in slide:
        j = max(slide[s[i]], j) # because we do not delete those elements in slide
    slide[s[i]] = i+1 # add one
    res = max(res, i+1-j) # add one for len(s) == 1
    i += 1
```

优化 3 虽然理论上看起来很容易理解，但代码看起来貌似不是太直观。不过这种方法肯定是最有效率的，因为其他方法都需要 `remove`，如果是 set 还好复杂度为 O(1)，如果是 list 复杂度为 O(N)，那肯定是不能接受的。

最后整理一下，其实 Slide 这种思想非常适合 “连续” 的子串或子 slice，而它的核心其实就是找到满足条件的 i 和 j。通过不断地优化，时间复杂度从 O(N^3) 下降至 O(N)，代码也变得更少，这就是算法的魅力，那精巧的思想着实让人着迷。