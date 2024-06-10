---
title: The Rust Programming Language Brief Note (Vol5-Project)
date: 2019-12-03 12:00:00
categories: Coding
tags: [Rust, Web Server Multithreaded Server, Graceful Shutdown]
---

<div class="toc"><ul class="toc-item"><li><span><a href="#2-Programming-Guess" data-toc-modified-id="2-Programming-Guess-1">2 Programming Guess</a></span></li><li><span><a href="#12-An-I/O-Project:-Building-a-Command-Line-Program" data-toc-modified-id="12-An-I/O-Project:-Building-a-Command-Line-Program-2">12 An I/O Project: Building a Command Line Program</a></span></li><li><span><a href="#20-Final-Project,-Building-a-Multithreaded-Web-Server" data-toc-modified-id="20-Final-Project,-Building-a-Multithreaded-Web-Server-3">20 Final Project, Building a Multithreaded Web Server</a></span><ul class="toc-item"><li><span><a href="#20-1-Building-a-Single-Threaded-Web-Server" data-toc-modified-id="20-1-Building-a-Single-Threaded-Web-Server-3.1">20-1 Building a Single-Threaded Web Server</a></span><ul class="toc-item"><li><span><a href="#20-1-1-Listening-to-the-Tcp-Connection" data-toc-modified-id="20-1-1-Listening-to-the-Tcp-Connection-3.1.1">20-1-1 Listening to the Tcp Connection</a></span></li><li><span><a href="#20-1-2-Reading-the-Request" data-toc-modified-id="20-1-2-Reading-the-Request-3.1.2">20-1-2 Reading the Request</a></span></li><li><span><a href="#20-1-3-Writing-a-Response" data-toc-modified-id="20-1-3-Writing-a-Response-3.1.3">20-1-3 Writing a Response</a></span></li><li><span><a href="#20-1-4-Returning-Real-HTML" data-toc-modified-id="20-1-4-Returning-Real-HTML-3.1.4">20-1-4 Returning Real HTML</a></span></li><li><span><a href="#20-1-5-Validating-the-Request-and-Selectively-Responding" data-toc-modified-id="20-1-5-Validating-the-Request-and-Selectively-Responding-3.1.5">20-1-5 Validating the Request and Selectively Responding</a></span></li><li><span><a href="#20-1-6-A-Touch-of-Refactoring" data-toc-modified-id="20-1-6-A-Touch-of-Refactoring-3.1.6">20-1-6 A Touch of Refactoring</a></span></li></ul></li><li><span><a href="#20-2-Turning-Our-Single-Threaded-Server-into-a-Multithreaded-Server" data-toc-modified-id="20-2-Turning-Our-Single-Threaded-Server-into-a-Multithreaded-Server-3.2">20-2 Turning Our Single-Threaded Server into a Multithreaded Server</a></span><ul class="toc-item"><li><span><a href="#20-2-1-Simulating-a-Slow-Request-in-the-Current-Server-Implementation" data-toc-modified-id="20-2-1-Simulating-a-Slow-Request-in-the-Current-Server-Implementation-3.2.1">20-2-1 Simulating a Slow Request in the Current Server Implementation</a></span></li><li><span><a href="#20-2-2-Improving-Throughput-with-a-Thread-Pool" data-toc-modified-id="20-2-2-Improving-Throughput-with-a-Thread-Pool-3.2.2">20-2-2 Improving Throughput with a Thread Pool</a></span><ul class="toc-item"><li><span><a href="#20-2-2-1-Code-Structure-If-We-Could-Spawn-a-Thread-for-Each-Request" data-toc-modified-id="20-2-2-1-Code-Structure-If-We-Could-Spawn-a-Thread-for-Each-Request-3.2.2.1">20-2-2-1 Code Structure If We Could Spawn a Thread for Each Request</a></span></li><li><span><a href="#20-2-2-2-Creating-a-Similar-Interface-for-a-Finite-Number-of-Threads" data-toc-modified-id="20-2-2-2-Creating-a-Similar-Interface-for-a-Finite-Number-of-Threads-3.2.2.2">20-2-2-2 Creating a Similar Interface for a Finite Number of Threads</a></span></li><li><span><a href="#20-2-2-3-Building-the-ThreadPool-Struct-Using-Compiler-Driven-Development" data-toc-modified-id="20-2-2-3-Building-the-ThreadPool-Struct-Using-Compiler-Driven-Development-3.2.2.3">20-2-2-3 Building the <code>ThreadPool</code> Struct Using Compiler Driven Development</a></span></li><li><span><a href="#20-2-2-4-Validating-the-Number-of-Threads-in-new" data-toc-modified-id="20-2-2-4-Validating-the-Number-of-Threads-in-new-3.2.2.4">20-2-2-4 Validating the Number of Threads in <code>new</code></a></span></li><li><span><a href="#20-2-2-5-Creating-Space-to-Store-the-Threads" data-toc-modified-id="20-2-2-5-Creating-Space-to-Store-the-Threads-3.2.2.5">20-2-2-5 Creating Space to Store the Threads</a></span></li><li><span><a href="#20-2-2-6-A-Worker-Struct-Responsible-for-Sending-Code-from-the-ThreadPool-to-a-Thread" data-toc-modified-id="20-2-2-6-A-Worker-Struct-Responsible-for-Sending-Code-from-the-ThreadPool-to-a-Thread-3.2.2.6">20-2-2-6 A <code>Worker</code> Struct Responsible for Sending Code from the <code>ThreadPool</code> to a Thread</a></span></li><li><span><a href="#20-2-2-7-Sending-Requests-to-Threads-via-Channels" data-toc-modified-id="20-2-2-7-Sending-Requests-to-Threads-via-Channels-3.2.2.7">20-2-2-7 Sending Requests to Threads via Channels</a></span></li><li><span><a href="#20-2-2-8-Implementing-the-execute-Method" data-toc-modified-id="20-2-2-8-Implementing-the-execute-Method-3.2.2.8">20-2-2-8 Implementing the <code>execute</code> Method</a></span></li></ul></li></ul></li><li><span><a href="#20-3-Graceful-Shutdown-and-Cleanup" data-toc-modified-id="20-3-Graceful-Shutdown-and-Cleanup-3.3">20-3 Graceful Shutdown and Cleanup</a></span><ul class="toc-item"><li><span><a href="#20-3-1-Implementing-the-Drop-Trait-on-ThreadPool" data-toc-modified-id="20-3-1-Implementing-the-Drop-Trait-on-ThreadPool-3.3.1">20-3-1 Implementing the <code>Drop</code> Trait on <code>ThreadPool</code></a></span></li><li><span><a href="#20-3-2-Signaling-to-the-Threads-to-Stop-Listening-for-Jobs" data-toc-modified-id="20-3-2-Signaling-to-the-Threads-to-Stop-Listening-for-Jobs-3.3.2">20-3-2 Signaling to the Threads to Stop Listening for Jobs</a></span></li></ul></li></ul></li></ul></div>

