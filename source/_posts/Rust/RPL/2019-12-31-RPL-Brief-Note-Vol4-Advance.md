---
title: The Rust Programming Language Brief Note (Vol4-Advance)
date: 2019-12-03 12:00:00
categories: Coding
tags: [Rust]
---

<div class="toc"><ul class="toc-item"><li><span><a href="#15-Smart-Pointers" data-toc-modified-id="15-Smart-Pointers-1">15 Smart Pointers</a></span><ul class="toc-item"><li><span><a href="#15-1-Using-Box-to-Point-to-Data-on-the-Heap" data-toc-modified-id="15-1-Using-Box-to-Point-to-Data-on-the-Heap-1.1">15-1 Using Box to Point to Data on the Heap</a></span><ul class="toc-item"><li><span><a href="#15-1-1-Using-a-Box<T>-to-Store-Data-on-the-Heap" data-toc-modified-id="15-1-1-Using-a-Box<T>-to-Store-Data-on-the-Heap-1.1.1">15-1-1 Using a <code>Box&lt;T&gt;</code> to Store Data on the Heap</a></span></li><li><span><a href="#15-1-2-Enabling-Recursive-Types-with-Boxes" data-toc-modified-id="15-1-2-Enabling-Recursive-Types-with-Boxes-1.1.2">15-1-2 Enabling Recursive Types with Boxes</a></span><ul class="toc-item"><li><span><a href="#15-1-2-1-More-Information-About-the-Cons-List" data-toc-modified-id="15-1-2-1-More-Information-About-the-Cons-List-1.1.2.1">15-1-2-1 More Information About the Cons List</a></span></li><li><span><a href="#15-1-2-2-Computing-the-Size-of-a-Non-Recursive-Type" data-toc-modified-id="15-1-2-2-Computing-the-Size-of-a-Non-Recursive-Type-1.1.2.2">15-1-2-2 Computing the Size of a Non-Recursive Type</a></span></li><li><span><a href="#15-1-2-3-Using-Box<T>-to-Get-a-Recursive-Type-with-a-Known-Size" data-toc-modified-id="15-1-2-3-Using-Box<T>-to-Get-a-Recursive-Type-with-a-Known-Size-1.1.2.3">15-1-2-3 Using <code>Box&lt;T&gt;</code> to Get a Recursive Type with a Known Size</a></span></li></ul></li></ul></li><li><span><a href="#15-2-Treating-Smart-Pointers-Like-Regular-References-with-the-Deref-Trait" data-toc-modified-id="15-2-Treating-Smart-Pointers-Like-Regular-References-with-the-Deref-Trait-1.2">15-2 Treating Smart Pointers Like Regular References with the <code>Deref</code> Trait</a></span><ul class="toc-item"><li><span><a href="#15-2-1-Following-the-Pointer-to-the-Value-with-the-Dereference-Operator" data-toc-modified-id="15-2-1-Following-the-Pointer-to-the-Value-with-the-Dereference-Operator-1.2.1">15-2-1 Following the Pointer to the Value with the Dereference Operator</a></span></li><li><span><a href="#15-2-2-Using-Box<T>-Like-a-Reference" data-toc-modified-id="15-2-2-Using-Box<T>-Like-a-Reference-1.2.2">15-2-2 Using <code>Box&lt;T&gt;</code> Like a Reference</a></span></li><li><span><a href="#15-2-3-Defining-Our-Own-Smart-Pointer" data-toc-modified-id="15-2-3-Defining-Our-Own-Smart-Pointer-1.2.3">15-2-3 Defining Our Own Smart Pointer</a></span></li><li><span><a href="#15-2-4-Treating-a-Type-Like-a-Reference-by-Implementing-the-Deref-Trait" data-toc-modified-id="15-2-4-Treating-a-Type-Like-a-Reference-by-Implementing-the-Deref-Trait-1.2.4">15-2-4 Treating a Type Like a Reference by Implementing the <code>Deref</code> Trait</a></span></li><li><span><a href="#15-2-5-Implicit-Deref-Coercions-with-Functions-and-Methods" data-toc-modified-id="15-2-5-Implicit-Deref-Coercions-with-Functions-and-Methods-1.2.5">15-2-5 Implicit Deref Coercions with Functions and Methods</a></span></li><li><span><a href="#15-2-6-How-Deref-Coercion-Interacts-with-Mutability" data-toc-modified-id="15-2-6-How-Deref-Coercion-Interacts-with-Mutability-1.2.6">15-2-6 How Deref Coercion Interacts with Mutability</a></span></li></ul></li><li><span><a href="#15-3-Running-Code-on-Cleanup-with-the-Drop-Trait" data-toc-modified-id="15-3-Running-Code-on-Cleanup-with-the-Drop-Trait-1.3">15-3 Running Code on Cleanup with the <code>Drop</code> Trait</a></span><ul class="toc-item"><li><span><a href="#15-3-1-Dropping-a-Value-Early-with-std::mem::drop" data-toc-modified-id="15-3-1-Dropping-a-Value-Early-with-std::mem::drop-1.3.1">15-3-1 Dropping a Value Early with <code>std::mem::drop</code></a></span></li></ul></li><li><span><a href="#15-4-Rc<T>-the-Reference-Counted-Smart-Pointer" data-toc-modified-id="15-4-Rc<T>-the-Reference-Counted-Smart-Pointer-1.4">15-4 <code>Rc&lt;T&gt;</code> the Reference Counted Smart Pointer</a></span><ul class="toc-item"><li><span><a href="#15-4-1-Using-Rc<T>-to-Share-Data" data-toc-modified-id="15-4-1-Using-Rc<T>-to-Share-Data-1.4.1">15-4-1 Using <code>Rc&lt;T&gt;</code> to Share Data</a></span></li><li><span><a href="#15-4-2-Cloning-an-Rc<T>-Increases-the-Reference-Count" data-toc-modified-id="15-4-2-Cloning-an-Rc<T>-Increases-the-Reference-Count-1.4.2">15-4-2 Cloning an <code>Rc&lt;T&gt;</code> Increases the Reference Count</a></span></li></ul></li><li><span><a href="#15-5-RefCell<T>-and-the-Interior-Mutability-Pattern" data-toc-modified-id="15-5-RefCell<T>-and-the-Interior-Mutability-Pattern-1.5">15-5 <code>RefCell&lt;T&gt;</code> and the Interior Mutability Pattern</a></span><ul class="toc-item"><li><span><a href="#15-5-1-Enforcing-Borrowing-Rules-at-Runtime-with-RefCell<T>" data-toc-modified-id="15-5-1-Enforcing-Borrowing-Rules-at-Runtime-with-RefCell<T>-1.5.1">15-5-1 Enforcing Borrowing Rules at Runtime with <code>RefCell&lt;T&gt;</code></a></span></li><li><span><a href="#15-5-2-Interior-Mutability,-A-Mutable-Borrow-to-an-Immutable-Value" data-toc-modified-id="15-5-2-Interior-Mutability,-A-Mutable-Borrow-to-an-Immutable-Value-1.5.2">15-5-2 Interior Mutability, A Mutable Borrow to an Immutable Value</a></span><ul class="toc-item"><li><span><a href="#15-5-2-1-A-Use-Case-for-interior-Mutability,-Mock-Objects" data-toc-modified-id="15-5-2-1-A-Use-Case-for-interior-Mutability,-Mock-Objects-1.5.2.1">15-5-2-1 A Use Case for interior Mutability, Mock Objects</a></span></li><li><span><a href="#15-5-2-2-Keeping-Track-of-Borrows-at-Runtime-with-RefCell<T>" data-toc-modified-id="15-5-2-2-Keeping-Track-of-Borrows-at-Runtime-with-RefCell<T>-1.5.2.2">15-5-2-2 Keeping Track of Borrows at Runtime with <code>RefCell&lt;T&gt;</code></a></span></li></ul></li><li><span><a href="#15-5-3-Having-Multiple-Owners-of-Mutable-Data-by-Combing-Rc<T>-and-RefCell<T>" data-toc-modified-id="15-5-3-Having-Multiple-Owners-of-Mutable-Data-by-Combing-Rc<T>-and-RefCell<T>-1.5.3">15-5-3 Having Multiple Owners of Mutable Data by Combing <code>Rc&lt;T&gt;</code> and <code>RefCell&lt;T&gt;</code></a></span></li></ul></li><li><span><a href="#15-6-Reference-Cycles-Can-Leak-Memory" data-toc-modified-id="15-6-Reference-Cycles-Can-Leak-Memory-1.6">15-6 Reference Cycles Can Leak Memory</a></span><ul class="toc-item"><li><span><a href="#15-6-1-Creating-a-Reference-Cycle" data-toc-modified-id="15-6-1-Creating-a-Reference-Cycle-1.6.1">15-6-1 Creating a Reference Cycle</a></span></li><li><span><a href="#15-6-2-Preventing-Reference-Cycles,-Turning-an-Rc<T>-into-a-Weak<T>" data-toc-modified-id="15-6-2-Preventing-Reference-Cycles,-Turning-an-Rc<T>-into-a-Weak<T>-1.6.2">15-6-2 Preventing Reference Cycles, Turning an <code>Rc&lt;T&gt;</code> into a <code>Weak&lt;T&gt;</code></a></span><ul class="toc-item"><li><span><a href="#15-6-2-1-Creating-a-Tree-Data-Structure,-a-Node-with-Child-Nodes" data-toc-modified-id="15-6-2-1-Creating-a-Tree-Data-Structure,-a-Node-with-Child-Nodes-1.6.2.1">15-6-2-1 Creating a Tree Data Structure, a Node with Child Nodes</a></span></li><li><span><a href="#15-6-2-2-Adding-a-Reference-from-a-Child-to-Its-Parent" data-toc-modified-id="15-6-2-2-Adding-a-Reference-from-a-Child-to-Its-Parent-1.6.2.2">15-6-2-2 Adding a Reference from a Child to Its Parent</a></span></li><li><span><a href="#15-6-2-3-Visualizing-Changes-to-strong_count-and-weak_count" data-toc-modified-id="15-6-2-3-Visualizing-Changes-to-strong_count-and-weak_count-1.6.2.3">15-6-2-3 Visualizing Changes to <code>strong_count</code> and <code>weak_count</code></a></span></li></ul></li></ul></li></ul></li><li><span><a href="#16-Fearless-Concurrency" data-toc-modified-id="16-Fearless-Concurrency-2">16 Fearless Concurrency</a></span><ul class="toc-item"><li><span><a href="#16-1-Using-Threads-to-Run-Code-Simultaneously" data-toc-modified-id="16-1-Using-Threads-to-Run-Code-Simultaneously-2.1">16-1 Using Threads to Run Code Simultaneously</a></span><ul class="toc-item"><li><span><a href="#16-1-1-Creating-a-New-Thread-with-spawn" data-toc-modified-id="16-1-1-Creating-a-New-Thread-with-spawn-2.1.1">16-1-1 Creating a New Thread with <code>spawn</code></a></span></li><li><span><a href="#16-1-2-Waiting-for-All-Threads-to-Finish-Using-join-Handles" data-toc-modified-id="16-1-2-Waiting-for-All-Threads-to-Finish-Using-join-Handles-2.1.2">16-1-2 Waiting for All Threads to Finish Using <code>join</code> Handles</a></span></li><li><span><a href="#16-1-3-Using-move-Closures-with-Threads" data-toc-modified-id="16-1-3-Using-move-Closures-with-Threads-2.1.3">16-1-3 Using <code>move</code> Closures with Threads</a></span></li></ul></li><li><span><a href="#16-2-Using-Message-Passing-to-Transfer-Data-Between-Threads" data-toc-modified-id="16-2-Using-Message-Passing-to-Transfer-Data-Between-Threads-2.2">16-2 Using Message Passing to Transfer Data Between Threads</a></span><ul class="toc-item"><li><span><a href="#16-2-1-Channels-and-Ownership-Transference" data-toc-modified-id="16-2-1-Channels-and-Ownership-Transference-2.2.1">16-2-1 Channels and Ownership Transference</a></span></li><li><span><a href="#16-2-2-Sending-Multiple-Values-and-Seeing-the-Receiver-Waiting" data-toc-modified-id="16-2-2-Sending-Multiple-Values-and-Seeing-the-Receiver-Waiting-2.2.2">16-2-2 Sending Multiple Values and Seeing the Receiver Waiting</a></span></li><li><span><a href="#16-2-3-Creating-Multiple-Producers-by-Cloning-the-Transmitter" data-toc-modified-id="16-2-3-Creating-Multiple-Producers-by-Cloning-the-Transmitter-2.2.3">16-2-3 Creating Multiple Producers by Cloning the Transmitter</a></span></li></ul></li><li><span><a href="#16-3-Shared-State-Concurrency" data-toc-modified-id="16-3-Shared-State-Concurrency-2.3">16-3 Shared-State Concurrency</a></span><ul class="toc-item"><li><span><a href="#16-3-1-Using-Mutexes-to-Allow-Access-to-Data-from-One-Thread-at-a-Time" data-toc-modified-id="16-3-1-Using-Mutexes-to-Allow-Access-to-Data-from-One-Thread-at-a-Time-2.3.1">16-3-1 Using Mutexes to Allow Access to Data from One Thread at a Time</a></span><ul class="toc-item"><li><span><a href="#16-3-1-1-The-API-of-Mutex<T>" data-toc-modified-id="16-3-1-1-The-API-of-Mutex<T>-2.3.1.1">16-3-1-1 The API of <code>Mutex&lt;T&gt;</code></a></span></li><li><span><a href="#16-3-1-2-Sharing-a-Mutex<T>-Between-Multiple-Threads" data-toc-modified-id="16-3-1-2-Sharing-a-Mutex<T>-Between-Multiple-Threads-2.3.1.2">16-3-1-2 Sharing a <code>Mutex&lt;T&gt;</code> Between Multiple Threads</a></span></li><li><span><a href="#16-3-1-3-Multiple-Ownership-with-Multiple-Threads" data-toc-modified-id="16-3-1-3-Multiple-Ownership-with-Multiple-Threads-2.3.1.3">16-3-1-3 Multiple Ownership with Multiple Threads</a></span></li><li><span><a href="#16-3-1-4-Atomic-Reference-Counting-with-Arc<T>" data-toc-modified-id="16-3-1-4-Atomic-Reference-Counting-with-Arc<T>-2.3.1.4">16-3-1-4 Atomic Reference Counting with <code>Arc&lt;T&gt;</code></a></span></li></ul></li><li><span><a href="#16-3-2-Similarities-Between-RefCell<T>/Rc<T>-and-Mutex<T>/Arc<T>" data-toc-modified-id="16-3-2-Similarities-Between-RefCell<T>/Rc<T>-and-Mutex<T>/Arc<T>-2.3.2">16-3-2 Similarities Between <code>RefCell&lt;T&gt;/Rc&lt;T&gt;</code> and <code>Mutex&lt;T&gt;/Arc&lt;T&gt;</code></a></span></li></ul></li><li><span><a href="#16-4-Extensible-Concurrency-with-the-Sync-and-Send-Traits" data-toc-modified-id="16-4-Extensible-Concurrency-with-the-Sync-and-Send-Traits-2.4">16-4 Extensible Concurrency with the <code>Sync</code> and <code>Send</code> Traits</a></span><ul class="toc-item"><li><span><a href="#16-4-1-Allowing-Transference-of-Ownership-Between-Threads-with-Send" data-toc-modified-id="16-4-1-Allowing-Transference-of-Ownership-Between-Threads-with-Send-2.4.1">16-4-1 Allowing Transference of Ownership Between Threads with <code>Send</code></a></span></li><li><span><a href="#16-4-2-Allowing-Access-from-Multiple-Threads-with-Sync" data-toc-modified-id="16-4-2-Allowing-Access-from-Multiple-Threads-with-Sync-2.4.2">16-4-2 Allowing Access from Multiple Threads with <code>Sync</code></a></span></li><li><span><a href="#16-4-3-Implementing-Send-and-Sync-Manually-Is-Unsafe" data-toc-modified-id="16-4-3-Implementing-Send-and-Sync-Manually-Is-Unsafe-2.4.3">16-4-3 Implementing <code>Send</code> and <code>Sync</code> Manually Is Unsafe</a></span></li></ul></li></ul></li><li><span><a href="#19-Advanced-Features" data-toc-modified-id="19-Advanced-Features-3">19 Advanced Features</a></span><ul class="toc-item"><li><span><a href="#19-1-Unsafe-Rust" data-toc-modified-id="19-1-Unsafe-Rust-3.1">19-1 Unsafe Rust</a></span><ul class="toc-item"><li><span><a href="#19-1-1-Unsafe-Superpowers" data-toc-modified-id="19-1-1-Unsafe-Superpowers-3.1.1">19-1-1 Unsafe Superpowers</a></span></li><li><span><a href="#19-1-2-Dereferencing-a-Raw-Pointer" data-toc-modified-id="19-1-2-Dereferencing-a-Raw-Pointer-3.1.2">19-1-2 Dereferencing a Raw Pointer</a></span></li><li><span><a href="#19-1-3-Calling-an-Unsafe-Function-or-Method" data-toc-modified-id="19-1-3-Calling-an-Unsafe-Function-or-Method-3.1.3">19-1-3 Calling an Unsafe Function or Method</a></span><ul class="toc-item"><li><span><a href="#19-1-3-1-Creating-a-Safe-Abstraction-over-Unsafe-Code" data-toc-modified-id="19-1-3-1-Creating-a-Safe-Abstraction-over-Unsafe-Code-3.1.3.1">19-1-3-1 Creating a Safe Abstraction over Unsafe Code</a></span></li><li><span><a href="#19-1-3-2-Using-extern-Functions-to-Call-External-Code" data-toc-modified-id="19-1-3-2-Using-extern-Functions-to-Call-External-Code-3.1.3.2">19-1-3-2 Using <code>extern</code> Functions to Call External Code</a></span></li></ul></li><li><span><a href="#19-1-4-Accessing-or-Modifying-a-Mutable-Static-Variable" data-toc-modified-id="19-1-4-Accessing-or-Modifying-a-Mutable-Static-Variable-3.1.4">19-1-4 Accessing or Modifying a Mutable Static Variable</a></span></li><li><span><a href="#19-1-5-Implementing-an-Unsafe-Trait" data-toc-modified-id="19-1-5-Implementing-an-Unsafe-Trait-3.1.5">19-1-5 Implementing an Unsafe Trait</a></span></li></ul></li><li><span><a href="#19-2-Advanced-Traits" data-toc-modified-id="19-2-Advanced-Traits-3.2">19-2 Advanced Traits</a></span><ul class="toc-item"><li><span><a href="#19-2-1-Specifying-Placeholder-Types-in-Trait-Definitions-with-Associated-Types" data-toc-modified-id="19-2-1-Specifying-Placeholder-Types-in-Trait-Definitions-with-Associated-Types-3.2.1">19-2-1 Specifying Placeholder Types in Trait Definitions with Associated Types</a></span></li><li><span><a href="#19-2-2-Default-Generic-Type--Parameters-and-Operator-Overloading" data-toc-modified-id="19-2-2-Default-Generic-Type--Parameters-and-Operator-Overloading-3.2.2">19-2-2 Default Generic Type  Parameters and Operator Overloading</a></span></li><li><span><a href="#19-2-3-Fully-Qualified-Syntax-for-Disambiguation,-Calling-Methods-with-the-Same-Name" data-toc-modified-id="19-2-3-Fully-Qualified-Syntax-for-Disambiguation,-Calling-Methods-with-the-Same-Name-3.2.3">19-2-3 Fully Qualified Syntax for Disambiguation, Calling Methods with the Same Name</a></span></li><li><span><a href="#19-2-4-Using-Supertraits-to-Require-One-Trait's-Functionality-Within-Another-Trait" data-toc-modified-id="19-2-4-Using-Supertraits-to-Require-One-Trait's-Functionality-Within-Another-Trait-3.2.4">19-2-4 Using Supertraits to Require One Trait's Functionality Within Another Trait</a></span></li><li><span><a href="#19-2-5-Using-the-Newtype-Pattern-to-Implement-External-Traits-on-External-Types" data-toc-modified-id="19-2-5-Using-the-Newtype-Pattern-to-Implement-External-Traits-on-External-Types-3.2.5">19-2-5 Using the Newtype Pattern to Implement External Traits on External Types</a></span></li></ul></li><li><span><a href="#19-3-Advanced-Types" data-toc-modified-id="19-3-Advanced-Types-3.3">19-3 Advanced Types</a></span><ul class="toc-item"><li><span><a href="#19-3-1-Using-the-Newtype-Pattern-for-Type-Safety-and-Abstraction" data-toc-modified-id="19-3-1-Using-the-Newtype-Pattern-for-Type-Safety-and-Abstraction-3.3.1">19-3-1 Using the Newtype Pattern for Type Safety and Abstraction</a></span></li><li><span><a href="#19-3-2-Creating-Type-Synonyms-with-Type-Aliases" data-toc-modified-id="19-3-2-Creating-Type-Synonyms-with-Type-Aliases-3.3.2">19-3-2 Creating Type Synonyms with Type Aliases</a></span></li><li><span><a href="#19-3-3-The-Never-Type-that-Never-Returns" data-toc-modified-id="19-3-3-The-Never-Type-that-Never-Returns-3.3.3">19-3-3 The Never Type that Never Returns</a></span></li><li><span><a href="#19-3-4-Dynamically-Sized-Types-and-the-Sized-Trait" data-toc-modified-id="19-3-4-Dynamically-Sized-Types-and-the-Sized-Trait-3.3.4">19-3-4 Dynamically Sized Types and the <code>Sized</code> Trait</a></span></li></ul></li><li><span><a href="#19-4-Advanced-Functions-and-Closures" data-toc-modified-id="19-4-Advanced-Functions-and-Closures-3.4">19-4 Advanced Functions and Closures</a></span><ul class="toc-item"><li><span><a href="#19-4-1-Function-Pointers" data-toc-modified-id="19-4-1-Function-Pointers-3.4.1">19-4-1 Function Pointers</a></span></li><li><span><a href="#19-4-2-Returning-Closures" data-toc-modified-id="19-4-2-Returning-Closures-3.4.2">19-4-2 Returning Closures</a></span></li></ul></li><li><span><a href="#19-5-Macros" data-toc-modified-id="19-5-Macros-3.5">19-5 Macros</a></span><ul class="toc-item"><li><span><a href="#19-5-1-The-Difference-Between-Macros-and-Functions" data-toc-modified-id="19-5-1-The-Difference-Between-Macros-and-Functions-3.5.1">19-5-1 The Difference Between Macros and Functions</a></span></li><li><span><a href="#19-5-2-Declarative-Macros-with-macro_rules!-for-General-Metaprogramming" data-toc-modified-id="19-5-2-Declarative-Macros-with-macro_rules!-for-General-Metaprogramming-3.5.2">19-5-2 Declarative Macros with <code>macro_rules!</code> for General Metaprogramming</a></span></li><li><span><a href="#19-5-3-Procedural-Macros-for-Generating-Code-from-Attributes" data-toc-modified-id="19-5-3-Procedural-Macros-for-Generating-Code-from-Attributes-3.5.3">19-5-3 Procedural Macros for Generating Code from Attributes</a></span></li><li><span><a href="#19-5-4-How-to-Write-a-Custom-derive-Macro" data-toc-modified-id="19-5-4-How-to-Write-a-Custom-derive-Macro-3.5.4">19-5-4 How to Write a Custom <code>derive</code> Macro</a></span></li><li><span><a href="#19-5-5-Attribute-like-macros" data-toc-modified-id="19-5-5-Attribute-like-macros-3.5.5">19-5-5 Attribute-like macros</a></span></li><li><span><a href="#19-5-6-Function-like-macros" data-toc-modified-id="19-5-6-Function-like-macros-3.5.6">19-5-6 Function-like macros</a></span></li></ul></li></ul></li></ul></div>

