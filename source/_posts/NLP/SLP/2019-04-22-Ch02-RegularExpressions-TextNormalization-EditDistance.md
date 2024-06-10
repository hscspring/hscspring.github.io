---
title: Regular Expressions, Text Normalization, and Edit Distance Note (SLP Ch02)
date: 2019-04-22 12:52:00
categories: Feeling
tags: [AI, NLP, Reqular Expressions, Text Normalization, Edit Distance]
---


**Normalizing text** means converting it to a more convenient, standard form. 

- **tokenization**: separating out or tokenizing words from running text
- **lemmatization**: words have the same root but different surface. **Stemming** refers to a simpler version of lemmatization in which just strip suffixes from the end of the word.
- **sentence segmentation**

<!--more-->

## Regular Expressions

For Re, Please read this [note](https://yam.gift/2017/09/04/2017-09-04-Regular-Expression/), and exercises in the book can be found [here](https://nbviewer.jupyter.org/github/hscspring/All4NLP/blob/master/Re/SLP-Ch2.ipynb). An important use of regular expressions is in substitutions.

## Words

Wheather we consider a token as a word depends on the application.

- Punctuations in pos, parsing, or speech synthesis. 
- Disfluencies in speech recognition.
- Capitalized and upcapitalized tokens are different in pos or ner, but same in speech recognition.
- In English, wordforms are sufficient, but in Arabic, is lemmatization.

**Types** are the number of distinct words, **Tokens** are the total number of words.

- Herdan's Law (Heaps' Law): |V| = kN^β, k and β are positive constants, 0<β<1, β depends on the corpus size and the genre, for large corpora, β ranges from .67 to .75

The number of lemmas can instead of wordform types, dictionaries can help in giving lemma counts.

## Corpora

It's important to consider who produced the language, in what context , for what purpose, and make sure that the models are fit to the data.

- language
- genre
- demographic characteristics of the writer
- time matter

## Text Normalization

### Unix tools for crude tokenization and normalization

```bash
# tokenize words by changing every sequence of nonalphabetic characters to a newline
# ’A-Za-z’ means alphabetic
# -c option complements to non-alphabet
# -s option squeezes all sequences into a single character
tr -sc 'A-Za-z' '\n' < sh.txt

# n sort the lines, and pass them to uniq -c 
tr -sc 'A-Za-z' '\n' < sh.txt | sort | uniq -c

# -n to sort numerically, -r to sort in reverse order
tr -sc 'A-Za-z' '\n' < sh.txt | sort | uniq -c | sort -n -r
```

### Word Tokenization and Normalization

**Normalization**: putting words/tokens in a standard format.

Some examples that keep the punctuation internally:

- abbreviation: `m.p.h Ph.D. AT&T cap'n`
- special characters and numbers: `$45.55 01/02/06 555,550.50 `
- urls: `http://www.google.com`
- tags: `#nlproc`
- email: `someone@gmail.com`

A **clitic** is a part of word that can't stand on its own, and can only occur when it is attached to another word.

A **named entity** need to be treated as a single token.

Tokens can also be normalized in which a single normalized form is chosen for words with multiple forms like USA and US.

