---
title: Stable Diffusion笔记
date: 2024-02-15 23:30:00
categories: Feeling
tags: [AI, Diffusion, Stable Diffusion, DDPM]
mathjax: true
---

## 科普实践



## DDPM

DDPM，Denoising Diffusion Probabilistic Models，去噪扩散概率模型，简称 Diffusion Models，或 Diffusion 模型。Diffusion 模型是生成式模型的一种（其他包括 VAE、GANs、Normalizing Flows 等），受非平衡统计物理（Non-Equilibrium Statistical Physics）的一个想法启发：可以使用马尔可夫链逐渐将一个分布转换为另一个分布。

<!--more-->

Diffusion 模型通过连续添加高斯噪声来破坏训练数据，然后反转这个过程来学习恢复数据。训练完成后，就可以将随机采样的噪声利用学习的去噪过程（模型）来生成数据。

### 前向过程

Diffusion 模型包括两个步骤：前向过程（Diffusion 过程）和反向过程（反向 Diffusion 过程）。前向（递归）过程被定义为马尔科夫过程，如下式所示。
$$
q\left(\mathbf{x}_{1: T} \mid \mathbf{x}_0\right):=\prod_{t=1}^T q\left(\mathbf{x}_t \mid \mathbf{x}_{t-1}\right)\\:=\prod_{t=1}^T \mathcal{N}\left(\mathbf{x}_t ; \sqrt{1-\beta_t} \mathbf{x}_{t-1}, \beta_t \mathbf{I}\right) \tag{1}
$$
$x_0$ 是从数据集中采样到的样本，数学一点来说，表示从（未知的）原始数据分布中采样一个数据点：$x_0 \sim q(x_0)$。

$T$ 是时间步，$\beta$ 是 diffusion rate，使用 variance scheduler 进行预计算，决定每一步添加的噪声量。当 $T$ 足够大时，$x_T$ 可以看作是各向同性高斯分布。事实上，每一个时间步都可以看作各向同性高斯分布。

对每一步的图像，可以从下面的分布进行采样。
$$
\mathbf{x}_t=\sqrt{1 - \beta_t} \mathbf{x}_{t-1}+\sqrt{\beta_t} \boldsymbol{\epsilon}_{t-1} \qquad; \epsilon_t \sim \mathcal{N} (\mathbf{0}, \mathbf{I}) \tag{2}
$$
令：
$$
\alpha_t = 1 - \beta_t\\
\bar{\alpha_t} := \prod_{t=1}^{T} \alpha_t
$$
式（2）可写为：
$$
\mathbf{x}_t=\sqrt{\alpha_t} \mathbf{x}_{t-1}+\sqrt{1-\alpha_t} \boldsymbol{\epsilon}_{t-1} \\
= \sqrt{\alpha_{t}} (\sqrt{\alpha_{t-1}} \mathbf{x}_{t-2} + \sqrt{1-\alpha_{t-1}}\boldsymbol{\epsilon}_{t-2}) + \sqrt{1-\alpha_t} \boldsymbol{\epsilon}_{t-1} \\
=  \sqrt{\alpha_{t}\alpha_{t-1}} \mathbf{x}_{t-2} + \sqrt{\alpha_t(1-\alpha_{t-1})}\boldsymbol{\epsilon}_{t-2} + \sqrt{1-\alpha_t} \boldsymbol{\epsilon}_{t-1} \\
= \sqrt{\alpha_{t}\alpha_{t-1}} \mathbf{x}_{t-2} + \sqrt{1-\alpha_t\alpha_{t-1}} \bar{\boldsymbol{\epsilon}}_{t-2} \tag{3}
$$
注意，$\bar{\boldsymbol{\epsilon}}_{t-2}$ 合并了两个高斯分布，最后一步利用了 reparameterization trick ^[5][6][7]^合并两个不同方差的高斯分布。
$$
\mathcal{N} (\mathbf{0}, \sigma^2_1 \mathbf{I}) + \mathcal{N} (\mathbf{0}, \sigma^2_2 \mathbf{I}) \\
= \mathcal{N} (\mathbf{0}, (\sigma^2_1 + \sigma^2_2) \mathbf{I})
$$
我们将式（3）继续展开，可以得到：
$$
\mathbf{x}_t = 
\sqrt{\alpha_{t}\alpha_{t-1}} \mathbf{x}_{t-2} + \sqrt{1-\alpha_t\alpha_{t-1}} \bar{\boldsymbol{\epsilon}}_{t-2}  \\ = \sqrt{\alpha_{t}\alpha_{t-1}} (\alpha_{t-2}\mathbf{x}_{t-3} + \sqrt{1-\alpha_{t-2}} {\boldsymbol{\epsilon}}_{t-3}) + \sqrt{1-\alpha_t\alpha_{t-1}} \bar{\boldsymbol{\epsilon}}_{t-2}  
\\ =  \sqrt{\alpha_{t}\alpha_{t-1}\alpha_{t-2}} \mathbf{x}_{t-3} +   \sqrt{\alpha_{t}\alpha_{t-1} (1 - \alpha_{t-2})} \boldsymbol{\epsilon}_{t-3} +  \sqrt{1-\alpha_t\alpha_{t-1}} \bar{\boldsymbol{\epsilon}}_{t-2}
\\ = \sqrt{\alpha_{t}\alpha_{t-1}\alpha_{t-2}} \mathbf{x}_{t-3} +  \sqrt{1-\alpha_t\alpha_{t-1}\alpha_{t-2}} \bar{\boldsymbol{\epsilon}}_{t-3}
\\ ...
\\ = \sqrt{\bar{\alpha_t}} \mathbf{x}_0 + \sqrt{1 - \bar{\alpha_t}} {\boldsymbol{\epsilon}}
\tag{4}
$$
于是：
$$
q\left(\mathbf{x}_t \mid \mathbf{x}_{0}\right)\\=
\mathcal{N}\left(\mathbf{x}_t ; \sqrt{\bar{\alpha_t}} \mathbf{x}_{0}, (1-\bar{\alpha_t}) \mathbf{I}\right) \tag{5}
$$
我们就可以计算任意时间的噪声（$\alpha_t$ 是已知的），而不用每次都执行整个马尔科夫过程^[1][2]^。这就是前向Diffusion过程，代码如下。