## 15 Smart Pointers

Reference counting smart pointer enables you to have multiple owners of data by keeping track of the number of owners and, when no owners remain, cleaning up the data.

References are pointers that only borrow data; in contrast, in many cases, smart pointers *own* the data they point to.

Smart pointers are usually implemented using structs. The characteristic that distinguishes a smart pointer from an ordinary struct is that smart pointers implement the `Deref` and `Drop` traits.

- The `Deref` trait allows an instance of the smart pointer struct to behave like a reference so you can write code that works with either references or smart pointers. 
- The `Drop` trait allows you to customize the code that is run when an instance of the smart pointer goes out of scope.

<!--more-->

### 15-1 Using Box to Point to Data on the Heap

The most straightforward smart pointer is a *box*, which allow you to store data on the heap rather than the stack. What remains on the stack is the pointer to the heap data. 

Boxes don’t have performance overhead, other than storing their data on the heap instead of on the stack. Some situations:

- When you have a type whose size can’t be known at compile time and you want to use a value of that type in a context that requires an exact size (See Enabling Recursive Types with Boxes).
- When you have a large amount of data and you want to transfer ownership but ensure the data won’t be copied when you do so
    - Transferring ownership of a large amount of data can take a long time because the data is copied around on the stack. To improve performance in this situation, we can store the large amount of data on the heap in a box. 
    - Then, only the small amount of pointer data is copied around on the stack, while the data it references stays in one place on the heap. 
- When you want to own a value and you care only that it’s a type that implements a particular trait rather than being of a specific type (Ch17, Using Trait Objects That Allow for Values of Different Types).

#### 15-1-1 Using a `Box<T>` to Store Data on the Heap

```rust
fn main() {
    let b = Box::new(5);
    println!("b = {}", b);
}
```

Just like any owned value, when a box goes out of scope, as `b` does at the end of `main`, it will be deallocated. The deallocation happens for the box (stored on the stack) and the data it points to (stored on the heap).

#### 15-1-2 Enabling Recursive Types with Boxes

One type whose size can’t be known at compile time is a *recursive type*. Boxes have a known size, so by inserting a box in a recursive type definition, you can have recursive types.

##### 15-1-2-1 More Information About the Cons List

A *cons list* is a data structure that comes from the Lisp programming language and its dialects. “To cons *x* onto *y*” informally means to construct a new container instance by putting the element *x* at the start of this new container, followed by the container *y*.

Each item in a cons list contains two elements: the value of the current item and the next item. The last item in the list contains only a value called `Nil` without a next item. A cons list is produced by recursively calling the `cons` function. The canonical name to denote the base case of the recursion is `Nil`. Note that this is not the same as the “null” or “nil” concept in Chapter 6, which is an invalid or absent value.

Most of the time when you have a list of items in Rust, `Vec` is a better choice to use. More complex recursive data types *are* useful in various situations.

```rust
enum List {
	Cons(i32, List),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
	let list = Cons(1, Cons(2, Cons(3, Nil)));
}
// error[E0072]: recursive type `List` has infinite size
```

The reason is that we’ve defined `List` with a variant that is recursive, Rust can't figure out how much space it needs to store a `list` value.

##### 15-1-2-2 Computing the Size of a Non-Recursive Type

```rust
enum Message {
	Quit, 
    Move {x: i32, y: i32},
    Write(String),
    ChangeColor(i32, i32, i32),
}
```

