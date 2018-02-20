layout: post
title: 'BZOJ 1143: [CTSC2008]祭祀river'
date: 2017-05-04 16:19:39
tags: 蒙特卡罗
categories: 题解
---
# 题面
在遥远的东方，有一个神秘的民族，自称Y族。他们世代居住在水面上，奉龙王为神。每逢重大庆典， Y族都
会在水面上举办盛大的祭祀活动。我们可以把Y族居住地水系看成一个由岔口和河道组成的网络。每条河道连接着
两个岔口，并且水在河道内按照一个固定的方向流动。显然，水系中不会有环流（下图描述一个环流的例子）。
![](http://www.lydsy.com/JudgeOnline/images/1143.jpg)
由于人数众多的原因，Y族的祭祀活动会在多个岔口上同时举行。出于对龙王的尊重，这些祭祀地点的选择必
须非常慎重。准确地说，Y族人认为，如果水流可以从一个祭祀点流到另外一个祭祀点，那么祭祀就会失去它神圣
的意义。族长希望在保持祭祀神圣性的基础上，选择尽可能多的祭祀的地点。


# Input
第一行包含两个用空格隔开的整数N、M，分别表示岔口和河道的数目，岔口从1到N编号。接下来M行，每行包
含两个用空格隔开的整数u、v，描述一条连接岔口u和岔口v的河道，水流方向为自u向v。 N ≤ 100 M ≤ 1 000

# Output
第一行包含一个整数K，表示最多能选取的祭祀点的个数。

# Sample Input
4 4
1 2
3 4
3 2
4 2

# Sample Output
2

# 题解
蒙特卡罗淡定水过。
二分图什么的都弱爆了
![](/img/huaji.png)

# 代码
```cpp
#include <bits/stdc++.h>
using namespace std;
bool mp[120][120];
int fa[120], q[120],n,m, cnt, ans;
void r(){
	for(int i = 2; i <= n; i++)
		swap(fa[i], fa[rand()%i+1]);
}
int main(){
	srand(23333);
	scanf("%d%d", &n, &m);
	for(int i = 1,x,y; i <= m; i++){
		scanf("%d%d", &x, &y);
		mp[x][y] = 1;
	}
	for(int k = 1; k <= n; k++)
		for(int i = 1; i <= n; i++)
			for(int j = 1; j <= n; j++)
				mp[i][j] = mp[i][j] || mp[i][k]&&mp[k][j];
	for(int i = 1; i <= n; i++) fa[i] = i;
	for(int i = 1; i <= 10000; i++){
		r(); cnt = 0;
		for(int j = 1; j <= n; j++){
			bool flag = 1;
			for(int k = 1; k <= cnt&&flag; k++)
				if(mp[q[k]][fa[j]] || mp[fa[j]][q[k]])
					flag = 0;
			if(flag) q[++cnt] = fa[j];
		}
		ans = max(ans, cnt);
	}
	printf("%d\n", ans);
}
```