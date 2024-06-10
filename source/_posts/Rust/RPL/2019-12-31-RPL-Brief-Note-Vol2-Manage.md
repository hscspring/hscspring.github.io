---
title: The Rust Programming Language Brief Note (Vol2-Manage)
date: 2019-12-31 12:00:00
categories: Coding
tags: [Rust]
---

<div class="toc"><ul class="toc-item"><li><span><a href="#7-Managing-Growing-Projects-with-Packages-Crates-and-Modules" data-toc-modified-id="7-Managing-Growing-Projects-with-Packages-Crates-and-Modules-1">7 Managing Growing Projects with Packages Crates and Modules</a></span><ul class="toc-item"><li><span><a href="#7-1-Packages-and-Crates" data-toc-modified-id="7-1-Packages-and-Crates-1.1">7-1 Packages and Crates</a></span></li><li><span><a href="#72-Defining-Modules-to-Control-Scope-and-Privacy" data-toc-modified-id="72-Defining-Modules-to-Control-Scope-and-Privacy-1.2">72 Defining Modules to Control Scope and Privacy</a></span></li><li><span><a href="#7-3-Paths-for-Referring-to-an-Item-in-the-Module-Tree" data-toc-modified-id="7-3-Paths-for-Referring-to-an-Item-in-the-Module-Tree-1.3">7-3 Paths for Referring to an Item in the Module Tree</a></span><ul class="toc-item"><li><span><a href="#7-3-1-Modules-as-the-Privacy-Boundary" data-toc-modified-id="7-3-1-Modules-as-the-Privacy-Boundary-1.3.1">7-3-1 Modules as the Privacy Boundary</a></span></li><li><span><a href="#7-3-2-Exposing-Paths-with-the-pub-Keyword" data-toc-modified-id="7-3-2-Exposing-Paths-with-the-pub-Keyword-1.3.2">7-3-2 Exposing Paths with the <code>pub</code> Keyword</a></span></li><li><span><a href="#7-3-3-Starting-Relative-Paths-with-super" data-toc-modified-id="7-3-3-Starting-Relative-Paths-with-super-1.3.3">7-3-3 Starting Relative Paths with <code>super</code></a></span></li><li><span><a href="#7-3-4-Making-Structs-and-Enums-Public" data-toc-modified-id="7-3-4-Making-Structs-and-Enums-Public-1.3.4">7-3-4 Making Structs and Enums Public</a></span></li></ul></li><li><span><a href="#7-4-Bringing-Paths-into-Scope-with-the-use-Keyword" data-toc-modified-id="7-4-Bringing-Paths-into-Scope-with-the-use-Keyword-1.4">7-4 Bringing Paths into Scope with the <code>use</code> Keyword</a></span><ul class="toc-item"><li><span><a href="#7-4-1-Creating-Idiomatic-use-Paths" data-toc-modified-id="7-4-1-Creating-Idiomatic-use-Paths-1.4.1">7-4-1 Creating Idiomatic <code>use</code> Paths</a></span></li><li><span><a href="#7-4-2-Providing-New-Names-with-the-as-Keyword" data-toc-modified-id="7-4-2-Providing-New-Names-with-the-as-Keyword-1.4.2">7-4-2 Providing New Names with the <code>as</code> Keyword</a></span></li><li><span><a href="#7-4-3-Re-exporting-Names-with-pub-use" data-toc-modified-id="7-4-3-Re-exporting-Names-with-pub-use-1.4.3">7-4-3 Re-exporting Names with <code>pub use</code></a></span></li><li><span><a href="#7-4-4-Using-External-Package" data-toc-modified-id="7-4-4-Using-External-Package-1.4.4">7-4-4 Using External Package</a></span></li><li><span><a href="#7-4-5-Nested-Paths-for-Cleaning-Up-Large-use-Lists" data-toc-modified-id="7-4-5-Nested-Paths-for-Cleaning-Up-Large-use-Lists-1.4.5">7-4-5 Nested Paths for Cleaning Up Large <code>use</code> Lists</a></span></li><li><span><a href="#7-4-6-The-Glob-Operator" data-toc-modified-id="7-4-6-The-Glob-Operator-1.4.6">7-4-6 The Glob Operator</a></span></li></ul></li><li><span><a href="#7-5-Separating-Modules-into-Different-Files" data-toc-modified-id="7-5-Separating-Modules-into-Different-Files-1.5">7-5 Separating Modules into Different Files</a></span></li></ul></li><li><span><a href="#14-More-About-Cargo-and-Crates-io" data-toc-modified-id="14-More-About-Cargo-and-Crates-io-2">14 More About Cargo and Crates io</a></span><ul class="toc-item"><li><span><a href="#14-1-Customizing-Builds-with-Release-Profiles" data-toc-modified-id="14-1-Customizing-Builds-with-Release-Profiles-2.1">14-1 Customizing Builds with Release Profiles</a></span></li><li><span><a href="#14-2-Publishing-a-Crate-to-Crates-io" data-toc-modified-id="14-2-Publishing-a-Crate-to-Crates-io-2.2">14-2 Publishing a Crate to Crates io</a></span><ul class="toc-item"><li><span><a href="#14-2-1-Making-Useful-Documentation-Comments" data-toc-modified-id="14-2-1-Making-Useful-Documentation-Comments-2.2.1">14-2-1 Making Useful Documentation Comments</a></span><ul class="toc-item"><li><span><a href="#14-2-1-1-Commonly-Used-Sections" data-toc-modified-id="14-2-1-1-Commonly-Used-Sections-2.2.1.1">14-2-1-1 Commonly Used Sections</a></span></li><li><span><a href="#14-2-1-2-Documentation-Comments-as-Tests" data-toc-modified-id="14-2-1-2-Documentation-Comments-as-Tests-2.2.1.2">14-2-1-2 Documentation Comments as Tests</a></span></li><li><span><a href="#14-2-1-3-Commenting-Contained-Items" data-toc-modified-id="14-2-1-3-Commenting-Contained-Items-2.2.1.3">14-2-1-3 Commenting Contained Items</a></span></li></ul></li><li><span><a href="#14-2-2-Exporting-a-Convenient-Public-API-with-pub-use" data-toc-modified-id="14-2-2-Exporting-a-Convenient-Public-API-with-pub-use-2.2.2">14-2-2 Exporting a Convenient Public API with <code>pub use</code></a></span></li><li><span><a href="#14-2-3-Setting-Up-a-Crates-io-Account" data-toc-modified-id="14-2-3-Setting-Up-a-Crates-io-Account-2.2.3">14-2-3 Setting Up a Crates io Account</a></span></li><li><span><a href="#14-2-4-Adding-Metadata-to-a-New-Crate" data-toc-modified-id="14-2-4-Adding-Metadata-to-a-New-Crate-2.2.4">14-2-4 Adding Metadata to a New Crate</a></span></li><li><span><a href="#14-2-5-Publishing-to-Crates-io" data-toc-modified-id="14-2-5-Publishing-to-Crates-io-2.2.5">14-2-5 Publishing to Crates io</a></span></li><li><span><a href="#14-2-6-Publishing-a-New-Version-of-an-Existing-Crate" data-toc-modified-id="14-2-6-Publishing-a-New-Version-of-an-Existing-Crate-2.2.6">14-2-6 Publishing a New Version of an Existing Crate</a></span></li><li><span><a href="#14-2-7-Removing-Versions-from-Crates.io-with-cargo-yank" data-toc-modified-id="14-2-7-Removing-Versions-from-Crates.io-with-cargo-yank-2.2.7">14-2-7 Removing Versions from Crates.io with <code>cargo yank</code></a></span></li></ul></li><li><span><a href="#14-3-Cargo-Workspaces" data-toc-modified-id="14-3-Cargo-Workspaces-2.3">14-3 Cargo Workspaces</a></span><ul class="toc-item"><li><span><a href="#14.3.1-Creating-a-Workspace" data-toc-modified-id="14.3.1-Creating-a-Workspace-2.3.1">14.3.1 Creating a Workspace</a></span></li><li><span><a href="#14-3-2-Creating-the-Second-Crate-in-the-Workspace" data-toc-modified-id="14-3-2-Creating-the-Second-Crate-in-the-Workspace-2.3.2">14-3-2 Creating the Second Crate in the Workspace</a></span><ul class="toc-item"><li><span><a href="#14-3-2-1-Depending-on-an-External-Crate-in-a-Workspace" data-toc-modified-id="14-3-2-1-Depending-on-an-External-Crate-in-a-Workspace-2.3.2.1">14-3-2-1 Depending on an External Crate in a Workspace</a></span></li><li><span><a href="#14-3-2-2-Adding-a-Test-to-a-Workspace" data-toc-modified-id="14-3-2-2-Adding-a-Test-to-a-Workspace-2.3.2.2">14-3-2-2 Adding a Test to a Workspace</a></span></li></ul></li></ul></li><li><span><a href="#14-4-Installing-Binaries-from-Crates-io-with-cargo-install" data-toc-modified-id="14-4-Installing-Binaries-from-Crates-io-with-cargo-install-2.4">14-4 Installing Binaries from Crates io with <code>cargo install</code></a></span></li><li><span><a href="#14-5-Extending-Cargo-with-Custom-Commands" data-toc-modified-id="14-5-Extending-Cargo-with-Custom-Commands-2.5">14-5 Extending Cargo with Custom Commands</a></span></li></ul></li></ul></div>
## 7 Managing Growing Projects with Packages Crates and Modules

