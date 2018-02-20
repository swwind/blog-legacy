layout: post
title: 'BZOJ 1656: [Usaco2006 Jan] The Grove 树木'
date: 2017-03-28 09:55:05
tags: bfs
categories: 题解
---
题面
--------------
The pasture contains a small, contiguous grove of trees that has no 'holes' in the middle of the it. Bessie wonders: how far is it to walk around that grove and get back to my starting position? She's just sure there is a way to do it by going from her start location to successive locations by walking horizontally, vertically, or diagonally and counting each move as a single step. Just looking at it, she doesn't think you could pass 'through' the grove on a tricky diagonal. Your job is to calculate the minimum number of steps she must take. Happily, Bessie lives on a simple world where the pasture is represented by a grid with R rows and C columns (1 <= R <= 50, 1 <= C <= 50). Here's a typical example where '.' is pasture (which Bessie may traverse), 'X' is the grove of trees, '\*' represents Bessie's start and end position, and '+' marks one shortest path she can walk to circumnavigate the grove (i.e., the answer): ...+... ..+X+.. .+XXX+. ..+XXX+ ..+X..+ ...+++\* The path shown is not the only possible shortest path; Bessie might have taken a diagonal step from her start position and achieved a similar length solution. Bessie is happy that she's starting 'outside' the grove instead of in a sort of 'harbor' that could complicate finding the best path.
牧场里有一片树林，林子里没有坑。
贝茜很想知道，最少需要多少步能围绕树林走一圈，最后回到起点。她能上下左右走，也能走对角线格子。牧场被分成R行C列(1≤R≤50，1≤C≤50)。下面是一张样例的地图，其中“．”表示贝茜可以走的空地，  “X”表示树林，  “\*”表示起点．而贝茜走的最近的路已经特别地用“+”表示出来。

<img src="http://www.lydsy.com/JudgeOnline/upload/201401/11(5).jpg"/>
题目保证，最短的路径一定可以找到。
Input
---------------
* Line 1: Two space-separated integers: R and C
* Lines 2..R+1: Line i+1 describes row i with C characters (with no spaces between them).

第1行输入R和C，接下来R行C列表示一张地图．地图中的符号如题干所述．
Output
---------------
* Line 1: The single line contains a single integer which is the smallest number of steps required to circumnavigate the grove.
输出最少的步数．

Sample Input
---------------
6 7
.......
...X...
..XXX..
...XXX.
...X...
......*
Sample Output
---------------
13
题解
---------------
可以随机选一棵树，向下画一条射线，然后在bfs的时候强制不越过该射线，最后统计一下射线左右的值即可。
一遍过2333、、、
代码
---------------
```cpp
#include <bits/stdc++.h>
using namespace std;
int n, m, mp[60][60], sx, sy;
int a[8]={0, 1, 1, 1, 0,-1,-1,-1};
int b[8]={1, 1,-1, 0,-1, 0, 1,-1};
struct node{
	node(){}
	node(int a, int b):x(a),y(b){}
	int x, y;
};
queue<node> q;
int main(){
	scanf("%d%d", &n, &m);
	char ch = getchar();
	for(int i = 1; i <= n; i++, ch=getchar())
		for(int j = 1; j <= m; j++){
			mp[i][j] = getchar();
			if(mp[i][j] == '.') mp[i][j] = 0;
			else if(mp[i][j] == 'X') mp[i][j] = -1;
			else if(mp[i][j] == '*') mp[sx=i][sy=j] = 0;
		}
	int x = rand()%n+1, y = rand()%m+1;
	while(mp[x][y]!=-1)
		x = rand()%n+1, y = rand()%m+1;
	int yy = y*2+1;
	q.push(node(sx, sy));
	while(!q.empty()){
		node t = q.front(); q.pop();
		for(int i = 0; i < 8; i++){
			if(t.x+a[i] && t.x+a[i]<=n && t.y+b[i] && t.y+b[i]<=m
					&& mp[t.x+a[i]][t.y+b[i]]==0 && (t.y*2+b[i]!=yy || t.x>x)){
				mp[t.x+a[i]][t.y+b[i]] = mp[t.x][t.y]+1;
				q.push(node(t.x+a[i], t.y+b[i]));
			}
		}
	}
	int ans = 1<<30;
	for(int i = x; i; i--) if(mp[i][y]>0)
		for(int j = -1; j < 2; j++)
			if(mp[i+j][y+1]>0) ans = min(ans, mp[i][y]+mp[i+j][y+1]);
	printf("%d\n", ans+1);
}
```