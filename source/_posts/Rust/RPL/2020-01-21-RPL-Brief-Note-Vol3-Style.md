---
title: The Rust Programming Language Brief Note (Vol3-Style)
date: 2019-12-03 12:00:00
categories: Coding
tags: [Rust]
---

<div class="toc"><ul class="toc-item"><li><span><a href="#13-Functional-Language-Features-Iterators-and-Closures" data-toc-modified-id="13-Functional-Language-Features-Iterators-and-Closures-1">13 Functional Language Features Iterators and Closures</a></span><ul class="toc-item"><li><span><a href="#13-1-Closures-Anonymous-Functions" data-toc-modified-id="13-1-Closures-Anonymous-Functions-1.1">13-1 Closures Anonymous Functions</a></span><ul class="toc-item"><li><span><a href="#13-1-1-Creating-an-Abstraction-of-Behavior-with-Closures" data-toc-modified-id="13-1-1-Creating-an-Abstraction-of-Behavior-with-Closures-1.1.1">13-1-1 Creating an Abstraction of Behavior with Closures</a></span></li><li><span><a href="#13-1-2-Closure-Type-Inference-and-Annotation" data-toc-modified-id="13-1-2-Closure-Type-Inference-and-Annotation-1.1.2">13-1-2 Closure Type Inference and Annotation</a></span></li><li><span><a href="#13-1-3-Storing-Closures-Using-Generic-Parameters-and-the-Fn-Traits" data-toc-modified-id="13-1-3-Storing-Closures-Using-Generic-Parameters-and-the-Fn-Traits-1.1.3">13-1-3 Storing Closures Using Generic Parameters and the <code>Fn</code> Traits</a></span></li><li><span><a href="#13-1-4-Limitations-of-the-Cacher-Implementation" data-toc-modified-id="13-1-4-Limitations-of-the-Cacher-Implementation-1.1.4">13-1-4 Limitations of the <code>Cacher</code> Implementation</a></span></li><li><span><a href="#13-1-5-Capturing-the-Environment-with-Closures" data-toc-modified-id="13-1-5-Capturing-the-Environment-with-Closures-1.1.5">13-1-5 Capturing the Environment with Closures</a></span></li></ul></li><li><span><a href="#13-2-Processing-a-Series-of-Items-with-Iterators" data-toc-modified-id="13-2-Processing-a-Series-of-Items-with-Iterators-1.2">13-2 Processing a Series of Items with Iterators</a></span><ul class="toc-item"><li><span><a href="#13-2-1-The-Iterator-Trait-and-the-Next-Method" data-toc-modified-id="13-2-1-The-Iterator-Trait-and-the-Next-Method-1.2.1">13-2-1 The <code>Iterator</code> Trait and the <code>Next</code> Method</a></span></li><li><span><a href="#13-2-2-Methods-that-Consume-the-Iterator" data-toc-modified-id="13-2-2-Methods-that-Consume-the-Iterator-1.2.2">13-2-2 Methods that Consume the Iterator</a></span></li><li><span><a href="#13-2-3-Methods-that-Produce-Other-Iterators" data-toc-modified-id="13-2-3-Methods-that-Produce-Other-Iterators-1.2.3">13-2-3 Methods that Produce Other Iterators</a></span></li><li><span><a href="#13-2-4-Using-Closures-that-Capture-Their-Environment" data-toc-modified-id="13-2-4-Using-Closures-that-Capture-Their-Environment-1.2.4">13-2-4 Using Closures that Capture Their Environment</a></span></li><li><span><a href="#13-2-5-Creating-Our-Own-Iterators-with-the-Iterator-Trait" data-toc-modified-id="13-2-5-Creating-Our-Own-Iterators-with-the-Iterator-Trait-1.2.5">13-2-5 Creating Our Own Iterators with the <code>Iterator</code> Trait</a></span><ul class="toc-item"><li><span><a href="#13-2-5-1-Using-Our-Counter-Iterator's-next-method" data-toc-modified-id="13-2-5-1-Using-Our-Counter-Iterator's-next-method-1.2.5.1">13-2-5-1 Using Our <code>Counter</code> Iterator's <code>next</code> method</a></span></li><li><span><a href="#13-2-5-2-Using-Other-Iterator-Trait-Methods" data-toc-modified-id="13-2-5-2-Using-Other-Iterator-Trait-Methods-1.2.5.2">13-2-5-2 Using Other <code>Iterator</code> Trait Methods</a></span></li></ul></li></ul></li><li><span><a href="#13-3-Improving-Our-IO-Project" data-toc-modified-id="13-3-Improving-Our-IO-Project-1.3">13-3 Improving Our IO Project</a></span><ul class="toc-item"><li><span><a href="#13-3-1-Removing-a-clone-Using-an-Iterator" data-toc-modified-id="13-3-1-Removing-a-clone-Using-an-Iterator-1.3.1">13-3-1 Removing a <code>clone</code> Using an Iterator</a></span><ul class="toc-item"><li><span><a href="#13-3-1-1-Using-the-Returned-Iterator-Directly" data-toc-modified-id="13-3-1-1-Using-the-Returned-Iterator-Directly-1.3.1.1">13-3-1-1 Using the Returned Iterator Directly</a></span></li><li><span><a href="#13-3-1-2-Using-Iterator-Trait-Methods-Instead-of-Indexing" data-toc-modified-id="13-3-1-2-Using-Iterator-Trait-Methods-Instead-of-Indexing-1.3.1.2">13-3-1-2 Using <code>Iterator</code> Trait Methods Instead of Indexing</a></span></li></ul></li><li><span><a href="#13-3-2-Making-Code-Clearer-with-Iterator-Adaptors" data-toc-modified-id="13-3-2-Making-Code-Clearer-with-Iterator-Adaptors-1.3.2">13-3-2 Making Code Clearer with Iterator Adaptors</a></span></li></ul></li><li><span><a href="#13.4-Comparing-Performance:-Loop-vs.-Iterators" data-toc-modified-id="13.4-Comparing-Performance:-Loop-vs.-Iterators-1.4">13.4 Comparing Performance: Loop vs. Iterators</a></span></li></ul></li><li><span><a href="#17-Object-Oriented-Programming-Features-of-Rust" data-toc-modified-id="17-Object-Oriented-Programming-Features-of-Rust-2">17 Object Oriented Programming Features of Rust</a></span><ul class="toc-item"><li><span><a href="#17-1-Characteristics-of-Object-Oriented-Languages" data-toc-modified-id="17-1-Characteristics-of-Object-Oriented-Languages-2.1">17-1 Characteristics of Object-Oriented Languages</a></span><ul class="toc-item"><li><span><a href="#17-1-1-Objects-Contain-Data-and-Behavior" data-toc-modified-id="17-1-1-Objects-Contain-Data-and-Behavior-2.1.1">17-1-1 Objects Contain Data and Behavior</a></span></li><li><span><a href="#17-1-2-Encapsulation-that-Hides-Implementation-Details" data-toc-modified-id="17-1-2-Encapsulation-that-Hides-Implementation-Details-2.1.2">17-1-2 Encapsulation that Hides Implementation Details</a></span></li><li><span><a href="#17-1-3-Inheritance-as-a-Type-System-and-as-Code-Sharing" data-toc-modified-id="17-1-3-Inheritance-as-a-Type-System-and-as-Code-Sharing-2.1.3">17-1-3 Inheritance as a Type System and as Code Sharing</a></span></li></ul></li><li><span><a href="#17-2-Using-Trait-Objects-That-Allows-for-Values-of-Different-Types" data-toc-modified-id="17-2-Using-Trait-Objects-That-Allows-for-Values-of-Different-Types-2.2">17-2 Using Trait Objects That Allows for Values of Different Types</a></span><ul class="toc-item"><li><span><a href="#17-2-1-Defining-a-Trait-for-Common-Behavior" data-toc-modified-id="17-2-1-Defining-a-Trait-for-Common-Behavior-2.2.1">17-2-1 Defining a Trait for Common Behavior</a></span></li><li><span><a href="#17-2-2-Implementing-the-Trait" data-toc-modified-id="17-2-2-Implementing-the-Trait-2.2.2">17-2-2 Implementing the Trait</a></span></li><li><span><a href="#17-2-3-Trait-Objects-Perform-Dynamic-Dispatch" data-toc-modified-id="17-2-3-Trait-Objects-Perform-Dynamic-Dispatch-2.2.3">17-2-3 Trait Objects Perform Dynamic Dispatch</a></span></li><li><span><a href="#17-2-4-Object-Safety-Is-Required-for-Trait-Objects" data-toc-modified-id="17-2-4-Object-Safety-Is-Required-for-Trait-Objects-2.2.4">17-2-4 Object Safety Is Required for Trait Objects</a></span></li></ul></li><li><span><a href="#17-3-Implementing-an-Object-Oriented-Design-Pattern" data-toc-modified-id="17-3-Implementing-an-Object-Oriented-Design-Pattern-2.3">17-3 Implementing an Object-Oriented Design Pattern</a></span><ul class="toc-item"><li><span><a href="#17-3-1-Defining-Post-and-Creating-a-New-Instance-in-the-Draft-State" data-toc-modified-id="17-3-1-Defining-Post-and-Creating-a-New-Instance-in-the-Draft-State-2.3.1">17-3-1 Defining <code>Post</code> and Creating a New Instance in the Draft State</a></span></li><li><span><a href="#17-3-2-Storing-the-Text-of-the-Post-Content" data-toc-modified-id="17-3-2-Storing-the-Text-of-the-Post-Content-2.3.2">17-3-2 Storing the Text of the Post Content</a></span></li><li><span><a href="#17-3-3-Ensuring-the-Content-of-a-Draft-Post-Is-Empty" data-toc-modified-id="17-3-3-Ensuring-the-Content-of-a-Draft-Post-Is-Empty-2.3.3">17-3-3 Ensuring the Content of a Draft Post Is Empty</a></span></li><li><span><a href="#17-3-4-Requesting-a-Review-of-the-Post-Changes-Its-State" data-toc-modified-id="17-3-4-Requesting-a-Review-of-the-Post-Changes-Its-State-2.3.4">17-3-4 Requesting a Review of the Post Changes Its State</a></span></li><li><span><a href="#17-3-5-Adding-the-approve-Method-that-Changes-the-Behavior-of-content" data-toc-modified-id="17-3-5-Adding-the-approve-Method-that-Changes-the-Behavior-of-content-2.3.5">17-3-5 Adding the <code>approve</code> Method that Changes the Behavior of <code>content</code></a></span></li><li><span><a href="#17-3-6-Trade-offs-of-the-State-Pattern" data-toc-modified-id="17-3-6-Trade-offs-of-the-State-Pattern-2.3.6">17-3-6 Trade-offs of the State Pattern</a></span><ul class="toc-item"><li><span><a href="#17-3-6-1-Encoding-States-and-Behavior-as-Types" data-toc-modified-id="17-3-6-1-Encoding-States-and-Behavior-as-Types-2.3.6.1">17-3-6-1 Encoding States and Behavior as Types</a></span></li><li><span><a href="#17-3-6-2-Implementing-Transitions-as-Transformations-into-Different-Types" data-toc-modified-id="17-3-6-2-Implementing-Transitions-as-Transformations-into-Different-Types-2.3.6.2">17-3-6-2 Implementing Transitions as Transformations into Different Types</a></span></li></ul></li></ul></li></ul></li></ul></div>

