layout: post
title: 3.15摸你赛 前缀？
date: 2017-03-15 12:43:03
tags: dp
categories: 题解
---
题面
------------------
题面太长，大意是要你求一个n(1<=n<=400)位的3进制数字，要求该数字所有的前缀中，2的数量都大于等于1的数量，1的数量都大于等于0的数量，求满足要求的方案数，对1,000,000,007取模。
Simple Input
------------------
3
Simple Output
------------------
4
Sample Explanation
------------------
这 4 个字符串分别为“221”、“212”、“210”、“222”。

题解
------------------
dp
f[i][j]表示现在有i个2，j个1
用滚动数组递推求解
代码
------------------
```cpp
#include <bits/stdc++.h>
#define File(s) \
	freopen(s".in", "r", stdin), \
	freopen(s".out", "w", stdout)
#define ll long long
#define mod 1000000007
using namespace std;
int f[2][405][405], n;
int main(){
	File("a");
	scanf("%d", &n); int k = n&1; f[!k][1][0] = 1; // 第一位只能取2
	for(int x = 2; x <= n; k ^= 1, x++)
		for(int i = 1; i <= x; i++)
			for(int j = 0; j <= i && i+j<=x; j++){
				f[k][i][j] = 0;
				(f[k][i][j] += f[!k][i-1][j]) %= mod; // 这一位取2
				if(j) (f[k][i][j] += f[!k][i][j-1]) %= mod; // 这一位取1
				if(x-i-j <= j) (f[k][i][j] += f[!k][i][j]) %= mod; // 这一位取0
			}
	int ans = 0;
	for(int i = 1; i <= n; i++)
		for(int j = 0; j <= i && i+j <= n; j++)
			(ans += f[!k][i][j]) %= mod; // 统计答案
	printf("%d\n", ans);
	return 0;
}
```