## 2 Programming Guess


```rust
let foo = 5; // immutable 
let mut bar = 5; // mutable

io::stdin().read_line(&mut guess) 
    .expect("Failed to read line");

let guess: u32 = guess.trim().parse()
	.expect("input a number");

let guess: u32 = match guess.trim().parse() {
     Ok(num) => num,
     Err(_) => continue,
};

match guess.cmp(&secret_number) { 
     Ordering::Less => println!("Too small!"), 
     Ordering::Greater => println!("Too big!"), 
     Ordering::Equal => {
     	println!("You win!");
    	break;
    }
}
```

```bash
cargo doc --open // documents
```

<!--more-->

`let mut guess = String::new();` line has created a mutable variable that is currently bound to a new, empty instance of a String.

`io::stdin().read_line(&mut guess)` reference, just like C pointer;

`.expect('something);` `read_line` method return a Result type, The Result types are enumerations, often referred to as enums.  just like C enum to haddle errors. It's also a callback.

Remember that a `crate` is a collection of Rust source code files. The project we’ve been building is a binary crate, which is an executable. The rand crate is a library crate, which contains code intended to be used in other programs.

A `match` expression is made up of arms. An *arm* consists of a *pattern* and the code that should be run if the value given to the beginning of the `match` expression fits that arm’s pattern. 

Rust allows us to *shadow* the previous value of `guess` with a new one. This feature is often used in situations in which you want to convert a value from one type to another type.

We bind `guess` to the expression `guess.trim().parse()`. The `guess` in the expression refers to the original `guess` that was a `String` with the input in it. The `trim` method on a `String` instance will eliminate any whitespace at the beginning and end. Although `u32` can contain only numerical characters, the user must press enter to satisfy `read_line`. When the user presses enter, a newline character is added to the string. For example, if the user types 5 and presses enter, `guess` looks like this: `5\n`. The `\n` represents “newline,” the result of pressing enter. The `trim` method eliminates `\n`, resulting in just `5`.

The colon (`:`) after `guess` tells Rust we’ll annotate the variable’s type.

Switching from an `expect` call to a `match` expression is how you generally move from crashing on an error to handling the error. Remember that `parse` returns a `Result` type and `Result` is an enum that has the variants `Ok` or `Err`. We’re using a `match` expression here, as we did with the `Ordering` result of the `cmp` method.

- That `Ok` value will match the first arm’s pattern, and the `match` expression will just return the `num` value that `parse` produced and put inside the `Ok` value. 
- If `parse` is *not* able to turn the string into a number, it will return an `Err` value that contains more information about the error. The `Err` value does not match the `Ok(num)` pattern in the first `match`arm, but it does match the `Err(_)` pattern in the second arm. 


## 12 An I/O Project: Building a Command Line Program

```rust
fn main() {
    // collect is one function you do often need to annotate because Rust isn’t able to infer the kind of collection you want
    // immediately use collect to turn the iterator into a vector containing all the values produced by the iterator
    let args: Vec<String> = env::args().collect();
    let query = &args[1];
    let filename = &args[2];
    let contents = fs::read_to_string(filename)
    	.expect("wrong reading file...");
}
// cargo run test text
```

- `std::env::args` returns an iterator that produces `String` values

- `std::env::args_os` returns an iterator that produces `OsString` values

```rust
// Extracting the Argument Parser
fn main() {
    let args: Vec<String> = env::args().collect();
    let (query, filename) = parse_config(&args);
    let contents = fs::read_to_string(filename)
    	.expect("wrong reading file...");
}
fn parse_config(args: &[String]) -> (&str, &str) {
	let query = &args[1];
    let filename = &args[2];
    (query, filename)
}
```

It’s okay to use `clone` to copy a few strings to continue making progress.