<!--more-->

## 13 Functional Language Features Iterators and Closures

### 13-1 Closures Anonymous Functions

Rust’s closures are anonymous functions you can save in a variable or pass as arguments to other functions. We want to define code in one place in our program, but only *execute* that code where we actually need the result. This is a use case for closures!

#### 13-1-1 Creating an Abstraction of Behavior with Closures

We can define a closure and store the *closure* in a variable rather than storing the result of the function call:

```rust
fn generate_workout(intensity: u32, random_number: u32) {
    // do not excute here
    let expensive_closure = |num| {
        println!("calculating slowly...");
        thread::sleep(Duration::from_secs(2));
        num
    };

    if intensity < 25 {
        println!(
            "Today, do {} pushups!",
            expensive_closure(intensity)
        );
        println!(
            "Next, do {} situps!",
            expensive_closure(intensity)
        );
    } else {
        if random_number == 3 {
            println!("Take a break today! Remember to stay hydrated!");
        } else {
            println!(
                "Today, run for {} minutes!",
                expensive_closure(intensity)
            );
        }
    }
}
```

Note that this `let` statement means `expensive_closure` contains the *definition* of an anonymous function, not the *resulting value* of calling the anonymous function. 

Now the expensive calculation is called in only one place, and we’re only executing that code where we need the results. 

