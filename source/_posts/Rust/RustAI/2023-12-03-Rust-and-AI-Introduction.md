---
title: 【Rust与AI】概览和方向
date: 2023-12-03 23:00:00
categories: Thinking
tags: [AI, LLM, Rust]
mathjax: false
---

本系列主要介绍Rust与AI的那些天作之合（开源项目），我们会以开源项目代码阅读的方式推进，以Rust为主，同时科普AI相关知识，目的是让更多非算法、非Rust的程序员进一步学习Rust和AI相关知识。当然，很显然地，我们也希望Rust程序员和AI算法工程师能从中有所收获。前者可以关注AI算法的设计和优化，后者可以关注Rust如何助力AI算法。

本篇是系列第一篇，主要介绍Rust和AI各自的特点与发展近况，以及它俩的遇见会碰撞出怎样的火花。我们热爱AI，我们喜欢Rust语言，仅此而已。

<!--more-->

## 当前发展

### AI与LLM

随着ChatGPT的发展浪潮，AI又一次迎来了发展良机，很多应用、服务都在基于大模型重新设计。同时，由于大模型的超能力，应用的开发门槛进一步下降，一些新的创意产品在不断涌现。总的来说，在AI应用领域呈现出了一片欣欣向荣、百家争鸣的景象。

这一切的背后是ChatGPT为代表的大语言模型（后面以LLM代替），LLM以序列方式根据给定上下文生成文本，它对上下文的精准理解能力和基于此的生成能力都令人赞叹。作为一名从业多年的自然语言处理（后面以NLP代替）工程师，可以负责任地说，LLM的能力确实远超此前的语言模型，尤其是理解方面。

LLM的最大特点是大，这里的大是指参数量非常多。也就是说，无论是加载还是运行这样一个模型，都需要消耗比较多的资源。要想让模型执行的快，性能就成了绕不开的坎。

参数其实就是很多很多的数字，一般来说都是FP32的浮点数，但浮点数可以通过量化降低到FP16、BF16或Int，量化后内存的占用明显是降低了的，一般也会同时带来执行速度的提升。

抛开语言、模型架构和量化先不谈，要加速执行很多数字的运算，一般我们可以想到的最容易的解决方案大概就是并行。没错，并行是当前LLM甚至深度学习最通用的方案，典型代表就是使用类似GPU、TPU这样的专用设备来加速。当然，即使没有这些设备，普通CPU甚至移动端的CPU都可以利用数据级并行、指令级并行、线程级并行等方案来加速。除了并行，还可以优化存储层次和传输，进一步提升性能。

上面提到这些优化方案都和计算机底层有关，一般来说都需要用到C语言或C++编程，现在我们有了新的选择——Rust。其实，这个“现在”应该可以再提前个几年，毕竟Rust在AI领域默默发力已经有些时日了。C语言和C++都是非常强大的语言，不过相较而言，Rust在某些方面表现的更好。

### Rust

Rust的来龙去脉我们就不赘述了，就凭“在StackOverflow年度开发者调查报告中连续几年获得最受欢迎编程语言”这一点就值得我们去认真学习一下。关于Rust语言的“好”这里也不多赘述，仅从个人角度谈几点自己的感觉。

首先，Rust代码只要编译通过，运行一般不会出问题。虽然一开始与编译器作斗争这件事可能让人抓狂，但比起用gdb去分析dump应该要好上很多吧。而且，编译器的提示越来越友好，作斗争的过程其实是个不断学习相关知识的过程，这种所见所得的及时反馈应该也是极其理想的学习方式吧。

其次，语法更加清晰。个人比较倾向于在编程时显式地指定数据类型和范围，比如`i8`表示8位有符号整数，这样一方面强迫自己理解代码（而不是默认一个int64），另一方面也方便日后自己或他人阅读。这点可能是之前从Python开始入门编程项目导致的。另外，它对错误的处理方式个人比较认同和喜欢，这都是代码清晰的表现。

第三，设计更加合理。Struct和Trait以及其相关的设计深得个人喜爱，还有生命周期。和很多人不一样的是，个人比较喜欢生命周期的设计思想，可能也是源于喜欢“显式”吧。