Because only one variant will be used, the most space a `Message` value will need is the space it would take to store the largest of its variants.

##### 15-1-2-3 Using `Box<T>` to Get a Recursive Type with a Known Size

Instead of storing a value directly, we’ll change the data structure to store the value indirectly by storing a pointer to the value instead.

Because a `Box` is a pointer, Rust always knows how much space a `Box` needs: a pointer’s size doesn’t change based on the amount of data it’s pointing to. This means we can put a `Box` inside the `Cons` variant instead of another `List` value directly. The `Box` will point to the next `List` value that will be on the heap rather than inside the `Cons` variant. Conceptually, we still have a list, created with lists “holding” other lists, but this implementation is now more like placing the items next to one another rather than inside one another.

```rust
enum List {
	Cons(i32, Box<List>),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
	let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
}
```

The `Cons` variant will need the size of an `i32` plus the space to store the box’s pointer data. 

![](https://doc.rust-lang.org/stable/book/img/trpl15-02.svg)

The `Box` type is a smart pointer because it implements the `Deref` trait, which allows `Box` values to be treated like references.  When a `Box` value goes out of scope, the heap data that the box is pointing to is cleaned up as well because of the `Drop` trait implementation.

### 15-2 Treating Smart Pointers Like Regular References with the `Deref` Trait

Implementing the `Deref` trait allows you to customize the behavior of the *dereference operator*, `*`. By implementing `Deref` in such a way that a smart pointer can be treated like a regular reference, you can write code that operates on references and use that code with smart pointers too.

#### 15-2-1 Following the Pointer to the Value with the Dereference Operator

```rust
fn main() {
	let x = 5;
    let y = &x;
    
    assert_eq!(5, x);
    // use *y to follow the reference to the value it’s pointing to (hence dereference). 
    assert_eq!(5, *y);
}
```

#### 15-2-2 Using `Box<T>` Like a Reference

```rust
fn main() {
	let x = 5;
    let y = Box::new(x);
    
    assert_eq!(5, x);
    assert_eq!(5, *y);
}
```

Here we set `y` to be an instance of a box pointing to the value in `x` rather than a reference pointing to the value of `x`. 

#### 15-2-3 Defining Our Own Smart Pointer

```rust
struct MyBox<T>(T);

impl<T> MyBox<T> {
	fn new(x: T) -> MyBox<T> {
    	MyBox(x)
    }
}

fn main() {
	let x = 5;
    let y = MyBox::new(x);
    
    assert_eq!(5, x);
    assert_eq!(5, *y);
}
// error[E0614]: type `MyBox<{integer}>` cannot be dereferenced
```

Because we haven’t implemented that ability on our type. To enable dereferencing with the `*` operator, we implement the `Deref` trait.

#### 15-2-4 Treating a Type Like a Reference by Implementing the `Deref` Trait

The `Deref` trait, provided by the standard library, requires us to implement one method named `deref` that borrows `self` and returns a reference to the inner data. 

```rust
use std::ops::Deref;

impl<T> Deref for MyBox<T> {
    // defines an associated type for the Deref trait to use
	type Target = T;
    
    // &self.0, returns a reference to the value we want to access with the * operator
    fn deref(&self) -> &T {
    	&self.0
    }
}
```

Without the `Deref` trait, the compiler can only dereference `&` references. The `deref` method gives the compiler the ability to take a value of any type that implements `Deref` and call the `deref` method to get a `&` reference that it knows how to dereference.

```rust
*y 
// means
*(y.deref())
```

The reason the `deref` method returns a reference to a value, and that the plain dereference outside the parentheses in `*(y.deref())` is still necessary, is the ownership system. 

- If the `deref` method returned the value directly instead of a reference to the value, the value would be moved out of `self`. 
- We don’t want to take ownership of the inner value inside `MyBox` in this case or in most cases where we use the dereference operator.

Note that the `*` operator is replaced with a call to the `deref` method and then a call to the `*` operator just once, each time we use a `*` in our code.

#### 15-2-5 Implicit Deref Coercions with Functions and Methods

Deref coercion converts a reference to a type that implements `Deref` into a reference to a type that `Deref` can convert the original type into. Deref coercion happens automatically when we pass a reference to a particular type’s value as an argument to a function or method that doesn’t match the parameter type in the function or method definition. A sequence of calls to the `deref` method converts the type we provided into the type the parameter needs.

```rust
fn hello(name: &str) {
    println!("Hello, {}!", name);
}

fn main() {
    let m = MyBox::new(String::from("Rust"));
    hello(&m);
}
```

Because we implemented the `Deref` trait on `MyBox`, Rust can turn `&MyBox` into `&String` by calling `deref`. The standard library provides an implementation of `Deref` on `String` that returns a string slice, and this is in the API documentation for `Deref`. Rust calls `deref` again to turn the `&String` into `&str`, which matches the `hello` function’s definition.

If Rust didn’t implement deref coercion:

```rust
fn main() {
	let m = MyBox::new(String::from("Rust"));
    hello(&(*m)[..]);
}
```

The `(*m)` dereferences the `MyBox` into a `String`. Then the `&` and `[..]` take a string slice of the `String` that is equal to the whole string to match the signature of `hello`.

When the `Deref` trait is defined for the types involved, Rust will analyze the types and use `Deref::deref` as many times as necessary to get a reference to match the parameter’s type. The number of times that `Deref::deref` needs to be inserted is resolved at compile time, so there is no runtime penalty for taking advantage of deref coercion!

The code can be found [here](https://github.com/hscspring/Coding-Collections/tree/master/Rust/deref).

#### 15-2-6 How Deref Coercion Interacts with Mutability

Similar to how you use the `Deref` trait to override the `*` operator on immutable references, you can use the `DerefMut` trait to override the `*` operator on mutable references.

Rust does deref coercion when it finds types and trait implementations in three cases:

- From `&T` to `&U` when `T: Deref<Target=U>`
- From `&mut T` to `&mut U` when `T: DerefMut<Target=U>`
- From `&mut T` to `&U` when `T: Deref<Target=U>`

The third case is trickier: Rust will also coerce a mutable reference to an immutable one. But the reverse is *not* possible: immutable references will never coerce to mutable references. Because of the borrowing rules, if you have a mutable reference, that mutable reference must be the only reference to that data (otherwise, the program wouldn’t compile). Converting one mutable reference to one immutable reference will never break the borrowing rules. Converting an immutable reference to a mutable reference would require that there is only one immutable reference to that data, and the borrowing rules don’t guarantee that. Therefore, Rust can’t make the assumption that converting an immutable reference to a mutable reference is possible.

### 15-3 Running Code on Cleanup with the `Drop` Trait

`Drop` lets you customize what happens when a value is about to go out of scope. The `Drop` trait is almost always used when implementing a smart pointer. For example, `Box` customizes `Drop` to deallocate the space on the heap that the box points to.

In Rust, you can specify that a particular bit of code be run whenever a value goes out of scope, and the compiler will insert this code automatically. The `Drop` trait requires you to implement one method named `drop` that takes a mutable reference to `self`.

```rust
struct CustomSmartPointer {
	data: String,
}

impl Drop for CustomSmartPointer {
	fn drop(&mut self) {
    	println!("Dropping CustomSmartPointer with data `{}`!", self.data);
    }
}

fn main() {
	let c = CustomSmartPointer { data: String::from("my stuff") };
    let d = CustomSmartPointer { data: String::from("other staff") };
    println!("CustomSmartPointers created");
}

// CustomSmartPointers created.
// Dropping CustomSmartPointer with data `other stuff`!
// Dropping CustomSmartPointer with data `my stuff`!
```

#### 15-3-1 Dropping a Value Early with `std::mem::drop`

Unfortunately, it’s not straightforward to disable the automatic `drop` functionality. Disabling `drop` isn’t usually necessary; the whole point of the `Drop` trait is that it’s taken care of automatically. 

Occasionally, however, you might want to clean up a value early. One example is when using smart pointers that manage locks: you might want to force the `drop` method that releases the lock to run so other code in the same scope can acquire the lock. 

Rust doesn’t let you call the `Drop` trait’s `drop` method manually; instead you have to call the `std::mem::drop` function provided by the standard library if you want to force a value to be dropped before the end of its scope.

```rust
fn main() {
	let c = CustomSmartPointer { data: String::from("some data") };
    println!("CustomSmartPointer created");
    c.drop();
    println!("CustomSmartPointer dropped before the end of main.");
}

// error[E0040]: explicit use of destructor method
```

We’re not allowed to explicitly call `drop`. The error message uses the term *destructor*, which is the general programming term for a function that cleans up an instance.

A *destructor* is analogous to a *constructor*, which creates an instance. The `drop` function in Rust is one particular destructor.

Rust doesn’t let us call `drop` explicitly because Rust would still automatically call `drop` on the value at the end of `main`. This would be a *double free* error because Rust would be trying to clean up the same value twice.

The `std::mem::drop` function is different from the `drop` method in the `Drop` trait. We call it by passing the value we want to force to be dropped early as an argument. 

```rust
fn main() {
    let c = CustomSmartPointer { data: String::from("some data") };
    println!("CustomSmartPointer created.");
    drop(c);
    println!("CustomSmartPointer dropped before the end of main.");
}

// CustomSmartPointer created.
// Dropping CustomSmartPointer with data `some data`!
// CustomSmartPointer dropped before the end of main.
```

### 15-4 `Rc<T>` the Reference Counted Smart Pointer

When a single value might have multiple owners. For example, in graph data structures, multiple edges might point to the same node, and that node is conceptually owned by all of the edges that point to it. A node shouldn’t be cleaned up unless it doesn’t have any edges pointing to it.

To enable multiple ownership, Rust has a type called `Rc`, which is an abbreviation for *reference counting*. The `Rc` type keeps track of the number of references to a value which determines whether or not a value is still in use. If there are zero references to a value, the value can be cleaned up without any references becoming invalid.

We use the `Rc` type when we want to allocate some data on the heap for multiple parts of our program to read and we can’t determine at compile time which part will finish using the data last. If we knew which part would finish last, we could just make that part the data’s owner, and the normal ownership rules enforced at compile time would take effect.

Note that `Rc` is only for use in single-threaded scenarios. 

#### 15-4-1 Using `Rc<T>` to Share Data

![](https://doc.rust-lang.org/stable/book/img/trpl15-03.svg)

```rust
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
    let a = Cons(5, Box::new(Cons(10, Box::new(Nil))));
    let b = Cons(3, Box::new(a));
    let c = Cons(4, Box::new(a));
}

// error[E0382]: use of moved value: `a`
```

The `Cons` variants own the data they hold, so when we create the `b` list, `a` is moved into `b` and `b` owns `a`. Then, when we try to use `a` again when creating `c`, we’re not allowed to because `a` has been moved.

We could change the definition of `Cons` to hold references instead, but then we would have to specify lifetime parameters. By specifying lifetime parameters, we would be specifying that every element in the list will live at least as long as the entire list. The borrow checker wouldn’t let us compile `let a = Cons(10, &Nil);` for example, because the temporary `Nil` value would be dropped before `a` could take a reference to it.

```rust
enum List {
    Cons(i32, Rc<List>),
    Nil,
}

use crate::List::{Cons, Nil};
use std::rc::Rc;

fn main() {
    // Each Cons variant will now hold a value and an Rc<T> pointing to a List
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    // clone the Rc<List> that a is holding
    let b = Cons(3, Rc::clone(&a));
    // increasing the number of references from two to three
    let c = Cons(4, Rc::clone(&a));
}
```

Every time we call `Rc::clone`, the reference count to the data within the `Rc` will increase, and the data won’t be cleaned up unless there are zero references to it.

The implementation of `Rc::clone` doesn’t make a deep copy of all the data like most types’ implementations of `clone` do. The call to `Rc::clone` only increments the reference count, which doesn’t take much time. 

#### 15-4-2 Cloning an `Rc<T>` Increases the Reference Count

```rust
fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    println!("count after creating a = {}", Rc::strong_count(&a));
    let b = Cons(3, Rc::clone(&a));
    println!("count after creating b = {}", Rc::strong_count(&a));
    {
        let c = Cons(4, Rc::clone(&a));
        println!("count after creating c = {}", Rc::strong_count(&a));
    }
    println!("count after c goes out of scope = {}", Rc::strong_count(&a));
}

// count after creating a = 1
// count after creating b = 2
// count after creating c = 3
// count after c goes out of scope = 2
```

The implementation of the `Drop` trait decreases the reference count automatically when an `Rc` value goes out of scope.

### 15-5 `RefCell<T>` and the Interior Mutability Pattern

#### 15-5-1 Enforcing Borrowing Rules at Runtime with `RefCell<T>`

Unlike `Rc`, the `RefCell` type represents single ownership over the data it holds. 

- With references and `Box`, the borrowing rules’ invariants are enforced at compile time. With `RefCell`, these invariants are enforced *at runtime*. 
- With references, if you break these rules, you’ll get a compiler error. With `RefCell`, if you break these rules, your program will panic and exit.

The advantages of checking the borrowing rules at compile time are that errors will be caught sooner in the development process, and there is no impact on runtime performance because all the analysis is completed beforehand. For those reasons, checking the borrowing rules at compile time is the best choice in the majority of cases, which is why this is Rust’s default.

The advantage of checking the borrowing rules at runtime instead is that certain memory-safe scenarios are then allowed, whereas they are disallowed by the compile-time checks. Static analysis, like the Rust compiler, is inherently conservative. 

Because some analysis is impossible, if the Rust compiler can’t be sure the code complies with the ownership rules, it might reject a correct program; in this way, it’s conservative. If Rust accepted an incorrect program, users wouldn’t be able to trust in the guarantees Rust makes. However, if Rust rejects a correct program, the programmer will be inconvenienced, but nothing catastrophic can occur. The `RefCell` type is useful **when you’re sure your code follows the borrowing rules but the compiler is unable to understand and guarantee that**.

Similar to `Rc`, `RefCell` is only for use in single-threaded scenarios and will give you a compile-time error if you try using it in a multithreaded context.

A recap of the reasons to choose `Box`, `Rc`, or `RefCell`:

- `Rc` enables multiple owners of the same data; `Box` and `RefCell` have single owners.
- `Box` allows immutable or mutable borrows checked at compile time; `Rc` allows only immutable borrows checked at compile time; `RefCell` allows immutable or mutable borrows checked at runtime.
- Because `RefCell` allows mutable borrows checked at runtime, you can mutate the value inside the `RefCell` even when the `RefCell` is immutable.

Mutating the value inside an immutable value is the *interior mutability* pattern. 

#### 15-5-2 Interior Mutability, A Mutable Borrow to an Immutable Value

A consequence of the borrowing rules is that when you have an immutable value, you can’t borrow it mutably.

```rust
fn main() {
    let x = 5;
    let y = &mut x;
}
// error[E0596]: cannot borrow immutable local variable `x` as mutable
```

However, there are situations in which it would be useful for a value to mutate itself in its methods but appear immutable to other code. Code outside the value’s methods would not be able to mutate the value. Using `RefCell` is one way to get the ability to have interior mutability. But `RefCell` doesn’t get around the borrowing rules completely: the borrow checker in the compiler allows this interior mutability, and the borrowing rules are checked at runtime instead. If you violate the rules, you’ll get a `panic!` instead of a compiler error.

##### 15-5-2-1 A Use Case for interior Mutability, Mock Objects

A *test double* is the general programming concept for a type used in place of another type during testing. *Mock objects* are specific types of test doubles that record what happens during a test so you can assert that the correct actions took place.

Rust doesn’t have objects in the same sense as other languages have objects, and Rust doesn’t have mock object functionality built into the standard library as some other languages do. However, you can definitely create a struct that will serve the same purposes as a mock object.

Here’s the scenario we’ll test: we’ll create a library that tracks a value against a maximum value and sends messages based on how close to the maximum value the current value is. Our library will only provide the functionality of tracking how close to the maximum a value is and what the messages should be at what times. Applications that use our library will be expected to provide the mechanism for sending the messages: the application could put a message in the application, send an email, send a text message, or something else. The library doesn’t need to know that detail. All it needs is something that implements a trait we’ll provide called `Messenger`.

```rust
pub trait Messenger {
    // send that takes an immutable reference to self and the text of the message. 
    fn send(&self, msg: &str);
}

pub struct LimitTracker<'a, T: Messenger> {
    messenger: &'a T,
    value: usize,
    max: usize,
}

impl<'a, T> LimitTracker<'a, T>
    where T: Messenger {
    pub fn new(messenger: &T, max: usize) -> LimitTracker<T> {
        LimitTracker {
            messenger,
            value: 0,
            max,
        }
    }

    pub fn set_value(&mut self, value: usize) {
        self.value = value;

        let percentage_of_max = self.value as f64 / self.max as f64;

        if percentage_of_max >= 1.0 {
            self.messenger.send("Error: You are over your quota!");
        } else if percentage_of_max >= 0.9 {
             self.messenger.send("Urgent warning: You've used up over 90% of your quota!");
        } else if percentage_of_max >= 0.75 {
            self.messenger.send("Warning: You've used up over 75% of your quota!");
        }
    }
}
```

We need a mock object that, instead of sending an email or text message when we call `send`, will only keep track of the messages it’s told to send. 

```rust
#[cfg(test)]
mod tests {
    use super::*;

    struct MockMessenger {
        sent_messages: Vec<String>,
    }

    impl MockMessenger {
        fn new() -> MockMessenger {
            MockMessenger { sent_messages: vec![] }
        }
    }

    impl Messenger for MockMessenger {
        fn send(&self, message: &str) {
            self.sent_messages.push(String::from(message));
        }
    }

    #[test]
    fn it_sends_an_over_75_percent_warning_message() {
        let mock_messenger = MockMessenger::new();
        let mut limit_tracker = LimitTracker::new(&mock_messenger, 100);

        limit_tracker.set_value(80);

        assert_eq!(mock_messenger.sent_messages.len(), 1);
    }
}

// error[E0596]: cannot borrow immutable field `self.sent_messages` as mutable
```

We can’t modify the `MockMessenger` to keep track of the messages, because the `send` method takes an immutable reference to `self`. We also can’t take the suggestion from the error text to use `&mut self` instead, because then the signature of `send` wouldn’t match the signature in the `Messenger` trait definition.

This is a situation in which interior mutability can help! We’ll store the `sent_messages` within a `RefCell`, and then the `send` message will be able to modify `sent_messages` to store the messages we’ve seen.

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use std::cell::RefCell;

    struct MockMessenger {
        sent_messages: RefCell<Vec<String>>,
    }

    impl MockMessenger {
        fn new() -> MockMessenger {
            MockMessenger { sent_messages: RefCell::new(vec![]) }
        }
    }

    impl Messenger for MockMessenger {
        fn send(&self, message: &str) {
            self.sent_messages.borrow_mut().push(String::from(message));
        }
    }

    #[test]
    fn it_sends_an_over_75_percent_warning_message() {
        // --snip--
		// call borrow on the RefCell<Vec<String>> to get an immutable reference to the vector.
        assert_eq!(mock_messenger.sent_messages.borrow().len(), 1);
    }
}
```

For the implementation of the `send` method, the first parameter is still an immutable borrow of `self`, which matches the trait definition. We call `borrow_mut` on the `RefCell>` in `self.sent_messages` to get a mutable reference to the value inside the `RefCell>`, which is the vector. Then we can call `push` on the mutable reference to the vector to keep track of the messages sent during the test.

##### 15-5-2-2 Keeping Track of Borrows at Runtime with `RefCell<T>`

When creating immutable and mutable references, we use the `&` and `&mut` syntax, respectively. With `RefCell`, we use the `borrow` and `borrow_mut` methods, which are part of the safe API that belongs to `RefCell`. The `borrow` method returns the smart pointer type `Ref`, and `borrow_mut` returns the smart pointer type `RefMut`. Both types implement `Deref`, so we can treat them like regular references.

The `RefCell` keeps track of how many `Ref` and `RefMut` smart pointers are currently active. Every time we call `borrow`, the `RefCell` increases its count of how many immutable borrows are active. When a `Ref` value goes out of scope, the count of immutable borrows goes down by one. Just like the compile-time borrowing rules, `RefCell` lets us have many immutable borrows or one mutable borrow at any point in time.

If we try to violate these rules, rather than getting a compiler error as we would with references, the implementation of `RefCell` will panic at runtime. We’re deliberately trying to create two mutable borrows active for the same scope to illustrate that `RefCell` prevents us from doing this at runtime.

```rust
impl Messenger for MockMessenger {
    fn send(&self, message: &str) {
        let mut one_borrow = self.sent_messages.borrow_mut();
        let mut two_borrow = self.sent_messages.borrow_mut();

        one_borrow.push(String::from(message));
        two_borrow.push(String::from(message));
    }
}
// already borrowed: BorrowMutError. 
// This is how RefCell<T> handles violations of the borrowing rules at runtime.
```

Catching borrowing errors at runtime rather than compile time means that you would find a mistake in your code later in the development process and possibly not until your code was deployed to production. Also, your code would incur a small runtime performance penalty as a result of keeping track of the borrows at runtime rather than compile time. However, using `RefCell` makes it possible to write a mock object that can modify itself to keep track of the messages it has seen while you’re using it in a context where only immutable values are allowed. You can use `RefCell` despite its trade-offs to get more functionality than regular references provide.

#### 15-5-3 Having Multiple Owners of Mutable Data by Combing `Rc<T>` and `RefCell<T>`

A common way to use `RefCell` is in combination with `Rc`. Recall that `Rc` lets you have multiple owners of some data, but it only gives immutable access to that data. If you have an `Rc` that holds a `RefCell`, you can get a value that can have multiple owners *and* that you can mutate!

```rust
enum List {
    Cons(Rc<RefCell<i32>>, Rc<List>),
    Nil,
}

use crate::List::{Cons, Nil};
use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    let value = Rc::new(RefCell::new(5));

    let a = Rc::new(Cons(Rc::clone(&value), Rc::new(Nil)));

    let b = Cons(Rc::new(RefCell::new(6)), Rc::clone(&a));
    let c = Cons(Rc::new(RefCell::new(10)), Rc::clone(&a));

    *value.borrow_mut() += 10;

    println!("a after = {:?}", a);
    println!("b after = {:?}", b);
    println!("c after = {:?}", c);
}
// a after = Cons(RefCell { value: 15 }, Nil)
// b after = Cons(RefCell { value: 6 }, Cons(RefCell { value: 15 }, Nil))
// c after = Cons(RefCell { value: 10 }, Cons(RefCell { value: 15 }, Nil))
```

We need to clone `value` so both `a` and `value` have ownership of the inner `5` value rather than transferring ownership from `value` to `a` or having `a` borrow from `value`.

The `borrow_mut` method uses the automatic dereferencing feature to dereference the `Rc` to the inner `RefCell` value, returns a `RefMut` smart pointer, and we use the dereference operator on it and change the inner value.

By using `RefCell`, we have an outwardly immutable `List` value. But we can use the methods on `RefCell` that provide access to its interior mutability so we can modify our data when we need to. The runtime checks of the borrowing rules protect us from data races, and it’s sometimes worth trading a bit of speed for this flexibility in our data structures.

The standard library has other types that provide interior mutability, such as `Cell`, which is similar except that instead of giving references to the inner value, the value is copied in and out of the `Cell`. There’s also `Mutex`, which offers interior mutability that’s safe to use across threads.

### 15-6 Reference Cycles Can Leak Memory

Rust’s memory safety guarantees make it difficult, but not impossible, to accidentally create memory that is never cleaned up (known as a *memory leak*). 

Preventing memory leaks entirely is not one of Rust’s guarantees in the same way that disallowing data races at compile time is, meaning memory leaks are memory safe in Rust. 

We can see that Rust allows memory leaks by using `Rc` and `RefCell`: it’s possible to create references where items refer to each other in a cycle. This creates memory leaks because the reference count of each item in the cycle will never reach 0, and the values will never be dropped.

#### 15-6-1 Creating a Reference Cycle

Let’s look at how a reference cycle might happen and how to prevent it:

```rust
use std::rc::Rc;
use std::cell::RefCell;
use crate::List::{Cons, Nil};

#[derive(Debug)]
enum List {
    // we want to modify which List value a Cons variant is pointing to. 
    Cons(i32, RefCell<Rc<List>>),
    Nil,
}

impl List {
    fn tail(&self) -> Option<&RefCell<Rc<List>>> {
        match self {
            Cons(_, item) => Some(item),
            Nil => None,
        }
    }
}
```

This code creates a list in `a` and a list in `b` that points to the list in `a`. Then it modifies the list in `a` to point to `b`, creating a reference cycle. 

```rust
fn main() {
    let a = Rc::new(Cons(5, RefCell::new(Rc::new(Nil))));

    println!("a initial rc count = {}", Rc::strong_count(&a));
    println!("a next item = {:?}", a.tail());

    let b = Rc::new(Cons(10, RefCell::new(Rc::clone(&a))));

    println!("a rc count after b creation = {}", Rc::strong_count(&a));
    println!("b initial rc count = {}", Rc::strong_count(&b));
    println!("b next item = {:?}", b.tail());

    if let Some(link) = a.tail() {
        *link.borrow_mut() = Rc::clone(&b);
    }

    println!("b rc count after changing a = {}", Rc::strong_count(&b));
    println!("a rc count after changing a = {}", Rc::strong_count(&a));

    // Uncomment the next line to see that we have a cycle;
    // it will overflow the stack
    // println!("a next item = {:?}", a.tail());
}

// a initial rc count = 1
// a next item = Some(RefCell { value: Nil })
// a rc count after b creation = 2
// b initial rc count = 1
// b next item = Some(RefCell { value: Cons(5, RefCell { value: Nil }) })
// b rc count after changing a = 2
// a rc count after changing a = 2
```

We modify `a` so it points to `b` instead of `Nil`, creating a cycle. We do that by using the `tail` method to get a reference to the `RefCell>` in `a`, which we put in the variable `link`. Then we use the `borrow_mut` method on the `RefCell>` to change the value inside from an `Rc` that holds a `Nil` value to the `Rc` in `b`.

![](https://doc.rust-lang.org/stable/book/img/trpl15-04.svg)

In this case, right after we create the reference cycle, the program ends. The consequences of this cycle aren’t very dire. However, if a more complex program allocated lots of memory in a cycle and held onto it for a long time, the program would use more memory than it needed and might overwhelm the system, causing it to run out of available memory.

If you have `RefCell` values that contain `Rc` values or similar nested combinations of types with interior mutability and reference counting, you must ensure that you don’t create cycles; you can’t rely on Rust to catch them. 

Another solution for avoiding reference cycles is reorganizing your data structures so that some references express ownership and some references don’t. As a result, you can have cycles made up of some ownership relationships and some non-ownership relationships, and only the ownership relationships affect whether or not a value can be dropped. In Listing above, we always want `Cons` variants to own their list, so reorganizing the data structure isn’t possible. 

#### 15-6-2 Preventing Reference Cycles, Turning an `Rc<T>` into a `Weak<T>`

So far, we’ve demonstrated that calling `Rc::clone` increases the `strong_count` of an `Rc` instance, and an `Rc` instance is only cleaned up if its `strong_count` is 0. You can also create a *weak reference* to the value within an `Rc` instance by calling `Rc::downgrade` and passing a reference to the `Rc`. When you call `Rc::downgrade`, you get a smart pointer of type `Weak`. Instead of increasing the `strong_count` in the `Rc` instance by 1, calling `Rc::downgrade` increases the `weak_count` by 1. The `Rc` type uses `weak_count` to keep track of how many `Weak` references exist, similar to `strong_count`. The difference is the `weak_count` doesn’t need to be 0 for the `Rc` instance to be cleaned up.

Strong references are how you can share ownership of an `Rc` instance. Weak references don’t express an ownership relationship. They won’t cause a reference cycle because any cycle involving some weak references will be broken once the strong reference count of values involved is 0.

Because the value that `Weak` references might have been dropped, to do anything with the value that a `Weak` is pointing to, you must make sure the value still exists. Do this by calling the `upgrade` method on a `Weak` instance, which will return an `Option>`. You’ll get a result of `Some` if the `Rc` value has not been dropped yet and a result of `None` if the `Rc` value has been dropped. Because `upgrade` returns an `Option`, Rust will ensure that the `Some` case and the `None` case are handled, and there won’t be an invalid pointer.

##### 15-6-2-1 Creating a Tree Data Structure, a Node with Child Nodes

```rust
use std::rc::Rc;
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    children: RefCell<Vec<Rc<Node>>>,
}
```

We want a `Node` to own its children, and we want to share that ownership with variables so we can access each `Node` in the tree directly. 

To do this, we define the `Vec` items to be values of type `Rc`. We also want to modify which nodes are children of another node, so we have a `RefCell` in `children` around the `Vec>`.

```rust
fn main() {
    let leaf = Rc::new(Node {
        value: 3,
        children: RefCell::new(vec![]),
    });

    let branch = Rc::new(Node {
        value: 5,
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });
}
```

##### 15-6-2-2 Adding a Reference from a Child to Its Parent 

It can’t contain an `Rc`, because that would create a reference cycle with `leaf.parent` pointing to `branch` and `branch.children` pointing to `leaf`, which would cause their `strong_count` values to never be 0.

Thinking about the relationships another way, a parent node should own its children: if a parent node is dropped, its child nodes should be dropped as well. However, a child should not own its parent: if we drop a child node, the parent should still exist. This is a case for weak references!

```rust
use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}
// A node will be able to refer to its parent node but doesn’t own its parent.
fn main() {
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());

    let branch = Rc::new(Node {
        value: 5,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });

    *leaf.parent.borrow_mut() = Rc::downgrade(&branch);

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());
}
// leaf parent = Some(Node { value: 5, parent: RefCell { value: (Weak) },
// children: RefCell { value: [Node { value: 3, parent: RefCell { value: (Weak) },
// children: RefCell { value: [] } }] } })
```

Once we have the `Node` instance in `branch`, we can modify `leaf` to give it a `Weak` reference to its parent. We use the `borrow_mut` method on the `RefCell>` in the `parent` field of `leaf`, and then we use the `Rc::downgrade` function to create a `Weak` reference to `branch` from the `Rc` in `branch.`

The lack of infinite output indicates that this code didn’t create a reference cycle. We can also tell this by looking at the values we get from calling `Rc::strong_count` and `Rc::weak_count`.

##### 15-6-2-3 Visualizing Changes to `strong_count` and `weak_count`

```rust
fn main() {
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    println!(
        "leaf strong = {}, weak = {}",
        Rc::strong_count(&leaf),
        Rc::weak_count(&leaf),
    );

    {
        let branch = Rc::new(Node {
            value: 5,
            parent: RefCell::new(Weak::new()),
            children: RefCell::new(vec![Rc::clone(&leaf)]),
        });

        *leaf.parent.borrow_mut() = Rc::downgrade(&branch);

        println!(
            "branch strong = {}, weak = {}",
            Rc::strong_count(&branch),
            Rc::weak_count(&branch),
        );

        println!(
            "leaf strong = {}, weak = {}",
            Rc::strong_count(&leaf),
            Rc::weak_count(&leaf),
        );
    }

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());
    println!(
        "leaf strong = {}, weak = {}",
        Rc::strong_count(&leaf),
        Rc::weak_count(&leaf),
    );
}
// leaf strong = 1, weak = 0
// branch strong = 1, weak = 1
// leaf strong = 2, weak = 0
// leaf parent = None
// leaf strong = 1, weak = 0
```

## 16 Fearless Concurrency

The ownership and type systems are a powerful set of tools to help manage memory safety *and* concurrency problems!

### 16-1 Using Threads to Run Code Simultaneously

Multiple threads problems:

- Race conditions
- Deadlock
- Bugs that happen only in certain situations

Special implementation of threads:

- 1:1
- M:N

What most important to Rust is runtime support. *Runtime* is a confusing term and can have different meanings in different contexts. In this context, by *runtime* we mean code that is included by the language in every binary. Rust needs to have nearly no runtime and cannot compromise on being able to call into C to maintain performance.

The green-threading M:N model requires a larger language runtime to manage threads. As such, the Rust standard library only provides an implementation of 1:1 threading. Because Rust is such a low-level language, there are crates that implement M:N threading if you would rather trade overhead for aspects such as more control over which threads run when and lower costs of context switching, for example.

#### 16-1-1 Creating a New Thread with `spawn`

```rust
use std::thread;
use std::time::Duration;