In addition to grouping functionality, encapsulating implementation details lets you reuse code at a higher level: once you’ve implemented an operation, other code can call that code via the code’s public interface without knowing how the implementation works. The way you write code defines which parts are public for other code to use and which parts are private implementation details that you reserve the right to change. This is another way to limit the amount of detail you have to keep in your head.

- **Packages:** A Cargo feature that lets you build, test, and share crates
- **Crates:** A tree of modules that produces a library or executable
- **Modules** and **use:** Let you control the organization, scope, and privacy of paths
- **Paths:** A way of naming an item, such as a struct, function, or module

<!--more-->

### 7-1 Packages and Crates

- A *crate* is a binary or library.
- The *crate root* is a source file that is used to know how to build a crate.
- A *package* is one or more crates that provide a set of functionality. A package contains a *Cargo.toml* file that describes how to build those crates. 
- A package *must* contain zero or one library crates, and no more. It can contain as many binary crates as you’d like, but it must contain at least one crate (either library or binary).

Cargo’s conventions are that if you have a *src* directory containing *main.rs* in the same directory as a package’s *Cargo.toml*, Cargo knows this package contains a binary crate with the same name as the package, and *src/main.rs* is its crate root. Another convention of Cargo’s is that if the package directory contains *src/lib.rs*, the package contains a library crate with the same name as the package, and *src/lib.rs* is its crate root. 

