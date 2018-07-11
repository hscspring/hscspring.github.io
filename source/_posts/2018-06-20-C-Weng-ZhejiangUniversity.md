---
title: 浙大翁恺老师《程序设计入门——C语言》笔记
date: 2018-06-20 08:32:00
categories: Coding
tags: [C]
---

>说明：本文档为浙大翁恺老师《程序设计入门——C语言》课程内容笔记，主要记录学习过程中的一些重要或自己不懂的知识点，内容不一定适合其他人。
>
>翁老师讲课真的很通俗易懂，这个课程作为入门课难度适中，推荐需要学习 C 语言的同学从这门课开始。

# 目录

1. 程序设计与 C 语言
  1.1 计算机和编程语言
  1.2 C 语言
  1.3 第一个程序
2. 计算
  2.1 变量
  2.2 数据类型
  2.3 表达式
3. 判断与循环
  3.1 判断
  3.2 循环
4. 进一步的判断与循环
  4.1 逻辑类型和运算
  4.2 级联和嵌套的判断
  4.3 多路分支
  4.4 循环的例子
  4.5 判断和循环常见的错误
5. 循环控制
  5.1 循环控制
  5.2 多重循环
  5.3 循环应用
6. 数组与函数
  6.1 数组
  6.2 函数的定义与使用
  6.3 函数的参数和变量
  6.4 二维数组
7. 数组运算
  7.1 数组运算
  7.2 搜索
  7.3 排序初步
8. 指针与字符串
  8.1 指针
  8.2 字符类型
  8.3 字符串
  8.4 字符串计算

期中测验
期末考试
附录

# 1. 程序设计与 C 语言

## 1.1 计算机和编程语言

- 人：What to do；计算：How to do
- 计算机做的所有事情都是计算，计算的步骤就是算法。
- 程序的执行
  - 解释
  - 编译

## 1.2 C 语言

- 历史

  - FORTRAN - BCPL - B - C
  - 1973 年 3 月：第三版 Unix 上出现了 C 语言编译器
  - 1973 年 11 月：第四版 Unix 完全用 C 语言重写
- 版本

  - 经典 C

  - 1989  ANSI C

  - 1990 ISO 接受了 ANSI 的标准——C89

  - 1995 1999 两次更新：C95 C99
- 应用
    - 操作系统
    - 嵌入式系统
    - 驱动程序
    - 底层驱动：图形引擎、图像处理、声音效果等

## 1.3 第一个程序

<!--more-->

# 2. 计算

## 2.1 变量

保存数据的地方：`<变量类型> <变量名称1>, <变量名称2> `

没有初始化时会选择原来位置的值，程序结果会出错。

`<类型名称> <变量名称1> = <初始值1>, <变量名称2> = <初始值2>;` `int price = 0, amount = 100;`

ANSI C 只能在开头的地方定义变量

出现在 `scanf` 里的东西就是要输入的东西，而不是要看到的东西。

常量：`const int AMOUNT = 100;`

## 2.2 数据类型

浮点数和整数放到一起运算时，会将整数转换成浮点数。

- double
  - `printf("%f", ...)`
  - `scanf("%lf", ...)`
- `%d 和 %u 都是十进制。%o 是八进制，%x 是十六进制`

## 2.3 表达式

- 运算符：进行运算的动作
- 算子：参与运算的值

