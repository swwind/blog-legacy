layout: post
title: 'BZOJ 1452: [JSOI2009]Count'
date: 2017-03-16 20:19:49
tags: 树状数组
categories: 题解
---
题面
-------------
一个 n\*m 的方格，初始时每个格子有一个整数权值。接下来有 2 种操作：
- 改变一个格子的权值；
- 求一个子矩阵中某种特定权值出现的个数。

Input
-------------
第一行有两个数 N，M。
接下来 N 行，每行 M 个数，第 i+1 行第 j 个数表示格子(i, j)的初始权值。
接下来输入一个整数 Q。
之后 Q 行，每行描述一个操作。
操作1：“1 x y c”（不含双引号）。表示将格子(x, y)飞权值改成 c(1 ≤ x ≤ n, 1 ≤ y ≤ m, 1 ≤ c ≤ 100)。
操作2：“2 x1 x2 y1 y2 c”（不含双引号，x1 ≤ x2, y1 ≤ y2）。表示询问所有满足格子颜色为c，且 x1 ≤ x ≤ x2, y1 ≤ y ≤ y2 的格子(x, y)的个数。

Output
-------------
对于每个操作2，按照在输入中出现的顺序，一次输出一行一个整数表示所求得的个数。


Simple Input
-------------
3 3
1 2 3
3 2 1
2 1 3
3
2 1 2 1 2 1
1 2 3 2
2 2 3 2 3 2

Simple Output
-------------
1
2

题解
-------------
二位树状数组。。。
也就多了一层for循环的事情。。

代码
-------------
```cpp
#include <bits/stdc++.h>
using namespace std;
int t[105][305][305], n, m, mp[305][305], q;
void add(int c, int x, int y, int val){
	for(int i=x;i<=n;i+=i&-i)for(int j=y;j<=m;j+=j&-j)t[c][i][j]+=val;
}
int get(int c, int x, int y){
	int ans = 0;
	for(int i=x;i;i-=i&-i)for(int j=y;j;j-=j&-j)ans+=t[c][i][j];
	return ans;
}
int main(){
	scanf("%d%d", &n, &m);
	for(int i = 1; i <= n; i++)
		for(int j = 1; j <= m; j++){
			scanf("%d", &mp[i][j]);
			add(mp[i][j], i, j, 1);
		}
	scanf("%d", &q);
	while(q--){
		int op, x1, x2, y1, y2, c;
		scanf("%d", &op);
		if(op == 1){
			scanf("%d%d%d", &x1, &y1, &c);
			add(mp[x1][y1], x1, y1, -1);
			mp[x1][y1] = c;
			add(c, x1, y1, 1);
		}
		else{
			scanf("%d%d%d%d%d", &x1, &x2, &y1, &y2, &c);
			printf("%d\n", get(c, x2, y2) + get(c, x1-1, y1-1)
				- get(c, x1-1, y2) - get(c, x2, y1-1));
		}
	}
	return 0;
}
```