layout: post
title: 'BZOJ 2819: Nim'
date: 2017-05-17 10:30:43
tags: [LCA, 树状数组]
categories: 题解
---
# 题面
著名游戏设计师vfleaking，最近迷上了Nim。普通的Nim游戏为：两个人进行游戏，N堆石子，每回合可以取其中某一堆的任意多个，可以取完，但不可以不取。谁不能取谁输。这个游戏是有必胜策略的。于是vfleaking决定写一个玩Nim游戏的平台来坑玩家。
为了设计漂亮一点的初始局面，vfleaking用以下方式来找灵感：拿出很多石子，把它们聚成一堆一堆的，对每一堆编号1,2,3,4,...n,在堆与堆间连边，没有自环与重边，从任意堆到任意堆都只有唯一一条路径可到达。然后他不停地进行如下操作：
1. 随机选两个堆v,u，询问若在v到u间的路径上的石子堆中玩Nim游戏，是否有必胜策略，如果有，vfleaking将会考虑将这些石子堆作为初始局面之一，用来坑玩家。
2. 把堆v中的石子数变为k。

由于vfleaking太懒了，他懒得自己动手了。请写个程序帮帮他吧。


# Input
第一行一个数n，表示有多少堆石子。
接下来的一行，第i个数表示第i堆里有多少石子。
接下来n-1行，每行两个数v,u，代表v,u间有一条边直接相连。
接下来一个数q，代表操作的个数。
接下来q行，每行开始有一个字符：
如果是Q，那么后面有两个数v,u，询问若在v到u间的路径上的石子堆中玩Nim游戏，是否有必胜策略。
如果是C，那么后面有两个数v,k，代表把堆v中的石子数变为k。

对于100%的数据：
$1\leq N\leq 500000, 1\leq Q\leq 500000, 0\leq 任何时候每堆石子的个数\leq 32767$
其中有30%的数据：
石子堆组成了一条链，这3个点会导致你DFS时爆栈（也许你不用DFS？）。其它的数据DFS目测不会爆。

注意：石子数的范围是0到INT_MAX

# Output
对于每个Q，输出一行Yes或No，代表对询问的回答。

# Sample Input
5
1 3 5 2 5
1 5
3 5
2 5
1 4
6
Q 1 2
Q 3 5
C 3 7
Q 1 2
Q 2 4
Q 5 3

# Sample Output
Yes
No
Yes
Yes
Yes

# 题解
LCA+树状数组
我还是照样用倍增求LCA、、

# 代码
```cpp
#include <bits/stdc++.h>
#define N 500020
#define M 20
#define ll long long
using namespace std;
inline int read(){
	int x=0,f=0;char ch=getchar();
	while(ch>'9'||ch<'0'){if(ch=='-')f=1;ch=getchar();}
	while(ch<='9'&&ch>='0'){x=(x<<3)+(x<<1)+ch-'0';ch=getchar();}
	return f?-x:x;
}
int to[N<<1], nxt[N<<1], head[N], cnt, ls[N];
int tot, fa[N][M], c[N], dep[N], a[N], rs[N];
char ch[5];
void add(int x, int v){
	for(;x<N;x+=x&-x)c[x]^=v;
}
int ask(int x){
	int ans = 0;
	for(;x;x^=x&-x)ans^=c[x];
	return ans;
}
void ins(int x, int y){
	to[++cnt] = y; nxt[cnt] = head[x]; head[x] = cnt;
	to[++cnt] = x; nxt[cnt] = head[y]; head[y] = cnt;
}
void dfs(int x, int f){
	ls[x] = ++tot;
	dep[x] = dep[f]+1;
	fa[x][0] = f;
	for(int i = head[x]; i; i = nxt[i])
		if(to[i] != f) dfs(to[i], x);
	rs[x] = tot;
}
int lca(int x, int y){
	if(dep[x] < dep[y]) swap(x, y);
	for(int i = M-1; i >= 0; i--)
		if(dep[fa[x][i]] >= dep[y])
			x = fa[x][i];
	if(x == y) return x;
	for(int i = M-1; i >= 0; i--)
		if(fa[x][i] != fa[y][i])
			x = fa[x][i], y = fa[y][i];
	return fa[x][0];
}
int main(){
	int n = read();
	for(int i = 1; i <= n; i++) a[i] = read();
	for(int i = 1; i < n; i++) ins(read(), read());
	dfs(1, 0);
	for(int j = 1; j < M; j++)
		for(int i = 1; i <= n; i++)
			if(fa[i][j-1]) fa[i][j] = fa[fa[i][j-1]][j-1];
	int m = read();
	for(int i = 1; i <= n; i++)
		add(ls[i], a[i]), add(rs[i]+1, a[i]);
	for(int i = 1; i <= m; i++){
		scanf("%s", ch);int x = read(), y = read();
		if(ch[0] == 'Q')
			puts(ask(ls[x])^ask(ls[y])^a[lca(x, y)] ? "Yes":"No");
		else{
			add(ls[x], a[x]), add(rs[x]+1, a[x]);
			a[x] = y;
			add(ls[x], a[x]), add(rs[x]+1, a[x]);
		}
	}
	return 0;
}
```