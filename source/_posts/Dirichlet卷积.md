layout: post
title: Dirichlet卷积
date: 2017-04-13 13:35:49
tags: 数论
categories: 教程
---
# 定义
两个数论函数$f$,$g$的Dirichlet卷积为：
$$
(f\*g)(n)=\sum_{d|n}{f(d)g(\frac nd)}
$$

# Dirichlet卷积的一些性质：

- 交换律$f\*g=g\*f$
- 结合律$(f\*g)\*h=f\*(g\*h)$
- 分配律$f\*(g+h)=f\*g+f\*h$
- 单位元$\varepsilon\*f=f$


# 常见的Dirichlet卷积

首先你要知道下面这些东西
- $\sigma_k(n)$表示$n$的所有正因子的k次幂的和
- $d(n)=\sigma_0(n)$表示$n$的正因子个数
- $\sigma(n)=\sigma_1(n)$表示$n$的所有正因子的和
- $ld_k(n)=n^k$
- $l(n)=lk_0(n)=1$
- $ld(n)=ld_1(n)=n$（记住这个就好）
- $\varepsilon(n)=\begin{cases}1,&n=1\\0,&n>1\end{cases}$

然后试图理解下面的
- $d(n)=\sum_{d|n}l\Leftrightarrow l\*l$
- $\sigma(n)=\sum_{d|n}d\Leftrightarrow l\*ld$
- $\varepsilon(n)=\sum_{d|n}\mu(d)\Leftrightarrow \varepsilon=l\*\mu$
- $\varphi(n)=\sum_{d|n}\mu(d)\frac nd\Leftrightarrow \varphi=\mu\*ld$
- $n=\sum_{d|n}\varphi(d)\Leftrightarrow ld=l\*\varphi$

此外还有
- $\varepsilon(n)=\sum_{d|n}\mu(d)$
- $\varphi(n)=\sum_{d|n}\mu(d)\frac nd\Leftrightarrow n=\sum_{d|n}\varphi(d)$

在整数集$D$里还有
- $f(d)=\sum_{x|d,d\in D}g(d)\Leftrightarrow g(x)=\sum_{x|d,d\in D}\mu(d)f(\frac dx)$

看懂了吗~~（我也没有~~
GL&HF