fn main() {
    thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
}
```

The new thread will be stopped when the main thread ends, whether or not it has finished running. 

#### 16-1-2 Waiting for All Threads to Finish Using `join` Handles

We can fix the problem of the spawned thread not getting to run, or not getting to run completely, by saving the return value of `thread::spawn` in a variable. The return type of `thread::spawn` is `JoinHandle`. A `JoinHandle` is an owned value that, when we call the `join` method on it, will wait for its thread to finish. 

```rust
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }

    handle.join().unwrap();
}

// hi number 1 from the main thread!
// hi number 2 from the main thread!
// hi number 1 from the spawned thread!
// hi number 3 from the main thread!
// hi number 2 from the spawned thread!
// hi number 4 from the main thread!
// hi number 3 from the spawned thread!
// hi number 4 from the spawned thread!
// hi number 5 from the spawned thread!
// hi number 6 from the spawned thread!
// hi number 7 from the spawned thread!
// hi number 8 from the spawned thread!
// hi number 9 from the spawned thread!
```

Calling `join` on the handle blocks the thread currently running until the thread represented by the handle terminates. *Blocking* a thread means that thread is prevented from performing work or exiting.

The two threads continue alternating, but the main thread waits because of the call to `handle.join()` and does not end until the spawned thread is finished.

```rust
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    handle.join().unwrap();

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
}