If a package contains both *src/main.rs* and *src/lib.rs*, then it has two crates: a library and a binary, both with the same name. If we only had one of the two, the package would have either a single library or binary crate. A package can have multiple binary crates by placing files in the *src/bin* directory: each file will be a separate binary crate.

A crate will group related functionality together in a scope so the functionality is easy to share between multiple projects.

### 7-2 Defining Modules to Control Scope and Privacy

*Modules* let us organize code within a crate into groups for readability and easy reuse. Modules also control the *privacy* of items, which is whether an item can be used by outside code (*public*) or is an internal implementation detail and not available for outside use (*private*).

```rust
// cargo new --lib restaurant
// src/lib.rs
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}

        fn seat_at_table() {}
    }

    mod serving {
        fn take_order() {}

        fn serve_order() {}

        fn take_payment() {}
    }
}
```

We define a module by starting with the `mod` keyword and then specify the name of the module and place curly brackets around the body of the module. Inside modules, we can have other modules, as in this case with the modules `hosting` and `serving`. Modules can also hold definitions for other items, such as structs, enums, constants, traits, or functions.

### 7-3 Paths for Referring to an Item in the Module Tree

A path can take two forms:

- An *absolute path* starts from a crate root by using a crate name or a literal `crate`.
- A *relative path* starts from the current module and uses `self`, `super`, or an identifier in the current module.

```rust
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // Absolute path
    // use the crate keyword to start an absolute path.
    crate::front_of_house::hosting::add_to_waitlist();

    // Relative path
    // front_of_house is at the same level of eat_at_restaurant
    front_of_house::hosting::add_to_waitlist();
}
```

Using the `crate` name to start from the crate root is like using `/` to start from the filesystem root in your shell.

#### 7-3-1 Modules as the Privacy Boundary

If you want to make an item like a function or struct private, you put it in a module. Here are the privacy rules:

- All items (functions, methods, structs, enums, modules, annd constants) are private by default.
- You can use the `pub` keyword to make an item public.
- You aren’t allowed to use private code defined in modules that are children of the current module.
- You are allowed to use any code defined in ancestor modules or the current module.

