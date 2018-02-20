layout: post
title: 'BZOJ 4236: JOIOJI'
date: 2017-04-12 15:46:46
tags: STL
categories: 题解
---
# 题面
JOIOJI桑是JOI君的叔叔。“JOIOJI”这个名字是由“J、O、I”三个字母各两个构成的。
最近，JOIOJI桑有了一个孩子。JOIOJI桑想让自己孩子的名字和自己一样由“J、O、I”三个字母构成，并且想让“J、O、I”三个字母的出现次数恰好相同。
JOIOJI桑家有一份祖传的卷轴，上面写着一首长诗，长度为N，由“J、O、I”三个字母组成。JOIOJIさん想用诗中最长的满足要求的连续子串作为孩子的名字。
现在JOIOJI桑将这首长诗交给了你，请你求出诗中最长的、包含同样数目的“J、O、I”三个字母的连续子串。

# Input
第一行一个正整数$N$，代表这首长诗的长度
接下来一行一个长度为$N$的字符串$S$，表示这首长诗，保证每个字符都是“J、O、I”三个字母中的一个


# Output
输出一行一个正整数，代表最长的包含等数量“J、O、I”三个字母的最长连续子串的长度。如果不存在这样的子串，输出$0$

# Sample Input
10
JOIIJOJOOI

# Sample Output
6

# HINT
选择“IIJOJO”这个子串，长度为6，包含“J、O、I”三个字母各2个，这是最长的满足要求的子串。
$1\leq N\leq 2\*10^5$

# 题解
听说可以用hash过。。
我这里直接用map水了2333

# 代码
```cpp
#include <bits/stdc++.h>
#define pii pair<int, int>
#define mk make_pair
#define N 200020
using namespace std;
int n, J, O, I, ans;
char s[N];
map<pii, int> mp;
int main(){
	// freopen("name.in", "r", stdin);
	// freopen("name.out", "w", stdout);
	scanf("%d%s", &n, s+1);
	for(int i = 1; i <= n; i++){
		if(s[i] == 'J') J++;
		if(s[i] == 'O') O++;
		if(s[i] == 'I') I++;
		pii tmp = mk(J-O, O-I);
		if(!mp[tmp]) mp[tmp] = i;
		else ans = max(ans, i-mp[tmp]);
	}
	if(J==O&&O==I) ans = n;
	printf("%d\n", ans);
	return 0;
}
```