```python
# From https://magic-with-latents.github.io/latent/posts/ddpms/part3/
timesteps = 100

beta_start = 0.0001
beta_end = 0.05
beta = np.linspace(beta_start, beta_end, num=timesteps, dtype=np.float32)

alpha = 1.0 - beta
alpha_bar = np.cumprod(alpha)

def forward_process_ddpms(orig_img, alpha_bar, t):
    alpha_bar_t = alpha_bar[t].reshape(-1, 1, 1)

    mu = np.sqrt(alpha_bar_t) * orig_img
    sigma = np.sqrt(1.0 - alpha_bar_t)

    img_t = mu + sigma * np.random.randn(*orig_img.shape)
    return img_t


img = Image.open("cat.jpg")
orig_img = np.asarray(img.copy(), dtype=np.float32) / 255.
specific_timesteps = [19, 39, 59, 79, 99]
for step in specific_timesteps:
    img_t = forward_process_ddpms(orig_img, alpha_bar, step)
    img_t = (img_t.clip(0, 1) * 255.0).astype(np.uint8)
```

### 反向过程

反向过程是前向过程的逆向过程，类似于Ctrl+Z，从高斯噪声中不断撤销，最终得到图片。前向过程我们是不断地加入高斯噪声，可以通过表达式（5）直接计算。但是反向过程不一样，因为我们要做的是从噪声中还原图片（去噪过程），这个分布是未知的（需要所有的数据，这是不可能的），所以我们需要通过一个模型在数据集样本（我们无法获取所有的数据）上来近似地对这个未知的分布进行建模。

具体来说，我们要做的是从下式中采样：
$$
q(x_{t-1}|x_t) \tag{6} \\
X_T \sim \mathcal{N} (\mathbf{0}, \mathbf{I})
$$
因为每一步都很小，所以$q(x_{t-1}|x_t)$也是正态分布。$q({x_T})$​就是前向过程最后得到的结果，一个标准高斯分布。反向的过程也是一步一步进行的，可以写作：
$$
p_\theta\left(x_{0: T}\right):=p\left(x_T\right) \prod_{t=1}^T p_\theta\left(x_{t-1} \mid x_t\right)\\
:=p\left(x_T\right) \prod_{t=1}^T \mathcal{N}\left(x_{t-1} ; \mu_\theta\left(x_t, t\right), \Sigma_\theta\left(x_t, t\right)\right) \tag{7}
$$
$p_{\theta}$就是模型（反向Difussion Kernel），也是反向过程的分布，$\mu_{\theta}$和$\Sigma_\theta$是模型的参数。$p(x_T)$就是$q(x_T)$​，这个是已知的。

