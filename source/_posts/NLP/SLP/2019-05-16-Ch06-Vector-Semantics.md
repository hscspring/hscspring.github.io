---
title: Vector Semantics Note (SLP Ch06)
date: 2019-05-16 11:11:00
categories: Feeling
tags: [AI, NLP, Lexical Semantics, Vector Semantics, Word2vec, Embeddings, Cosine, PPMI, TF-IDF]
---

Words that occur in similar contexts tend to have similar meanings. This link between similarity in how words are distributed and similarity in what they mean is called the **distributional hypothesis**.

- words which are synonyms tended to occur in the same environment
- with the amount of meaning difference between two words "corresponding roughly to the amount of difference in their environments"

**vector semantics** instantiates this linguistic hypothesis by learning representations of the meaning of words directly from their distributions in texts.

<!--more-->

## Lexical Semantics

**Lexical semantics** is the linguistic study of word meaning.

- Lemmas and Senses
    - A **lemma** always have different **wordforms** with different meanings.
    - Each meaning is a **word sense**, lemmas can be **homonymous**.
- Relationships between words or senses
    - An important component of word meaning
    - Two words are **synonyms** if they are substitutable in any sentence, they have the same **propositional meaning**.
    - No two words are absolutely identical in meaning. One of the fundamental tenets of semantics called the **principle of contrast**, is the assumption that a difference in linguistic form is always associated with at least some difference in meaning.
    - In practice, synonym is commonly used to describe a relationship of approximate or rough synonymy.
    - **Antonyms** are words with an opposite meaning.
- Word Similarity
    - Most words have lots of similar words. cat is not a synonym of dog, but are similar words.
    - Useful in question answering, paraphrasing, and summarization.
- Word Relatedness
    - The meaning of two words are related in ways other than similarity is called **relatedness**, also called **association** in psychology. coffee and cup are related.
    - One common relatedness is if they belong to the same **semantic field**.
    - Semantic fields are also related to **topic models**, like **Latent Dirichlet Allocation, LDA**.
    - Useful tool for discovering topical structure in documents.
- Semantic Frames and Roles
    - Closely related to semantic fields is the idea of a **semantic frame**.
    - A semantic frame is a set of words that denote perspectives or participants in a particular type of event. 
    - Important for question answering, and can help in shifting perspective for machine translation.
- Taxonomic Relations
    - A word (or sense) is a **hyponym** of another word or sense if the first is more specific, denoting a subclass of the other.
    - Conversely is **hypernym**, often use **superordinate** instead.
    - We can define hypernymy more formally by saying that the class denoted by the superordinate extensionally includes the class denoted by the hyponym.
    - Hypernymy can also be defined in terms of entailment. A is a hyponym of B if everything that is A is also B. It is also the **IS-A** hierarchy, A IS-A B, or B **subsumes** A.
    - Useful for textual entailment or question answering.
- Connotation
    - Words have affective meanings or **connotations**.
    - Positive or negative evaluation expressed through language is called **sentiment**.
    - Words varied along three important dimensions of affective meaning
        - **valence**: the pleasantness of the stimulus
        - **arousal**: the intensity of emotion provoked by the stimulus
        - **dominance**: the degree of control exerted by the stimulus

## Vector Semantics

**Vector semantics** is the current best model to deal with all the aspects of word meaning, based on Ludwig Wittgenstein's "the meaning of a word is its use in the language", that is defining a word by the environment or distribution it occurs in language use. A word's distribution is the set of contexts in which it occurs, the neighboring words or grammatical environments.

Vector semantics combines two intuitions:

- the distributionalist intuition: defining a word by counting what other words occur in its envrionment
- the vector intuition: defining the meaning of a word w as a vector

Vectors for representing words are generally called **embeddings**.

## Words and Vectors

Vector or distributional models of meaning are generally based on a **co-occurrence matrix**, a way of representing how often words co-occur.

### Vectors and documents

In a **term-document matrix**, each row represents a word in the vocabulary and each column represents a document from some collection of documents. The matrix was first defined as part of the vector space model of information retrieval.

A **vector space** is a collection of vectors, characterized by their **dimension**.

Term-document matrices were originally defined as a means of finding similar documents for the task of document **information retrieval**.

**Information retrieval (IR)** is the task of finding the document d from the D documents in some collection that best matches a query q.

### Words and vectors

The word vector is a row vector. 

For documents, we saw that similar documents had similar vectors, because similar documents tend to have similar words. This same principle applies to words: similar words have similar vectors because they tend to occur in similar documents.

However, it is most common to use the **word-word matrix** or the **term-context matrix**, in which the columns are labeled by words rather than documents.

