---
title: 数论学习 [1]
date: 2018-12-21 17:33:26
tags: 数论
categories: 教程
---

数论虽然在 NOIP 中不作深入的要求，但是在这之上的比赛就经常会有涉及到这类知识的算法题目。

本文来总结整理一下一些初等的数论知识。

{% blockquote 卡尔·弗里德里希·高斯 %}
Mathematics is the queen of the sciences—and number theory is the queen of mathematics.
数学是科学的皇后，数论是数学的皇后。
{% endblockquote %}

# 基本数学符号

*本文所使用的符号均参照数学选修4-6*

## 整除

如果 $a$ 能够整除 $b$，我们称 $a$ 是 $b$ 的**约数**或**因子**，记为 $a \mid b$。
相反，如果 $a$ 不能够整除 $b$，我们记为 $a \nmid b$。

## 质数与合数

在大于 $1$ 的自然数中，除了 $1$ 和该数自身外，无法被其他自然数整除的数称为**质数**（abbr. **素数**)。
大于 $1$ 的自然数若不是素数，则称之为**合数**（abbr. **合成数**）。
**$1$ 既不是质数，也不是合数。**

## 算数基本定理

设 $n>1$，则 $n$ 可以分解成素数的乘积
$$ n = p_1p_2...p_k, $$
如果不计这些素数的次序，则分解式是唯一的。

设 $n = p_1^{a_1}p_2^{a_2}...p_k^{a_k}$ 是 $n$ 的标准分解式，若用 $d(n)$ 表示 $n$ 的所有正约数的个数，那么
$$d(n) = \prod_{i=1}^{k}(a_i+1)$$

## 最大公约数和最小公倍数

**最大公约数**（**gcd**, **g**reatest **c**ommon **d**ivisor）指能够整除多个整数的最大正整数。
如果 $c$ 是 $a$ 和 $b$ 的最大公约数，我们记为 $(a, b) = c$。
如果 $(a,b)=1$，那么我们称 $a$ 与 $b$ **互质**，可以记为 $a \bot b$。

**最小公倍数**（**lcm**, **l**east **c**ommon **m**ultiple）指能够被多个整数整除的最小正整数。
如果 $c$ 是 $a$ 和 $b$ 的最大公约数，我们记为 $[a, b] = c$。

一个大家都知道的结论：$(a, b) \times [a, b] = ab$

## Sum 和 Product

$$\sum_{i=1}^{n}a_i = a_1 + a_2 + ... + a_n$$
$$\prod_{i=1}^{n}a_i = a_1 a_2 ... a_n$$

## 组合数与阶乘

**组合数**（abbr. **二项式系数**） $\binom{n}{m}$ 表示从 $n$ 个本质不同的物品中选出 $m$ 个物品的方案数（不计选择的顺序）。

$$\binom{n}{m} = \frac{n!}{(n-m)!m!}$$
其中
$$n!=\prod_{i=1}^{n}i$$

于是我们有递推式：
$$\binom{n}{m} = \binom{n-1}{m} + \binom{n-1}{m-1}$$

**二项式定理**：
$$(x+y)^n = \sum_{i=0}^{n}\binom{n}{i}x^{n-i}y^i$$

## 同余

如果 $a$ 和 $b$ 对 $p$ 的余数相等，那么我们记为 $a \equiv b \pmod p$

**欧拉函数** $\varphi(n)$ 表示小于 $n$ 的与 $n$ 互质的正整数的个数。

设 $n = p_1p_2...p_k$，则
$$\varphi(n) = n(1-\frac{1}{p_1})(1-\frac{1}{p_2})...(1-\frac{1}{p_k})$$

$\varphi(n)$ 是**积性函数**，即如果 $a \bot b$，则有 $$\varphi(a)\varphi(b)=\varphi(ab)$$

**欧拉定理**：设 $m>1$，$(a,m)=1$，则 $$a^{\varphi(m)} \equiv 1 \pmod m$$

如果 $m$ 是质数，那么 $\varphi(m)=m-1$，这其实就是费马小定理了。

**费马小定理**：设 $p$ 是质数，$(a,p)=1$，则 $$a^{p-1} \equiv 1 \pmod p$$

# 莫比乌斯反演

莫比乌斯函数 $\mu(n)$ 的定义：

设 $n = p_1^{a_1}p_2^{a_2}...p_k^{a_k}$，

$$ \mu(n) = \begin{cases}
1, & n = 1 \\\\
(-1) ^ k, & \forall a_i=1 \\\\
0, & \exists a_i \gt 1
\end{cases} $$

$\mu(n)$ 也是积性函数。

我们设 $\varepsilon(n) = \begin{cases}1,&n=1\\\\0,&n \neq 1\end{cases}$，则有

$$\sum_{d \mid n}\mu(d) = \varepsilon(n)$$

**莫比乌斯反演公式**：

如果 $f(n),g(n)$ 是数论函数（定义域为正整数、陪域为复数的函数），则有

$$f(n)=\sum_{d \mid n}g(d) \Leftrightarrow g(n) = \sum_{d \mid n}\mu(d)f(\frac{n}{d})$$

。。。TODO。。。

喵