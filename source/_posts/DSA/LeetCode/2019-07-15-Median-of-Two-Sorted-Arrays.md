---
title: Median of Two Sorted Arrays (LeetCode 4)
date: 2019-07-18 07:00:00
categories: Coding
tags: [Median, Binary Search]
---

There are two sorted arrays **nums1** and **nums2** of size m and n respectively.

Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

You may assume **nums1** and **nums2** cannot be both empty.

<!--more-->

**Example 1:**

```python
nums1 = [1, 3]
nums2 = [2]

The median is 2.0
```

**Example 2:**

```python
nums1 = [1, 2]
nums2 = [3, 4]

The median is (2 + 3)/2 = 2.5
```

这道题我一开始的方法是先把两个有序数组合并为一个，这个就是归并排序的最后一步，依次比较首元素，然后放入新的数组。当我们获得合并后的数组后，中位数自然迎刃而解。但这个时间复杂度是 O(m + n)，不满足题目要求（后面才发现的，汗）。看了下 [Solution](https://leetcode.com/articles/median-of-two-sorted-arrays/) 觉得这个思路挺有意思，所以特意记录一下。

要想要复杂度是 O(log(m+n))，能想到的肯定是二分法了。首先，将两个有序数组 A 和 B 分别用**随机**位置分开，看起来是这样：

```python
          left_part          |        right_part
    A[0], ..., A[i-1]  |  A[i], A[i+1], ..., A[m-1]
    B[0], B[1], B[2], ..., B[j-1]  |  B[j], B[j+1], ..., B[n-1]
```

然后就是最关键的一点：我们要**始终保证中间的四个位置不变**。也就是说 A 或 B 中的元素都可以从 left 移向 right 或者反过来，但 A 和 B 分隔符两边的元素一定是 AB 合并后序列中间的四个位置。

这四个位置如果满足如下关系：

```python
A[i-1] <= B[j] and B[j-1] <= A[i]
```

那我们可以肯定，中间的一个（或两个数）一定在这四个数中，中位数迎刃而解。这也是本算法的**核心思想**。接下来是具体解法时的一些细节。

首先需要确定四个元素的位置，我们可以肯定中间位置必然在 `(m+n+1)/2` 处，也就是说如果 A 中的分割位置为 pi，那么 B 中的分割位置 pj 就是 `(m+n+1)/2 - pi`。也就是说 pj 的位置与 pi 的位置有关，会随着 pi 的变化而变化，进而保证中间位置不变。pi 的取值范围为 [0, m]，当在位置 0 时，A 中所有元素均在分隔位置右边；当在位置 m 时，A 中所有元素均在分隔位置左边。这个是本算法**最重要的一步操作**。

然后我们就让 pi 从 A 的中间开始折半取值，每次得到 pj 后判断四个元素的大小关系：

```python
if A[pi-1] <= B[pj] and B[pj-1] <= A[pi]:
    we get
elif A[pi-1] > B[pj]:
    move left in A
else:
    move right in B
```

最后我们要根据 m+n 的奇偶性来：

```python
if (m+n)%2 == 0:
    ans = (max(A[pi-1], B[pj-1]) + min(A[pi], B[pj]))/2
else:
    ans = max(A[pi-1], B[pj-1])
```

最终的代码看起来应该是这样：

```python
def median(A, B):
    m, n = len(A), len(B)
    half = int((m+n+1)/2)
    pib, pie = 0, m
    while pib <= pie:
        pi = int((pib+pie)/2)
        pj = half - pi
        if pi > 0 and pj < n and A[pi-1] > B[pj]:
            pie = pi - 1
        elif pi < m and pj > 0 and B[pj-1] > A[pi]:
            pib = pi + 1
        else:
            break
    if pi == 0:
        max_left = B[pj-1]
    elif pj == 0:
        max_left = A[pi-1]
    else:
        max_left = max(A[pi-1], B[pj-1])
    if pi == m:
        min_right = B[pj]
    elif pj == n:
        min_right = A[pi]
    else:
        min_right = min(A[pi], B[pj])

    if (m+n)%2 == 0:
        ans = (max_left + min_right) / 2.0
    else:
        ans = max_left * 1.0
            
    return ans
```

不过有两种特殊情况没搞定：

- A 或 B 为空，或均为空时。
- A 的元素数多于 B 时，即 m > n 时：A 与 B 互换即可，这个我弄了很长时间都没成功，后来还是看了答案才弄好的。其实，理解起来也比较容易，因为 pi 的范围是 [0,m]，如果 m > n，当 pi 移动到 m 的位置时 n 肯定会小于 0。举个例子，比如 A = [1,2,4,5,6], B = [3]，当 pi = 5 时，pj = 3-5 = -2，就会造成越界。不过这个简单的互换当时怎么也没想到，也真够蠢的了。

所以增加了这两种情况的处理：

```python
def median(A, B):
    m, n = len(A), len(B)
    # 第一种特殊情况
    if m == 0 or n == 0:
        mid = int((m+n)/2)
        if (m+n)%2 == 1:
            return (A+B)[mid]*1.0
        else:
            return sum((A+B)[mid-1:mid+1])/2.0
    # 第二种特殊情况
    if m > n:
        A, B, m, n = B, A, n, m
    
    half = int((m+n+1)/2)
    pib, pie = 0, m
    # 线性 O(min(n,m))
    # for pi in range(m+1):
    #     pi = pi
    while pib <= pie:
        # 二分 O(log(min(m,n)))
        pi = int((pib+pie)/2)
        pj = half - pi
        # 因为 m>n 时 AB 互换，所以这里其实不需要判断 pj 
        if pi > 0 and pj < n and A[pi-1] > B[pj]:
            pie = pi - 1
        elif pi < m and pj > 0 and B[pj-1] > A[pi]:
            pib = pi + 1
        else:
            break
    
    if pi == 0:
        max_left = B[pj-1]
    elif pj == 0:
        max_left = A[pi-1]
    else:
        max_left = max(A[pi-1], B[pj-1])
    if pi == m:
        min_right = B[pj]
    elif pj == n:
        min_right = A[pi]
    else:
        min_right = min(A[pi], B[pj])

    if (m+n)%2 == 0:
        ans = (max_left + min_right) / 2.0
    else:
        ans = max_left * 1.0
            
    return ans
```

当然还有个地方没注意到，就是在 while 循环内其实不需要判断 pj 的情况，因为 m>n 时 A B 互换，所以 pj 肯定不会越界。不过并不影响结果。

这道题是越看越觉得有意思，它有几个非常迷人的地方：

- 通过处于中间位置的四个元素（A B 各两个）得到中位数；A 中两个元素的分割位置可以沿着 A 移动，B 中两个元素的分割位置会随着 A 的移动而自动调整，以保证 A 和 B 中分隔位置左右的元素正好是 A B 序列合并后处于中间位置的四个元素。
- A 中分割位置的移动是从中间开始，每次根据对比结果进行二分移动，这也就保证了算法的复杂度为 O(log(min(m,n)))；当然我们也可以让其从 0 开始移动到 m，此时的时间复杂度为 O(min(n,m))。
- A 的长度大于 B 时，需要将 A B 互换。这是因为 A 中的分割位置可能会大于 (m+n+1)/2，这就会导致 B 中的分割位置越界。

不得不再次感慨算法的魅力，真的会让人沉迷其中。