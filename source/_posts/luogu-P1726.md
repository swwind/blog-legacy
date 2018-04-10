---
layout: post
title: 洛谷 P1726 上白泽慧音
date: 2017-09-18 20:02:30
tags: tarjan
categories: 题解
---

# 题面

在幻想乡，上白泽慧音是以知识渊博闻名的老师。春雪异变导致人间之里的很多道路都被大雪堵塞，使有的学生不能顺利地到达慧音所在的村庄。因此慧音决定换一个能够聚集最多人数的村庄作为新的教学地点。人间之里由N个村庄（编号为$1...N$）和$M$条道路组成，道路分为两种一种为单向通行（~~一方通行~~）的，一种为双向通行的，分别用$1$和$2$来标记。如果存在由村庄$A$到达村庄$B$的通路，那么我们认为可以从村庄$A$到达村庄$B$，记为$(A,B)$。当$(A,B)$和$(B,A)$同时满足时，我们认为$A$，$B$是絶対连通的，记为$&lt;A,B&gt;$。絶対连通区域是指一个村庄的集合，在这个集合中任意两个村庄$X$,$Y$都满足$&lt;X,Y&gt;$。现在你的任务是，找出最大的絶対连通区域，并将这个絶対连通区域的村庄按编号依次输出。若存在两个最大的，输出字典序最小的，比如当存在$1,3,4$和$2,5,6$这两个最大连通区域时，输出的是$1,3,4$。

# Input

第$1$行：两个正整数$N,M$
第$2...M+1$行：每行三个正整数$a,b,t$，$t = 1$表示存在从村庄$a$到$b$的单向道路，$t = 2$表示村庄$a,b$之间存在双向通行的道路。保证每条道路只出现一次。


# Output

第$1$行：$1$个整数，表示最大的絶対连通区域包含的村庄个数。
第$2$行：若干个整数，依次输出最大的絶対连通区域所包含的村庄编号。

# Sample Input

5 5
1 2 1
1 3 2
2 4 2
5 1 2
3 5 1

# Sample Output

3
1 3 5

# 样例说明

对于$60\%$的数据：$N \leq 200$且$M \leq 10,000$
对于$100\%$的数据：$N \leq 5,000$且$M \leq 50,000$

# 题解

我发誓这是我最后一次抄Tarjan的模板了。<span class="hide">~~flag~~</span>
~~话说上白沢慧音是谁啊~~

# 代码

```cpp
#include <bits/stdc++.h>
#define N 100020
#define ll long long
using namespace std;
inline int read(){
	int x=0,f=1;char ch=getchar();
	while(ch>'9'||ch<'0')ch=='-'&&(f=0)||(ch=getchar());
	while(ch<='9'&&ch>='0')x=(x<<3)+(x<<1)+ch-'0',ch=getchar();
	return f?x:-x;
}
int head[N], nxt[N<<1], to[N<<1], cnt;
void ins(int x, int y) {
	to[++cnt] = y; nxt[cnt] = head[x]; head[x] = cnt;
}
int dfn[N], low[N], tot, blo[N], bnt, que[N], qnt, sz[N];
void tarjan(int x) {
	dfn[x] = low[x] = ++tot;
	que[++qnt] = x;
	for (int i = head[x]; i; i = nxt[i])
		if (!dfn[to[i]]) tarjan(to[i]), low[x] = min(low[x], low[to[i]]);
		else if (!blo[to[i]]) low[x] = min(low[x], dfn[to[i]]);
	if (low[x] == dfn[x] && ++bnt)
		while (que[qnt+1] != x)
			blo[que[qnt--]] = bnt, sz[bnt]++;
}
int main(int argc, char const *argv[]) {
	int n = read(), m = read();
	for (int i = 1; i <= m; i++) {
		int x = read(), y = read(), op = read();
		if (op == 2) ins(x, y), ins(y, x);
		else ins(x, y);
	}
	for (int i = 1; i <= n; i++)
		if (!dfn[i]) tarjan(i);
	int mx = 0;
	for (int i = 1; i <= n; i++)
		if (sz[blo[i]] > sz[mx]) mx = blo[i];
	printf("%d\n", sz[mx]);
	for (int i = 1; i <= n; i++)
		if (blo[i] == mx) printf("%d ", i);
	puts("");
	return 0;
}
```