#### 7-3-2 Exposing Paths with the `pub` Keyword

```rust
// two pubs
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub fn eat_at_restaurant() {
    // Absolute path
    crate::front_of_house::hosting::add_to_waitlist();

    // Relative path
    front_of_house::hosting::add_to_waitlist();
}
```

The `front_of_house` module isn’t public, but because the `eat_at_restaurant` function **is defined in the same module** as `front_of_house` (that is, `eat_at_restaurant` and `front_of_house` are siblings), we can refer to `front_of_house` from `eat_at_restaurant`. 

#### 7-3-3 Starting Relative Paths with `super`

We can also construct relative paths that begin in the parent module by using `super` at the start of the path. This is like starting a filesystem path with the `..` syntax.

```rust
fn serve_order() {}

mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::serve_order();
    }

    fn cook_order() {}
}
```

The `fix_incorrect_order` function is in the `back_of_house` module, so we can use `super` to go to the parent module of `back_of_house`, which in this case is `crate`, the root. From there, we look for `serve_order` and find it. 

#### 7-3-4 Making Structs and Enums Public

We can also use `pub` to designate structs and enums as public, but there are a few extra details. If we use `pub` before a struct definition, we make the struct public, but the struct’s fields will still be private. We can make each field public or not on a case-by-case basis.

```rust
mod back_of_house {
    pub struct Breakfast {
        pub toast: String,
        seasonal_fruit: String,
    }

    impl Breakfast {
        pub fn summer(toast: &str) -> Breakfast {
            Breakfast {
                toast: String::from(toast),
                seasonal_fruit: String::from("peaches"),
            }
        }
    }
}

pub fn eat_at_restaurant() {
    // Order a breakfast in the summer with Rye toast
    let mut meal = back_of_house::Breakfast::summer("Rye");
    // Change our mind about what bread we'd like
    meal.toast = String::from("Wheat");
    println!("I'd like {} toast please", meal.toast);

    // The next line won't compile if we uncomment it; we're not allowed
    // to see or modify the seasonal fruit that comes with the meal
    // meal.seasonal_fruit = String::from("blueberries");
}
```

Note that because `back_of_house::Breakfast` has a private field, the struct needs to provide a public associated function that constructs an instance of `Breakfast` (we’ve named it `summer` here). If `Breakfast` didn’t have such a function, we couldn’t create an instance of `Breakfast` in `eat_at_restaurant` because we couldn’t set the value of the private `seasonal_fruit` field in `eat_at_restaurant`.

In contrast, if we make an enum public, all of its variants are then public. We only need the `pub` before the `enum` keyword

```rust
mod back_of_house {
    pub enum Appetizer {
        Soup,
        Salad,
    }
}

pub fn eat_at_restaurant() {
    let order1 = back_of_house::Appetizer::Soup;
    let order2 = back_of_house::Appetizer::Salad;
}
```

Enums aren’t very useful unless their variants are public; it would be annoying to have to annotate all enum variants with `pub` in every case, so the default for enum variants is to be public. Structs are often useful without their fields being public, so struct fields follow the general rule of everything being private by default unless annotated with `pub`.

### 7-4 Bringing Paths into Scope with the `use` Keyword

It might seem like the paths we’ve written to call functions so far are inconveniently long and repetitive. We can bring a path into a scope once and then call the items in that path as if they’re local items with the `use` keyword.

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

use crate::front_of_house::hosting;
// or
use front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
}
fn main() {}
```

Adding `use` and a path in a scope is similar to creating a symbolic link in the filesystem. You can also bring an item into scope with `use` and a relative path.

#### 7-4-1 Creating Idiomatic `use` Paths

For functions, it’s considered idiomatic to specify the function’s parent module with `use`, and then specify the parent module when calling the function. 

For structs, enums, and other items, specifying the full path to the item with `use` is idiomatic. The exception to this idiom is if the `use` statements would bring two items with the same name into scope, which isn’t allowed.

```rust
use std::collections::HashMap;

fn main() {
    let mut map = HashMap::new();
    map.insert(1, 2);
}

use std::fmt;
use std::io;

fn function1() -> fmt::Result {
}
fn function2() -> io::Result<()> {
}
```

#### 7-4-2 Providing New Names with the `as` Keyword

```rust
use std::fmt::Result;
use std::io::Result as IoResult;