第四，代码更加优雅。控制分支中的`match`是个人最爱，还有模板、函数式编程、闭包，以及链式调用，代码看起来让人赏心悦目。

……

此外还有优雅的并发操作，测试的组织，文档的集成，等等都让人欲罢不能。唯一要吐槽的可能是智能指针相关的内容，的确有些复杂。不过瑕不掩瑜，总的来说，Rust值得任何一个热爱编程的程序员去尝试。

## 双剑合璧

其实用到C++的地方都可以用Rust再写一遍，简单来说，和底层相关的代码都可以Rust掉，AI方面也不例外。接下来，我们就谈谈Rust和AI可以合璧的地方。

### 推理

首先是推理。这个方向是最自然、最值得关注的方向，尤其是端侧。Server端由于GPU的广泛应用，导致现在CUDA+C/CPP几乎成了垄断。不过随着Rust加入Linux内核，以及Huggingface的大量使用，当然也有Rust自己在GPU领域的不断推动，我们相信Rust在Server端也会有一席之地。

端侧，尤其是以RISC-V为基础架构的智能终端是Rust一直以来深耕的领域。更令人振奋的是前不久Vivo发布的用Rust全新构建的BlueOS，主打的就是新一代AI操作系统。我们相信Rust在智能终端有着非常广阔的前景。

前面已经提到了LLM时代的特点是模型很大，推理很慢，需要性能提升。而且随着LLM的进一步发展，性能必定会变得更加重要，Rust由于其优秀的语言特性，正好接到这一棒。我们笃信Rust+AI大模型是最适合的搭档组合。

### 中间件