```rust
// Grouping Configuration Values
fn main() {
	let args: Vec<String> = env::args().collect();
    let config = parse_config(&args);
    let contents = fs::read_to_string(config.filename)
    	.expect("wrong reading file...");
}
struct Config {
	query: String,
    filename: String,
}
fn parse_config(&args: &[String]) -> Config {
	let query = args[1].clone();
    let filename = args[2].clone();
    Config {query, filename}
}
```

`parse_config` function is to create a `Config` instance, we can change `parse_config` from a plain function to a function named `new` that is associated with the `Config` struct. 

```rust
// Creating a Constructor for Config
fn main() {
	let args: Vec<String> = env::args().collect();
    let config = Config::new(&args);
    let contents = fs::read_to_string(config.filename)
    	.expect("wrong reading file...");
}
struct Config {
	query: String,
    filename: String,
}
impl Config {
	fn new(&args: &[String]) -> Config {
    	let query = args[1].clone();
        let filename = args[2].clone();
        Config {query, filename}
    }
}
```

```rust
// Improving the Error Message
fn new(&args: &[String]) -> Config {
	if args.len() < 3 {
    	panic!("not enough arguments);
    }
}
```

```rust
// USE
// Returning a Result from new Instead of Calling panic!
impl Config {
	fn new(args: &[String]) -> Result<Config, &'static str> {
    	if args.len() < 3 {
        	return Err("not enough arguments");
        }
        let query = args[1].clone();
        let filename = args[2].clone();
        Ok(Config { query, filename})
    }
}
```

```rust
// USE
// Calling Config::new and Handling Errors
use std::process;
fn main() {
	let args: Vec<String> = env::args().collect();
    // Using unwrap_or_else allows us to define some custom, non-panic! error handling.
    let config = Config::new(&args).unwrap_or_else(|err| {
        println!("Problem parsing arguments: {}", err);
        process::exit(1);
    });
}
```

```rust
// Extracting Logic from main
fn main() {
	// --snip--
    run(config);
}
fn run(config: Config) {
	let contents = fs::read_to_string(config.filename)
    	.expect("wrong reading file...");
}
```

```rust
// USE
// Returning Errors from the run Function
use std::error::Error;
fn run(config: Config) -> Result<(), Box<dyn Error>> {
    // removed the call to expect in favor of ? rather than panic! on an error,
    // ? will return the error value from the current function for the caller to handle.
	let contents = fs::read_to_string(config.filename)?;
    Ok(())
}
```

```rust
// USE
// Handling Errors Returned from run in main
fn main() {
	if let Err(e) = run(config) {
    	println!("App error: {}", e);
        process::exit(1);
    }
}
```

```rust
// USE
// Spliting Code into a Library Crate
// src/lib.rs
use std::error::Error;
use std::fs;
pub struct Config {
	pub query: String,
    pub filename: String,
}
impl Config {
	pub fn new(args: &[String]) -> Result<Config, &'static str> {
    }
}
pub fn run(config: Config) -> Result<(), Box<dyn Error>> {
}
// src/main.rs
extern crate minigrep;
use std::env;
use std::process;
use minigrep::Config;
fn main() {
	if len Err(e) = minigrep::run(config) {
    }
}
```

- Test-Driven
    - Write a test that fails and run it to make sure it fails for the reason you expect.
    - Write or modify just enough code to make the new test pass.
    - Refactor the code you just added or changed and make sure the tests continue to pass.
    - Repeat from step 1!

