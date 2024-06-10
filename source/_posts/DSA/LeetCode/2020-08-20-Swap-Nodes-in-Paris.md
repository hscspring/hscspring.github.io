---
title: Swap Nodes in Paris (LeetCode 24)
date: 2020-08-20 23:00:00
categories: Coding
tags: [LinkedList, Swap, Recursion]
mathjax: true
---

Given a linked list, swap every two adjacent nodes and return its head.

You may **not** modify the values in the list's nodes, only nodes itself may be changed.

```python
Given 1->2->3->4, you should return the list as 2->1->4->3.
```

<!--more-->

这一类的题目都是要熟练掌握的，最 Naive 的方法就是挨个遍历，然后在添加 Node 时每隔一个就先添加后面的。具体代码如下：

```python
def swapPairs(head: ListNode) -> ListNode:
    if not head or not head.next:
        return head
    node = ListNode(0)
    tmp = node
    i = 0
    while head.next:
        if i % 2 == 0:
            tmp.next = ListNode(head.next.val)
            tmp.next.next = ListNode(head.val)
        tmp = tmp.next
        head = head.next
        i += 1
    if head and i % 2 == 0:
        tmp.next = head
    return node.next
```

这种方法其实和先隔位取出一个链表，然后和剩下的链表重新合并的方法类似。最后面一步是处理奇数个节点的情况，这个可以整合在循环里面：

```python
def swapPairs(head: ListNode) -> ListNode:
    if not head or not head.next:
        return head
    node = ListNode(0)
    tmp = node
    i = 0
    while head:
        if i%2 == 0:
            if head.next:
                tmp.next = ListNode(head.next.val)
                tmp.next.next = ListNode(head.val)
            else:
                tmp.next = ListNode(head.val)
        tmp = tmp.next
        head = head.next
        i += 1
    return node.next
```

不过常规一般不这么搞，而是直接在链表上进行交换，这就需要构造一个 prev 节点：

```python
def swapPairs(head: ListNode) -> ListNode:
    if not head or not head.next:
        return head
    node = ListNode(0)
    node.next = head
    prev = node
    curr = head
    while curr and curr.next:
        prev.next = curr.next
        curr.next = curr.next.next
        prev.next.next = curr
        prev = curr
        curr = curr.next
    return node.next
```

`while` 循环里面的其实比较简单，只要画个图就很直观了，特别需要注意的是循环前面的构造，很容易一不小心出错。

还有一种递归的思路比较巧妙：

```python
def swapPairs(head: ListNode) -> ListNode:
    if not head or not head.next:
        return head
    # 确定 head 的位置
    p = head.next
    head.next = swapPairs(head.next.next)
    p.next = head
    return p
```

写到这里突然想起翻转链表的递归写法，当时也是半天没理解，后来也是看了[这个视频](https://www.youtube.com/watch?v=MRe3UsRadKw)才彻底懂了，先把代码放出来：

```python
def reverseLinkedList(head):
    if not head or not head.next:
        return head
    # 确定 head 位置
    p = reverseLinkedList(head.next)
    head.next.next = head
    head.next = None
    return p
```

这里需要注意的就是递归时，head 其实也是在移动的，到了最后一个元素时，p 就是新的 head，而此时 head 在 p 的前一个节点，`head.next.next` 就是 `p.next`，也即是把指针倒着往回移，移完后需要将原来的指向置为 `None`。

当然，翻转链表一般情况下还是交换的方式容易理解，代码如下：

```python
def reverseLinkedList(head):
    prev = None
    curr = head
    while curr:
        tmp = curr.next
        curr.next = prev
        prev = curr
        curr = tmp
    return prev
```

同样，画图后很容易理解，代码也很容易写出来，不再赘述。