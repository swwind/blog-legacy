layout: post
title: 'BZOJ 1004: [HNOI2008]Cards'
date: 2017-06-02 09:14:15
tags: 瞎搞
categories: 题解
---
# 题面
小春现在很清闲，面对书桌上的N张牌，他决定给每张染色，目前小春只有3种颜色：红色，蓝色，绿色。他询问Sun有多少种染色方案，Sun很快就给出了答案。进一步，小春要求染出Sr张红色，Sb张蓝色，Sg张绝色。他又询问有多少种方案，Sun想了一下，又给出了正确答案。最后小春发明了M种不同的洗牌法，这里他又问Sun有多少种不同的染色方案。两种染色方法相同当且仅当其中一种可以通过任意的洗牌法(即可以使用多种洗牌法，而每种方法可以使用多次)洗成另一种。Sun发现这个问题有点难度，决定交给你，答案可能很大，只要求出答案除以P的余数(P为质数)。

# Input
第一行输入 5 个整数：$S_r,S_b,S_g,m,p(m\leq 60,m+1\lt p\lt 100),n=S_r+S_b+S_g$。接下来 m 行，每行描述一种洗牌法，每行有 n 个用空格隔开的整数 X1 X2 ... Xn，恰为 1 到 n 的一个排列，表示使用这种洗牌法，第 i 位变为原来的 Xi 位的牌。输入数据保证任意多次洗牌都可用这 m 种洗牌法中的一种代替，且对每种洗牌法，都存在一种洗牌法使得能回到原状态。


# Output
不同染法除以P的余数

# Sample Input
1 1 1 2 7
2 3 1
3 1 2

# Sample Output
2

# HINT
有2 种本质上不同的染色法RGB 和RBG，使用洗牌法231 一次可得GBR 和BGR，使用洗牌法312 一次 可得BRG和GRB。
100%数据满足$Max\{Sr,Sb,Sg\}\leq 20$。

# 题解
$$
ans=\frac{n!}{Sr!\*Sb!\*Sg!\*(m+1)}\pmod p
$$
似乎和后面的东西没多大关系。。
~~别问我怎么知道的~~
0ms完美AC

# 代码
```cpp
#include <bits/stdc++.h>
using namespace std;
inline int read(){
	int x=0,f=0;char ch=getchar();
	while(ch>'9'||ch<'0'){if(ch=='-')f=1;ch=getchar();}
	while(ch<='9'&&ch>='0'){x=(x<<3)+(x<<1)+ch-'0';ch=getchar();}
	return f?-x:x;
}
int frav[202], p;
int inv(int a, int b = p-2){
	int c = 1;
	for(;b;b/=2,a=a*a%p)if(b&1)c=c*a%p;
	return c;
}
int main(){
	int r = read(), b = read(), g = read(), m = read(); p = read();
	frav[0] = 1;
	for(int i = 1; i <= 200; i++) frav[i] = frav[i-1]*i%p;
	int n = r+b+g;
	int ans = frav[n]*inv(frav[r])*inv(frav[b])*inv(frav[g])*inv(m+1)%p;
	printf("%d\n", ans);
}
```