layout: post
title: codevs 1204 寻找子串位置
date: 2017-03-14 14:29:25
tags: KMP
categories: 题解
---
题面
---------------
给出字符串a和字符串b，保证b是a的一个子串，请你输出b在a中第一次出现的位置。
Simple Input
---------------
abcd bc
Simple Output
---------------
2
题解
---------------
范围才100...暴力都能过吧= =
标算是KMP匹配，和暴力一样的0ms

代码
---------------
```cpp
#include <bits/stdc++.h>
#define ll long long
using namespace std;
char A[120], B[120];
int nxt[120];
int main(){
	scanf("%s%s", A+1, B+1);
	int n = strlen(A+1), m = strlen(B+1);
	for(int i = 2, j = 0; i <= m; i++){
		while(j && B[j+1] != B[i]) j = nxt[j];
		if(B[j+1] == B[i]) j++; nxt[i] = j;
	}
	for(int i = 1, j = 0; i <= n; i++){
		while(j && A[i] != B[j+1]) j = nxt[j];
		if(A[i] == B[j+1]) j++;
		if(j == m) return printf("%d\n", i-m+1)&0;
	}
}
```