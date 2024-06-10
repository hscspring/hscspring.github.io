---
title: The Rust Programming Language Brief Note (Vol1-Basic)
date: 2019-12-31 12:00:00
categories: Coding
tags: [Rust]
---

<div class="toc"><ul class="toc-item"><li><span><a href="#1-Getting-Started" data-toc-modified-id="1-Getting-Started-1">1 Getting Started</a></span></li><li><span><a href="#3-Common-Concepts" data-toc-modified-id="3-Common-Concepts-2">3 Common Concepts</a></span><ul class="toc-item"><li><span><a href="#3-1-Variables-and-Mutability" data-toc-modified-id="3-1-Variables-and-Mutability-2.1">3-1 Variables and Mutability</a></span><ul class="toc-item"><li><span><a href="#3-1-1-Variables-and-Constants" data-toc-modified-id="3-1-1-Variables-and-Constants-2.1.1">3-1-1 Variables and Constants</a></span></li><li><span><a href="#3-1-2-Shadowing" data-toc-modified-id="3-1-2-Shadowing-2.1.2">3-1-2 Shadowing</a></span></li></ul></li><li><span><a href="#3-2-Data-Types" data-toc-modified-id="3-2-Data-Types-2.2">3-2 Data Types</a></span><ul class="toc-item"><li><span><a href="#3-2-1-Scalar" data-toc-modified-id="3-2-1-Scalar-2.2.1">3-2-1 Scalar</a></span><ul class="toc-item"><li><span><a href="#3-2-1-1-Integer" data-toc-modified-id="3-2-1-1-Integer-2.2.1.1">3-2-1-1 Integer</a></span></li><li><span><a href="#3-2-1-2-Numeric" data-toc-modified-id="3-2-1-2-Numeric-2.2.1.2">3-2-1-2 Numeric</a></span></li><li><span><a href="#3-2-1-3-Boolean" data-toc-modified-id="3-2-1-3-Boolean-2.2.1.3">3-2-1-3 Boolean</a></span></li><li><span><a href="#3-2-1-4-Character" data-toc-modified-id="3-2-1-4-Character-2.2.1.4">3-2-1-4 Character</a></span></li></ul></li><li><span><a href="#3-2-2-Compound-Types" data-toc-modified-id="3-2-2-Compound-Types-2.2.2">3-2-2 Compound Types</a></span><ul class="toc-item"><li><span><a href="#3-2-2-1-Tuple" data-toc-modified-id="3-2-2-1-Tuple-2.2.2.1">3-2-2-1 Tuple</a></span></li><li><span><a href="#3-2-2-2-Array" data-toc-modified-id="3-2-2-2-Array-2.2.2.2">3-2-2-2 Array</a></span></li></ul></li></ul></li><li><span><a href="#3-3-Functions" data-toc-modified-id="3-3-Functions-2.3">3-3 Functions</a></span><ul class="toc-item"><li><span><a href="#3-3-1-Parameters" data-toc-modified-id="3-3-1-Parameters-2.3.1">3-3-1 Parameters</a></span></li><li><span><a href="#3-3-2-Statements-and-Expressions" data-toc-modified-id="3-3-2-Statements-and-Expressions-2.3.2">3-3-2 Statements and Expressions</a></span></li><li><span><a href="#3-3-3-Return-Values" data-toc-modified-id="3-3-3-Return-Values-2.3.3">3-3-3 Return Values</a></span></li></ul></li><li><span><a href="#3-4-Control-Flow" data-toc-modified-id="3-4-Control-Flow-2.4">3-4 Control Flow</a></span><ul class="toc-item"><li><span><a href="#3.4.1-if" data-toc-modified-id="3.4.1-if-2.4.1">3.4.1 if</a></span></li><li><span><a href="#3-4-2-Repetition" data-toc-modified-id="3-4-2-Repetition-2.4.2">3-4-2 Repetition</a></span><ul class="toc-item"><li><span><a href="#3-4-2-1-loop" data-toc-modified-id="3-4-2-1-loop-2.4.2.1">3-4-2-1 loop</a></span></li><li><span><a href="#3-4-2-2-while" data-toc-modified-id="3-4-2-2-while-2.4.2.2">3-4-2-2 while</a></span></li><li><span><a href="#3-4-2-3-for" data-toc-modified-id="3-4-2-3-for-2.4.2.3">3-4-2-3 for</a></span></li></ul></li></ul></li></ul></li><li><span><a href="#4-Understanding-Ownership" data-toc-modified-id="4-Understanding-Ownership-3">4 Understanding Ownership</a></span><ul class="toc-item"><li><span><a href="#4-1-What-Is-Ownership?" data-toc-modified-id="4-1-What-Is-Ownership?-3.1">4-1 What Is Ownership?</a></span><ul class="toc-item"><li><span><a href="#4-1-1-Ownership-Rules" data-toc-modified-id="4-1-1-Ownership-Rules-3.1.1">4-1-1 Ownership Rules</a></span></li><li><span><a href="#4-1-2-Variable-Scope" data-toc-modified-id="4-1-2-Variable-Scope-3.1.2">4-1-2 Variable Scope</a></span></li><li><span><a href="#4-1-3-The-String-Type" data-toc-modified-id="4-1-3-The-String-Type-3.1.3">4-1-3 The String Type</a></span></li><li><span><a href="#4-1-4-Memory-and-Allocation" data-toc-modified-id="4-1-4-Memory-and-Allocation-3.1.4">4-1-4 Memory and Allocation</a></span><ul class="toc-item"><li><span><a href="#4-1-4-1-Move" data-toc-modified-id="4-1-4-1-Move-3.1.4.1">4-1-4-1 Move</a></span></li><li><span><a href="#4-1-4-2-Clone" data-toc-modified-id="4-1-4-2-Clone-3.1.4.2">4-1-4-2 Clone</a></span></li><li><span><a href="#4-1-4-3-Copy" data-toc-modified-id="4-1-4-3-Copy-3.1.4.3">4-1-4-3 Copy</a></span></li></ul></li><li><span><a href="#4-1-5-Ownership-and-Functions" data-toc-modified-id="4-1-5-Ownership-and-Functions-3.1.5">4-1-5 Ownership and Functions</a></span></li><li><span><a href="#4-1-6-Return-Values-and-Scope" data-toc-modified-id="4-1-6-Return-Values-and-Scope-3.1.6">4-1-6 Return Values and Scope</a></span></li></ul></li><li><span><a href="#4-2-References-and-Borrowing" data-toc-modified-id="4-2-References-and-Borrowing-3.2">4-2 References and Borrowing</a></span><ul class="toc-item"><li><span><a href="#4-2-1-Mutable-References" data-toc-modified-id="4-2-1-Mutable-References-3.2.1">4-2-1 Mutable References</a></span></li><li><span><a href="#4-2-2-Dangling-References" data-toc-modified-id="4-2-2-Dangling-References-3.2.2">4-2-2 Dangling References</a></span></li></ul></li><li><span><a href="#4-3-The-Slice-Type" data-toc-modified-id="4-3-The-Slice-Type-3.3">4-3 The Slice Type</a></span><ul class="toc-item"><li><span><a href="#4-3-1-String-Slices" data-toc-modified-id="4-3-1-String-Slices-3.3.1">4-3-1 String Slices</a></span><ul class="toc-item"><li><span><a href="#4-3-1-1-String-Literals-Are-Slices" data-toc-modified-id="4-3-1-1-String-Literals-Are-Slices-3.3.1.1">4-3-1-1 String Literals Are Slices</a></span></li><li><span><a href="#4-3-1-2-String-Slices-as-Parameters" data-toc-modified-id="4-3-1-2-String-Slices-as-Parameters-3.3.1.2">4-3-1-2 String Slices as Parameters</a></span></li></ul></li><li><span><a href="#4-3-2-Other-Slices" data-toc-modified-id="4-3-2-Other-Slices-3.3.2">4-3-2 Other Slices</a></span></li></ul></li></ul></li><li><span><a href="#5-Using-Structs-to-Structure-Related-Data" data-toc-modified-id="5-Using-Structs-to-Structure-Related-Data-4">5 Using Structs to Structure Related Data</a></span><ul class="toc-item"><li><span><a href="#5-1-Defining-and-Instantiating-Structs" data-toc-modified-id="5-1-Defining-and-Instantiating-Structs-4.1">5-1 Defining and Instantiating Structs</a></span><ul class="toc-item"><li><span><a href="#5-1-1-Using-the-Field-Init-Shorthand-When-Variables-and-Fields-Have-the-Same-Name" data-toc-modified-id="5-1-1-Using-the-Field-Init-Shorthand-When-Variables-and-Fields-Have-the-Same-Name-4.1.1">5-1-1 Using the Field Init Shorthand When Variables and Fields Have the Same Name</a></span></li><li><span><a href="#5-1-2-Creating-Instances-From-Other-Instances-With-Struct-Update-Syntax" data-toc-modified-id="5-1-2-Creating-Instances-From-Other-Instances-With-Struct-Update-Syntax-4.1.2">5-1-2 Creating Instances From Other Instances With Struct Update Syntax</a></span></li><li><span><a href="#5-1-3-Using-Tuple-Structs-without-Named-Fields-to-Create-Different-Types" data-toc-modified-id="5-1-3-Using-Tuple-Structs-without-Named-Fields-to-Create-Different-Types-4.1.3">5-1-3 Using Tuple Structs without Named Fields to Create Different Types</a></span></li><li><span><a href="#5-1-4-Unit-Like-Structs-Without-Any-Fields" data-toc-modified-id="5-1-4-Unit-Like-Structs-Without-Any-Fields-4.1.4">5-1-4 Unit-Like Structs Without Any Fields</a></span></li><li><span><a href="#5-1-5-Ownership-of-Struct-Data" data-toc-modified-id="5-1-5-Ownership-of-Struct-Data-4.1.5">5-1-5 Ownership of Struct Data</a></span></li></ul></li><li><span><a href="#5-2-An-Example-Program-Using-Structs" data-toc-modified-id="5-2-An-Example-Program-Using-Structs-4.2">5-2 An Example Program Using Structs</a></span><ul class="toc-item"><li><span><a href="#5-2-1-Refactoring-with-Tuples" data-toc-modified-id="5-2-1-Refactoring-with-Tuples-4.2.1">5-2-1 Refactoring with Tuples</a></span></li><li><span><a href="#5-2-2-Refactoring-with-Structs-Adding-More-Meaning" data-toc-modified-id="5-2-2-Refactoring-with-Structs-Adding-More-Meaning-4.2.2">5-2-2 Refactoring with Structs Adding More Meaning</a></span></li><li><span><a href="#5-2-3-Adding-Useful-Functionality-with-Derived-Traits" data-toc-modified-id="5-2-3-Adding-Useful-Functionality-with-Derived-Traits-4.2.3">5-2-3 Adding Useful Functionality with Derived Traits</a></span></li></ul></li><li><span><a href="#5-3-Method-Syntax" data-toc-modified-id="5-3-Method-Syntax-4.3">5-3 Method Syntax</a></span><ul class="toc-item"><li><span><a href="#5-3-1-Defining-Methods" data-toc-modified-id="5-3-1-Defining-Methods-4.3.1">5-3-1 Defining Methods</a></span></li><li><span><a href="#5-3-2-Methods-with-More-Parameters" data-toc-modified-id="5-3-2-Methods-with-More-Parameters-4.3.2">5-3-2 Methods with More Parameters</a></span></li><li><span><a href="#5-3-3-Associated-Functions" data-toc-modified-id="5-3-3-Associated-Functions-4.3.3">5-3-3 Associated Functions</a></span></li><li><span><a href="#5-3-4-Multiple-impl-Blocks" data-toc-modified-id="5-3-4-Multiple-impl-Blocks-4.3.4">5-3-4 Multiple impl Blocks</a></span></li></ul></li></ul></li><li><span><a href="#6-Enums-and-Pattern-Matching" data-toc-modified-id="6-Enums-and-Pattern-Matching-5">6 Enums and Pattern Matching</a></span><ul class="toc-item"><li><span><a href="#6-1-Defining-an-Enum" data-toc-modified-id="6-1-Defining-an-Enum-5.1">6-1 Defining an Enum</a></span><ul class="toc-item"><li><span><a href="#6-1-1-Enum-Values" data-toc-modified-id="6-1-1-Enum-Values-5.1.1">6-1-1 Enum Values</a></span></li><li><span><a href="#6-1-2-The-Option-Enum-and-Its-Advantages-Over-Null-Vlues" data-toc-modified-id="6-1-2-The-Option-Enum-and-Its-Advantages-Over-Null-Vlues-5.1.2">6-1-2 The Option Enum and Its Advantages Over Null Vlues</a></span></li></ul></li><li><span><a href="#6-2-The-match-Control-Flow-Operator" data-toc-modified-id="6-2-The-match-Control-Flow-Operator-5.2">6-2 The match Control Flow Operator</a></span><ul class="toc-item"><li><span><a href="#6-2-1-Patterns-that-Bind-to-Values" data-toc-modified-id="6-2-1-Patterns-that-Bind-to-Values-5.2.1">6-2-1 Patterns that Bind to Values</a></span></li><li><span><a href="#6-2-2-Matching-with-Option<T>" data-toc-modified-id="6-2-2-Matching-with-Option<T>-5.2.2">6-2-2 Matching with <code>Option&lt;T&gt;</code></a></span></li><li><span><a href="#6-2-3-Matches-Are-Exhaustive" data-toc-modified-id="6-2-3-Matches-Are-Exhaustive-5.2.3">6-2-3 Matches Are Exhaustive</a></span></li><li><span><a href="#6-2-4-The-_-Placeholder" data-toc-modified-id="6-2-4-The-_-Placeholder-5.2.4">6-2-4 The <code>_</code> Placeholder</a></span></li></ul></li><li><span><a href="#6-3-Concise-Control-Flow-with-if-let" data-toc-modified-id="6-3-Concise-Control-Flow-with-if-let-5.3">6-3 Concise Control Flow with if let</a></span></li></ul></li><li><span><a href="#8-Common-Collections" data-toc-modified-id="8-Common-Collections-6">8 Common Collections</a></span><ul class="toc-item"><li><span><a href="#8-1-Storing-Lists-of-Values-with-Vectors" data-toc-modified-id="8-1-Storing-Lists-of-Values-with-Vectors-6.1">8-1 Storing Lists of Values with Vectors</a></span><ul class="toc-item"><li><span><a href="#8-1-1-Create-a-New-Vector" data-toc-modified-id="8-1-1-Create-a-New-Vector-6.1.1">8-1-1 Create a New Vector</a></span></li><li><span><a href="#8-1-2-Updating-a-Vector" data-toc-modified-id="8-1-2-Updating-a-Vector-6.1.2">8-1-2 Updating a Vector</a></span></li><li><span><a href="#8-1-3-Dropping-a-Vector-Drops-Its-Elements" data-toc-modified-id="8-1-3-Dropping-a-Vector-Drops-Its-Elements-6.1.3">8-1-3 Dropping a Vector Drops Its Elements</a></span></li><li><span><a href="#8-1-4-Reading-Elements-of-Vectors" data-toc-modified-id="8-1-4-Reading-Elements-of-Vectors-6.1.4">8-1-4 Reading Elements of Vectors</a></span></li><li><span><a href="#8-1-5-Iterating-over-the-Values-in-a-Vector" data-toc-modified-id="8-1-5-Iterating-over-the-Values-in-a-Vector-6.1.5">8-1-5 Iterating over the Values in a Vector</a></span></li><li><span><a href="#8-1-6-Using-an-Enum-to-Store-Multiple-Types" data-toc-modified-id="8-1-6-Using-an-Enum-to-Store-Multiple-Types-6.1.6">8-1-6 Using an Enum to Store Multiple Types</a></span></li></ul></li><li><span><a href="#8-2-Storing-UTF-8-Encoded-Text-with-Strings" data-toc-modified-id="8-2-Storing-UTF-8-Encoded-Text-with-Strings-6.2">8-2 Storing UTF-8 Encoded Text with Strings</a></span><ul class="toc-item"><li><span><a href="#8-2-1-What-Is-a-String?" data-toc-modified-id="8-2-1-What-Is-a-String?-6.2.1">8-2-1 What Is a String?</a></span></li><li><span><a href="#8-2-2-Creating-a-New-String" data-toc-modified-id="8-2-2-Creating-a-New-String-6.2.2">8-2-2 Creating a New String</a></span></li><li><span><a href="#8-2-3-Updating-a-String" data-toc-modified-id="8-2-3-Updating-a-String-6.2.3">8-2-3 Updating a String</a></span><ul class="toc-item"><li><span><a href="#8-2-3-1-Appending-to-a-String-with-push_str-and-push" data-toc-modified-id="8-2-3-1-Appending-to-a-String-with-push_str-and-push-6.2.3.1">8-2-3-1 Appending to a String with <code>push_str</code> and <code>push</code></a></span></li><li><span><a href="#8-2-3-2-Concatenation-with-the-+-Operator-or-the-format!-Macro" data-toc-modified-id="8-2-3-2-Concatenation-with-the-+-Operator-or-the-format!-Macro-6.2.3.2">8-2-3-2 Concatenation with the <code>+</code> Operator or the <code>format!</code> Macro</a></span></li></ul></li><li><span><a href="#8-2-4-Indexing-into-Strings" data-toc-modified-id="8-2-4-Indexing-into-Strings-6.2.4">8-2-4 Indexing into Strings</a></span><ul class="toc-item"><li><span><a href="#8-2-4-1-Internal-Representation" data-toc-modified-id="8-2-4-1-Internal-Representation-6.2.4.1">8-2-4-1 Internal Representation</a></span></li><li><span><a href="#8-2-4-2-Bytes-and-Scalar-Values-and-Grapheme-Clusters" data-toc-modified-id="8-2-4-2-Bytes-and-Scalar-Values-and-Grapheme-Clusters-6.2.4.2">8-2-4-2 Bytes and Scalar Values and Grapheme Clusters</a></span></li></ul></li><li><span><a href="#8-2-5-Slicing-Strings" data-toc-modified-id="8-2-5-Slicing-Strings-6.2.5">8-2-5 Slicing Strings</a></span></li><li><span><a href="#8-2-6-Methods-for-Iterating-Over-Strings" data-toc-modified-id="8-2-6-Methods-for-Iterating-Over-Strings-6.2.6">8-2-6 Methods for Iterating Over Strings</a></span></li><li><span><a href="#8-2-7-Exercise" data-toc-modified-id="8-2-7-Exercise-6.2.7">8-2-7 Exercise</a></span></li></ul></li><li><span><a href="#8-3-Storing-Keys-with-Associated-Values-in-Hash-Maps" data-toc-modified-id="8-3-Storing-Keys-with-Associated-Values-in-Hash-Maps-6.3">8-3 Storing Keys with Associated Values in Hash Maps</a></span><ul class="toc-item"><li><span><a href="#8-3-1-Creating-a-New-Hash-Map" data-toc-modified-id="8-3-1-Creating-a-New-Hash-Map-6.3.1">8-3-1 Creating a New Hash Map</a></span></li><li><span><a href="#8-3-2-Hash-Maps-and-Ownership" data-toc-modified-id="8-3-2-Hash-Maps-and-Ownership-6.3.2">8-3-2 Hash Maps and Ownership</a></span></li><li><span><a href="#8-3-3-Accessing-Values-in-a-Hash-Map" data-toc-modified-id="8-3-3-Accessing-Values-in-a-Hash-Map-6.3.3">8-3-3 Accessing Values in a Hash Map</a></span></li><li><span><a href="#8-3-4-Updating-a-Hash-Map" data-toc-modified-id="8-3-4-Updating-a-Hash-Map-6.3.4">8-3-4 Updating a Hash Map</a></span><ul class="toc-item"><li><span><a href="#8-3-4-1-Overwriting-a-Value" data-toc-modified-id="8-3-4-1-Overwriting-a-Value-6.3.4.1">8-3-4-1 Overwriting a Value</a></span></li><li><span><a href="#8-3-4-2-Only-Inserting-a-Value-If-the-Key-Has-No-Value" data-toc-modified-id="8-3-4-2-Only-Inserting-a-Value-If-the-Key-Has-No-Value-6.3.4.2">8-3-4-2 Only Inserting a Value If the Key Has No Value</a></span></li><li><span><a href="#8-3-4-3-Updating-a-Value-Based-on-the-Old-Value" data-toc-modified-id="8-3-4-3-Updating-a-Value-Based-on-the-Old-Value-6.3.4.3">8-3-4-3 Updating a Value Based on the Old Value</a></span></li></ul></li><li><span><a href="#8-3-5-Hashing-Functions" data-toc-modified-id="8-3-5-Hashing-Functions-6.3.5">8-3-5 Hashing Functions</a></span></li></ul></li></ul></li><li><span><a href="#9-Error-Handling" data-toc-modified-id="9-Error-Handling-7">9 Error Handling</a></span><ul class="toc-item"><li><span><a href="#9-1-Unrecoverable-Errors-with-panic!" data-toc-modified-id="9-1-Unrecoverable-Errors-with-panic!-7.1">9-1 Unrecoverable Errors with <code>panic!</code></a></span><ul class="toc-item"><li><span><a href="#9-1-1-Using-a-panic!-Backtrace" data-toc-modified-id="9-1-1-Using-a-panic!-Backtrace-7.1.1">9-1-1 Using a <code>panic!</code> Backtrace</a></span></li></ul></li><li><span><a href="#9-2-Recoverable-Errors-with-Result" data-toc-modified-id="9-2-Recoverable-Errors-with-Result-7.2">9-2 Recoverable Errors with Result</a></span><ul class="toc-item"><li><span><a href="#9-2-1-Matching-on-Different-Errors" data-toc-modified-id="9-2-1-Matching-on-Different-Errors-7.2.1">9-2-1 Matching on Different Errors</a></span></li><li><span><a href="#9-2-2-Shortcuts-for-Panic-on-Error-unwrap-and-expect" data-toc-modified-id="9-2-2-Shortcuts-for-Panic-on-Error-unwrap-and-expect-7.2.2">9-2-2 Shortcuts for Panic on Error <code>unwrap</code> and <code>expect</code></a></span></li><li><span><a href="#9-2-3-Propagating-Errors" data-toc-modified-id="9-2-3-Propagating-Errors-7.2.3">9-2-3 Propagating Errors</a></span></li><li><span><a href="#9-2-4-A-Shortcut-for-Propagating-Errors-the-?-Operator" data-toc-modified-id="9-2-4-A-Shortcut-for-Propagating-Errors-the-?-Operator-7.2.4">9-2-4 A Shortcut for Propagating Errors the <code>?</code> Operator</a></span></li><li><span><a href="#9-2-5-The-?-Operator-Can-Only-Be-Used-in-Functions-That-Return-Result" data-toc-modified-id="9-2-5-The-?-Operator-Can-Only-Be-Used-in-Functions-That-Return-Result-7.2.5">9-2-5 The <code>?</code> Operator Can Only Be Used in Functions That Return <code>Result</code></a></span></li></ul></li><li><span><a href="#9-3-To-panic!-or-Not-to-panic!" data-toc-modified-id="9-3-To-panic!-or-Not-to-panic!-7.3">9-3 To <code>panic!</code> or Not to <code>panic!</code></a></span><ul class="toc-item"><li><span><a href="#9-3-1-Examples-Prototype-Code-and-Tests" data-toc-modified-id="9-3-1-Examples-Prototype-Code-and-Tests-7.3.1">9-3-1 Examples Prototype Code and Tests</a></span></li><li><span><a href="#9-3-2-Cases-in-Which-You-Have-More-Information-Than-the-Compiler" data-toc-modified-id="9-3-2-Cases-in-Which-You-Have-More-Information-Than-the-Compiler-7.3.2">9-3-2 Cases in Which You Have More Information Than the Compiler</a></span></li><li><span><a href="#9-3-3-Guidelines-for-Error-Handling" data-toc-modified-id="9-3-3-Guidelines-for-Error-Handling-7.3.3">9-3-3 Guidelines for Error Handling</a></span></li><li><span><a href="#9-3-4-Creating-Custom-Types-for-Validation" data-toc-modified-id="9-3-4-Creating-Custom-Types-for-Validation-7.3.4">9-3-4 Creating Custom Types for Validation</a></span></li></ul></li></ul></li><li><span><a href="#10-Generic-Types,-Traits,-and-Lifetimes" data-toc-modified-id="10-Generic-Types,-Traits,-and-Lifetimes-8">10 Generic Types, Traits, and Lifetimes</a></span><ul class="toc-item"><li><span><a href="#10-1-Generic-Data-Types" data-toc-modified-id="10-1-Generic-Data-Types-8.1">10-1 Generic Data Types</a></span><ul class="toc-item"><li><span><a href="#10-1-1-In-Function-Definitions" data-toc-modified-id="10-1-1-In-Function-Definitions-8.1.1">10-1-1 In Function Definitions</a></span></li><li><span><a href="#10-1-2-In-Struct-Definitions" data-toc-modified-id="10-1-2-In-Struct-Definitions-8.1.2">10-1-2 In Struct Definitions</a></span></li><li><span><a href="#10-1-3-In-Enum-Definitions" data-toc-modified-id="10-1-3-In-Enum-Definitions-8.1.3">10-1-3 In Enum Definitions</a></span></li><li><span><a href="#10-1-4-In-Method-Definitions" data-toc-modified-id="10-1-4-In-Method-Definitions-8.1.4">10-1-4 In Method Definitions</a></span></li><li><span><a href="#10-1-5-Performance-of-Code-Using-Generics" data-toc-modified-id="10-1-5-Performance-of-Code-Using-Generics-8.1.5">10-1-5 Performance of Code Using Generics</a></span></li></ul></li><li><span><a href="#10-2-Traits-Defining-Shared-Behavior" data-toc-modified-id="10-2-Traits-Defining-Shared-Behavior-8.2">10-2 Traits Defining Shared Behavior</a></span><ul class="toc-item"><li><span><a href="#10-2-1-Defining-a-Trait" data-toc-modified-id="10-2-1-Defining-a-Trait-8.2.1">10-2-1 Defining a Trait</a></span></li><li><span><a href="#10-2-2-Implementing-a-Trait-on-a-Type" data-toc-modified-id="10-2-2-Implementing-a-Trait-on-a-Type-8.2.2">10-2-2 Implementing a Trait on a Type</a></span></li><li><span><a href="#10-2-3-Default-Implementations" data-toc-modified-id="10-2-3-Default-Implementations-8.2.3">10-2-3 Default Implementations</a></span></li><li><span><a href="#10-2-4-Traits-as-Parameters" data-toc-modified-id="10-2-4-Traits-as-Parameters-8.2.4">10-2-4 Traits as Parameters</a></span><ul class="toc-item"><li><span><a href="#10-2-4-1-Trait-Bound-Syntax" data-toc-modified-id="10-2-4-1-Trait-Bound-Syntax-8.2.4.1">10-2-4-1 Trait Bound Syntax</a></span></li><li><span><a href="#10-2-4-2-Specifying-Multiple-Trait-Bounds-with-+-Syntax" data-toc-modified-id="10-2-4-2-Specifying-Multiple-Trait-Bounds-with-+-Syntax-8.2.4.2">10-2-4-2 Specifying Multiple Trait Bounds with <code>+</code> Syntax</a></span></li><li><span><a href="#10-2-4-3-Clearer-Trait-Bounds-with-where-Clauses" data-toc-modified-id="10-2-4-3-Clearer-Trait-Bounds-with-where-Clauses-8.2.4.3">10-2-4-3 Clearer Trait Bounds with <code>where</code> Clauses</a></span></li></ul></li><li><span><a href="#10-2-5-Returning-Types-that-Implement-Traits" data-toc-modified-id="10-2-5-Returning-Types-that-Implement-Traits-8.2.5">10-2-5 Returning Types that Implement Traits</a></span></li><li><span><a href="#10-2-6-Fixing-the-largest-Function-with-Trait-Bounds" data-toc-modified-id="10-2-6-Fixing-the-largest-Function-with-Trait-Bounds-8.2.6">10-2-6 Fixing the <code>largest</code> Function with Trait Bounds</a></span></li><li><span><a href="#10-2-7-Using-Trait-Bounds-to-Conditionally-Implement-Methods" data-toc-modified-id="10-2-7-Using-Trait-Bounds-to-Conditionally-Implement-Methods-8.2.7">10-2-7 Using Trait Bounds to Conditionally Implement Methods</a></span></li></ul></li><li><span><a href="#10-3-Validating-References-with-Lifetimes" data-toc-modified-id="10-3-Validating-References-with-Lifetimes-8.3">10-3 Validating References with Lifetimes</a></span><ul class="toc-item"><li><span><a href="#10-3-1-Preventing-Dangling-References-with-Lifetimes" data-toc-modified-id="10-3-1-Preventing-Dangling-References-with-Lifetimes-8.3.1">10-3-1 Preventing Dangling References with Lifetimes</a></span></li><li><span><a href="#10-3-2-The-Borrow-Checker" data-toc-modified-id="10-3-2-The-Borrow-Checker-8.3.2">10-3-2 The Borrow Checker</a></span></li><li><span><a href="#10-3-3-Generic-Lifetimes-in-Functions" data-toc-modified-id="10-3-3-Generic-Lifetimes-in-Functions-8.3.3">10-3-3 Generic Lifetimes in Functions</a></span></li><li><span><a href="#10-3-4-Lifetime-Annotation-Syntax" data-toc-modified-id="10-3-4-Lifetime-Annotation-Syntax-8.3.4">10-3-4 Lifetime Annotation Syntax</a></span></li><li><span><a href="#10-3-5-Lifetime-Annotations-in-Function-Signatures" data-toc-modified-id="10-3-5-Lifetime-Annotations-in-Function-Signatures-8.3.5">10-3-5 Lifetime Annotations in Function Signatures</a></span></li><li><span><a href="#10-3-6-Thinking-in-Terms-of-Lifetimes" data-toc-modified-id="10-3-6-Thinking-in-Terms-of-Lifetimes-8.3.6">10-3-6 Thinking in Terms of Lifetimes</a></span></li><li><span><a href="#10-3-7-Lifetime-Annotations-in-Struct-Definitions" data-toc-modified-id="10-3-7-Lifetime-Annotations-in-Struct-Definitions-8.3.7">10-3-7 Lifetime Annotations in Struct Definitions</a></span></li><li><span><a href="#10-3-8-Lifetime-Elision" data-toc-modified-id="10-3-8-Lifetime-Elision-8.3.8">10-3-8 Lifetime Elision</a></span></li><li><span><a href="#10-3-9-Lifetime-Annotations-in-Method-Definitions" data-toc-modified-id="10-3-9-Lifetime-Annotations-in-Method-Definitions-8.3.9">10-3-9 Lifetime Annotations in Method Definitions</a></span></li><li><span><a href="#10-3-10-The-Static-Lifetime" data-toc-modified-id="10-3-10-The-Static-Lifetime-8.3.10">10-3-10 The Static Lifetime</a></span></li></ul></li><li><span><a href="#10-4-Generic-Type-Parameters-Trait-Bounds-and-Lifetimes-Together" data-toc-modified-id="10-4-Generic-Type-Parameters-Trait-Bounds-and-Lifetimes-Together-8.4">10-4 Generic Type Parameters Trait Bounds and Lifetimes Together</a></span></li></ul></li><li><span><a href="#11-Writing-Automated-Tests" data-toc-modified-id="11-Writing-Automated-Tests-9">11 Writing Automated Tests</a></span><ul class="toc-item"><li><span><a href="#11-1-How-to-Write-Tests" data-toc-modified-id="11-1-How-to-Write-Tests-9.1">11-1 How to Write Tests</a></span><ul class="toc-item"><li><span><a href="#11-1-1-The-Anatomy-of-a-Test-Function" data-toc-modified-id="11-1-1-The-Anatomy-of-a-Test-Function-9.1.1">11-1-1 The Anatomy of a Test Function</a></span></li><li><span><a href="#11-1-2-Checking-Results-with-the-assert!-Macro" data-toc-modified-id="11-1-2-Checking-Results-with-the-assert!-Macro-9.1.2">11-1-2 Checking Results with the <code>assert!</code> Macro</a></span></li><li><span><a href="#11-1-3-Testing-Equality-with-the-assert_eq!-and-assert_ne!-Macros" data-toc-modified-id="11-1-3-Testing-Equality-with-the-assert_eq!-and-assert_ne!-Macros-9.1.3">11-1-3 Testing Equality with the <code>assert_eq!</code> and <code>assert_ne!</code> Macros</a></span></li><li><span><a href="#11-1-4-Adding-Custom-Failure-Messages" data-toc-modified-id="11-1-4-Adding-Custom-Failure-Messages-9.1.4">11-1-4 Adding Custom Failure Messages</a></span></li><li><span><a href="#11-1-5-Checking-for-Panics-with-should_panic" data-toc-modified-id="11-1-5-Checking-for-Panics-with-should_panic-9.1.5">11-1-5 Checking for Panics with <code>should_panic</code></a></span></li><li><span><a href="#11-1-6-Using-Result<T,-E>-in-Tests" data-toc-modified-id="11-1-6-Using-Result<T,-E>-in-Tests-9.1.6">11-1-6 Using <code>Result&lt;T, E&gt;</code> in Tests</a></span></li></ul></li><li><span><a href="#11-2-Controlling-How-Tests-Are-Run" data-toc-modified-id="11-2-Controlling-How-Tests-Are-Run-9.2">11-2 Controlling How Tests Are Run</a></span><ul class="toc-item"><li><span><a href="#11-2-1-Running-Tests-in-Parallel-or-Consecutively" data-toc-modified-id="11-2-1-Running-Tests-in-Parallel-or-Consecutively-9.2.1">11-2-1 Running Tests in Parallel or Consecutively</a></span></li><li><span><a href="#11-2-2-Showing-Function-Output" data-toc-modified-id="11-2-2-Showing-Function-Output-9.2.2">11-2-2 Showing Function Output</a></span></li><li><span><a href="#11-2-3-Running-a-Subset-of-Tests-by-Name" data-toc-modified-id="11-2-3-Running-a-Subset-of-Tests-by-Name-9.2.3">11-2-3 Running a Subset of Tests by Name</a></span></li><li><span><a href="#11-2-4-Ignoring-Some-Tests-Unless-Specifically-Requested" data-toc-modified-id="11-2-4-Ignoring-Some-Tests-Unless-Specifically-Requested-9.2.4">11-2-4 Ignoring Some Tests Unless Specifically Requested</a></span></li></ul></li><li><span><a href="#11-3-Test-Organization" data-toc-modified-id="11-3-Test-Organization-9.3">11-3 Test Organization</a></span><ul class="toc-item"><li><span><a href="#11-3-1-Unit-Tests" data-toc-modified-id="11-3-1-Unit-Tests-9.3.1">11-3-1 Unit Tests</a></span><ul class="toc-item"><li><span><a href="#11-3-1-1-The-Tests-Module-and-#[cfg(test)]" data-toc-modified-id="11-3-1-1-The-Tests-Module-and-#[cfg(test)]-9.3.1.1">11-3-1-1 The Tests Module and <code>#[cfg(test)]</code></a></span></li><li><span><a href="#11-3-1-2-Testing-Private-Functions" data-toc-modified-id="11-3-1-2-Testing-Private-Functions-9.3.1.2">11-3-1-2 Testing Private Functions</a></span></li></ul></li><li><span><a href="#11-3-2-Integration-Tests" data-toc-modified-id="11-3-2-Integration-Tests-9.3.2">11-3-2 Integration Tests</a></span><ul class="toc-item"><li><span><a href="#11-3-2-1-The-tests-Directory" data-toc-modified-id="11-3-2-1-The-tests-Directory-9.3.2.1">11-3-2-1 The tests Directory</a></span></li><li><span><a href="#11-3-2-2-Submodules-in-Integration-Tests" data-toc-modified-id="11-3-2-2-Submodules-in-Integration-Tests-9.3.2.2">11-3-2-2 Submodules in Integration Tests</a></span></li><li><span><a href="#11-3-2-3-Integration-Tests-for-Binary-Crates" data-toc-modified-id="11-3-2-3-Integration-Tests-for-Binary-Crates-9.3.2.3">11-3-2-3 Integration Tests for Binary Crates</a></span></li></ul></li></ul></li></ul></li><li><span><a href="#18-Patterns-and-Matching" data-toc-modified-id="18-Patterns-and-Matching-10">18 Patterns and Matching</a></span><ul class="toc-item"><li><span><a href="#18-1-All-the-Places-Patterns-Can-Be-Used" data-toc-modified-id="18-1-All-the-Places-Patterns-Can-Be-Used-10.1">18-1 All the Places Patterns Can Be Used</a></span><ul class="toc-item"><li><span><a href="#18-1-1-match-Arms" data-toc-modified-id="18-1-1-match-Arms-10.1.1">18-1-1 <code>match</code> Arms</a></span></li><li><span><a href="#18-1-2-Conditional-if-let-Expressions" data-toc-modified-id="18-1-2-Conditional-if-let-Expressions-10.1.2">18-1-2 Conditional <code>if let</code> Expressions</a></span></li><li><span><a href="#18-1-3-while-let-Conditional-Loops" data-toc-modified-id="18-1-3-while-let-Conditional-Loops-10.1.3">18-1-3 <code>while let</code> Conditional Loops</a></span></li><li><span><a href="#18-1-4-for-Loops" data-toc-modified-id="18-1-4-for-Loops-10.1.4">18-1-4 <code>for</code> Loops</a></span></li><li><span><a href="#18-1-5-let-Statements" data-toc-modified-id="18-1-5-let-Statements-10.1.5">18-1-5 <code>let</code> Statements</a></span></li><li><span><a href="#18-1-6-Function-Parameters" data-toc-modified-id="18-1-6-Function-Parameters-10.1.6">18-1-6 Function Parameters</a></span></li></ul></li><li><span><a href="#18-2-Refutability-Whether-a-Pattern-Might-Fail-to-Match" data-toc-modified-id="18-2-Refutability-Whether-a-Pattern-Might-Fail-to-Match-10.2">18-2 Refutability Whether a Pattern Might Fail to Match</a></span></li><li><span><a href="#18-3-Pattern-Syntax" data-toc-modified-id="18-3-Pattern-Syntax-10.3">18-3 Pattern Syntax</a></span><ul class="toc-item"><li><span><a href="#18-3-1-Matching-Literals" data-toc-modified-id="18-3-1-Matching-Literals-10.3.1">18-3-1 Matching Literals</a></span></li><li><span><a href="#18-3-2-Matching-Named-Variables" data-toc-modified-id="18-3-2-Matching-Named-Variables-10.3.2">18-3-2 Matching Named Variables</a></span></li><li><span><a href="#18-3-3-Multiple-Patterns" data-toc-modified-id="18-3-3-Multiple-Patterns-10.3.3">18-3-3 Multiple Patterns</a></span></li><li><span><a href="#18-3-4-Matching-Ranges-of-Values-with-..=" data-toc-modified-id="18-3-4-Matching-Ranges-of-Values-with-..=-10.3.4">18-3-4 Matching Ranges of Values with <code>..=</code></a></span></li><li><span><a href="#18-3-5-Destructuring-to-Break-Apart-Values" data-toc-modified-id="18-3-5-Destructuring-to-Break-Apart-Values-10.3.5">18-3-5 Destructuring to Break Apart Values</a></span><ul class="toc-item"><li><span><a href="#18-3-5-1-Destructuring-Structs" data-toc-modified-id="18-3-5-1-Destructuring-Structs-10.3.5.1">18-3-5-1 Destructuring Structs</a></span></li><li><span><a href="#18-3-5-2-Destructuring-Enums" data-toc-modified-id="18-3-5-2-Destructuring-Enums-10.3.5.2">18-3-5-2 Destructuring Enums</a></span></li><li><span><a href="#18-3-5-3-Destructuring-Nested-Structs-and-Enums" data-toc-modified-id="18-3-5-3-Destructuring-Nested-Structs-and-Enums-10.3.5.3">18-3-5-3 Destructuring Nested Structs and Enums</a></span></li><li><span><a href="#18-3-5-4-Destructuring-Structs-and-Tuples" data-toc-modified-id="18-3-5-4-Destructuring-Structs-and-Tuples-10.3.5.4">18-3-5-4 Destructuring Structs and Tuples</a></span></li></ul></li><li><span><a href="#18-3-6-Ignoring-Values-in-a-Pattern" data-toc-modified-id="18-3-6-Ignoring-Values-in-a-Pattern-10.3.6">18-3-6 Ignoring Values in a Pattern</a></span><ul class="toc-item"><li><span><a href="#18-3-6-1-Ignoring-an-Entire-Value-with-_" data-toc-modified-id="18-3-6-1-Ignoring-an-Entire-Value-with-_-10.3.6.1">18-3-6-1 Ignoring an Entire Value with <code>_</code></a></span></li><li><span><a href="#18-3-6-2-Ignoring-Parts-of-a-Value-with-a-Nested-_" data-toc-modified-id="18-3-6-2-Ignoring-Parts-of-a-Value-with-a-Nested-_-10.3.6.2">18-3-6-2 Ignoring Parts of a Value with a Nested <code>_</code></a></span></li><li><span><a href="#18-3-6-3-Ignoring-an-Unused-Variable-by-Starting-Its-Name-with-_" data-toc-modified-id="18-3-6-3-Ignoring-an-Unused-Variable-by-Starting-Its-Name-with-_-10.3.6.3">18-3-6-3 Ignoring an Unused Variable by Starting Its Name with <code>_</code></a></span></li><li><span><a href="#18-3-6-4-Ignoring-Remaining-Parts-of-a-Value-with-.." data-toc-modified-id="18-3-6-4-Ignoring-Remaining-Parts-of-a-Value-with-..-10.3.6.4">18-3-6-4 Ignoring Remaining Parts of a Value with <code>..</code></a></span></li></ul></li><li><span><a href="#18-3-7-Extra-Conditionals-with-Match-Guards" data-toc-modified-id="18-3-7-Extra-Conditionals-with-Match-Guards-10.3.7">18-3-7 Extra Conditionals with Match Guards</a></span></li><li><span><a href="#18-3-8-@-Bindings" data-toc-modified-id="18-3-8-@-Bindings-10.3.8">18-3-8 <code>@</code> Bindings</a></span></li></ul></li></ul></li></ul></div>
## 1 Getting Started

