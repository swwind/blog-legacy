layout: post
title: 'BZOJ 1037: [ZJOI2008]生日聚会Party'
date: 2017-03-27 21:27:10
tags: dp
categories: 题解
---
题面
-------------
今天是hidadz小朋友的生日，她邀请了许多朋友来参加她的生日party。 hidadz带着朋友们来到花园中，打算坐成一排玩游戏。为了游戏不至于无聊，就座的方案应满足如下条件：对于任意连续的一段，男孩与女孩的数目之差不超过k。很快，小朋友便找到了一种方案坐了下来开始游戏。hidadz的好朋友Susie发现，这样的就座方案其实是很多的，所以大家很快就找到了一种，那么到底有多少种呢？热爱数学的hidadz和她的朋友们开始思考这个问题…… 假设参加party的人中共有n个男孩与m个女孩，你是否能解答Susie和hidadz的疑问呢？由于这个数目可能很多，他们只想知道这个数目除以12345678的余数。
Input
-------------
仅包含一行共3个整数，分别为男孩数目n，女孩数目m，常数k。

Output
-------------
应包含一行，为题中要求的答案。
Sample Input
-------------
1 2 1
Sample Output
-------------
1
题解
-------------
dp: f[i][j][x][y]表示搜到第i个人，前面共有j个男的，男的比女的多x或女的比男的多y个的方案数
转移还是很好写的2333
代码
-------------
```cpp
#include <bits/stdc++.h>
#define zyy 12345678
using namespace std;
int n, m, k;
int f[320][155][22][22];
int main(){
	scanf("%d%d%d", &n, &m, &k);
	f[0][0][0][0] = 1;
	for(int i = 0; i < n+m; ++i) for(int j = 0; j <= n; ++j)
	for(int x = 0; x <= k; ++x) for(int y = 0; y <= k; ++y)
	if(f[i][j][x][y]){
		if(x < k && j < n)
			(f[i+1][j+1][x+1][max(y-1, 0)] += f[i][j][x][y]) %= zyy;
		if(y < k && i-j < m)
			(f[i+1][j][max(x-1, 0)][y+1] += f[i][j][x][y]) %= zyy;
	}
	int ans = 0;
	for(int i = 0; i <= n; ++i)
	for(int x = 0; x <= k; ++x)
	for(int y = 0; y <= k; ++y)
		(ans += f[n+m][i][x][y]) %= zyy;
	printf("%d\n", ans);
}
```