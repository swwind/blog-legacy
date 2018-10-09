layout: post
title: 'BZOJ 2716: [Violet 3]天使玩偶'
date: 2017-04-24 09:30:23
tags: kdtree
categories: 题解
---
# 题面
Ayu在七年前曾经收到过一个天使玩偶，当时她把它当做时间囊埋在了地下。儿七年后的今天，Ayu却忘了她把天使玩偶埋在了哪里，所以她决定仅凭借一点模糊的记忆来寻找它。
我们把Ayu生活的小镇看做一个二维平面，而Ayu会不定时的记起可能在某个点$(x,y)$埋下了天使玩偶：或者Ayu会询问你，假如他在$(x,y)$，那么她离最近的天使玩偶可能埋下的地方有多远。
因为Ayu只会沿着平行坐标轴的方向来行动，所以在这个问题里我们定义两个点之间的距离为$dist(A,B)=|A_x-B_x|+|A_y-B_y|$。其中$A_x$表示点$A$的横坐标，其余类似。

# Input
第一行包含两个整数$n$和$m$，在刚开始时，Ayu已经知道有$n$个点可能埋着天使玩偶，接下来Ayu要进行$m$次操作
接下来$n$行，每行两个非负整数$x_i,y_i$，表示初始$n$个点的坐标。
再接下来$m$行，每行三个非负整数$t,x_i,y_i$。
如果$t=1$，则表示Ayu又回忆起了一个可能埋着玩偶的点$(x_i,y_i)$。
如果$t=2$，则表示Ayu询问如果她在点$(x_i,y_i)$，那么在已经回忆出来的点里，离她最近的那个点有多远


# Output
对于每个$t=2$的询问，在单独的一行内输出该询问的结果。

# Sample Input & Output
样例太长
<a href="http://www.lydsy.com/JudgeOnline/problem.php?id=2716">题目链接</a>

# 题解
可以用k-d树做
好像k-d树就是用来做这个的吧。。

P.S. Ayu（[月宫亚由](http://baike.baidu.com/link?url=54_Ga1VP9e9NfeA3Viovt-7yiUl58Ngd3kEgEMdmbzVs3iqbmgC5g-V1GpCPwkybT0jAS4ZMW1k5rvwLhZPfFdaJADQtbGV7WJMY_9vLRRdrAeKnH0DGRpqkDwEIl50J)）出自《Kanon（雪之少女）》、、推荐补番、、

# 代码
```cpp
#include <bits/stdc++.h>
#define N 1000020
using namespace std;
int szb, n, m;
const int inf = 1<<30;
inline int read(){
	int x=0,f=1;char ch=getchar();
	while(ch>'9'||ch<'0'){if(ch=='-')f=-1;ch=getchar();}
	while(ch<='9'&&ch>='0'){x=(x<<3)+(x<<1)+ch-'0';ch=getchar();}
	return x*f;
}
struct node{
	int d[2], mn[2], mx[2], l, r;
	int& operator[] (int b){
		return d[b];
	}
	friend bool operator < (node a, node b){
		return a[szb] < b[szb];
	}
	friend int dis(node a, node b){
		return abs(a[0]-b[0])+abs(a[1]-b[1]);
	}
}p[N];
struct kdtree{
	node t[N], Q;
	int ans, rt;
	void update(int x){
		int l = t[x].l, r = t[x].r;
		if(l){
			t[x].mn[0] = min(t[x].mn[0], t[l].mn[0]);
			t[x].mn[1] = min(t[x].mn[1], t[l].mn[1]);
			t[x].mx[0] = max(t[x].mx[0], t[l].mx[0]);
			t[x].mx[1] = max(t[x].mx[1], t[l].mx[1]);
		}
		if(r){
			t[x].mn[0] = min(t[x].mn[0], t[r].mn[0]);
			t[x].mn[1] = min(t[x].mn[1], t[r].mn[1]);
			t[x].mx[0] = max(t[x].mx[0], t[r].mx[0]);
			t[x].mx[1] = max(t[x].mx[1], t[r].mx[1]);
		}
	}
	int build(int l, int r, int now){
		szb = now;
		int mid = l + r >> 1;
		nth_element(p+l, p+mid, p+r+1);
		t[mid] = p[mid];
		t[mid].mn[0] = t[mid].mx[0] = t[mid][0];
		t[mid].mn[1] = t[mid].mx[1] = t[mid][1];
		if(l < mid) t[mid].l = build(l, mid-1, now^1);
		if(mid < r) t[mid].r = build(mid+1, r, now^1);
		update(mid); return mid;
	}
	int getmn(node a){
		return
			max(Q[0]-a.mx[0], 0)+max(a.mn[0]-Q[0], 0)+
			max(Q[1]-a.mx[1], 0)+max(a.mn[1]-Q[1], 0);
	}
	int askmn(int x){
		ans = min(ans, dis(t[x], Q));
		int l = t[x].l, r = t[x].r;
		int dl = l ? getmn(t[l]) : inf;
		int dr = r ? getmn(t[r]) : inf;
		if(dl < dr){
			if(dl < ans) askmn(l);
			if(dr < ans) askmn(r);
		}
		else{
			if(dr < ans) askmn(r);
			if(dl < ans) askmn(l);
		}
	}
	int ask(int x, int y){
		Q[0] = x; Q[1] = y; ans = inf;
		askmn(rt); return ans;
	}
	void ins(int x, int now){
		if(Q[now] > t[x][now])
			if(t[x].r) ins(t[x].r, now^1);
			else{
				t[x].r = ++n; t[n] = Q;
				t[n].mn[0] = t[n].mx[0] = t[n][0];
				t[n].mn[1] = t[n].mx[1] = t[n][1];
			}
		else
			if(t[x].l) ins(t[x].l, now^1);
			else{
				t[x].l = ++n; t[n] = Q;
				t[n].mn[0] = t[n].mx[0] = t[n][0];
				t[n].mn[1] = t[n].mx[1] = t[n][1];
			}
		update(x);
	}
	void add(int x, int y){
		Q[0] = x; Q[1] = y;
		ins(rt, 0);
	}
}kd;
int main(){
	n = read(); m = read();
	for(int i = 1; i <= n; i++)
		p[i][0] = read(), p[i][1] = read();
	kd.rt = kd.build(1, n, 0);
	while(m--){
		int op = read(), x = read(), y = read();
		if(op == 1) kd.add(x, y);
		else printf("%d\n", kd.ask(x, y));
	}
	return 0;
}
```