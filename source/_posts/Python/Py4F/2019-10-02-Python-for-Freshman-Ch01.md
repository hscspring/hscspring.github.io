---
title: Python 小白快速从入门到放弃：基础知识
date: 2019-10-02 23:00:00
categories: Coding
tags: [Python]
---

当一句或一段代码运行时，Python 解释器将源代码转为字节码，然后进行词法、语法分析，检查是否有错，如果没有错误就编译并执行，然后将结果返回给。这个流程都由 Jupyter Notebook 自动完成。

<!--more-->

## 基本语法

```python
a = 1 # 整数
a = 1.1 # 小数 or 11/10
a = "1.1" # 字符串
a = True # 真假
print("hello", a) # 打印

a > b # <, >=, <= 也可以
a + b # -, *, /, //（整除）, **（开方）
a > b and a < c # or
```

可以看到非常直观。在 Python 中，只有一行 `print("something.")` 也可以看作是一个简单的程序。理论上你的任务都可以由这样一行一行的代码一步步执行下来的，实际上如果是简单任务你也可以这样做。

## 数据类型

```python
a = [] # list
a = set() # set
a = () # tuple
a = {} # dict
```

- list 里面可以放任意的变量，可以重复：`a = ['1', 1, x, 1]`
- set 里面的元素会自动去重：`a = set('1', 1, x, 1)` 实际上只有三个元素
- tuple 就是把几个元素放一起

- dict 是 key-value 对，value 可以为空：`a = {'x':1, 'y':2}`，key 不重复（重复会被覆盖），`a['x'] =1`

## 流程控制

**循环**

```python
# For 循环
# 循环一遍 a 中的各个元素
a = ['1', 1, a, 1]
for item in a:
    print(item) # '1', a, a, 1
a = {'x':1, 'y':2}
for key,value in a.items():
    print(key, value) # x 1, y 2
# 从 0-100
x = []
for i in range(1, 101):
    x.append(i) # 将元素挨个放到列表

# while 循环
y = 0
while y < 10:
    y = y+1 # y += 1
```

**条件**

```python
x = []
for i in range(1, 101):
    # 如果 i 除以 2 余数是 0，也就是偶数
    if i % 2 == 0:
        x.append(i)
    # 另一个条件
    elif i % 3 == 0:
        print(i)
    # else 这两行可以不写
    else:
        # continue 意思是继续下一个 i
        # 如果换成 break，就表示跳出循环，程序执行结束
        continue

y = 0
while y < 10:
    y += 1
    if y == 5:
        break
# 此时 y 就是 5
```

## 函数

简单理解，函数就是实现特定（一般是一个）功能的一组代码。

```python
# 一个求和的函数
def my_sum(a, b):
    return a+b

my_sum(1,2) # 执行这个函数，传入 1 和 2，返回 1+2，也就是 3
```

前面说一行一行代码语句按步骤执行下来也可以完成任务，但那样就非常不方便，很难复用而且别人看也很不清晰，有了函数就好很多。比如上面的例子，我们可以定义一个加法函数，这样在任何时候直接调用函数就可以了。当我们的任务变得复杂时，这样做的好处就更加明显。

如果涉及到更复杂的任务，比如我们设计一个用户点菜的场景（其实依然非常简单）：某用户打开菜单挑选菜品，如果是 VIP 价格显示 8 折；如果菜没了显示售罄，然后提交保存。最 Naive 的实现方式就是完全按业务流程一步步实现：

```python
IDENTITY = {
    "用户1": "VIP",
    "用户2": "VIP",
    "用户3": "VIP",
    "我": "NORMAL"
}
MENU = [
    {"name": "回锅肉", "price": 32, "sold_out": False},
    {"name": "红烧肉", "price": 35, "sold_out": True},
    {"name": "土豆丝", "price": 10, "sold_out": False},
    {"name": "水煮肉片", "price": 30, "sold_out": False},
    {"name": "鱼香肉丝", "price": 20, "sold_out": False}
]
def order(user):
    # 获取用户身份，如果是新用户默认 NORMAL
    identity = IDENTITY.get(user, "NORMAL")
    if identity == "VIP":
        for food in MENU:
            price = food['price'] * 0.8
            if not food['sold_out']:
                flag = '购买' # 空
            else:
                flag = '售罄'
            print(food['name'], price, flag)
    else:
        for food in MENU:
            price = food['price']
            if not food['sold_out']:
                flag = '购买'
            else:
                flag = '售罄'
            print(food['name'], price, flag)

# 按正常的价格打印            
order("我")
# 按 vip 的价格打印
order("用户1")
```