```bash
$ cargo new proj

// build
$ cargo build //dev
$ cargo check
// build result
$ ./target/debug/proj
// build + run
$ cargo run	

$ cargo build --release  //prod
```

<!--more-->

## 3 Common Concepts

```rust
// Raw identifiers
let r#fn = "this variable is named 'fn' even though that's a keyword";
// call a function named 'match'
r#match();
```

### 3-1 Variables and Mutability

```rust
let mut x = 5; // mutable
let x = 5; // imutable
```

#### 3-1-1 Variables and Constants

- `mut` is not allowed with constants (always immutable).

- using the `const` keyword instead of  `let`, and the type of the value *must* be annotated.

- Constants can be declared in any scope, including the global scope.
- Constants may be set only to a constant expression, not the result of a function call or any other value that could only be computed at runtime.

```rust
const MAX_POINTS: u32 = 100_000; // 100000
```

Constants are valid for the entire time a program runs, within the scope they were declared in.

#### 3-1-2 Shadowing

```rust
fn main() {
    let x = 5;
    let x = x + 1;
    let x = x * 2;
    println!("The value of x is: {}", x);
}
// The value of x is: 12
```

By using `let`, we can perform a few transformations on a value but have the variable be immutable after those transformations have been completed.

The other difference between `mut` and shadowing is that because we’re effectively creating a new variable when we use the `let` keyword again, we can change the type of the value but reuse the same name.