However, we’re still calling the closure twice in the first `if` block, which will call the expensive code twice and make the user wait twice as long as they need to.

#### 13-1-2 Closure Type Inference and Annotation

Closures don’t require you to annotate the types of the parameters or the return value like `fn` functions do. Type annotations are required on functions because they’re part of an explicit interface exposed to your users.  Defining this interface rigidly is important for ensuring that everyone agrees on what types of values a function uses and returns. But closures aren’t used in an exposed interface like this: they’re stored in variables and used without naming them and exposing them to users of our library.

#### 13-1-3 Storing Closures Using Generic Parameters and the `Fn` Traits

For the problem (still calling the closure twice in the first `if` block) before, we can create a struct that will hold the closure and the resulting value of calling the closure. The struct will execute the closure only if we need the resulting value, and it will cache the resulting value so the rest of our code doesn’t have to be responsible for saving and reusing the result. You may know this pattern as *memoization* or *lazy evaluation*.

```rust
struct Cacher<T>
    where T: Fn(u32) -> u32
{
    calculation: T,
    value: Option<u32>,
}
```

The `Cacher` struct has a `calculation` field of the generic type `T`. The trait bounds on `T` specify that it’s a closure by using the `Fn` trait. Any closure we want to store in the `calculation` field must have one `u32` parameter (specified within the parentheses after `Fn`) and must return a `u32`(specified after the `->`).

The `value` field is of type `Option<u32>`. Before we execute the closure, `value` will be `None`. When code using a `Cacher` asks for the *result* of the closure, the `Cacher` will execute the closure at that time and store the result within a `Some` variant in the `value` field. Then if the code asks for the result of the closure again, instead of executing the closure again, the `Cacher` will return the result held in the `Some` variant.

```rust
impl<T> Cacher<T>
    where T: Fn(u32) -> u32
{
    fn new(calculation: T) -> Cacher<T> {
        Cacher {
            calculation,
            value: None,
        }
    }

    fn value(&mut self, arg: u32) -> u32 {
        match self.value {
            Some(v) => v,
            None => {
                let v = (self.calculation)(arg);
                self.value = Some(v);
                v
            },
        }
    }
}

fn generate_workout(intensity: u32, random_number: u32) {
    let mut expensive_result = Cacher::new(|num| {
        println!("calculating slowly...");
        thread::sleep(Duration::from_secs(2));
        num
    });

    if intensity < 25 {
        println!(
            "Today, do {} pushups!",
            expensive_result.value(intensity)
        );
        println!(
            "Next, do {} situps!",
            expensive_result.value(intensity)
        );
    } else {
        if random_number == 3 {
            println!("Take a break today! Remember to stay hydrated!");
        } else {
            println!(
                "Today, run for {} minutes!",
                expensive_result.value(intensity)
            );
        }
    }
}
```

Instead of saving the closure in a variable directly, we save a new instance of `Cacher` that holds the closure. Then, in each place we want the result, we call the `value` method on the `Cacher` instance. We can call the `value` method as many times as we want, or not call it at all, and the expensive calculation will be run a maximum of once.

#### 13-1-4 Limitations of the `Cacher` Implementation

The first problem is that a `Cacher` instance assumes it will always get the same value for the parameter `arg` to the `value` method. Try modifying `Cacher` to hold a hash map rather than a single value. The keys of the hash map will be the `arg` values that are passed in, and the values of the hash map will be the result of calling the closure on that key. Instead of looking at whether `self.value` directly has a `Some` or a `None` value, the `value` function will look up the `arg` in the hash map and return the value if it’s present. If it’s not present, the `Cacher` will call the closure and save the resulting value in the hash map associated with its `arg` value.

The second problem with the current `Cacher` implementation is that it only accepts closures that take one parameter of type `u32` and return a `u32`. We might want to cache the results of closures that take a string slice and return `usize` values, for example. To fix this issue, try introducing more generic parameters to increase the flexibility of the `Cacher` functionality.

#### 13-1-5 Capturing the Environment with Closures

Closures have an additional capability that functions don’t have: **they can capture their environment and access variables from the scope in which they’re defined.**

