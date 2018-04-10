layout: post
title: 在命令行预览文件的小程序
date: 2017-05-09 09:44:36
categories: 颓废
---
# 背景
你有没有遇到过这种情况？
> 我只想查看一个文件的第一行，但是它太大了，打开它太慢了。

这时候就是本程序大展身手的好时机了。

# 使用方法
```cmd
LOOK [-L] [-N num] path 或者 LOOK -?
```
- `[-L]` 是否显示行号（可选）
- `[-N num]` 要显示的行数（默认999999）（可选）
- `path` 文件路径（必须）

把编译过的代码放到某个path路径里就可以用cmd玩了。



# 代码
```cpp
#include <bits/stdc++.h>
using namespace std;
int lin = 0;
int main(int argc, char const *argv[]){
	if(argc > 1)
	if(argv[1][0] == '-' || argv[1][0] == '/')
		if(argv[1][1] == '?')
			argc = 1;
	if(argc == 1){
		puts("Check a file.");
		puts("");
		puts("LOOK [-L] [-N num] [path]");
		puts("");
		puts("  -L         Show line-numbers or not.");
		puts("  -N [num]   Lines that you want to see.");
		puts("  path       The path of the file that you want to see.");
		return 0;
	}
	if(argv[1][0] == '-' || argv[1][0] == '/')
		if(argv[1][1] == 'l' || argv[1][1] == 'L')
			lin = 1;
	int maxline = 999999, fl = 0;
	if(argv[lin+1][0] == '-' || argv[lin+1][0] == '/')
		if(argv[lin+1][1] == 'n' || argv[lin+1][1] == 'N'){
			fl = 2;
			int len = strlen(argv[lin+2]), x = 0;
			for(int i = 0; i < len; i++)
				x = x*10+argv[lin+2][i]-'0';
			maxline = x;
		}
	string str;
	ifstream is;
	is.open(argv[lin+fl+1]);
	int a = 0;
	while(getline(is, str) && ++a <= maxline){
		if(lin) printf("%6d: ", a);
		puts(str.c_str());
	}
	if(a > maxline) puts("...");
	return 0;
}
```