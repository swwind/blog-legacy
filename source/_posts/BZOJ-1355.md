layout: post
title: 'BZOJ 1355: [Baltic2009]Radio Transmission'
date: 2017-03-14 13:54:04
tags: KMP
categories: 题解
---
题面
--------------
给你一个字符串，它是由某个字符串不断自我连接形成的。 但是这个字符串是不确定的，现在只想知道它的最短长度是多少。
Input
--------------
第一行给出字符串的长度,1 < L ≤ 1,000,000. 第二行给出一个字符串，全由小写字母组成。
Output
--------------
输出最短的长度
Simple Input
--------------
8
cabcabca

Simple Output
--------------
3
题解
--------------
KMP。。。ans = n - next[n]。。。
代码
--------------
```cpp
/**************************************************************
	Problem: 1355
	User: SHENZHEBEI // 没权限哎╮(╯▽╰)╭
	Language: C++
	Result: Accepted
	Time:24 ms
	Memory:6172 kb
****************************************************************/
 
#include <bits/stdc++.h>
#define ll long long
using namespace std;
char B[1000050];
int n, nxt[1000050];
int main(){
	scanf("%d%s", &n, B+1);
	for(int i = 2, j = 0; i <= n; i++){
		while(j && B[j+1] != B[i]) j = nxt[j];
		if(B[j+1] == B[i]) j++; nxt[i] = j;
	}
	printf("%d", n-nxt[n]);
	return 0;
}
﻿```