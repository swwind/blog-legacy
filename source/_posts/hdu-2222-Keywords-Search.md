layout: post
title: hdu 2222 Keywords Search
date: 2017-03-16 11:04:14
tags: AC自动机
categories: 题解
---

题面
----------------
给你一堆子串，要你求在母串里找有多少个子串出现过，多组数据。

Simple Input
----------------
1
5
she
he
say
shr
her
yasherhs

Simple Output
----------------
3


题解
----------------
AC自动机。。。
不明白网上一堆人为毛要用指针动态开点
听说这样跑得快？
但我还是打了非指针型的O(n<sup>2</sup>)，指针的太复杂回头再研究
~~照抄hzwer的竟然还调了一个上午~~

代码
----------------
```cpp
#include <bits/stdc++.h>
using namespace std;
char ch[60];
char key[1000020];
int T, n, sz, ans;
int son[1000020][26], mark[1000020], fail[1000020], q[1000020], vis[1000020];
int main(){
	scanf("%d", &T);
	while(T--){
		scanf("%d", &n); ans = 0; sz = 1;
		for(int i = 0; i < 26; i++) son[0][i] = 1;
		// 建Trie
		for(int i = 1; i <= n; i++){
			scanf("%s", ch);
			int len = strlen(ch), rt = 1;
			for(int j = 0, k = ch[0]-'a'; j < len; k = ch[++j]-'a')
				if(!son[rt][k]) rt = son[rt][k] = ++sz;
				else rt = son[rt][k];
			mark[rt]++;
		}
		// 求fail
		int h = 1, t = 0, now;
		q[0] = 1; fail[1] = 0;
		while(t < h){
			now = q[t++];
			for(int i = 0; i < 26; i++){
				if(!son[now][i]) continue;
				int tmp = fail[now];
				while(!son[tmp][i]) tmp = fail[tmp];
				fail[son[now][i]] = son[tmp][i];
				q[h++] = son[now][i];
			}
		}
		scanf("%s", key);
		// 求解
		int rt = 1, len = strlen(key);
		for(int i = 0, k = key[0]-'a'; i < len; k = key[++i]-'a'){
			vis[rt] = 1;
			while(!son[rt][k]) rt = fail[rt];
			rt = son[rt][k];
			if(!vis[rt])
				for(int j = rt; j; j = fail[j])
					ans += mark[j],
					mark[j] = 0;
		}
		printf("%d\n", ans);
		// 听说这样比memset快、、、
		for(int i = 1; i <= sz; i++){
			fail[i] = mark[i] = vis[i] = 0;
			for(int j = 0; j < 26; j++)
				son[i][j] = 0;
		}
	}
	return 0;
}
```