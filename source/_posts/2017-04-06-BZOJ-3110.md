layout: post
title: 'BZOJ 3110: [Zjoi2013]K大数查询'
date: 2017-04-06 11:00:15
tags: [线段树, 树套树]
categories: 题解
---
# 题面
有$N$个位置，$M$个操作。操作有两种，每次操作如果是`1 a b c`的形式表示在第$a$个位置到第$b$个位置，每个位置加入一个数$c$
如果是`2 a b c`形式，表示询问从第$a$个位置到第$b$个位置，第$c$大的数是多少。

# Input
第一行$N$，$M$
接下来$M$行，每行形如`1 a b c`或`2 a b c`

# Output
输出每个询问的结果


# Sample Input
2 5
1 1 2 1
1 1 2 2
2 1 1 2
2 1 1 1
2 1 2 3

# Sample Output
1
2
1

# HINT
【样例说明】
- 第一个操作 后位置 1 的数只有 1 ， 位置 2 的数也只有 1 。
- 第二个操作 后位置 1 的数有 1 、 2 ，位置 2 的数也有 1 、 2 。
- 第三次询问 位置 1 到位置 1 第 2 大的数是 1 。
- 第四次询问 位置 1 到位置 1 第 1 大的数是 2 。
- 第五次询问 位置 1 到位置 2 第 3 大的数是 1 。‍

N,M<=50000,a<=b<=N
1操作中abs(c)<=N
2操作中c<=Maxlongint

# 题解
线段树套线段树，就是题目有些拗口。。。
因为有负数，所以在加的时候要加上一个 n 、询问的时候减去一个 n。
然后就可以了。过几天再打一遍，以免自己忘记和加深理解。

# 代码
```cpp
#include <bits/stdc++.h>
#define ll long long
#define N 20000020
using namespace std;
int n, m;
int sz, rt[1000010], ls[N], rs[N], tag[N], sum[N];
void pushdown(int x, int L, int R){
	if(!ls[x]) ls[x] = ++sz;
	if(!rs[x]) rs[x] = ++sz;
	int mid = L + R >> 1;
	if(tag[x]){
		tag[ls[x]] += tag[x];
		sum[ls[x]] += tag[x]*(mid-L+1);
		tag[rs[x]] += tag[x];
		sum[rs[x]] += tag[x]*(R-mid);
		tag[x] = 0;
	}
}
// 把l-r的区间都加上1
void insert(int &x, int L, int R, int l, int r){
	if(!x) x = ++sz;
	if(L==l&&R==r){
		sum[x] += R-L+1;
		tag[x]++;
		return;
	}
	pushdown(x, L, R);
	int mid = L + R >> 1;
	if(r<=mid) insert(ls[x], L, mid, l, r);
	else if(l>mid) insert(rs[x], mid+1, R, l, r);
	else insert(ls[x], L, mid, l, mid), insert(rs[x], mid+1, R, mid+1, r);
	sum[x] = sum[ls[x]]+sum[rs[x]];
}
// 询问l-r区间的和
ll ask(int x, int L, int R, int l, int r){
	if(!x) return 0;
	if(L==l && R==r) return sum[x];
	pushdown(x, L, R);
	int mid = L + R >> 1;
	if(r<=mid) return ask(ls[x], L, mid, l, r);
	else if(l>mid) return ask(rs[x], mid+1, R, l, r);
	else return ask(ls[x], L, mid, l, mid)+ask(rs[x], mid+1, R, mid+1, r);
}
void insert(int x, int L, int R, int l, int r, int val){
	insert(rt[x], 1, n, l, r);
	if(L==R) return;
	int mid = L + R >> 1;
	if(val<=mid) insert(x<<1, L, mid, l, r, val);
	else insert(x<<1|1, mid+1, R, l, r, val);
}
int ask(int x, int L, int R, int l, int r, ll k){
	if(L==R) return L;
	int mid = L + R >> 1;
	ll lefts = ask(rt[x<<1|1], 1, n, l, r);
	if(k>lefts) return ask(x<<1, L, mid, l, r, k-lefts);
	else return ask(x<<1|1, mid+1, R, l, r, k);
}
ll K;
int main(){
	scanf("%d%d", &n, &m);
	for(int i = 1, t, l, r, num; i <= m; i++){
		scanf("%d%d%d", &t, &l, &r);
		if(t==1){scanf("%d", &num);insert(1, 0, n<<1, l, r, num+n);}
		else{scanf("%lld", &K);printf("%d\n", ask(1, 0, n<<1, l, r, K)-n);}
	}
}
```