```rust
let spaces = "   ";
let spaces = spaces.len();

// compile-time error
let mut spaces = "   ";
spaces = spaces.len();
```

### 3-2 Data Types

Rust is a *statically typed* language, which means that it must know the types of all variables at compile time.

```rust
let guess: u32 = "42".parse().expect("Not a number!");
// u32 is the type
```

#### 3-2-1 Scalar

A *scalar* type represents a single value. 

##### 3-2-1-1 Integer

| Length  | Signed  | Unsigned |
| ------- | ------- | -------- |
| 8-bit   | `i8`    | `u8`     |
| 16-bit  | `i16`   | `u16`    |
| 32-bit  | `i32`   | `u32`    |
| 64-bit  | `i64`   | `u64`    |
| 128-bit | `i128`  | `u128`   |
| arch    | `isize` | `usize`  |

Each signed variant can store numbers from `-(2^{n - 1})` to `2^{n - 1} - 1` inclusive, where *n* is the number of bits that variant uses. Unsigned variants can store numbers from 0 to `2^{n - 1}`.

The `isize` and `usize` types depend on the kind of computer your program is running on.

##### 3-2-1-2 Numeric

Can not operate two different types of nums.

##### 3-2-1-3 Boolean

```rust
fn main() {
    let t = true;
    let f: bool = false; // with explicit type annotation
}
```

##### 3-2-1-4 Character

```rust
fn main() {
    let c = 'z'; // not " "
    let z = 'ℤ';
    let heart_eyed_cat = '😻';
}
```

Rust’s `char` type represents a Unicode Scalar Value. 

#### 3-2-2 Compound Types

##### 3-2-2-1 Tuple

```rust
fn main() {
    let tup: (i32, f64, u8) = (500, 6.4, 1);
    let (x, y, z) = tup;
    println!("The value of x y z is: {} {} {}", x, y, z);
    
    let x: (i32, f64, u8) = (500, 6.4, 1);
    let five_hundred = x.0;
    let six_point_four = x.1;
    let one = x.2;
}
```

##### 3-2-2-2 Array

Unlike a tuple, every element of an array must have the same type. Arrays have a **fixed length**, like tuples.

```rust
fn main() {
    let a = [1, 2, 3, 4, 5];
}
```

A vector is a similar collection type provided by the standard library that *is* allowed to grow or shrink in size. If not sure, use a vector. 

```rust
fn main() {
    let a: [i32; 5] = [1, 2, 3, 4, 5];
    let first = a[0];
}
```

The first (i32) is the type of each element. Since all elements have the same type, just list it once. 

After the semicolon, there’s a number that indicates the length of the array. 

### 3-3 Functions

#### 3-3-1 Parameters

```rust
fn main() {
    another_function(5, 6);
}

fn another_function(x: i32, y: i32) {
    println!("The value of x is: {}", x);
    println!("The value of y is: {}", y);
}
```

*must* declare the type of each parameter. 

#### 3-3-2 Statements and Expressions

Cannot write `x = y = 6` .

```rust
fn main() {
    let x = 5;
    let y = {
        let x = 3;
        x + 1
    };
    println!("The value of y is: {}", y);
}
// y=4
```

That value gets bound to `y` as part of the `let`statement. Note the `x + 1` line without `;` at the end. 

Expressions do not include `;`. If added it's a statement, which will then not return a value. 

#### 3-3-3 Return Values

Declare their type after an arrow (`->`). In Rust, the return value of the function is synonymous with the value of the final expression in the block of the body of a function. 

You can return early from a function by using the `return` keyword and specifying a value, but most functions return the last expression implicitly.

```rust
fn five() -> i32 {
    5 // also can be written to: `return 5`, `return 5;`
}

fn main() {
    let x = five();
    println!("The value of x is: {}", x);
}
```

### 3-4 Control Flow

#### 3.4.1 if

```rust
fn main() {
    let number = 6;
    if number % 4 == 0 {
        println!("number is divisible by 4");
    } else if number % 3 == 0 {
        println!("number is divisible by 3");
    } else {
        println!("number is not divisible by 4 or 3");
    }
}
```

The condition in this code *must* be a `bool`.

Rust only executes the block for the first true condition, and once it finds one, it doesn’t even check the rest.

Using too many `else if` expressions can clutter the code, so we use `match`.

```rust
fn main() {
    let condition = true;
    let number = if condition {
        5
    } else {
        6
    };
    println!("The value of number is: {}", number);
}
```

#### 3-4-2 Repetition

##### 3-4-2-1 loop

```rust
fn main() {
    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2;
        }
    };
    assert_eq!(result, 20);
}
```

##### 3-4-2-2 while

```rust
fn main() {
    let mut number = 3;
    while number != 0 {
        println!("{}!", number);
        number = number - 1;
    }
    println!("LIFTOFF!!!");
}
```

##### 3-4-2-3 for

```rust
fn main() {
    let a = [10, 20, 30, 40, 50];
    let mut index = 0;
    while index < 5 {
        println!("the value is: {}", a[index]);
        index = index + 1;
    }
}
```

This approach is error prone; we could cause the program to panic if the index length is incorrect. It’s also slow, because the compiler adds runtime code to perform the conditional check on every element on every iteration through the loop.