这样的程序可以执行，但很不灵活，比如增加了一个 VVIP 打 7 折，就需要修改方法；而且打折的比例也是写死在函数里面，很不方便更改，比如今天一个 69 折，明天一个 79 折，这就很麻烦。一般在面对需要判断，有重复代码时，可以考虑下是不是可以抽象。比如我们可以这样：

```python
def order(user, discount=1.0):
    identity = IDENTITY.get(user, "NORMAL")
    if identity == "VIP":
        print_order(discount)
    else:
        print_order(discount)

def print_order(discount):
    for food in MENU:
        price = food['price'] * discount
        if not food['sold_out']:
            flag = '购买'
        else:
            flag = '售罄'
        print(food['name'], price, flag)
 
# 按正常的价格打印
order("我")
# VIP 八折
order("用户1", 0.8)
```

这就是函数的最基本功能了，作为新手，我们不需要考虑太多设计模式相关的内容，只需要根据自己的直觉，将一些公共代码抽象出来即可。不过有两点需要强调：

- 函数尽量小一点，只做一件事
- 从业务角度思考代码实现

上面的实现虽然做了一些抽象，但从业务角度看其实还有问题，比如我事先并不知道某个用户是什么身份，那我怎么知道 discount 的比例；还有，如果多了个 VVIP，或者其他什么特殊的身份，又要修改代码，添加对应的身份判断。接下来，我们就从这些角度看看怎么优化。

根据身份判断 discount 的问题，我们可以通过维护一个 `{身份: discount}` 的字典就可以很好地完成了，此时我们判断的条件就不是用户的身份，而是不需要判断，直接拿到了 discount；如果多了个特殊身份，也只需要维护下这个字典即可：

```python
IDENTITY_DISCOUNT = {
    "VIP": 0.8,
    "VVIP": 0.7,
    "NORMAL": 1.0
}

def order(user):
    identity = IDENTITY.get(user, "NORMAL")
    discount = IDENTITY_DISCOUNT.get(identity)
    print_order(discount)

def print_order(discount):
    for food in MENU:
        price = food['price'] * discount
        if not food['sold_out']:
            flag = '购买'
        else:
            flag = '售罄'
        print(food['name'], price, flag)
 
# 按正常的价格打印
order("我")
# VIP 八折
order("用户1")
```

## 类

对于绝大多数任务，用函数就足够了（可以创建任意个数量的函数），准确来说，只用函数完全可以实现所有的功能，但有时候为了更好地代码维护和可扩展性，我们会使用类。提到类就不得不提面向对象编程了，它的基本思想是将业务抽象成一个一个对象，每个对象有属性和方法，属性一般是静态的，方法则是可执行的动作。对象是相比函数包含更加丰富的抽象。我们还用上面的例子：

```python
class User:
    # 静态属性
    def __init__(self, name):
        self.name = name
        self.identity = IDENTITY.get(name, "NORMAL")
    # 方法 => 用户可以下订单
    def order(self):
        discount = IDENTITY_DISCOUNT.get(self.identity)
        print_order(discount)
        
def print_order(discount):
    for food in MENU:
        price = food['price'] * discount
        if not food['sold_out']:
            flag = '购买'
        else:
            flag = '售罄'
        print(food['name'], price, flag)
        
User("我").order()
User("用户1").order()
```

`self` 是类的一个实例，每当我们执行 `me = User("我")` 时，就相当于创建了一个类的实例 `me`，就是这个类的一个具体的例子。`me` 有两个属性：`name, identity` 和一个方法 `order()`。

除了面向对象的编程外，还有一种非常流行的方式：函数式编程。它提供了另外一种解决问题的思路，我们简单地了解下。在这个世界里，没有类，函数是第一等公民。它们大量采用模式匹配、管道和递归，数据在整个过程中保持不可变性（只能创建新的值）。Python 也支持一些函数式操作，接下来我们就看看用这种方式怎么处理：