This matrix is thus of dimensionality |V| × |V| and each cell records the number of times the row (target) word and the column (context) word co-occur in some context in some training corpus. It is most common to use smaller contexts, generally a window around the word.

## Cosine for measuring similarity

It is based on the **dot product** operator from linear algebra, also called the **inner product**.

The raw dot-product has a problem as a similarity metric: it favors **long** vectors. Most frequent words have long vectors, since they tend to co-occur with more words and have higher co-occurrence values with each of them.

The simplest way to modify the dot product to normalize for the vector length is to divide the dot product by the lengths of each of the two vectors. This is **normalized dot product**.

$$cosine(v,w) = \frac {v·w}{|v||w|} = \frac {\sum_{i=1}^N v_iw_i} {\sqrt{\sum_{i=1}^N v_i^2} \sqrt{\sum_{i=1}^N w_i^2}}$$

For some applications we pre-normalize each vector, by dividing it by its length, creating a **unit vector** of length 1. Thus we could use `v·w` to compute.

## TF-IDF: Weighing terms in the vector

Raw frequency is very skewed and not very discriminative.

It’s a bit of a paradox. Word that occur nearby frequently are more important than words that only appear
once or twice. Yet words that are too frequent—ubiquitous, like the or good— are unimportant.

The **tf-idf algorithm** algorithm is the product of two terms, each term capturing one of these two intuitions:

- **term frequency**: frequency of the word in the document. $$tf_{t,d} = 1 + \log_{10} count(t,d) ; 0$$
- **document frequency**: is simply the number of documents a term occurs in. It give a higher weight to words that occur only in a few documents. 
    - the **collection frequency** of a term is the total number of times the word appears in the whole collection in any document.
    - the **inverse document frequency** or **idf** is `N/df_t` where N is the total number of documents in the collection, and dft is the number of documents in which term t occurs. A document is a play or a wiki page or a single article. $idf_t = \log_{10}(\frac {N}{df_t})$ 

The **tf-idf** weighting of the value for word t in document d: $$w_{t, d} = tf_{t,d} × idf_t$$

## Applications of the tf-idf vector model

- compute word similarity
- compute document similarity
    - compute the **centroid** of all words (vectors) in the document as the **document vector**
    - $$d = \frac {w_1+w_2+…+w_k}{k}$$
    - Document similarity is useful for all sorts of applications; information retrieval, plagiarism detection, news recommender systems, and even for digital humanities tasks like comparing different versions of a text to see which are similar to each other.

## Pointwise Mutual Information (PMI)

PPMI (positive pointwise mutual information) draws on the intuition that best way to weigh the association between two words is to ask how much **more** the two words co-occur in our corpus than we would have a priori expected them to appear by chance.

PMI is a measure of how often two events x and y occur, compared with what we would expect if they were independent:

$$I(x,y) = \log_2 \frac{P(x,y)}{P(x)P(y)}$$

- numerator tells us how often we observed the two words together
- denominator tells us how often we would **expect** the two words to co-occur assuming they each occurred independently

- ratio gives us an estimate of how much more the two words co-occur than we expect by chance

Negative PMI tend to be unreliable unless enormous corpora, also it's not clear whether possible to evaluate with human. So more common to use Positive PMI:

$$PPMI(w,c) = \max(\log_2 \frac{P(w,c)}{P(w)P(c)}, 0)$$

PMI is negative means two words co-occur in the corpus sightly less often we would expect by chance.

PMI has the problem of being biased toward infrequent events; very rare words tend to have very high PMI values. 

- One way is using a different function to compute P(c):

$$PPMI_\alpha (w,c) = \max (\log_2 \frac{P(w,c)}{P(w)P_\alpha(c)}, 0)$$

$$P_\alpha (c) = \frac{count(c)^\alpha}{\sum_c count (c)^\alpha}$$

α = 0.75 improved performance of embeddings on a wide range of tasks. It is the same as the discount d in Kneser-Ney Smoothing, how amazing!

- Another solution is Laplace smoothing: a small k is added to each of the counts

## Word2vec

- short
- dense

**skip-gram with negative sampling**, also called **SGNS**, kind of **word2vec**. The intuition is not to count how often each word w occurs near x, instead by a classifier on a binary prediction task: Is word w likely to show up near x? Prediction task is unimportant, we'll take the learned classifier **weights** as the word embeddings.

Word2vec is a much simpler model:

- simplifies the task: binary classification instead of word prediction
- simplifies the architecture: logistic regression classifier instead of multi-layer neural network

### The classifier

$$P(+|t,c)$$