![](http://ohjwan9tm.bkt.clouddn.com/video-zhedac-3.jpeg)

结合关系

- 一般自左向右
- 单目+- 和赋值= 自右向左

交换两个变量

- 程序表达的是顺序**执行的动作**（步骤），而**不是关系**
- 需要临时中间变量

复合赋值

- `+=`
- `*=` `total *= sum + 12; <==>total = total * (sum+12);`
- ...

递增递减运算符前缀后缀

- `a++` 的值是 a 加 l 以前的值

- `++a` 的值是加了 l 以后的值

- 无论哪个，a 自己的值都加了 l 了


![](http://ohjwan9tm.bkt.clouddn.com/video-zhedac-2.jpeg)


# 3. 判断与循环

## 3.1 判断

- 所有的关系运算符的优先级比算术运算的低，但是比赋值运算的高。
- 判断是否相等和不等的优先级比其他的低，连续的关系运算是从左到右进行的。

## 3.2 循环

- `while`
- `do-while`: `do { <循环体语句> } while (<循环条件>);`
- `for`: `for (<初始条件> <循环继续的条件> <循环每轮要做的动作>)`
  - `for (i=1; i<n; i++)...`
  - `for (i=n; i>1; i--)...`
  - `for (n=n; n>1; n--)...`
  - `for (; n>1; n--)...`
- 任何一个 for 循环都可以改成 while 循环
- Tips for loops
  - 如果有固定次数，用 for
  - 如果必须执行一次，用 do-while
  - 其他情况用 while
- `for ( int i=10; i>1; i /=2 ) {printf("%d", i++);}` 输出：`10532`
  - `i++` 输出的是 i 原来的值

# 4. 进一步的判断与循环

## 4.1 逻辑类型和运算

- 没有真正的 bool 类型


- 逻辑运算
  - `!`
  - `&&`
  - `||`
  - `!age<20`: 单目运算符优先级高于双目运算符，`(!age)<20`，表达式永远为 0

- 优先级

  - 逻辑运算符优先级普遍低于比较运算符
  - `! > && > ||`: `!done && (count > MAX)`

  ![](http://ohjwan9tm.bkt.clouddn.com/video-zhedac-4.jpeg)

- 短路：逻辑运算是自左向右进行的，如果左边的结果已经能够决定结果了，就不会做右边的运算。

  - 对于 `&&`，左边的是 false 时就不做右边了
  - 对于 `||`，左边的是 true 时就不做右边了

- 条件运算符

  - `count = (count>20) ? coutn-10:count+10`
  - 条件、满足时的值、不满足时的值
  - 优先级高于赋值运算符，但是低于其他运算符
  - 自右向左结合

- 逗号

  - 用来连接两个表达式，并以其右边的表达式的值作为它的结果。
  - 优先级是所有的运算符中最低的。
  - `(3+4, 5+6)` 的结果是 11
  - 在 for 中使用：`for (i=0,j=10; i<j; i++,j—)…`


## 4.2 级联和嵌套的判断

- else 的匹配：总是和最近的 if 匹配（不加大括号的时候）。
- tips：
  - 在 if 或 else 后面总是用 `{}`
  - 即使只有一条语句的时候。
- 级联：`if, else if`

## 4.3 多路分支

- switch-case
  - `switch (控制表达式) { case 常量: 语句; break;}`
  - break 让程序离开那个 case。如果没有 break 直接进到下一个 case。case 只是一个入口。

## 4.4 循环的例子

- 小套路

  - 将会变化的量保存下来，如果后面需要的话。
  - 如果要模拟运行一个很大次数的循环，可以模拟较少的循环次数，然后作出推断。

- 整数的分解

  - `%10` 个位数
  - `/10` 丢掉个位数
  - 再 `%10` 得到十位数

- 逆序

  ```c
  # include <stdio.h>

  int main()
  {
      int x;
      x = 12345;
      int digit;
      int ret = 0;
      
      while (x > 0) {
          digit = x%10;
          // 如果要输出类似 007 需要
          printf("%d", digit);
          ret = ret*10 + digit;
          print("x=%d, digit=%d, ret=%d\n", x, digit, ret);
          x /= 10;
      }
      printf("%d", ret);
      return 0;
  }
  ```

## 4.5 判断和循环常见的错误

- 忘了大括号
- if 后面的分号
- 错误使用 == 和 =
- 代码风格

# 5. 循环控制

## 5.1 循环控制

- break: 跳出循环
- continue: 跳过循环这一轮剩下的语句进入下一轮

## 5.2 多重循环

- 嵌套循环

- 凑硬币：接力 `break` or `goto`

  ```C
  int x;
  int one, two, five;
  int exit = 0;

  scanf("%d", &x);
  for ( one = 1; one < x*10; one++) {
      for (two = 1; two < x*10/2, two++) {
          for (five = 1; five < x*10/5; five++) {
              if (one + two*2 + five*5 == x*10) {
                  printf("可以用%d个1角加%d个2角加%d个五角得到%d元\n",
                        one, two, five, x);
                  exit = 1;
                  break;
              }
          }
          if (exit == 1) break;
      }
      if (exit == 1) break;
  }
  ```

  ```C
  int x;
  int one, two, five;
  int exit = 0;

  scanf("%d", &x);
  for ( one = 1; one < x*10; one++) {
      for (two = 1; two < x*10/2, two++) {
          for (five = 1; five < x*10/5; five++) {
              if (one + two*2 + five*5 == x*10) {
                  printf("可以用%d个1角加%d个2角加%d个五角得到%d元\n",
                        one, two, five, x);
                  goto out;
              }
          }
      }
  }
  out:
  	return 0;
  ```

## 5.3 循环应用

- 求和

  ```C
  double sum = 0.0;
  double sign = 1.0;
  for (i = 1; i <= n; i++) {
      sum += sign/i;
      sign = - sign;
  }
  ```

- 求最大公约数

  - 枚举

    ```C
    int ret = 0;
    for (i = 1; i < min(a,b); i++) {
        if (a%i == 0) {
            if (b%i == 0) {
                ret = i;
            }
        }
    }
    ```

  - 辗转相除法

    ```C
    while (b != 0) {
        t = a%b;
        a = b;
        b = t;
    }
    ```

    - 如果 b 等于 0，计算结束，a 就是最大公约数
    - 否则，计算 a%b，让 a 等于 b，而 b 等于那个余数
    - 回到第一步

- 正序分解整数

  ```C
  int x;
  scanf("%d", &x);
  int mask = 1;
  int t = x;
  while (t > 9) {
      t /= 10;
      mask *= 10;
  }
  do {
      int d = x/mask;
      if (mask > 9) {
          printf(" ");
      }
      x %= mask;
      mask /= 10;
  } while (mask > 0);

  // x = 13425; need 1 3 4 2 5
  // 13425 / 10000 -> 1
  // 13425 % 10000 -> 3425
  // 10000 / 10 -> 1000;
  // 3425 / 1000 -> 3;
  // 3425 % 1000 -> 425;
  // 1000 / 10 -> 100;
  // 425 / 100 -> 4;
  // 425 % 100 -> 25;
  // 100 / 10 -> 10
  // 25 / 10 -> 2
  // 25 % 10 -> 5
  // 10 / 10 -> 1
  // 5 / 1 -> 5
  // 5 % 1 -> 0
  // 0 / 10 -> 0
  ```

# 6. 数组与函数

## 6.1 数组

数组是长度固定的数据结构，用来存放指定的类型的数据。一个数组里可以有很多个数据，所有的数据的类型都是相同的。

- 定义：`<类型> 变量名称 [元素数量];` `int number[100];`
- 赋值：`number[i] = x;`

数组是一种容器，特点：

- 所有元素具有相同数据类型；
- 一旦创建，不能改变大小；
- 数组中的单元依次排列。

编译器和运行环境都不会检查数组下标是否越界。

- 读数时就计数
- 数组大小作为变量

```C
const int number = 10; // 数组大小
int x;
int count[number]; // 定义数组
int i;
// 初始化数组
for (i = 0; i < number; i++) {
    count[i]  = 0;
}
scanf("%d", &x);
while ( x != -1) {
    if (x >= 0 && x <= 9) {
        count[x]++; // 数组参与运算，统计出现次数
    }
    scanf("%d", &x);
}
for (i = 0; i < number; i++) {
    printf("%d:%d\n", i, count[i]);
}
```

## 6.2 函数的定义与使用

“代码复制” 是程序质量不良的表现。

函数是一块代码，接收零个或多个参数，做一件事情，并返回零个或一个值。

`返回类型 函数名 (参数表)` `void sum(int begin, int end) {}`

void 不能使用带值的 return

## 6.3 函数的参数和变量

原型声明：将函数头放在调用前。函数头参数可以不写名字。如果确定没有参数，把 void 写进去：`void swap(void);` 对于不返回值而且只有一个 int 类型的参数的函数，以下函数原型是正确的：

- `void f(int x);`
- `void f();`
- `void f(int);`

函数参数表中的参数：形式参数 VS 实际参数：调用函数时给的值。（已经不需要这么认识了）。

定义在函数内部的变量就是本地变量（局部变量）。

- 本地变量的生存期、作用域：大括号内。
- 块外定义的变量，块内仍然有效。
- 内部外部同名，内部会覆盖掉外部。
- 本地变量不会被默认初始化。
- 参数在进入函数的时候就初始化了。

C 语言不允许函数嵌套定义，但是可以放声明。

关于 main 函数，return 0 有意义的，return 非 0：

- windows: if errorlevel 1...
- Unix Bash: echo $?
- Csh: echo $status

## 6.4 二维数组 

二维数组的初始化：

- 列数必须给出，行数可以由编译器来数；
- 每行一个 `{}`，逗号分隔；
- 最后的逗号可以存在；
- 如果省略，表示补零；


# 7. 数组运算

## 7.1 数组运算

数组集成初始化：

- `int a[] = {2, 4, 6, ...};`，大小由元素数量确定。

- `int a[13] = {2};`，除了第一个元素为 2，其他元素均为 0

- `int a[10] = { [0] = 2, [2] = 3, 6, };` 6 是 `a[3]`

  - 用 `[n]` 在初始化数据中给出定位
  - 没有定位的数据接在前面的位置后面
  - 其他位置的值补零
  - 也可以不给出数组大小，让编译器算
  - 特别适合初始数据稀疏的数组

数组大小：

- `sizeof(a)/sizeof(a[0])`

数组赋值：

- `int a[] = {2,3,4}; int b[] = a;` 是不能赋值的
- 必须遍历：`for (i=0; i<length; i++) {b[i] = a[i];}`
- `int a[][3] = { {0},{1},{2} };`，`a = [[0,0,0],[1,0,0],[2,0,0]]`

遍历数组：

- 通常使用 for，i 从 0 到 < 数组的长度

数组作为函数参数时，往往**必须再用另一个参数来传入数组大小**：

- 不能在 `[]` 中给出数组大小
- 不能再利用 sizeof 来计算数组的元素个数

求素数（待补充）：

- 之前是依次从 2 开始遍历到 x-1
- 偶数肯定不是素数，所以只遍历奇数
- 偶数肯定不是素数，只遍历小于 sqrt(x) 的奇数
- 遍历比 x 小的素数
- 构造素数表：假设所有数字都是素数，剔除每个数字的倍数，最后剩下的就是素数

## 7.2 搜索

基本方法：遍历

- 单一出口

- 一个变量承担多个职能是不好的代码

  ```C
  int search(int key, int a[], int len)
  {
      int ret = -1; //没找到返回 -1
      for ( int i=0; i<len; i++)
      {
          if (key == a[i])
          {
              ret = i;
              break;
          }
      }
      return ret;
  }
  
  int main()
  {
      int a[] = {1,4,5,...};
      int r = search(4, a, sizeof(a)/sizeof(a[0]));
      printf("%d\n", r);
  }
  ```

美元对应：

- 分别是两个数组，找到要的金额的位置，就可以在名字数组中同样的位置找到对应的名字。这种程序对 cache 不友好。

  ```C
  int amount[] = {1,5,10,25,50};
  char *name[] = {"penny", "nickel", "dime", "quarter", "half-dollar"};
  int search(int key, int a[], int len);
  int main()
  {
    int k = 10;
    int r = search(k, amount, sizeof(amount)/sizeof(amount[0]));
    if (r > -1) 
    {
        printf("%s\n", name[r]);
    }
  }
  ```

- 希望金额和名字在一起。重新定义一种数据结构。

  ```C
  struct {
      int amount;
      char *name;
  } coins[] = {
      {1, "penny"},
      {5, "nickel"},
      {10, "dime"},
      {25, "quarter"},
      {50, "half-dollar"}
  };
  
  int main()
  {	
      int k = 10;
      for (int i = 0; i<sizeof(coins)/sizeof(coins[0]), i++)
      {
          if (k == coins[i].amout) {
              printf("%s\n", coins[i].name);
          }
      }
  }
  ```

线性搜索（遍历）没有效率。假设所有的数据是排好序的：

- 给定要搜索的数字，先找到中间的数字，去掉一半的数字；重复。

  ```C
  // 二分搜索 log2(N)
  int search(int key, int a[], int len)
  {
      int ret = -1;
      int left = 0;
      int right = len-1;
      while( right > left )
      {
          int mid = (left+right)/2;
          if ( a[mid] == k)
          {
              ret = mid;
              break;
          }
          else if (a [mid] > k)
          {
              right = mid-1;
          }
          else
          {
              left = mid+1;
          }
      }
      return ret;
  }
  ```

## 7.3 排序初步

```C
// 选择排序
int max(int a[], int len)
{
    int maxid = 0;
    for ( int i=1; i<len; i++)
    {
        if ( a[i] > a[maxid] )
        {
            maxid = i;
        }
    }
    return maxid;
}

int main()
{
    int a[] = {2,45,6,12,87,34,90,24,23,11,65};
    int len = sizeof(a)/sizeof(a[0]);
    for ( int i = len-1; i>0; i--)
    {
        int maxid = max(a, i+1);
        //swap a[maxid], a[len-1] 把最大值放在后面
        int t = a[maxid];
        a[maxid] = a[i];
        a[i] = t;
    }
    for ( int i = 0; i < len; i++)
    {
        printf("%d ", a[i]);
    }
    return 0;
}
```

# 8. 指针与字符串

## 8.1 指针

- `sizeof` 给出某个类型或变量在内存中占的字节数

- `&` : `"%p"`，取地址（16 进制）

  - 获得变量的地址，它的操作数必须是变量
  - 地址的大小是否与 int 相同取决于编译器
  - 不能对没有地址的取地址
  - 连续两个变量，地址紧挨，中间相差**变量类型**占得字节，先定义的在更低的位置（堆栈，自顶向下）
  - 数组：`&a==a==&a[0]==&a[1]-类型长度`

- 指针：就是保存地址的变量

  - `int *p` 表示`*p` 是一个 int，p 是一个指针

  - 作为参数：`void f(int *p)`，在被调用时得到了某个变量的地址：`int i=0; f(&i);`，在函数里面可以通过这个指针访问外面的这个 i，经过 f 函数的调用后 i 的值变了。

  - 访问地址上的变量：`*`是一个单目运算符，用来访问指针的值所表示的地址上的变量，可以做右值也可以做左值：`int k = *p; *p = k+1;`

    ![](http://ohjwan9tm.bkt.clouddn.com/video-zhedac-5.jpeg)

- 指针与数组：

  - 函数参数表中的数组实际上是指针，参数中的 `int a[]` 是指针
    - `sizeof(a) == sizeof(int*)`
    - 但是可以用数组的运算符 `[]` 进行运算
    - `int sum(int *ar, int n) == int sum(int *, int) == int sum(int ar[], int n) == int sum(int [], int)` 在参数表中是等价的
    - 所以在函数内部没有办法用 sizeof 获取大小
  - 数组变量是特殊的指针
    - 数组变量本身表达地址，因此 `int a[10]; int *p = a; //无需用 & 取地址`，但是数组的单元表达的是变量，需要用 `&` 取地址：`a==&a[0];`
    - `[]`运算符可以对数组做，也可以对指针做：`p[0] == a[0]`
    - `*` 运算符可以对指针做，也可以对数组做：`*a = 25`
    - 数组变量是 const 的指针，所有不能被赋值：`int a[] == int *const a=`

## 8.2 字符类型

- char 是一种**整数**，也是一种特殊的类型：**字符**。

  - 单引号表示字符变量

  - `printf scanf` 中用 %c 输入输出字符

  - `'1'` 的 ASCII 编码是 49，所以当 c==49 时，它代表 `'1'`

    ![](http://ohjwan9tm.bkt.clouddn.com/video-zhedac-7.jpeg)

  - 如何输入 `'1'` 这个字符给 char c

    - `scanf("%c", &c); ->1`
    - `scanf("%d", &i); c=i; ->49`

  - '1' 的 ASCII 编码是 49，所以当 c==49 时，它代表 '1'，**49=='1'**

  - 一个 49 各自表述

  - 混合输入

    - 没有空格，只读到**整数结束**为止
    - `scanf("%d %c", &i, &c);` 与 `scanf("%d%c", &i, &c);`

  - 字符计算

    - `'A++' == 'B'`
    - 大小写转换：`a+'a'-'A'` 可以把一个大写字母变成小写字母；`a+'A'-'a'`可以把小写字母变成大写字母

- 逃逸字符

  - 用来表达无法打印出来的控制字符或特殊字符，由一个反斜杠开头
  - `\b, \t, \n, \r, \", \', \\`，table 是在固定位置（制表位），`\r` 是回车，编译器会把 `\n `翻译成回车+换行

## 8.3 字符串

- 字符数组如 `char word[] = {'H', 'e', 'l', 'l'}` 不是 C 语言的字符串，因为不能用字符串的方式做计算，这样的才是：`char word[] = {'H', 'e', 'l', 'l', '\0'}`，word 还是字符数组，但是因为最后的 0，它就是 C 语言的字符串，可以使用字符串运算方法运算。

- 字符串是以 0（整数0）结尾的一串字符（一定要有 0），**0 或 `'\0'` **是一样的，但是和 `'0'` 不同

- 0 标志字符串的阶数，但不是字符串的一部分，计算长度不包含这个 0

- 字符串以**数组的形式**存在，以**数组或指针的形式访问**，我们可以用指针访问一个数组，也可以用数组的形式去访问指针所代表的那一片连续的地址空间（但字符串在内存当中的表达形式一定是数组）。更多是以指针的形式。

- `string.h` 里有很多处理字符串的函数

- 字符串变量：
  - `char *str = "Hello";`
  - `char word[] = "Hello";`
  - `char line[10] = "Hello";`

- 字符串常量：

  - "Hello"，会被编译器变成一个字符数组放到某处，这个数组的长度是 6，结尾还有表示结束的 0

- **总结：C 语言的字符串是以字符数组的形式存在的**

  - 不能用运算符对字符串做运算
  - 通过数组的方式可以遍历字符串
  - 唯一**特殊**的地方是字符串字面量可以用来初始化字符数组以及**标准库**提供了一系列字符串函数

- `char *s = "Hello, World!";`

  ![](http://ohjwan9tm.bkt.clouddn.com/video-zhedac-8.jpeg)

  - i 是一个很大的值，s 和 s2 是同一个地址。i 的地址在很大的地方，s 的地址在很小的地方。本地变量 i 和 s 所指的东西离得很远。

    ![](http://ohjwan9tm.bkt.clouddn.com/video-zhedac-9.jpeg)

    - i=0 是本地变量，Hello 在代码端，只读。

  - s 是一个指针，初始化为指向一个字符串常量

  - 由于这个常量所在的地方，实际上 s 是 `const char *s`，但由于历史原因，编译器接受不带 const 的写法

  - 但是试图对 s 所指的字符串做写入会导致严重的后果

  - 如果需要修改字符串，应该用数组：`char s[] = "Hello World!";`

  - 实际上，程序中既然有一个 helloword 了，编译器会把放在不可写的那段字符的内容拷贝到 s3 那里
    ![](http://ohjwan9tm.bkt.clouddn.com/video-zhedac-10.jpeg)

- 指针还是数组？

  - **作为数组**：这个字符串就在这里

    - 作为本地变量空间自动被回收

  - **作为指针**：它指向某个地方的字符串，但这个字符串不知道在哪里

    - 就是作为一个字符串，只读不写
    - 处理参数
    - 动态分配空间（空间用 malloc 得到）
  
  - **如果要构造一个字符串，用数组；如果要处理一个字符串，用指针**

- **字符串可以表达为 `char*` 的形式，`char* `不一定是字符串**
  - 本意是指向字符的指针，可能指向的是字符的数组（就像 `int*` 一样）
  - 只有它所指的字符串数组有结尾的 0，才能说它所指的是字符串

## 8.4 字符串计算

- 字符串赋值：实际是**指向**
  - `char *t = "title"; char *s; s = t;` 并没有产生新的字符串，只是让指针 s 指向了 t 所指的字符串，对 s 的操作就是对 t 做的
  - **%s**: `char string[8]; scanf("%s", string); printf("%s", string);`
  - **`scanf %s`** 读入一个单词，到**空格、tab 或回车**
  - `scanf` 是不安全的，因为不知道要读入的内容的长度
  - 在 % 和 s 之间的数字表示**最多允许读入的**字符的数量，这个数字应该比数组的大小**小一**，下面的内容会交给下一个 %s

- 常见错误：

  - 指针没有初始化
    - `char *string; scanf("%s", string);` 以为 `char*` 是字符串类型，定义了一个字符串类型的变量就可以使用了。实际上只是定义了一个指针变量，将来可能会指向某个内存空间的指针，在上面并没被初始化，没有初始值，所以它可能还指向某个地方，那里不是 0，如果正好往里面写东西，可能会报错。
    - 由于没有对 string 初始化为 0，所以**不一定**每次运行都出错。
  - 空字符串
    - `char buffer[100] = "";`， 此时：`buffer[0] == '\0'`
    - `char buffer[] = "";` 这个数组的长度只有 1

- strlen：部分内容来自进阶课程，在此处合并。 
  - 字符串长度，不包括结尾的 0

  - `size_t strlen(const char *s);`

    - 作为参数，数组和指针一样，所以这里用指针的形式表达

    - `const` 保证 strlen 不会修改字符串

- strcmp：部分内容来自进阶课程，在此处合并。

  - `int strcmp(const char *s1, const char *s2);`

  - 比较两个字符串，**不相等时，给出的是差值**

  - 相等时：`if (strcmp(s1, s2)==0)`，数组的比较永远是 false，因为永远不会是相同的地址，所以不能用 `s1==s2`

  - `'abc'-'abc '=-32;// 注意：第二个字符串后面有个空格，空格 ASCII 就是 32`

    ![](http://ohjwan9tm.bkt.clouddn.com/video-zhedac-11.jpeg)

  - mystrcmp

    ```C
      int mycmp1(const char* s1, const char* s2)
      {
      	int idx = 0;
      	while (s1[idx] == s2[idx] && s1[idx] != '\0') {
      		idx ++;
      	}
      	return s1[idx] - s2[idx];
      }
      
      int mycmp2(const char* s1, const char* s2)
      {
      	while (*s1 == *s2 && *s1 != '\0') {
      		s1 ++;
      		s2 ++;
      	}
      	return *s1 - *s2;
      }
    ```

- strcpy：部分内容来自进阶课程，在此处合并。

    - `char *strcpy(char *restrict dst, const char *restrict src);`

    - copy，把第二个字符串拷贝到第一个字符串所在的空间

    - restrict 表明 src 和 dst 不重叠（C99）

    - 返回 dst：为了能连起代码来

    - 经常用来**复制字符串**：

      - `char *dst = (char*)malloc(strlen(src)+1);`
      - `strcpy(dst, src);`

    - mystrcpy

      ```C
      char* mycpy1(char* dst, const char* src)
      {
      	int idx = 0;
      	while (src[idx] != '\0') { // while (src[idx])
      		dst[idx] = src[idx];
      		idx++;	
      	}
      	dst[idx] = src[idx]; // or '\0'
      	return dst;
      }
      
      char* mycpy2(char* dst, const char* src)
      {	
      	char* ret = dst;
      	while (*src) {
      		*dst++ = *src++;
      	}
      	*dst = '\0';
      	return ret;
      }
      
      char* mycpy3(char* dst, const char* src)
      {	
      	char* ret = dst;
      	while (*dst++ = *src++) 
      		;
      	*dst = '\0';
      	return ret;
      }
      ```

  - strcat：

    - 把 s2 拷贝到 s1 的后面，接成一个长的字符串
    - 返回 s1，s1 必须具有足够的空间

  - **strcpy 和 strcat 不安全，用 strncpy 和 strncat**

    - **n** 表示最多拷贝的 size；
    - `char * strncpy(char *restrict dst, const char *restrict src, size_t n);`
    - `char * strncat(char *restrict s1, const char *restrict s2, size_t n)`
    - 对于比较有：strncmp 表示**比较前 n 个** `int strncmp(const char *s1, const char *s2, size_t n);`，这个 n 不是为了安全，为了方便比较前 n 个。

  - strchr 字符串中从左边开始找字符；strrchr 从右边开始。部分内容来自进阶课程，在此处合并。

    - `char *strchr(const char *s, int c);`

    - `char *strrchr(const char *s, int c);`

    - 返回 NULL 表示没有找到，否则**返回一个指针指向你要找的字符**。

    - 如何寻找第二个？`strchr(p+1, 'l');`

      ```C
      int main(int argc, char const *argv[])
      {
      	char s[] = "Hello";
      	char *p = strchr(s, 'l');
      	// 第一段：获得 l 前面的
      	char c = *p;
      	*p = '\0';
          char *t1 = (char*)malloc(strlen(s)+1);
      	strcpy(t1, s); // 此时的 s 即为：he
          *p = c; // 把原来位置的东西给写回去
          printf("%s\n", t1);
          // 第二段：获得 l 后面的
      	char *t2 = (char*)malloc(strlen(p)+1);
      	strcpy(t2, p); // 将 p 所指的东西拷到 t，此时的 p 为 llo
          printf("%s\n", t2);
      	p = strchr(p+1, 'l'); // 获得第二个 l 之后的，此时的 p 为 lo
      	printf("%s\n", p); // llo，返回第一个 l 指向的指针，指向那个字符及后面的字符串
      	free(t1);
          free(t2);
          return 0;
      }
      ```

  - 字符串中查找字符串：

    - `char *strstr(const char *s1, const char *s2);`
    - `char *strcasestr(const char *s1, const char *s2); // 忽略大小写`

# 期中测验

1. `include` 是编译预处理指令，不是 C 语言的成分，即不是 C 语言的关键字。
2. `unsigned short sht = 0; sht--;` 执行后，sht 的结果为 `2^16-1`，short 在各种平台都是 16 位。
3. `while ( !e )` 等价于 `e==0`
4. `sizeof()` 是静态运算符，`sizeof(i++)`不会增加 i 的值。

# 期末考试

1. `scanf("%d%c%f", &op1, &op, &op2);` 输入什么后，op1 的值为 1，op 的值为 `*`，op2 的值为 2.0

   - A. `1 * 2.0`
   - B. `1 * 2.`
   - C. `1 *2.`
   - D. `1* 2`（√）没有空格遇到整数停下。

2. `while (!x&&!y)` 等价于 `!(x||y)`

3. `for(表达式 1;; 表达式 3)` 可以理解为 `for(表达式 1;1; 表达式 3)`

4. `char ch = -1; printf("%hhd\n", ch);` 输出结果为 -1

5. 给定原型 `void f(double dd);` 和如下变量定义：`double a;`，那个函数调用不能被编译：

   - A. `f(1u);`
   - B. `f(1);`
   - C. `f(a);`
   - D. `f(&a)`;（√）

6. `struct` 是无效的 C 语言变量名。

7. 以下代码的输出为：`3#Zhe#`

  ```c
   char s[]="Zhejiang";
   s[strlen(s)/2-1]=0;
   printf("%lu#%s#",strlen(s),s);
  ```

8. 以下代码的输出为：abcefhiklnqtw

   ```c
   char a[20]="cehiknqtw";
   char *s="fbla",*p;
   int i, j;
   for(p=s; *p; p++) {
      j=0;
      while (*p>=a[j] && a[j]!='\0') j++;
      for(i=strlen(a); i>=j; i--) a[i+1] = a[i];
      a[j]=*p;
   }
   printf("%s", a);
   ```

9. 以下代码的输出为：22

   ```c
   void swap( int *pa, int *pb ) 
   {
       int pt;
       pt = *pa, *pa = *pb, *pb = *pa;
   }
   int main(void)
   {    
       int x=1, y=2;
       swap(&x, &y);
       printf("%d%d", x, y);
   }
   ```


# 附录

[相关代码及练习](https://github.com/hscspring/Note_Coding/tree/master/Zheda-C)

