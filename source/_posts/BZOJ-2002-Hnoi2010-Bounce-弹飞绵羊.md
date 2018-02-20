layout: post
title: 'BZOJ 2002: [Hnoi2010]Bounce 弹飞绵羊'
date: 2017-04-10 08:44:29
tags: [分块, LCT]
categories: 题解
---
# 题面
某天，Lostmonkey发明了一种超级弹力装置，为了在他的绵羊朋友面前显摆，他邀请小绵羊一起玩个游戏。游戏一开始，Lostmonkey在地上沿着一条直线摆上$n$个装置，每个装置设定初始弹力系数$k_i$，当绵羊达到第$i$个装置时，它会往后弹$k_i$步，达到第$i+k_i$个装置，若不存在第$i+k_i$个装置，则绵羊被弹飞。绵羊想知道当它从第$i$个装置起步时，被弹几次后会被弹飞。为了使得游戏更有趣，Lostmonkey可以修改某个弹力装置的弹力系数，任何时候弹力系数均为正整数。

# Input
第一行包含一个整数$n$，表示地上有$n$个装置，装置的编号从$0$到$n-1$,接下来一行有$n$个正整数，依次为那$n$个装置的初始弹力系数。第三行有一个正整数$m$，接下来$m$行每行至少有两个数$i$、$j$，若$i=1$，你要输出从$j$出发被弹几次后被弹飞，若$i=2$则还会再输入一个正整数$k$，表示第$j$个弹力装置的系数被修改成$k$。
对于$20\%$的数据$n,m\leq 10000$。
对于$100\%$的数据$n\leq 200000,m\leq 100000$。


# Output
对于每个$i=1$的情况，你都要输出一个需要的步数，占一行。

# Sample Input
4
1 2 1 1
3
1 1
2 1 1
1 1

# Sample Output
2
3

# 题解
这题有两种做法。。但我只会分块。。LCT太恶心了，看了一个晚上就是看不懂他在干什么。。没事rever个毛线啊（听说是为了保证复杂度。。）
分块的话，直接一个块一个块跳。。具体我就不说了（~~别问我怎么这么像hzwer的~~

# 代码
```cpp
#include <bits/stdc++.h>
#define N 200020
using namespace std;
inline int read(){
	int x=0,f=1;char ch=getchar();
	while(ch>'9'||ch<'0'){if(ch=='-')f=-1;ch=getchar();}
	while(ch<='9'&&ch>='0'){x=x*10+ch-'0';ch=getchar();}
	return x*f;
}
int n, st[N], pt[N], a[N], l[1020], pos[N];
int main(){
	int block = sqrt(n = read());
	int cnt = n/block;
	if(n%block) cnt++;
	for(int i = 1; i <= n; i++){
		a[i] = read();
		pos[i] = (i-1)/block+1;
	}
	for(int i = 1; i <= cnt; i++)
		l[i] = (i-1)*block+1;
	for(int i = n; i; i--)
		if(i+a[i]>n) st[i] = 1;
		else if(pos[i]==pos[i+a[i]])
			st[i] = st[i+a[i]]+1, pt[i] = pt[i+a[i]];
		else st[i] = 1, pt[i] = i+a[i];
	int m = read();
	while(m--){
		int op = read(), x = read()+1, y = 0;
		if(op == 1){
			while(x){
				y += st[x];
				x = pt[x];
			}
			printf("%d\n", y);
		}
		else{
			a[x] = read();
			for(int i = x; i >= l[pos[x]]; i--)
				if(pos[i]==pos[i+a[i]])
					st[i] = st[i+a[i]]+1, pt[i] = pt[i+a[i]];
				else st[i] = 1, pt[i] = i+a[i];
		}
	}
}
```

# LCT做法 (4.14 Update)
学过了才发现不过如此
跑的比分块慢多了
~~别问我怎么还是很像hzwer的~~
```cpp
#include <bits/stdc++.h>
#define N 200020
using namespace std;
inline int read(){
	int x=0,f=1;char ch=getchar();
	while(ch>'9'||ch<'0'){if(ch=='-')f=-1;ch=getchar();}
	while(ch<='9'&&ch>='0'){x=x*10+ch-'0';ch=getchar();}
	return x*f;
}
int c[N][2], fa[N], rev[N], st[N], sz[N], nxt[N];
bool isroot(int x){
	return c[fa[x]][0] != x && c[fa[x]][1] != x;
}
void push_down(int x){
	if(!rev[x])return;
	rev[x] ^= 1;
	rev[c[x][0]] ^= 1;
	rev[c[x][1]] ^= 1;
	swap(c[x][0], c[x][1]);
}
void push_up(int x){
	sz[x] = sz[c[x][0]]+sz[c[x][1]]+1;
}
void rotate(int x){
	int y = fa[x], z = fa[y];
	int r = c[y][0] == x, l = r^1;
	if(!isroot(y)) c[z][c[z][0]!=y] = x;
	fa[x] = z; fa[y] = x; fa[c[x][r]] = y;
	c[y][l] = c[x][r]; c[x][r] = y;
	push_up(y); push_up(x);
}
void splay(int x){
	int top = 0; st[++top]=x;
	for(int i = x; !isroot(i); i=fa[i])
		st[++top] = fa[i];
	for(int i = top; i; i--)
		push_down(st[i]);
	while(!isroot(x)){
		int y = fa[x], z = fa[y];
		if(!isroot(y))if(c[y][0]==x^c[z][0]==y)rotate(x);
		else rotate(y);
		rotate(x);
	}
}
void access(int x){
	int t = 0;
	while(x){
		splay(x);
		c[x][1] = t;
		t = x; x = fa[x];
	}
}
void rever(int x){
	access(x);splay(x);
	rev[x]^=1;
}
void link(int x, int y){
	rever(x);
	fa[x] = y;
	splay(x);
}
void cut(int x, int y){
	rever(x); access(y); splay(y);
	c[y][0] = fa[x] = 0;
}
int find(int x){
	access(x); splay(x);
	int y = x;
	while(c[y][0])y=c[y][0];
	return y;
}
int main(){
	int n = read();
	for(int i = 1,x; i <= n; i++){
		nxt[i] = (x=read())+i;
		sz[i] = 1;
		if(nxt[i] > n) nxt[i] = n+1;
		fa[i] = nxt[i];
	}
	sz[n+1] = 1;
	int m = read();
	for(int i = 1; i <= m; i++){
		if(read()==1){
			int x = read()+1;
			rever(n+1); access(x); splay(x);
			printf("%d\n", sz[c[x][0]]);
		}
		else{
			int x = read()+1, y = read();
			int t = min(x+y, n+1);
			cut(x, nxt[x]); link(x, nxt[x]=t);
		}
	}
}
```