As a more concise alternative, you can use a `for` loop and execute some code for each item in a collection. 

```rust
fn main() {
    let a = [10, 20, 30, 40, 50];
    for element in a.iter() {
        println!("the value is: {}", element);
    }
}

fn main() {
    for number in (1..4).rev() {
        println!("{}!", number);
    }
    println!("LIFTOFF!!!");
}
// 3!
// 2!
// 1!
// LIFTOFF!!!
```

## 4 Understanding Ownership

### 4-1 What Is Ownership?

Rust uses a third approach: memory is managed through a system of ownership with a set of rules that the compiler checks at compile time. None of the ownership features slow down your program while it’s running.

> 堆和栈：
>
> - 栈：速度快（最上面的那个），大小固定；函数调用。
> - 堆：速度慢（指派空间，指针跳转）；减少堆上数据复制，及时清理未使用的数据。

#### 4-1-1 Ownership Rules

- Each value in Rust has a variable that’s called its *owner*.
- There can only be one owner at a time.
- When the owner goes out of scope, the value will be dropped.

#### 4-1-2 Variable Scope

```rust
{                      // s is not valid here, it’s not yet declared
    let s = "hello";   // s is valid from this point forward
    // do stuff with s
}  
```

#### 4-1-3 The String Type

```rust
let mut s = String::from("hello");
s.push_str(", world!"); // push_str() appends a literal to a String

println!("{}", s); // `hello, world!`
```

#### 4-1-4 Memory and Allocation

With the `String` type, in order to support a mutable, growable piece of text, we need to allocate an amount of memory on the heap, unknown at compile time, to hold the contents. This means:

- The memory must be requested from the operating system at runtime: when we call `String::from`, its implementation requests the memory it needs.
- Returning this memory to the operating system when we’re done with our `String`: the memory is automatically returned (use a function called `drop`) once the variable that owns it goes out of scope.

##### 4-1-4-1 Move

```rust
let s1 = String::from("hello");
let s2 = s1;
```

A `String` is made up of three parts: 

- a pointer to the memory that holds the contents of the string
- a length
- a capacity. 

This group of data is stored on the stack. On the right is the memory on the heap that holds the contents.

![String in memory](https://doc.rust-lang.org/book/img/trpl04-01.svg)

The length is how much memory, in bytes, the contents of the `String` is currently using. The capacity is the total amount of memory, in bytes, that the `String` has received from the operating system. 

When we assign `s1` to `s2`, the `String` data is copied, meaning we copy the pointer, the length, and the capacity that are on the stack. We do not copy the data on the heap that the pointer refers to. 

Both data pointers pointing to the same location. This is a problem: when `s2` and `s1` go out of scope, they will both try to free the same memory. This is known as a *double free* error and is one of the memory safety bugs. Freeing memory twice can lead to memory corruption, which can potentially lead to security vulnerabilities.

Instead of trying to copy the allocated memory, Rust let s1 invalid, so that we do not need to care s1 any more. That's a bit like "shallow copy", but in Rust we call it "move".

![s1 moved to s2](https://doc.rust-lang.org/book/img/trpl04-04.svg)

```rust
let s1 = String::from("hello");
let s2 = s1;

println!("{}, world!", s1); // s1 is invalid
// error[E0382]: use of moved value: `s1`
```

In addition, there’s a design choice that’s implied by this: Rust will **never automatically create “deep” copies** of your data. Therefore, any *automatic* copying can be assumed to be inexpensive in terms of runtime performance.

##### 4-1-4-2 Clone

If we *do* want to deeply copy the heap data of the `String`, not just the stack data, we can use a common method called `clone`. 

```rust
let s1 = String::from("hello");
let s2 = s1.clone();

println!("s1 = {}, s2 = {}", s1, s2);
```

##### 4-1-4-3 Copy

```rust
let x = 5;
let y = x;

println!("x = {}, y = {}", x, y);
```

Here, we don’t have a call to `clone`, but `x` is still valid and wasn’t moved into `y`.

The reason is that types such as integers that have a known size at compile time are stored entirely on the stack, so copies of the actual values are quick to make. There’s no difference between deep and shallow copying here, so calling `clone` wouldn’t do anything different from the usual shallow copying and we can leave it out.

As a general rule, any group of simple scalar values can be `Copy`, and nothing that requires allocation or is some form of resource is `Copy`. 

- All the integer types, such as `u32`.
- The Boolean type, `bool`, with values `true` and `false`.
- All the floating point types, such as `f64`.
- The character type, `char`.
- Tuples, if they only contain types that are also `Copy`. For example, `(i32, i32)` is `Copy`, but `(i32, String)` is not.

#### 4-1-5 Ownership and Functions

The semantics for passing a value to a function are similar to those for assigning a value to a variable. Passing a variable to a function will move or copy, just as assignment does.

```rust
fn main() {
    let s = String::from("hello");  // s comes into scope
    takes_ownership(s);             // s's value moves into the function...
                                    // ... and so is no longer valid here

    let x = 5;                      // x comes into scope
    makes_copy(x);                  // x would move into the function,
                                    // but i32 is Copy, so it’s okay to still
                                    // use x afterward
} // Here, x goes out of scope, then s. But because s's value was moved, nothing
  // special happens.

fn takes_ownership(some_string: String) { // some_string comes into scope
    println!("{}", some_string);
} // Here, some_string goes out of scope and `drop` is called. The backing
  // memory is freed.

fn makes_copy(some_integer: i32) { // some_integer comes into scope
    println!("{}", some_integer);
} // Here, some_integer goes out of scope. Nothing special happens.
```

#### 4-1-6 Return Values and Scope

Returning values can also transfer ownership.

```rust
fn main() {
    let s1 = gives_ownership();         // gives_ownership moves its return
                                        // value into s1
    let s2 = String::from("hello");     // s2 comes into scope
    let s3 = takes_and_gives_back(s2);  // s2 is moved into
                                        // takes_and_gives_back, which also
                                        // moves its return value into s3
} // Here, s3 goes out of scope and is dropped. s2 goes out of scope but was
  // moved, so nothing happens. s1 goes out of scope and is dropped.

fn gives_ownership() -> String {             // gives_ownership will move its
                                             // return value into the function
                                             // that calls it
    let some_string = String::from("hello"); // some_string comes into scope
    some_string                              // some_string is returned and
                                             // moves out to the calling function
}

// takes_and_gives_back will take a String and return one
fn takes_and_gives_back(a_string: String) -> String { // a_string comes into
                                                      // scope
    a_string  // a_string is returned and moves out to the calling function
}
```

It’s possible to return multiple values using a tuple.

```rust
fn main() {
    let s1 = String::from("hello");
    let (s2, len) = calculate_length(s1);
    println!("The length of '{}' is {}.", s2, len);
}

fn calculate_length(s: String) -> (String, usize) {
    let length = s.len(); // len() returns the length of a String
    (s, length)
}
```

But this is too much ceremony and a lot of work for a concept that should be common. Luckily for us, Rust has a feature for this concept, called *references*.

### 4-2 References and Borrowing

```rust
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize { // s is a reference to a String
    s.len()
} // Here, s goes out of scope. But because it does not have ownership of what
  // it refers to, nothing happens.
```

First, notice that all the tuple code in the variable declaration and the function return value is gone. Second, note that we pass `&s1` into `calculate_length` and, in its definition, we take `&String`rather than `String`. These ampersands are *references*, and they allow you to refer to some value without taking ownership of it.

![&String s pointing at String s1](https://doc.rust-lang.org/book/img/trpl04-05.svg)

The `&s1` syntax lets us create a reference that *refers* to the value of `s1` but does not own it. We call having references as function parameters *borrowing*. 

```rust
fn main() {
    let s = String::from("hello");
    change(&s);
}

fn change(some_string: &String) {
    some_string.push_str(", world");
}

// error[E0596]: cannot borrow immutable borrowed content `*some_string` as mutable
```

**Just as variables are immutable by default, so are references**. We’re not allowed to modify something we have a reference to.

#### 4-2-1 Mutable References

```rust
fn main() {
    let mut s = String::from("hello");
    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

First, we had to change `s` to be `mut`. Then we had to create a mutable reference with `&mut s` and accept a mutable reference with `some_string: &mut String`.

But mutable references have one big restriction: **you can have only one mutable reference to a particular piece of data in a particular scope**. 

```rust
let mut s = String::from("hello");

let r1 = &mut s;
let r2 = &mut s;

println!("{}, {}", r1, r2);

// error[E0499]: cannot borrow `s` as mutable more than once at a time
```

The benefit of having this restriction is that Rust can prevent data races at compile time. A *data race*is similar to a race condition and happens when these three behaviors occur:

- Two or more pointers access the same data at the same time.
- At least one of the pointers is being used to write to the data.
- There’s no mechanism being used to synchronize access to the data.

Data races cause undefined behavior and can be difficult to diagnose and fix when you’re trying to track them down at runtime; Rust prevents this problem from happening because it won’t even compile code with data races!

As always, we can use curly brackets to create a new scope, allowing for multiple mutable references, just not *simultaneous* ones:

```rust
let mut s = String::from("hello");

{
    let r1 = &mut s;

} // r1 goes out of scope here, so we can make a new reference with no problems.

let r2 = &mut s;
```

A similar rule exists for combining mutable and immutable references. This code results in an error:

```rust
let mut s = String::from("hello");

let r1 = &s; // no problem
let r2 = &s; // no problem
let r3 = &mut s; // BIG PROBLEM

println!("{}, {}, and {}", r1, r2, r3);

// error[E0502]: cannot borrow `s` as mutable because it is also borrowed as immutable
```

We *also* cannot have a mutable reference while we have an immutable one. However, multiple immutable references are okay because no one who is just reading the data has the ability to affect anyone else’s reading of the data.

#### 4-2-2 Dangling References

```rust
fn main() {
    let reference_to_nothing = dangle();
}

fn dangle() -> &String { // dangle returns a reference to a String

    let s = String::from("hello"); // s is a new String

    &s // we return a reference to the String, s
} // Here, s goes out of scope, and is dropped. Its memory goes away.
  // Danger!

// this function's return type contains a borrowed value, but there is no value
// for it to be borrowed from.
```

Because `s` is created inside `dangle`, when the code of `dangle` is finished, `s` will be deallocated. But we tried to return a reference to it. That means this reference would be pointing to an invalid `String`. 

### 4-3 The Slice Type

```rust
fn first_word(s: &String) -> usize {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return i;
        }
    }

    s.len()
}

fn main() {
    let mut s = String::from("hello world");
    let word = first_word(&s); // word will get the value 5
    s.clear(); // this empties the String, making it equal to ""

    // word still has the value 5 here, but there's no more string that
    // we could meaningfully use the value 5 with. word is now totally invalid!
}
```

#### 4-3-1 String Slices

```rust
let s = String::from("hello world");

let hello = &s[0..5];
let world = &s[6..11];

// or
let hello = &s[0..=4];
let world = &s[6..=10];

// or
let hello = &s[..5];
let world = &s[6..];

// One Chinese Character placeholder is 3
```

The type that signifies “string slice” is written as `&str`

```rust
fn first_word(s: &String) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}

fn main() {
    let mut s = String::from("hello world");
    let word = first_word(&s); // immutable
    s.clear(); // error!, mutable
    println!("the first word is: {}", word);
}

// cannot borrow `s` as mutable because it is also borrowed as immutable
```

Recall from the borrowing rules that if we have an immutable reference to something, we cannot also take a mutable reference. Because `clear` needs to truncate the `String`, it tries to take a mutable reference, which fails. 

```rust
fn first_word(s: &mut String) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}

fn main() {
    let mut s = String::from("hello world");
    let word = first_word(&mut s); // mutable
    s.clear(); // error!, mutable twice
    println!("the first word is: {}", word);
}

//  cannot borrow `s` as mutable more than once at a time
```

##### 4-3-1-1 String Literals Are Slices

```rust
let s = "Hello, world!";
```

The type of `s` here is `&str`: it’s a slice pointing to that specific point of the binary. This is also why string literals are immutable; `&str` is an immutable reference.

##### 4-3-1-2 String Slices as Parameters

```rust
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}

