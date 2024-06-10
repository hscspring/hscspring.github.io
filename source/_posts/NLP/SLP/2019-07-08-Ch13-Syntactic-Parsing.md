---
title: Syntactic Parsing Note (SLP Ch13)
date: 2019-07-08 11:00:00
categories: Feeling
tags: [AI, NLP, Formal Grammars, CYK, CKY, Chunking, Partial Parsing]
---

This chapter focuses on the structures assigned by context-free grammars. Context-free grammars don’t specify how the parse tree for a given sentence should be computed. We therefore need to specify algorithms that employ these grammars to efficiently produce correct trees. They are useful in applications such as **grammar checking**, **semantic analysis**, **question answering** and **information extraction**.

<!--more-->

## Ambiguity

**Structural ambiguity** arises from many commonly used rules in phrase-structure grammars which occurs when the grammar can assign more than one parse to a sentence.

Two common kinds of ambiguity are:

- **attachment ambiguity**: a particular constituent can be attached to the parse tree at more than one place

- **coordination ambiguity**: different sets of phrases can be conjoined by a conjunction like *and*

**Syntactic disambiguation** algorithms require statistical, semantic, and contextual knowledge sources that vary in how well they can ben integrated into parsing algorithms.

> 中文也有同样的问题，后续撰文介绍；此处想起西蒙在《人工科学》中的一个观点：语言学的进步所必须把握的主要方向之一，是发展一种合适的语义学以补充句法。
>
> 现在看来，我们对句法分析的重视程度远远不够。

## CKY Parsing: A Dynamic Programming Approach

Cocke-Kasami-Younger (CKY) algorithm is the most widely used dynamic-programming based approach to parsing. Related approaches include the **Earley algorithm** and **chart parsing**.

![](http://qnimg.lovevivian.cn/slp-ch11-2.jpeg)

### Conversion to Chomsky Normal Form

Restricting a grammar to CNF does not lead to any loss in expressiveness, since any context-free grammar can be converted into a corresponding CNF grammar that accepts exactly the same set of strings as the
original grammar.

Rules with a single non-terminal on the right are called **unit productions**.

The entire conversation process is as follows:

- Copy all conforming rules to the new grammar unchanged
- Convert terminals within rules to dummy non-terminals
- Convert unit-productions
- Make all rules binary and add them to new grammar

![](http://qnimg.lovevivian.cn/slp-ch11-3.jpeg)

### CKY Recognition

In CNF, each non-terminal node above the part-of-speech level in a parse tree will have exactly two daughters. An Example:

![](http://qnimg.lovevivian.cn/slp-ch11-1.jpeg)

```python
function CKY-PARSE(words, grammar) returns table
    for j←from 1 to LENGTH(words) do
        for all {A | A→ words[j]∈grammar }
            table[j-1, j]←table[j-1, j] ∪ A
        for i←from j-2 downto 0 do
            for k←i+1 to j-1 do
                for all {A | A→ BC∈grammar and B∈table[i,k] and C∈table[k,j]}
                    table[i,j] ← table[i,j] ∪ A
```

The code can be found [here](https://nbviewer.jupyter.org/github/hscspring/All4NLP/blob/master/Syntax/CKY.ipynb). Honestly, I am not quite sure it's right :)

### CKY Parsing

Turn the above recognized algorithm into a parser algorithm which could return all possible parses:

- augment the entries in the table so that each non-terminal is paired with pointers to the table entries from which it was derived
- permit multiple versions of the same non-terminal to be entered into the table

### CKY in Practice

Our parser isn’t returning trees that are consistent with the grammar given to us by our friendly syntacticians. In addition, the conversion to CNF will complicate any syntax-driven approach to semantic analysis.

- One approach to getting around these problems is to keep enough information around to transform our trees back to the original grammar as a post-processing step of the parse.
- Another solution is to adopt a more complex dynamic programming solution that simply accepts arbitrary CFGs.

[这里](https://yam.gift/2018/12/22/NLPFA/2018-12-22-Ch03-Formal-Model-Based-on-Phrase-Structure-Grammar/)有一些笔记可以参考。

## Partial Parsing

For those task which do not require complex, complete parse trees for all inputs, a **partial parse**, or **shallow parse**, of input sentences may be sufficient.

**Chunking** is the process of identifying and classifying the flat, non-overlapping segments of a sentence that constitute the basic non-recursive phrases corresponding to the major content-word parts-of-speech: noun phrases, verb phrases, adjective phrases, and prepositional phrases.

What constitutes a syntactic base phrase depends on the application. First and foremost, base phrases of a given type do not recursively contain any constituents of the same type.

### Machine Learning-Based Approaches to Chunking

It’s common to model chunking as **IOB** tagging.

```python
# The   morning flight from Denver has  arrvied
# B_NP  I_NP    I_NP   B_PP B_NP   B_VP I_VP
# The same sentence with only the base-NPs tagged illustrates the role of the O tags
# The   morning flight from Denver has  arrvied
# B_NP  I_NP    I_NP   O    B_NP   O    O
```

There is no explicit encoding of the end of a chunk in IOB tagging; the end of any chunk is implicit in any transition from an I or B to a B or O tag.

![](http://qnimg.lovevivian.cn/slp-ch11-4.jpeg)

Sequence model in a training set, Viterbi decoding is commonly used.

### Chunking-System Evaluations

Chunkers are evaluated according to the notions of precision, recall, and the F-measure borrowed from the field of information retrieval.

Precision: = Number of correct chunks given by system / Total numbers of chunks given by system

Recall: = Number of correct chunks given by system / Total number of actual chunks in the text

Correct here means that both the boundaries of the chunk and the chunk’s label are correct.

$$F = \frac {(\beta^2 + 1)PR}{\beta^2P + R}$$

Also can be seen [here](https://yam.gift/2019/05/05/SLP/2019-05-05-NaiveBayes-and-Sentiment-Classification/)

## Summary

- **Structural ambiguity** is a significant problem for parsers. Common sources of structural ambiguity include **PP-attachment**, **coordination ambiguity**, and **noun-phrase bracketing ambiguity**.
- **Dynamic programming** parsing algorithms, such as **CKY**, use a table of partial parses to efficiently parse ambiguous sentences. CKY restricts the form of the grammar to Chomsky normal form (**CNF**).
- Many practical problems, including information extraction problems, can be solved without full parsing. **Partial parsing** and **chunking** are methods for identifying shallow syntactic constituents in a text. SOT methods use **supervised machine learning** with Viterbi decoder.