接下来是目标函数，Diffusion模型的训练目标相当于：“最大化生成的样本（在反向过程结束时）属于原始（训练）数据样本分布的对数似然”。从一个标准高斯噪声得到一个样本$p_{\theta}(x_0)$有多条路径，我们需要考虑所有可能的路径：
$$
p_\theta\left(x_0\right):=\int p_\theta\left(x_{0: T}\right) d x_{1: T} \tag8
$$
因此目标函数被定义为：
$$
L = -\log(p_{\theta}(x_0)) \tag9
$$
这很不好处理，因为我们需要在非常高维（像素）的空间上对 T 时间步长上的连续值进行积分。

相反，Diffusion的作者受VAE启发，使用变分下限（VLB）重新制定训练目标，VLB也称为“证据下限”（ELBO^[4][8]^）。
$$
L = \mathbb{E}\left[-\log p_\theta\left(\mathbf{x}_0\right)\right] 

\\ \leq \mathbb{E}\left[-\log p_\theta\left(\mathbf{x}_0\right)\right] + D_{\mathrm{KL}}\left(q\left(\mathbf{x}_{1: T}|\mathbf{x}_0\right) \| p_\theta\left(\mathbf{x}_{1: T} | \mathbf{x}_0\right)\right)

\\=\mathbb{E}_{q\left(x_{1: T}|x_0\right)}\left[-\log p_\theta\left(x_0|x_{1: T}\right)\right]+\mathbb{E}_{q\left(x_{1: T} \mid x_0\right)}\left[\log \frac{q\left(x_{1: T}| x_0\right)}{p_\theta\left(x_{1: T}|x_0\right)}\right]

\\=\mathbb{E}_q \left[-\log p_\theta\left(x_0|x_{1: T}\right) + \log \frac{q\left(x_{1: T}| x_0\right)}{p_\theta\left(x_{1: T}|x_0\right)} \right]

\\=\mathbb{E}_q \left[ - \log \frac{p_\theta\left(x_0|x_{1: T}\right) p_\theta\left(x_{1: T}|x_0\right)}{q\left(x_{1: T}| x_0\right)} \right]

\\= \mathbb{E}_q\left[-\log \frac{p_\theta\left(x_{0: T}\right)}{q\left(x_{1: T} \mid x_0\right)}\right]

\\= L_\text{VLB} \tag{10}
$$

上面的$x_0$也可以理解为VAE中的观测变量，而$x_{1:T}$​则是隐变量。这样我们就重新定义出了目标函数。

上面的推导用到了条件概率：
$$
p_{\theta}(x_{0:T}) = p_{\theta}(x_0, x_1, ..., x_T)  
\\=p_{\theta}(x_0|x_1, ..., x_T) p_{\theta}(x_1, ..., x_T)
\\=p_{\theta}(x_0|x_1, ..., x_T) p_{\theta}(x_1|x_2, ..., x_T)...p_{\theta}(x_T) \tag{11}
$$
结合马尔科夫假设，就有这样两个式子：
$$
p_\theta\left(x_{0: T}\right)=p_\theta\left(x_0 \mid x_{1: T}\right) p_\theta\left(x_{1: T} \mid x_0\right)
\\p_\theta\left(x_{0: T}\right)=p_\theta(x_0|x_1)p_\theta(x_1|x_2)...p_\theta(x_{T-1}|x_T)p_\theta(x_T) \tag{12}
$$
它们被用在式（10）和下面的的推导中。

对式（10）继续展开：
$$
L_\text{VLB} = -\mathbb{E}_q\left[\log \frac{p_{\theta}\left(x_T\right) \prod_{t=1}^T p_\theta\left(x_{t-1} \mid x_t\right)}{\prod_{t=1}^T q\left(x_t \mid x_{t-1}\right)}\right]

\\=-\mathbb{E}_q\left[\log p_{\theta}\left(x_T\right) + \sum_{t \geq 1} \log \frac{p_\theta\left(x_{t-1} \mid x_t\right)}{q\left(x_t \mid x_{t-1}\right)}\right]

