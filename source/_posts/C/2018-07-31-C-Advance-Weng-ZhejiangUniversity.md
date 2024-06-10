---
title: 浙大翁恺老师《C 语言程序设计进阶》笔记
date: 2018-07-31 23:54:00
categories: Coding
tags: [C]
---

>说明：本文档为[浙大翁恺老师《C 语言程序设计进阶》课程](https://www.icourse163.org/learn/ZJU-200001?tid=1002775002#/learn/announce)内容笔记，主要记录学习过程中的一些重要或自己不懂的知识点，方便随时反复查看，内容不一定适合其他人。
>
>如果想看 C 语言基础版的，可以移步：[浙大翁恺老师《程序设计入门——C语言》笔记 | Yam](https://yam.gift/2018/06/20/C/2018-06-20-C-Weng-ZhejiangUniversity/)。
>
>小感想：自从大学上过这门课后就再没碰过了。这次学完两门课，写了一些代码，才慢慢有了一些感觉。这种感觉不光是对 C，更是对写代码和深入探索未知的过程。虽然有时候也会情绪低落、状态低迷，什么都不想做，但整体还是蛮开心的，也从没有想过放弃。希望能在这条路上与更多的小伙伴同行。

# 目录

 <p><div class="lev1 toc-item"><a href="#Week1：指针与字符串" data-toc-modified-id="Week1：指针与字符串-1"><span class="toc-item-num">1&nbsp;&nbsp;</span>Week1：指针与字符串 </a></div><div class="lev2 toc-item"><a href="#指针的使用" data-toc-modified-id="指针的使用-11"><span class="toc-item-num">1.1&nbsp;&nbsp;</span>指针的使用 </a></div><div class="lev3 toc-item"><a href="#指针的应用场景1" data-toc-modified-id="指针的应用场景1-111"><span class="toc-item-num">1.1.1&nbsp;&nbsp;</span>指针的应用场景 1</a></div><div class="lev3 toc-item"><a href="#指针的应用场景2" data-toc-modified-id="指针的应用场景2-112"><span class="toc-item-num">1.1.2&nbsp;&nbsp;</span>指针的应用场景 2</a></div><div class="lev3 toc-item"><a href="#指针常见的错误" data-toc-modified-id="指针常见的错误-113"><span class="toc-item-num">1.1.3&nbsp;&nbsp;</span>指针常见的错误 </a></div><div class="lev3 toc-item"><a href="#指针与数组" data-toc-modified-id="指针与数组-114"><span class="toc-item-num">1.1.4&nbsp;&nbsp;</span>指针与数组 </a></div><div class="lev3 toc-item"><a href="#指针与-CONST" data-toc-modified-id="指针与-CONST-115"><span class="toc-item-num">1.1.5&nbsp;&nbsp;</span>指针与 CONST</a></div><div class="lev3 toc-item"><a href="#练习题" data-toc-modified-id="练习题-116"><span class="toc-item-num">1.1.6&nbsp;&nbsp;</span>练习题 </a></div><div class="lev2 toc-item"><a href="#指针运算" data-toc-modified-id="指针运算-12"><span class="toc-item-num">1.2&nbsp;&nbsp;</span>指针运算 </a></div><div class="lev3 toc-item"><a href="#指针用途小结" data-toc-modified-id="指针用途小结-121"><span class="toc-item-num">1.2.1&nbsp;&nbsp;</span>指针用途小结 </a></div><div class="lev2 toc-item"><a href="#动态内存分配" data-toc-modified-id="动态内存分配-13"><span class="toc-item-num">1.3&nbsp;&nbsp;</span>动态内存分配 </a></div><div class="lev3 toc-item"><a href="#练习题" data-toc-modified-id="练习题-131"><span class="toc-item-num">1.3.1&nbsp;&nbsp;</span>练习题 </a></div><div class="lev2 toc-item"><a href="#字符串操作" data-toc-modified-id="字符串操作-14"><span class="toc-item-num">1.4&nbsp;&nbsp;</span>字符串操作 </a></div><div class="lev3 toc-item"><a href="#单字符串输入输出" data-toc-modified-id="单字符串输入输出-141"><span class="toc-item-num">1.4.1&nbsp;&nbsp;</span>单字符串输入输出 </a></div><div class="lev3 toc-item"><a href="#字符串数组" data-toc-modified-id="字符串数组-142"><span class="toc-item-num">1.4.2&nbsp;&nbsp;</span>字符串数组 </a></div><div class="lev2 toc-item"><a href="#字符串函数的实现" data-toc-modified-id="字符串函数的实现-15"><span class="toc-item-num">1.5&nbsp;&nbsp;</span>字符串函数的实现 </a></div><div class="lev1 toc-item"><a href="#Week2：ACLLib-的基本图形函数" data-toc-modified-id="Week2：ACLLib-的基本图形函数-2"><span class="toc-item-num">2&nbsp;&nbsp;</span>Week2：ACLLib 的基本图形函数 </a></div><div class="lev2 toc-item"><a href="#ACLLib-入门" data-toc-modified-id="ACLLib-入门-21"><span class="toc-item-num">2.1&nbsp;&nbsp;</span>ACLLib 入门 </a></div><div class="lev2 toc-item"><a href="#WindowsAPI" data-toc-modified-id="WindowsAPI-22"><span class="toc-item-num">2.2&nbsp;&nbsp;</span>WindowsAPI</a></div><div class="lev2 toc-item"><a href="#创建-ACLLIB-程序" data-toc-modified-id="创建-ACLLIB-程序-23"><span class="toc-item-num">2.3&nbsp;&nbsp;</span>创建 ACLLIB 程序 </a></div><div class="lev2 toc-item"><a href="#基本绘图函数" data-toc-modified-id="基本绘图函数-24"><span class="toc-item-num">2.4&nbsp;&nbsp;</span>基本绘图函数 </a></div><div class="lev2 toc-item"><a href="#Win-下命令行编译程序" data-toc-modified-id="Win-下命令行编译程序-25"><span class="toc-item-num">2.5&nbsp;&nbsp;</span>Win 下命令行编译程序 </a></div><div class="lev1 toc-item"><a href="#Week3：结构类型" data-toc-modified-id="Week3：结构类型-3"><span class="toc-item-num">3&nbsp;&nbsp;</span>Week3：结构类型 </a></div><div class="lev2 toc-item"><a href="#枚举" data-toc-modified-id="枚举-31"><span class="toc-item-num">3.1&nbsp;&nbsp;</span>枚举 </a></div><div class="lev2 toc-item"><a href="#结构" data-toc-modified-id="结构-32"><span class="toc-item-num">3.2&nbsp;&nbsp;</span>结构 </a></div><div class="lev2 toc-item"><a href="#联合" data-toc-modified-id="联合-33"><span class="toc-item-num">3.3&nbsp;&nbsp;</span>联合 </a></div><div class="lev1 toc-item"><a href="#Week4：链表" data-toc-modified-id="Week4：链表-4"><span class="toc-item-num">4&nbsp;&nbsp;</span>Week4：链表 </a></div><div class="lev2 toc-item"><a href="#可变数组" data-toc-modified-id="可变数组-41"><span class="toc-item-num">4.1&nbsp;&nbsp;</span>可变数组 </a></div><div class="lev2 toc-item"><a href="#链表" data-toc-modified-id="链表-42"><span class="toc-item-num">4.2&nbsp;&nbsp;</span>链表 </a></div><div class="lev1 toc-item"><a href="#Week5：程序结构" data-toc-modified-id="Week5：程序结构-5"><span class="toc-item-num">5&nbsp;&nbsp;</span>Week5：程序结构 </a></div><div class="lev2 toc-item"><a href="#全局变量" data-toc-modified-id="全局变量-51"><span class="toc-item-num">5.1&nbsp;&nbsp;</span>全局变量 </a></div><div class="lev2 toc-item"><a href="#编译预处理和宏" data-toc-modified-id="编译预处理和宏-52"><span class="toc-item-num">5.2&nbsp;&nbsp;</span>编译预处理和宏 </a></div><div class="lev3 toc-item"><a href="#宏定义" data-toc-modified-id="宏定义-521"><span class="toc-item-num">5.2.1&nbsp;&nbsp;</span>宏定义 </a></div><div class="lev3 toc-item"><a href="#带参数的宏" data-toc-modified-id="带参数的宏-522"><span class="toc-item-num">5.2.2&nbsp;&nbsp;</span>带参数的宏 </a></div><div class="lev3 toc-item"><a href="#练习题" data-toc-modified-id="练习题-523"><span class="toc-item-num">5.2.3&nbsp;&nbsp;</span>练习题 </a></div><div class="lev2 toc-item"><a href="#大程序结构" data-toc-modified-id="大程序结构-53"><span class="toc-item-num">5.3&nbsp;&nbsp;</span>大程序结构 </a></div><div class="lev3 toc-item"><a href="#大程序" data-toc-modified-id="大程序-531"><span class="toc-item-num">5.3.1&nbsp;&nbsp;</span>大程序 </a></div><div class="lev3 toc-item"><a href="#头文件" data-toc-modified-id="头文件-532"><span class="toc-item-num">5.3.2&nbsp;&nbsp;</span>头文件 </a></div><div class="lev3 toc-item"><a href="#声明" data-toc-modified-id="声明-533"><span class="toc-item-num">5.3.3&nbsp;&nbsp;</span>声明 </a></div><div class="lev1 toc-item"><a href="#Week6：交互图形设计" data-toc-modified-id="Week6：交互图形设计-6"><span class="toc-item-num">6&nbsp;&nbsp;</span>Week6：交互图形设计 </a></div><div class="lev2 toc-item"><a href="#图形的终端输入输出" data-toc-modified-id="图形的终端输入输出-61"><span class="toc-item-num">6.1&nbsp;&nbsp;</span>图形的终端输入输出 </a></div><div class="lev2 toc-item"><a href="#函数指针及其应用" data-toc-modified-id="函数指针及其应用-62"><span class="toc-item-num">6.2&nbsp;&nbsp;</span>函数指针及其应用 </a></div><div class="lev3 toc-item"><a href="#函数指针" data-toc-modified-id="函数指针-621"><span class="toc-item-num">6.2.1&nbsp;&nbsp;</span>函数指针 </a></div><div class="lev3 toc-item"><a href="#函数指针的使用" data-toc-modified-id="函数指针的使用-622"><span class="toc-item-num">6.2.2&nbsp;&nbsp;</span>函数指针的使用 </a></div><div class="lev2 toc-item"><a href="#交互图形程序设计" data-toc-modified-id="交互图形程序设计-63"><span class="toc-item-num">6.3&nbsp;&nbsp;</span>交互图形程序设计 </a></div><div class="lev3 toc-item"><a href="#回调函数" data-toc-modified-id="回调函数-631"><span class="toc-item-num">6.3.1&nbsp;&nbsp;</span>回调函数 </a></div><div class="lev3 toc-item"><a href="#图形交互消息" data-toc-modified-id="图形交互消息-632"><span class="toc-item-num">6.3.2&nbsp;&nbsp;</span>图形交互消息 </a></div><div class="lev2 toc-item"><a href="#游戏设计思路" data-toc-modified-id="游戏设计思路-64"><span class="toc-item-num">6.4&nbsp;&nbsp;</span>游戏设计思路 </a></div><div class="lev1 toc-item"><a href="#Week7：文件" data-toc-modified-id="Week7：文件-7"><span class="toc-item-num">7&nbsp;&nbsp;</span>Week7：文件 </a></div><div class="lev2 toc-item"><a href="#格式化输入输出" data-toc-modified-id="格式化输入输出-71"><span class="toc-item-num">7.1&nbsp;&nbsp;</span>格式化输入输出 </a></div><div class="lev3 toc-item"><a href="#printf" data-toc-modified-id="printf-711"><span class="toc-item-num">7.1.1&nbsp;&nbsp;</span>printf</a></div><div class="lev3 toc-item"><a href="#scanf" data-toc-modified-id="scanf-712"><span class="toc-item-num">7.1.2&nbsp;&nbsp;</span>scanf</a></div><div class="lev3 toc-item"><a href="#printf-和-scanf-的返回值" data-toc-modified-id="printf-和-scanf-的返回值-713"><span class="toc-item-num">7.1.3&nbsp;&nbsp;</span>printf 和 scanf 的返回值 </a></div><div class="lev2 toc-item"><a href="#文件输入输出" data-toc-modified-id="文件输入输出-72"><span class="toc-item-num">7.2&nbsp;&nbsp;</span>文件输入输出 </a></div><div class="lev2 toc-item"><a href="#二进制文件" data-toc-modified-id="二进制文件-73"><span class="toc-item-num">7.3&nbsp;&nbsp;</span>二进制文件 </a></div><div class="lev2 toc-item"><a href="#按位运算" data-toc-modified-id="按位运算-74"><span class="toc-item-num">7.4&nbsp;&nbsp;</span>按位运算 </a></div><div class="lev2 toc-item"><a href="#移位运算" data-toc-modified-id="移位运算-75"><span class="toc-item-num">7.5&nbsp;&nbsp;</span>移位运算 </a></div><div class="lev2 toc-item"><a href="#位运算例子" data-toc-modified-id="位运算例子-76"><span class="toc-item-num">7.6&nbsp;&nbsp;</span>位运算例子 </a></div><div class="lev2 toc-item"><a href="#位段" data-toc-modified-id="位段-77"><span class="toc-item-num">7.7&nbsp;&nbsp;</span>位段 </a></div><div class="lev1 toc-item"><a href="#期末考试" data-toc-modified-id="期末考试-8"><span class="toc-item-num">8&nbsp;&nbsp;</span>期末考试 </a></div><div class="lev1 toc-item"><a href="#附录" data-toc-modified-id="附录-9"><span class="toc-item-num">9&nbsp;&nbsp;</span>附录 </a></div>


# Week1：指针与字符串

## 指针的使用

### 指针的应用场景1

- 交换两个变量的值

  ```c
  void swap(int *pa, int *pb)
  {
      int t = *pa;
      *pa = *pb;
      *pb = t;
  }
  ```

- 函数返回多个值，某些值就只能通过指针返回

  - 传入的参数实际上是需要保存带回的结果的变量

<!--more-->

### 指针的应用场景2

- 函数返回运算的状态，结果通过指针返回
  - 常用的套路是让函数返回特殊的不属于有效范围内的值来表示出错
    - -1 或 0
  - 但是当任何数值都是有效的可能结果时，就得分开返回
    - 状态用函数返回
    - 实际的值通过指针参数返回

```C
int divide(int a, int b, int *result);
int main(void)
{
    int a = 5;
    int b = 2;
    int c;
    if ( divide(a, b, &c) ){
        printf("%d/%d=%d\n", a, b, c);
    }
    return 0;
}
int divide(int a, int b, int *result)
{
    int ret = 1;
    if (b == 0) ret = 0;
    else {
        *result = a/b;
    }
    return ret;
}
```

### 指针常见的错误

- 定义了指针变量，还没有指向任何变量，就开始使用指针
  - 任何一个地址变量，没有被赋值（没有得到任何实际变量）之前，不能通过 `*p` 去访问任何变量或数据。因为没有初始化的 p 指向的地方不一定能写，所以不一定总是能成功，总是会出错的。
  - `int *p` 时，p 没有明确的值。如果被当做地址，可能会指向一个奇怪的地方，如果给 `*p` 赋值，恰好那个奇怪的地方不能写，程序会出错。
  - 正确的声明方式：[理解 C 语言中指针的声明以及复杂声明的语法 - CSDN 博客](https://blog.csdn.net/qq_28205153/article/details/51040161)

### 指针与数组

- 函数参数表中的普通变量是值；
- 函数参数表中的指针变量是指针的值，即地址；
- 函数参数中的数组变量实际是指针
  - `sizeof(a) == sizeof(int *)`
  - 但是可以用数组的运算符 `[]` 进行运算
- 以下四种函数原型是等价的（在参数表中出现时是等价的）：
  - `int sum(int *ar, int n);`
  - `int sum(int *, int);`
  - `int sum(int ar[], int n);`
  - `int sum(int [], int);`
- 实际上，数组变量是特殊的指针
  - 数组变量本身表达地址，所以
    - `int a[10]; int *p = a; // 无需用 & 取地址`
    - 但是数组的单元表达的是变量，需要用 `&` 取地址
    - `a == &a[0]`
  - `[]` 运算符可以对数组做，也可以对指针做
    - `p[0] <==> a[0]`
  - `*` 运算符可以对指针做，也可以对数组做
    - `*a = 25;`
  - 数组变量是 const 的指针，不能被赋值
    - `int b[] <==> int * const b;`

### 指针与 CONST

- 指针本身可以是 const

  - 表示一旦得到了某个变量的地址，不能再指向其他变量
    - `int * const q = &i; // q 是 const`
    - `*q = 26; // OK`
    - `q++; // ERROR`

- 所指向的值也可以是 const

  - 表示不能通过指针去修改那个变量（并不能使得那个变量成为 const）
    - `const int *p = &i;`
    - `*p = 26; // ERROR (*p) 是 const`
    - `i = 26; // OK`
    - `p = &j; // OK`
  - p 可以指向其他，i 可以被赋其他值，但不能通过 p 做赋值

- const 在 `*` 的前面还是后面？

  - 前面表示所指向的值是 const：
    - `const int* p = &i;`
    - `int const* p = &i;`
  - 后面表示指针是 const：
    - `int *const p = &i;`

- 转换

  - 总是可以把一个非 const 的值转换成 const 的

    ```C
    void f(const int* x);
    int a = 15;
    f(&a); // ok
    const int b = a;
    f(&b); // ok
    b = a + 1; // error
    ```
  - 当要传递的参数的类型比地址大的时候，这是常用的手段：既能用比较少的字节数传递值给参数，又能避免函数对外面的变量的修改。

- const 数组

  - `const int a[] = {1,2,3,4,5,6};`
  - 数组变量已经是 const 的指针了，这里的 const 表明数组的每个单元都是 `const int`
  - 所以必须通过初始化进行赋值

- 保护数组值

  - 因为把数组传入函数时传递的是地址，所以那个函数内部可以修改数组的值
  - 为了保护数组不被函数破坏，可以设置参数为 const：`int sum(const int a[], int length);`

### 练习题

1. 对于：

   ```c
   int a[] = {5, 15, 34, 54, 14, 2, 52, 72};
   int *p = &a[5]; // *p = 2
   // int *p = a; 等价于 int *p = &a[0];
   // int *p = &a[5]; 从 a[5] 的地址开始
   ```
   则 `p[-2]` 的值是？54

2. 如果：

   ```c
   int a[] = {0};
   int *p = a; // 等价于 int *p = &a[0];
   ```

   则：

   - `p == &a[0]`
   - `*p == a[0]`
   - `p[0] == a[0]`
   - 注意：与赋值时不同。

## 指针运算

- 指针加1，指针移动到下一个单元，实际加的是 `sizeof(类型)`

  `int a[10];`

  `int *p = a;`

  `*(p+n) --> a[n]`，无论是 char 还是 int，加 n 就等于地址加 n，只是 int 每次地址增加 4，char 每次增加 1

![](http://qnimg.lovevivian.cn/video-zheda-cadvan-1.jpeg)

- 如果指针不是指向一片**连续分配的空间**，如数组，则加 1 这种运算没有意义。

- 这些算术运算可以对指针做：

  - 给指针加、减一个整数（+ += - -=）
  - 递增递减（++--）
  - 两个**指针相减**：结果不是地址差，而是 `地址差/sizeof`

- `*p++`

  - 取出 p 所指的数据，完事之后把 p 移到下一个位置去
  - `*` 的优先级没有 `++` 高
  - 常用于数组类的连续空间操作
    - for 循环 `for (int i=0; i<sizeof(p)/sizeof(p[0]); i++) { printf("%d\n", p[i]) };`
    - `while (*p != -1) { printf("%d\n", *p++) };`
  - 在某些 CPU 上，这可以直接被翻译成一条汇编指令，跑的快，看机器。

- 指针比较

  - `< <=, ==, >, >=, !=` 都可以对指针做
  - 比较它们在内存中的地址
  - 数组中的单元的地址肯定是线性递增的

- 0 地址

  - 内存中有 0 地址，但通常不能随便动
  - 所以指针不应该具有 0 值
  - 因此可以用 0 地址来表示特殊的事情：
    - 返回的指针是无效的
    - 指针没有被真正初始化（先初始化为 0）
  - `NULL` 是一个预定义的符号，表示 0 地址
    - 有的编译器不愿意你用 0 来表示 0 地址
    - 建议用 `NULL` 而不是 0

- 指针的类型

  - 无论指向什么类型，所有的指针的大小都是一样的，因为都是地址

  - 但是指向不同类型的指针不能直接互相赋值

    ![](http://qnimg.lovevivian.cn/video-zheda-cadvan-2.jpeg)

  - 这是为了**避免用错指针**

- 指针的类型转换

  - `void*` 表示不知道指向什么东西的指针
    - 计算时与 `char*` 相同（但不想通）
  - 指针也可以转换类型
    - `int *p = &i; void *q = (void*) p;`
  - 这并没有改变 p 所指的变量的类型，而是让后人用不同的眼光通过 p 看它所指的变量
    - 通过 p 看 i，是 int
    - 通过 q 看 i，是 void

### 指针用途小结

- 需要传入较大的数据时用作参数
- 传入数组后对数组做操作
- 函数返回不止一个结果：需要用函数来修改不止一个变量
- 动态申请的内存

## 动态内存分配

- 输入数据
  - C99 可以用变量做数组定义的大小：`int a[n];`
  - C99 之前：`int *a = (int*)malloc(n*sizeof(int));`，定义之后按正常数组操作即可。
  - `malloc` 的定义，`sizeof(a)` 会比 C99 的小 4。
  - `malloc` 用完用完之后，需要 `free`
- `malloc`
  - `#include <stdlib.h>`
  - 向 malloc 申请的空间的大小是以**字节**为单位的
  - 返回的结果是 `void*`，需要类型转换为自己需要的类型（因为是字节嘛，内存并不 care 存哪种类型）
    - `(int*)malloc(n*sizeof(int))`
- 没空间了？
  - 如果申请失败则返回 0，或者叫 NULL
  - 系统能给多大空间？我的 Mac：分配了 134208900MB 的空间
- `free()`
  - 把申请的空间还给 “系统”
  - 申请的空间都应该要还
  - **只能还申请来的空间的首地址**
  - `free(NULL)` 没问题，因为 NULL 肯定不是申请来的。所以好的习惯是初始化指针时，先让它等于 0：`void *p = 0;`
- 常见问题：
  - 申请了没 free，长时间运行内存逐渐下降
  - free 过了再 free
  - 地址变过了，直接去 free

### 练习题

- ```C
  int a[] = {1,2,3,4,5,};
  int *p = a;
  int *q = &a[5];
  printf("%d", q-p); // 5，地址差/sizeof
  ```

## 字符串操作

### 单字符串输入输出

- `putchar`
  - `int putchar(int c);`
  - 向标准输出写一个字符，`int` 类型，一次一个字符
  - 返回写了几个字符，正常情况下为 1，EOF(-1) 表示写失败
- `getchar`
  - `int getchar(void);`
  - 从标准输入读入一个字符
  - 返回类型是 `int` 是为了返回 EOF(-1)
  - `Ctrl+D(unix); Ctrl+Z(win)`
  - 为什么输入回车才打印出来？SHELL，都是在 SHELL 的缓存区读东西，用户的输入是让 SHELL 填缓存区。

### 字符串数组

- `char **a`: a 是一个指针，指向另一个指针，那个指针指向一个字符（串）
- `char a[][]`：二维数组第二位一定要有确切的大小。
  - `char a[][10];`：a 是个数组，a 里面每一个都是 `char[10]`，因此需要确定每一个 `char[10]` 的长度是否超过 10
  - `char *a[];` `a[0]` 相当于 `char*`
  - ![](http://qnimg.lovevivian.cn/video-zheda-cadvan-3.jpega)
- 程序参数
  - `int main(int argc, char const *argv[])`
  - `argv[0]` 是命令本身：当使用 Unix 的符号链接时，反映符号链接的名字（到底是运行的链接还是本身）
  - 可以读到执行程序时，名字后面跟上的内容。第一行就是那个可执行程序的名字（如 a.out）。

## 字符串函数的实现

- `string.h`
  - strlen, strcmp, strcpy, strchr, strstr
  - 详见：[浙大翁恺老师：C语言入门](https://yam.gift/2018/06/20/C/2018-06-20-C-Weng-ZhejiangUniversity/)

# Week2：ACLLib 的基本图形函数

## ACLLib 入门

- 基于 Win32API 的函数库
- 可以在 MSVC 和 DevC++ 中使用

## WindowsAPI

- 纯 C 函数库
- main vs WinMain
- 如何产生窗口？窗口结构。
- 如何在窗口画东西？DC（设备上下文）。
- 如何获得用户鼠键操作？消息循环和消息处理代码。
- 如何画出标准界面（菜单、按钮、输入框等）？不支持。

## 创建 ACLLIB 程序

- `int Setup()`
- `initWindow("name", loc1,loc2, width, height)`: 初始化窗口
- `void begainPaint();line(loc1,loc2,loc3,loc4);void endPaint();`: 绘制
- `initConsole();`: 交互窗口

## 基本绘图函数

- 点：
  - `void putPixel(int x, int y, ACL_Color color);`
  - `ACL_Color getPixel(int x, int y);`
- 颜色：
  - RGB(r,g,b)
  - BLACK, RED, GREEN...
- 线：
  - `void moveTo(int x, int y);` 移动坐标点
  - `void moveRel(int dx, ind dy);`
  - `void line(int x0, int y0, int x1, int y1);`
  - `void lintTo(int x, int y);`
  - `void lineRel(int dx, int dy);`
  - `void arc(int nLeftRect, int nTopRect, int nRightRect, int nBottomRect, int nXStartArc, int nYStartArc, int nXEndArc, int nYEndArc);` 弧
- 画笔
  - `void setPenColor(ACL_Color color);`
  - `void setPenWidth(int width);`
  - `void setPenStyle(ACL_Pen_Style style);`
    - `PEN_STYLE_SOLID`
    - `PEN_STYLE_DASH ----`
    - `PEN_STYLE_DOT ……`
    - `PEN_STYLE_DASHDOT -.-.-.-`
    - `PEN_STYLE_DASHDOTDOT -..-`
    - `PEN_STYLE_NULL` 看不见的线
- 面：
  - 扇形
  - 椭圆
  - 矩形
  - ……
- 刷子
  - color
  - style
- 文字

## Win 下命令行编译程序

- 直接运行 `mm` 即可编译

# Week3：结构类型

## 枚举

- 常量符号化：`const int name = 0;`
- `enum COLOR {RED, YELLOW, GREEN};`：分别是 0 1 2，只能是 int
- 当需要一些可以排列起来的常量值时，定义枚举的意义就是给这些常量值名字。
- 套路：自动计数的枚举 `enum COLOR {RED, YELLOW, GREEN, NumCOLORS};` 最后一个变量是 3，就是枚举量的数量。
- 声明枚举量的时候可以指定值
- 如果有异议上排比的名字，枚举比 const int 方便；比宏好，因为枚举有 int 类型。

## 结构

- 声明结构类型

- 内部声明只能内部使用，通常放在所有函数外面

- 声明结构的形式
  - `struct point {int x; int y;}; struct point p1, p2;`
  - `struct {int x; int y;} p1, p2;`
  - `struct point {int x; int y;} p1, p2; ` 比较常用，做了两件事情

- 结构的初始化
  - `struct date today = {07, 31, 2014};`
  - `struct date thismonth = {.month = 7, .year=2014};` 没给值默认为 0

- 结构成员
  - 结构和数组有点像
  - 数组用 `[]` 运算符和下标访问其成员；结构用 `.` 运算符和名字访问其成员（**要用结构变量的名字，而不是结构的名字**）。

- 结构运算
  - 要访问整个结构，直接用结构变量的名字
  - 对于**整个结构**，可以做赋值、取地址，也可以传递给函数参数
    - `pl=(struct point){5,10}; //相当于 pl.x = 5; pl.y = 10;`
    - `p1 =p2; //相当于 p1.x = p2.x; p1.y = p2.y;`
    - 这两种运算数组不能做。

- 结构指针
  - 和数组不同，结构变量的名字并不是结构变量的地址，必须用 & 运算符
  - `struct date *pDate = &today;`

- 结构作为函数参数
  - `int numberOfDays(struct date d)`
  - 整个结构可以作为参数的**值**传入函数
  - 这时候是在函数内部新建一个结构变量，并赋值调用者的结构的值
  - 也可以返回一个结构

- 输入结构

  - 没有直接的方式可以一次 `scanf` 一个结构

  - **C 语言在函数调用时是传值的**：所以函数中的 p 与 main 中的 y 是不同的，函数读入了 p 的数值之后，没有任何东西回到 main，所以 y 还是 `{0, 0}`

  - 解决方案：

    - 之前方案，把一个结构传入函数，然后在函数中操作，但是没有返回去。问题在于传入函数的是外面那个结构的克隆体，不是指针。**传入结构和传入数组是不同的！**

    - 我们可以，在输入函数中，创建一个临时的结构变量，然后把这个结构返回给调用者：

      ```C
      void main()
      {
          struct point y = {0,0};
          y = inputPoint();
          output(y);
      }
      struct point inputPoint()
      {
          struct point temp;
          scanf("%d", &temp.x);
          scanf("%d", &temp.y);
          return temp;
      }
      ```

    - **结构指针作为参数**（K&R P.131）

  - **指向结构的指针**

    - 用 -> 表示指针所指的结构变量中的成员

      ```c
      struct date {
          int month;
          int day;
          int year;
      } myday;
      struct date *p = &myday; // myday 的地址交给指向 struct date 的指针
      (*p).month = 12;
      p->month = 12;
      ```

    - 结构参数指针

      ```C
      void main()
      {
          struct point y = {0, 0};
          intputPoint(&y);
          output(y);
      }
      
      // 传入一个指针，处理后返回该指针
      // 好处是，将来可以串到其他函数的调用当中
      struct point* intputPoint(struct point *p)
      {
          scanf("%d", &(p->x));
          scanf("%d", &(p->y));
          return p;
      }
      ```

    - 完整的例子

      ```C
      #include<stdio.h>
      
      
      struct point
      {
      	int x;
      	int y;
      };
      
      struct point* getStruct(struct point*);
      void output(struct point); // 要的是值
      void print(const struct point *p); // 要的结果不需要改变
      
      int main(int argc, char const *argv[])
      {
      	struct point y = {0, 0};
      	
      	getStruct(&y);
      	output(y);
      
      	output(*getStruct(&y)); // output 要的是结构本身，用 * 取出函数返回的东西
      	
      	print(getStruct(&y));
      
      	*getStruct(&y) = (struct point){1, 2}; // 这样也可以
      }
      
      struct point* getStruct(struct point *p)
      {
      	scanf("%d", &p->x); // 取得 p 所指的 x
      	scanf("%d", &p->y);
      	printf("%d, %d\n", p->x, p->y);
      	return p;
      }
      
      void output(struct point p)
      {
      	printf("%d, %d\n", p.x, p.y);
      }
      
      // print 函数不需要修改
      void print(const struct point *p)
      {
      	printf("%d, %d\n", p->x, p->y);
      }
      ```

- 结构数组

  - `struct date dates[100];` 
  - ` struct date dates[] = { {4,5,2005},{2,4,2005} };`

- 结构中的结构（嵌套的结构）

  `struct dataAndTime { struct date sdate; struct time stime;};`

  ```c
  struct point {
      int x;
      int y;
  };
  struct rectangle {
      struct point pt1;
      struct point pt2;
  };
  如果有 struct rectangle r;
  可以有：r.pt1.x, r.pt1.y, r.pt2.x, r.pt2.y
  ```

  ```c
  如果有变量定义：
  struct rectangle r, *rp;
  rp = &r;
  下面表达式等价：
  r.pt1.x
  (r.pt1).x
  rp->pt1.x
  (rp->pt1).x
  ```

- 结构中的结构的数组

  ```c
  #include <stdio.h>
  
  struct point {
  	int x;
  	int y;
  };
  
  struct rectangle {
  	struct point p1;
  	struct point p2;
  };
  
  void printRect(struct rectangle r) {
  	printf("<%d, %d> to <%d, %d>\n", r.p1.x, r.p1.y, r.p2.x, r.p2.y);
  }
  
  int main(int argc, char const *argv[])
  {
  	int i;
  	struct rectangle rects[] = {
  		{ {1,2}, {3,4} },
  		{ {5,6}, {7,8} }
  	};
  	for (i=0; i<2; i++) {
  		printRect(rects[i]);
  	}
  }
  ```

- 练习

  ```c
  struct {
      int x,y;
  } s[2] = {
      {1,3},
      {2,7},
  };
  printf("%d\n", s[0].y/s[1].x); // 3/2
  ```

- 自定义数据类型 typedef

  - 用来声明一个已有的数据类型的新名字

  - `typedef int Length;` `Length a,b,len;` 就相当于 `int a,b,len;`

  - typedef 和 最后一个单词中间的就是原来的类型：

    ```c
    typedef struct ADate {
        int month;
        int day;
        int year;
    } Date;
    Date d = {9,1,2005};
    ```

    ```c
    typedef struct {
        int month;
        int day;
        int year;
    } Date; 
    如果没有 typedef，则表示：有个 struct，没有名字，有个变量叫 Date
    如果有 typedef，表示：这样的 struct，命名为 Date，不关心 struct——叫什么
    ```

## 联合

- 存储

  - 所有成员共享一个空间
  - 同一时间只有一个成员是有效的
  - union 的大小是其最大的成员

- 初始化

  - 对第一个成员做初始化

- 小端（低位在前）

  ```c
  #include<stdio.h>
  
  typedef union {
  	int i;
  	char ch[sizeof(int)];
  } CHI;
  
  int main(int argc, char const *argv[])
  {
  	CHI chi;
  	int i;
  	chi.i = 1234;
  	for (i=0; i<sizeof(int); i++) {
  		printf("%02hhX\n", chi.ch[i]);
  	}
  	return 0;
  }
  ```

  ![](http://qnimg.lovevivian.cn/video-zheda-cadvan-4.jpeg)

- 应用场合：得到内部的各个字节

# Week4：链表

## 可变数组

- `Array array_create(int init_size);`
  - 不要定义指针类型，因为没办法创建本地变量，所以最好只定义成结构。
- `void array_free(Array *a);`
- `int array_size(const Array *a);`
- `int* array_at(Array *a, int index);`
- `void array_inflate(Array *a, int more_size);`

```c
// 一种参考

#include "array.h"
#include "stdio.h"
#include "stdlib.h"

const int BLOCK_SIZE = 20;

//typedef struct {
//    int *array;
//    int size;
//} Array;

Array array_create(int init_size) {
    Array a;
    a.array = (int*)malloc(sizeof(int)*init_size);
    a.size = init_size;
    return a;
}
void array_free(Array *a) {
    free(a->array);
    a->array = NULL;
    a->size = 0;
}
// 封装
int array_size(const Array *a) {
    return a->size;
}
int array_inflate(Array *a, int more_size) {
    // 重新申请一块新的空间
    int *p = (int*)malloc(sizeof(int)*(a->size+more_size));
    // 循环可以用 memcpy 代替
    // 之所以不复制整个 array，是一种保护
    for (int i=0; i<a->size; i++) {
        p[i] = a->array[i];
    }
    // memcpy((void*)p, (void*)a->array, a->size*sizeof(int));
    free(a->array);
    a->array = p;
    a->size += more_size;
}
// 等价于下面的 get 和 set
int* array_at(Array *a, int index) {
    // 越界
    if (index >= a->size) {
        //array_inflate(a, index-a->size+1);
        array_inflate(a, (index/BLOCK_SIZE+1)*BLOCK_SIZE-a->size);
    }
    return &(a->array[index]);
}
int array_get(Array *a, int index) {
    return a->array[index];
}
int array_set(Array *a, int index, int value) {
    a->array[index] = value;
}

int main(int argc, char const *argv[]) {
    Array a = array_create(100);
    printf("%d\n", array_size(&a));
    *array_at(&a, 0) = 10; // 第一个元素设为 10
    printf("%d\n", *array_at(&a, 0));
    
    int number = 0;
    int cnt = 0;
    while (number != -1) {
        if (number != -1)
            *array_at(&a, cnt++) = number; //无限读入整数，自动增长
    }
    array_free(&a);
    return 0;
}
```

- 可变数组的缺陷

  - 每一次增大时都要申请新的内存空间，然后拷贝。拷贝需要耗费时间。

  - 可能会申请不到：

    ![](http://qnimg.lovevivian.cn/video-zheda-cadvan-5.jpeg)

  - 解决办法：每次申请一个 BLOCK 大小的内存，然后和已有的链起来。既避免了拷贝（节约了时间）又充分利用了内存。

## 链表

- 数据+指针，指针指向下一个，有个 HEAD 和结尾的标记：链表。

  ```c
  #ifndef _NODE_H_
  #define _NODE_H_
  typedef struct _node {
      int value;
      struct _node *next; // 指向下一个一样的类型
  } Node;
  #endif
  ```

  ```c
  #include "node.h"
  #include "stdio.h"
  #include "stdlib.h"
  
  int main(int argc, char const *argv[]) {
      Node * head = NULL;
      int number;
      do {
          scanf("%d", &number);
          if (number != -1) {
              // addd to linked-list
              Node *p = (Node*)malloc(sizeof(Node));
              p->value = number;
              p->next = NULL;
              // find the last 
              Node *last = head;
              if (last) { // 当只有一个时
                  while (last->next) {
                      last = last->next;
                  }
                  // attach
                  last->next = p;
              } else {
                  head = p;
              }
          }
      } while (number != -1);
  }
  ```

- **链表的函数（4.2 第三个视频）**

  - 全局变量 `Node *head;`：不好，只能使用一次。
  - return 一个 head：使用时必须 `head = add(head, number);` 但又无法强迫。
  - 把 head 的指针传进去：`add(&head, number);`
  - 使用一个自定义的结构体，便于扩充。

  ```c
  #include "node.h"
  #include "stdio.h"
  #include "stdlib.h"
  
  typedef struct _list {
      Node* head;
  } List;
  
  void add(Node* head, int number);
  void print(List *pList)
      
  int main(int argc, char const *argv[]) {
      List list;
      list.head = NULL;
      int number;
      do {
          scanf("%d", &number);
          if (number != -1) {
              // 添加数字给一个 链表
              add(&list, number);
          }
      } while (number != -1);
      // 打印
      print(&list); 
      // 找到一个数字并删除
      scanf("%d", &number); 
      Node *p;
      int isFound = 0;
      for (p=list.head; p; p=p->next) {
          if (p->value == number) {
              printf("找到了\n");
              isFound = 1;
              break;
          }
      }
      if (!isFound) { printf("没找到\n"); }
      // 删除
      Node *q;
      for (q=NULL, p=list.head; p; q=p, p=p->next) {
          if (p->value == number) {
              if (q) {
                  q->next = p->next;
              } else { // q 为 NULL，刚进去的时候
                  list.head = p->next;
              }
              free(p);
          }
      }
      // 清除
      for (p=head; p; p=q) {
          q = p->next;
          free(p);
      }
      return 0;
  }
  
  void add(List* pList, int number) {
      // addd to linked-list
      Node *p = (Node*)malloc(sizeof(Node));
      p->value = number;
      p->next = NULL;
      // find the last 
      Node *last = pList->head;
      // 每次从 head 开始指向，是否可以直接从 tail 开始指
      if (last) {
          // 当只有一个时
          while (last->next) {
              last = last->next;}
          // attach
          last->next = p;
      } else { pList->head = p;}
  }
  
  void print(List *pList) {
      // 遍历 print(&list)
      Node *p;
      for (p=list.head; p; p=p->next) {
          printf("%d\t", p->value);
      }
      printf("\n");
  }
  ```

- 链表的搜索

- 链表的删除

  - 前面的指针指向下一个
  - free

- 链表的清除

# Week5：程序结构

## 全局变量

- 初始化

  - 没有做初始化的全局变量会得到 0 值：指针会得到 NULL 值
  - 只能用编译时刻已知的值来初始化全局变量
    - `int gAll=12; int g2=gAll;` 不行
    - `const int gAll=12; int g2=gAll;` 可以
    - 建议：全局变量的值不应该和另外的全局变量的值联系在一块
  - 它们的初始化发生在 main 函数之前
- 被隐藏的全局变量

  - 如果函数内部存在于全局变量同名的变量，则全局变量被隐藏
- 静态本地变量

  - 本地变量定义时加上 static 即为静态本地变量，不初始化时值为 0
  - 当函数离开的时候，静态本地变量会继续存在并保持其值
  - 静态本地变量的初始化只会在第一次进入这个函数时做，以后进入函数时会保持上次离开的值
  - 静态本地变量实际上是**特殊的全局变量**，它们位于相同的内存区域
  - 静态本地变量具有全局的生存期，函数内的局部作用域：static 的意思是局部作用域（本地可访问）
- `*` 返回指针的函数
    - 返回本地变量的地址是危险的；返回全局或静态本地变量的地址是安全的
    - 返回在函数内 malloc 的内存是安全的，但容易造成问题，最好的做法是**返回传入的指针*
- tips
  - 不要使用全局变量来在函数间传递参数和结果
  - 尽量避免使用全局变量
  - 使用全局变量和静态本地变量的函数是线程不安全的

## 编译预处理和宏

### 宏定义 

- 编译预处理指令
  - `#` 开头的是编译预处理命令
  - 但不是 C 语言成分
  - `#define` 用来定义一个宏
- `#define`
  - `#define <名字> <值>`
  - 没有结尾分号，因为不是 C 语言
  - 名字必须是一个单词，值可以任意
  - 在 C 语言编译器开始编译前，编译预处理程序（cpp）会把程序中的名字替换掉（完全的文本替换）
  - `gcc --save-temps`: `.c->.i->.s->.o->a.out`
    - `.i` 由 C 编译器编译，产生汇编代码文件 `.s`
    - 汇编代码文件 `.s` 汇编后成为目标代码文件 `.o`
    - 目标代码文件 `.o` 通过链接生成可执行文件 `a.out`
- 宏
  - 如果一个宏的值中有其他的宏的名字，也会被替换
  - 如果一个宏的值超过一行，最后一行之前的行末要加 `\`
  - 宏的值后面出现的注释不会被当作宏的值的一部分
- 没有值的宏
  - `#define_DEBUG`
  - 这类宏用于条件编译
- 预定义的宏
  - `__LINE__` 行号
  - `__FILE__` 文件名
  - `__DATE__` 日期
  - `__TIME__` 时间
  - `__STDC__` 

### 带参数的宏

- 像函数的宏
  - `#define cube(x) ((x)*(x)*(x))`
  - 宏可以带参数，不管参数的类型
- 错误定义的宏
  - `#define RADTODEG(x) (x*57.29578)` 
  - `#define RADTODEG(x) (x)*57.29578` 
- 带参数的宏的原则
  - 一切都要括号
    - 整个值要括号
    - 参数出现的每个地方都要括号
- 带参数的宏
  - 可以带多个参数
  - 也可以组合（嵌套）使用其他宏
  - 使用很普遍，可以很复杂
  - 部分宏会被 inline 函数替代
- 结尾不要加分号

### 练习题

```c
#include <stdio.h>
#include <string.h>
#define TOUPPER(c) ('a'<=(c)&&(c)<='z'?(c)-'a'+'A':(c))
int main()
{
	int i = 0;
	char s[100];
	strcpy(s, "abcd");
	putchar(TOUPPER(s[++i]));
}
// 结果为 D，i 加 1，实际加的是 sizeof(i)
```

## 大程序结构

### 大程序

- 多个 `.c` 文件
  - main() 里的代码太长了适合分成几个函数
  - 一个源代码文件太长适合分成几个文件
  - 两个独立的源代码文件不能编译形成可执行的程序
- 项目
  - 把源代码文件放在一个项目下
  - 会把所有源代码文件编译后链接起来

### 头文件

- 把函数原型放到一个头文件（`.h`结尾）中，在需要调用这个函数的源代码文件（`.c`文件）中 `#include` 这个头文件，就能让编译器在编译的时候知道函数的原型。
- `#include`
  - 编译预处理指令，和宏一样，在编译之前就处理了
  - 它把那个文件的全部文件内容原封不动地插入到它所在的地方
  - 所以也不是一定要在 `.c` 文件的最前面 `#include`
- `gcc *.c -c` 参数 c 的作用是只编译，不输出可执行文件
- 自己的用 `""`，系统的用 `<>`
- `#include`的误区
  - 不是用来引入库的
  - C 语言默认会引入所有的标准库
  - `stdio.h` 只有 printf 的原型，printf 的代码在另外的地方：某个 `.lib(win)` 或 `.a(Unix)` 中
  - `#include <stdio.h>` 只是为了让编译器知道 printf 函数的原型，保证在调用时**给出的参数值是正确的类型**
- Tips
  - 使用和定义这个函数的地方都应该 `#include` 这个头文件
  - 一般的做法就是任何的 `.c` 都有对应的 `.h`，把所有对外公开的函数的原型和全局变量的声明都放进去，全局变量在多个 `.c` 文件中可以共享，但是需要用恰当的方式。
- 不对外公开的函数
  - 在函数前面加上 static 就使得它成为只能在所在的编译单元中被使用的函数
  - 在全局变量前面加上 static 就使得它成为只能在所在的编译单元中被使用的全局变量

### 声明

- 其他 `.c` 使用全局变量，在 `.h`中声明，如：`extern int gAll;`

- `int i;` 变量定义；`extern int i;` 变量声明

- 声明和定义

  - 声明是不产生代码的：
    - 函数原型
    - 变量声明
    - 结构声明
    - 宏声明
    - 枚举声明
    - 类型声明
    - inline 函数
  - 定义是产生代码的

- 头文件

  - 只有声明可以被放在头文件中：规律
  - 否则会造成一个项目多个编译单元里有重名的实体

- 重复声明

  - 同一个编译单元里，同名的结构不能被重复声明
  - 如果头文件里有结构的声明，很难保证这个头文件不会在一个编译单元里被 `#include` 多次（可能多个 `.h` 中出现）
  - 所以需要 “标准头文件结构”

- 标准头文件结构

  - 示例

    ```c
    #ifndef __LIST_HEAD_
    #define __LIST_HEAD_
    #include "node.h"
    typedef struct _list {
        Node* head;
        Node* tail;
    } List;
    #endif
    ```

  - 运用条件编译和宏，保证这个头文件在一个编译单元中只会被 `#include` 一次

  - `#pragma once` 也能起到相同的作用，但是不是所有的编译器都支持

# Week6：交互图形设计

## 图形的终端输入输出

- 在 scanf 时，程序是停下来的，所以不会显示任何东西（图形界面被挡住了）

## 函数指针及其应用

### 函数指针

- 变量：`&变量名` 取地址
- 数组：`数组名`直接取地址
- 函数：`f` 就是个地址，`f` 取地址
- `void f(void) { printf("test\n"); }`，`void (*pf)(void) = f`
  - 后面这个函数返回 void，参数不确定
  - 这样的函数用 pf 变量指向它
  - 把 f 函数交给 pf
  - `(*pf)();` 可以调用 f
  - void 参数可以替换为 int 等，传递参数时也应传入相应类型的值

### 函数指针的使用

- 应用1：根据用户输入不同来判断要做的事

  ```c
  // ver3.0 无论增加多少个函数，只需要加入 fa 的初始化里即可，不需要修改条件判断。
  #include <stdio.h>
  
  void f(int i)
  {
      printf("in f(), %d\n", i);
  }
  void g(int i)
  {
      printf("in g(), %d\n", i);
  }
  void k(int i)
  {
      printf("in k(), %d\n", i);
  }
  
  int main(void)
  {
      int i = 0;
      scanf("%d", &i);
      // ver1.0
      // if (i == 0) { f(0); }
      // else if (i == 1) { g(0); }
      // else if (i == 2) { k(0); }
      // ver2.0
      // switch(i)
      // {
      //     case 0: f(0); break;
      //     case 1: g(0); break;
      //     case 2: k(0); break;
      // }
      // ver3.0
      void (*fa[])(int) = {f, g, k}; // 定义了一个 叫 fa 的函数指针数组，每一项都是一个函数指针
      if (i>=0 && i<sizeof(fa)/sizeof(fa[0])) {
          (*fa[i])(0);
      }
  }
  ```

- 应用2：把函数当做参数，根据不同的函数（动作）做不同的事

  ```c
  #include <stdio.h>
  
  int plus(int a, int b)
  {
      return a+b;
  }
  int minus(int a, int b)
  {
      return a-b;
  }
  void cal(int (*f)(int, int))
  {
      printf("%d ", (*f)(2,3));
  }
  int main(void)
  {
      cal(plus); // 5
      cal(minus); // -1
      return 0;
  }
  ```

## 交互图形程序设计

### 回调函数

- 先注册一个函数到主程序，当满足某个条件时，就做函数要做的事。

- setup 做完后进入消息循环 loop，如果之前注册过回调函数，则调用回调函数，否则不动。如果回调函数是死循环，窗口都无法关闭。

  ![](http://qnimg.lovevivian.cn/video-zheda-cadvan-6.jpeg)

### 图形交互消息

- Callbacks（回调）
  - Keyboard：对每个键有按下和抬起两种
  - Char：某个键
  - Mouse
  - Timer

## 游戏设计思路

- MVC
  - View：从 Model 取数据过来
  - Ctrl：告诉 Model 什么数据怎么改
  - 鼠标**动作不影响图像的改变，引起的是数据的改变**
- 炮打飞机
  - 各种对象的数据结构，记录对象的状态
  - Timer（飞机自己动，炮弹飞之类）
  - 到时候，Scan，扫描所有数据结构，找出每个东西在这一步做什么
  - 特殊情况判断：炮弹 Hit，飞机 Crash 等
  - Refresh（draw，重新画一遍画面，不用计算哪些动哪些没动）
- 其他细节
  - 爆炸场面
    - 效果很短，另外开一个定时器
    - 爆炸是一个对象，放到数据结构里
- 所有屏幕上的东西都是对象，动作在定时器每一次回来时做。

# Week7：文件

## 格式化输入输出

### printf

`%[flags][width][.prec][hlL]type`

- flags

  - `-` 左对齐
  - `+` 在前面放 + 或 -
  - ` ` 正数留空
  - `0` 0 填充

- width 或 prec

  - `number` 最小字符数
  - `*` 下一个参数是字符数
  - `.number` 小数点后的位数
  - `.*` 下一个参数是小数点后的位数

- hlL

  - `hh` 单个字节
  - `h` short
  - `l` long
  - `ll` long long
  - `L` long double

- type

  ![](http://qnimg.lovevivian.cn/video-zheda-cadvan-8.jpeg)

### scanf

`%[flag]type`

![](http://qnimg.lovevivian.cn/video-zheda-cadvan-9.jpeg)

![](http://qnimg.lovevivian.cn/video-zheda-cadvan-10.jpeg)

### printf 和 scanf 的返回值

- 输出的字符数
- 读入的项目数
- 严格的程序中应判断每次调用 scanf 或 printf 的返回值，了解程序运行中是否存在问题

## 文件输入输出

- 用 `<` or `>` 做重定向

- FILE

  - `FILE* fopen(const char * restrict path, const char * restrict mode);`
  - `int fclose(FILE *stream);`
  - `fscanf(FILE*, ...)`
  - `fprintf(FILE*, ...)`

- 打开文件标准代码

  ```c
  FILE* fp = fopen("file", "r");
  if (fp) {
      fscanf(fp,...);
      fclose(fp);
  } else { ... }
  ```

- fopen（当文件打开出现错误时，fopen 返回 0）

  ![](http://qnimg.lovevivian.cn/video-zheda-cadvan-11.jpeg)

## 二进制文件

- 二进制文件
  - 文本文件是用最**简单的方式**可以读写的文件（给人看的）
  - 二进制文件是需要专门的程序来读写的文件
  - 文本文件的输入输出是格式化，可能经过转码
- 文本 VS 二进制
  - Unix 喜欢用文本文件做数据存储和程序配置，shell 提供了一些读写文本的小程序
  - Win 喜欢用二进制文件，DOS 不继承和熟悉 Unix 文化，且 DOS 能力更有限，二进制接近底层
  - 方便人类读写、跨平台、格式化、开销大 VS 相反的
- 程序为什么要文件
  - 配置：Unix 用文本，Win 用注册表
  - 数据：数据库
  - 媒体：二进制
  - 现实是，程序通过第三方库来读写文件，很少直接读写二进制文件
- 二进制读写
  - `size_t fread(void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);`
    - `*restrict ptr`：读或写的指针（内存）
    - `size_t size`：内存有多大。一个结构的大小。
    - `size_t nitems`：这样的内存有几个。因为二进制文件的读写一般都是通过对一个结构变量的操作进行的，nitem 就用来说明这次读写几个结构变量。
  - `size_t fwrite(const void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);`
  - FILE 指针是最后一个参数
  - 返回的是成功读写的字节数
- 在文件中定位
  - `long ftell(FILE *stream);`
  - `int fseek(FILE *stream, long offset, int whence);`
    - `SEEK_SET`: 从头开始
    - `SEEK_CUR`: 从当前位置开始
    - `SEEK_END`: 从尾开始
- 可移植性
  - 上面这样的二进制文件不具有可移植性（int32 机器上写出的数据文件无法直接在 int64 的机器上正确读出）
  - 解决方案之一是放弃 int，用 typedef 定义明确大小的类型
  - 更好的方案是用文本

## 按位运算

- 按位与 `&`
  - `(x)i == 1` 并且 `(y)i == 1`，那么 `(x&y) = 1`，否则为 0
  - 应用：
    - 让某一位或某些位为 0
    - 取一个数的一段
- 按位或 `|`
  - `(x)i == 1` 或 `(y)i == 1`，那么 `(x&y) = 1`，否则为 0
  - 应用：
    - 使得一位或几位为 1
    - 把两个数拼起来
- 按位反 `~`
- 逻辑运算 VS 按位运算
  - 可以认为逻辑运算相当于把所有非 0 值全变为 1，然后按位运算
  - `5 & 4 -> 4 而 5 && 4 -> 1 & 1 -> 1`
  - `5 | 4 -> 5 而 5 || 4 -> 1 | 1 -> 1`
  - `!4 -> 3 而 !4 -> !1 -> 0`
- 按位异或 `^`
  - `(x)i == (y)i`，那么 `(x^y)i = 0`，否则为 1
  - 两个位相等为 0，不相等为 1
  - 对一个变量用同一个值异或两次，等于什么都没做

## 移位运算

- 左移，后面填 0，`x << n` 等价于 `x *= 2^n`
- 右移，对于 unsigned 类型前面填 0，对于 signed 类型，前面填入原来的最高位（保持符号不变），`x >> n` 等价于 `x /= 2^n`，

## 位运算例子

- 输出二进制
- 单片机

## 位段

把一个 int 的若干位段组合成一个结构

```c
struct {
    unsigned int leading: 3; // 占了几位
    unsigned int FLAG1: 1;
    unsigned int FLAG2: 1;
    int trailing: 11;
}

struct U0 uu;
uu.leading = 2; // 赋值
uu.FLAG1 = 0;
uu.FLAG2 = 1;
uu.trailing = 0;
```

- 可以直接用位段的成员名称访问，比移位、与、或方便
- 编译器会安排其中的位的排列，不具有可移植性
- 当所需的位超过一个 int 时会采用多个 int

# 期末考试

```c
while(*s++ = *t++); 
等价于：
do { 
    *s = *t++;  
} while (*s++); // the answer
还是：
do { 
    *s++ = *t++;  
} while (*t);
```

```c
有以下结构体说明和变量定义，指针 p、q、r 依次指向一个链表中的三个连续结点。
struct   node
{ 
    int  data
    struct   node   *next ;
} *p,  *q,   *r;
现要将 q 和 r 所指结点的先后位置交换，同时要保持链表的连续，以下错误的程序段是：
A. q->next=r->next;  p->next=r;  r->next=q;
B. r->next=q;  q->next=r->next;  p->next=r;
C. q->next=r->next;  r->next=q;  p->next=r;
D. p->next=r;  q->next=r->next;  r->next=q;
```

```c
struct { 
    int k; 
    char s[30]; 
} a[5] = {1, "ABC", 2, "abc"}, *p = a;
表达式 *(p++)->s 的值是：'A'; // p++ 表达式的值是 p
printf("%c\n", *(p->s)); // == *p->s, A
printf("%c\n", p->s[0]); // A
printf("%s\n", p->s); // ABC
printf("%d\n", p->k); // 1
```

```c
/* ex1.c */
int a[3] = {1,2,3}; // int a[20] = "fsadfasf"; // 字符串数组
int *p = a;
printf("p=%p\n", p); // 地址，与 &a 结果相同
printf("p[0]=%d\n", p[0]); // 数组第一个元素，与 a[0] 结果相同
printf("*p=%d\n", *p); // 数组第一个元素，如果是字符串就是字符串的第一个元素
printf("*p=%d\n", *p++); // 数组第一个元素，p++ 的值就是 p
```

```c
/* ex3.c */
int x, y, z, w;
void p(int *y, int x)
{
    static int w;
    *y++; x++; w = x+*--y; 
    // *y++ 取出 y 所指的数据，指针 y 往后移到下个位置，*--y 移回来再取所指的数据
    // 所以 *--y 是 0
    printf("%d#%d#%d#%d#",x,*y,z,w); // z 为什么是 0？
}
int main(void)
{
    int x, y, z, w;
    x=y=z=w=1;
    do{
        static int x;
        p(&x, y);
        printf("%d#%d#%d#%d#",x,y,z,w);
    } while(0);
    return 0;
}
输出：2#0#0#2#0#1#1#1#
```

```c
/* ex4.c */
char a[20]="cehiknqtw"; // 字符串数组
char *s="fbla",*p; // char *s = "fbla" 实际是 const char *s = "fbla"
int i, j;
// p 是地址，地址 ++，增加的是 sizeof(类型)
// 遍历 s 中的每个字母
for(p=s; *p; p++) {
   j=0;
   while (*p>=a[j] && a[j]!='\0') j++;
   for(i=strlen(a); i>=j; i--) a[i+1] = a[i]; // 往后挪一位给 *p 腾位置
   a[j]=*p;
}
printf("%s", a);
输出：abcefhiklnqtw
```

```c
/* ex5.c */
int main(int argc, char** argv)
{	
    // argv 是地址
    // *argv 是程序文件名 ./a.out, abc ...
    // **argv 是每个文件名的第一个元素
    // ++ 优先级高，取出 argv 指向的数据的第一个元素，然后把指针移向下一个位置
    while(**argv++!='a'); // 第一个 ./a.out 就满足了；但是没有任何操作
    printf("%s", *argv); // 上面的条件不满足时，输出 *argv，此时由于已经 ++，所以指向的是下一个
    return 0;
}
./a.out  abc  bcd  cde  aed 输出：bcd
如果把 printf("%s", *argv); 放在 while 那句后面，则会输出：abc
```

# 附录

[相关代码及练习](https://github.com/hscspring/All4Coding/tree/master/Zheda-C-advance)