fn function1() -> Result {
}
fn function2() -> IoResult<()> {
}
```

#### 7-4-3 Re-exporting Names with `pub use`

When we bring a name into scope with the `use` keyword, the name available in the new scope is private. To enable the code that calls our code to refer to that name as if it had been defined in that code’s scope, we can combine `pub` and `use`. This technique is called *re-exporting* because we’re bringing an item into scope but also making that item available for others to bring into their scope.

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
}
fn main() {}
```

By using `pub use`, external code can now call the `add_to_waitlist` function using `hosting::add_to_waitlist`. If we hadn’t specified `pub use`, the `eat_at_restaurant` function could call `hosting::add_to_waitlist` in its scope, but external code couldn’t take advantage of this new path.

Re-exporting is useful when the internal structure of your code is different from how programmers calling your code would think about the domain. For example, in this restaurant metaphor, the people running the restaurant think about “front of house” and “back of house.” But customers visiting a restaurant probably won’t think about the parts of the restaurant in those terms. With `pub use`, we can write our code with one structure but expose a different structure. Doing so makes our library well organized for programmers working on the library and programmers calling the library.

#### 7-4-4 Using External Package

```rust
// Cargo.toml
[dependencies]
rand = "0.5.5"

// rs file
use rand::Rng;

fn main() {
    let secret_number = rand::thread_rng().gen_range(1, 101);
}
```

#### 7-4-5 Nested Paths for Cleaning Up Large `use` Lists

```rust
use std::cmp::Ordering;
use std::io;
use std::{cmp::Ordering, io};

use std::io;
use std::io::Write;
use std::io::{self, Write};
```

#### 7-4-6 The Glob Operator

```rust
// bring all public items defined in a path
use std::collections::*;
```

The glob operator is often used when testing to bring everything under test into the `tests` module; The glob operator is also sometimes used as part of the prelude pattern.

### 7-5 Separating Modules into Different Files

```rust
// src/lib.rs
mod front_of_house;

pub use crate::front_of_house::hosting;

pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
    hosting::add_to_waitlist();
}
```

Using a semicolon after `mod front_of_house` instead of a block tells Rust to load the contents of the module from another file with the same name as the module.

```rust
// src/front_of_house.rs
pub mod hosting {
    pub fn add_to_waitlist() {}
}
```

The module tree remains the same:

```rust
// src/front_of_house.rs
pub mod hosting;

// src/front_of_house/hosting.rs
pub fn add_to_waitlist() {}
```

## 14 More About Cargo and Crates io

### 14-1 Customizing Builds with Release Profiles

In Rust, *release profiles* are predefined and customizable profiles with different configurations that allow a programmer to have more control over various options for compiling code. Each profile is configured independently of the others.

```bash
$ cargo build
    Finished dev [unoptimized + debuginfo] target(s) in 0.0 secs
$ cargo build --release
    Finished release [optimized] target(s) in 0.0 secs
```

The `dev` profile is defined with good defaults for development, and the `release` profile has good defaults for release builds.

Cargo has default settings for each of the profiles that apply when there aren’t any `[profile.*]` sections in the project’s *Cargo.toml* file. By adding `[profile.*]` sections for any profile you want to customize, you can override any subset of the default settings below.

```toml
[profile.dev]
opt-level = 0

[profile.release]
opt-level = 3
```

The `opt-level` setting controls the number of optimizations Rust will apply to your code, with a range of 0 to 3. 

### 14-2 Publishing a Crate to Crates io

#### 14-2-1 Making Useful Documentation Comments

Rust also has a particular kind of comment for documentation, known conveniently as a *documentation comment*, that will generate HTML documentation. Documentation comments use three slashes, `///`, instead of two and support Markdown notation for formatting the text. 

```rust
/// Adds one to the number given.
///
/// # Examples
///
/// ~~~
/// let arg = 5;
/// let answer = my_crate::add_one(arg);
///
/// assert_eq!(6, answer);
/// ~~~
pub fn add_one(x: i32) -> i32 {
    x + 1
}
/// ~ should be `, because my editor cannot compile ` here.
```

Then run `cargo doc`, the document will be in the `target/doc` directory.

##### 14-2-1-1 Commonly Used Sections

- Examples

