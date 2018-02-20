layout: post
title: 'BZOJ 4152: [AMPPZ2014]The Captain'
date: 2017-05-11 11:07:03
tags: 最短路
categories: 题解
---
# 题面
给定平面上的$n$个点，定义$(x1,y1)$到$(x2,y2)$的费用为$min(|x1-x2|,|y1-y2|)$，求从$1$号点走到$n$号点的最小费用。

# Input
第一行包含一个正整数$n(2\leq n\leq 200000)$，表示点数。
接下来$n$行，每行包含两个整数$x[i],y\[i\](0\leq x[i],y[i]\leq 10^9)$，依次表示每个点的坐标。

# Output
一个整数，即最小费用。


# Sample Input
5
2 2
1 1
4 5
7 1
6 7

# Sample Output
2

# 题解
这题有毒，~~我Dijkstra写炸了调了一个钟头。~~
先按x轴坐标排序，然后把相邻的点连边（如果x轴的绝对值小于等于y轴的绝对值）。y轴同理。
然后跑dijkstra就好了

<span class="meiryo">
その足を止めないでよ
その両手で羽ばたけるから
</span>

# 代码
```cpp
#include <bits/stdc++.h>
#define N 200020
#define ll long long
using namespace std;
inline ll read(){
	ll x=0,f=0;char ch=getchar();
	while(ch>'9'||ch<'0'){if(ch=='-')f=1;ch=getchar();}
	while(ch<='9'&&ch>='0'){x=(x<<3)+(x<<1)+ch-'0';ch=getchar();}
	return f?-x:x;
}
struct node{
	int x, y, id;
}a[N];
struct edge{
	int to, nxt;
	ll val;
}e[N<<2];
struct qq{
	int to;
	ll val;
	bool operator < (const qq &b) const {
		return val > b.val;
	}
};
priority_queue<qq> q;
int head[N], cnt;
ll dis[N];
bool cmp1(node a, node b){
	return a.x < b.x;
}
bool cmp2(node a, node b){
	return a.y < b.y;
}
void ins(int x, int y, ll z){
	e[++cnt] = (edge){y, head[x], z}; head[x] = cnt;
	e[++cnt] = (edge){x, head[y], z}; head[y] = cnt;
}
int main(){
	int n = read();
	for(int i = 1; i <= n; i++){
		a[i].x = read(); a[i].y = read();
		a[i].id = i;
	}
	sort(a+1, a+n+1, cmp1);
	for(int i = 1; i < n; i++) if(a[i+1].x-a[i].x <= abs(a[i].y-a[i+1].y))
		ins(a[i].id, a[i+1].id, a[i+1].x-a[i].x);
	sort(a+1, a+n+1, cmp2);
	for(int i = 1; i < n; i++) if(a[i+1].y-a[i].y <= abs(a[i].x-a[i+1].x))
		ins(a[i].id, a[i+1].id, a[i+1].y-a[i].y);
	memset(dis, 127/3, sizeof dis);
	dis[1] = 0;
	q.push((qq){1, 0});
	while(!q.empty()){
		qq tmp = q.top(); q.pop();
		if(dis[tmp.to] != tmp.val) continue;
		for(int i = head[tmp.to]; i; i = e[i].nxt){
			if(dis[e[i].to] > dis[tmp.to]+e[i].val){
				dis[e[i].to] = dis[tmp.to]+e[i].val;
				q.push((qq){e[i].to, dis[e[i].to]});
			}
		}
	}
	printf("%lld\n", dis[n]);
}
```