Use similarity to compute the P (the intuition is: a word is likely to occur near the target if its embedding is similar to the target embedding).

$$Similarity(t,c) ≈ t · c$$

Use logistic or sigmoid function:

$$P(+|t,c) = \frac{1}{1+e^{-t·c}}$$

Multiple context words:

$$\log P(+|t, c_{1:k}) = \sum_{i=1}^k \log \frac{1}{1+e^{-t·c}}$$

In summary, given a test target word t and its context window of k words c (1:k), assigns a probability based on how similar this context window is to the target word.

### Learning skip-gram embeddings

Word2vec learns embeddings by starting with an initial set of embedding vectors and then iteratively shifting the embedding of each word w to be more like the embeddings of words that occur nearby in texts, and less like the embeddings of words that don’t occur nearby.

For each of these (t, c) training instances we’ll create k negative samples, each consisting of the target t plus a ‘noise word’. The noise words are chosen according to their weighted unigram frequency pα(w), where α (in practice is 0.75) is a weight, to give rare words slightly higher probability.

$$P_\alpha (w) = \frac{count(w)^\alpha}{\sum_{w'} count (w')^\alpha}$$

$$L(\theta) = \sum_{(t,c) \in +} \log P(+|t,c) + \sum_{(t,c) \in -} \log P(-|t,c)$$

$$L(\theta) = \log P(+|t,c) +\sum_{i=1}^k \log P(-|t,n_i)$$

$$L(\theta) = \log \frac{1}{1+e^{-c·t}} +\sum_{i=1}^k \log \frac {1}{1+e^{n_i·t}}$$

The skip-gram learns two embeddings:

- target embedding t
- context embedding c

We can:

- throw away C matrix
- add the two embeddings together: ti + ci

Window size L often tuned on a dev set.

## Visualizing Embeddings

- list most similar words to w by cosines
- use a clustering algorithm to show a hierarchical representation of which words are similar to others

- project dimensions to 2

## Semantic properties of embeddings

- Shorter context windows tend to lead to representations that are a bit more syntactic (with same parts of speech).

- Longer context windows, the highest cosine words to a target word w tend to be words that are topically related but not similar.

Two kinds of similarity or association between words:

- Two words have **first-order co-occurrence** (sometimes called **syntagmatic association**) if they are typically nearby each other.
- Two words have **second-order co-occurrence** (sometimes called **paradigmatic association**) if they have similar neighbors. 

**Analogy** is another semantic property of embeddings to capture relational meanings (king - man + woman close to queen).

**Embeddings and Historical Semantics**: studying how meaning changes over time, by computing multiple embedding spaces, each from texts written in a particular time period. 

## Bias and Embeddings

In addition to their ability to learn word meaning from text, embeddings also reproduce the implicit biases and stereotypes that were latent in the text.

Embeddings also encode the implicit associations that are a property of human reasoning.

## Evaluating Vector Models

The most important evaluation metric for vector models is extrinsic evaluation on tasks; adding them as features into any NLP task and seeing whether this improves performance over some other model.

Nonetheless it is useful to have intrinsic evaluations.

- The most common metric is to test their performance on **similarity**
    - WordSim-353
    - SimLex-999
    - TOEFL dataset
- More realistic are intrinsic similarity tasks that include context: SCWS
- Another task is to solve problems like: a is to b as c is to d, given a, b, and c and having to find d.

## Summary

- In vector semantics, a word is a vector, also called **embedding**
- There are two classes: **sparse** and **dense**. Sparse model like **tf-idf** each dimension corresponds to a word in the vocabulary V
- Cell in sparse models are functions of **co-occurrence counts**. The **term-document** matrix has rows of each word (**term**) in V and a column for each document
- The **word-context** matrix has a row for each (target) word in V and a column for each context term in V
- A common sparse weighting is **tf-idf**, which weighs each cell by its **term frequency** and **inverse document frequency**
- Word and document similarity is computed by **dot product** between vectors. The **cosine similarity** is the most popular metric
- **PPMI (pointwise positive mutual information)** is an alternative weighting scheme to tf-idf
- Dense vector models have dimensionality of 50-300 and the dimensions are harder to interpret
- The **word2vec** family including **skip-gram** and **CBOW**, is a popular efficient way to compute dense embeddings
- Skip-gram trains a logistic regression classifier to compute the probability that two words are "likely to occur nearby in text". This probability is computed by dot production between two word embeddings
- Other important embedding algorithms include **GloVe**, a method based on ratios of word co-occurrence probabilities, and **fasttext**, an open-source library for computing word embeddings by summing embeddings of the bag of character n-grams that make up a word

