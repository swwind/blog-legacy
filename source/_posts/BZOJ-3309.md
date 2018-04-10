layout: post
title: 'BZOJ 3309: DZY Loves Math'
date: 2017-04-13 09:21:30
tags: 数论
categories: 题解
---
# 题面
对于正整数$n$，定义$f(n)$为$n$所含质因子的最大幂指数。例如$f(1960)=f(2^3\*5^1\*7^2)=3$，$f(10007)=1$，$f(1)=0$。
给定正整数a、b，求$\sum\_{i=1}^{a}{\sum\_{j=1}^{b}{f(gcd(i,j))}}$

# Input
第一行一个数$T$，表示询问数。
接下来$T$行，每行两个数$a,b$，表示一个询问。

# Output
对于每一个询问，输出一行一个非负整数作为回答。


# Sample Input
4
7558588 9653114
6514903 4451211
7425644 1189442
6335198 4957

# Sample Output
35793453939901
14225956593420
4332838845846
15400094813

# HINT
【数据规模】
T<=10000
1<=a,b<=10^7

# 题解
一眼就能看出来：
先枚举gcd
然后、、然后就又不会了
看题解吧。。
看到题解又跪了。。<a href="http://blog.csdn.net/popoqqq/article/details/42122413">orz PoPoQQQ</a>
$$
\begin{align}
ans
&=\sum_{i=1}^{a}{\sum_{j=1}^{b}{f(gcd(i,j))}} \\
&=\sum_{d=1}^{min(a,b)}{f(d)\sum_{k=1}^{min(\left\lfloor \frac{a}{d} \right\rfloor,\left\lfloor\frac{b}{d}\right\rfloor)}{\mu(k)\left\lfloor\frac{a}{kd}\right\rfloor\left\lfloor\frac{b}{kd}\right\rfloor}} \\
&=\sum_{T=1}^{min(a,b)}{\left\lfloor\frac{a}{T}\right\rfloor\left\lfloor\frac{b}{T}\right\rfloor\sum_{d|T}{f(d)\mu(\frac{T}{d})}}
\end{align}
$$
现在我们只需要知道$\sum_{d|T}{f(d)\mu(\frac{T}{d})}$的前缀和就行了 设这个函数为$g(x)$
观察这个函数 由于含平方因子数的$\mu$值都为零，因此我们只考虑$\mu(\frac{T}{d})\neq0$的数
令$T=p_1^{a_1}p_2^{a_2}...p_k^{a_k}$，$d=p_1^{b_1}p_2^{b_2}...p_k^{b_k}$那么$0\le(ai-bi)\le1$
如果存在$a_i\neq a_j(i\neq j)$，那么我们可以将所有的$a$分为两部分：最大的$a$的集合$A$和非最大$a$的集合$B$
很显然$f$值由$A$中的选取方案决定
对于$A$中的每种选取方案，$\mu$值决定于总选择的数量的奇偶性
在集合$B$中选取奇数个元素和偶数个元素的方案数是相等的，故对于$A$中的每种选取方案，得到的和都是$0$
故如果存在$a_i\neq a_j(i\neq j)$，则$g(T)=0$
反之，如果所有的$a$值都相等，我们假设对于任意选取方案，$f$值都不变
那么由于选取奇数个元素和偶数个元素的方案数相等，和仍然为$0$
但是有一种选取方案的$f$值$=a-1$ 因此我们要将这个$1$减掉
考虑到$\mu$的符号之后，最终结果为$(-1)^{k+1}$
故如果不存在$a_i\neq a_j$，则$g(T)=(-1)^{k+1}$
不知道说明白了没有。。。（显然没有）
求出$g$函数的方法是线性筛 对于每个值记录$g$值和最小质因数的次数 具体细节见代码
别忘了开long long

# 代码
```cpp
#include <bits/stdc++.h>
#define N 10000020
#define ll long long
using namespace std;
ll _a[N], _p[N], _g[N];
int pri[N], cnt;
bool mark[N];
ll calc(ll a, ll b){
	if(a > b) swap(a, b);
	ll ans = 0;
	for(int i = 1, last; i <= a; i = last+1){
		last = min(a/(a/i), b/(b/i));
		ans += (a/i)*(b/i)*(_g[last]-_g[i-1]);
	}
	return ans;
}
int main(){
	for(int i = 2; i < N; i++){
		if(!mark[i]){pri[++cnt] = _p[i] = i; _a[i] = _g[i] = 1;}
		for(int j = 1; j <= cnt && pri[j]*i < N; j++){
			mark[pri[j]*i] = 1;
			if(i%pri[j]==0){
				_a[pri[j]*i] = _a[i]+1;
				_p[pri[j]*i] = _p[i]*pri[j];
				ll tmp = i/_p[i];
				if(tmp == 1) _g[pri[j]*i] = 1;
				else _g[pri[j]*i] = (_a[tmp]==_a[pri[j]*i]?-_g[tmp]:0);
				break;
			}
			_a[pri[j]*i] = 1;
			_p[pri[j]*i] = pri[j];
			_g[pri[j]*i] = (_a[i]==1?-_g[i]:0);
		}
	}
	for(int i = 1; i < N; i++)
		_g[i] += _g[i-1];
	int T; scanf("%d", &T);
	while(T--){
		ll a, b;
		scanf("%lld%lld", &a, &b);
		printf("%lld\n", calc(a, b));
	}
}
```