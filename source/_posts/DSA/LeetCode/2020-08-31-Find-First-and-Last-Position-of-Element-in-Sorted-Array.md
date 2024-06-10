---
title: Find First and Last Position of Element in Sorted Array (LeetCode 34)
date: 2020-08-31 23:00:00
categories: Coding
tags: [Binary Search]
mathjax: true
---

Given an array of integers `nums` sorted in ascending order, find the starting and ending position of a given `target` value.

Your algorithm's runtime complexity must be in the order of *O*(log *n*).

If the target is not found in the array, return `[-1, -1]`.

**Example 1:**

```
Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
```

**Example 2:**

```
Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
```

**Constraints:**

- `0 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`
- `nums` is a non decreasing array.
- `-10^9 <= target <= 10^9`

<!--more-->

这道题依然是二分查找的变体，最直接的思路就是先用二分查找找到 target 的位置，然后分别向左右扩展。这种方法不符合复杂度要求，不过却比较容易理解。

```python
def search_range(nums: List[int], target: int) -> List[int]:
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (l + r) // 1
        if nums[mid] == target:
            start, end = mid, mid
            while start >=0 and nums[start] == target:
                start -= 1
            while end <= len(nums) - 1 and nums[end] == target:
                end += 1
            return [start+1, end-1]
        else:
            if nums[mid] > target:
                r = mid - 1
            else:
                l = mid + 1
    return [-1, -1]
```

这里有两个点需要注意：

- 找到 target 再开始遍历时，要遍历到顶端的位置
- 返回的时候 start 要加 1 end 要减 1，因为 while 循环最后多一次操作

显然，这个复杂度是 O(n) 的，和从头到尾遍历可以说也没啥大的区别了。要达到题目要求的复杂度就只能另辟蹊径了。

我们再想想，因为数组是有序的，那是不是可以用两次二分查找，分别找到左边的 target 和右边的 target 呢？当然可以！只要改一下每次的条件，将等于 target 的跳过即可：

```python
def search_left(nums: list, target: int):
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] >= target:
            r = mid - 1
        else:
            l = mid + 1
    return l

def search_right(nums: list, target: int):
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] <= target:
            l = mid + 1
        else:
            r = mid - 1
    return r

def search_range(nums: list, target: int):
    l = search_left(nums, target)
    r = search_right(nums, target)
    if 0 <= l <= r < len(nums):
        return [l, r]
    return [-1, -1]
```

上面的左右两个函数可以合并为一个，最终的代码为：

```python
def search(nums: list, target: int, left: bool):
    l, r = 0, len(nums) - 1
    while l <= r:
        mid = (l + r) // 2
        if nums[mid] > target:
            r = mid - 1
        elif nums[mid] < target:
            l = mid + 1
        else:
            if left:
                r = mid - 1
            else:
                l = mid + 1
    if left: 
        return l
    else:
        return r

def searchRange(nums: list, target: int):
    l = search(nums, target, True)
    r = search(nums, target, False)
    if 0 <= l <= r < len(nums):
        return [l, r]
    return [-1, -1]
```

看了下 Solution 的解法也是类似的，不过多做了一点优化，就是当求出 `l` 后，先判断是否超出 range 范围，或者所在位置的元素是否不等于 target，只要满足其一就直接返回兜底结果，这样就少计算了一次右边的情况。

总结一下可以发现其中的关键是逆向思维，也就是平时用二分查找是找那个要的 target，这里恰好是 “不要”，其实是找的 target 边上的那两个元素。算法真美妙。

