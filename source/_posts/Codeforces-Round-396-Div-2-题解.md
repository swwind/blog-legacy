---
layout: post
title: 'Codeforces Round #396 (Div. 2) 题解'
date: 2017-10-12 19:26:50
tags: [codeforces, javascript, dp]
categories: 题解
---

# 前言

继续颓废写 Codeforces 的题解。
马上就要初赛了却越来越颓废了。

![face1](/img/face1.jpg)![face2](/img/face2.jpg)

# A. Mahmoud and Longest Uncommon Subsequence

## 题意概述

要你求两个串的最长不公共子序列

## 思路

A 题不要想太多。
如果 `a == b` 直接输出 `-1` 。
否则输出 `max(a.length, b.length)` 。



## 代码

**JavaScript**

```javascript
;(function () {
	var a = readline(),
		b = readline()
	if (a === b) print(-1)
	else print(Math.max(a.length, b.length))
})();
```

# B. Mahmoud and a Triangle

## 题意概述

给你$n$个数，问你能不能找到三个数使其能组成一个三角形。

## 思路

$O(n^3)$的暴力显然是行不通的。
可以想到，先排序一发，要找到三个数一定是连续的三个数。
证明？

> 这不是显然成立的嘛。
<p class="speaker">zyy & szb</p>

## 代码

**JavaScript**

```javascript
;(function () {
	var n = + readline()
	var a = readline().split(' ')
	for (var k = 0; k < n; k++)
		a[k] = + a[k]
	a.sort(function (a, b) {
		return a - b;
	})
	var isTri = function (a, b, c) {
		return a + b > c && a + c > b && b + c > a
	}
	for (var k = 2; k < n; k++)
		if (isTri(a[k-2], a[k-1], a[k]))
			return print('YES')
	print('NO')
})();
```

**吐槽**

javascript 的 sort 有毒的啊。。。
连 number 都是按字典序排的啊。。。

# C. Mahmoud and a Message

## 题意概述

给你一个字符串$s$和一个数组$a$，要你把$s$切开来。
$a_i$表示第$i$个字母所在的片段的长度不能大于$a_i$。
问你三个东西：

- 全部的方案数$\pmod{10^9+7}$
- 切的最长的一段有多长
- 最少切成几份

## 思路

动态规划。
`f[i]` 表示方案数。
`g[i]` 表示最长的长度。
`r[i]` 表示最少的份数。
然后 xjb 转移一下就好了。
~~我最喜欢吃 htr 了~~

## 代码

**C++**

```cpp
#include <bits/stdc++.h>
#define N 1020
#define ll long long
#define mod 1000000007
using namespace std;
inline int read(){
	int x=0,f=1;char ch=getchar();
	while(ch>'9'||ch<'0')ch=='-'&&(f=0)||(ch=getchar());
	while(ch<='9'&&ch>='0')x=(x<<3)+(x<<1)+ch-'0',ch=getchar();
	return f?x:-x;
}
int f[N], g[N], r[N], cnt[30];
char str[N];
int main(int argc, char const *argv[]) {
	int n = read();
	scanf("%s", str + 1);
	for (int i = 0; i < 26; i++)
		cnt[i] = read();
	f[1] = 1;
	for (int i = 2, len; i <= n + 1; i++) {
		len  =   1 << 30;
		g[i] = - 1 << 30;
		r[i] =   1 << 30;
		for (int j = i - 1; j; j--) {
			len = min(len, cnt[str[j] - 'a']);
			if (len < i - j)
				break;
			f[i] = (f[i] + f[j]) % mod;
			g[i] = max(g[i], max(i - j, g[j]));
			r[i] = min(r[i], r[j] + 1);
		}
	}
	printf("%d\n%d\n%d\n", f[n + 1], g[n + 1], r[n + 1]);
	return 0;
}
```

# D. Mahmoud and a Dictionary

## 题意概述

<ruby><rb>恶</rb><rt>e</rt><rb>魔</rb><rt>m</rt><rb>妈</rb><rt>m</rt><rb>妈</rb><rt>m</rt><rb>摸</rb><rt>m</rt><rb>妹</rb><rt>m</rt><rb>妹</rb><rt>m</rt></ruby>......
就是每次告诉你一对近义词或者反义词，如果与之前冲突输出 `NO`，否则输出 `YES`。
然后最后再问你一些词，是近义词输出 `1`，反义词输出 `2`，不确定输出 `3`。

