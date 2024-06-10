---
title: Search in Rotated Sorted Array (LeetCode 33, 81, 153)
date: 2020-08-22 23:00:00
categories: Coding
tags: [LinkedList, Search, Binary Search, Rotated Sorted Array]
mathjax: true
---

Given an integer array `nums` sorted in ascending order, and an integer `target`.

Suppose that `nums` is rotated at some pivot unknown to you beforehand (i.e., `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`).

You should search for `target` in `nums` and if you found return its index, otherwise return `-1`. 

**Example 1:**

```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

**Example 2:**

```
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

**Example 3:**

```
Input: nums = [1], target = 0
Output: -1
```

**Constraints:**

- `1 <= nums.length <= 5000`
- `-10^4 <= nums[i] <= 10^4`
- All values of `nums` are **unique**.
- `nums` is guranteed to be rotated at some pivot.
- `-10^4 <= target <= 10^4`

<!--more-->

这道题是二分查找的变种，也属于必须要掌握的算法之一。Naive 的解法就不赘述了，我们主要看 logn 复杂度的解法。

最直接的反应其实比较朴素：先找到旋转点，然后判断 target 在哪一组，再用二分查找在对应组里找到位置，代码量稍微有点多。

```python
# 二分查找
def bisearch(nums: list, target: int):
    lt, rt = 0, len(nums) - 1
    while lt <= rt:
        mid = (lt + rt) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] > target:
            rt = mid - 1
        else:
            lt = mid + 1
    return -1
# 找到旋转点
def find_rotated_point(nums: list):
    if len(nums) <= 1:
        return -1
    lt, rt = 0, len(nums) - 1
    while lt <= rt:
        mid = (lt + rt) // 2
        if nums[mid] > nums[mid+1]:
            return mid + 1
        else:
            if nums[mid] > nums[-1]:
                lt = mid + 1
            else:
                rt = mid - 1
    return -1
# 搜索
def search(nums: list, target: int):
    point = find_rotated_point(nums)
    if point == -1:
        return bisearch(nums, target)
    else:
        if target < nums[-1]:
            idx = bisearch(nums[point:], target)
            if idx == -1:
                return -1
            else:
                return point + idx
        else:
            return bisearch(nums[:point], target)
```

看上面的代码就能发现其实是有很多重复操作的，而且也忽视了旋转有序数组的一个显著特点：**任意位置切分数组，必然有一边是有序的**。我们其实可以利用这个特点直接进行二分查找：

```python
def search(nums: list, target: int):
    lt, rt = 0, len(nums) - 1
    while lt <= rt:
        mid = (lt + rt) // 2
        if nums[mid] == target:
            return mid
        # 左半部分有序
        if nums[lt] <= nums[mid]:
            # 如果正好在有序区间
            if nums[lt] <= target <= nums[mid]:
                # 说明一定在左半部分
                rt = mid - 1
            else:
                lt = mid + 1
        # 右半部分有序
        else:
            if nums[mid] <= target <= nums[rt]:
                lt = mid + 1
            else:
                rt = mid - 1
    return -1
```

这里特别要注意的是 ≤，在 lt 和 rt 的边界处都应该取到等号，mid 处无所谓。

其实还有一些二分查找的变种，比如寻找最小值或最大值，再比如元素允许重复。我们接下来就分别看下。

**求旋转有序数组的最值**

这个问题其实和咱们上面的寻找旋转点一模一样，唯一不同的是返回值而不是位置，另外最后返回的不是 -1，而是第一个元素（此时数组实际为未旋转状态）。这个题目正好也是 LeetCode 的第  153 题，这里我们再换个思路，注意到这种数组有个特点，就是**首元素是大于末元素**的，因此可以将元素的比较作为循环条件：

```python
def findMin(nums: List[int]) -> int:
    if len(nums) == 1:
        return nums[0]
    lt, rt = 0, len(nums) - 1
    while nums[lt] >= nums[rt]:
        if rt - lt == 1:
            return nums[rt]
        mid = (lt + rt) // 2
        if nums[mid] >= nums[lt]:
            lt = mid
        else:
            rt = mid
    return nums[0]
```

如果这个问题加上一个条件：“允许元素重复”，用上面这种方法对下面这种例子就会有问题：

```python
lst = [ 1, 0, 1, 1]
```

所以最好用我们最开始寻找旋转点的那种方法。

**查找有重复元素的旋转数组**

此时，有一种情况会让原来的搜索程序失效：

```python
lst = [1, 2, 1, 1, 1]
lst = [1, 1, 1, 3, 1]
```

失效的原因在于下面这个判断：

```python
# 如果正好在有序区间
if nums[lt] <= target <= nums[mid]
# or
if nums[mid] <= target <= nums[rt]
```

对这种情况我们单独处理就好，具体是指首元素等于末元素的情况：

```python
if nums[lt] == nums[rt]:
    return target in nums
```

而这个复杂度是 O(n)，自然对整体的复杂度造成了影响。这个题目正是 LeetCode 第 81 题。