fn main() {
    let my_string = String::from("hello world");
    
    // first_word works on slices of `String`s
    let word = first_word(&my_string[..]);
    let my_string_literal = "hello world";
    
    // first_word works on slices of string literals
    let word = first_word(&my_string_literal[..]);
    
    // Because string literals *are* string slices already,
    // this works too, without the slice syntax!
    // see String Literals Are Slices
    let word = first_word(my_string_literal);
}
```

#### 4-3-2 Other Slices

```rust
let a = [1, 2, 3, 4, 5];
let slice = &a[1..3];
```

This slice has the type `&[i32]`. It works the same way as string slices do, by storing a reference to the first element and a length. 

## 5 Using Structs to Structure Related Data

### 5-1 Defining and Instantiating Structs

```rust
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}
// create an instance of the User struct, just like struct in C
let user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};
// mutable
let mut user1 = User {
    email: String::from("someone@example.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
};
user1.email = String::from("anotheremail@example.com");
```

Note that **the entire instance must be mutable**; Rust doesn’t allow us to mark only certain fields as mutable. As with any expression, we can construct a new instance of the struct as the last expression in the function body to implicitly return that new instance.

```rust
fn build_user(email: String, username: String) -> User {
    User {
        email: email,
        username: username,
        active: true,
        sign_in_count: 1,
    }
}
```

#### 5-1-1 Using the Field Init Shorthand When Variables and Fields Have the Same Name

```rust
fn build_user(email: String, username: String) -> User {
    User {
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}
```

#### 5-1-2 Creating Instances From Other Instances With Struct Update Syntax

```rust
let user2 = User {
    email: String::from("another@example.com"),
    username: String::from("anotherusername567"),
    active: user1.active,
    sign_in_count: user1.sign_in_count,
};
let user2 = User {
    email: String::from("another@example.com"),
    username: String::from("anotherusername567"),
    ..user1
};
```

The syntax `..` specifies that the remaining fields not explicitly set should have the same value as the fields in the given instance.

#### 5-1-3 Using Tuple Structs without Named Fields to Create Different Types

Structs that look similar to tuples, called *tuple structs*. 

`typedef int myint;` to define a meaningful data type.

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

let black = Color(0, 0, 0);
let origin = Point(0, 0, 0);
```

Each struct you define is its own type, even though the fields within the struct have the same types. Otherwise, tuple struct instances behave like tuples: you can destructure them into their individual pieces, you can use a `.`followed by the index to access an individual value, and so on.

#### 5-1-4 Unit-Like Structs Without Any Fields

Unit-like structs can be useful in situations in which you need to implement a trait on some type but don’t have any data that you want to store in the type itself. 

#### 5-1-5 Ownership of Struct Data

```rust
struct User {
    username: &str,
    email: &str,
    sign_in_count: u64,
    active: bool,
}

fn main() {
    let user1 = User {
        email: "someone@example.com",
        username: "someusername123",
        active: true,
        sign_in_count: 1,
    };
}

// error[E0106]: missing lifetime specifier
// fix errors using owned types like String instead of references like &str.
```

### 5-2 An Example Program Using Structs

```rust
fn main() {
    let width1 = 30;
    let height1 = 50;
    println!("The area of the rectangle is {} square pixels.", area(width1, height1));
}

fn area(width: u32, height: u32) -> u32 {
    width * height
}
```

#### 5-2-1 Refactoring with Tuples

```rust
fn main() {
    let rect1 = (30, 50);
    println!("The area of the rectangle is {} square pixels.", area(rect1));
}

fn area(dimensions: (u32, u32)) -> u32 {
    dimensions.0 * dimensions.1
}
```

#### 5-2-2 Refactoring with Structs Adding More Meaning

```rust
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
	// borrow the struct rather than take ownership. 
    println!("The area of the rectangle is {} square pixels.", area(&rect1));
}

fn area(rectangle: &Rectangle) -> u32 {
    rectangle.width * rectangle.height
}
```

#### 5-2-3 Adding Useful Functionality with Derived Traits

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    // error: `Rectangle` cannot be formatted with the default formatter
    println!("rect1 is {}", rect1); 
    println!("rect1 is {:?}", rect1);
    println!("rect1 is {:#?}", rect1);
}
```

### 5-3 Method Syntax

Methods are different from functions in that they’re defined within the context of a struct (or an enum or a trait object), and their first parameter is always `self`, which represents the instance of the struct the method is being called on.

#### 5-3-1 Defining Methods

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };
    println!("The area of the rectangle is {} square pixels.", rect1.area());
}
```

Rust knows the type of `self` is `Rectangle` due to this method’s being inside the `impl Rectangle` context. Methods can take ownership of `self`, borrow `self` immutably as we’ve done here, or borrow `self` mutably, just as they can any other parameter.

We’ve chosen `&self` here for the same reason we used `&Rectangle` in the function version: we don’t want to take ownership, and we just want to read the data in the struct, not write to it. If we wanted to change the instance that we’ve called the method on as part of what the method does, we’d use `&mut self` as the first parameter. 

#### 5-3-2 Methods with More Parameters

```rust
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }

    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}
```

#### 5-3-3 Associated Functions

Another useful feature of `impl` blocks is that we’re allowed to define functions within `impl` blocks that *don’t* take `self` as a parameter. These are called *associated functions* because they’re associated with the struct. They’re still functions, not methods, because they don’t have an instance of the struct to work with. You’ve already used the `String::from` associated function. 

**Associated functions are often used for constructors that will return a new instance of the struct**.

```rust
impl Rectangle {
    fn square(size: u32) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}
let sq = Rectangle::square(3);
```

#### 5-3-4 Multiple impl Blocks

```rust
// just like
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}
```

## 6 Enums and Pattern Matching

### 6-1 Defining an Enum

That property of IP addresses makes the enum data structure appropriate, because enum values can only be **one** of the variants.

```rust
enum IpAddrKind {
    V4,
    V6,
}
```

#### 6-1-1 Enum Values

```rust
let four = IpAddrKind::V4;
let six = IpAddrKind::V6;
```

```rust
struct IpAddr {
    kind: IpAddrKind,
    address: String,
}

let home = IpAddr {
    kind: IpAddrKind::V4,
    address: String::from("127.0.0.1"),
};

let loopback = IpAddr {
    kind: IpAddrKind::V6,
    address: String::from("::1"),
};
```

```rust
enum IpAddr {
    V4(String),
    V6(String),
}

let home = IpAddr::V4(String::from("127.0.0.1"));
let loopback = IpAddr::V6(String::from("::1"));
```

There’s another advantage to using an enum rather than a struct: **each variant can have different types and amounts of associated data.** 

```rust
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

let home = IpAddr::V4(127, 0, 0, 1);
let loopback = IpAddr::V6(String::from("::1"));
```

This code illustrates that you can put any kind of data inside an enum variant: strings, numeric types, or structs, for example. You can even include another enum! 

```rust
struct Ipv4Addr {
    // --snip--
}

struct Ipv6Addr {
    // --snip--
}

enum IpAddr {
    V4(Ipv4Addr),
    V6(Ipv6Addr),
}
```

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

struct QuitMessage; // unit struct
struct MoveMessage {
    x: i32,
    y: i32,
}
struct WriteMessage(String); // tuple struct
struct ChangeColorMessage(i32, i32, i32); // tuple struct

impl Message {
    fn call(&self) {
        // method body would be defined here
    }
}

let m = Message::Write(String::from("hello"));
m.call();
```

#### 6-1-2 The Option Enum and Its Advantages Over Null Vlues

The problem isn’t really with the concept but with the particular implementation. As such, Rust does not have nulls, but it does have an enum that can encode the concept of a value being present or absent. 

```rust
enum Option<T> {
    Some(T),
    None,
}

let some_number = Some(5);
let some_string = Some("a string");

let absent_number: Option<i32> = None;
```

If we use `None` rather than `Some`, we need to tell Rust what type of `Option<T>` we have, because the compiler can’t infer the type that the `Some` variant will hold by looking only at a `None` value.

So why is having `Option<T>` any better than having null? In short, because `Option<T>` and `T` (where `T` can be any type) are different types, the compiler won’t let us use an `Option<T>` value as if it were definitely a valid value. 

```rust
let x: i8 = 5;
let y: Option<i8> = Some(5);
// i8 and Option<i8> are different types
let sum = x + y;
// error[E0277]: the trait bound `i8: std::ops::Add<std::option::Option<i8>>` is not satisfied
```

### 6-2 The match Control Flow Operator

```rust
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u32 {
    match coin {
        Coin::Penny => {
            println!("Lucky penny!");
            1
        },
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}
```

#### 6-2-1 Patterns that Bind to Values

```rust
#[derive(Debug)] // so we can inspect the state in a minute
enum UsState {
    Alabama,
    Alaska,
    // --snip--
}

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
}

fn value_in_cents(coin: Coin) -> u32 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter(state) => {
            println!("State quarter from {:?}!", state);
            25
        },
    }
}
```

#### 6-2-2 Matching with `Option<T>`

```rust
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

let five = Some(5);
let six = plus_one(five);
let none = plus_one(None);
```

Combining `match` and enums is useful in many situations. You’ll see this pattern a lot in Rust code: **`match` against an enum, bind a variable to the data inside, and then execute code based on it.** 

#### 6-2-3 Matches Are Exhaustive

Rust knows that we didn’t cover every possible case and even knows which pattern we forgot! Matches in Rust are *exhaustive*: we must exhaust every last possibility in order for the code to be valid. Especially in the case of `Option<T>`, when Rust prevents us from forgetting to explicitly handle the `None` case, it protects us from assuming that we have a value when we might have null, thus making the billion-dollar mistake discussed earlier.

#### 6-2-4 The `_` Placeholder

```rust
let some_u8_value = 0u8;
match some_u8_value {
    1 => println!("one"),
    3 => println!("three"),
    5 => println!("five"),
    7 => println!("seven"),
    _ => (),
}
```

The `_` will match all the possible cases that aren’t specified before it. The `()` is just the unit value, so nothing will happen in the `_` case. 

### 6-3 Concise Control Flow with if let

```rust
let some_u8_value = Some(0u8);
match some_u8_value {
    Some(3) => println!("three"),
    _ => (),
}

if let Some(3) = some_u8_value {
    println!("three");
}
```

Using `if let` means less typing, less indentation, and less boilerplate code. However, you lose the exhaustive checking that `match` enforces. **Choosing between `match` and `if let` depends on what you’re doing in your particular situation and whether gaining conciseness is an appropriate trade-off for losing exhaustive checking.**

```rust
let mut count = 0;
match coin {
    Coin::Quarter(state) => println!("State quarter from {:?}!", state),
    _ => count += 1,
}

let mut count = 0;
if let Coin::Quarter(state) = coin {
    println!("State quarter from {:?}!", state);
} else {
    count += 1;
}
```

## 8 Common Collections

Unlike the built-in array and tuple types, the data these collections point to is stored on the heap, which means the amount of data does not need to be known at compile time and can grow or shrink as the program runs. 

### 8-1 Storing Lists of Values with Vectors

Vectors can only store values of the same type. 

#### 8-1-1 Create a New Vector

```rust
let v: Vec<i32> = Vec::new();
let v = vec![1, 2, 3];
```

It’s more common to create a `Vec<T>` that has initial values, and Rust provides the `vec!` macro for convenience. 

#### 8-1-2 Updating a Vector

```rust
let mut v = Vec::new();
v.push(5);
v.push(6);
```

The numbers we place inside are all of type `i32`, and Rust infers this from the data, so we don’t need the `Vec<i32>` annotation.

#### 8-1-3 Dropping a Vector Drops Its Elements

```rust
{
    let v = vec![1, 2, 3, 4];
    // do stuff with v
} // <- v goes out of scope and is freed here
```

#### 8-1-4 Reading Elements of Vectors

Both methods of accessing a value in a vector, either with indexing syntax or the `get` method.

```rust
let v = vec![1, 2, 3, 4, 5];

let third: &i32 = &v[2];
println!("The third element is {}", third);
match v.get(2) {
    Some(third_or_other) => println!("The third element is {}", third_or_other),
    None => println!("There is no third element."),
}

let does_not_exist = &v[100]; // will cause panic
let does_not_exist = v.get(100); // return None without panic

let mut v = vec![1, 2, 3, 4, 5];
let first = &v[0];
v.push(6);
println!("The first element is: {}", first);
// error[E0502]: cannot borrow `v` as mutable because it is also borrowed as immutable
```

Why should a reference to the first element care about what changes at the end of the vector? This error is due to the way vectors work: adding a new element onto the end of the vector might require allocating new memory and copying the old elements to the new space, if there isn’t enough room to put all the elements next to each other where the vector currently is. In that case, the reference to the first element would be pointing to deallocated memory. The borrowing rules prevent programs from ending up in that situation.

#### 8-1-5 Iterating over the Values in a Vector

```rust
let v = vec![100, 32, 57];
for i in &v {
    println!("{}", i);
}

let mut v = vec![100, 32, 57];
for i in &mut v {
    *i += 50;
}
```

#### 8-1-6 Using an Enum to Store Multiple Types

```rust
enum SpreadsheetCell {
    Int(i32),
    Float(f64),
    Text(String),
}

let row = vec![
    SpreadsheetCell::Int(3),
    SpreadsheetCell::Text(String::from("blue")),
    SpreadsheetCell::Float(10.12),
];
```

Rust needs to know what types will be in the vector at compile time so it knows exactly how much memory on the heap will be needed to store each element.

### 8-2 Storing UTF-8 Encoded Text with Strings

#### 8-2-1 What Is a String?

Rust’s standard library also includes a number of other string types, such as `OsString`, `OsStr`, `CString`, and `CStr`. These string types can store text in different encodings or be represented in memory in a different way.

#### 8-2-2 Creating a New String

```rust
let mut s = String::new();
let data = "initial contents";
let s = data.to_string();
let s = "initial contents".to_string();

let s = String::from("initial contents");
let hello = String::from("你好");
```

#### 8-2-3 Updating a String

##### 8-2-3-1 Appending to a String with `push_str` and `push`

```rust
let mut s = String::from("foo");
s.push_str("bar");

let mut s1 = String::from("foo");
let s2 = "bar";
s1.push_str(s2);
println!("s2 is {}", s2);

let mut s = String::from("lo");
s.push('l'); // must be char
```

The `push_str` method takes a string slice because we don’t necessarily want to take ownership of the parameter. 

##### 8-2-3-2 Concatenation with the `+` Operator or the `format!` Macro

```rust
let s1 = String::from("Hello, ");
let s2 = String::from("world!");
let s3 = s1 + &s2; // note s1 has been moved here and can no longer be used

fn add(self, s: &str) -> String {
```

First, `s2` has an `&`, meaning that we’re adding a *reference* of the second string to the first string because of the `s` parameter in the `add` function: we can only add a `&str` to a `String`; we can’t add two `String` values together. But wait—the type of `&s2` is `&String`, not `&str`, as specified in the second parameter to `add`. So why does it compile?

The reason we’re able to use `&s2` in the call to `add` is that the compiler can *coerce* the `&String`argument into a `&str`. When we call the `add` method, Rust uses a *deref coercion*, which here turns `&s2` into `&s2[..]`.  Because `add` does not take ownership of the `s` parameter, `s2` will still be a valid `String` after this operation.

Second, we can see in the signature that `add` takes ownership of `self`, because `self` does *not* have an `&`. This means `s1` will be moved into the `add` call and no longer be valid after that. So although `let s3 = s1 + &s2;` looks like it will copy both strings and create a new one, this statement actually takes ownership of `s1`, appends a copy of the contents of `s2`, and then returns ownership of the result. In other words, it looks like it’s making a lot of copies but isn’t; the implementation is more efficient than copying.

```rust
let s1 = String::from("tic");
let s2 = String::from("tac");
let s3 = String::from("toe");
let s = s1 + "-" + &s2 + "-" + &s3; // tic-tac-toe

let s = format!("{}-{}-{}", s1, s2, s3); // tic-tac-toe
```

#### 8-2-4 Indexing into Strings

Rust strings don’t support indexing. 

```rust
let s1 = String::from("hello");
let h = s1[0];
// compile error
```

##### 8-2-4-1 Internal Representation

```rust
let hello = "Здравствуйте";
let answer = &hello[0]; // `str` cannot be indexed by `{integer}`
let answer = &hello[0::1]; // 3, [0::3] Зд, д takes two bytes of storage
```

##### 8-2-4-2 Bytes and Scalar Values and Grapheme Clusters

Another point about UTF-8 is that there are actually three relevant ways to look at strings from Rust’s perspective: as bytes, scalar values, and grapheme clusters (the closest thing to what we would call *letters*).

Rust provides different ways of interpreting the raw string data that computers store so that each program can choose the interpretation it needs, no matter what human language the data is in.

#### 8-2-5 Slicing Strings

Indexing into a string is often a bad idea because it’s not clear what the return type of the string-indexing operation should be: a byte value, a character, a grapheme cluster, or a string slice. Therefore, Rust asks you to be more specific if you really need to use indices to create string slices. To be more specific in your indexing and indicate that you want a string slice, rather than indexing using `[]` with a single number, you can use `[]` with a range to create a string slice containing particular bytes:

```rust
let hello = "Здравствуйте";
let s = &hello[0..3];
```

#### 8-2-6 Methods for Iterating Over Strings

If you need to perform operations on individual Unicode scalar values, the best way to do so is to use the `chars` method. 

```rust
for c in "नमस्ते".chars() {
    println!("{}", c);
}
for b in "नमस्ते".bytes() {
    println!("{}", b);
}
```

#### 8-2-7 Exercise

```rust
fn string_slice(arg: &str) { println!("{}", arg); }
fn string(arg: String) { println!("{}", arg); }

fn main() {
    string_slice("blue");
    string("red".to_string());
    string(String::from("hi"));
    string("rust is fun!".to_owned());
    string("nice weather".into());
    string(format!("Interpolation {}", "Station"));
    string_slice(&String::from("abc")[0..1]);
    string_slice(&"abc".to_string()[0..1]);
    string_slice("  hello there ".trim());
    string("Happy Monday!".to_string().replace("Mon", "Tues"));
    string("mY sHiFt KeY iS sTiCkY".to_lowercase());
}
```

### 8-3 Storing Keys with Associated Values in Hash Maps

#### 8-3-1 Creating a New Hash Map

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

let teams  = vec![String::from("Blue"), String::from("Yellow")];
let initial_scores = vec![10, 50];
let scores: HashMap<_, _> = teams.iter().zip(initial_scores.iter()).collect();
```

Just like vectors, hash maps store their data on the heap. Like vectors, hash maps are homogeneous: all of the keys must have the same type, and all of the values must have the same type.

The type annotation `HashMap<_, _>` is needed here because it’s possible to `collect` into many different data structures and Rust doesn’t know which you want unless you specify. For the parameters for the key and value types, however, we use underscores, and Rust can infer the types that the hash map contains based on the types of the data in the vectors.

#### 8-3-2 Hash Maps and Ownership

```rust
let field_name = String::from("Favorite color");
let field_value = String::from("Blue");

let mut map = HashMap::new();
map.insert(field_name, field_value);
// field_name and field_value are invalid at this point,
```

We aren’t able to use the variables `field_name` and `field_value` after they’ve been moved into the hash map with the call to `insert`.

If we insert references to values into the hash map, the values won’t be moved into the hash map. The values that the references point to must be valid for at least as long as the hash map is valid. 

#### 8-3-3 Accessing Values in a Hash Map

```rust
let team_name = String::from("Blue");
let score = scores.get(&team_name);
```

`score` will have the value that’s associated with the Blue team, and the result will be `Some(&10)`. The result is wrapped in `Some` because `get` returns an `Option<&V>`; if there’s no value for that key in the hash map, `get` will return `None`. 

```rust
for (key, value) in &scores {
    println!("{}: {}", key, value);
}
```

#### 8-3-4 Updating a Hash Map

##### 8-3-4-1 Overwriting a Value

```rust
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Blue"), 25);
println!("{:?}", scores); // {"Blue": 25}
```

##### 8-3-4-2 Only Inserting a Value If the Key Has No Value

```rust
scores.entry(String::from("Yellow")).or_insert(50);
scores.entry(String::from("Blue")).or_insert(50);
```

The `or_insert` method on `Entry` is defined to return a mutable reference to the value for the corresponding `Entry` key if that key exists, and if not, inserts the parameter as the new value for this key and returns a mutable reference to the new value. This technique is much cleaner than writing the logic ourselves and, in addition, plays more nicely with the borrow checker.

##### 8-3-4-3 Updating a Value Based on the Old Value

```rust
use std::collections::HashMap;

let text = "hello world wonderful world";
let mut map = HashMap::new();
for word in text.split_whitespace() {
    let count = map.entry(word).or_insert(0);
    *count += 1;
}
println!("{:?}", map); // {"world": 2, "hello": 1, "wonderful": 1}
```

The `or_insert` method actually returns a mutable reference (`&mut V`) to the value for this key.

#### 8-3-5 Hashing Functions

By default, `HashMap` uses a “cryptographically strong”[1](https://doc.rust-lang.org/book/ch08-03-hash-maps.html#siphash) hashing function that can provide resistance to Denial of Service (DoS) attacks. This is not the fastest hashing algorithm available, but the trade-off for better security that comes with the drop in performance is worth it. If you profile your code and find that the default hash function is too slow for your purposes, you can switch to another function by specifying a different *hasher*. A hasher is a type that implements the `BuildHasher` trait. 

## 9 Error Handling

Rust doesn’t have exceptions. Instead, it has the type `Result<T, E>` for recoverable errors and the `panic!` macro that stops execution when the program encounters an unrecoverable error. 

### 9-1 Unrecoverable Errors with `panic!`

When the `panic!` macro executes, your program will print a failure message, unwind and clean up the stack, and then quit. This most commonly occurs when a bug of some kind has been detected and it’s not clear to the programmer how to handle the error.

>By default, when a panic occurs, the program starts *unwinding*, which means Rust walks back up the stack and cleans up the data from each function it encounters. But this walking back and cleanup is a lot of work. The alternative is to immediately *abort*, which ends the program without cleaning up. Memory that the program was using will then need to be cleaned up by the operating system. If in your project you need to make the resulting binary as small as possible, you can switch from unwinding to aborting upon a panic by adding `panic = 'abort'`to the appropriate `[profile]` sections in your *Cargo.toml* file. For example, if you want to abort on panic in release mode, add this:
>```toml
>[profile.release]
>panic = 'abort'
>```

```rust
fn main() {
    panic!("crash and burn");
}
// thread 'main' panicked at 'crash and burn', src/main.rs:2:4
// note: Run with `RUST_BACKTRACE=1` for a backtrace.
```

#### 9-1-1 Using a `panic!` Backtrace

```rust
fn main() {
    let v = vec![1, 2, 3];
    v[99];
}
// thread 'main' panicked at 'index out of bounds: the len is 3 but the index is 99', checkout/src/liballoc/vec.rs:1555:10
// note: Run with `RUST_BACKTRACE=1` for a backtrace.
```

Other languages, like C, will attempt to give you exactly what you asked for in this situation, even though it isn’t what you want: you’ll get whatever is at the location in memory that would correspond to that element in the vector, even though the memory doesn’t belong to the vector. This is called a *buffer overread* and can lead to security vulnerabilities if an attacker is able to manipulate the index in such a way as to read data they shouldn’t be allowed to that is stored after the array.

To protect your program from this sort of vulnerability, if you try to read an element at an index that doesn’t exist, Rust will stop execution and refuse to continue.

This error points at a file we didn’t write, *vec.rs*. That’s the implementation of `Vec<T>` in the standard library. The code that gets run when we use `[]` on our vector `v` is in *vec.rs*, and that is where the `panic!` is actually happening.

The next note line tells us that we can set the `RUST_BACKTRACE` environment variable to get a backtrace of exactly what happened to cause the error. A *backtrace* is a list of all the functions that have been called to get to this point. Backtraces in Rust work as they do in other languages: the key to reading the backtrace is to start from the top and read until you see files you wrote. That’s the spot where the problem originated. The lines above the lines mentioning your files are code that your code called; the lines below are code that called your code. These lines might include core Rust code, standard library code, or crates that you’re using. Let’s try getting a backtrace by setting the `RUST_BACKTRACE` environment variable to any value except 0. 

`RUST_BACKTRACE=1 cargo run`

Debug symbols are enabled by default when using `cargo build` or `cargo run` without the `--release` flag.

### 9-2 Recoverable Errors with Result

```rust
use std::fs::File;

fn main() {
    let f = File::open("hello.txt");
    
    let f = match f {
    	Ok(file) => file,
        Err(error) => {
        	panic!("There was a problem opening the file: {:?}", error)
        },
    };
}
```

The return type of the `File::open` function is a `Result<T, E>`. The generic parameter `T` has been filled in here with the type of the success value, `std::fs::File`, which is a file handle. The type of `E` used in the error value is `std::io::Error`.

#### 9-2-1 Matching on Different Errors

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt");

    let f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Tried to create file but there was a problem: {:?}", e),
            },
            other_error => panic!("There was a problem opening the file: {:?}", other_error),
        },
    };
}
```

A more seasoned Rustacean might write this code: 

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("Tried to create file but there was a problem: {:?}", error);
            })
        } else {
            panic!("There was a problem opening the file: {:?}", error);
        }
    });
}
```

