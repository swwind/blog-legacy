layout: post
title: 'BZOJ 3275: Number'
date: 2017-05-22 15:55:34
tags: 网络流
categories: 题解
---
# 题面
有$N$个正整数，需要从中选出一些数，使这些数的和最大。
若两个数$a,b$同时满足以下条件，则a,b不能同时被选
1. 存在正整数$C$，使$a^2+b^2=c^2$
2. $gcd(a,b)=1$

# Input
第一行一个正整数$n$，表示数的个数。
第二行$n$个正整数$a1,a2,...,an$。

# Output
最大的和。

 
# Sample Input
5
3 4 5 6 7

# Sample Output
22

# HINT
$n\leq 3000$

# 题解
首先证明两个定理。
> 定理1：两个奇数的平方和不可能是平方数。
证明：
首先我们知道以下定理
对于任意一个奇数$a$，$a^2=1\pmod 4$
对于任意一个偶数$b$，$b^2=0\pmod 4$
所以两个奇数的平方和$a_1^2+a_2^2=2\pmod 4$
这既不是奇数的平方也不是偶数的平方。
从而可以证明。

> 定理2：两个偶数gcd不可能是1
证明：
这不是废话吗。。。

所以奇数对和偶数对均不能满足要求。
因此，可以将读入的数按奇偶分为两类。
之后跑二分图最大点权独立集即可。

# 代码
```cpp
#include <bits/stdc++.h>
#define N 3010
#define M 1000000
using namespace std;
inline int read(){
	int x=0,f=0;char ch=getchar();
	while(ch>'9'||ch<'0'){if(ch=='-')f=1;ch=getchar();}
	while(ch<='9'&&ch>='0'){x=(x<<3)+(x<<1)+ch-'0';ch=getchar();}
	return f?-x:x;
}
int to[M], nxt[M], head[M], cnt = 1, q[M];
int sum, n, od[N], ev[N], val[M], dis[N];
int gcd(int a, int b){return b?gcd(b,a%b):a;}
int sqr(int a){return a*a;}
void add(int x, int y, int v){
	to[++cnt] = y;
	nxt[cnt] = head[x];
	val[cnt] = v;
	head[x] = cnt;
}
int bfs(){
	memset(dis, 0, sizeof dis);
	int l = 0, r = 1; dis[0] = 1;
	while(l < r) for(int i = head[q[++l]]; i; i = nxt[i])
		if(!dis[to[i]] && val[i]){
			dis[to[i]] = dis[q[l]]+1;
			if(to[i] == n+1) return 1;
			q[++r] = to[i];
		}
	return 0;
}
int dfs(int x, int mn){
	if(x == n+1) return mn; int sum = 0;
	for(int i = head[x]; i; i = nxt[i])
		if(dis[to[i]] == dis[x]+1 && val[i]){
			int k = dfs(to[i], min(mn-sum, val[i]));
			if(!k) dis[to[i]] = 0;
			val[i] -= k; val[i^1] += k; sum += k;
			if(sum == mn) break;
		}
	return sum;
}
int main(){
	n = read();
	for(int i = 1; i <= n; i++){
		int x = read(); sum += x;
		if(x&1) od[++od[0]] = x;
		else ev[++ev[0]] = x;
	}
	for(int i = 1; i <= od[0]; i++)
		add(0, i, od[i]), add(i, 0, 0);
	for(int i = 1; i <= ev[0]; i++)
		add(i+od[0], n+1, ev[i]), add(n+1, i+od[0], 0);
	for(int i = 1; i <= od[0]; i++) for(int j = 1; j <= ev[0]; j++)
		if(gcd(od[i], ev[j]) == 1){
			int k = od[i]*od[i]+ev[j]*ev[j];
			if(sqr(sqrt(k)+1e-9) != k) continue;
			add(i, od[0]+j, 1<<30);
			add(od[0]+j, i, 0);
		}
	int ans = 0;
	while(bfs())ans+=dfs(0, 1<<30);
	printf("%d\n", sum-ans);
	return 0;
}
```