---
layout: post
title: 洛谷P2734 游戏 A Game
date: 2017-04-01 11:06:34
tags: 博弈论
categories: 题解
---
# 题面
有如下一个双人游戏:N(2 <= N <= 100)个正整数的序列放在一个游戏平台上，游戏由玩家1开始，两人轮流从序列的任意一端取一个数，取数后该数字被去掉并累加到本玩家的得分中，当数取尽时，游戏结束。以最终得分多者为胜。
现在要你编一个执行最优策略的程序，最优策略就是使玩家在与最好的对手对弈时，能得到的在当前情况下最大的可能的总分的策略。你的程序要始终为第二位玩家执行最优策略。

# Input
- 第一行: 正整数N, 表示序列中正整数的个数。
- 第二行至末尾: 用空格分隔的N个正整数（大小为1-200）。

# Output
只有一行，用空格分隔的两个整数: 依次为玩家一和玩家二最终的得分。

# Simple Input
6
4 7 2 9 5 2


# Simple Output
18 11

# 题解
~~博弈论~~（废话）
用f[i][j]表示区间[i,j]中的数全部取完时先手的得分，s[i][j]表示区间[i,j]内所有数的和。
<p align="center"><strong>f[i][j]=max(s[i][j]-f[i+1][j],s[i][j]-f[i][j-1])</strong></p>

# 代码
```cpp
#include <bits/stdc++.h>
using namespace std;
int a[250], s[250][250], n, f[250][250];
int main(){
	scanf("%d", &n);
	for(int i = 1; i <= n; i++)
		scanf("%d", a+i);
	for(int i = 1; i <= n; i++)
		for(int j = i; j <= n; j++)
			s[i][j] = s[i][j-1]+a[j];
	for(int i = n; i; i--)
		for(int j = 1; j <= n; j++)
			f[i][j] = max(s[i][j]-f[i+1][j], s[i][j]-f[i][j-1]);
	printf("%d %d", f[1][n], s[1][n]-f[1][n]);
}
```