#### 9-2-2 Shortcuts for Panic on Error `unwrap` and `expect`

`unwrap` is a shortcut method that is implemented just like the `match`expression, If the `Result` value is the `Ok` variant, `unwrap` will return the value inside the `Ok`. If the `Result` is the `Err` variant, `unwrap` will call the `panic!` macro for us. 

```rust
use std::fs::File;

fn main() {
    let f = File::open("hello.txt").unwrap();
}
// thread 'main' panicked at 'called `Result::unwrap()` on an `Err` value:
```

`expect`, which is similar to `unwrap`, lets us also choose the `panic!` error message. Using `expect` instead of `unwrap` and providing good error messages can convey your intent and make tracking down the source of a panic easier. 

```rust
use std::fs::File;

fn main() {
    let f = File::open("hello.txt").expect("Failed to open hello.txt");
}
// thread 'main' panicked at 'Failed to open hello.txt:
```

#### 9-2-3 Propagating Errors

```rust
use std::io;
use std::io::Read;
use std::fs::File;

fn read_username_from_file() -> Result<String, io::Error> {
    // returning a value of the type Result<T, E> with String and io::Error
    let f = File::open("hello.txt");

    let mut f = match f {
        Ok(file) => file,
        Err(e) => return Err(e),
    };

    let mut s = String::new();

    match f.read_to_string(&mut s) {
        Ok(_) => Ok(s),
        Err(e) => Err(e),
    }
}
```

#### 9-2-4 A Shortcut for Propagating Errors the `?` Operator

```rust
use std::io;
use std::io::Read;
use std::fs::File;

fn read_username_from_file() -> Result<String, io::Error> {
    let mut f = File::open("hello.txt")?;
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}

fn read_username_from_file() -> Result<String, io::Error> {
    let mut s = String::new();
    File::open("hello.txt")?.read_to_string(&mut s)?;
    Ok(s)
}

use std::fs;

fn read_username_from_file() -> Result<String, io::Error> {
    fs::read_to_string("hello.txt")
}
```

#### 9-2-5 The `?` Operator Can Only Be Used in Functions That Return `Result`

Because it is defined to work in the same way as the `match` expression.

```rust
use std::fs::File;

fn main() {
    let f = File::open("hello.txt")?; // without mut, return ()
}
"""
error[E0277]: the `?` operator can only be used in a function that returns
`Result` or `Option` (or another type that implements `std::ops::Try`)
"""
```

However, we can change how we write the `main` function so that it does return a `Result<T, E>`:

```rust
use std::error::Error;
use std::fs::File;

fn main() -> Result<(), Box<dyn Error>> {
    let f = File::open("hello.txt")?;
    Ok(())
}
```

For now, you can read `Box<dyn Error>` to mean “any kind of error.”

### 9-3 To `panic!` or Not to `panic!`

When you choose to return a `Result` value, you give the calling code options rather than making the decision for it. The calling code could choose to attempt to recover in a way that’s appropriate for its situation, or it could decide that an `Err` value in this case is unrecoverable, so it can call `panic!` and turn your recoverable error into an unrecoverable one. **Therefore, returning `Result` is a good default choice when you’re defining a function that might fail. In rare situations, it’s more appropriate to write code that panics instead of returning a `Result`.**

#### 9-3-1 Examples Prototype Code and Tests

If a method call fails in a test, you’d want the whole test to fail, even if that method isn’t the functionality under test. Because `panic!` is how a test is marked as a failure, calling `unwrap` or `expect` is exactly what should happen.

#### 9-3-2 Cases in Which You Have More Information Than the Compiler

It would also be appropriate to call `unwrap` when you have some other logic that ensures the `Result` will have an `Ok` value, but the logic isn’t something the compiler understands. You’ll still have a `Result` value that you need to handle: whatever operation you’re calling still has the possibility of failing in general, even though it’s logically impossible in your particular situation. If you can ensure by manually inspecting the code that you’ll never have an `Err` variant, it’s perfectly acceptable to call `unwrap`. Here’s an example:

```rust
use std::net::IpAddr;

let home: IpAddr = "127.0.0.1".parse().unwrap();
```

We’re creating an `IpAddr` instance by parsing a hardcoded string. We can see that `127.0.0.1` is a valid IP address, so it’s acceptable to use `unwrap` here. However, having a hardcoded, valid string doesn’t change the return type of the `parse` method: we still get a `Result` value, and the compiler will still make us handle the `Result` as if the `Err` variant is a possibility because the compiler isn’t smart enough to see that this string is always a valid IP address. If the IP address string came from a user rather than being hardcoded into the program and therefore *did* have a possibility of failure, we’d definitely want to handle the `Result` in a more robust way instead.

#### 9-3-3 Guidelines for Error Handling

It’s advisable to have your code panic when it’s possible that your code could end up in a bad state. In this context, a *bad state* is when some assumption, guarantee, contract, or invariant has been broken, such as when invalid values, contradictory values, or missing values are passed to your code—plus one or more of the following:

- The bad state is not something that’s *expected* to happen occasionally.
- Your code after this point needs to rely on not being in this bad state.
- There’s not a good way to encode this information in the types you use.

If someone calls your code and passes in values that don’t make sense, the best choice might be to call `panic!` and alert the person using your library to the bug in their code so they can fix it during development. Similarly, `panic!` is often appropriate if you’re calling external code that is out of your control and it returns an invalid state that you have no way of fixing.

However, **when failure is expected, it's more appropriate to return a `Result` than to make a `panic!`call.** Examples include a parser being given malformed data or an HTTP request returning a status that indicates you have hit a rate limit. In these cases, returning a `Result` indicates that failure is an expected possibility that the calling code must decide how to handle.

When your code performs operations on values, your code should verify the values are valid first and panic if the values aren’t valid. This is mostly for safety reasons: attempting to operate on invalid data can expose your code to vulnerabilities. This is the main reason the standard library will call `panic!` if you attempt an out-of-bounds memory access: trying to access memory that doesn’t belong to the current data structure is a common security problem. Functions often have *contracts*: their behavior is only guaranteed if the inputs meet particular requirements. Panicking when the contract is violated makes sense because a contract violation always indicates a caller-side bug and it’s not a kind of error you want the calling code to have to explicitly handle. In fact, there’s no reasonable way for calling code to recover; the calling *programmers* need to fix the code. Contracts for a function, especially when a violation will cause a panic, should be explained in the API documentation for the function.

However, having lots of error checks in all of your functions would be verbose and annoying. Fortunately, you can use Rust’s type system (and thus the type checking the compiler does) to do many of the checks for you. If your function has a particular type as a parameter, you can proceed with your code’s logic knowing that the compiler has already ensured you have a valid value. For example, if you have a type rather than an `Option`, your program expects to have *something* rather than *nothing*. Your code then doesn’t have to handle two cases for the `Some` and `None` variants: it will only have one case for definitely having a value. Code trying to pass nothing to your function won’t even compile, so your function doesn’t have to check for that case at runtime. Another example is using an unsigned integer type such as `u32`, which ensures the parameter is never negative.

#### 9-3-4 Creating Custom Types for Validation

```rust
loop {
    // --snip--

    let guess: i32 = match guess.trim().parse() {
        Ok(num) => num,
        Err(_) => continue,
    };

    if guess < 1 || guess > 100 {
        println!("The secret number will be between 1 and 100.");
        continue;
    }

    match guess.cmp(&secret_number) {
    // --snip--
}
```

However, this is not an ideal solution: if it was absolutely critical that the program only operated on values between 1 and 100, and it had many functions with this requirement, having a check like this in every function would be tedious (and might impact performance).

Instead, we can make a new type and put the validations in a function to create an instance of the type rather than repeating the validations everywhere. That way, it’s safe for functions to use the new type in their signatures and confidently use the values they receive. 

```rust
pub struct Guess {
    value: i32,
}

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 || value > 100 {
            panic!("Guess value must be between 1 and 100, got {}.", value);
        }
		// private, can not be set, only create by new
        Guess {
            value
        }
    }

    pub fn value(&self) -> i32 {
        self.value
    }
}
```

The `panic!` macro signals that your program is in a state it can’t handle and lets you tell the process to stop instead of trying to proceed with invalid or incorrect values. The `Result` enum uses Rust’s type system to indicate that operations might fail in a way that your code could recover from.

## 10 Generic Types, Traits, and Lifetimes

Generics are abstract stand-ins for concrete types or other properties. 

### 10-1 Generic Data Types

#### 10-1-1 In Function Definitions

```rust
fn largest_i32(list: &[i32]) -> i32 {
    let mut largest = list[0];

    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }
    largest
}

fn largest_char(list: &[char]) -> char {
    let mut largest = list[0];

    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }
    largest
}

fn largest<T>(list: &[T]) -> T {
    let mut largest = list[0];

    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }
    largest
}
```

#### 10-1-2 In Struct Definitions

```rust
// x, y same type
struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    let integer = Point { x: 5, y: 10 };
    let float = Point { x: 1.0, y: 4.0 };
}

// x, y different type
struct Point<T, U> {
    x: T,
    y: U,
}

fn main() {
    let both_integer = Point { x: 5, y: 10 };
    let both_float = Point { x: 1.0, y: 4.0 };
    let integer_and_float = Point { x: 5, y: 4.0 };
}
```

#### 10-1-3 In Enum Definitions

```rust
enum Option<T> {
    Some(T),
    None,
}
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

#### 10-1-4 In Method Definitions

```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}
// type Point<f32> will have a method named distance_from_origin and other instances of Point<T> where T is not of type f32 will not have this method defined. 
impl Point<f32> {
    fn distance_from_origin(&self) -> f32 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}

fn main() {
    let p = Point { x: 5, y: 10 };

    println!("p.x = {}", p.x());
}
// p.x = 5
```

Generic type parameters in a struct definition aren’t always the same as those you use in that struct’s method signatures.

```rust
struct Point<T, U> {
    x: T,
    y: U,
}

impl<T, U> Point<T, U> {
    fn mixup<V, W>(self, other: Point<V, W>) -> Point<T, W> {
        Point {
            x: self.x,
            y: other.y,
        }
    }
}

fn main() {
    let p1 = Point { x: 5, y: 10.4 };
    let p2 = Point { x: "Hello", y: 'c'};

    let p3 = p1.mixup(p2);

    println!("p3.x = {}, p3.y = {}", p3.x, p3.y);
}
// p3.x = 5, p3.y = c
```

Here, the generic parameters `T` and `U` are declared after `impl`, because they go with the struct definition. The generic parameters `V` and `W` are declared after `fn mixup`, because they’re only relevant to the method.

#### 10-1-5 Performance of Code Using Generics

Rust accomplishes this by performing monomorphization of the code that is using generics at compile time. *Monomorphization* is the process of turning generic code into specific code by filling in the concrete types that are used when compiled.

The monomorphized version of the code looks like the following. 

```rust
enum Option_i32 {
    Some(i32),
    None,
}

enum Option_f64 {
    Some(f64),
    None,
}

fn main() {
    let integer = Option_i32::Some(5);
    let float = Option_f64::Some(5.0);
}
```

Because Rust compiles generic code into code that specifies the type in each instance, we pay no runtime cost for using generics. When the code runs, it performs just as it would if we had duplicated each definition by hand. The process of monomorphization makes Rust’s generics extremely efficient at runtime.

### 10-2 Traits Defining Shared Behavior

A *trait* tells the Rust compiler about functionality a particular type has and can share with other types. We can use traits to define shared behavior in an abstract way. We can use trait bounds to specify that a generic can be any type that has certain behavior.

#### 10-2-1 Defining a Trait

Trait definitions are a way to group method signatures together to define a set of behaviors necessary to accomplish some purpose.

```rust
pub trait Summary {
    fn summarize(&self) -> String;
}
```

A trait can have multiple methods in its body: the method signatures are listed one per line and each line ends in a semicolon.

#### 10-2-2 Implementing a Trait on a Type

```rust
pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}
```

After implementing the trait, we can call the methods on instances of `NewsArticle` and `Tweet` in the same way we call regular methods, like this:

```rust
let tweet = Tweet {
    username: String::from("horse_ebooks"),
    content: String::from("of course, as you probably already know, people"),
    reply: false,
    retweet: false,
};