// hi number 1 from the spawned thread!
// hi number 2 from the spawned thread!
// hi number 3 from the spawned thread!
// hi number 4 from the spawned thread!
// hi number 5 from the spawned thread!
// hi number 6 from the spawned thread!
// hi number 7 from the spawned thread!
// hi number 8 from the spawned thread!
// hi number 9 from the spawned thread!
// hi number 1 from the main thread!
// hi number 2 from the main thread!
// hi number 3 from the main thread!
// hi number 4 from the main thread!
```

#### 16-1-3 Using `move` Closures with Threads

The `move` closure is often used alongside `thread::spawn` because it allows you to use data from one thread in another thread.

```rust
use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    let handle = thread::spawn(|| {
        println!("Here's a vector: {:?}", v);
    });

    handle.join().unwrap();
}

// error[E0373]: closure may outlive the current function, but it borrows `v`, which is owned by the current function
```

Rust *infers* how to capture `v`, and because `println!` only needs a reference to `v`, the closure tries to borrow `v`. However, there’s a problem: Rust can’t tell how long the spawned thread will run, so it doesn’t know if the reference to `v` will always be valid.

```rust
use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    let handle = thread::spawn(|| {
        println!("Here's a vector: {:?}", v);
    });

    drop(v); // oh no!

    handle.join().unwrap();
}
// help: to force the closure to take ownership of `v` (and any other referenced variables), use the `move` keyword
```

By adding the `move` keyword before the closure, we force the closure to take ownership of the values it’s using rather than allowing Rust to infer that it should borrow the values. 

```rust
use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    let handle = thread::spawn(move || {
        println!("Here's a vector: {:?}", v);
    });
    
    // If we added move to the closure, we would move v into the closure’s environment, and we could no longer call drop on it in the main thread. 
    // drop(v);

    handle.join().unwrap();
}
```

### 16-2 Using Message Passing to Transfer Data Between Threads

One increasingly popular approach to ensuring safe concurrency is *message passing*, where threads or actors communicate by sending each other messages containing data. Go slogan “Do not communicate by sharing memory; instead, share memory by communicating.”

One major tool Rust has for accomplishing message-sending concurrency is the *channel*. A channel in programming has two halves: a transmitter and a receiver. One part of your code calls methods on the transmitter with the data you want to send, and another part checks the receiving end for arriving messages. A channel is said to be *closed* if either the transmitter or receiver half is dropped.

```rust
use std::thread;
use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
    });
}
```

We create a new channel using the `mpsc::channel` function, it returns a tuple, the first element of which is the sending end and the second element is the receiving end. `mpsc` stands for *multiple producer, single consumer*. 

The way Rust’s standard library implements channels means a channel can have multiple *sending* ends that produce values but only one *receiving* end that consumes those values.

The spawned thread needs to own the transmitting end of the channel to be able to send messages through the channel by using `move`.

The transmitting end has a `send` method that takes the value we want to send. The `send` method returns a `Result` type, so if the receiving end has already been dropped and there’s nowhere to send a value, the send operation will return an error. In this example, we’re calling `unwrap` to panic in case of an error. But in a real application, we would handle it properly.

```rust
use std::thread;
use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
    });

    let received = rx.recv().unwrap();
    println!("Got: {}", received);
}
```

The receiving end of a channel has two useful methods: `recv` and `try_recv`. We’re using `recv`, short for *receive*, which will block the main thread’s execution and wait until a value is sent down the channel. Once a value is sent, `recv` will return it in a `Result`. When the sending end of the channel closes, `recv` will return an error to signal that no more values will be coming.

The `try_recv` method doesn’t block, but will instead return a `Result` immediately: an `Ok` value holding a message if one is available and an `Err` value if there aren’t any messages this time. Using `try_recv` is useful if this thread has other work to do while waiting for messages: we could write a loop that calls `try_recv` every so often, handles a message if one is available, and otherwise does other work for a little while until checking again.

#### 16-2-1 Channels and Ownership Transference

```rust
fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
        println!("val is {}", val);
    });

    let received = rx.recv().unwrap();
    println!("Got: {}", received);
}
// error[E0382]: use of moved value: `val`
```

The `send` function takes ownership of its parameter, and when the value is moved, the receiver takes ownership of it. 

#### 16-2-2 Sending Multiple Values and Seeing the Receiver Waiting

```rust
use std::thread;
use std::sync::mpsc;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];

        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    for received in rx {
        println!("Got: {}", received);
    }
}
```

#### 16-2-3 Creating Multiple Producers by Cloning the Transmitter

```rust
// --snip--

let (tx, rx) = mpsc::channel();

let tx1 = mpsc::Sender::clone(&tx);
thread::spawn(move || {
    let vals = vec![
        String::from("hi"),
        String::from("from"),
        String::from("the"),
        String::from("thread"),
    ];

    for val in vals {
        tx1.send(val).unwrap();
        thread::sleep(Duration::from_secs(1));
    }
});

thread::spawn(move || {
    let vals = vec![
        String::from("more"),
        String::from("messages"),
        String::from("for"),
        String::from("you"),
    ];

    for val in vals {
        tx.send(val).unwrap();
        thread::sleep(Duration::from_secs(1));
    }
});

for received in rx {
    println!("Got: {}", received);
}

// --snip--

// Got: hi
// Got: more
// Got: from
// Got: messages
// Got: for
// Got: the
// Got: thread
// Got: you
```

### 16-3 Shared-State Concurrency

Shared memory concurrency is like multiple ownership: multiple threads can access the same memory location at the same time.

#### 16-3-1 Using Mutexes to Allow Access to Data from One Thread at a Time

*Mutex* is an abbreviation for *mutual exclusion*, as in, a mutex allows only one thread to access some data at any given time. To access the data in a mutex, a thread must first signal that it wants access by asking to acquire the mutex’s *lock*. 

Management of mutexes can be incredibly tricky to get right (lock and unlock), which is why so many people are enthusiastic about channels. However, thanks to Rust’s type system and ownership rules, you can’t get locking and unlocking wrong.

##### 16-3-1-1 The API of `Mutex<T>`

```rust
use std::sync::Mutex;

fn main() {
    let m = Mutex::new(5);

    {
        let mut num = m.lock().unwrap();
        *num = 6;
    }

    println!("m = {:?}", m);
}
// m = 6
```

`lock` call will block the current thread so it can’t do any work until it’s our turn to have the lock. The call to `lock` would fail if another thread holding the lock panicked. In that case, no one would ever be able to get the lock, so we’ve chosen to `unwrap` and have this thread panic if we’re in that situation.

`Mutex` is a smart pointer. More accurately, the call to `lock` *returns* a smart pointer called `MutexGuard`, wrapped in a `LockResult` that we handled with the call to `unwrap`. 

The `MutexGuard` smart pointer implements `Deref` to point at our inner data; the smart pointer also has a `Drop` implementation that releases the lock automatically when a `MutexGuard` goes out of scope, which happens at the end of the inner scope.

##### 16-3-1-2 Sharing a `Mutex<T>` Between Multiple Threads

```rust
use std::sync::Mutex;
use std::thread;

