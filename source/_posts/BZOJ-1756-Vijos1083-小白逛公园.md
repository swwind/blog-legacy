layout: post
title: 'BZOJ 1756: Vijos1083 小白逛公园'
date: 2017-03-13 09:33:53
tags: 线段树
categories: 题解
---

题面
--------------------
小新经常陪小白去公园玩，也就是所谓的遛狗啦…在小新家附近有一条“公园路”，路的一边从南到北依次排着n个公园，小白早就看花了眼，自己也不清楚该去哪些公园玩了。一开始，小白就根据公园的风景给每个公园打了分-.-。小新为了省事，每次遛狗的时候都会事先规定一个范围，小白只可以选择第a个和第b个公园之间（包括a、b两个公园）选择连续的一些公园玩。小白当然希望选出的公园的分数总和尽量高咯。同时，由于一些公园的景观会有所改变，所以，小白的打分也可能会有一些变化。那么，就请你来帮小白选择公园吧。

Input
--------------------
第一行，两个整数N和M，分别表示表示公园的数量和操作（遛狗或者改变打分）总数。 接下来N行，每行一个整数，依次给出小白 开始时对公园的打分。 接下来M行，每行三个整数。第一个整数K，1或2。K=1表示，小新要带小白出去玩，接下来的两个整数a和b给出了选择公园的范围（1≤a,b≤N）；K=2表示，小白改变了对某个公园的打分，接下来的两个整数p和s，表示小白对第p个公园的打分变成了s（1≤p≤N）。 其中，1≤N≤500 000，1≤M≤100 000，所有打分都是绝对值不超过1000的整数。


Output
--------------------
小白每出去玩一次，都对应输出一行，只包含一个整数，表示小白可以选出的公园得分和的最大值。

Simple Input
--------------------
5 3
1 2 -3 4 5
1 2 3
2 2 -1
1 2 3

Simple Output
--------------------
2
-1

解法
--------------------
线段树水题
题意是要你求区间最大子段和，支持单点修改
所以维护一下每一个节点 左起最大和 和 右起最大和 以及 区间最大子段和 即可

代码
--------------------
```cpp
/**************************************************************
	Problem: 1756
	User: SHENZHEBEI //我没权限号，用同学的号刷的
	Language: C++
	Result: Accepted
	Time:2636 ms
	Memory:48172 kb
****************************************************************/
 
#include <bits/stdc++.h>
#define ll long long
#define N 500050
using namespace std;
struct node{
	int mx, ls, rs, lmx, rmx, sum;
}tr[N<<2]; //数组要开四倍大小
void push_up(int x){ //跟新节点x
	tr[x].sum = tr[x<<1].sum+tr[x<<1|1].sum;
	tr[x].lmx = max(tr[x<<1].lmx, tr[x<<1].sum+tr[x<<1|1].lmx);
	tr[x].rmx = max(tr[x<<1|1].rmx, tr[x<<1|1].sum+tr[x<<1].rmx);
	tr[x].mx = max(max(tr[x<<1].mx, tr[x<<1|1].mx), tr[x<<1].rmx+tr[x<<1|1].lmx);
}
node ask(int x, int l, int r){
	if(tr[x].ls == l && tr[x].rs == r) return tr[x];
	int mid = tr[x].ls + tr[x].rs >> 1;
	if(r <= mid) return ask(x<<1, l, r);
	if(l > mid) return ask(x<<1|1, l, r);
	node ls = ask(x<<1, l, mid), rs = ask(x<<1|1, mid+1, r), ans;
	ans.mx = max(max(ls.mx, rs.mx), ls.rmx+rs.lmx);
	ans.rmx = max(rs.rmx, rs.sum+ls.rmx);
	ans.lmx = max(ls.lmx, ls.sum+rs.lmx);
	return ans;
}
void add(int x, int l, int v){
	if(tr[x].ls==l&&tr[x].rs==tr[x].ls){
		tr[x].sum=tr[x].lmx=tr[x].rmx=tr[x].mx=v;
		return;
	}
	int mid = tr[x].ls + tr[x].rs >> 1;
	if(l <= mid) add(x<<1, l, v);
	else add(x<<1|1, l, v);
	push_up(x);
}
void build(int x, int l, int r){
	tr[x].ls = l, tr[x].rs = r;
	if(l == r){
		scanf("%d", &tr[x].mx);
		tr[x].lmx=tr[x].rmx=tr[x].sum=tr[x].mx;
		return;
	}
	int mid = l + r >> 1;
	build(x<<1, l, mid);
	build(x<<1|1, mid+1, r);
	push_up(x);
}
int n, m, op, l, r;
int main(){
	scanf("%d%d", &n, &m);
	build(1, 1, n);
	while(m--){
		scanf("%d%d%d", &op, &l, &r);
		if(op == 1) printf("%d\n", ask(1, min(l, r), max(l, r)).mx); //这里有陷阱,mdzz RE了无数次
		else add(1, l, r);
	}
	return 0;
}
```