```python
def order(user):
    identity = IDENTITY.get(user, "NORMAL")
    discount = IDENTITY_DISCOUNT.get(identity)
    print_order(discount)
def print_order(discount):
    print(list(map(lambda food: (food['name'], food['price'] * discount, 
                                 "购买" if not food['sold_out'] else "售罄"), MENU)))

order("我")
order("用户1")
```

Python 支持的函数式方法比较少，如果使用通道结果看起来会更加直观，比如我们用 `elixir` 实现：

```elixir
defmodule UserOrder do
  def order(user) do
    identity = %{"用户1"=> "VIP", "用户2"=> "VIP", "用户3"=> "VIP", "我"=> "NORMAL"}
    
    identity_discount = %{"VIP" => 0.8, "VVIP" => 0.7, "NORMAL" => 1.0}

    menu = [
      %{:name => "回锅肉", :price => 32, :sold_out => false},
      %{:name=> "红烧肉", :price => 35, :sold_out => true},
      %{:name=> "土豆丝", :price => 10, :sold_out => false},
      %{:name=> "水煮肉片", :price => 30, :sold_out => false},
      %{:name=> "鱼香肉丝", :price => 20, :sold_out => false}]

    identity_discount
    |> Map.get(identity |> Map.get(user, "NORMAL"))
    |> print_order(menu)
  end

  def print_order(discount, menu) do
    menu
    |> Enum.reduce([], fn food, res ->
      item = {food.name, food.price * discount, get_flag(food.sold_out)}
      [item | res]
    end)
    |> IO.inspect()
  end
  
  # private function
  defp get_flag(sold_out) do
    case sold_out do
      true -> "售罄"
      false -> "购买"
    end
  end
end

UserOrder.order("我")
UserOrder.order("用户1")
```

代码看起来非常清爽直观。值得说明的是，代码并非越短越好，清晰性和可读性要重要的多。上面的 Elixir 代码和 Python 的函数式方法不需要彻底搞懂，只要大概知道意思即可。最后这里简单对 Python 的几个函数式方法举几个例子介绍下，毕竟属于 Python 的一部分。

```python
lst = [1,2,3]
tuplst = [("b", 2), ("a", 1), ("c", 3)]

############ 列表推导式 #############
[i*i for i in lst if i > 1] # => [4,9]

############ lambda #############
fun = lambda x: str(x) 
fun(1) # => "1"
sorted(tuplst, key=lambda x: x[1]) # => [('a', 1), ('b', 2), ('c', 3)]

############ map #############
list(map(str, lst)) # => ["1", "2", "3"]
list(map(lambda x: str(x), lst)) # => ["1", "2", "3"]

############ reduce #############
from functools import reduce
reduce((lambda x, y: x * y), lst) # => ((1*2)*3) = 6

############ filter #############
list(filter(lambda x: x > 1, [1,2,3])) # => [2,3]


# map 等价于下面的函数，其他的也类似。
def to_str(lst):
    res = []
    for i in lst:
        res.append(str(i))
    return res
```

同样的功能，不同人的观点不同，写出来的代码也不同；即使是同一个人，采用不同的思考方式写出来的代码也不一样。有的代码不仅冗长而且鲁棒性还差，很容易出错；而有的代码不仅简洁优雅鲁棒性好，而且还有很强的可扩展性。我想这可能就是编程的魅力所在吧。

## 脚本

Python 可以以脚本的形式运行，简单来说就是创建好一个 `py` 程序，将代码写进去然后在命令行通过 `python file_name.py` 来执行。比如我们创建一个 `order.py` 的文件，然后把刚刚的任意一段 Python 代码粘贴进去，在该文件的当前目录执行 `python order.py` 即可打印出想要的结果。需要注意的是，Python 没有 main 函数，所以单个文件运行时，文件名（`__name__`）就是 main，具体使用方法如下：

```python
class User:
    something
        
def print_order(discount):
    something

if __name__ == '__main__':
    User("我").order()
    User("用户1").order()
```

## 小结

本节主要介绍了 Python 的基本概念和基本使用，现在是自己动手的时候了。刚开始不需要追求一定要写得多好，先把你想要做的事情实现再说。只要长期坚持写，代码肯定会越写越好的；当有了一定基础后再去看各类书籍才会有茅塞顿开之感。记住，编程首先是个手艺活儿，然后才是个脑力活儿。Talk is cheap, show me the code. Just coding and have fun.