fn main() {
	let counter = Mutex::new(0);
    let mut handle = vec![];
    
    for _ in 0..10 {
    	let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1
        });
		hundles.push(handle);
    }
    for handle in handles {
    	handle.join().unwrap();
    }
    println!("Result:{}", *counter.lock().unwrap());
}
// error[E0382]: capture of moved value: `counter`
```

The `counter` value is moved into the closure and then captured when we call `lock`. That description sounds like what we wanted, but it’s not allowed!

We can’t move ownership of `counter` into multiple threads. This was hard to see because our threads were in a loop, and Rust can’t point to different threads in different iterations of the loop.

##### 16-3-1-3 Multiple Ownership with Multiple Threads

We’ll wrap the `Mutex` in `Rc` and clone the `Rc` before moving ownership to the thread.

```rust
use std::rc::Rc;
use std::sync::Mutex;
use std::thread;

fn main() {
	let counter = Rc::new(Mutex::new(0));
    let mut handles = vec![];
    
    for _ in 0..10 {
    	let counter = Rc::clone(&counter);
        let handle = thread::spawn(move || {
        	let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }
    for handle in handles {
    	handle.join().unwrap();
    }
    println!("Result: {}", *counter.lock().unwrap());
}
// error[E0277]: the trait bound `std::rc::Rc<std::sync::Mutex<i32>>: std::marker::Send` is not satisfied
```

`Rc` is not safe to share across threads. When `Rc` manages the reference count, it adds to the count for each call to `clone` and subtracts from the count when each clone is dropped. But it doesn’t use any concurrency primitives to make sure that changes to the count can’t be interrupted by another thread. This could lead to wrong counts—subtle bugs that could in turn lead to memory leaks or a value being dropped before we’re done with it. What we need is a type exactly like `Rc` but one that makes changes to the reference count in a thread-safe way.

##### 16-3-1-4 Atomic Reference Counting with `Arc<T>`

`Arc` *is* a type like `Rc` that is safe to use in concurrent situations. The *a* stands for *atomic*, meaning it’s an *atomically reference counted* type. Atomics work like primitive types but are safe to share across threads.

Why all primitive types aren’t atomic and why standard library types aren’t implemented to use `Arc` by default? The reason is that thread safety comes with a performance penalty that you only want to pay when you really need to.

```rust
use std::sync::{Mutex, Arc};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();

            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}
// Result: 10
```

The code can be found [here](https://github.com/hscspring/Coding-Collections/tree/master/Rust/arc).

#### 16-3-2 Similarities Between `RefCell<T>/Rc<T>` and `Mutex<T>/Arc<T>`

`counter` is immutable but we could get a mutable reference to the value inside it, `Mutex` provides interior mutability, as the `Cell` family does. 

- We use `RefCell` to allow us to mutate contents inside an `Rc`
- We use `Mutex` to mutate contents inside an `Arc`.

Rust can’t protect you from all kinds of logic errors when you use `Mutex`. 

- using `Rc` came with the risk of creating reference cycles, where two `Rc` values refer to each other, causing memory leaks. 
- `Mutex` comes with the risk of creating *deadlocks*. These occur when an operation needs to lock two resources and two threads have each acquired one of the locks, causing them to wait for each other forever. 

### 16-4 Extensible Concurrency with the `Sync` and `Send` Traits

Rust language has *very* few concurrency features. Almost every concurrency feature we’ve talked about so far in this chapter has been part of the standard library, not the language. However, two concurrency concepts are embedded in the language: the `std::marker` traits `Sync` and `Send`.

#### 16-4-1 Allowing Transference of Ownership Between Threads with `Send`

The `Send` marker trait indicates that ownership of the type implementing `Send` can be transferred between threads. Almost every Rust type is `Send`, but there are some exceptions, including `Rc`: this cannot be `Send` because if you cloned an `Rc` value and tried to transfer ownership of the clone to another thread, both threads might update the reference count at the same time. For this reason, `Rc` is implemented for use in single-threaded situations where you don’t want to pay the thread-safe performance penalty.

#### 16-4-2 Allowing Access from Multiple Threads with `Sync`

The `Sync` marker trait indicates that it is safe for the type implementing `Sync` to be referenced from multiple threads. In other words, any type `T` is `Sync` if `&T` (a reference to `T`) is `Send`, meaning the reference can be sent safely to another thread. Similar to `Send`, primitive types are `Sync`, and types composed entirely of types that are `Sync` are also `Sync`.

The smart pointer `Rc` is also not `Sync` for the same reasons that it’s not `Send`. The `RefCell` type and the family of related `Cell` types are not `Sync`. The smart pointer `Mutex` is `Sync` and can be used to share access with multiple threads.

#### 16-4-3 Implementing `Send` and `Sync` Manually Is Unsafe

Because types that are made up of `Send` and `Sync` traits are automatically also `Send` and `Sync`, we don’t have to implement those traits manually. Building new concurrent types not made up of `Send` and `Sync` parts requires careful thought to uphold the safety guarantees. 


## 19 Advanced Features

### 19-1 Unsafe Rust

One reason is static analysis is conservative; Another is that the underlying computer hardware is inherently unsafe.

#### 19-1-1 Unsafe Superpowers

`unsafe` doesn’t turn off the borrow checker or disable any other of Rust’s safety checks: if you use a reference in unsafe code, it will still be checked. 

The `unsafe` keyword only gives you access to these four features that are then not checked by the compiler for memory safety. 

`unsafe` does not mean the code inside the block is necessarily dangerous or that it will definitely have memory safety problems. You’ll ensure the code inside an `unsafe` block will access memory in a valid way.

#### 19-1-2 Dereferencing a Raw Pointer

Unsafe Rust has two new types called *raw pointers* that are similar to references. As with references, raw pointers can be immutable or mutable and are written as `*const T` and `*mut T`, respectively. The asterisk isn’t the dereference operator; it’s part of the type name. In the context of raw pointers, *immutable* means that the pointer can’t be directly assigned to after being dereferenced.

Different from references and smart pointers, raw pointers:

- Are allowed to ignore the borrowing rules by having both immutable and mutable pointers or multiple mutable pointers to the same location
- Aren't guaranteed to point to valid memory
- Are allowed to be null
- Don't implement any automatic cleanup

Give up guaranteed safety in exchange for greater performance or the ability to interface with another language or hardware where Rust’s guarantees don’t apply. 

How to create an immutable and a mutable raw pointer from references:

```rust
let mut num = 5;

let r1 = &num as *const i32;
let r2 = &mut num as *mut i32;
```

We can create raw pointers in safe code (don't include `unsafe`); we just can’t dereference raw pointers outside an unsafe block.

Next, we’ll create a raw pointer whose validity we can’t be so certain of. Trying to use arbitrary memory is undefined: there might be data at that address or there might not, the compiler might optimize the code so there is no memory access, or the program might error with a segmentation fault. Usually, there is no good reason to write code like this, but it is possible.

```rust
let address = 0x012345usize;
let r = address as *const i32;
```

Recall that we can create raw pointers in safe code, but we can’t *dereference* raw pointers and read the data being pointed to. We use the dereference operator `*` on a raw pointer that requires an `unsafe` block.

```rust
let mut num = 5;

let r1 = &num as *const i32;
let r2 = &mut num as *mut i32;

unsafe {
	println!("r1 is: {}", *r1);
    println!("r2 is: {}", *r2);
}
```

Creating a pointer does no harm; it’s only when we try to access the value that it points at that we might end up dealing with an invalid value.

Normally, if we create an immutable and a mutable reference to `num`, the code would not have compiled because Rust’s ownership rules don’t allow a mutable reference at the same time as any immutable references. With raw pointers, we can create a mutable pointer and an immutable pointer to the same location and change data through the mutable pointer, potentially creating a data race.

Why would you ever use raw pointers? 

- One major use case is when interfacing with C code
- Another is when building up safe abstractions that the borrow checker doesn't understand

#### 19-1-3 Calling an Unsafe Function or Method

The `unsafe` keyword in this context indicates the function has requirements we need to uphold when we call this function, because Rust can’t guarantee we’ve met these requirements. 

```rust
unsafe fn dangerous() {}

unsafe {
	dangerous();
}
// without unsafe, error[E0133]: call to unsafe function requires unsafe function or block
```

Bodies of unsafe functions are effectively `unsafe` blocks, so to perform other unsafe operations within an unsafe function, we don’t need to add another `unsafe` block.

##### 19-1-3-1 Creating a Safe Abstraction over Unsafe Code

```rust
// split_at_mut usage
let mut v = vec![1, 2, 3, 4, 5, 6];

let r = &mut v[..];

let (a, b) = r.split_at_mut(3);

assert_eq!(a, &mut [1, 2, 3]);
assert_eq!(b, &mut [4, 5, 6]);
```

We can’t implement this function using only safe Rust. 

```rust
fn split_at_mut(slice: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
    let len = slice.len();

    assert!(mid <= len);

    (&mut slice[..mid],
     &mut slice[mid..])
}
// error[E0499]: cannot borrow `*slice` as mutable more than once at a time
```

Rust’s borrow checker can’t understand that we’re borrowing different parts of the slice; it only knows that we’re borrowing from the same slice twice. 

```rust
use std::slice;

fn split_at_mut(slice: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
    let len = slice.len();
    let ptr = slice.as_mut_ptr();

    assert!(mid <= len);

    unsafe {
        (slice::from_raw_parts_mut(ptr, mid),
         slice::from_raw_parts_mut(ptr.offset(mid as isize), len - mid))
    }
}
```

We use the `len` method to get the length of a slice and the `as_mut_ptr` method to access the raw pointer of a slice. In this case, because we have a mutable slice to `i32` values, `as_mut_ptr` returns a raw pointer with the type `*mut i32`, which we’ve stored in the variable `ptr`.

The `slice::from_raw_parts_mut` function takes a raw pointer and a length, and it creates a slice. Then we call the `offset` method on `ptr` with `mid` as an argument to get a raw pointer that starts at `mid`.

The function `slice::from_raw_parts_mut` is unsafe because it takes a raw pointer and must trust that this pointer is valid. The `offset` method on raw pointers is also unsafe, because it must trust that the offset location is also a valid pointer. 

By looking at the code and by adding the assertion that `mid` must be less than or equal to `len`, we can tell that all the raw pointers used within the `unsafe` block will be valid pointers to data within the slice. 

This is an acceptable and appropriate use of `unsafe`.

Note that we don’t need to mark the resulting `split_at_mut` function as `unsafe`, and we can call this function from safe Rust.

```rust
// MAY CRASH
use std::slice;

let address = 0x01234usize;
let r = address as *mut i32;

let slice: &[i32] = unsafe {
    slice::from_raw_parts_mut(r, 10000)
};
```

We don’t own the memory at this arbitrary location, and there is no guarantee that the slice this code creates contains valid `i32` values. Attempting to use `slice` as though it’s a valid slice results in undefined behavior.

##### 19-1-3-2 Using `extern` Functions to Call External Code

Functions declared within `extern` blocks are always unsafe to call from Rust code. The reason is that other languages don’t enforce Rust’s rules and guarantees, and Rust can’t check them, so responsibility falls on the programmer to ensure safety.

```rust
extern "C" {
	fn abs(input: i32) -> i32;
}

fn main() {
	unsafe {
    	println!("Absolute value of -3 according to C: {}", abs(-3));
    }
}
```

#### 19-1-4 Accessing or Modifying a Mutable Static Variable

In Rust, global variables are called *static* variables. 

```rust
static HELLO_WORLD: &str = "Hello world!";

fn main() {
	println!("name is: {}", HELLO_WORLD);
}
```

The names of static variables are in `SCREAMING_SNAKE_CASE` by convention, and we *must* annotate the variable’s type, which is `&'static str` in this example. Static variables can only store references with the `'static` lifetime, which means the Rust compiler can figure out the lifetime; we don’t need to annotate it explicitly. Accessing an immutable static variable is safe.

Difference between constants and immutable static variables:

- Values in a static variable have a fixed address in memory. Using the value will always access the same data. Constants, on the other hand, are allowed to duplicate their data whenever they’re used.
- Static variables can be mutable. Accessing and modifying mutable static variables is *unsafe*.

```rust
static mut COUNTER: u32 = 0;

fn add_to_count(inc: u32) {
    unsafe {
        COUNTER += inc;
    }
}

fn main() {
    add_to_count(3);

    unsafe {
        println!("COUNTER: {}", COUNTER);
    }
}
```

Any code that reads or writes from `mut COUNTER` must be within an `unsafe` block. 

With mutable data that is globally accessible, it’s difficult to ensure there are no data races, which is why Rust considers mutable static variables to be unsafe. Where possible, it’s preferable to use the concurrency techniques and thread-safe smart pointers we discussed in Chapter 16 so the compiler checks that data accessed from different threads is done safely.

#### 19-1-5 Implementing an Unsafe Trait

A trait is unsafe when at least one of its methods has some invariant that the compiler can’t verify. 

```rust
unsafe trait Foo {
    // methods go here
}

unsafe impl Foo for i32 {
    // method implementations go here
}
```

By using `unsafe impl`, we’re promising that we’ll uphold the invariants that the compiler can’t verify.

### 19-2 Advanced Traits

#### 19-2-1 Specifying Placeholder Types in Trait Definitions with Associated Types

*Associated types* connect a type placeholder with a trait such that the trait method definitions can use these placeholder types in their signatures.

```rust
pub trait Iterator {
    type Item;

    fn next(&mut self) -> Option<Self::Item>;
}
```

The type `Item` is a placeholder type, and the `next` method’s definition shows that it will return values of type `Option`. Implementors of the `Iterator` trait will specify the concrete type for `Item`, and the `next` method will return an `Option` containing a value of that concrete type.

Associated types might seem like a similar concept to generics, in that the latter allow us to define a function without specifying what types it can handle. So why use associated types?

```rust
impl Iterator for Counter {
	type Item = u32;
    fn next(&mut self) -> Option<Self::Item> {}
}
```

Generics:

```rust
pub trait Iterator<T> {
	fn next(&mut self) -> Option<T>;
}
```

The difference is that when using generics, we must annotate the types in each implementation; because we can also implement `Iterator for Counter` or any other type, we could have multiple implementations of `Iterator` for `Counter`. In other words, when a trait has a generic parameter, it can be implemented for a type multiple times, changing the concrete types of the generic type parameters each time. When we use the `next` method on `Counter`, we would have to provide type annotations to indicate which implementation of `Iterator` we want to use.

With associated types, we don’t need to annotate types because we can’t implement a trait on a type multiple times. With the definition that uses associated types, we can only choose what the type of `Item` will be once, because there can only be one `impl Iterator for Counter`. We don’t have to specify that we want an iterator of `u32` values everywhere that we call `next` on `Counter`.

#### 19-2-2 Default Generic Type  Parameters and Operator Overloading

When we use generic type parameters, we can specify a default concrete type for the generic type. This eliminates the need for implementors of the trait to specify a concrete type if the default type works. The syntax for specifying a default type for a generic type is `<PlaceholderType=ConcreteType>` when declaring the generic type.

```rust
use std::ops::Add;

#[derive(Debug, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl Add for Point {
    type Output = Point;

    fn add(self, other: Point) -> Point {
        Point {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

fn main() {
    assert_eq!(Point { x: 1, y: 0 } + Point { x: 2, y: 3 },
               Point { x: 3, y: 3 });
}
```

The default generic type in this code is within the `Add` trait. Here is its definition:

```rust
trait Add<RHS=Self> {
    type Output;

    fn add(self, rhs: RHS) -> Self::Output;
}
```

`RHS=Self` is called *default type parameters*. The `RHS` generic type parameter (short for “right hand side”) defines the type of the `rhs` parameter in the `add` method. If we don’t specify a concrete type for `RHS` when we implement the `Add` trait, the type of `RHS` will default to `Self`, which will be the type we’re implementing `Add` on.

```rust
use std::ops::Add;

struct Millimeters(u32);
struct Meters(u32);

impl Add<Meters> for Millimeters {
    type Output = Millimeters;

    fn add(self, other: Meters) -> Millimeters {
        Millimeters(self.0 + (other.0 * 1000))
    }
}
```

To add `Millimeters` and `Meters`, we specify `impl Add` to set the value of the `RHS` type parameter instead of using the default of `Self`.

Two ways to use default type parameters:

- To extend a type without breaking existing code
- To allow customization in specific cases most users won't need

The first purpose is similar to the second but in reverse: if you want to add a type parameter to an existing trait, you can give it a default to allow extension of the functionality of the trait without breaking the existing implementation code.

The standard library’s `Add` trait is an example of the second purpose: usually, you’ll add two like types, but the `Add` trait provides the ability to customize beyond that. Using a default type parameter in the `Add` trait definition means you don’t have to specify the extra parameter most of the time.

#### 19-2-3 Fully Qualified Syntax for Disambiguation, Calling Methods with the Same Name

```rust
trait Pilot {
    fn fly(&self);
}

trait Wizard {
    fn fly(&self);
}

struct Human;

impl Pilot for Human {
    fn fly(&self) {
        println!("This is your captain speaking.");
    }
}

impl Wizard for Human {
    fn fly(&self) {
        println!("Up!");
    }
}

impl Human {
    fn fly(&self) {
        println!("*waving arms furiously*");
    }
}

fn main() {
    let person = Human;
    person.fly();
}
// *waving arms furiously*

fn main() {
    let person = Human;
    Pilot::fly(&person);
    Wizard::fly(&person);
    person.fly();
}
// This is your captain speaking.
// Up!
// *waving arms furiously*
```

Because the `fly` method takes a `self` parameter, if we had two *types* that both implement one *trait*, Rust could figure out which implementation of a trait to use based on the type of `self`.

However, associated functions that are part of traits don’t have a `self` parameter. When two types in the same scope implement that trait, Rust can’t figure out which type you mean unless you use *fully qualified syntax*.

```rust
trait Animal {
    fn baby_name() -> String;
}

struct Dog;

impl Dog {
    fn baby_name() -> String {
        String::from("Spot")
    }
}

impl Animal for Dog {
    fn baby_name() -> String {
        String::from("puppy")
    }
}

fn main() {
    println!("A baby dog is called a {}", Dog::baby_name());
}
// A baby dog is called a Spot
```

We want `A baby dog is called a puppy`.

```rust
fn main() {
    println!("A baby dog is called a {}", Animal::baby_name());
}
// error[E0283]: type annotations required: cannot resolve `_: Animal`
```

Because `Animal::baby_name` is an associated function rather than a method, and thus doesn’t have a `self` parameter, Rust can’t figure out which implementation of `Animal::baby_name` we want.

```rust
fn main() {
    println!("A baby dog is called a {}", <Dog as Animal>::baby_name());
}
// A baby dog is called a puppy
```

In general, fully qualified syntax is defined as follows:

```rust
<Type as Trait>::function(receiver_if_method, next_arg, ...);
```

For associated functions, there would not be a `receiver`: there would only be the list of other arguments. 

You only need to use this more verbose syntax in cases where there are multiple implementations that use the same name and Rust needs help to identify which implementation you want to call.

#### 19-2-4 Using Supertraits to Require One Trait's Functionality Within Another Trait

Sometimes, you might need one trait to use another trait’s functionality. In this case, you need to rely on the dependent trait also being implemented. The trait you rely on is a *supertrait* of the trait you’re implementing.

```rust
use std::fmt;

trait OutlinePrint: fmt::Display {
    fn outline_print(&self) {
        let output = self.to_string();
        let len = output.len();
        println!("{}", "*".repeat(len + 4));
        println!("*{}*", " ".repeat(len + 2));
        println!("* {} *", output);
        println!("*{}*", " ".repeat(len + 2));
        println!("{}", "*".repeat(len + 4));
    }
}
```

Because we’ve specified that `OutlinePrint` requires the `Display` trait, we can use the `to_string` function that is automatically implemented for any type that implements `Display`.

```rust
struct Point {
    x: i32,
    y: i32,
}

impl OutlinePrint for Point {}
```

When we try to implement `OutlinePrint` on a type that doesn’t implement `Display`, We get an error saying that `Display` is required but not implemented.

To fix this, we implement `Display` on `Point` and satisfy the constraint that `OutlinePrint` requires:

```rust
use std::fmt;

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}
```

#### 19-2-5 Using the Newtype Pattern to Implement External Traits on External Types

In Chapter 10 in the [“Implementing a Trait on a Type”](https://doc.rust-lang.org/stable/book/ch10-02-traits.html#implementing-a-trait-on-a-type) section, we mentioned the orphan rule that states we’re allowed to implement a trait on a type as long as either the trait or the type are local to our crate. It’s possible to get around this restriction using the *newtype pattern*, which involves creating a new type in a tuple struct. 

*Newtype* is a term that originates from the Haskell programming language. There is no runtime performance penalty for using this pattern, and the wrapper type is elided at compile time.

As an example, let’s say we want to implement `Display` on `Vec`, which the orphan rule prevents us from doing directly because the `Display` trait and the `Vec` type are defined outside our crate. We can make a `Wrapper` struct that holds an instance of `Vec`; then we can implement `Display` on `Wrapper` and use the `Vec` value.

```rust
use std::fmt;

struct Wrapper(Vec<String>);

impl fmt::Display for Wrapper {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "[{}]", self.0.join(", "))
    }
}