println!("1 new tweet: {}", tweet.summarize());
```

`use aggregator::Summary;` would enable them to implement `Summary` for their type. The `Summary` trait would also need to be a public trait for another crate to implement it.

One restriction to note with trait implementations is that we can implement a trait on a type only if either the trait or the type is local to our crate. For example, we can implement standard library traits like `Display` on a custom type like `Tweet` as part of our `aggregator` crate functionality, because the type `Tweet` is local to our `aggregator` crate. We can also implement `Summary` on `Vec<T>` in our `aggregator` crate, because the trait `Summary` is local to our `aggregator` crate.

But we can’t implement external traits on external types. For example, we can’t implement the `Display` trait on `Vec<T>` within our `aggregator` crate, because `Display` and `Vec<T>` are defined in the standard library and aren’t local to our `aggregator` crate. This restriction is part of a property of programs called *coherence*, and more specifically the *orphan rule*, so named because the parent type is not present. This rule ensures that other people’s code can’t break your code and vice versa. Without the rule, two crates could implement the same trait for the same type, and Rust wouldn’t know which implementation to use.

#### 10-2-3 Default Implementations

```rust
pub trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}
```

```rust
pub trait Summary {
    fn summarize_author(&self) -> String;

    fn summarize(&self) -> String {
        format!("(Read more from {}...)", self.summarize_author())
    }
}
```

To use this version of `Summary`, we only need to define `summarize_author` when we implement the trait on a type:

```rust
impl Summary for Tweet {
    fn summarize_author(&self) -> String {
        format!("@{}", self.username)
    }
}
```

Note that it isn’t possible to call the default implementation from an overriding implementation of that same method.

#### 10-2-4 Traits as Parameters

We can define a function `notify` that calls the `summarize` method on its parameter `item`, which is of some type that implements the `Summary` trait. To do this, we can use the `impl Trait`syntax, like this:

```rust
pub fn notify(item: impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
```

##### 10-2-4-1 Trait Bound Syntax

```rust
pub fn notify<T: Summary>(item: T) {
    println!("Breaking news! {}", item.summarize());
}
```

It is equivalent to the example above, but is a bit more verbose.

```rust
// have two parameters that implement Summary
pub fn notify(item1: impl Summary, item2: impl Summary) {}
// force both parameters to have the exact same type
pub fn notify<T: Summary>(item1: T, item2: T) {}
```

##### 10-2-4-2 Specifying Multiple Trait Bounds with `+` Syntax

```rust
pub fn notify(item: impl Summary + Display) {}
pub fn notify<T: Summary + Display>(item: T) {}
```

##### 10-2-4-3 Clearer Trait Bounds with `where` Clauses

```rust
fn some_function<T: Display + Clone, U: Clone + Debug>(t: T, u: U) -> i32 {}

// the same as
fn some_function<T, U>(t: T, u: U) -> i32
    where T: Display + Clone,
          U: Clone + Debug
{}
```

#### 10-2-5 Returning Types that Implement Traits

```rust
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from("of course, as you probably already know, people"),
        reply: false,
        retweet: false,
    }
}
```

Using `impl Trait` is only allowed if you have a single type that you’re returning. 

#### 10-2-6 Fixing the `largest` Function with Trait Bounds

```rust
fn largest<T>(list: &[T]) -> T {
    let mut largest = list[0];

    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }

    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest(&number_list);
    println!("The largest number is {}", result);

    let char_list = vec!['y', 'm', 'a', 'q'];

    let result = largest(&char_list);
    println!("The largest char is {}", result);
}
// error[E0369]: binary operation `>` cannot be applied to type `T`
```

In the body of `largest` we wanted to compare two values of type `T` using the greater than (`>`) operator. Because that operator is defined as a default method on the standard library trait `std::cmp::PartialOrd`, we need to specify `PartialOrd` in the trait bounds for `T` so the `largest` function can work on slices of any type that we can compare. We don’t need to bring `PartialOrd` into scope because it’s in the prelude. 

```rust
fn largest<T: PartialOrd>(list: &[T]) -> T {}
// error[E0508]: cannot move out of type `[T]`, a non-copy slice
```

Types like `i32` and `char` that have a known size can be stored on the stack, so they implement the `Copy` trait. But when we made the `largest` function generic, it became possible for the `list` parameter to have types in it that don’t implement the `Copy` trait. Consequently, we wouldn’t be able to move the value out of `list[0]` and into the `largest` variable, resulting in this error.

```rust
fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut largest = list[0];

    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }
    largest
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest(&number_list);
    println!("The largest number is {}", result);

    let char_list = vec!['y', 'm', 'a', 'q'];

    let result = largest(&char_list);
    println!("The largest char is {}", result);
}
// The largest number is 100
// The largest char is y
```

If we don’t want to restrict the `largest` function to the types that implement the `Copy` trait, we could specify that `T` has the trait bound `Clone` instead of `Copy`. Then we could clone each value in the slice when we want the `largest` function to have ownership. Using the `clone` function means we’re potentially making more heap allocations in the case of types that own heap data like `String`, and heap allocations can be slow if we’re working with large amounts of data.

Another way we could implement `largest` is for the function to return a reference to a `T` value in the slice. If we change the return type to `&T` instead of `T`, thereby changing the body of the function to return a reference, we wouldn’t need the `Clone` or `Copy` trait bounds and we could avoid heap allocations.

#### 10-2-7 Using Trait Bounds to Conditionally Implement Methods

By using a trait bound with an `impl` block that uses generic type parameters, we can implement methods conditionally for types that implement the specified traits. For example, the type `Pair<T>`always implements the `new` function. But `Pair<T>` only implements the `cmp_display` method if its inner type `T` implements the `PartialOrd` trait that enables comparison *and* the `Display` trait that enables printing.

```rust
use std::fmt::Display;

struct Pair<T> {
    x: T,
    y: T,
}

impl<T> Pair<T> {
    fn new(x: T, y: T) -> Self {
        Self {
            x,
            y,
        }
    }
}

impl<T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.x >= self.y {
            println!("The largest member is x = {}", self.x);
        } else {
            println!("The largest member is y = {}", self.y);
        }
    }
}
```

We can also conditionally implement a trait for any type that implements another trait. Implementations of a trait on any type that satisfies the trait bounds are called *blanket implementations* and are extensively used in the Rust standard library. For example, the standard library implements the `ToString` trait on any type that implements the `Display` trait. The `impl`block in the standard library looks similar to this code:

```rust
impl<T: Display> ToString for T {
    // --snip--
}
```

Because the standard library has this blanket implementation, we can call the to_string method defined by the ToString trait on any type that implements the Display trait. For example, we can turn integers into their corresponding String values like this because integers implement Display:

```rust
let s = 3.to_string();
```

### 10-3 Validating References with Lifetimes

#### 10-3-1 Preventing Dangling References with Lifetimes

x out of scope doesn't live long enough.

```rust
{
    let r;

    {
        let x = 5;
        r = &x;
    }

    println!("r: {}", r);
}

```

This code won’t compile because the value `r` is referring to has gone out of scope before we try to use it. 

#### 10-3-2 The Borrow Checker

```rust
{
    let x = 5;            // ----------+-- 'b
                          //           |
    let r = &x;           // --+-- 'a  |
                          //   |       |
    println!("r: {}", r); //   |       |
                          // --+       |
}
```

Here, `x` has the lifetime `'b`, which in this case is larger than `'a`. This means `r` can reference `x`because Rust knows that the reference in `r` will always be valid while `x` is valid.

#### 10-3-3 Generic Lifetimes in Functions

```rust
fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
fn main() {
    let string1 = String::from("abcd");
    let string2 = "xyz";

    let result = longest(string1.as_str(), string2);
    println!("The longest string is {}", result);
}
// error: missing lifetime specifier
// this function's return type contains a borrowed value, but the signature does not say whether it is borrowed from `x` or `y`
```

When we’re defining this function, we don’t know the concrete values that will be passed into this function, so we don’t know whether the `if` case or the `else` case will execute. We also don’t know the concrete lifetimes of the references that will be passed in, so we can’t look at the scopes to determine whether the reference we return will always be valid. 

#### 10-3-4 Lifetime Annotation Syntax

Lifetime annotations don’t change how long any of the references live. Just as functions can accept any type when the signature specifies a generic type parameter, functions can accept references with any lifetime by specifying a generic lifetime parameter. Lifetime annotations describe the relationships of the lifetimes of multiple references to each other without affecting the lifetimes.

```rust
&i32        // a reference
&'a i32     // a reference with an explicit lifetime
&'a mut i32 // a mutable reference with an explicit lifetime
```

#### 10-3-5 Lifetime Annotations in Function Signatures

All the references in the parameters and the return value must have the same lifetime. 

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

Remember, when we specify the lifetime parameters in this function signature, we’re not changing the lifetimes of any values passed in or returned. Rather, we’re specifying that the borrow checker should reject any values that don’t adhere to these constraints. Note that the `longest` function doesn’t need to know exactly how long `x` and `y` will live, only that some scope can be substituted for `'a` that will satisfy this signature.

```rust
fn main() {
    let string1 = String::from("long string is long");

    {
        let string2 = String::from("xyz");
        let result = longest(string1.as_str(), string2.as_str());
        println!("The longest string is {}", result);
    }
}
// The longest string is long string is long

fn main() {
    let string1 = String::from("long string is long");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
    }
    println!("The longest string is {}", result);
}
// error[E0597]: `string2` does not live long enough
```

The error shows that for `result` to be valid for the `println!` statement, `string2` would need to be valid until the end of the outer scope. Rust knows this because we annotated the lifetimes of the function parameters and return values using the same lifetime parameter `'a`.

As humans, we can look at this code and see that `string1` is longer than `string2` and therefore `result` will contain a reference to `string1`. Because `string1` has not gone out of scope yet, a reference to `string1` will still be valid for the `println!` statement. However, the compiler can’t see that the reference is valid in this case. We’ve told Rust that the lifetime of the reference returned by the `longest` function is the same as the smaller of the lifetimes of the references passed in.

#### 10-3-6 Thinking in Terms of Lifetimes

```rust
fn longest<'a>(x: &str, y: &str) -> &'a str {
    let result = String::from("really long string");
    result.as_str()
}
// error[E0597]: `result` does not live long enough
```

The problem is that `result` goes out of scope and gets cleaned up at the end of the `longest` function. We’re also trying to return a reference to `result` from the function. 

#### 10-3-7 Lifetime Annotations in Struct Definitions

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}
// This annotation means an instance of ImportantExcerpt can’t outlive the reference it holds in its part field.
fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.')
        .next()
        .expect("Could not find a '.'");
    let i = ImportantExcerpt { part: first_sentence };
}
```

#### 10-3-8 Lifetime Elision

Lifetimes on function or method parameters are called *input lifetimes*, and lifetimes on return values are called *output lifetimes*.

The compiler uses three rules to figure out what lifetimes references have when there aren’t explicit annotations. The first rule applies to input lifetimes, and the second and third rules apply to output lifetimes. If the compiler gets to the end of the three rules and there are still references for which it can’t figure out lifetimes, the compiler will stop with an error. These rules apply to `fn` definitions as well as `impl` blocks.

- The first rule is that each parameter that is a reference gets its own lifetime parameter.
- The second rule is if there is exactly one input lifetime parameter, that lifetime is assigned to all output lifetime parameters.
- The third rule is if there are multiple input lifetime parameters, but one of them is `&self` or `&mut self` because this is a method, the lifetime of `self` is assigned to all output lifetime parameters. 

```rust
fn longest(x: &str, y: &str) -> &str {
// Let’s apply the first rule: each parameter gets its own lifetime. This time we have two parameters instead of one, so we have two lifetimes:
fn longest<'a, 'b>(x: &'a str, y: &'b str) -> &str {
```

You can see that the second rule doesn’t apply because there is more than one input lifetime. The third rule doesn’t apply either, because longest is a function rather than a method, so none of the parameters are self. After working through all three rules, we still haven’t figured out what the return type’s lifetime is. This is why we got an error trying to compile the code above.

#### 10-3-9 Lifetime Annotations in Method Definitions

Lifetime names for struct fields always need to be declared after the `impl` keyword and then used after the struct’s name, because those lifetimes are part of the struct’s type.

In method signatures inside the `impl` block, references might be tied to the lifetime of references in the struct’s fields, or they might be independent. In addition, the lifetime elision rules often make it so that lifetime annotations aren’t necessary in method signatures. 

```rust
impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 {
        3
    }
}
```

The lifetime parameter declaration after `impl` and use after the type name is required, but we’re not required to annotate the lifetime of the reference to `self` because of the first elision rule.

```rust
impl<'a> ImportantExcerpt<'a> {
    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("Attention please: {}", announcement);
        self.part
    }
}
```

There are two input lifetimes, so Rust applies the first lifetime elision rule and gives both `&self` and `announcement` their own lifetimes. Then, because one of the parameters is `&self`, the return type gets the lifetime of `&self`, and all lifetimes have been accounted for.

#### 10-3-10 The Static Lifetime

`let s: &'static str = "I have a static lifetime.";`

The text of this string is stored directly in the binary of your program, which is always available. Therefore, the lifetime of all string literals is `'static`.

### 10-4 Generic Type Parameters Trait Bounds and Lifetimes Together

```rust
use std::fmt::Display;

fn longest_with_an_announcement<'a, T>(x: &'a str, y: &'a str, ann: T) -> &'a str
    where T: Display
{
    println!("Announcement! {}", ann);
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

This is the `longest` function now has an extra parameter named `ann` of the generic type `T`, which can be filled in by any type that implements the `Display` trait as specified by the `where` clause. This extra parameter will be printed before the function compares the lengths of the string slices, which is why the `Display` trait bound is necessary. Because lifetimes are a type of generic, the declarations of the lifetime parameter `'a`and the generic type parameter `T` go in the same list inside the angle brackets after the function name.

Generic type parameters let you apply the code to different types. Traits and trait bounds ensure that even though the types are generic, they’ll have the behavior the code needs. 

## 11 Writing Automated Tests

### 11-1 How to Write Tests

- Set up needed data or state
- Run test code
- Assert results are what you expect

#### 11-1-1 The Anatomy of a Test Function

At its simplest, a test in Rust is a function that’s annotated with the `test` attribute. Attributes are metadata about pieces of Rust code. To change a function into a test function, add `#[test]` on the line before `fn`.

#### 11-1-2 Checking Results with the `assert!` Macro

```rust
fn main() {}
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}
impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}
#[cfg(test)]
mod tests {
    // Because the tests module is an inner module, we need to bring the code under test in the outer module into the scope of the inner module. 
    use super::*;
    #[test]
    fn larger_can_hold_smaller() {
        let larger = Rectangle { width: 8, height: 7 };
        let smaller = Rectangle { width: 5, height: 1 };
        assert!(larger.can_hold(&smaller));
    }
}
```

#### 11-1-3 Testing Equality with the `assert_eq!` and `assert_ne!` Macros

The `assert_ne!` macro will pass if the two values we give it are not equal and fail if they’re equal. This macro is most useful for cases when we’re not sure what a value *will* be, but we know what the value definitely *won’t* be if our code is functioning as we intend.

Under the surface, the `assert_eq!` and `assert_ne!` macros use the operators `==` and `!=`, respectively. When the assertions fail, these macros print their arguments using debug formatting, which means the values being compared must implement the `PartialEq` and `Debug` traits. 

- For structs and enums that you define, you’ll need to implement `PartialEq` to assert that values of those types are equal or not equal. 
- You’ll need to implement `Debug` to print the values when the assertion fails.

#### 11-1-4 Adding Custom Failure Messages

```rust
pub fn greeting(name: &str) -> String {
    format!("Hello {}!", name)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn greeting_contains_name() {
        let result = greeting("Carol");
        assert!(
        result.contains("Carol"),
        "Greeting did not contain name, value was `{}`", result
    );
    }
}
```