```rust
fn main() {
    let x = 4;

    let equal_to_x = |z| z == x;

    let y = 4;

    assert!(equal_to_x(y));
}

fn main() {
    let x = 4;
	// function
    fn equal_to_x(z: i32) -> bool { z == x }

    let y = 4;

    assert!(equal_to_x(y));
}
// can't capture dynamic environment in a fn item; use the || { ...} closure form instead
```

Closures can capture values from their environment in three ways, which directly map to the three ways a function can take a parameter: taking ownership, borrowing mutably, and borrowing immutably. These are encoded in the three `Fn` traits as follows:

- `FnOnce` consumes the variables it captures from its enclosing scope, known as the closure’s *environment*. To consume the captured variables, the closure must take ownership of these variables and move them into the closure when it is defined. The `Once` part of the name represents the fact that the closure can’t take ownership of the same variables more than once, so it can be called only once.
- `FnMut` can change the environment because it mutably borrows values.
- `Fn` borrows values from the environment immutably.

When you create a closure, Rust infers which trait to use based on how the closure uses the values from the environment. All closures implement `FnOnce` because they can all be called at least once. Closures that don’t move the captured variables also implement `FnMut`, and closures that don’t need mutable access to the captured variables also implement `Fn`. 

If you want to force the closure to take ownership of the values it uses in the environment, you can use the `move` keyword before the parameter list. This technique is mostly useful when passing a closure to a new thread to move the data so it’s owned by the new thread.

```rust
fn main() {
    let x = vec![1, 2, 3];

    let equal_to_x = move |z| z == x;

    println!("can't use x here: {:?}", x);

    let y = vec![1, 2, 3];

    assert!(equal_to_x(y));
}
```

The `x` value is moved into the closure when the closure is defined, because we added the `move` keyword. The closure then has ownership of `x`, and `main` isn’t allowed to use `x` anymore in the `println!` statement. Removing `println!` will fix this example.

Most of the time when specifying one of the `Fn` trait bounds, you can start with `Fn` and the compiler will tell you if you need `FnMut` or `FnOnce` based on what happens in the closure body.

### 13-2 Processing a Series of Items with Iterators

In Rust, iterators are *lazy*, meaning they have no effect until you call methods that consume the iterator to use it up. 

#### 13-2-1 The `Iterator` Trait and the `Next` Method

All iterators implement a trait named `Iterator` that is defined in the standard library.

```rust
trait Iterator {
    type Item;

    fn next(&mut self) -> Option<Self::Item>;

    // methods with default implementations elided
}
```

```rust
#[test]
fn iterator_demonstration() {
    let v1 = vec![1, 2, 3];

    let mut v1_iter = v1.iter();

    assert_eq!(v1_iter.next(), Some(&1));
    assert_eq!(v1_iter.next(), Some(&2));
    assert_eq!(v1_iter.next(), Some(&3));
    assert_eq!(v1_iter.next(), None);
}
```

Note that we needed to make `v1_iter` mutable: calling the `next` method on an iterator changes internal state that the iterator uses to keep track of where it is in the sequence. In other words, this code *consumes*, or uses up, the iterator. Each call to `next` eats up an item from the iterator. We didn’t need to make `v1_iter` mutable when we used a `for` loop because the loop took ownership of `v1_iter` and made it mutable behind the scenes.

Also note that the values we get from the calls to `next` are immutable references to the values in the vector. The `iter` method produces an iterator over immutable references. 

- If we want to create an iterator that takes ownership of `v1` and returns owned values, we can call `into_iter` instead of `iter`. 
- Similarly, if we want to iterate over mutable references, we can call `iter_mut` instead of `iter`.

#### 13-2-2 Methods that Consume the Iterator

```rust
#[test]
fn iterator_sum() {
    let v1 = vec![1, 2, 3];

    let v1_iter = v1.iter();

    let total: i32 = v1_iter.sum();

    assert_eq!(total, 6);
}
```

We aren’t allowed to use `v1_iter` after the call to `sum` because `sum` takes ownership of the iterator we call it on.

#### 13-2-3 Methods that Produce Other Iterators

Other methods defined on the `Iterator` trait, known as *iterator adaptors*, allow you to change iterators into different kinds of iterators. You can chain multiple calls to iterator adaptors to perform complex actions in a readable way. But because all iterators are lazy, you have to call one of the consuming adaptor methods to get results from calls to iterator adaptors.

```rust
let v1: Vec<i32> = vec![1, 2, 3];

v1.iter().map(|x| x + 1);
// warning: unused `std::iter::Map` which must be used: iterator adaptors are lazy and do nothing unless consumed
```

This code doesn’t do anything; the closure we’ve specified never gets called. The warning reminds us why: iterator adaptors are lazy, and we need to consume the iterator here.

```rust
let v1: Vec<i32> = vec![1, 2, 3];

let v2: Vec<_> = v1.iter().map(|x| x + 1).collect();

assert_eq!(v2, vec![2, 3, 4]);
// collect consumes the iterator and collects the resulting values into a collection data type.
```

Because `map` takes a closure, we can specify any operation we want to perform on each item. This is a great example of how closures let you customize some behavior while reusing the iteration behavior that the `Iterator` trait provides.

#### 13-2-4 Using Closures that Capture Their Environment

```rust
#[derive(PartialEq, Debug)]
struct Shoe {
    size: u32,
    style: String,
}

fn shoes_in_my_size(shoes: Vec<Shoe>, shoe_size: u32) -> Vec<Shoe> {
    // filter to adapt that iterator 
    shoes.into_iter()
        .filter(|s| s.size == shoe_size)
        .collect()
}

#[test]
fn filters_by_size() {
    let shoes = vec![
        Shoe { size: 10, style: String::from("sneaker") },
        Shoe { size: 13, style: String::from("sandal") },
        Shoe { size: 10, style: String::from("boot") },
    ];

    let in_my_size = shoes_in_my_size(shoes, 10);

    assert_eq!(
        in_my_size,
        vec![
            Shoe { size: 10, style: String::from("sneaker") },
            Shoe { size: 10, style: String::from("boot") },
        ]
    );
}
```