fn main() {
    let w = Wrapper(vec![String::from("hello"), String::from("world")]);
    println!("w = {}", w);
}
```

The implementation of `Display` uses `self.0` to access the inner `Vec`, because `Wrapper` is a tuple struct and `Vec` is the item at index 0 in the tuple. Then we can use the functionality of the `Display` type on `Wrapper`.

The downside of using this technique is that `Wrapper` is a new type, so it doesn’t have the methods of the value it’s holding. We would have to implement all the methods of `Vec` directly on `Wrapper` such that the methods delegate to `self.0`, which would allow us to treat `Wrapper` exactly like a `Vec`. If we wanted the new type to have every method the inner type has, implementing the `Deref` trait on the `Wrapper` to return the inner type would be a solution. 

If we don’t want the `Wrapper` type to have all the methods of the inner type—for example, to restrict the `Wrapper` type’s behavior—we would have to implement just the methods we do want manually.

### 19-3 Advanced Types

#### 19-3-1 Using the Newtype Pattern for Type Safety and Abstraction

The newtype pattern is useful for tasks beyond those we’ve discussed so far, including statically enforcing that values are never confused and indicating the units of a value.

Another use of the newtype pattern is in abstracting away some implementation details of a type.

#### 19-3-2 Creating Type Synonyms with Type Aliases

Along with the newtype pattern, Rust provides the ability to declare a *type alias* to give an existing type another name. 

```rust
type Kilometers = i32;
```

The alias `Kilometers` is a *synonym* for `i32`, it is not a separate, new type.

Using this method, we don’t get the type checking benefits that we get from the newtype pattern discussed earlier.

The main use case for type synonyms is to reduce repetition.

```rust
let f: Box<dyn Fn() + Send + 'static> = Box::new(|| println!("hi"));
fn takes_long_type(f: Box<dyn Fn() + Send + 'static>) {
    // --snip--
}

type Thunk = Box<dyn Fn() + Send + 'static>;
let f: Thunk = Box::new(|| println!("hi"));
fn takes_long_type(f: Thunk) {
    // --snip--
}
```

Type aliases are also commonly used with the `Result` type for reducing repetition.

```rust
use std::io::Error;
use std::fmt;

pub trait Write {
    fn write(&mut self, buf: &[u8]) -> Result<usize, Error>;
    fn flush(&mut self) -> Result<(), Error>;

    fn write_all(&mut self, buf: &[u8]) -> Result<(), Error>;
    fn write_fmt(&mut self, fmt: fmt::Arguments) -> Result<(), Error>;
}
// E filled in as std::io::Error
type Result<T> = std::result::Result<T, std::io::Error>;
pub trait Write {
    fn write(&mut self, buf: &[u8]) -> Result<usize>;
    fn flush(&mut self) -> Result<()>;

    fn write_all(&mut self, buf: &[u8]) -> Result<()>;
    fn write_fmt(&mut self, fmt: Arguments) -> Result<()>;
}
```

Because it’s an alias, it’s just another `Result`, which means we can use any methods that work on `Result` with it, as well as special syntax like the `?` operator.

#### 19-3-3 The Never Type that Never Returns

Rust has a special type named `!` that’s known in type theory lingo as the *empty type* because it has no values. We prefer to call it the *never type* because it stands in the place of the return type when a function will never return.

```rust
fn bar() -> ! {}
```

Functions that return never are called *diverging functions*. We can’t create values of the type `!` so `bar` can never possibly return.

```rust
let guess: u32 = match guess.trim().parse() {
    Ok(num) => num,
    Err(_) => continue,
};
```

`match` arms must all return the same type, `continue` has a `!` value. Because `!` can never have a value, Rust decides that the type of `guess` is `u32`. 

The never type is useful with the `panic!` macro as well.

```rust
impl<T> Option<T> {
    pub fn unwrap(self) -> T {
        match self {
            Some(val) => val,
            None => panic!("called `Option::unwrap()` on a `None` value"),
        }
    }
}
```

Rust sees that `val` has the type `T` and `panic!` has the type `!`.

#### 19-3-4 Dynamically Sized Types and the `Sized` Trait

*dynamically sized types*. sometimes referred to as *DSTs* or *unsized types*, these types let us write code using values whose size we can know only at runtime.

`str` on its own, is a DST. We can’t know how long the string is until runtime, meaning we can’t create a variable of type `str`, nor can we take an argument of type `str`.

```rust
// does not work
let s1: str = "Hello there!";
let s2: str = "How's it going?";
```

Rust needs to know how much memory to allocate for any value of a particular type, and all values of a type must use the same amount of memory. If Rust allowed us to write this code, these two `str` values would need to take up the same amount of space. But they have different lengths: `s1` needs 12 bytes of storage and `s2` needs 15. This is why it’s not possible to create a variable holding a dynamically sized type.

We make the types of `s1` and `s2` a `&str` rather than a `str`. The slice data structure stores the starting position and the length of the slice. So although a `&T` is a single value that stores the memory address of where the `T` is located, a `&str` is *two* values: the address of the `str` and its length. The golden rule of dynamically sized types is that we must always put values of dynamically sized types behind a pointer of some kind.

Rust has a particular trait called the `Sized` trait to determine whether or not a type’s size is known at compile time. This trait is automatically implemented for everything whose size is known at compile time. In addition, Rust implicitly adds a bound on `Sized` to every generic function. 

```rust
fn generic<T>(t: T) {}
// is treated as though we had written
fn generic<T: Sized>(t: T) {}
```

By default, generic functions will work only on types that have a known size at compile time. However, you can use the following special syntax to relax this restriction:

```rust
fn generic<T: ?Sized>(t: &T) {}
```

We would read this as “`T` may or may not be `Sized`.” This syntax is only available for `Sized`, not any other traits.

### 19-4 Advanced Functions and Closures

#### 19-4-1 Function Pointers

Functions coerce to the type `fn` (with a lowercase f), not to be confused with the `Fn` closure trait. The `fn` type is called a *function pointer*. The syntax for specifying that a parameter is a function pointer is similar to that of closures.

```rust
fn add_one(x: i32) -> i32 {
    x + 1
}

fn do_twice(f: fn(i32) -> i32, arg: i32) -> i32 {
    f(arg) + f(arg)
}