- Panics: The scenarios in which the function being documented could panic. Callers of the function who don’t want their programs to panic should make sure they don’t call the function in these situations.
- Erros: If the function returns a `Result`, describing the kinds of errors that might occur and what conditions might cause those errors to be returned can be helpful to callers so they can write code to handle the different kinds of errors in different ways.
- Safety: If the function is `unsafe` to call (we discuss unsafety in Chapter 19), there should be a section explaining why the function is unsafe and covering the invariants that the function expects callers to uphold.

Most documentation comments don’t need all of these sections, but this is a good checklist to remind you of the aspects of your code that people calling your code will be interested in knowing about.

##### 14-2-1-2 Documentation Comments as Tests

Running `cargo test` will run the code examples in your documentation as tests! 

##### 14-2-1-3 Commenting Contained Items

Another style of doc comment, `//!`, we typically use these doc comments inside the crate root file (*src/lib.rs* by convention) or inside a module to document the crate or the module **as a whole**. Documentation comments within items are useful for describing crates and modules especially. Use them to explain the overall purpose of the container to help your users understand the crate’s organization.

#### 14-2-2 Exporting a Convenient Public API with `pub use`

If the structure *isn’t* convenient for others to use from another library, you don’t have to rearrange your internal organization: instead, you can re-export items to make a public structure that’s different from your private structure by using `pub use`. 

Filename: `src/lib.rs`

```rust
//! # Art
//!
//! A library for modeling artistic concepts.

pub mod kinds {
    /// The primary colors according to the RYB color model.
    pub enum PrimaryColor {
        Red,
        Yellow,
        Blue,
    }

    /// The secondary colors according to the RYB color model.
    pub enum SecondaryColor {
        Orange,
        Green,
        Purple,
    }
}

pub mod utils {
    use crate::kinds::*;

    /// Combines two primary colors in equal amounts to create
    /// a secondary color.
    pub fn mix(c1: PrimaryColor, c2: PrimaryColor) -> SecondaryColor {
        // --snip--
        SecondaryColor::Orange
    }
}
```

Filename: `src/main.rs`

```rust
use art::kinds::PrimaryColor;
use art::utils::mix;

fn main() {
    let red = PrimaryColor::Red;
    let yellow = PrimaryColor::Yellow;
    mix(red, yellow);
}
```

To remove the internal organization from the public API, we can modify the `art` crate code to add `pub use` statements to re-export the items at the top level.

```rust
//! # Art
//!
//! A library for modeling artistic concepts.

pub use self::kinds::PrimaryColor;
pub use self::kinds::SecondaryColor;
pub use self::utils::mix;

pub mod kinds {
    // --snip--
}

pub mod utils {
    // --snip--
}
```

Filename: `src/main.rs`

```rust
use art::PrimaryColor;
use art::mix;

fn main() {
    // --snip--
}
```

#### 14-2-3 Setting Up a Crates io Account

```bash
$ cargo login api_key
```

This command will inform Cargo of your API token and store it locally in *~/.cargo/credentials*.

#### 14-2-4 Adding Metadata to a New Crate

Before publishing, you’ll need to add some metadata to your crate by adding it to the `[package]` section of the crate’s *Cargo.toml* file.

Step1: A unique name

```toml
[package]
name = "guessing_game"
```

Step2: Add a description and license

```toml
[package]
name = "guessing_game"
version = "0.1.0"
authors = ["Your Name <you@example.com>"]
edition = "2018"
description = "A fun game where you guess what number the computer has chosen."
license = "MIT OR Apache-2.0"

[dependencies]

```

#### 14-2-5 Publishing to Crates io

Be careful when publishing a crate because a publish is *permanent*. The version can never be overwritten, and the code cannot be deleted. 

```bash
$ cargo publish
```

#### 14-2-6 Publishing a New Version of an Existing Crate