The closure captures the `shoe_size` parameter from the environment and compares the value with each shoe’s size, keeping only shoes of the size specified. 

#### 13-2-5 Creating Our Own Iterators with the `Iterator` Trait

You can create iterators that do anything you want by implementing the `Iterator` trait on your own types. As previously mentioned, the only method you’re required to provide a definition for is the `next` method. Once you’ve done that, you can use all other methods that have default implementations provided by the `Iterator` trait!

```rust
struct Counter {
    count: u32,
}

impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
}

impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        self.count += 1;

        if self.count < 6 {
            Some(self.count)
        } else {
            None
        }
    }
}
```

##### 13-2-5-1 Using Our `Counter` Iterator's `next` method

```rust
#[test]
fn calling_next_directly() {
    let mut counter = Counter::new();

    assert_eq!(counter.next(), Some(1));
    assert_eq!(counter.next(), Some(2));
    assert_eq!(counter.next(), Some(3));
    assert_eq!(counter.next(), Some(4));
    assert_eq!(counter.next(), Some(5));
    assert_eq!(counter.next(), None);
}
```

##### 13-2-5-2 Using Other `Iterator` Trait Methods

```rust
#[test]
fn using_other_iterator_trait_methods() {
    let sum: u32 = Counter::new().zip(Counter::new().skip(1))
                                 .map(|(a, b)| a * b)
                                 .filter(|x| x % 3 == 0)
                                 .sum();
    assert_eq!(18, sum);
}
```

Note that `zip` produces only four pairs; the theoretical fifth pair `(5, None)` is never produced because `zip` returns `None` when either of its input iterators return `None`.

### 13-3 Improving Our IO Project

#### 13-3-1 Removing a `clone` Using an Iterator

