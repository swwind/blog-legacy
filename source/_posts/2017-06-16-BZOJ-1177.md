layout: post
title: 'BZOJ 1177: [Apio2009]Oil'
date: 2017-06-16 08:43:06
tags: dp
categories: 题解
---
# 题面
采油区域 Siruseri政府决定将石油资源丰富的Navalur省的土地拍卖给私人承包商以建立油井。被拍卖的整块土地为一个矩形区域，被划分为M×N个小块。 Siruseri地质调查局有关于Navalur土地石油储量的估测数据。这些数据表示为M×N个非负整数，即对每一小块土地石油储量的估计值。 为了避免出现垄断，政府规定每一个承包商只能承包一个由K×K块相连的土地构成的正方形区域。 AoE石油联合公司由三个承包商组成，他们想选择三块互不相交的K×K的区域使得总的收益最大。 例如，假设石油储量的估计值如下：

```text
1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1
1 8 8 8 8 8 1 1 1
1 8 8 8 8 8 1 1 1
1 8 8 8 8 8 1 1 1
1 1 1 1 8 8 8 1 1
1 1 1 1 1 1 8 8 8
1 1 1 1 1 1 9 9 9
1 1 1 1 1 1 9 9 9
```

如果K = 2, AoE公司可以承包的区域的石油储量总和为100, 如果K = 3, AoE公司可以承包的区域的石油储量总和为208。 AoE公司雇佣你来写一个程序，帮助计算出他们可以承包的区域的石油储量之和的最大值。


# Input
输入第一行包含三个整数M, N, K，其中M和N是矩形区域的行数和列数，K是每一个承包商承包的正方形的大小（边长的块数）。接下来M行，每行有N个非负整数表示这一行每一小块土地的石油储量的估计值

# Output
输出只包含一个整数，表示AoE公司可以承包的区域的石油储量之和的最大值。

# Sample Input
9 9 3
1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1
1 8 8 8 8 8 1 1 1
1 8 8 8 8 8 1 1 1
1 8 8 8 8 8 1 1 1
1 1 1 1 8 8 8 1 1
1 1 1 1 1 1 8 8 8
1 1 1 1 1 1 9 9 9
1 1 1 1 1 1 9 9 9

# Sample Output
208

# 题解
很裸的dp。
预先处理好以(i,j)为左上角、右上角、左下角、右下角时整块区域中k*k的最大值以及每行每列的最大值。
接着分为六种情况暴力枚举就好了。
强迫症的我愣是把他们画了出来。^ω^
```
+---+---+---+  +-----------+  +---+-------+
|   |   |   |  |           |  |   |       |
|   |   |   |  +-----------+  |   |       |
|   |   |   |  |           |  |   +-------+
|   |   |   |  +-----------+  |   |       |
|   |   |   |  |           |  |   |       |
+---+---+---+  +-----------+  +---+-------+

+-------+---+  +-----+-----+  +-----------+
|       |   |  |     |     |  |           |
|       |   |  |     |     |  +-----+-----+
+-------+   |  |     |     |  |     |     |
|       |   |  +-----+-----+  |     |     |
|       |   |  |           |  |     |     |
+-------+---+  +-----------+  +-----+-----+
```
**这题读入优化会RE！读入优化会RE！读入优化会RE！**
~~垃圾题目降我AC率~~

# 代码
```cpp
#include <bits/stdc++.h>
#define N 1505
#define ll long long
using namespace std;
inline int read(){
	int x; scanf("%d", &x); return x;
	// int x=0,f=0;char ch=getchar();
	// while(ch>'9'||ch<'0'){if(ch=='-')f=1;ch=getchar();}
	// while(ch<='9'&&ch>='0'){x=(x<<3)+(x<<1)+ch-'0';ch=getchar();}
	// return f?-x:x;
}
int sum[N][N], tr[N][N], a[N][N], b[N][N], c[N][N], d[N][N], h[N], l[N], ans;
int max(int a, int b, int c){return max(max(a, b), c);}
int main(){
	int n = read(), m = read(), k = read();
	for(int i = 1; i <= n; i++)
		for(int j = 1; j <= m; j++)
			sum[i][j] = read()+sum[i][j-1]+sum[i-1][j]-sum[i-1][j-1];
	for(int i = k; i <= n; i++)
		for(int j = k; j <= m; j++){
			tr[i][j] = sum[i][j]-sum[i][j-k]-sum[i-k][j]+sum[i-k][j-k];
			h[i] = max(h[i], tr[i][j]); l[j] = max(l[j], tr[i][j]);
		}
	for(int i = k; i <= n; i++)
		for(int j = k; j <= m; j++)
			a[i][j] = max(a[i-1][j], a[i][j-1], tr[i][j]);
	for(int i = k; i <= n; i++)
		for(int j = m-k+1; j; j--)
			b[i][j] = max(b[i-1][j], b[i][j+1], tr[i][j+k-1]);
	for(int i = n-k+1; i; i--)
		for(int j = k; j <= m; j++)
			c[i][j] = max(c[i+1][j], c[i][j-1], tr[i+k-1][j]);
	for(int i = n-k+1; i; i--)
		for(int j = m-k+1; j; j--)
			d[i][j] = max(d[i+1][j], d[i][j+1], tr[i+k-1][j+k-1]);
	for(int i = k; i <= n-k; i++)
		for(int j = k; j <= m-k; j++){
			ans = max(ans, a[i][m]+c[i+1][j]+d[i+1][j+1]);
			ans = max(ans, c[i+1][m]+b[i][j+1]+a[i][j]);
			ans = max(ans, a[n][j]+b[i][j+1]+d[i+1][j+1]);
			ans = max(ans, b[n][j+1]+a[i][j]+c[i+1][j]);
		}
	for(int i = k; i <= n-k*2; i++)
		for(int j = i+k; j <= n-k; j++)
			ans = max(ans, b[i][1]+h[j]+d[j+1][1]);
	for(int i = k; i <= m-k*2; i++)
		for(int j = i+k; j <= m-k; j++)
			ans = max(ans, c[1][i]+l[j]+d[1][j+1]);
	printf("%d\n", ans);
	return 0;
}
```