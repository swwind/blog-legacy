layout: post
title: 'BZOJ 2654: tree'
date: 2017-06-02 10:21:11
tags: 瞎搞
categories: 题解
---
# 题面
给你一个无向带权连通图，每条边是黑色或白色。让你求一棵最小权的恰好有need条白色边的生成树。
题目保证有解。

# Input
第一行V,E,need分别表示点数，边数和需要的白色边数。
接下来E行,每行s,t,c,col表示这边的端点(点从0开始标号)，边权，颜色(0白色1黑色)。

# Output
一行表示所求生成树的边权和。
$V\leq 50000,E\leq 100000$,所有数据边权为[1,100]中的正整数。


# Sample Input
2 2 1
0 1 1 1
0 1 2 0

# Sample Output
2

# 题解
先说一个错误的贪心。。
按c把边从小到大排序
然后先把need条白边取了
然后在剩下的里面取n-1-need条边就行了
代码如下
```cpp
#include <bits/stdc++.h>
#define ll long long
using namespace std;
inline int read(){
	int x=0,f=0;char ch=getchar();
	while(ch>'9'||ch<'0'){if(ch=='-')f=1;ch=getchar();}
	while(ch<='9'&&ch>='0'){x=(x<<3)+(x<<1)+ch-'0';ch=getchar();}
	return f?-x:x;
}
struct node{
	int x, y, c, t;
	friend bool operator < (const node &a, const node &b){
		return a.c < b.c;
	}
}a[100020];
int vis[100020], fa[50020], ans, tot;
int find(int x){return fa[x]==x?x:fa[x]=find(fa[x]);}
int main(){
	int n = read(), m = read(), need = read();
	for(int i = 1; i <= m; i++){
		a[i].x = read(); a[i].y = read();
		a[i].c = read(); a[i].t = read();
	}
	for(int i = 1; i <= n; i++) fa[i] = i;
	sort(a+1, a+m+1);
	for(int i = 1; i <= m; i++){
		if(a[i].t) continue; vis[i] = 1;
		int x = find(a[i].x), y = find(a[i].y);
		if(x == y) continue; fa[x] = y;
		ans += a[i].c; tot++;
		if(!--need) break;
	}
	for(int i = 1; i <= m; i++)if(!vis[i]){
		int x = find(a[i].x), y = find(a[i].y);
		if(x == y) continue; fa[x] = y;
		ans += a[i].c; if(++tot == n-1) break;
	}
	printf("%d\n", ans);
}
```
然后这题就能过了。。但是评论中有人Hack掉了。。那么我们就改一下。。
~~算了，我懒癌犯了~~