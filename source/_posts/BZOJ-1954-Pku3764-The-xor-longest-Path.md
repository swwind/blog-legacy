layout: post
title: 'BZOJ 1954: Pku3764 The xor-longest Path'
date: 2017-03-16 13:07:44
tags: Trie
categories: 题解
---

题面
---------------
给定一棵n个点的带权树，求树上最长的异或和路径。

Input
---------------
4
1 2 3
2 3 4
2 4 6

Output
---------------
7


题解
---------------
可以注意到 a -> b 的异或和 = a -> root 的异或和 ^ b -> root 的异或和。所以用 Trie 保存所有点到根节点的异或和，再枚举每一个异或和，在Trie上尽量找与他每一位都相反的就行了（如果存在）。

代码
---------------
```cpp
#include <bits/stdc++.h>
#define ll long long
#define N 100020
using namespace std;
struct node{
	int to, next, v;
}e[N<<1];
int head[N], cnt, val[N], bin[31];
void add(int x, int y, int z){
	e[++cnt].to = y; e[cnt].next = head[x]; head[x] = cnt; e[cnt].v = z;
	e[++cnt].to = x; e[cnt].next = head[y]; head[y] = cnt; e[cnt].v = z;
}
void dfs(int x, int fa){
	for(int i = head[x]; i; i = e[i].next){
		if(e[i].to == fa) continue;
		val[e[i].to] = e[i].v ^ val[x];
		dfs(e[i].to, x);
	}
}
int ch[N*30][2], sz;
void ins(int x){
	int rt = 0;
	for(int i = 30, k = (x&bin[30])>0; i >= 0; k = (x&bin[--i])>0)
		if(!ch[rt][k]) rt = ch[rt][k] = ++sz;
		else rt = ch[rt][k];
}
int ask(int x){
	int rt = 0, sum = 0;
	for(int i = 30, k = (x&bin[30])>0; i >= 0; k = (x&bin[--i])>0)
		if(ch[rt][!k]) rt = ch[rt][!k], sum += bin[i];
		else rt = ch[rt][k];
	return sum;
}
int main(){
	int n, x, y, z;
	bin[0] = 1; for(int i = 1; i <= 30; i++) bin[i] = bin[i-1]<<1;
	scanf("%d", &n);
	for(int i = 1; i < n; i++){
		scanf("%d%d%d", &x, &y, &z);
		add(x, y, z);
	}
	dfs(1, 0); int ans = 0;
	for(int i = 1; i <= n; i++) ins(val[i]);
	for(int i = 1; i <= n; i++) ans = max(ans, ask(val[i]));
	printf("%d\n", ans);
	return 0;
}
```