#### 11-1-5 Checking for Panics with `should_panic`

```rust
pub struct Guess {
    value: i32,
}

impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 {
            panic!("Guess value must be greatr than or equal to 1, got {}.", value);
        } else if value > 100 {
            panic!("Guess value must be less than or equal to 100, got {}.", value);
        }

        Guess {
            value
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[should_panic(expected = "Guess value must be less than or equal to 100")]
    fn greater_than_100() {
        Guess::new(200);
    }
}
```

#### 11-1-6 Using `Result<T, E>` in Tests

```rust
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() -> Result<(), String> {
        if 2 + 2 == 4 {
            Ok(())
        } else {
            Err(String::from("two plus two does not equal four"))
        }
    }
}
```

### 11-2 Controlling How Tests Are Run

#### 11-2-1 Running Tests in Parallel or Consecutively

If you don’t want to run the tests in parallel or if you want more fine-grained control over the number of threads used: 

```bash
cargo test -- --test-threads=1
```

#### 11-2-2 Showing Function Output

If we want to see printed values for passing tests as well:

```bash
cargo test -- --nocapture
```

#### 11-2-3 Running a Subset of Tests by Name

- Running single tests: `cargo test func_name`
- Filtering to run multiple tests: `cargo test some` will run functions whose name contains `some`

#### 11-2-4 Ignoring Some Tests Unless Specifically Requested

```rust
#[test]
#[ignore]
fn expensive_test() {
    // code that takes an hour to run
}
```

 If we want to run only the ignored tests:

```bash
cargo test -- --ignored
```

### 11-3 Test Organization

The Rust community thinks about tests in terms of two main categories: *unit tests* and *integration tests*.

Writing both kinds of tests is important to ensure that the pieces of your library are doing what you expect them to, separately and together.

#### 11-3-1 Unit Tests

##### 11-3-1-1 The Tests Module and `#[cfg(test)]`

The `#[cfg(test)]` annotation on the tests module tells Rust to compile and run the test code only when you run `cargo test`, not when you run `cargo build`. 

##### 11-3-1-2 Testing Private Functions

Rust’s privacy rules do allow you to test private functions:

```rust
pub fn add_two(a: i32) -> i32 {
    internal_adder(a, 2)
}

fn internal_adder(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn internal() {
        assert_eq!(4, internal_adder(2, 2));
    }
}
```

#### 11-3-2 Integration Tests

##### 11-3-2-1 The tests Directory

We create a *tests* directory at the top level of our project directory, next to *src*.

```rust
use adder;

#[test]
fn it_adds_two() {
	assert_eq!(4, adder::add_two(2));
}
```

We’ve added `use adder` at the top because each test in the `tests` directory is a separate crate, so we need to bring our library into each test crate’s scope. We don’t need to annotate any code in *tests/integration_test.rs* with `#[cfg(test)]`. 

We can still run a particular integration test function by specifying the test function’s name as an argument to `cargo test`.

```bash
cargo test --test func_name
```

##### 11-3-2-2 Submodules in Integration Tests

```rust
// tests/common.rs
pub fn setup() {
    // setup code specific to your library's tests would go here
}
```

To avoid having `common` appear in the test output, instead of creating *tests/common.rs*, we’ll create *tests/common/mod.rs*. This is an alternate naming convention that Rust also understands. Naming the file this way tells Rust not to treat the `common` module as an integration test file. 

Now the section in the test output will no longer appear. Files in subdirectories of the *tests* directory don’t get compiled as separate crates or have sections in the test output.

##### 11-3-2-3 Integration Tests for Binary Crates

If our project is a binary crate that only contains a *src/main.rs* file and doesn’t have a *src/lib.rs* file, we can’t create integration tests in the *tests* directory and bring functions defined in the *src/main.rs* file into scope with a `use` statement. Only library crates expose functions that other crates can use; binary crates are meant to be run on their own.

This is one of the reasons Rust projects that provide a binary have a straightforward *src/main.rs* file that calls logic that lives in the *src/lib.rs* file. Using that structure, integration tests *can* test the library crate with `use` to make the important functionality available. If the important functionality works, the small amount of code in the *src/main.rs* file will work as well, and that small amount of code doesn’t need to be tested.


## 18 Patterns and Matching

A pattern consists of some combination of the following:

- Literals
- Destructured arrays, enums, structs, or tuples
- Variables
- Wildcards
- Placeholders

### 18-1 All the Places Patterns Can Be Used

#### 18-1-1 `match` Arms

```rust
match VALUE {
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
}
```

One requirement for `match` expressions is that they need to be *exhaustive* in the sense that all possibilities for the value in the `match` expression must be accounted for. 

#### 18-1-2 Conditional `if let` Expressions

```rust
fn main() {
	let favorite_color: Option<&str> = None;
    let is_tuesday = false;
    let age: Result<u8, _> = "34".parse();
    
    if let Some(color) = favorite_color {
    	println!("Using your favorite color, {}, as the background", color);
    } else if is_tuesday {
    	println!("Tuesday is green day!");
    } else if let Ok(age) = age {
    	if age > 30 {
        	println!("Using purple as the background color");
        } else {
        	println!("Using orange as the background color");
        }
    } else {
    	println!("Using blue as the background color");
    }
}
// Using purple as the background color
```

The line `if let Ok(age) = age` introduces a new shadowed `age` variable that contains the value inside the `Ok` variant. This means we need `if age > 30` condition within that block: we can’t  `if let Ok(age) = age && age > 30`. 

The downside of using `if let` expressions is that the compiler doesn’t check exhaustiveness, whereas with `match` expressions it does.

#### 18-1-3 `while let` Conditional Loops

```rust
let mut stack = Vec::new();

stack.push(1);
stack.push(2);
stack.push(3);
// a pattern match, loop running
while let Some(top) = stack.pop() {
	println!("{}", top);
}
```

#### 18-1-4 `for` Loops

```rust
// for x in y the x is the pattern
let v = vec!['a', 'b', 'c'];

for (index, value) in v.iter().enumerate() {
	println!("{} is at index {}", value, index);
}
```

#### 18-1-5 `let` Statements

```rust
let x = 5;
let PATTERN = EXPRESSION;
```

x is a pattern that means “bind what matches here to the variable x. Because the name `x` is the whole pattern, this pattern effectively means “bind everything to the variable `x`, whatever the value is.”

If we wanted to ignore one or more of the values in the tuple, we could use `_` or `..`.

#### 18-1-6 Function Parameters

Function parameters can also be patterns. 

```rust
fn foo(x: i32) {}

fn print_coordinates(&(x, y): &(i32, i32)) {
	println!("current location: ({}, {})", x, y);
}

fn main() {
	let point = (3, 5);
    print_coordinates(&point);
}
```

### 18-2 Refutability Whether a Pattern Might Fail to Match

Patterns that will match for any possible value passed are *irrefutable*. Patterns that can fail to match for some possible value are *refutable*. 

Function parameters, `let` statements, and `for` loops can only accept irrefutable patterns, because the program cannot do anything meaningful when values don’t match. 

The `if let` and `while let` expressions only accept refutable patterns, because by definition they’re intended to handle possible failure: the functionality of a conditional is in its ability to perform differently depending on success or failure.

```rust
let Some(x) = some_option_value;
// error[E0005]: refutable pattern in local binding: `None` not covered
```

If `some_option_value` was a `None` value, it would fail to match the pattern `Some(x)`, meaning the pattern is refutable. Because we didn’t cover (and couldn’t cover!) every valid value with the pattern `Some(x)`.

```rust
if let Some(x) = some_option_value {
	println!("{}", x);
}
```

If the pattern doesn’t match, the code will just skip the code in the curly brackets, giving it a way to continue validly.

It doesn’t make sense to use `if let` with an irrefutable pattern:

```rust
if let x = 5 {
	println!("{}", x);
}
// error[E0162]: irrefutable if-let pattern
```

### 18-3 Pattern Syntax

#### 18-3-1 Matching Literals

```rust
let x = 1;
match x {
	1 => println!("one");
    2 => println!("two");
    _ => println!("anything");
}
```

This syntax is useful when you want your code to take an action if it gets a particular concrete value.

#### 18-3-2 Matching Named Variables

```rust
fn main() {
    let x = Some(5);
    let y = 10;

    match x {
        Some(50) => println!("Got 50"),
        Some(y) => println!("Matched, y = {:?}", y),
        _ => println!("Default case, x = {:?}", x),
    }

    println!("at the end: x = {:?}, y = {:?}", x, y);
}
// Matched, y = 5
// at the end: x = Some(5), y = 10
```

#### 18-3-3 Multiple Patterns

```rust
let x = 1;

match x {
    1 | 2 => println!("one or two"),
    3 => println!("three"),
    _ => println!("anything"),
}
// one or two
```

#### 18-3-4 Matching Ranges of Values with `..=`

```rust
let x = 5;

match x {
	1..=5 => println!("one through five"),
    _ => println!("something else"),
}
// one through five
```

Ranges are only allowed with numeric values or `char` values, because the compiler checks that the range isn’t empty at compile time. The only types for which Rust can tell if a range is empty or not are `char` and numeric values.

```rust
let x = 'c';
match x {
    'a'..='j' => println!("early ASCII letter"),
    'k'..='z' => println!("late ASCII letter"),
    _ => println!("something else"),
}
// early ASCII letter
```

#### 18-3-5 Destructuring to Break Apart Values

##### 18-3-5-1 Destructuring Structs

```rust
struct Point {
	x: i32,
    y: i32,
}

fn main() {
	let p = Point {x: 0, y: 7}
    let Point {x: a, y: b} = p;
    assert_eq!(0, a);
    assert_eq!(7, b);
}
```

It’s common to want the variable names to match the field names to make it easier to remember which variables came from which fields.

There is a shorthand for patterns that match struct fields:

```rust
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 0, y: 7 };

    let Point { x, y } = p;
    assert_eq!(0, x);
    assert_eq!(7, y);
}
```

We can also destructure with literal values as part of the struct pattern rather than creating variables for all the fields. 

```rust
fn main() {
    let p = Point { x: 0, y: 7 };

    match p {
        Point { x, y: 0 } => println!("On the x axis at {}", x),
        Point { x: 0, y } => println!("On the y axis at {}", y),
        Point { x, y } => println!("On neither axis: ({}, {})", x, y),
    }
}
// On the y axis at 7
```

##### 18-3-5-2 Destructuring Enums

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

fn main() {
    let msg = Message::ChangeColor(0, 160, 255);

    match msg {
        Message::Quit => {
            println!("The Quit variant has no data to destructure.")
        },
        Message::Move { x, y } => {
            println!("Move in the x direction {} and in the y direction {}", x, y);
        }
        Message::Write(text) => println!("Text message: {}", text),
        Message::ChangeColor(r, g, b) => {
            println!("Change the color to red {}, green {}, and blue {}", r, g, b)
        }
    }
}
```

##### 18-3-5-3 Destructuring Nested Structs and Enums

```rust
enum Color {
   Rgb(i32, i32, i32),
   Hsv(i32, i32, i32),
}

enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(Color),
}

fn main() {
    let msg = Message::ChangeColor(Color::Hsv(0, 160, 255));

    match msg {
        Message::ChangeColor(Color::Rgb(r, g, b)) => {
            println!("Change the color to red {}, green {}, and blue {}", r, g, b)
        },
        Message::ChangeColor(Color::Hsv(h, s, v)) => {
            println!("Change the color to hue {}, saturation {}, and value {}", h, s, v)
        }
        _ => ()
    }
}
```

##### 18-3-5-4 Destructuring Structs and Tuples

```rust
let ((feet, inches), Point {x, y}) = ((3, 10), Point { x: 3, y: -10 });
```

#### 18-3-6 Ignoring Values in a Pattern

##### 18-3-6-1 Ignoring an Entire Value with `_`

```rust
fn foo(_: i32, y: i32) {
    println!("This code only uses the y parameter: {}", y);
}

fn main() {
    foo(3, 4);
}
```

##### 18-3-6-2 Ignoring Parts of a Value with a Nested `_`

```rust
let mut setting_value = Some(5);
let new_setting_value = Some(10);

match (setting_value, new_setting_value) {
    (Some(_), Some(_)) => {
        println!("Can't overwrite an existing customized value");
    }
    _ => {
        setting_value = new_setting_value;
    }
}

println!("setting is {:?}", setting_value);
```

In the first match arm, we don’t need to match on or use the values inside either `Some` variant, but we do need to test for the case when `setting_value` and `new_setting_value` are the `Some` variant. 

```rust
let numbers = (2, 4, 8, 16, 32);

match numbers {
    (first, _, third, _, fifth) => {
        println!("Some numbers: {}, {}, {}", first, third, fifth)
    },
}
```

##### 18-3-6-3 Ignoring an Unused Variable by Starting Its Name with `_`

```rust
fn main() {
    let _x = 5;
    let y = 10;
}
```

The syntax `_x` still binds the value to the variable, whereas `_` doesn’t bind at all. 

```rust
let s = Some(String::from("Hello!"));

if let Some(_s) = s {
    println!("found a string");
}

println!("{:?}", s);
```

We’ll receive an error because the `s` value will still be moved into `_s`, which prevents us from using `s` again. However, using the underscore by itself doesn’t ever bind to the value. 

```rust
let s = Some(String::from("Hello!"));

if let Some(_) = s {
    println!("found a string");
}

println!("{:?}", s);
```

##### 18-3-6-4 Ignoring Remaining Parts of a Value with `..`

```rust
struct Point {
    x: i32,
    y: i32,
    z: i32,
}

let origin = Point { x: 0, y: 0, z: 0 };

match origin {
    Point { x, .. } => println!("x is {}", x),
}
```

The syntax `..` will expand to as many values as it needs to be. 

```rust
fn main() {
    let numbers = (2, 4, 8, 16, 32);

    match numbers {
        (first, .., last) => {
            println!("Some numbers: {}, {}", first, last);
        },
    }
}
```

If it is unclear which values are intended for matching and which should be ignored, Rust will give us an error.

```rust
fn main() {
    let numbers = (2, 4, 8, 16, 32);

    match numbers {
        (.., second, ..) => {
            println!("Some numbers: {}", second)
        },
    }
}
// error: `..` can only be used once per tuple or tuple struct pattern
```

#### 18-3-7 Extra Conditionals with Match Guards

A *match guard* is an additional `if` condition specified after the pattern in a `match` arm that must also match, along with the pattern matching, for that arm to be chosen. Match guards are useful for expressing more complex ideas than a pattern alone allows.

```rust
let num = Some(4);

match num {
    Some(x) if x < 5 => println!("less than five: {}", x),
    Some(x) => println!("{}", x),
    None => (),
}
```

There is no way to express the `if x < 5` condition within a pattern, so the match guard gives us the ability to express this logic.

```rust
fn main() {
    let x = Some(5);
    let y = 10;

    match x {
        Some(50) => println!("Got 50"),
        // outer y
        Some(n) if n == y => println!("Matched, n = {:?}", n),
        _ => println!("Default case, x = {:?}", x),
    }

    println!("at the end: x = {:?}, y = {:?}", x, y);
}
// Default case, x = Some(5)
```

Use the *or* operator `|` in a match guard to specify multiple patterns.

```rust
let x = 4;
let y = false;

match x {
    4 | 5 | 6 if y => println!("yes"),
    _ => println!("no"),
}
// no
```

Only matches if the value of `x` is equal to `4`, `5`, or `6` *and* if `y` is `true`. 

#### 18-3-8 `@` Bindings

The *at* operator (`@`) lets us create a variable that holds a value at the same time we’re testing that value to see whether it matches a pattern. 

```rust
enum Message {
    Hello { id: i32 },
}

let msg = Message::Hello { id: 5 };

match msg {
    Message::Hello { id: id_variable @ 3..=7 } => {
        println!("Found an id in range: {}", id_variable)
    },
    Message::Hello { id: 10..=12 } => {
        println!("Found an id in another range")
    },
    Message::Hello { id } => {
        println!("Found some other id: {}", id)
    },
}
// Found an id in range: 5
```

In the second arm, where we only have a range specified in the pattern, the code associated with the arm doesn’t have a variable that contains the actual value of the `id` field. The `id` field’s value could have been 10, 11, or 12, but the code that goes with that pattern doesn’t know which it is. The pattern code isn’t able to use the value from the `id` field, because we haven’t saved the `id` value in a variable.

