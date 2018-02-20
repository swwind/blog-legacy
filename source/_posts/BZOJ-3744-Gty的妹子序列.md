layout: post
title: 'BZOJ 3744: Gty的妹子序列'
date: 2017-04-07 09:05:58
tags: 分块
categories: 题解
---
# 题面
我早已习惯你不在身边，
人间四月天 寂寞断了弦。
回望身后蓝天，
跟再见说再见……
某天,蒟蒻Autumn发现了从 Gty的妹子树(bzoj3720) 上掉落下来了许多妹子,他发现
她们排成了一个序列,每个妹子有一个美丽度。
Bakser神犇与他打算研究一下这个妹子序列,于是Bakser神犇问道:"你知道区间
[l,r]中妹子们美丽度的逆序对数吗?"
蒟蒻Autumn只会离线乱搞啊……但是Bakser神犇说道:"强制在线。"
请你帮助一下Autumn吧。
给定一个正整数序列a,对于每次询问,输出$a_l,...,a_r$中的逆序对数,强制在线。、


# Input
第一行包括一个整数$n$($1\leq n\leq 50000$),表示数列a中的元素数。
第二行包括$n$个整数$a_1,...,a_n$($a_i\gt 0$,保证$a_i$在int内)。
接下来一行包括一个整数$m$($1\leq m\leq 50000$),表示询问的个数。
接下来m行,每行包括$2$个整数$l$、$r$($1\leq l\leq r\leq n$),表示询问al...ar中的逆序
对数(若$a_i\gt a_j$且$i\lt j$,则为一个逆序对)。
$l$,$r$要分别异或上一次询问的答案(`lastans`),最开始时`lastans=0`。
保证涉及的所有数在int内。

# Output
对每个询问,单独输出一行,表示al...ar中的逆序对数。

# Sample Input
4
1 4 2 3
1
2 4

# Sample Output
2

# 题解
分块即可。（布吉岛的自己百度
就系把长度为 N 的序列分成 sqrt(N) 块啊，把这些块里的逆序对个数都预处理出来。
然后询问时多粗来的暴力求就好了嘛。。
问我怎么预处理？也是暴力啊、、
11784ms（把 i++ 都改成 ++i 会变慢。。。）

# 代码
```cpp
#include <bits/stdc++.h>
#define N 50020
using namespace std;
inline int read(){
	int x=0,f=1;char ch=getchar();
	while(ch>'9'||ch<'0'){if(ch=='-')f=-1;ch=getchar();}
	while(ch<='9'&&ch>='0'){x=x*10+ch-'0';ch=getchar();}
	return x*f;
}
int n, m, a[N], b[N], val[N];
int pos[N], st[N], rst[250][N], btb[250][250];
// 树状数组
void add(int x){
	for(;x<=n;x+=x&-x)++val[x];
}
int ask(int x){
	int ans = 0;
	for(;x;x-=x&-x)ans+=val[x];
	return ans;
}
int work(int l, int r){
	memset(val, 0, sizeof val);
	if(pos[l]==pos[r]){
		int ans = 0;
		for(;l<=r;--r)
			ans += ask(a[r]-1), add(a[r]);
		return ans;
	}
	int ans = btb[pos[l]+1][pos[r]-1], cnt = st[pos[r]]-st[pos[l]+1];
	for(int i = st[pos[l]+1]-1; l <= i; --i){
		ans += ask(a[i]-1)+rst[pos[r]-1][a[i]-1]-rst[pos[l]][a[i]-1];
		add(a[i]); ++cnt;
	}
	for(int i = st[pos[r]]; i <= r; i++){
		ans += cnt-ask(a[i])-rst[pos[r]-1][a[i]]+rst[pos[l]][a[i]];
		add(a[i]); ++cnt;
	}
	return ans;
}
int main(){
	n = read();
	for(int i = 1; i <= n; i++)
		a[i] = b[i] = read();
	sort(b+1, b+n+1);
	for(int i = 1; i <= n; i++)
		a[i] = lower_bound(b+1, b+n+1, a[i])-b;
	int size = sqrt(n);
	for(int i = 1; i <= n; i++)
		pos[i] = (i-1)/size+1;
	int block = pos[n];
	for(int i = 1; i <= block; i++)
		st[i] = size*(i-1)+1;
	st[block+1] = n+1;
	// 偶就系要酱紫压行，你来咬偶啊
	for(int i = 1, cnt1=0,cnt2=0; i <= block;
			i++, cnt1=cnt2=0, memcpy(rst[i], rst[i-1], sizeof rst[i]),
			memset(val, 0, sizeof val))
		for(int j = i; j <= block; j++)
			for(int k = st[j]; k < st[j+1]; k++){
				btb[i][j] = (cnt1 += cnt2-ask(a[k]));
				add(a[k]); ++cnt2, ++rst[j][a[k]];
			}
	for(int i = 1; i <= block; i++)
		for(int j = 2; j <= n; j++)
			rst[i][j] += rst[i][j-1];
	int m = read(), lastans = 0;
	while(m--){
		int l=read()^lastans, r=read()^lastans;
		printf("%d\n", lastans = work(l, r));
	}
	return 0;
}
```