---
title: Sequence Processing with Recurrent Networks Note (SLP Ch09)
date: 2019-06-17 11:00:00
categories: Feeling
tags: [AI, NLP, RNN, LSTM, GRU, SRN]
---

Problematic of the sliding window in general NN:

- Like Markov it limits the context from which information can be extracted (limits to window area)
- Window makes it difficult to learn systematic patterns arising from phenomena like constituency

RNN is a class of networks designed to address these problems by processing sequences explicitly as sequences, allowing us to handle variable length inputs without the use of arbitrary fixed-sized windows.

<!--more-->

## Simple Recurrent Networks

A RNN is any network that contains a cycle within its network connections. That is, any network where the value of a unit is directly or indirectly, dependent on its own output as an input.

The key difference from a feed-forward network lies in the recurrent link, which augments the input to the hidden layer with the activation value of the hidden layer from *the preceding point in time*.

The hidden layer from the previous time-step provides a form of memory, or context, that encodes earlier processing (extending back to the beginning of the sequence) and informs the decisions to be made at later points in time.

It is not all different from non-recurrent in reality, the most significant addition lies in the new set of weights U that connect the hidden layer from the previous time-step to the current layer.

### Inference in Simple RNNs

The weights are shared across the various time-steps.

$$h_t = g(U h_{t-1} + Wx_t)$$

$$y_t = f(Vh_t)$$

```python
function FORWARDRNN(x, network) returns output sequence y
h0 ← 0
for i←1 to LENGTH(x) do
	hi ← g(U h_i-1 + W xi)
    yi ← f(V hi)
return y
```

### Training

$$\delta_{out} = \frac {\partial L} {\partial a} \frac {\partial a} {\partial z} = L'g'(z)$$

$$\frac {\partial L}{\partial V} = \delta_{out} h_t$$

$$\delta_h = g'(z) V \delta_{out} + \delta_{next}$$

$$\frac {\partial L}{\partial W} = \delta_h x_t$$

$$\frac {\partial L}{\partial U} = \delta_h h_{t-1}$$

$$\delta_{next} = g'(z)U\delta_h$$

### Unrolled Networks as Computational Graphs

For applications that involve much longer input sequences, we unroll the input into manageable fixed-length segments and treat each segment as a distinct training item. This approach is called **Truncated Backpropagation Through Time** (**TBTT**).

## Applications of RNNs

- Generation with Neural LM

- Sequence Labeling

    - POS: Each time-step represent an input and output, U V W are shared

    - NER: **named entity recognition**, use IOB encoding

        ```python
        # United cancelled the flight from Denver to San Francisco.
        # B      O         O   O      O    B      O  B   I
        
        # United cancelled the flight from Denver to San    Francisco.
        # B-ORG  O         O   O      O    B-LOC  O  B-LOC  I-LOC
        ```

- Viterbi and Conditional Random Fields (CRFs)

    - Choosing the maximum probability label for each element in a sequence does not necessarily result in an optimal tag sequence.
    - A simple solution is to use combine the sequence of probability distributions provided by the softmax outputs with a tag-level language model as in MEMMs.

- Sequence Classification
  
    - The hidden layer from the final state is taken to compressed representation of the entire sequence.

## Deep Networks: Stacked and Bidirectional RNNs

**Stacked RNNs** consist of multiple networks where the output of one layer serves as the input to a subsequent layer. One reason is to induce representations at differing levels of abstraction across layers.

A **Bi-RNN** consists of two independent RNN:

$$h_t^{forward} = SRN_{forward}(x_1: x_t)$$

$$h_t^{backward} = SRN_{backward}(x_n: x_t)$$

Then combined into a single representation (element-wise addition or multiplication):

$$h_t = h_t^{forward} \oplus h_t^{backward}$$

## Managing Context in RNNs: LSTMs and GRUs

In practice, RNN is hard to train:

- The information encoded in hidden states tends to be more relevant to the most recent parts of the input sequence and recent decisions.
- Gradients are either driven to zero or saturate in hidden layer backpropagation through time steps. Situations that are referred to as vanishing gradients or exploding gradients, respectively.

### LSTM

$$g_t = \tanh(U_gh_{t-1} + W_gx_t)$$

$$c_t = f_t \odot c_{t-1} + i_t \odot g_t$$

$$h_t = o_t \odot \tanh(c_t)$$

$$f_t = \sigma(U_f h_{t-1} + W_f x_t)$$

$$i_t = \sigma(U_i h_{t-1} + W_i x_t)$$

$$o_t = \sigma(U_o h_{t-1} + W_o x_t)$$

### GRU

LSTM have too many parameters to train, a simpler version named GRU try to ease this training burden by collapsing the forget and add gates of LSTMs into a single update gate with a single set of weights.

### Gated Units, Layers and Networks

![](http://qnimg.lovevivian.cn/slp-ch9-1.jpeg)

## Words, Characters and Byte-Pairs

The issue of word-based embeddings:

- too large lexicon
- unknown words
- blind to morphological regularities

An example:

![](http://qnimg.lovevivian.cn/slp-ch9-2.jpeg)

## Summary

- Simple RNN
- Inference and training in SRNs
- Common use cases for RNNs
    - language modeling
    - sequence labeling
    - sequence classification
- LSTMs and GRUs
- Characters as input