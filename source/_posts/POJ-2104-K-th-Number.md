layout: post
title: POJ 2104 K-th Number
date: 2017-04-06 09:29:40
tags: 主席树
categories: 题解
---
# 题面
要你求区间k小值

# Input
```text
n m
长度为 n 的原数列
l1 r1 k1
l2 r2 k2
l3 r3 k3
...
```

# Output
每行一个答案


# Simple Input
7 3
1 5 2 6 3 7 4
2 5 3
4 4 1
1 7 3

# Simple Output
5
6
3

# 题解
主席树模板题。
一个点一个点加入，rt[x]就表示[1-x]的区间。
因为主席树是可以相减的，所以sz[r]-sz[l-1]就是[l-r]这个区间。
然后瞎搞一波就好了。
其实主席树就是线段树的升级版，就是每次增加操作时只更新有改变的节点，所以都是$log(n)$的。
最后还要离散化一下。
~~别问我怎么和hzwer的一模一样~~

# 代码
```cpp
// 真是日了POJ，连<bits/stdc++.h>都不支持
#include <cstdio>
#include <algorithm>
#define N 2000020
#define M 100020
using namespace std;
int ls[N], rs[N], sz[N], lk[N], rk[N]; // lk和rk是储存边界的
int a[M], b[M], rt[M], cnt;
inline int read(){
	int x=0,f=1;char ch=getchar();
	while(ch<'0'||ch>'9'){if(ch=='-')f=-1;ch=getchar();}
	while(ch>='0'&&ch<='9'){x=x*10+ch-'0';ch=getchar();}
	return x*f;
}
int build(int l, int r){
	int k = ++cnt;
	lk[k] = l, rk[k] = r;
	if(l == r) return k;
	int mid = l + r >> 1;
	ls[k] = build(l, mid);
	rs[k] = build(mid+1, r);
	return k;
}
int insert(int fa, int pos){
	int k = ++cnt;
	ls[k] = ls[fa], rs[k] = rs[fa];
	lk[k] = lk[fa], rk[k] = rk[fa];
	sz[k] = sz[fa]+1;
	if(lk[k] == rk[k]) return k;
	int mid = lk[k] + rk[k] >> 1;
	if(mid >= pos) ls[k] = insert(ls[fa], pos);
	else rs[k] = insert(rs[fa], pos);
	return k;
}
int ask(int fa, int x, int k){
	if(ls[x] == rs[x]) return b[lk[x]];
	int cmp = sz[ls[x]]-sz[ls[fa]];
	if(cmp >= k) return ask(ls[fa], ls[x], k);
	else return ask(rs[fa], rs[x], k-cmp);
}
int main(){
	int n=read(), m=read();
	for(int i = 1; i <= n; i++)
		a[i] = b[i] = read();
	sort(b+1, b+n+1);
	rt[0] = build(1, n);
	for(int i = 1; i <= n; i++)
		rt[i] = insert(rt[i-1], lower_bound(b+1, b+n+1, a[i])-b);
	for(int i = 1,x,y,z; i <= m; i++){
		x=read(); y=read(); z=read();
		printf("%d\n", ask(rt[x-1], rt[y], z));
	}
}
```