The whole code can be found here: [Coding-Collections/Rust/minigrep](https://github.com/hscspring/Coding-Collections/tree/master/Rust/minigrep).

## 20 Final Project, Building a Multithreaded Web Server

### 20-1 Building a Single-Threaded Web Server

Rust is a systems programming language, we can choose the level of abstraction we want to work with and can go to a lower level than is possible or practical in other languages.

#### 20-1-1 Listening to the Tcp Connection

```rust
use std::net::TcpListener;

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        println!("Connection established!");
    }
}
```

The `bind` function in this scenario works like the `new` function in that it will return a new `TcpListener` instance. he `bind` function returns a `Result`, which indicates that binding might fail. 

The `incoming` method on `TcpListener` returns an iterator that gives us a sequence of streams (more specifically, streams of type `TcpStream`). A single *stream* represents an open connection between the client and the server. A *connection* is the name for the full request and response process in which a client connects to the server, the server generates a response, and the server closes the connection. As such, `TcpStream` will read from itself to see what the client sent and then allow us to write our response to the stream. Overall, this `for` loop will process each connection in turn and produce a series of streams for us to handle.

`unwrap` terminate our program if the stream has any errors. The reason we might receive errors from the `incoming` method when a client connects to the server is that we’re not actually iterating over connections. Instead, we’re iterating over *connection attempts*. The connection might not be successful for a number of reasons, many of them operating system specific.

#### 20-1-2 Reading the Request

```rust
use std::io::prelude::*;
use std::net::TcpStream;
use std::net::TcpListener;

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        handle_connection(stream);
    }
}

fn handle_connection(mut stream: TcpStream) {
    let mut buffer = [0; 512];

    stream.read(&mut buffer).unwrap();

    println!("Request: {}", String::from_utf8_lossy(&buffer[..]));
}
```

In the `handle_connection` function, we’ve made the `stream` parameter mutable. The reason is that the `TcpStream` instance keeps track of what data it returns to us internally. It might read more data than we asked for and save that data for the next time we ask for data. 

`stream.read` will read bytes from the `TcpStream` and put them in the buffer. `String::from_utf8_lossy` function takes a `&[u8]` and produces a `String` from it. The “lossy” part of the name indicates the behavior of this function when it sees an invalid UTF-8 sequence: it will replace the invalid sequence with `�`, the `U+FFFD REPLACEMENT CHARACTER`.

#### 20-1-3 Writing a Response

```rust
fn handle_connection(mut stream: TcpStream) {
    let mut buffer = [0; 512];

    stream.read(&mut buffer).unwrap();

    let response = "HTTP/1.1 200 OK\r\n\r\n";

    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}
```

`write` method on `stream` takes a `&[u8]` and sends those bytes directly down the connection. Because the `write` operation could fail, we use `unwrap` on any error result as before. Again, in a real application you would add error handling here. 

`flush` will wait and prevent the program from continuing until all the bytes are written to the connection; `TcpStream` contains an internal buffer to minimize calls to the underlying operating system.

#### 20-1-4 Returning Real HTML

```rust
use std::fs;
// --snip--

fn handle_connection(mut stream: TcpStream) {
    let mut buffer = [0; 512];
    stream.read(&mut buffer).unwrap();

    let contents = fs::read_to_string("hello.html").unwrap();

    let response = format!("HTTP/1.1 200 OK\r\n\r\n{}", contents);

    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}
```

#### 20-1-5 Validating the Request and Selectively Responding

```rust
fn handle_connection(mut stream: TcpStream) {
    let mut buffer = [0; 512];
    stream.read(&mut buffer).unwrap();

    let get = b"GET / HTTP/1.1\r\n";

    if buffer.starts_with(get) {
        let contents = fs::read_to_string("hello.html").unwrap();

        let response = format!("HTTP/1.1 200 OK\r\n\r\n{}", contents);

        stream.write(response.as_bytes()).unwrap();
        stream.flush().unwrap();
    } else {
        let status_line = "HTTP/1.1 404 NOT FOUND\r\n\r\n";
        let contents = fs::read_to_string("404.html").unwrap();
        
        let response = format!("{}{}", status_line, contents);
        
        stream.write(response.as_bytes()).unwrap();
        stream.flush().unwrap();
    }
}
```

#### 20-1-6 A Touch of Refactoring

```rust
fn handle_connection(mut stream: TcpStream) {
    // --snip--

    let (status_line, filename) = if buffer.starts_with(get) {
        ("HTTP/1.1 200 OK\r\n\r\n", "hello.html")
    } else {
        ("HTTP/1.1 404 NOT FOUND\r\n\r\n", "404.html")
    };

    let contents = fs::read_to_string(filename).unwrap();

    let response = format!("{}{}", status_line, contents);

    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}
```

The code can be found [here](https://github.com/hscspring/Coding-Collections/tree/master/Rust/hellosingle).

### 20-2 Turning Our Single-Threaded Server into a Multithreaded Server

#### 20-2-1 Simulating a Slow Request in the Current Server Implementation

There are multiple ways we could change how our web server works to avoid having more requests back up behind a slow request; the one we’ll implement is a thread pool.

```rust
use std::thread;
use std::time::Duration;
// --snip--

fn handle_connection(mut stream: TcpStream) {
    // --snip--

    let get = b"GET / HTTP/1.1\r\n";
    let sleep = b"GET /sleep HTTP/1.1\r\n";

    let (status_line, filename) = if buffer.starts_with(get) {
        ("HTTP/1.1 200 OK\r\n\r\n", "hello.html")
    } else if buffer.starts_with(sleep) {
        thread::sleep(Duration::from_secs(5));
        ("HTTP/1.1 200 OK\r\n\r\n", "hello.html")
    } else {
        ("HTTP/1.1 404 NOT FOUND\r\n\r\n", "404.html")
    };

    // --snip--
}
```

#### 20-2-2 Improving Throughput with a Thread Pool

A *thread pool* is a group of spawned threads that are waiting and ready to handle a task. As requests come in, they’ll be sent to the pool for processing. The pool will maintain a queue of incoming requests. Each of the threads in the pool will pop off a request from this queue, handle the request, and then ask the queue for another request.

When you’re trying to design code, writing the client interface first can help guide your design. Write the API of the code so it’s structured in the way you want to call it; then implement the functionality within that structure rather than implementing the functionality and then designing the public API.

We’ll use compiler-driven development here. We’ll write the code that calls the functions we want, and then we’ll look at errors from the compiler to determine what we should change next to get the code to work.

##### 20-2-2-1 Code Structure If We Could Spawn a Thread for Each Request

```rust
fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        thread::spawn(|| {
            handle_connection(stream);
        });
    }
}
```

`thread::spawn` will create a new thread and then run the code in the closure in the new thread.

##### 20-2-2-2 Creating a Similar Interface for a Finite Number of Threads

```rust
// src/bin/main.rs
fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    let pool = ThreadPool::new(4);

    for stream in listener.incoming() {
        let stream = stream.unwrap();

        pool.execute(|| {
            handle_connection(stream);
        });
    }
}
```

We need to implement `pool.execute` so it takes the closure and gives it to a thread in the pool to run. This code won’t yet compile, but we’ll try so the compiler can guide us in how to fix it.

##### 20-2-2-3 Building the `ThreadPool` Struct Using Compiler Driven Development

`cargo check`

```rust
// src/lib.rs
pub struct ThreadPool;

impl ThreadPool {
    pub fn new(size: usize) -> ThreadPool {
        ThreadPool
    }
    
    // from thread::spawn, because we want a similar function
    pub fn execute<F>(&self, f: F)
        where
            F: FnOnce() + Send + 'static
    {

    }
}
```

##### 20-2-2-4 Validating the Number of Threads in `new`

```rust
// src/lib.rs
impl ThreadPool {
    /// Create a new ThreadPool.
    ///
    /// The size is the number of threads in the pool.
    ///
    /// # Panics
    ///
    /// The `new` function will panic if the size is zero.
    pub fn new(size: usize) -> ThreadPool {
        assert!(size > 0);

        ThreadPool
    }

    // --snip--
}
```

or 

```rust
pub fn new(size: usize) -> Result<ThreadPool, PoolCreationError> {}
```

##### 20-2-2-5 Creating Space to Store the Threads

```rust
// src/lib.rs
use std::thread;

pub struct ThreadPool {
    // from thread::spawn, returns JoinHandle<T>
    threads: Vec<thread::JoinHandle<()>>,
}

impl ThreadPool {
    // --snip--
    pub fn new(size: usize) -> ThreadPool {
        assert!(size > 0);

        let mut threads = Vec::with_capacity(size);

        for _ in 0..size {
            // create some threads and store them in the vector
        }

        ThreadPool {
            threads
        }
    }

    // --snip--
}
```

We’ve brought `std::thread` into scope in the library crate, because we’re using `thread::JoinHandle` as the type of the items in the vector in `ThreadPool`.

Once a valid size is received, our `ThreadPool` creates a new vector that can hold `size` items. `with_capacity`  performs the same task as `Vec::new` but with an important difference: it preallocates space in the vector. Because we know we need to store `size` elements in the vector, doing this allocation up front is slightly more efficient than using `Vec::new`, which resizes itself as elements are inserted.

##### 20-2-2-6 A `Worker` Struct Responsible for Sending Code from the `ThreadPool` to a Thread

The standard library provides `thread::spawn` as a way to create threads, and `thread::spawn` expects to get some code the thread should run as soon as the thread is created. However, in our case, we want to create the threads and have them *wait* for code that we’ll send later. 

Instead of storing a vector of `JoinHandle<()>` instances in the thread pool, we’ll store instances of the `Worker` struct. Each `Worker` will store a single `JoinHandle<()>` instance. Then we’ll implement a method on `Worker` that will take a closure of code to run and send it to the already running thread for execution. We’ll also give each worker an `id` so we can distinguish between the different workers in the pool when logging or debugging.

When we create a `ThreadPool` we’ll implement the code that sends the closure to the thread after we have `Worker` set up in this way:

1. Define a `Worker` struct that holds an `id` and a `JoinHandle<()>`.
2. Change `ThreadPool` to hold a vector of `Worker` instances.
3. Define a `Worker::new` function that takes an `id` number and returns a `Worker` instance that holds the `id` and a thread spawned with an empty closure.
4. In `ThreadPool::new`, use the `for` loop counter to generate an `id`, create a new `Worker` with that `id`, and store the worker in the vector.

```rust
// src/lib.rs
use std::thread;

pub struct ThreadPool {
    workers: Vec<Worker>,
}

impl ThreadPool {
    // --snip--
    pub fn new(size: usize) -> ThreadPool {
        assert!(size > 0);

        let mut workers = Vec::with_capacity(size);

        for id in 0..size {
            workers.push(Worker::new(id));
        }

        ThreadPool {
            workers
        }
    }
    // --snip--
}

struct Worker {
    id: usize,
    thread: thread::JoinHandle<()>,
}

impl Worker {
    fn new(id: usize) -> Worker {
        let thread = thread::spawn(|| {});

        Worker {
            id,
            thread,
        }
    }
}
```

##### 20-2-2-7 Sending Requests to Threads via Channels

Currently, we get the closure we want to execute in the `execute` method. But we need to give `thread::spawn` a closure to run when we create each `Worker` during the creation of the `ThreadPool`.

We want the `Worker` structs that we just created to fetch code to run from a queue held in the `ThreadPool` and send that code to its thread to run.

We’ll use a channel to function as the queue of jobs, and `execute` will send a job from the `ThreadPool` to the `Worker` instances, which will send the job to its thread. Here is the plan:

1. The `ThreadPool` will create a channel and hold on to the sending side of the channel.
2. Each `Worker` will hold on to the receiving side of the channel.
3. We’ll create a new `Job` struct that will hold the closures we want to send down the channel.
4. The `execute` method will send the job it wants to execute down the sending side of the channel.
5. In its thread, the `Worker` will loop over its receiving side of the channel and execute the closures of any jobs it receives.

```rust
// src/lib.rs
// --snip--
use std::sync::mpsc;

pub struct ThreadPool {
    workers: Vec<Worker>,
    sender: mpsc::Sender<Job>,
}

struct Job;

impl ThreadPool {
    // --snip--
    pub fn new(size: usize) -> ThreadPool {
        assert!(size > 0);

        let (sender, receiver) = mpsc::channel();

        let mut workers = Vec::with_capacity(size);

        for id in 0..size {
            workers.push(Worker::new(id));
        }

        ThreadPool {
            workers,
            sender,
        }
    }
    // --snip--
}
```

In `ThreadPool::new`, we create our new channel and have the pool hold the sending end. 

```rust
impl ThreadPool {
    // --snip--
    pub fn new(size: usize) -> ThreadPool {
        assert!(size > 0);

        let (sender, receiver) = mpsc::channel();

        let mut workers = Vec::with_capacity(size);

        for id in 0..size {
            workers.push(Worker::new(id, receiver));
        }

        ThreadPool {
            workers,
            sender,
        }
    }
    // --snip--
}

// --snip--

impl Worker {
    fn new(id: usize, receiver: mpsc::Receiver<Job>) -> Worker {
        let thread = thread::spawn(|| {
            receiver;
        });

        Worker {
            id,
            thread,
        }
    }
}
```

We pass the receiving end of the channel into `Worker::new`, and then we use it inside the closure.

The code is trying to pass `receiver` to multiple `Worker` instances. This won’t work, as you’ll recall from Chapter 16: the channel implementation that Rust provides is multiple *producer*, single *consumer*. This means we can’t just clone the consuming end of the channel to fix this code. Even if we could, that is not the technique we would want to use; instead, we want to distribute the jobs across threads by sharing the single `receiver` among all the workers.

Additionally, taking a job off the channel queue involves mutating the `receiver`, so the threads need a safe way to share and modify `receiver`; otherwise, we might get race conditions (as covered in Chapter 16).

To share ownership across multiple threads and allow the threads to mutate the value, we need to use `Arc<Mutex<T>>`. The `Arc` type will let multiple workers own the receiver, and `Mutex` will ensure that only one worker gets a job from the receiver at a time. 

```rust
// src/lib.rs
use std::sync::Arc;
use std::sync::Mutex;
// --snip--

impl ThreadPool {
    // --snip--
    pub fn new(size: usize) -> ThreadPool {
        assert!(size > 0);

        let (sender, receiver) = mpsc::channel();

        let receiver = Arc::new(Mutex::new(receiver));

        let mut workers = Vec::with_capacity(size);

        for id in 0..size {
            workers.push(Worker::new(id, Arc::clone(&receiver)));
        }

        ThreadPool {
            workers,
            sender,
        }
    }

    // --snip--
}

impl Worker {
    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {
        // --snip--
    }
}
```

We put the receiving end of the channel in an `Arc` and a `Mutex`. For each new worker, we clone the `Arc` to bump the reference count so the workers can share ownership of the receiving end.

##### 20-2-2-8 Implementing the `execute` Method

We’ll change `Job` from a struct to a type alias for a trait object that holds the type of closure that `execute` receives. 

```rust
// src/lib.rs
type Job = Box<dyn FnOnce() + Send + 'static>;

impl ThreadPool {
    // --snip--

    pub fn execute<F>(&self, f: F)
        where
            F: FnOnce() + Send + 'static
    {
        let job = Box::new(f);

        self.sender.send(job).unwrap();
    }
}
```

After creating a new `Job` instance using the closure we get in `execute`, we send that job down the sending end of the channel. We’re calling `unwrap` on `send` for the case that sending fails. The reason we use `unwrap` is that we know the failure case won’t happen, but the compiler doesn’t know that.

Now we need the closure to loop forever, asking the receiving end of the channel for a job and running the job when it gets one. 

```rust
impl Worker {
    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {
        let thread = thread::spawn(move || {
            loop {
                let job = receiver.lock().unwrap().recv().unwrap();

                println!("Worker {} got a job; executing.", id);

                (*job)();
            }
        });

        Worker {
            id,
            thread,
        }
    }
}
```

Here, we first call `lock` on the `receiver` to acquire the mutex, and then we call `unwrap` to panic on any errors. Acquiring a lock might fail if the mutex is in a *poisoned* state, which can happen if some other thread panicked while holding the lock rather than releasing the lock. In this situation, calling `unwrap` to have this thread panic is the correct action to take. 

If we get the lock on the mutex, we call `recv` to receive a `Job` from the channel. A final `unwrap` moves past any errors here as well, which might occur if the thread holding the sending side of the channel has shut down, similar to how the `send` method returns `Err` if the receiving side shuts down.

The call to `recv` blocks, so if there is no job yet, the current thread will wait until a job becomes available. The `Mutex` ensures that only one `Worker` thread at a time is trying to request a job.

```bash
error[E0161]: cannot move a value of type std::ops::FnOnce() +
std::marker::Send: the size of std::ops::FnOnce() + std::marker::Send cannot be
statically determined
  --> src/lib.rs:63:17
   |
63 |                 (*job)();
   |                 ^^^^^^
```

This error is fairly cryptic because the problem is fairly cryptic. To call a `FnOnce` closure that is stored in a `Box` (which is what our `Job` type alias is), the closure needs to move itself *out* of the `Box` because the closure takes ownership of `self` when we call it. In general, Rust doesn’t allow us to move a value out of a `Box` because Rust doesn’t know how big the value inside the `Box` will be: recall in Chapter 15 that we used `Box` precisely because we had something of an unknown size that we wanted to store in a `Box` to get a value of a known size.

We can write methods that use the syntax `self: Box`, which allows the method to take ownership of a `Self` value stored in a `Box`. That’s exactly what we want to do here, but unfortunately Rust won’t let us: the part of Rust that implements behavior when a closure is called isn’t implemented using `self: Box`. So Rust doesn’t yet understand that it could use `self: Box` in this situation to take ownership of the closure and move the closure out of the `Box`.

We can tell Rust explicitly that in this case we can take ownership of the value inside the `Box` using `self: Box`; then, once we have ownership of the closure, we can call it. This involves defining a new trait `FnBox` with the method `call_box` that will use `self: Box` in its signature, defining `FnBox` for any type that implements `FnOnce()`, changing our type alias to use the new trait, and changing `Worker` to use the `call_box` method. 

```rust
trait FnBox {
    fn call_box(self: Box<Self>);
}

impl<F: FnOnce()> FnBox for F {
    fn call_box(self: Box<F>) {
        (*self)()
    }
}

type Job = Box<dyn FnBox + Send + 'static>;

// --snip--

impl Worker {
    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {
        let thread = thread::spawn(move || {
            loop {
                let job = receiver.lock().unwrap().recv().unwrap();

                println!("Worker {} got a job; executing.", id);

                job.call_box();
            }
        });

        Worker {
            id,
            thread,
        }
    }
}
```

First, we create a new trait named `FnBox`. This trait has the one method `call_box`, which is similar to the `call` methods on the other `Fn*` traits except that it takes `self: Box` to take ownership of `self` and move the value out of the `Box`.

Next, we implement the `FnBox` trait for any type `F` that implements the `FnOnce()` trait. Effectively, this means that any `FnOnce()` closures can use our `call_box` method. The implementation of `call_box` uses `(*self)()` to move the closure out of the `Box` and call the closure.

We now need our `Job` type alias to be a `Box` of anything that implements our new trait `FnBox`. This will allow us to use `call_box` in `Worker` when we get a `Job` value instead of invoking the closure directly. Implementing the `FnBox` trait for any `FnOnce()` closure means we don’t have to change anything about the actual values we’re sending down the channel. Now Rust is able to recognize that what we want to do is fine.

> Note: if you open */sleep* in multiple browser windows simultaneously, they might load one at a time in 5 second intervals. Some web browsers execute multiple instances of the same request sequentially for caching reasons. This limitation is not caused by our web server.

```rust
impl Worker {
    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {
        let thread = thread::spawn(move || {
            while let Ok(job) = receiver.lock().unwrap().recv() {
                println!("Worker {} got a job; executing.", id);

                job.call_box();
            }
        });

        Worker {
            id,
            thread,
        }
    }
}
```

This code compiles and runs but doesn’t result in the desired threading behavior: a slow request will still cause other requests to wait to be processed. 

The reason is somewhat subtle: the `Mutex` struct has no public `unlock` method because the ownership of the lock is based on the lifetime of the `MutexGuard` within the `LockResult>` that the `lock` method returns. At compile time, the borrow checker can then enforce the rule that a resource guarded by a `Mutex` cannot be accessed unless we hold the lock. But this implementation can also result in the lock being held longer than intended if we don’t think carefully about the lifetime of the `MutexGuard`. Because the values in the `while` expression remain in scope for the duration of the block, the lock remains held for the duration of the call to `job.call_box()`, meaning other workers cannot receive jobs.

By using `loop` instead and acquiring the lock and a job within the block rather than outside it, the `MutexGuard` returned from the `lock` method is dropped as soon as the `let job` statement ends. This ensures that the lock is held during the call to `recv`, but it is released before the call to `job.call_box()`, allowing multiple requests to be serviced concurrently.

### 20-3 Graceful Shutdown and Cleanup

Now we’ll implement the `Drop` trait to call `join` on each of the threads in the pool so they can finish the requests they’re working on before closing. Then we’ll implement a way to tell the threads they should stop accepting new requests and shut down. 

#### 20-3-1 Implementing the `Drop` Trait on `ThreadPool`

When the pool is dropped, our threads should all join to make sure they finish their work. 

```rust
// src/lib.rs
impl Drop for ThreadPool {
    fn drop(&mut self) {
        for worker in &mut self.workers {
            println!("Shutting down worker {}", worker.id);

            worker.thread.join().unwrap();
        }
    }
}
```

The error tells us we can’t call `join` because we only have a mutable borrow of each `worker` and `join` takes ownership of its argument. To solve this issue, we need to move the thread out of the `Worker` instance that owns `thread` so `join` can consume the thread. 

A `Worker` that is running will have a `Some` variant in `thread`, and when we want to clean up a `Worker`, we’ll replace `Some` with `None` so the `Worker` doesn’t have a thread to run.

```rust
struct Worker {
    id: usize,
    thread: Option<thread::JoinHandle<()>>,
}
```

We need to wrap the `thread` value in `Some` when we create a new `Worker`. We mentioned earlier that we intended to call `take` on the `Option` value to move `thread` out of `worker`. 

```rust
impl Worker {
    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Job>>>) -> Worker {
        // --snip--

        Worker {
            id,
            thread: Some(thread),
        }
    }
}

impl Drop for ThreadPool {
    fn drop(&mut self) {
        for worker in &mut self.workers {
            println!("Shutting down worker {}", worker.id);

            if let Some(thread) = worker.thread.take() {
                thread.join().unwrap();
            }
        }
    }
}
```

The `take` method on `Option` takes the `Some` variant out and leaves `None` in its place. We’re using `if let` to destructure the `Some` and get the thread; then we call `join` on the thread. If a worker’s thread is already `None`, we know that worker has already had its thread cleaned up, so nothing happens in that case.

#### 20-3-2 Signaling to the Threads to Stop Listening for Jobs

Now, this code doesn’t function the way we want it to yet. The key is the logic in the closures run by the threads of the `Worker` instances: at the moment, we call `join`, but that won’t shut down the threads because they `loop` forever looking for jobs. If we try to drop our `ThreadPool` with our current implementation of `drop`, the main thread will block forever waiting for the first thread to finish.

To fix this problem, we’ll modify the threads so they listen for either a `Job` to run or a signal that they should stop listening and exit the infinite loop. 

```rust
enum Message {
    NewJob(Job),
    Terminate,
}

pub struct ThreadPool {
    workers: Vec<Worker>,
    sender: mpsc::Sender<Message>,
}

// --snip--

impl ThreadPool {
    // --snip--

    pub fn execute<F>(&self, f: F)
        where
            F: FnOnce() + Send + 'static
    {
        let job = Box::new(f);

        self.sender.send(Message::NewJob(job)).unwrap();
    }
}

// --snip--

impl Worker {
    fn new(id: usize, receiver: Arc<Mutex<mpsc::Receiver<Message>>>) ->
        Worker {

        let thread = thread::spawn(move ||{
            loop {
                let message = receiver.lock().unwrap().recv().unwrap();

                match message {
                    Message::NewJob(job) => {
                        println!("Worker {} got a job; executing.", id);

                        job.call_box();
                    },
                    Message::Terminate => {
                        println!("Worker {} was told to terminate.", id);

                        break;
                    },
                }
            }
        });

        Worker {
            id,
            thread: Some(thread),
        }
    }
}
```

To incorporate the `Message` enum, we need to change `Job` to `Message` in two places: the definition of `ThreadPool` and the signature of `Worker::new`. 

The `execute` method of `ThreadPool` needs to send jobs wrapped in the `Message::NewJob` variant. Then, in `Worker::new` where a `Message` is received from the channel, the job will be processed if the `NewJob` variant is received, and the thread will break out of the loop if the `Terminate` variant is received.

Then create messages of the `Terminate`:

```rust
impl Drop for ThreadPool {
    fn drop(&mut self) {
        println!("Sending terminate message to all workers.");

        for _ in &mut self.workers {
            self.sender.send(Message::Terminate).unwrap();
        }

        println!("Shutting down all workers.");

        for worker in &mut self.workers {
            println!("Shutting down worker {}", worker.id);

            if let Some(thread) = worker.thread.take() {
                thread.join().unwrap();
            }
        }
    }
}
```

We’re now iterating over the workers twice: once to send one `Terminate` message for each worker and once to call `join` on each worker’s thread. If we tried to send a message and `join` immediately in the same loop, we couldn’t guarantee that the worker in the current iteration would be the one to get the message from the channel.

To prevent Deadlock, we first put all of our `Terminate` messages on the channel in one loop; then we join on all the threads in another loop. Each worker will stop receiving requests on the channel once it gets a terminate message. So, we can be sure that if we send the same number of terminate messages as there are workers, each worker will receive a terminate message before `join` is called on its thread.

```rust
fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();
    let pool = ThreadPool::new(4);

    for stream in listener.incoming().take(2) {
        let stream = stream.unwrap();

        pool.execute(|| {
            handle_connection(stream);
        });
    }

    println!("Shutting down.");
}
```

The `take` method is defined in the `Iterator` trait and limits the iteration to the first two items at most. The `ThreadPool` will go out of scope at the end of `main`, and the `drop` implementation will run.

```bash
$ cargo run
   Compiling hello v0.1.0 (file:///projects/hello)
    Finished dev [unoptimized + debuginfo] target(s) in 1.0 secs
     Running `target/debug/hello`
Worker 0 got a job; executing.
Worker 3 got a job; executing.
Shutting down.
Sending terminate message to all workers.
Shutting down all workers.
Shutting down worker 0
Worker 1 was told to terminate.
Worker 2 was told to terminate.
Worker 0 was told to terminate.
Worker 3 was told to terminate.
Shutting down worker 1
Shutting down worker 2
Shutting down worker 3
```

We can see how this code works from the messages: workers 0 and 3 got the first two requests, and then on the third request, the server stopped accepting connections. When the `ThreadPool` goes out of scope at the end of `main`, its `Drop` implementation kicks in, and the pool tells all workers to terminate. The workers each print a message when they see the terminate message, and then the thread pool calls `join` to shut down each worker thread.

Notice one interesting aspect of this particular execution: the `ThreadPool` sent the terminate messages down the channel, and before any worker received the messages, we tried to join worker 0. Worker 0 had not yet received the terminate message, so the main thread blocked waiting for worker 0 to finish. In the meantime, each of the workers received the termination messages. When worker 0 finished, the main thread waited for the rest of the workers to finish. At that point, they had all received the termination message and were able to shut down.

The code can be found [here](https://github.com/hscspring/Coding-Collections/tree/master/Rust/hellomulti). Future work:

- Add more documentation to `ThreadPool` and its public methods.
- Add tests of the library’s functionality.
- Change calls to `unwrap` to more robust error handling.
- Use `ThreadPool` to perform some task other than serving web requests.
- Find a thread pool crate on [crates.io](https://crates.io/) and implement a similar web server using the crate instead. Then compare its API and robustness to the thread pool we implemented.