再下来是中间件。准确来说是和AI大模型相关的中间件，首当其冲的是向量检索相关库，这就不得不提大名鼎鼎的[Qdrant](https://github.com/qdrant/qdrant)了，性能优秀，而且非常容易使用。顺带提一下对标全文检索框架ElasticSearch的[melisearch](https://github.com/meilisearch/meilisearch)，经过多年的发展已经是比较成熟的框架了，这个领域还有很多其他框架，比如[tantivy](https://github.com/quickwit-oss/tantivy)、[Toshi](https://github.com/toshi-search/Toshi)、[lnx](https://github.com/lnx-search/lnx)、[websurfx](https://github.com/neon-mmd/websurfx)等。

另外值得一提的是将全文检索、语义检索融合到SQL搜索的[paradedb](https://github.com/paradedb/paradedb)，这个项目的设计思路可以给我们很多启发。此外还有处理表格的[polars](https://github.com/pola-rs/polars)、可视化pipeline的[vector](https://github.com/vectordotdev/vector)、文档图数据库[surrealdb](https://github.com/surrealdb/surrealdb)、时序数据库[ceresdb](https://github.com/CeresDB/horaedb)等等。当下火热的Agent也不是没有，比如[smartgpt](https://github.com/Cormanz/smartgpt)。

这块范围其实是非常广泛的，除了基础组件，可以想象的内容还很多，比如记忆模块、任务调度、资源池、任务定义、流程设计等等。这些组件几乎都是围绕着LLM使用的，我们相信LLM带来的远不止这些，而且随着应用层的不断丰富和发展，还会衍生出更多的需求。

### 训练

最后说一下训练。Rust开始做推理，自然有人把它放到训练侧，不过目前看起来这块还处于尝试和起步阶段。我们比较看好它在相对稳定的工程领域使用，但不看好在算法领域的普及。

对于前者，无论哪种语言，一般都会提供简单易用的API或命令行，使用者大多数时候只需要根据要求准备好数据即可进行训练。但对于后者，经常需要涉及底层算法架构的调整和修改，甚至需要新加入或去掉一些模块，这方面Python实在是具备绝对优势，而且平心而论，PyTorch做这些操作相对是比较方便的。Torch一开始也是lua写的，不温不火，后面加了Python后，慢慢打败了Caffe、TensorFlow，现在稳坐第一把交椅。Rust要向当年的Torch一样吗，可是这样在Python侧的区别在哪里？接口上大概率还是和现在的PyTorch接近，就像transformers库流行后，PaddleNLP、ModelScope的接口不能说和其很像，大概只能说一样了。对使用者来说，迁移是没必要的，除非不得不这样做，比如在端侧训练，也许对Rust来说是一个不错的方向。

### 其他

前面说的是正向的，这里简单谈一下可能面临的冲击。

首先依然是C和C++，它们当下是主流，谁能说未来不能继续是主流呢，而且对使用者来说，反正上面是方便的Python，谁会管下面怎么实现的。

再就是其他新语言，比如专为AI而生的[Mojo](https://www.modular.com/mojo)，它的定位是Python的易用性+C语言的性能。虽然Mojo目前还处于极其早期阶段，但这至少是个苗头：在AI主导的未来，指不定会有更AI的语言设计出来。那会不会有专门为大模型设计的语言呢？

不过，总的来说，我们先关注Rust吧。

## 开源项目

下面我们列举一些Rust相关的AI项目，囿于笔者知识范围，所列内容不一定全面，如果读者有更好的开源项目推荐，尤其是大模型相关的，欢迎随时推荐。这些资源也是系列后续阅读的项目。

### LLM推理

- [rustformers/llm: An ecosystem of Rust libraries for working with large language models](https://github.com/rustformers/llm)
- [Noeda/rllama: Rust+OpenCL+AVX2 implementation of LLaMA inference code](https://github.com/Noeda/rllama)
- [srush/llama2.rs: A fast llama2 decoder in pure Rust.](https://github.com/srush/llama2.rs)
- [leo-du/llama2.rs: Inference Llama 2 in one file of zero-dependency, zero-unsafe Rust](https://github.com/leo-du/llama2.rs)
- [gaxler/llama2.rs: Inference Llama 2 in one file of pure Rust 🦀](https://github.com/gaxler/llama2.rs/tree/llama2-rs)
- [rahoua/pecca-rs](https://github.com/rahoua/pecca-rs/tree/main)
- [huggingface/text-generation-inference: Large Language Model Text Generation Inference](https://github.com/huggingface/text-generation-inference)

### Agent

- [Cormanz/smartgpt: A program that provides LLMs with the ability to complete complex tasks using plugins.](https://github.com/Cormanz/smartgpt)

### NLP

- [huggingface/tokenizers: 💥 Fast State-of-the-Art Tokenizers optimized for Research and Production](https://github.com/huggingface/tokenizers)
- [guillaume-be/rust-bert: Rust native ready-to-use NLP pipelines and transformer-based models (BERT, DistilBERT, GPT2,...)](https://github.com/guillaume-be/rust-bert)

### 图像

- [LaurentMazare/diffusers-rs: An implementation of the diffusers api in Rust](https://github.com/LaurentMazare/diffusers-rs)
- [twistedfall/opencv-rust: Rust bindings for OpenCV 3 & 4](https://github.com/twistedfall/opencv-rust)

### Code

- [huggingface/llm-ls: LSP server leveraging LLMs for code completion (and more?)](https://github.com/huggingface/llm-ls)

### Framework

- [huggingface/candle: Minimalist ML framework for Rust](https://github.com/huggingface/candle)
- [coreylowman/dfdx: Deep learning in Rust, with shape checked tensors and neural networks](https://github.com/coreylowman/dfdx)
- [tracel-ai/burn: Burn is a new comprehensive dynamic Deep Learning Framework built using Rust with extreme flexibility, compute efficiency and portability as its primary goals.](https://github.com/tracel-ai/burn)
- [spearow/juice: The Hacker's Machine Learning Engine](https://github.com/spearow/juice)
- [rust-ml/linfa: A Rust machine learning framework.](https://github.com/rust-ml/linfa)
- [tensorflow/rust: Rust language bindings for TensorFlow](https://github.com/tensorflow/rust)
- [sonos/tract: Tiny, no-nonsense, self-contained, Tensorflow and ONNX inference](https://github.com/sonos/tract)
- [smartcorelib/smartcore: A comprehensive library for machine learning and numerical computing. The library provides a set of tools for linear algebra, numerical computing, optimization, and enables a generic, powerful yet still efficient approach to machine learning.](https://github.com/smartcorelib/smartcore)
- [neuronika/neuronika: Tensors and dynamic neural networks in pure Rust.](https://github.com/neuronika/neuronika)

