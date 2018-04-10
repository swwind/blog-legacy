layout: post
title: 3.15摸你赛 前缀！
date: 2017-03-15 13:10:46
tags: 瞎搞
categories: 题解
---

题面
-------------------

定义$f_0(x)=A_x,f_n(x)=\sum_{i=1}^{x-1}{f_{n-1}(i)}$，给出长度为 $N$ 的数组 $A$（从 $1~N$ 编号）和 $Q$ 个操作。
操作有两种：

- `Add i j` 表示将 $A_i$的值加上 $j$（$j \leq P$）；
- `Query i j` 表示询问 $f_i(j)$的值（$i \leq M$），由于答案可能会很大，给我 `mod P` 后的答案即可，$P = 1,000,000,007$。

Input
-------------------

第一行为三个正整数 $N$、$M$、$Q$。
第二行为 $N$ 个非负整数，表示 $A$ 数组。
接下来 $Q$ 行，每行表示一个操作，`Add i j` 或 `Query i j`。

Output
-------------------

输出有多行，每行表示 $f_i(j)$ mod $p$。

Simple Input
-------------------

	4 4 4
	1 1 1 1
	Query 0 4
	Query 4 3
	Add 1 1
	Query 3 2

Simple Output
-------------------

	1
	15
	7

题解
-------------------

其实是杨辉三角、、、不知你看不看得出来
其实就可以输入一个1 0 0 0 0...的数列，跑暴力看看就看出来了
看出来了就简单了哈（然而我还是爆蛋了，各种int溢出= =）

代码
-------------------
```cpp
#include <bits/stdc++.h>
#define File(s) \
	freopen(s".in", "r", stdin), \
	freopen(s".out", "w", stdout)
#define ll long long
#define N 4005
using namespace std;
ll a[N], n, m, q, x, y, f[N][N];
char op[50];
ll get(ll i, ll j){
	if(!i) return a[j];
	ll ans = 0;
	for(ll x = j; x>=1; x--)
		(ans += (ll)f[i][x-1]*a[j-x+1]) %= 1000000007;
	return ans;
}
int main(){
	File("b");
	scanf("%I64d%I64d%I64d", &n, &m, &q);
	for(ll i = 0; i < n ;i++)
		f[1][i] = 1;
	for(ll i = 2; i <= m; i++)
	for(ll j = 0; j < n; j++)
	f[i][j] = (f[i-1][j]+f[i][j-1])%1000000007;
	for(ll i = 1; i <= n; i++)
		scanf("%I64d", a+i);
	while(q--&&scanf("%s%I64d%I64d", op, &x, &y) != EOF) // 强势压行
		if(op[0] == 'A') (a[x] += y)%=1000000007;
		else printf("%I64d\n", get(x, y));
	return 0;
}
```