**Penn Treebank tokenization** standard can be found here: [nltk.tokenize.treebank — NLTK 3.4.1 documentation](https://www.nltk.org/_modules/nltk/tokenize/treebank.html).

**Case folding** is another kind of normalization.

- For speech recognition and information retrieval, everything is mapped to lower case
- For sentiment analysis and text classification, IE, MT, case is helpful

### Word Segmentation in Chinese: the MaxMatch algorithm

```python
function MaxMatch(sentence, dictionary) returns word sequence W
	if sentence is empty
    	return empty list
    for i←length(sentence) downto 1
    	firstword = first i chars of sentence
        remainder = rest of sentence
        if InDictionary(firstword, dictionary)
        	return list(firstword, MaxMatch(remainder, dictionary))
    # no word was found, so make a one-character word
    firstword = first char of sentence
    remainder = rest of sentence
    return list(firstword, MaxMatch(remainder, dictionary))
```

- cannot dealing with **unknown words**
- genres that differ a lot from the assumptions made by the dictionary builder
- most accurate algorithms generally use statistical **sequence models**

The code is here: [Segmentation](https://nbviewer.jupyter.org/github/hscspring/All4NLP/blob/master/Segmentation/Segmentation.ipynb)

### Collapsing words: Lemmatization and Stemming

The most sophisticated methods for **lemmatization** involve complete **morphological parsing** of the word.

**Morphology** is the study of the way words are built up from smaller meaning-bearing units called **morphemes**. Two broad classes of morphemes can be distinguished: 

- **stems**—the central morpheme of the word, supplying the main meaning
- **affixes**—adding “additional” meanings of various kinds

This naive version of morphological analysis is called **stemming**. One of the most widely used stemming algorithms is the **Porter**. The algorithm is based on series of rewrite rules run in series, as a **cascade**, in
which the output of each pass is fed as input to the next pass. Detailed rule lists and code can be found on [Porter Stemming Algorithm](https://tartarus.org/martin/PorterStemmer/index.html).

### Byte-Pair Encoding

Stemming or lemmatizing can help deal with **unknown words**.

It uses a different kind of tokenization in which most tokens are words, but some tokens are frequent word parts like -er, so that an unseen word can be represented by combining the parts. The simplest such algorithm is **byte-pair encoding**, or **BPE**, which is based on a method for text compression.

Code can be found [here](https://nbviewer.jupyter.org/github/hscspring/All4NLP/blob/master/Normalization/BPE.ipynb).

### Sentence Segmentation

Question marks and exclamation points are relatively unambiguous markers of sentence boundaries. Periods, on the other hand, are more ambiguous. The period character “.” is ambiguous between a sentence boundary marker and a marker of abbreviations like Mr. or Inc.

In general, sentence tokenization methods work by building a binary classifier (based on a sequence of rules or on machine learning) that decides if a period is part of the word or is a sentence-boundary marker. 

## Minimum Edit Distance

**Edit distance**  is a way to quantify string similarity. **Minimum edit distance** is the minimum number of editing operations needed to transform one string to another. **Operation list** includes deletion, substitution and insertion.

**Levenshtein distance** is the simplest weighting factor which has two versions:

- three operations has a cost of 1
- insertion or deletion has a cost of 1, substitution has a cost of 2

### The Minimum Edit Distance Algorithm

Given source string X of length n, and target string Y of length m, `D(i, j)` is the edit distance between `X[1…i]` and `Y[1…j]`, the edit distance between X and Y is D(n, m).

```python
# edit distance
D[i,j] = min(
	D[i-1, j] + del-cost(source[i]),
    D[i, j-1] + ins-cost(target[i]),
    D[i-1, j-1] + sub-cost(source[i], target[j])
)
# Levenshtein distance
D[i,j] = min(
	D[i-1, j] + 1,
    D[i, j-1] + 1,
    D[i-1, j-1] + (2 if source[i] ≠ target[j] or 0 if source[i] = target[j])
)
```

With a small change, minimum edit distance can also provide the minimum cost **alignment** between two strings. It's useful in speech recognition (used to compute the word error rate) and machine translation (plays a role in which sentences in a parallel corpus need to be matched to each other).

```python
function MIN-EDIT-DISTANCE(source, target) returns min-distance
	n ← LENGTH(source)
    m ← LENGTH(target)
    Create a distance matrix distance [n+1, m+1]
    
    D[0, 0] = 0
    for each row i from 1 to n do
    	D[i, 0] ← D[i-1, 0] + del-cost(source[i])
    for each column j from 1 to m do
    	D[0, j] ← D[0, j-1] + ins-cost(target[j])
    
    for each row i from 1 to n do
    	for each column j from 1 to m do
        	D[i, j] ← MIN(
                D[i-1, j] + del-cost(source[i]),
                D[i, j-1] + ins-cost(target[i]),
                D[i-1, j-1] + sub-cost(source[i], target[j]))
    return D[n, m]
```

The code is here: [Edit-Distance](https://nbviewer.jupyter.org/github/hscspring/All4NLP/blob/master/Similarity/Min-Edit-Distance.ipynb).

The **Viterbi** algorithm is a probabilistic extension of minimum edit distance. Instead of computing the “minimum edit distance” between two strings, Viterbi computes the “maximum probability alignment” of one string with another.

## Summary

- **Regular expression** is powerful for pattern-matching.
- **Word tokenization and normalization** are generally done by cascades of simple regular expressions substitutions or finite automata.
- **Porter algorithm** is simple and efficient to do stemming, stripping off affixes. It does not have high accuracy but may be useful for some tasks.
- **Minimum edit distance** between two strings is the minimum number of operations it takes to edit one to another. It can be computed by **dynamic programming**, which also results in an **alignment** of the two strings.