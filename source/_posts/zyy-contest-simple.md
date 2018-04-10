layout: post
title: zyy的模拟赛 森破
date: 2017-06-20 15:03:26
tags: 矩阵乘法
categories: 题解
---
# 题面
大头会求$f[n]\pmod{1e9+7}$，
其中$f[0]=1,f[1]=1,f[i]=f[i-1]+f[i-2]$
大头觉得这题实在是图样图森破。
他想了想，让他们求$\sum_{i=0}^nf[i]\pmod{1e9+7}$，
可是大头觉得这题实在还是图样图森破。
大头想到这么一道$H_2O$题:
求$\sum_{i=0}^nf[i]C_n^i\pmod{1e9+7}$的值
大头现在不觉得这道题图样图森破了，于是他把题目交给了你。


# Input
第一行1个数n，含义如题所示 

# Output
一行一个数，表示答案。

# Sample Input
12

# Sample Output
75025

# 题解
模拟赛做到了这题，觉得比较巧妙，于是放出来和大家分享一下。
~~我想zyy应该不会说什么。。~~
首先你如果打表的话就会发现答案其实就是$f[2n]$
来证明一下。
显然这题要用到二项式定理。
$$(a+b)^n = \sum_{i=0}^nC^i_na^{n-i}b^i$$
关于二项式定理的证明可以看[wiki](https://zh.wikipedia.org/wiki/%E4%BA%8C%E9%A1%B9%E5%BC%8F%E5%AE%9A%E7%90%86)上的证明，这里就不赘述了。
这个式子是不是和要求的式子很像？
我们再来看看求斐波那契第i项的做法：
设$A=\begin{bmatrix}1&1\\1&0\end{bmatrix}$
$$f[i]=A^i[0][0]$$
于是我们可以得出以下结论
$$\begin{align}原式&=\sum_{i=0}^nC_n^iA^i\\&=(A+1)^n\end{align}$$
$1$用单位矩阵$\begin{bmatrix}1&0\\0&1\end{bmatrix}$代替，那么答案就是
$$\begin{bmatrix}2&1\\1&1\end{bmatrix}^n$$
注意到$A^2$就是$\begin{bmatrix}2&1\\1&1\end{bmatrix}$，所以答案就是
$$A^{2n}=f[2n]$$
代码就不用了吧。。