When you’ve made changes to your crate and are ready to release a new version, you change the `version` value specified in your *Cargo.toml* file and republish. Use the [Semantic Versioning rules](http://semver.org/) to decide what an appropriate next version number is based on the kinds of changes you’ve made.

#### 14-2-7 Removing Versions from Crates.io with `cargo yank`

Although you can’t remove previous versions of a crate, you can prevent any future projects from adding them as a new dependency. 

Yanking a version prevents new projects from starting to depend on that version while allowing all existing projects that depend on it to continue to download and depend on that version. Essentially, a yank means that all projects with a *Cargo.lock* will not break, and any future *Cargo.lock* files generated will not use the yanked version.

```bash
$ cargo yank --vers 1.0.1
$ cargo yank --vers 1.0.1 --undo
```

### 14-3 Cargo Workspaces

As your project develops, you might find that the library crate continues to get bigger and you want to split up your package further into multiple library crates. Cargo offers a feature called *workspaces* that can help manage multiple related packages that are developed in tandem.

#### 14.3.1 Creating a Workspace

A *workspace* is a set of packages that share the same *Cargo.lock* and output directory.

- touch `Cargo.toml`, add `[workspace]`

    ```toml
    [workspace]
    
    members = [
        "adder",
    ]
    ```

- `cargo new adder`

- `cargo build`

```bash
$ tree add -L 2
├── Cargo.lock
├── Cargo.toml
├── adder
│   ├── Cargo.toml
│   └── src
│       └── main.rs
└── target
```

#### 14-3-2 Creating the Second Crate in the Workspace

Step1: Edit `Cargo.toml`

```toml
[workspace]

members = [
    "adder",
    "add-one",
]
```

Step2: Generate a new library crate

```bash
$ cargo new add-one --lib

├── Cargo.lock
├── Cargo.toml
├── add-one
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
├── adder
│   ├── Cargo.toml
│   └── src
│       └── main.rs
└── target
```

Step3: Add function `add_one` to `add-one/src/lib.rs`

```rust
pub fn add_one(x: i32) -> i32 {
    x + 1
}
```

Step4: Add a dependency on `add-one` to `adder/Cargo.toml`

```toml
[dependencies]

add-one = { path = "../add-one" }
```

Step5: Use the `add_one` function from the `add-one` crate in the `adder` crate

```rust
// adder/src/main.rs
use add_one;

fn main() {
    let num = 10;
    println!("Hello, world! {} plus one is {}!", num, add_one::add_one(num));
}
```

Step6: `cargo build`

Step7: `cargo run -p adder`

This runs the code in *adder/src/main.rs*, which depends on the `add-one` crate.

##### 14-3-2-1 Depending on an External Crate in a Workspace

Notice that the workspace has only one *Cargo.lock* file at the top level of the workspace rather than having a *Cargo.lock* in each crate’s directory. This ensures that all crates are using the same version of all dependencies. If we add the `rand` crate to the *adder/Cargo.toml* and *add-one/Cargo.toml* files, Cargo will resolve both of those to one version of `rand` and record that in the one *Cargo.lock*.

However, even though `rand` is used somewhere in the workspace, we can’t use it in other crates in the workspace unless we add `rand` to their *Cargo.toml* files as well.

To fix this, edit the *Cargo.toml* file for the `adder` crate and indicate that `rand` is a dependency for that crate as well. Building the `adder` crate will add `rand` to the list of dependencies for `adder` in *Cargo.lock*, but no additional copies of `rand` will be downloaded. Cargo has ensured that every crate in the workspace using the `rand` crate will be using the same version. 

##### 14-3-2-2 Adding a Test to a Workspace

Running `cargo test` in a workspace structured like this one will run the tests for all the crates in the workspace.

```bash
# only run tests for the add-one
$ cargo test -p add-one
```

If you publish the crates in the workspace to [crates.io](https://crates.io/), each crate in the workspace will need to be published separately. The `cargo publish` command does not have an `--all` flag or a `-p` flag, so you must change to each crate’s directory and run `cargo publish` on each crate in the workspace to publish the crates.

The whole code can be found [here](https://github.com/hscspring/Coding-Collections/tree/master/Rust/add).

### 14-4 Installing Binaries from Crates io with `cargo install`

Note that you can only install packages that have binary targets. A *binary target* is the runnable program that is created if the crate has a *src/main.rs* file or another file specified as a binary, as opposed to a library target that isn’t runnable on its own but is suitable for including within other programs.

All binaries installed with `cargo install` are stored in the installation root’s *bin* folder (`~/.cargo/bin`).

### 14-5 Extending Cargo with Custom Commands

Cargo is designed so you can extend it with new subcommands without having to modify Cargo. If a binary in your `$PATH` is named `cargo-something`, you can run it as if it was a Cargo subcommand by running `cargo something`. Custom commands like this are also listed when you run `cargo --list`. Being able to use `cargo install` to install extensions and then run them just like the built-in Cargo tools is a super convenient benefit of Cargo’s design!