## 思路

显然并查集。
每个字符串拆成两个就行了。
具体看代码。

## 代码

**C++**

```cpp
#include <bits/stdc++.h>
#define N 200020
#define ll long long
using namespace std;
inline int read(){
	int x=0,f=1;char ch=getchar();
	while(ch>'9'||ch<'0')ch=='-'&&(f=0)||(ch=getchar());
	while(ch<='9'&&ch>='0')x=(x<<3)+(x<<1)+ch-'0',ch=getchar();
	return f?x:-x;
}
map<string, int> mp;
string str;
int fa[N];
int find(int x) {
	return fa[x] == x ? x : fa[x] = find(fa[x]);
}
void merge(int x, int y) {
	int fx = find(x), fy = find(y);
	fa[fx] = fy;
}
int main(int argc, char const *argv[]) {
	int n = read(), m = read(), k = read();
	for (int i = 0; i < n << 1; i ++)
		fa[i] = i;
	for (int i = 0; i < n; i ++) {
		cin >> str;
		mp[str] = i << 1;
	}
	while (m --) {
		int op = read();
		cin >> str;
		int x = mp[str];
		cin >> str;
		int y = mp[str];
		if (op == 1) {
			if (find(x ^ 1) == find(y)) puts("NO");
			else puts("YES"), merge(x, y), merge(x ^ 1, y ^ 1);
		} else {
			if (find(x) == find(y)) puts("NO");
			else puts("YES"), merge(x ^ 1, y), merge(x, y ^ 1);
		}
	}
	while (k --) {
		cin >> str;
		int x = mp[str];
		cin >> str;
		int y = mp[str];
		if (find(x) == find(y)) puts("1");
		else if (find(x ^ 1) == find(y)) puts("2");
		else puts("3");
	}
	return 0;
}
```

# E. Mahmoud and a xor trip

## 题意概述

给你一棵树，每个点有一个权值。
定义两个点之间的路径长度为所有经过的点的权值的异或和。
询问所有点对之间的长度和。

## 思路

按位拆分，然后稍微 dp 一下就行了。

## 代码

**C++**

```cpp
#include <bits/stdc++.h>
#define N 1000020
#define LG 22
#define ll long long
using namespace std;
inline int read(){
	int x=0,f=1;char ch=getchar();
	while(ch>'9'||ch<'0')ch=='-'&&(f=0)||(ch=getchar());
	while(ch<='9'&&ch>='0')x=(x<<3)+(x<<1)+ch-'0',ch=getchar();
	return f?x:-x;
}
int head[N/10], to[N/5], nxt[N/5], cnt;
void insert(int x, int y) {
	to[++cnt] = y; nxt[cnt] = head[x]; head[x] = cnt;
	to[++cnt] = x; nxt[cnt] = head[y]; head[y] = cnt;
}
bool a[N][LG];
int f[N][2], bit;
ll sum, ans;
void dfs(int x, int fa) {
	// printf("%d %d :: %d\n", x, fa, bit);
	int qwq = a[x][bit];
	f[x][qwq] = 1;
	for (int i = head[x]; i; i = nxt[i])
		if (to[i] != fa) {
			dfs(to[i], x);
			sum = sum + f[x][0] * f[to[i]][1] + f[to[i]][0] * f[x][1];
			f[x][1] += f[to[i]][1 ^ qwq];
			f[x][0] += f[to[i]][0 ^ qwq];
		}
}
int main(int argc, char const *argv[]) {
	int n = read();
	for (int i = 1; i <= n; i++) {
		int x = read();
		ans += x;
		for (int j = 0; j < LG; j++)
			a[i][j] = x >> j & 1;
	}
	for (int i = 1; i < n; i++)
		insert(read(), read());
	for (bit = 0; bit < LG; bit++) {
		memset(f, 0, sizeof f);
		sum = 0;
		dfs(1, 0);
		ans = ans + (sum << bit);
	}
	printf("%lld\n", ans);
	return 0;
}
```

# 总结

这场还算简单，没有不可做题。

下次做场难一点的吧。。。太水浪费时间。


