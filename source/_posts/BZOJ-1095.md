layout: post
title: 'BZOJ 1095: [ZJOI2007]Hide 捉迷藏'
date: 2017-06-05 13:35:22
tags: 线段树
categories: 题解
---
# 题面
捉迷藏 Jiajia和Wind是一对恩爱的夫妻，并且他们有很多孩子。某天，Jiajia、Wind和孩子们决定在家里玩捉迷藏游戏。他们的家很大且构造很奇特，由N个屋子和N-1条双向走廊组成，这N-1条走廊的分布使得任意两个屋子都互相可达。游戏是这样进行的，孩子们负责躲藏，Jiajia负责找，而Wind负责操纵这N个屋子的灯。在起初的时候，所有的灯都没有被打开。每一次，孩子们只会躲藏在没有开灯的房间中，但是为了增加刺激性，孩子们会要求打开某个房间的电灯或者关闭某个房间的电灯。为了评估某一次游戏的复杂性，Jiajia希望知道可能的最远的两个孩子的距离（即最远的两个关灯房间的距离）。 我们将以如下形式定义每一种操作： C(hange) i 改变第i个房间的照明状态，若原来打开，则关闭；若原来关闭，则打开。 G(ame) 开始一次游戏，查询最远的两个关灯房间的距离。

# Input
第一行包含一个整数N，表示房间的个数，房间将被编号为1,2,3…N的整数。接下来N-1行每行两个整数a, b，表示房间a与房间b之间有一条走廊相连。接下来一行包含一个整数Q，表示操作次数。接着Q行，每行一个操作，如上文所示。


# Output
对于每一个操作Game，输出一个非负整数到hide.out，表示最远的两个关灯房间的距离。若只有一个房间是关着灯的，输出0；若所有房间的灯都开着，输出-1。

# Sample Input
8
1 2
2 3
3 4
3 5
3 6
6 7
6 8
7
G
C 1
G
C 2
G
C 1
G

# Sample Output
4
3
3
4

# HINT
对于100%的数据，$N\leq 100000,M\leq 500000$。

# 题解
居然还可以把树的直径用线段树来求。。。涨姿势了。
> 大家一起膜拜[岛娘](http://www.shuizilong.com/house/archives/bzoj-1095-zjoi2007hide-%E6%8D%89%E8%BF%B7%E8%97%8F/)吧 - hzwer

# 代码
```cpp
#include <bits/stdc++.h>
#define maxs(a,b,c) max(max(a,b),c)
#define N 100020
#define ST -6
#define ED -9
using namespace std;
const int inf = 1 << 30;
inline int read(){
	int x = 0, f = 0; char ch=getchar();
	while(ch>'9'||ch<'0'){if(ch=='-')f=1;ch=getchar();}
	while(ch>='0'&&ch<='9'){x=(x<<1)+(x<<3)+ch-'0';ch=getchar();}
	return f?-x:x;
}
int v[N*3], c[N], pos[N], tot, cnt, ccnt;
int head[N], to[N<<1], nxt[N<<1];
void ins(int x, int y){
	to[++cnt] = y; nxt[cnt] = head[x]; head[x] = cnt;
	to[++cnt] = x; nxt[cnt] = head[y]; head[y] = cnt;
}
void dfs(int x, int fa){
	v[++tot] = ST; v[++tot] = x;
	pos[x] = tot;
	for(int i = head[x]; i; i = nxt[i])
		if(to[i] != fa) dfs(to[i], x);
	v[++tot] = ED;
}
struct node{
	int c1, c2, l1, l2, r1, r2, l, r, dis;
	friend node operator + (const node &a, const node &b) {
		node c;
		c.l = a.l; c.r = b.r;
		c.dis = max(a.dis, b.dis);
		c.dis = maxs(c.dis, a.r1+b.l2, a.r2+b.l1);
		if(a.c2 < b.c1) c.c1 = a.c1-a.c2+b.c1, c.c2 = b.c2;
		else c.c1 = a.c1, c.c2 = a.c2-b.c1+b.c2;
		c.r1 = maxs(b.r1, a.r1-b.c1+b.c2, a.r2+b.c1+b.c2);
		c.r2 = max(b.r2, a.r2+b.c1-b.c2);
		c.l1 = maxs(a.l1, b.l1-a.c2+a.c1, b.l2+a.c2+a.c1);
		c.l2 = max(a.l2, b.l2+a.c2-a.c1);
		return c;
	}
	void init(int x){
		l = r = x;
		dis = -inf;
		c1 = c2 = 0;
		if(v[x] == ST) c2 = 1;
		if(v[x] == ED) c1 = 1;
		if(v[x] > 0 && c[v[x]]) l1 = l2 = r1 = r2 = 0;
		else l1 = l2 = r1 = r2 = -inf;
	}
}t[N*12];
void update(int x, int k){
	if(t[x].l == t[x].r) return t[x].init(t[x].l);
	int mid = t[x].l + t[x].r >> 1;
	if(k <= mid) update(x<<1, k);
	else update(x<<1|1, k);
	t[x] = t[x<<1]+t[x<<1|1];
}
void build(int x, int l, int r){
	if(l == r) return t[x].init(l);
	int mid = l + r >> 1;
	build(x<<1, l, mid); build(x<<1|1, mid+1, r);
	t[x] = t[x<<1]+t[x<<1|1];
}
int main(){
	int n = read(); ccnt = n;
	for(int i = 1; i <= n; i++) c[i] = 1;
	for(int i = 1; i < n; i++) ins(read(), read());
	dfs(1, 0); build(1, 1, tot);
	int m = read();
	for(int i = 1; i <= m; i++){
		if(getchar() == 'C'){
			int x = read();
			if(c[x]) ccnt--;
			else ccnt++;
			c[x] ^= 1;
			update(1, pos[x]);
		}
		else{ getchar();
			if(!ccnt) puts("-1");
			else if(ccnt == 1) puts("0");
			else printf("%d\n", t[1].dis);
		}
	}
}
```