\\=-\mathbb{E}_q\left[\log p_{\theta}\left(x_T\right) + \log \frac{p_\theta (x_0|x_1)}{q(x_1|x_0)} +  \sum_{t \geq 2} \log \frac{p_\theta\left(x_{t-1} \mid x_t\right)}{q\left(x_t \mid x_{t-1}\right)}\right] 

\\=-\mathbb{E}_q\left[\log p_{\theta}\left(x_T\right) + \log \frac{p_\theta (x_0|x_1)}{q(x_1|x_0)} +  \sum_{t \geq 2} \log  \left( \frac{p_\theta\left(x_{t-1} \mid x_t\right)}{q\left(x_{t-1} \mid x_t,x_0 \right)} \cdot \frac {q(x_{t-1}|x_0)}{q(x_t|x_0)} \right) \right] \tag{13}
$$
这里主要利用了贝叶斯法则，即：
$$
q\left(x_{t-1} \mid x_t, x_0\right)=q\left(x_t \mid x_{t-1}, x_0\right) \frac{q\left(x_{t-1} \mid x_0\right)}{q\left(x_t \mid x_0\right)} \tag{14}
$$

继续展开式（13）：
$$
L_\text{VLB} =\mathbb{E}_q\left[-\log p_{\theta} \left(x_T\right) + \log \frac{q(x_1|x_0)}{p_\theta (x_0|x_1)} +  \sum_{t \geq 2} \log \frac{q \left(x_{t-1}| x_t,x_0 \right)}{p_{\theta}\left(x_{t-1}| x_t \right)}  + \log \frac {q(x_t|x_0)}{q(x_1|x_0)}  \right] 

\\=\mathbb{E}_q\left[\log \frac {q(x_t | x_0)} { p_{\theta}\left(x_T\right)} - \log {p_\theta (x_0|x_1)} +  \sum_{t \geq 2} \log \frac{q \left(x_{t-1} | x_t,x_0 \right)}{p_{\theta}\left(x_{t-1} | x_t \right)} \right]

\\=D_{KL} \left( q(x_t | x_0) ||  p_{\theta}({x_T})\right) + \sum_{t \geq 2} D_{KL} (q \left(x_{t-1} | x_t,x_0 \right) || p_{\theta}\left(x_{t-1} | x_t \right)) - \log {p_\theta (x_0|x_1)}
$$











## Reference

### 实践

- 

### 理论

- [1] [The Latent: Code the Maths - A deep dive into DDPMs](https://magic-with-latents.github.io/latent/posts/ddpms/part3/)
- [2] [Step by Step visual introduction to Diffusion Models. - Blog by Kemal Erdem](https://erdem.pl/2023/11/step-by-step-visual-introduction-to-diffusion-models)
- [3] [An In-Depth Guide to Denoising Diffusion Probabilistic Models – From Theory to Implementation](https://learnopencv.com/denoising-diffusion-probabilistic-models/#forward-diffusion-equation)
- [4] [What are Diffusion Models? | Lil'Log](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/)
- [5] [The Reparameterization Trick](https://gregorygundersen.com/blog/2018/04/29/reparameterization/)
- [6] [The Reparameterization Trick – Emma Benjaminson – Data Scientist](https://sassafras13.github.io/ReparamTrick/)
- [7] [From Autoencoder to Beta-VAE | Lil'Log](https://lilianweng.github.io/posts/2018-08-12-vae/#reparameterization-trick)
- [8] [From Autoencoder to Beta-VAE | Lil'Log](https://lilianweng.github.io/posts/2018-08-12-vae/#loss-function-elbo)

### 代码

- https://github.com/hayashimasa/UNet-PyTorch
- https://github.com/milesial/Pytorch-UNet
- https://github.com/clemkoa/u-net
- https://github.com/kjsman/stable-diffusion-pytorch
- https://github.com/filipbasara0/simple-diffusion
- https://github.com/lucidrains/denoising-diffusion-pytorch
- https://github.com/CompVis/stable-diffusion
- https://github.com/Stability-AI/stablediffusion
- https://github.com/matwilso/generative_models
- https://github.com/jmtomczak/intro_dgm
- https://github.com/LaurentMazare/diffusers-rs