fn main() {
    let answer = do_twice(add_one, 5);

    println!("The answer is: {}", answer);
}
// 12
```

Unlike closures, `fn` is a type rather than a trait, so we specify `fn` as the parameter type directly rather than declaring a generic type parameter with one of the `Fn` traits as a trait bound.

Function pointers implement all three of the closure traits (`Fn`, `FnMut`, and `FnOnce`), so you can always pass a function pointer as an argument for a function that expects a closure.

It’s best to write functions using a generic type and one of the closure traits so your functions can accept either functions or closures.

An example of where you would want to only accept `fn` and not closures is when interfacing with external code that doesn’t have closures: C functions can accept functions as arguments, but C doesn’t have closures.

```rust
let list_of_numbers = vec![1, 2, 3];
let list_of_strings: Vec<String> = list_of_numbers
    .iter()
    .map(|i| i.to_string()) // closure
    .collect();
```

Or name a function as the argument to `map` instead of the closure:

```rust
let list_of_numbers = vec![1, 2, 3];
let list_of_strings: Vec<String> = list_of_numbers
    .iter()
    .map(ToString::to_string) // named function
    .collect();
```

We have another useful pattern that exploits an implementation detail of tuple structs and tuple-struct enum variants. 

```rust
enum Status {
    Value(u32),
    Stop,
}

let list_of_statuses: Vec<Status> =
    (0u32..20)
    .map(Status::Value)
    .collect();
```

Here we create `Status::Value` instances using each `u32` value in the range that `map` is called on by using the initializer function of `Status::Value`. 

#### 19-4-2 Returning Closures

Closures are represented by traits, which means you can’t return closures directly. In most cases where you might want to return a trait, you can instead use the concrete type that implements the trait as the return value of the function. But you can’t do that with closures because they don’t have a concrete type that is returnable; you’re not allowed to use the function pointer `fn` as a return type.

```rust
fn returns_closure() -> Fn(i32) -> i32 {
	|x| x + 1
}
// error[E0277]: the trait bound `std::ops::Fn(i32) -> i32 + 'static: std::marker::Sized` is not satisfied
```

The error references the `Sized` trait again! Rust doesn’t know how much space it will need to store the closure. 

We can use a trait object:

```rust
fn main() {
	fn returns_closure() -> Box<dyn Fn(i32) -> i32> {
    	Box::new(|x| x+1)
    }
}
```

### 19-5 Macros

The term *macro* refers to a family of features in Rust: *declarative* macros with `macro_rules!` and three kinds of *procedural* macros:

- Custom `#[derive]` macros that specify code added with the `derive` attribute used on structs and enums
- Attribute-like macros that define custom attributes usable on any item
- Function-like macros that look like function calls but operate on the tokens specified as their argument

#### 19-5-1 The Difference Between Macros and Functions

Fundamentally, macros are a way of writing code that writes other code, which is known as *metaprogramming*. Metaprogramming is useful for reducing the amount of code you have to write and maintain, which is also one of the roles of functions. However, macros have some additional powers that functions don’t.

- A function signature must declare the number and type of parameters the function has. Macros can take a variable number of parameters.
- Macros are expanded before the compiler interprets the meaning of the code, so a macro can, for example, implement a trait on a given type. A function can’t, because it gets called at runtime and a trait needs to be implemented at compile time.
- The downside to implementing a macro instead of a function is that macro definitions are more complex than function definitions because you’re writing Rust code that writes Rust code. 
- You must define macros or bring them into scope *before* you call them in a file, as opposed to functions you can define anywhere and call anywhere.

#### 19-5-2 Declarative Macros with `macro_rules!` for General Metaprogramming

The most widely used form of macros in Rust is *declarative macros*, which allow you to write something similar to a Rust `match` expression. 

Like `match`, macros also compare a value to patterns that are associated with particular code: in this situation, the value is the literal Rust source code passed to the macro; the patterns are compared with the structure of that source code; and the code associated with each pattern, when matched, replaces the code passed to the macro. This all happens during compilation.

```rust
let v: Vec<u32> = vec![1,2,3,];
```

We could also use the `vec!` macro to make a vector of two integers or a vector of five string slices. We wouldn’t be able to use a function to do the same because we wouldn’t know the number or type of values up front.

```rust
#[macro_export]
macro_rules! vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}
```

The `#[macro_export]` annotation indicates that this macro should be made available whenever the crate in which the macro is defined is brought into scope. Without this annotation, the macro can’t be brought into scope.

First, a set of parentheses encompasses the whole pattern. A dollar sign (`$`) is next, followed by a set of parentheses that captures values that match the pattern within the parentheses for use in the replacement code. Within `$()` is `$x:expr`, which matches any Rust expression and gives the expression the name `$x`.

The comma following `$()` indicates that a literal comma separator character could optionally appear after the code that matches the code in `$()`. The `*` specifies that the pattern matches zero or more of whatever precedes the `*`.

When we call this macro with `vec![1, 2, 3];`, the `$x` pattern matches three times with the three expressions `1`, `2`, and `3`.

`temp_vec.push()` within `$()*` is generated for each part that matches `$()` in the pattern zero or more times depending on how many times the pattern matches. The `$x` is replaced with each expression matched. 

```rust
let mut temp_vec = Vec::new();
temp_vec.push(1);
temp_vec.push(2);
temp_vec.push(3);
temp_vec
```

#### 19-5-3 Procedural Macros for Generating Code from Attributes

The second form of macros is *procedural macros*, which act more like functions (and are a type of procedure). Procedural macros accept some code as an input, operate on that code, and produce some code as an output rather than matching against patterns and replacing the code with other code as declarative macros do.

The three kinds of procedural macros (custom derive, attribute-like, and function-like) all work in a similar fashion.

When creating procedural macros, the definitions must reside in their own crate with a special crate type.

```rust
use proc_macro;

#[some_attribute]
pub fn some_name(input: TokenStream) -> TokenStream {
}
```

The `TokenStream` type is defined by the `proc_macro` crate that is included with Rust and represents a sequence of tokens. This is the core of the macro: the source code that the macro is operating on makes up the input `TokenStream`, and the code the macro produces is the output `TokenStream`. 

#### 19-5-4 How to Write a Custom `derive` Macro

We’ll provide a procedural macro so users can annotate their type with `#[derive(HelloMacro)]` to get a default implementation of the `hello_macro` function. 

Filename: `src/main.rs`

```rust
use hello_macro::HelloMacro;
use hello_macro_derive::HelloMacro;

#[derive(HelloMacro)]
struct Pancakes;

fn main() {
    Pancakes::hello_macro();
}
```

This code will print `Hello, Macro! My name is Pancakes!` when we’re done. 

Step1: make a new library crate: `$ cargo new hello_macro --lib`

Step2: define the `HelloMacro` trait and its associated function

```rust
pub trait HelloMacro {
	fn hello_macro();
}
```

Here crate user could implement the trait to achieve the desired functionality:

```rust
use hello_macro::HelloMacro;

struct Pancakes;

impl HelloMacro for Pancakes {
    fn hello_macro() {
        println!("Hello, Macro! My name is Pancakes!");
    }
}

fn main() {
    Pancakes::hello_macro();
}
```

However, they would need to write the implementation block for each type they wanted to use with `hello_macro`.

Additionally, we can’t yet provide the `hello_macro` function with default implementation that will print the name of the type the trait is implemented on: Rust doesn’t have reflection capabilities, so it can’t look up the type’s name at runtime. We need a macro to generate code at compile time.

Step3: define the procedural macro

Procedural macros need to be in their own crate. Eventually, this restriction might be lifted. The convention for structuring crates and macro crates is as follows: for a crate named `foo`, a custom derive procedural macro crate is called `foo_derive`. Start a new crate `hello_macro_derive` inside `hello_macro`:

```bash
$ cargo new hello_macro_derive --lib
```

The two crates will need to be published separately, and programmers using these crates will need to add both as dependencies and bring them both into scope. 

We could instead have the `hello_macro` crate use `hello_macro_derive` as a dependency and re-export the procedural macro code. However, the way we’ve structured the project makes it possible for programmers to use `hello_macro` even if they don’t want the `derive` functionality.

We need to declare the `hello_macro_derive` crate as a procedural macro crate. We’ll also need functionality from the `syn` and `quote` crates, so we need to add them as dependencies. 

```toml
[lib]
proc-macro = true

[dependencies]
syn = "0.14.4"
quote = "0.6.3"
```

Filename: `hello_macro_derive/src/lib.rs`

```rust
extern crate proc_macro;

use crate::proc_macro::TokenStream;
use quote::quote;
use syn;

#[proc_macro_derive(HelloMacro)]
pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
    // Construct a representation of Rust code as a syntax tree
    // that we can manipulate
    let ast = syn::parse(input).unwrap();

    // Build the trait implementation
    impl_hello_macro(&ast)
}
```

The `proc_macro` crate comes with Rust, so we didn’t need to add that to the dependencies in *Cargo.toml*. The `proc_macro` crate is the compiler’s API that allows us to read and manipulate Rust code from our code.

The `syn` crate parses Rust code from a string into a data structure that we can perform operations on. The `quote` crate turns `syn` data structures back into Rust code. 

The `hello_macro_derive` function will be called when a user of our library specifies `#[derive(HelloMacro)]` on a type. This is possible because we’ve annotated the `hello_macro_derive` function here with `proc_macro_derive` and specified the name, `HelloMacro`, which matches our trait name; this is the convention most procedural macros follow.

The `hello_macro_derive` function first converts the `input` from a `TokenStream` to a data structure that we can then interpret and perform operations on. This is where `syn` comes into play. The `parse` function in `syn` takes a `TokenStream` and returns a `DeriveInput` struct representing the parsed Rust code.

```rust
// DeriveInput get from parsing the struct Pancakes;
DeriveInput {
    // --snip--

    ident: Ident {
        ident: "Pancakes",
        span: #0 bytes(95..103)
    },
    data: Struct(
        DataStruct {
            struct_token: Struct,
            fields: Unit,
            semi_token: Some(
                Semi
            )
        }
    )
}
```

We’re calling `unwrap` to cause the `hello_macro_derive` function to panic if the call to the `syn::parse` function fails here. It’s necessary for our procedural macro to panic on errors because `proc_macro_derive` functions must return `TokenStream` rather than `Result` to conform to the procedural macro API. We’ve simplified this example by using `unwrap`; in production code, you should provide more specific error messages about what went wrong by using `panic!` or `expect`.

Now that we have the code to turn the annotated Rust code from a `TokenStream` into a `DeriveInput` instance.

Filename: `hello_macro_derive/src/lib.rs`

```rust
fn impl_hello_macro(ast: &syn::DeriveInput) -> TokenStream {
    let name = &ast.ident;
    let gen = quote! {
        impl HelloMacro for #name {
            fn hello_macro() {
                println!("Hello, Macro! My name is {}", stringify!(#name));
            }
        }
    };
    gen.into()
}
```

The `name` variable will contain an `Ident` struct instance that, when printed, will be the string `"Pancakes"`.

The `quote!` macro lets us define the Rust code that we want to return. The compiler expects something different to the direct result of the `quote!` macro’s execution, so we need to convert it to a `TokenStream`. We do this by calling the `into` method, which consumes this intermediate representation and returns a value of the required `TokenStream` type.

The `stringify!` macro used here is built into Rust. It takes a Rust expression, such as `1 + 2`, and at compile time turns the expression into a string literal, such as `"1 + 2"`. Macros evaluate the expression and then turn the result into a `String`. There is a possibility that the `#name` input might be an expression to print literally, so we use `stringify!`. Using `stringify!` also saves an allocation by converting `#name` to a string literal at compile time.

At this point, `cargo build` should complete successfully in both `hello_macro` and `hello_macro_derive`. Create a new binary project  `cargo new pancakes`. Add `hello_macro` and `hello_macro_derive` as dependencies. If publishing  to [crates.io](https://crates.io/), they would be regular dependencies; if not, specify them as `path` dependencies:

```toml
[dependencies]
hello_macro = { path = "../hello_macro" }
hello_macro_derive = { path = "../hello_macro/hello_macro_derive" }
```

With the code *src/main.rs*, run `cargo run`: it should print `Hello, Macro! My name is Pancakes!` 

The code can be found [here](https://github.com/hscspring/Coding-Collections/tree/master/Rust/custommacro/).

#### 19-5-5 Attribute-like macros

Attribute-like macros are similar to custom derive macros, but instead of generating code for the `derive` attribute, they allow you to create new attributes. They’re also more flexible: `derive` only works for structs and enums; attributes can be applied to other items as well, such as functions.

```rust
#[route(GET, "/")]
fn index() {}
```

This `#[route]` attribute would be defined by the framework as a procedural macro. The signature of the macro definition function would look like this:

```rust
#[proc_macro_attribute]
pub fn route(attr: TokenStream, item: TokenStream) -> TokenStream {}
```

Here, we have two parameters of type `TokenStream`. The first is for the contents of the attribute: the `GET, "/"` part. The second is the body of the item the attribute is attached to: in this case, `fn index() {}` and the rest of the function’s body.

#### 19-5-6 Function-like macros

Function-like macros define macros that look like function calls. `macro_rules!` macros can be defined only using the match-like syntax. Function-like macros take a `TokenStream` parameter and their definition manipulates that `TokenStream` using Rust code as the other two types of procedural macros do. 

An example of a function-like macro is an `sql!` macro that might be called like so:

```rust
let sql = sql!(SELECT * FROM posts WHERE id=1);
```

This macro would parse the SQL statement inside it and check that it’s syntactically correct. The `sql!` macro would be defined like this:

```rust
#[proc_macro]
pub fn sql(input: TokenStream) -> TokenStream {}
```





