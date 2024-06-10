---
title: Rust by Example Brief Note
date: 2020-02-02 20:00:00
categories: Coding
tags: [Rust]
---

## 1 Hello World

```bash
$ rustc hello.rs
```

### 1-1 Comments

- *Regular comments* which are ignored by the compiler:
    - `// Line comments which go to the end of the line.`
    - `/* Block comments which go to the closing delimiter. */`

- *Doc comments* which are parsed into HTML library [documentation](https://doc.rust-lang.org/stable/rust-by-example/meta/doc.html):
    - `/// Generate library docs for the following item.`
    - `//! Generate library docs for the enclosing item.`

### 1-2 Print

Printing is handled by a series of [`macros`](https://doc.rust-lang.org/stable/rust-by-example/macros.html) defined in [`std::fmt`](https://doc.rust-lang.org/std/fmt/) some of which include:

- `format!`: write formatted text to [`String`](https://doc.rust-lang.org/stable/rust-by-example/std/str.html)
- `print!`: same as `format!` but the text is printed to the console (io::stdout).
- `println!`: same as `print!` but a newline is appended.
- `eprint!`: same as `format!` but the text is printed to the standard error (io::stderr).
- `eprintln!`: same as `eprint!`but a newline is appended.

[`std::fmt`](https://doc.rust-lang.org/std/fmt/) contains many [`traits`](https://doc.rust-lang.org/stable/rust-by-example/trait.html) which govern the display of text. 

- `fmt::Debug`: Uses the `{:?}` marker. Format text for debugging purposes.
- `fmt::Display`: Uses the `{}` marker. Format text in a more elegant, user friendly fashion.

**Debug**

All types which want to use `std::fmt` formatting `traits` require an implementation to be printable.

*All* types can `derive` (automatically create) the `fmt::Debug` implementation. This is not true for `fmt::Display` which must be manually implemented.

So `fmt::Debug` definitely makes this printable but sacrifices some elegance. Rust also provides "pretty printing" with `{:#?}`.

**Display**

Any new *container* type which is *not* generic,`fmt::Display` can be implemented.

**Testcase: List**

`?` or `try!` can deal with all results:

```rust
write!(f, "{}", value)?;
try!(write!(f, "{}", value));
```

**Formatting**

This formatting functionality is implemented via traits, and there is one trait for each argument type. The most common formatting trait is `Display`, which handles cases where the argument type is left unspecified: `{}` for instance.

- `format!("{}", foo)` -> `"3735928559"`
- `format!("0x{:X}", foo)` -> [`"0xDEADBEEF"`](https://en.wikipedia.org/wiki/Deadbeef#Magic_debug_values)
- `format!("0o{:o}", foo)` -> `"0o33653337357"`

## 2 Primitives

**Scalar Types**

- signed integers: `i8`, `i16`, `i32`, `i64`, `i128` and `isize` (pointer size)
- unsigned integers: `u8`, `u16`, `u32`, `u64`, `u128` and `usize` (pointer size)
- floating point: `f32`, `f64`
- `char` Unicode scalar values like `'a'`, `'α'` and `'∞'` (4 bytes each)
- `bool` either `true` or `false`
- the unit type `()`, whose only possible value is an empty tuple: `()`

**Compound Types**

- arrays like `[1, 2, 3]`
- tuples like `(1, true)`

Variables can always be *type annotated*. Numbers may additionally be annotated via a *suffix* or *by default*. Integers default to `i32` and floats to `f64`. 

### 2-1 Literals and operators

Integer: `0x`, `0o` or `0b`, means 16, 8, 2

Underscores: `1_000` is `1000`, `0.000_001` is `0.000001`

We need to tell the compiler the type of the literals we use.

### 2-2 Tuples

A tuple is a collection of values of different types.

### 2-3 Arrays and Slices

An array is a collection of objects of the same type `T`, stored in contiguous memory. Their size, which is known at compile time, is part of their type signature `[T; size]`.

A slice is a two-word object, the first word is a pointer to the data, and the second word is the length of the slice. Slices can be used to borrow a section of an array, and have the type signature `&[T]`.

## 3 Custom Types

- `struct`: define a structure
- `enum`: define an enumeration

Constants can also be created via the `const` and `static` keywords.

### 3-1 Structures

Three types of structures:

- Tuple structs, which are, basically, named tuples.
- The classic [C structs](https://en.wikipedia.org/wiki/Struct_(C_programming_language))
- Unit structs, which are field-less, are useful for generics.

### 3-2 Enums

The `enum` keyword allows the creation of a type which may be one of a few different variants. Any variant which is valid as a `struct` is also valid as an `enum`.

**use**

The `use` declaration can be used so manual scoping isn't needed.

### 3-3 constants

Rust has two different types of constants which can be declared in any scope including global. Both require explicit type annotation:

- `const`: An unchangeable value (the common case).
- `static`: A possibly `mut`able variable with [`'static`](https://doc.rust-lang.org/stable/rust-by-example/scope/lifetime/static_lifetime.html) lifetime. The static lifetime is inferred and does not have to be specified. Accessing or modifying a mutable static variable is [`unsafe`](https://doc.rust-lang.org/stable/rust-by-example/unsafe.html).

## 4 Variable Bindings

Rust provides type safety via static typing. Variable bindings can be type annotated when declared.

Variable bindings are immutable by default. They have a scope, and are constrained to live in a *block*.

It's possible to declare variable bindings first, and initialize them later. However, this form is seldom used, as it may lead to the use of uninitialized variables.

## 5 Types

### 5-1 Casting

Rust provides no implicit type conversion (coercion) between primitive types. But, explicit type conversion (casting) can be performed using the `as` keyword.

### 5-2 Literals

Numeric literals can be type annotated by adding the type as a suffix. The type of unsuffixed numeric literals will depend on how they are used. If no constraint exists, the compiler will use `i32` for integers, and `f64` for floating-point numbers.

### 5-3 Aliasing

The `type` statement can be used to give a new name to an existing type. Types must have `CamelCase` names, or the compiler will raise a warning. 

The main use of aliases is to reduce boilerplate; for example the `IoResult` type is an alias for the `Result` type.

## 6 Conversion

Rust addresses conversion between types by the use of [traits](https://doc.rust-lang.org/stable/rust-by-example/trait.html). The generic conversions will use the [`From`](https://doc.rust-lang.org/std/convert/trait.From.html) and [`Into`](https://doc.rust-lang.org/std/convert/trait.Into.html) traits. However there are more specific ones for the more common cases, in particular when converting to and from `String`s.

### 6-1 From and Into

**From**

The [`From`](https://doc.rust-lang.org/std/convert/trait.From.html) trait allows for a type to define how to create itself from another type, hence providing a very simple mechanism for converting between several types. There are numerous implementations of this trait within the standard library for conversion of primitive and common types.

```rust
// str to String
let my_str = "hello";
let my_string = String::from(my_str);
```

**Into**

The [`Into`](https://doc.rust-lang.org/std/convert/trait.Into.html) trait is simply the reciprocal of the `From` trait. That is, if you have implemented the `From` trait for your type you get the `Into` implementation for free.

### 6-2 TryFrom and TryInto

Similar to [`From` and `Into`](https://doc.rust-lang.org/stable/rust-by-example/conversion/from_into.html), [`TryFrom`](https://doc.rust-lang.org/std/convert/trait.TryFrom.html) and [`TryInto`](https://doc.rust-lang.org/std/convert/trait.TryInto.html) are generic traits for converting between types. Unlike `From`/`Into`, the `TryFrom`/`TryInto` traits are used for fallible conversions, and as such, return [`Result`](https://doc.rust-lang.org/std/result/enum.Result.html)s.

### 6-3 To and from Strings

**Convert to String**

To convert any type to a `String` is as simple as implementing the [`ToString`](https://doc.rust-lang.org/std/string/trait.ToString.html) trait for the type. 

Rather than doing so directly, you should implement the [`fmt::Display`](https://doc.rust-lang.org/std/fmt/trait.Display.html) trait which automagically provides [`ToString`](https://doc.rust-lang.org/std/string/trait.ToString.html) and also allows printing the type.

**Parsing a String**

One of the more common types to convert a string into is a number. The idiomatic approach to this is to use the [`parse`](https://doc.rust-lang.org/std/primitive.str.html#method.parse) function and either to arrange for type inference or to specify the type to parse using the 'turbofish' syntax. 

## 7 Expressions

Blocks are expressions too, so they can be used as values in assignments. The last expression in the block will be assigned to the place expression such as a local variable. However, if the last expression of the block ends with a semicolon, the return value will be `()`.

## 8 Flow of Control

### 8-1 if-else

`if`-`else` conditionals are expressions, and, all branches must return the same type.

### 8-2 loop

A `loop` keyword to indicate an infinite loop.

**Nesting and Labels**

It's possible to `break` or `continue` outer loops when dealing with nested loops. In these cases, the loops must be annotated with some `'label`, and the label must be passed to the `break`/`continue` statement.

**Returning from loops**

One of the uses of a `loop` is to retry an operation until it succeeds. If the operation returns a value though, you might need to pass it to the rest of the code: put it after the `break`, and it will be returned by the `loop` expression.

### 8-3 for

The `for in` construct can be used to iterate through an `Iterator`. If not specified, the `for` loop will apply the `into_iter` function on the collection provided to convert the collection into an iterator. This is not the only means to convert a collection into an iterator however, the other functions available include `iter` and `iter_mut`.

- `iter` - This borrows each element of the collection through each iteration. 
- `into_iter` - This consumes the collection so that on each iteration the exact data is provided.
- `iter_mut` - This mutably borrows each element of the collection, allowing for the collection to be modified in place.

### 8-4 match

For pointers, a distinction needs to be made between destructuring and dereferencing as they are different concepts which are used differently from a language like `C`.

- Dereferencing uses `*`
- Destructuring uses `&`, `ref`, and `ref mut`

A `match` *guard* can be added to filter the arm.

`match` provides the `@` sigil for binding values to names.

### 8-5 ifwhile-let

- `if let` can be used to match any enum value
- `if let` allows to match enum non-parameterized variants, even if the enum doesn't `#[derive(PartialEq)]`, neither we implement `PartialEq` for it. In such case, classic `if Foo::Bar==a` fails, because instances of such enum are not comparable for equality. However, `if let` works.

## 9 Functions

Functions are declared using the `fn` keyword. Its arguments are type annotated, just like variables, and, if the function returns a value, the return type must be specified after an arrow `->`.

The final expression in the function will be used as return value. Alternatively, the `return` statement can be used to return a value earlier from within the function, even from inside loops or `if`s.

### 9-1 Methods

Methods are functions attached to objects. These methods have access to the data of the object and its other methods via the `self` keyword. Methods are defined under an `impl` block.

### 9-2 Closures

Closures in Rust, also called lambda expressions or lambdas, are functions that can capture the enclosing environment. Calling a closure is exactly like calling a function. However, both input and return types *can* be inferred and input variable names *must* be specified. Other characteristics of closures include:

- using `||` instead of `()` around input variables.
- optional body delimination (`{}`) for a single expression (mandatory otherwise).
- the ability to capture the outer environment variables.

#### 9-2-1 Capturing

Closures are inherently flexible and will do what the functionality requires to make the closure work without annotation. This allows capturing to flexibly adapt to the use case, sometimes moving and sometimes borrowing. Closures can capture variables:

- by reference: `&T`
- by mutable reference: `&mut T`
- by value: `T`

They preferentially capture variables by reference and only go lower when required. Using `move` before vertical pipes forces closure to take ownership of captured variables.

#### 9-2-2 As input parameters

When taking a closure as an input parameter, the closure's complete type must be annotated using one of a few `traits`. In order of decreasing restriction, they are:

- `Fn`: the closure captures by reference (`&T`)
- `FnMut`: the closure captures by mutable reference (`&mut T`)
- `FnOnce`: the closure captures by value (`T`)

On a variable-by-variable basis, the compiler will capture variables in the least restrictive manner possible.

#### 9-2-3 Type anonymity

Closures succinctly capture variables from enclosing scopes.

```rust
// `F` must be generic.
fn apply<F>(f: F) where
    F: FnOnce() {
    f();
}
```

When a closure is defined, the compiler implicitly creates a new anonymous structure to store the captured variables inside, meanwhile implementing the functionality via one of the `traits`: `Fn`, `FnMut`, or `FnOnce` for this unknown type. This type is assigned to the variable which is stored until calling.

Since this new type is of unknown type, any usage in a function will require generics. However, an unbounded type parameter `<T>` would still be ambiguous and not be allowed. Thus, bounding by one of the `traits`: `Fn`, `FnMut`, or `FnOnce` (which it implements) is sufficient to specify its type.

#### 9-2-4 Input Functions

If a function takes a closure as parameter, then any function that satisfies the trait bound of that closure can be passed as a parameter.

#### 9-2-5 As output parameters

Returning closures as output parameters is possible. However, anonymous closure types are, by definition, unknown, so we have to use `impl Trait` to return them. The valid traits for returning a closure are:

- `Fn`
- `FnMut`
- `FnOnce`

Beyond this, the `move` keyword must be used, which signals that all captures occur by value. This is required because any captures by reference would be dropped as soon as the function exited, leaving invalid references in the closure.

### 9-3 Higher Order Functions

Functions that take one or more functions and/or produce a more useful function. HOFs and lazy iterators give Rust its functional flavor.

### 9-4 Diverging functions

Diverging functions never return. They are marked using `!`, which is an empty type.

```rust
fn foo() -> ! {
    panic!("This call never returns.");
}

fn some_fn() {
    ()
}

fn main() {
    let a: () = some_fn();
    println!("This function returns and you can see this line.");
    
    let x: ! = panic!("This call never returns.");
    println!("You will never see this line!");
}
```

The main advantage of this type is that it can be cast to any other one and therefore used at places where an exact type is required, for instance in `match` branches. 

It is also the return type of functions that loop forever (e.g. `loop {}`) like network servers or functions that terminates the process (e.g. `exit()`).

## 10 Modules

A module is a collection of items: functions, structs, traits, `impl` blocks, and even other modules.

### 10-1 Visibility

By default, the items in a module have private visibility, but this can be overridden with the `pub` modifier. Only the public items of a module can be accessed from outside the module scope.

- `pub(in path)` only visible within the given path. `path` must be a parent or ancestor module
- `pub(self)` only visible within the current module, which is the same as leaving them private

- `pub(super)` only visible within the parent module

Private parent items will still restrict the visibility of a child item, even if it is declared as visible within a bigger scope.

### 10-2 Struct visibility

Structs have an extra level of visibility with their fields. The visibility defaults to private, and can be overridden with the `pub` modifier. This visibility only matters when a struct is accessed from outside the module where it is defined, and has the goal of hiding information (encapsulation).

### 10-3 The `use` Declaration

The `use` declaration can be used to bind a full path to a new name, for easier access.

```rust
// extern crate deeply; // normally, this would exist and not be commented out!

use crate::deeply::nested::{
    my_first_function,
    my_second_function,
    AndATraitType
};

fn main() {
    my_first_function();
}
```

### 10-4 `super` and `self`

The `super` and `self` keywords can be used in the path to remove ambiguity when accessing items and to prevent unnecessary hardcoding of paths.

### 10-5 File hierarchy

Modules can be mapped to a file/directory hierarchy.

## 11 Crates

If `some_file.rs` has `mod` declarations in it, then the contents of the module files would be inserted in places where `mod` declarations in the crate file are found, *before* running the compiler over it. In other words, modules do *not* get compiled individually, only crates get compiled.

A crate can be compiled into a binary or into a library. By default, `rustc` will produce a binary from a crate. This behavior can be overridden by passing the `--crate-type` flag to `rustc`.

### 11-1 Library

```bash
$ rustc --crate-type=lib rary.rs
$ ls lib*
# library.rlib
```

Libraries get prefixed with "lib", and by default they get named after their crate file, but this default name can be overridden using the [`crate_name` attribute](https://doc.rust-lang.org/stable/rust-by-example/attribute/crate.html).

### 11-2 `extern crate`

To link a crate to this new library, the `extern crate` declaration must be used. This will not only link the library, but also import all its items under a module named the same as the library. The visibility rules that apply to modules also apply to libraries.

```bash
# Where library.rlib is the path to the compiled library, assumed that it's
# in the same directory here:
$ rustc executable.rs --extern rary=library.rlib && ./executable
```

## 12 Cargo

`cargo` is the official Rust package management tool. 

- Dependency management and integration with [crates.io](https://crates.io/) (the official Rust package registry)
- Awareness of unit tests
- Awareness of benchmarks

### 12-1 Dependencies

Create a Rust project:

```bash
# A binary
cargo new foo

# OR A library
cargo new --lib foo
```

`Cargo.toml` config file:

```toml
[package]
name = "foo"
version = "0.1.0"
authors = ["mark"]

[dependencies]
clap = "2.27.1" # from crates.io
rand = { git = "https://github.com/rust-lang-nursery/rand" } # from online repo
bar = { path = "../bar" } # from a path in the local filesystem
```

`cargo` is more than a dependency manager. All of the available configuration options are listed in the [format specification](https://doc.rust-lang.org/cargo/reference/manifest.html) of `Cargo.toml`.

To build our project we can execute `cargo build` anywhere in the project directory (including subdirectories!). We can also do `cargo run` to build and run. (Note that it only rebuilds what it has not already built, similar to `make`).

### 12-2 Conventions

More binaries:

```bash
foo
├── Cargo.toml
└── src
    ├── main.rs
    └── bin
        └── my_other_bin.rs

$ cargo run --bin my_other_bin # or foo
```

All binaries should under `./bin/`.

### 12-3 Testing

Rust has first-class support for unit and integration testing. Organizationally, we can place unit tests in the modules they test and integration tests in their own `tests/` directory:

```bash
foo
├── Cargo.toml
├── src
│   └── main.rs
└── tests
    ├── my_test.rs
    └── my_other_test.rs

$ cargo test
$ cargo test [pattern]
```

Cargo may run multiple tests concurrently, so make sure that they don't race with each other.

### 12-4 Building scripts

```toml
[package]
...
build = "build.rs"
```

Cargo provides the script with inputs via environment variables [specified here](https://doc.rust-lang.org/cargo/reference/environment-variables.html#environment-variables-cargo-sets-for-build-scripts) that can be used. The script provides output via stdout. All lines printed are written to `target/debug/build//output`. 

## 13 Attributes

An attribute is metadata applied to some module, crate or item. This metadata can be used to/for:

- [conditional compilation of code](https://doc.rust-lang.org/stable/rust-by-example/attribute/cfg.html)
- [set crate name, version and type (binary or library)](https://doc.rust-lang.org/stable/rust-by-example/attribute/crate.html)
- disable [lints](https://en.wikipedia.org/wiki/Lint_(software)) (warnings)
- enable compiler features (macros, glob imports, etc.)
- link to a foreign library
- mark functions as unit tests
- mark functions that will be part of a benchmark

When attributes apply to a whole crate, their syntax is `#![crate_attribute]`, and when they apply to a module or item, the syntax is `#[item_attribute]` (notice the missing bang `!`).

Attributes can take arguments with different syntaxes:

- `#[attribute = "value"]`
- `#[attribute(key = "value")]`
- `#[attribute(value)]`

Attributes can have multiple values and can be separated over multiple lines, too:

```rust
#[attribute(value, value2)]


#[attribute(value, value2, value3,
            value4, value5)]
```

### 13-1 `dead_code`

The compiler provides a `dead_code` [*lint*](https://en.wikipedia.org/wiki/Lint_(software)) that will warn about unused functions.  `#[allow(dead_code)]` is an attribute that disables the `dead_code` lint.

### 13-2 Crates

The `crate_type` attribute can be used to tell the compiler whether a crate is a binary or a library (and even which type of library), and the `crate_name` attribute can be used to set the name of the crate.

However, it is important to note that both the `crate_type` and `crate_name` attributes have **no** effect whatsoever when using Cargo, the Rust package manager. Since Cargo is used for the majority of Rust projects, this means real-world uses of `crate_type` and `crate_name` are relatively limited.

```rust
// This crate is a library
#![crate_type = "lib"]
// The library is named "rary"
#![crate_name = "rary"]
```

No longer need to pass the `--crate-type` flag to `rustc`.

```bash
$ rustc lib.rs
```

### 13-3 `cfg`

Conditional compilation is possible through two different operators:

- the `cfg` attribute: `#[cfg(...)]` in attribute position
- the `cfg!` macro: `cfg!(...)` in boolean expressions

Custom conditionals must be passed to `rustc` using the `--cfg` flag.

```rust
#[cfg(some_condition)]
fn conditional_function() {
    println!("condition met!");
}

fn main() {
    conditional_function();
}
```

Run:

```bash
$ rustc --cfg some_condition custom.rs && ./custom
```

## 14 Generics

*Generics* is the topic of generalizing types and functionalities to broader cases. The simplest and most common use of generics is for type parameters. Generic type parameters" are typically represented as `<T>`.

In Rust, "generic" also describes anything that accepts one or more generic type parameters `<T>`. Any type specified as a generic type parameter is generic, and everything else is concrete (non-generic).

### 14-1 Functions

The same set of rules can be applied to functions: a type `T` becomes generic when preceded by `<T>`.

A function call with explicitly specified type parameters looks like: `fun::<A, B, ...>()`.

### 14-2 Implementation

Similar to functions, implementations require care to remain generic.

```rust
struct S;
struct GenericVal<T>(T);

// impl of GenericVal where we explicitly specify type parameters:
impl GenericVal<f32> {} // Specify `f32`
impl GenericVal<S> {} // Specify `S`

// `<T>` Must precede the type to remain generic
impl<T> GenericVal<T> {}
```

### 14-3 Traits

`trait`s can also be generic.

```rust
// A trait generic over `T`.
trait DoubleDrop<T> {
    // Define a method on the caller type which takes an
    // additional single parameter `T` and does nothing with it.
    fn double_drop(self, _: T);
}

// Implement `DoubleDrop<T>` for any generic parameter `T` and
// caller `U`.
impl<T, U> DoubleDrop<T> for U {
    // This method takes ownership of both passed arguments,
    // deallocating both.
    fn double_drop(self, _: T) {}
}
```

### 14-4 Bounds

When working with generics, the type parameters often must use traits as *bounds* to stipulate what functionality a type implements. 

```rust
// Define a function `printer` that takes a generic type `T` which
// must implement trait `Display`.
fn printer<T: Display>(t: T) {
    println!("{}", t);
}
```

Bounding restricts the generic to types that conform to the bounds. 

```rust
struct S<T: Display>(T);

// Error! `Vec<T>` does not implement `Display`. This
// specialization will fail.
let s = S(vec![1]);
```

Another effect of bounding is that generic instances are allowed to access the [methods](https://doc.rust-lang.org/stable/rust-by-example/fn/methods.html) of traits specified in the bounds. 

As an additional note, [`where`](https://doc.rust-lang.org/stable/rust-by-example/generics/where.html) clauses can also be used to apply bounds in some cases to be more expressive.

Even if a `trait` doesn't include any functionality, you can still use it as a bound.

### 14-5 Multiple bounds

Multiple bounds can be applied with a `+`. Like normal, different types are separated with `,`.

### 14-6 Where clauses

A bound can also be expressed using a `where` clause immediately before the opening `{`, rather than at the type's first mention. Additionally, `where` clauses can apply bounds to arbitrary types, rather than just to type parameters.

Some cases that a `where` clause is useful:

- When specifying generic types and bounds separately is clearer

    ```rust
    impl <A: TraitB + TraitC, D: TraitE + TraitF> MyTrait<A, D> for YourType {}
    
    // Expressing bounds with a `where` clause
    impl <A, D> MyTrait<A, D> for YourType where
        A: TraitB + TraitC,
        D: TraitE + TraitF {}
    ```

- When using a `where` clause is more expressive than using normal syntax

### 14-7 New Type Idiom

The `newtype` idiom gives compile time guarantees that the right type of value is supplied to a program.

### 14-8 Associated items

"Associated Items" refers to a set of rules pertaining to [`item`](https://doc.rust-lang.org/reference/items.html)s of various types. It is an extension to `trait` generics, and allows `trait`s to internally define new items.

A `trait` that is generic over its container type has type specification requirements - users of the `trait` *must* specify all of its generic types. The use of "Associated types" improves the overall readability of code by moving inner types locally into a trait as *output* types.

```rust
// `A` and `B` are defined in the trait via the `type` keyword.
// (Note: `type` in this context is different from `type` when used for
// aliases).
trait Contains {
    type A;
    type B;

    // Updated syntax to refer to these new types generically.
    fn contains(&self, &Self::A, &Self::B) -> bool;
}

// Without using associated types
fn difference<A, B, C>(container: &C) -> i32 where
    C: Contains<A, B> { ... }

// Using associated types
fn difference<C: Contains>(container: &C) -> i32 { ... }
```

### 14-9 Phantom type parameters

A phantom type parameter is one that doesn't show up at runtime, but is checked statically (and only) at compile time.

Data types can use extra generic type parameters to act as markers or to perform type checking at compile time. These extra parameters hold no storage values, and have no runtime behavior.

## 15 Scoping rules

### 15-1 RAll

Rust enforces [RAII](https://en.wikipedia.org/wiki/Resource_Acquisition_Is_Initialization) (Resource Acquisition Is Initialization), so whenever an object goes out of scope, its destructor is called and its owned resources are freed.

Double check for memory errors using [`valgrind`](http://valgrind.org/info/): `rustc raii.rs && valgrind ./raii`

The notion of a destructor in Rust is provided through the [`Drop`](https://doc.rust-lang.org/std/ops/trait.Drop.html) trait. This trait is not required to be implemented for every type, only implement it for your type if you require its own destructor logic.

### 15-2 Ownership and moves

Because variables are in charge of freeing their own resources, **resources can only have one owner**. 

When doing assignments (`let x = y`) or passing function arguments by value (`foo(x)`), the *ownership* of the resources is transferred. In Rust-speak, this is known as a *move*.

Mutability of data can be changed when ownership is transferred.

### 15-3 Borrowing

Most of the time, we'd like to access data without taking ownership over it. To accomplish this, Rust uses a *borrowing* mechanism. Instead of passing objects by value (`T`), objects can be passed by reference (`&T`).

The compiler statically guarantees (via its borrow checker) that references *always* point to valid objects. 

#### 15-3-1 Mutability

Mutable data can be mutably borrowed using `&mut T`. This is called a *mutable reference* and gives read/write access to the borrower. In contrast, `&T` borrows the data via an immutable reference, and the borrower can read the data but not modify it.

#### 15-3-2 Freezing

When data is immutably borrowed, it also *freezes*. *Frozen* data can't be modified via the original object until all references to it go out of scope.

#### 15-3-3 Aliasing

Data can be immutably borrowed any number of times, but while immutably borrowed, the original data can't be mutably borrowed. On the other hand, only *one* mutable borrow is allowed at a time. The original data can be borrowed again only *after* the mutable reference has been used for the last time.

#### 15-3-4 The ref pattern

When doing pattern matching or destructuring via the `let` binding, the `ref` keyword can be used to take references to the fields of a struct/tuple. 

### 15-4 Lifetimes

A *lifetime* is a construct the compiler (or more specifically, its *borrow checker*) uses to ensure all borrows are valid. No names or types are assigned to label lifetimes.

#### 15-4-1 Explicit annotation

The borrow checker uses explicit lifetime annotations to determine how long references should be valid. 

```rust
foo<'a>
// `foo` has a lifetime parameter `'a`
foo<'a, 'b>
// `foo` has lifetime parameters `'a` and `'b`
```

Use lifetimes requires generics, this lifetime syntax indicates that the lifetime of `foo` may not exceed that of `'a`. Explicit annotation of a type has the form `&'a T` where `'a` has already been introduced.

#### 15-4-2 Functions

Function signatures with lifetimes have a few constraints:

- any reference *must* have an annotated lifetime.
- any reference being returned *must* have the same lifetime as an input or be `static`.

Additionally, returning references without input is banned if it would result in returning references to invalid data.

#### 15-4-3 Bounds

- `T: 'a`: *All* references in `T` must outlive lifetime `'a`.

- `T: Trait + 'a`: Type `T` must implement trait `Trait` and *all* references in `T` must outlive `'a`.

#### 15-4-4 Static

A `'static` lifetime is the longest possible lifetime, and lasts for the lifetime of the running program. A `'static` lifetime may also be coerced to a shorter lifetime. There are two ways to make a variable with `'static` lifetime, and both are stored in the read-only memory of the binary:

- Make a constant with the `static` declaration.
- Make a `string` literal which has type: `&'static str`.

#### 15-4-5 Elision

Some lifetime patterns are overwhelmingly common and so the borrow checker will allow you to omit them to save typing and to improve readability. This is known as elision. Elision exists in Rust solely because these patterns are common.

## 16 Traits

A `trait` is a collection of methods defined for an unknown type: `Self`. They can access other methods declared in the same trait. Traits can be implemented for any data type. 

### 16-1 Derive

The compiler is capable of providing basic implementations for some traits via the `#[derive]` [attribute](https://doc.rust-lang.org/stable/rust-by-example/attribute.html). 

- Comparison traits: [`Eq`](https://doc.rust-lang.org/std/cmp/trait.Eq.html), [`PartialEq`](https://doc.rust-lang.org/std/cmp/trait.PartialEq.html), [`Ord`](https://doc.rust-lang.org/std/cmp/trait.Ord.html), [`PartialOrd`](https://doc.rust-lang.org/std/cmp/trait.PartialOrd.html).
- [`Clone`](https://doc.rust-lang.org/std/clone/trait.Clone.html), to create `T` from `&T` via a copy.
- [`Copy`](https://doc.rust-lang.org/core/marker/trait.Copy.html), to give a type 'copy semantics' instead of 'move semantics'.
- [`Hash`](https://doc.rust-lang.org/std/hash/trait.Hash.html), to compute a hash from `&T`.
- [`Default`](https://doc.rust-lang.org/std/default/trait.Default.html), to create an empty instance of a data type.
- [`Debug`](https://doc.rust-lang.org/std/fmt/trait.Debug.html), to format a value using the `{:?}` formatter.

### 16-2 Returning Traits with `dyn`

The Rust compiler needs to know how much space every function's return type requires. This means all your functions have to return a concrete type. A trait like `Animal` cannot return, because different implementations will need different amounts of memory.

However, there's an easy workaround. Instead of returning a trait object directly, our functions return a `Box` which *contains* some `Animal`. A `box` is just a reference to some memory in the heap.

### 16-3 Operator Overloading

In Rust, many of the operators can be overloaded via traits. For example, the `+` operator in `a + b` calls the `add` method (as in `a.add(b)`). This `add` method is part of the `Add` trait. Hence, the `+` operator can be used by any implementor of the `Add` trait.

### 16-4 Drop

The [`Drop`](https://doc.rust-lang.org/std/ops/trait.Drop.html) trait only has one method: `drop`, which is called automatically when an object goes out of scope. 

`Box`, `Vec`, `String`, `File`, and `Process` are some examples of types that implement the `Drop` trait to free resources. The `Drop` trait can also be manually implemented for any custom data type.

### 16-5 Iterators

The [`Iterator`](https://doc.rust-lang.org/core/iter/trait.Iterator.html) trait is used to implement iterators over collections such as arrays. The trait requires only a method to be defined for the `next` element, which may be manually defined in an `impl` block or automatically defined (as in arrays and ranges).

### 16-6 `impl Trait`

If your function returns a type that implements `MyTrait`, you can write its return type as `-> impl MyTrait`.

### 16-8 Supertrait

Rust doesn't have "inheritance", but you can define a trait as being a superset of another trait.

### 16-9 Disambiguating overlapping traits

A type can implement many different traits. Fully Qualified Syntax is used to disambiguate those methods.

## 17 macro_rules!

Macros look like functions, except that their name ends with a bang `!`, but instead of generating a function call, macros are expanded into source code that gets compiled with the rest of the program. However, unlike macros in C and other languages, Rust macros are expanded into abstract syntax trees, rather than string preprocessing, so you don't get unexpected precedence bugs.

1. Don't repeat yourself. There are many cases where you may need similar functionality in multiple places but with different types. Often, writing a macro is a useful way to avoid repeating code.
2. Domain-specific languages. Macros allow you to define special syntax for a specific purpose.
3. Variadic interfaces. Sometimes you want to define an interface that takes a variable number of arguments. An example is `println!` which could take any number of arguments, depending on the format string!.

### 17-1 Syntax

#### 17-1-1 Designators

The arguments of a macro are prefixed by a dollar sign `$` and type annotated with a *designator*. Some of the available designators:

- `block`
- `expr` is used for expressions
- `ident` is used for variable/function names
- `item`
- `literal` is used for literal constants
- `pat` (*pattern*)
- `path`
- `stmt` (*statement*)
- `tt` (*token tree*)
- `ty` (*type*)
- `vis` (*visibility qualifier*)

#### 17-1-2 Overload

Macros can be overloaded to accept different combinations of arguments. In that regard, `macro_rules!` can work similarly to a match block.

#### 17-1-3 Repeat

Macros can use `+` in the argument list to indicate that an argument may repeat at least once, or `*`, to indicate that the argument may repeat zero or more times.

## 18 Error handling

An explicit `panic` is mainly useful for tests and dealing with unrecoverable errors. For prototyping it can be useful, for example when dealing with functions that haven't been implemented yet, but in those cases the more descriptive `unimplemented` is better. In tests `panic` is a reasonable way to explicitly fail.

The `Option` type is for when a value is optional or when the lack of a value is not an error condition. For example the parent of a directory - `/` and `C:` don't have one. When dealing with `Option`s, `unwrap` is fine for prototyping and cases where it's absolutely certain that there is guaranteed to be a value. However `expect` is more useful since it lets you specify an error message in case something goes wrong anyway.

When there is a chance that things do go wrong and the caller has to deal with the problem, use `Result`. You can `unwrap` and `expect` them as well (please don't do that unless it's a test or quick prototype).

### 18-1 `panic`

It prints an error message, starts unwinding the stack, and usually exits the program. 

### 18-2 `Option` vs `unwrap`

#### 18-2-1 Unpacking options with `?`

You can unpack `Option`s by using `match` statements, but it's often easier to use the `?` operator. If `x` is an `Option`, then evaluating `x?` will return the underlying value if `x` is `Some`, otherwise it will terminate whatever function is being executed and return `None`.

#### 18-2-2 Combinators `map`

`match` is a valid method for handling `Option`s. However, you may eventually find heavy usage tedious, especially with operations only valid with an input. In these cases, [combinators](https://doc.rust-lang.org/book/glossary.html#combinators) can be used to manage control flow in a modular fashion.

#### 18-2-3 Combinators `and_then`

`map()` was described as a chainable way to simplify `match` statements. However, using `map()` on a function that returns an `Option` results in the nested `Option<Option<Food>>`. Chaining multiple calls together can then become confusing. `and_then()` calls its function input with the wrapped value and returns the result. If the `Option` is `None`, then it returns `None` instead.

### 18-3 `Result`

[`Result`](https://doc.rust-lang.org/std/result/enum.Result.html) is a richer version of the [`Option`](https://doc.rust-lang.org/std/option/enum.Option.html) type that describes possible *error* instead of possible *absence*.

- `Ok(T)`: An element `T` was found

- `Err(E)`: An error was found with element `E`

#### 18-3-1 `map` for `Result`

`Option`'s `map`, `and_then`, and many other combinators are also implemented for `Result`.

#### 18-3-2 aliases for `Result`

Errors found in a specific module often have the same `Err` type, so a single alias can succinctly define *all* associated `Results`. This is so useful that the `std` library even supplies one: [`io::Result`](https://doc.rust-lang.org/std/io/type.Result.html)!

#### 18-3-3 Early returns

We can simply stop executing the function and return the error if one occurs. For some, this form of code can be easier to both read and write.

#### 18-3-4 Introducing `?`

Sometimes we just want the simplicity of `unwrap` without the possibility of a `panic`. 

Upon finding an `Err`, there are two valid actions to take:

1. `panic!` which we already decided to try to avoid if possible
2. `return` because an `Err` means it cannot be handled

`?` is *almost*[1](https://doc.rust-lang.org/stable/rust-by-example/error/result/enter_question_mark.html#†) exactly equivalent to an `unwrap` which `return`s instead of `panic`king on `Err`s.

### 18-4 Multiple error types

Sometimes an `Option` needs to interact with a `Result`, or a `Result` needs to interact with a `Result`. 

#### 18-4-1 Pulling `Result`s out of `Option`s

The most basic way of handling mixed error types is to just embed them in each other.

There are times when we'll want to stop processing on errors (like with [`?`](https://doc.rust-lang.org/stable/rust-by-example/error/result/enter_question_mark.html)) but keep going when the `Option` is `None`. A couple of combinators come in handy to swap the `Result` and `Option`.

#### 18-4-2 Defining an error type

Sometimes it simplifies the code to mask all of the different errors with a single type of error. Rust allows us to define our own error types. In general, a "good" error type:

- Represents different errors with the same type
- Presents nice error messages to the user
- Is easy to compare with other types
    - Good: `Err(EmptyVec)`
    - Bad: `Err("Please use a vector with at least one element".to_owned())`
- Can hold information about the error
    - Good: `Err(BadChar(c, position))`
    - Bad: `Err("+ cannot be used here".to_owned())`
- Composes well with other errors

#### 18-4-3 `Box`ing errors

A way to write simple code while preserving the original errors is to [`Box`](https://doc.rust-lang.org/std/boxed/struct.Box.html) them. The drawback is that the underlying error type is only known at runtime and not [statically determined](https://doc.rust-lang.org/book/ch17-02-trait-objects.html#trait-objects-perform-dynamic-dispatch).

#### 18-4-4 Other uses of `?`

`?` was previously explained as either `unwrap` or `return Err(err)`. This is only mostly true. It actually means `unwrap` or `return Err(From::from(err))`. Since `From::from` is a conversion utility between different types, this means that if you `?` where the error is convertible to the return type, it will convert automatically.

#### 18-4-5 Wrapping errors

An alternative to boxing errors is to wrap them in your own error type.

### 18-5 Iterating over `Result`s

`filter_map` calls a function and filters out the results that are `None`.

`Result` implements `FromIter` so that a vector of results (`Vec>`) can be turned into a result with a vector (`Result, E>`). Once an `Result::Err` is found, the iteration will terminate. This same technique can be used with `Option`.

## 19 Std library types

- growable `String`s like: `"hello world"`
- growable vectors: `[1, 2, 3]`
- optional types: `Option`
- error handling types: `Result`
- heap allocated pointers: `Box`

### 19-1 Box stack and heap

All values in Rust are stack allocated by default. Values can be *boxed* (allocated on the heap) by creating a `Box`. A box is a smart pointer to a heap allocated value of type `T`. When a box goes out of scope, its destructor is called, the inner object is destroyed, and the memory on the heap is freed.

Boxed values can be dereferenced using the `*` operator; this removes one layer of indirection.

### 19-2 Vectors

Vectors are re-sizable arrays. Like slices, their size is not known at compile time, but they can grow or shrink at any time. A vector is represented using 3 parameters:

- pointer to the data
- length
- capacity

### 19-3 Strings

There are two types of strings in Rust: `String` and `&str`.

A `String` is stored as a vector of bytes (`Vec`), but guaranteed to always be a valid UTF-8 sequence. `String` is heap allocated, growable and not null terminated.

`&str` is a slice (`&[u8]`) that always points to a valid UTF-8 sequence, and can be used to view into a `String`, just like `&[T]` is a view into `Vec`.

### 19-4 Option

Sometimes it's desirable to catch the failure of some parts of a program instead of calling `panic!`. The `Option` enum has two variants:

- `None`, to indicate failure or lack of value
- `Some(value)`, a tuple struct that wraps a `value` with type `T`

### 19-5 Result

Sometimes it is important to express *why* an operation failed. The `Result` enum has two variants:

- `Ok(value)` which indicates that the operation succeeded, and wraps the `value` returned by the operation. (`value` has type `T`)
- `Err(why)`, which indicates that the operation failed, and wraps `why`, which (hopefully) explains the cause of the failure. (`why` has type `E`)

`?` is used at the end of an expression returning a `Result`, and is equivalent to a match expression, where the `Err(err)` branch expands to an early `Err(From::from(err))`, and the `Ok(ok)` branch expands to an `ok` expression.

### 19-6 `panic`

The `panic!` macro can be used to generate a panic and start unwinding its stack. While unwinding, the runtime will take care of freeing all the resources *owned* by the thread by calling the destructor of all its objects.

### 19-7 HashMap

Where vectors store values by an integer index, `HashMap`s store values by key. `HashMap` keys can be booleans, integers, strings, or any other type that implements the `Eq` and `Hash` traits.

Create a HashMap with a certain starting capacity using `HashMap::with_capacity(uint)`, or use `HashMap::new()` to get a HashMap with a default initial capacity (recommended).

Any type that implements the `Eq` and `Hash` traits can be a key in `HashMap`. This includes:

- `bool` (though not very useful since there is only two possible keys)
- `int`, `uint`, and all variations thereof
- `String` and `&str` (protip: you can have a `HashMap` keyed by `String` and call `.get()` with an `&str`)

All collection classes implement `Eq` and `Hash` if their contained type also respectively implements `Eq` and `Hash`. For example, `Vec` will implement `Hash` if `T` implements `Hash`.

You can easily implement `Eq` and `Hash` for a custom type with just one line: `#[derive(PartialEq, Eq, Hash)]`

Consider a `HashSet` as a `HashMap` where we just care about the keys ( `HashSet` is, in actuality, just a wrapper around `HashMap`). Sets have 4 primary operations (all of the following calls return an iterator):

- `union`: get all the unique elements in both sets.
- `difference`: get all the elements that are in the first set but not the second.
- `intersection`: get all the elements that are only in *both* sets.
- `symmetric_difference`: get all the elements that are in one set or the other, but *not* both

### 19-8 Rc

When multiple ownership is needed, `Rc`(Reference Counting) can be used. `Rc` keeps track of the number of the references which means the number of owners of the value wrapped inside an `Rc`.

Reference count of an `Rc` increases by 1 whenever an `Rc` is cloned, and decreases by 1 whenever one cloned `Rc` is dropped out of the scope. Cloning an `Rc` never do a deep copy. Cloning creates just another pointer to the wrapped value, and increments the count.

## 20 Std misc

### 20-1 Threads

The standard library provides great threading primitives out of the box. These, combined with Rust's concept of Ownership and aliasing rules, automatically prevent data races.

Although we're passing references across thread boundaries, Rust understands that we're only passing read-only references, and that thus no unsafety or data races can occur. Because we're `move`-ing the data segments into the thread, Rust will also ensure the data is kept alive until the threads exit, so no dangling pointers occur.

### 20-2 Channels

Channels allow a unidirectional flow of information between two end-points: the `Sender` and the `Receiver`.

### 20-3 Path

The `Path` struct represents file paths in the underlying filesystem. There are two flavors of `Path`: `posix::Path`, for UNIX-like systems, and `windows::Path`, for Windows. The prelude exports the appropriate platform-specific `Path` variant.

Note that a `Path` is *not* internally represented as an UTF-8 string, but instead is stored as a vector of bytes (`Vec`). Therefore, converting a `Path` to a `&str` is *not* free and may fail (an `Option` is returned).

### 20-4 File IO

The `File` struct represents a file that has been opened (it wraps a file descriptor), and gives read and/or write access to the underlying file. All the `File` methods return the `io::Result` type, which is an alias for `Result`.

The method `lines()` returns an iterator over the lines of a file. `File::open` expects a generic, `AsRef`. That's what `read_lines()` expects as input.

### 20-5 Child processes

The `process::Output` struct represents the output of a finished child process, and the `process::Command` struct is a process builder.

The `std::Child` struct represents a running child process, and exposes the `stdin`, `stdout` and `stderr` handles for interaction with the underlying process via pipes.

Wait for a `process::Child` to finish, you must call `Child::wait`, which will return a `process::ExitStatus`.

### 20-7 Program arguments

The command line arguments can be accessed using `std::env::args`, which returns an iterator that yields a `String` for each argument.Matching can be used to parse simple arguments.

### 20-8 Foreign Function Interface

Rust provides a Foreign Function Interface (FFI) to C libraries. Foreign functions must be declared inside an `extern` block annotated with a `#[link]` attribute containing the name of the foreign library.

## 21 Testing

### 21-1 Unit testing

Most unit tests go into a `tests` [mod](https://doc.rust-lang.org/stable/rust-by-example/mod.html) with the `#[cfg(test)]` [attribute](https://doc.rust-lang.org/stable/rust-by-example/attribute.html). Test functions are marked with the `#[test]` attribute.

Tests fail when something in the test function [panics](https://doc.rust-lang.org/stable/rust-by-example/std/panic.html). There are some helper [macros](https://doc.rust-lang.org/stable/rust-by-example/macros.html):

- `assert!(expression)` - panics if expression evaluates to `false`.
- `assert_eq!(left, right)` and `assert_ne!(left, right)` - testing left and right expressions for equality and inequality respectively.

In Rust 2018, your unit tests can return `Result<()>`, which lets you use `?` in them! 

To check functions that should panic under certain circumstances, use attribute `#[should_panic]`. This attribute accepts optional parameter `expected = `with the text of the panic message. If your function can panic in multiple ways, it helps make sure your test is testing the correct panic.

Tests can be marked with the `#[ignore]` attribute to exclude some tests. Or to run them with command `cargo test -- --ignored`

### 21-2 Documentation testing

The primary way of documenting a Rust project is through annotating the source code. Documentation comments are written in [markdown](https://daringfireball.net/projects/markdown/) and support code blocks in them. Rust takes care about correctness, so these code blocks are compiled and used as tests.

The main purpose of documentation tests is to serve as examples that exercise the functionality, which is one of the most important [guidelines](https://rust-lang-nursery.github.io/api-guidelines/documentation.html#examples-use--not-try-not-unwrap-c-question-mark). It allows using examples from docs as complete code snippets. But using `?` makes compilation fail since `main` returns `unit`. The ability to hide some source lines from documentation comes to the rescue: one may write `fn try_main() -> Result<(), ErrorType>`, hide it and `unwrap` it in hidden `main`.

### 21-3 Integration testing

[Unit tests](https://doc.rust-lang.org/stable/rust-by-example/testing/unit_testing.html) are testing one module in isolation at a time: they're small and can test private code. Integration tests are external to your crate and use only its public interface in the same way any other code would. Their purpose is to test that many parts of your library work correctly together.

### 21-4 Development dependencies

Sometimes there is a need to have dependencies for tests (examples, benchmarks) only. Such dependencies are added to `Cargo.toml` in the `[dev-dependencies]` section. These dependencies are not propagated to other packages which depend on this package.

## 22 Unsafe Operations

one should try to minimize the amount of unsafe code in a code base.

Unsafe annotations in Rust are used to bypass protections put in place by the compiler; specifically, there are four primary things that unsafe is used for:

- dereferencing raw pointers
- calling functions or methods which are `unsafe` (including calling a function over FFI)
- accessing or modifying static mutable variables
- implementing unsafe traits

**Raw Pointers**

Raw pointers `*` and references `&T` function similarly, but references are always safe because they are guaranteed to point to valid data due to the borrow checker. Dereferencing a raw pointer can only be done through an unsafe block.

**Calling Unsafe Functions**

Some functions can be declared as `unsafe`, meaning it is the programmer's responsibility to ensure correctness instead of the compiler's. One example of this is [`std::slice::from_raw_parts`](https://doc.rust-lang.org/std/slice/fn.from_raw_parts.html) which will create a slice given a pointer to the first element and a length.

## 23 Compatibility

### 23-1 Raw identifiers

Raw identifiers let you use keywords where they would not normally be allowed. This is particularly useful when Rust introduces new keywords, and a library using an older edition of Rust has a variable or function with the same name as a keyword introduced in a newer edition.

## 24 Meta

- Documentation: Generate library documentation for users via the included `rustdoc`.
- Testing: Create testsuites for libraries to give confidence that your library does exactly what it's supposed to.
- Benchmarking: Create benchmarks for functionality to be confident that they run quickly.

### 24-1 Documentation

Use `cargo doc` to build documentation in `target/doc`.

Use `cargo test` to run all tests (including documentation tests), and `cargo test --doc` to only run documentation tests.

These commands will appropriately invoke `rustdoc` (and `rustc`) as required.

**Doc comments**

Doc comments are very useful for big projects that require documentation. When running Rustdoc, these are the comments that get compiled into documentation. They are denoted by a `///`, and support [Markdown](https://en.wikipedia.org/wiki/Markdown).

To run the tests, first build the code as a library, then tell rustdoc where to find the library so it can link it into each doctest program.