The IO project can be found [here](https://github.com/hscspring/Coding-Collections/tree/master/Rust/minigrep), `clone` is used to make the `Config` own the values.

Here we change the `new` function to take ownership of an iterator as its argument instead of borrowing a slice.

##### 13-3-1-1 Using the Returned Iterator Directly

```rust
// modify the src/main.rs
fn main() {
	let config = Config::new(env::args()).unwrap_or_else(|err| {
        eprintln!("Problem parsing arguments: {}", err);
        process::exit(1);
    }
}
```

The `env::args()` function returns an iterator! Rather than collecting the iterator values into a vector and then passing a slice to `Config::new`.

```rust
// update src/lib.rs
impl Config {
    pub fn new(mut args: std::env::Args) -> Result<Config, &'static str> {
        // --snip--
```

The standard library documentation for the `env::args` function shows that the type of the iterator it returns is `std::env::Args`. Because we’re taking ownership of `args` and we’ll be mutating `args` by iterating over it, we can add the `mut` keyword into the specification of the `args` parameter to make it mutable.

##### 13-3-1-2 Using `Iterator` Trait Methods Instead of Indexing

The standard library documentation also mentions that `std::env::Args` implements the `Iterator` trait, so we know we can call the `next` method on it!

```rust
impl Config {
	pub fn new(mut args: std::env::Args) -> Result<Config, &'static str> {
        // the first value in the return value of env::args is the name of the program.
    	args.next();
        let query = match args.next() {
        	Some(arg) => arg,
            None => return Err("Didn't get a query string"),
        };
        let filename = match args.next() {
        	Some(arg) => arg,
            None => return Err("Didn't get a file name"),
        };
        let case_sensitive = env::var("CASE_INSENSITIVE").is_err();
        Ok(Config {query, filename, case_sensitive})
    }
}
```

#### 13-3-2 Making Code Clearer with Iterator Adaptors

We can write the `search` code in a more concise way using iterator adaptor methods. Doing so also lets us avoid having a mutable intermediate `results` vector. The functional programming style prefers to minimize the amount of mutable state to make code clearer. Removing the mutable state might enable a future enhancement to make searching happen in parallel, because we wouldn’t have to manage concurrent access to the `results` vector. 

```rust
pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
	contents.lines()
    	.filter(|line| line.contains(query))
    	.collect()
}
```

### 13.4 Comparing Performance: Loop vs. Iterators

The iterator version was slightly faster! The point is this: iterators, although a high-level abstraction, get compiled down to roughly the same code as if you’d written the lower-level code yourself. Iterators are one of Rust’s *zero-cost abstractions*.

```rust
// another example
let buffer: &mut [i32];
let coefficients: [i64; 12];
let qlp_shift: i16;

for i in 12..buffer.len() {
    let prediction = coefficients.iter()
                                 .zip(&buffer[i - 12..i])
                                 .map(|(&c, &s)| c * s as i64)
                                 .sum::<i64>() >> qlp_shift;
    let delta = buffer[i];
    buffer[i] = prediction as i32 + delta;
}
```

There’s no loop at all corresponding to the iteration over the values in `coefficients`: Rust knows that there are 12 iterations, so it “unrolls” the loop. *Unrolling* is an optimization that removes the overhead of the loop controlling code and instead generates repetitive code for each iteration of the loop.

You can use iterators and closures without fear! They make code seem like it’s higher level but don’t impose a runtime performance penalty for doing so.


## 17 Object Oriented Programming Features of Rust

### 17-1 Characteristics of Object-Oriented Languages

#### 17-1-1 Objects Contain Data and Behavior

Rust is object oriented: structs and enums have data, and `impl` blocks provide methods on structs and enums.

#### 17-1-2 Encapsulation that Hides Implementation Details

Rust uses the `pub` keyword to decide which modules, types, functions, and methods in our code should be public, and by default everything else is private. 

```rust
pub struct AveragedCollection {
    list: Vec<i32>,
    average: f64,
}
```

The struct is marked `pub` so that other code can use it, but the fields within the struct remain private. 

This is important in this case because we want to ensure that whenever a value is added or removed from the list, the average is also updated. We do this by implementing `add`, `remove`, and `average` methods on the struct.

```rust
imple AveragedCollection {
	pub fn add(&mut self, value: i32) {
    	self.list.push(value);
        self.update_average();
    }
    
    pub fn remove(&mut self) -> Option<i32> {
    	let result = self.list.pop();
        match result {
        	Some(value) => {
            	self.update_average();
                Some(value);
            },
            None => None,
        }
    }
    
    pub fn average(&self) -> f64 {
    	self.average
    }
    
    pub fn update_average(&mut self) {
    	let total: i32 = self.list.iter().sum();
        self.average = total as f64 / self.list.len() as f64;
    }
}
```

The public methods `add`, `remove`, and `average` are the only ways to access or modify data in an instance of `AveragedCollection`. 

We leave the `list` and `average` fields private so there is no way for external code to add or remove items to the `list` field directly; otherwise, the `average` field might become out of sync when the `list` changes. The `average` method returns the value in the `average` field, allowing external code to read the `average` but not modify it.

#### 17-1-3 Inheritance as a Type System and as Code Sharing

If a language must have inheritance to be an object-oriented language, then Rust is not one. There is no way to define a struct that inherits the parent struct’s fields and method implementations. However you can use other solutions in Rust, depending on your reason for reaching for inheritance in the first place.

You choose inheritance for two main reasons. 

- One is for reuse of code: you can implement particular behavior for one type, and inheritance enables you to reuse that implementation for a different type. You can share Rust code using default trait method implementations instead.
- The other reason to use inheritance relates to the type system: to enable a child type to be used in the same places as the parent type. This is also called *polymorphism*, which means that you can substitute multiple objects for each other at runtime if they share certain characteristics. Rust instead uses generics to abstract over different possible types and trait bounds to impose constraints on what those types must provide. This is sometimes called *bounded parametric polymorphism*.

### 17-2 Using Trait Objects That Allows for Values of Different Types

We could define an enum that had variants to hold different types, so a vector could store different types of data in each cell.

The case: In a language with inheritance, we might define a class named `Component` that has a method named `draw` on it. The other classes, such as `Button`, `Image`, and `SelectBox`, would inherit from `Component` and thus inherit the `draw` method. They could each override the `draw` method to define their custom behavior, but the framework could treat all of the types as if they were `Component` instances and call `draw` on them. 

#### 17-2-1 Defining a Trait for Common Behavior

Trait objects *are* more like objects in other languages in the sense that they combine data and behavior. But trait objects differ from traditional objects in that we can’t add data to a trait object. 

```rust
pub trait Draw {
    fn draw(&self);
}
```

Next, this vector is of type `Box`, which is a trait object; it’s a stand-in for any type inside a `Box` that implements the `Draw` trait.

```rust
pub struct Screen {
	pub components: Vec<Box<dyn Draw>>,
}

impl Screen {
    pub fn run(&self) {
        for component in self.components.iter() {
            component.draw();
        }
    }
}
```

This works differently from defining a struct that uses a generic type parameter with trait bounds. **A generic type parameter can only be substituted with one concrete type at a time, whereas trait objects allow for multiple concrete types to fill in for the trait object at runtime.** For example, we could have defined the `Screen` struct using a generic type and a trait bound.

```rust
pub struct Screen<T: Draw> {
    pub components: Vec<T>,
}

impl<T> Screen<T>
    where T: Draw {
    pub fn run(&self) {
        for component in self.components.iter() {
            component.draw();
        }
    }
}
```

This restricts us to a `Screen` instance that has a list of components all of type `Button` or all of type `TextField`. If you’ll only ever have homogeneous collections, using generics and trait bounds is preferable because the definitions will be monomorphized at compile time to use the concrete types.

On the other hand, with the method using trait objects, one `Screen` instance can hold a `Vec` that contains a `Box<Button>` as well as a `Box<TextField>`. 

#### 17-2-2 Implementing the Trait

```rust
pub struct Button {
    pub width: u32,
    pub height: u32,
    pub label: String,
}

impl Draw for Button {
    fn draw(&self) {
        // code to actually draw a button
    }
}

use gui::Draw;

struct SelectBox {
    width: u32,
    height: u32,
    options: Vec<String>,
}

impl Draw for SelectBox {
    fn draw(&self) {
        // code to actually draw a select box
    }
}
```

Our library’s user can now write their `main` function to create a `Screen` instance. 

```rust
use gui::{Screen, Button};

fn main() {
    let screen = Screen {
        components: vec![
            Box::new(SelectBox {
                width: 75,
                height: 10,
                options: vec![
                    String::from("Yes"),
                    String::from("Maybe"),
                    String::from("No")
                ],
            }),
            Box::new(Button {
                width: 50,
                height: 10,
                label: String::from("OK"),
            }),
        ],
    };

    screen.run();
}
```

The code can be found [here](https://github.com/hscspring/Coding-Collections/tree/master/Rust/gui).

When we wrote the library, we didn’t know that someone might add the `SelectBox` type, but our `Screen` implementation was able to operate on the new type and draw it because `SelectBox` implements the `Draw` trait, which means it implements the `draw` method.

This concept—of being concerned only with the messages a value responds to rather than the value’s concrete type—is similar to the concept *duck typing* in dynamically typed languages: if it walks like a duck and quacks like a duck, then it must be a duck! In the implementation of `run` on `Screen`, `run` doesn’t need to know what the concrete type of each component is. It doesn’t check whether a component is an instance of a `Button` or a `SelectBox`, it just calls the `draw` method on the component. By specifying `Box` as the type of the values in the `components` vector, we’ve defined `Screen` to need values that we can call the `draw` method on.

The advantage of using trait objects and Rust’s type system to write code similar to code using duck typing is that we never have to check whether a value implements a particular method at runtime or worry about getting errors if a value doesn’t implement a method but we call it anyway. 

#### 17-2-3 Trait Objects Perform Dynamic Dispatch

When we use trait objects, Rust must use dynamic dispatch. 

- The compiler doesn’t know all the types that might be used with the code that is using trait objects, so it doesn’t know which method implemented on which type to call. 
- Instead, at runtime, Rust uses the pointers inside the trait object to know which method to call. There is a runtime cost when this lookup happens that doesn’t occur with static dispatch. 
- Dynamic dispatch also prevents the compiler from choosing to inline a method’s code, which in turn prevents some optimizations. 

#### 17-2-4 Object Safety Is Required for Trait Objects

You can only make *object-safe* traits into trait objects. A trait is object safe if all the methods defined in the trait have the following properties:

- The return type isn't `Self`
- There are no generic type parameters

Trait objects must be object safe because once you’ve used a trait object, Rust no longer knows the concrete type that’s implementing that trait. 

- If a trait method returns the concrete `Self` type, but a trait object forgets the exact type that `Self` is, there is no way the method can use the original concrete type. 
- The same is true of generic type parameters that are filled in with concrete type parameters when the trait is used: the concrete types become part of the type that implements the trait. When the type is forgotten through the use of a trait object, there is no way to know what types to fill in the generic type parameters with.

```rust
pub struct Screen {
    pub components: Vec<Box<dyn Clone>>,
}
// error[E0038]: the trait `std::clone::Clone` cannot be made into an object
```

This error means you can’t use this trait as a trait object in this way. 

### 17-3 Implementing an Object-Oriented Design Pattern

The *state pattern* is an object-oriented design pattern. The crux of the pattern is that a value has some internal state, which is represented by a set of *state objects*, and the value’s behavior changes based on the internal state. 

We’ll implement a blog post workflow in an incremental way. The blog’s final functionality will look like this:

1. A blog post starts as an empty draft.
2. When the draft is done, a review of the post is requested.
3. When the post is approved, it gets published.
4. Only published blog posts return content to print, so unapproved posts can’t accidentally be published.

```rust
use blog::Post;

fn main() {
    let mut post = Post::new();

    post.add_text("I ate a salad for lunch today");
    assert_eq!("", post.content());

    post.request_review();
    assert_eq!("", post.content());

    post.approve();
    assert_eq!("I ate a salad for lunch today", post.content());
}
```

Notice that the only type we’re interacting with from the crate is the `Post` type. 

- This type will use the state pattern and will hold a value that will be one of three state objects representing the various states a post can be in—draft, waiting for review, or published. 
- Changing from one state to another will be managed internally within the `Post` type. The states change in response to the methods called by our library’s users on the `Post` instance, but they don’t have to manage the state changes directly. 
- Also, users can’t make a mistake with the states, like publishing a post before it’s reviewed.

#### 17-3-1 Defining `Post` and Creating a New Instance in the Draft State

```rust
pub struct Post {
    state: Option<Box<dyn State>>,
    content: String,
}

impl Post {
    pub fn new() -> Post {
        Post {
            state: Some(Box::new(Draft {})),
            content: String::new(),
        }
    }
}

trait State {}

struct Draft {}

impl State for Draft {}
```

The `State` trait defines the behavior shared by different post states, and the `Draft`, `PendingReview`, and `Published` states will all implement the `State` trait. 

When we create a new `Post`, we set its `state` field to a `Some` value that holds a `Box`. This `Box` points to a new instance of the `Draft` struct. This ensures whenever we create a new instance of `Post`, it will start out as a draft. Because the `state` field of `Post` is private, there is no way to create a `Post` in any other state!

#### 17-3-2 Storing the Text of the Post Content

```rust
impl Post {
    // --snip--
    pub fn add_text(&mut self, text: &str) {
        self.content.push_str(text);
    }
}
```

This behavior doesn’t depend on the state the post is in, so it’s not part of the state pattern. 

#### 17-3-3 Ensuring the Content of a Draft Post Is Empty

```rust
impl Post {
    // --snip--
    pub fn content(&self) -> &str {
        ""
    }
}
```

Adding a placeholder implementation for the `content` method on `Post` that always returns an empty string slice.

#### 17-3-4 Requesting a Review of the Post Changes Its State

Add functionality to request a review of a post, which should change its state from `Draft` to `PendingReview`. 

```rust
impl Post {
    // --snip--
    pub fn request_review(&mut self) {
        if let Some(s) = self.state.take() {
            self.state = Some(s.request_review())
        }
    }
}

trait State {
    fn request_review(self: Box<Self>) -> Box<dyn State>;
}

struct Draft {}

impl State for Draft {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        Box::new(PendingReview {})
    }
}

struct PendingReview {}

impl State for PendingReview {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        self
    }
}
```

#### 17-3-5 Adding the `approve` Method that Changes the Behavior of `content`

It will set `state` to the value that the current state says it should have when that state is approved.

```rust
impl Post {
    // --snip--
    pub fn approve(&mut self) {
        if let Some(s) = self.state.take() {
            self.state = Some(s.approve())
        }
    }
}

trait State {
    fn request_review(self: Box<Self>) -> Box<dyn State>;
    fn approve(self: Box<Self>) -> Box<dyn State>;
}

struct Draft {}

impl State for Draft {
    // --snip--
    fn approve(self: Box<Self>) -> Box<dyn State> {
        self
    }
}

struct PendingReview {}

impl State for PendingReview {
    // --snip--
    fn approve(self: Box<Self>) -> Box<dyn State> {
        Box::new(Published {})
    }
}

struct Published {}

impl State for Published {
    fn request_review(self: Box<Self>) -> Box<dyn State> {
        self
    }

    fn approve(self: Box<Self>) -> Box<dyn State> {
        self
    }
}
```

Because the goal is to keep all these rules inside the structs that implement `State`, we call a `content` method on the value in `state` and pass the post instance (that is, `self`) as an argument. Then we return the value that is returned from using the `content` method on the `state` value.

```rust
impl Post {
    // --snip--
    pub fn content(&self) -> &str {
        self.state.as_ref().unwrap().content(self)
    }
    // --snip--
}
```

We call the `as_ref` method on the `Option` because we want a reference to the value inside the `Option` rather than ownership of the value. Because `state` is an `<Option>`, when we call `as_ref`, an `Option<&Box>` is returned. If we didn’t call `as_ref`, we would get an error because we can’t move `state` out of the borrowed `&self` of the function parameter.

We then call the `unwrap` method, which we know will never panic, because we know the methods on `Post` ensure that `state` will always contain a `Some` value when those methods are done. A `None` value is never possible, even though the compiler isn’t able to understand that.

At this point, when we call `content` on the `&Box`, deref coercion will take effect on the `&` and the `Box` so the `content` method will ultimately be called on the type that implements the `State` trait. That means we need to add `content` to the `State` trait definition.

```rust
trait State {
    // --snip--
    fn content<'a>(&self, post: &'a Post) -> &'a str {
        ""
    }
}

// --snip--
struct Published {}

impl State for Published {
    // --snip--
    fn content<'a>(&self, post: &'a Post) -> &'a str {
        &post.content
    }
}
```

We add a default implementation for the `content` method that returns an empty string slice. That means we don’t need to implement `content` on the `Draft` and `PendingReview` structs. The `Published` struct will override the `content` method and return the value in `post.content`.

Note that we need lifetime annotations on this method. We’re taking a reference to a `post` as an argument and returning a reference to part of that `post`, so the lifetime of the returned reference is related to the lifetime of the `post` argument.

The code can be found [here](https://github.com/hscspring/Coding-Collections/tree/master/Rust/blog).

#### 17-3-6 Trade-offs of the State Pattern

Rust is capable of implementing the object-oriented state pattern to encapsulate the different kinds of behavior a post should have in each state. The methods on `Post` know nothing about the various behaviors. 

If we were to create an alternative implementation that didn’t use the state pattern, we might instead use `match` expressions in the methods on `Post` or even in the `main` code that checks the state of the post and changes behavior in those places. That would mean we would have to look in several places to understand all the implications of a post being in the published state! This would only increase the more states we added: each of those `match` expressions would need another arm.

With the state pattern, the `Post` methods and the places we use `Post` don’t need `match` expressions, and to add a new state, we would only need to add a new struct and implement the trait methods on that one struct.

One downside of the state pattern is that, because the states implement the transitions between states, some of the states are coupled to each other.

Another downside is that we’ve duplicated some logic. To eliminate some of the duplication, we might try to make default implementations for the `request_review` and `approve` methods on the `State` trait that return `self`; however, this would violate object safety, because the trait doesn’t know what the concrete `self` will be exactly. We want to be able to use `State` as a trait object, so we need its methods to be object safe.

##### 17-3-6-1 Encoding States and Behavior as Types

Rather than encapsulating the states and transitions completely so outside code has no knowledge of them, we’ll encode the states into different types. Consequently, Rust’s type checking system will prevent attempts to use draft posts where only published posts are allowed by issuing a compiler error.

```rust
fn main() {
    let mut post = Post::new();

    post.add_text("I ate a salad for lunch today");
    assert_eq!("", post.content());
}
```

Instead of having a `content` method on a draft post that returns an empty string, we’ll make it so draft posts don’t have the `content` method at all. 

```rust
pub struct Post {
    content: String,
}

pub struct DraftPost {
    content: String,
}

impl Post {
    pub fn new() -> DraftPost {
        DraftPost {
            content: String::new(),
        }
    }

    pub fn content(&self) -> &str {
        &self.content
    }
}

impl DraftPost {
    pub fn add_text(&mut self, text: &str) {
        self.content.push_str(text);
    }
}
```

Now the program ensures all posts start as draft posts, and draft posts don’t have their content available for display. Any attempt to get around these constraints will result in a compiler error.

##### 17-3-6-2 Implementing Transitions as Transformations into Different Types

```rust
impl DraftPost {
    // --snip--

    pub fn request_review(self) -> PendingReviewPost {
        PendingReviewPost {
            content: self.content,
        }
    }
}

pub struct PendingReviewPost {
    content: String,
}

impl PendingReviewPost {
    pub fn approve(self) -> Post {
        Post {
            content: self.content,
        }
    }
}
```

The changes we needed to make to `main` to reassign `post` mean that this implementation doesn’t quite follow the object-oriented state pattern anymore: the transformations between the states are no longer encapsulated entirely within the `Post` implementation. However, our gain is that invalid states are now impossible because of the type system and the type checking that happens at compile time! 

```rust
use blog::Post;

fn main() {
    let mut post = Post::new();

    post.add_text("I ate a salad for lunch today");

    let post = post.request_review();

    let post = post.approve();

    assert_eq!("I ate a salad for lunch today", post.content());
}
```

The code can be found [here](https://github.com/hscspring/Coding-Collections/tree/master/Rust/blog2).

