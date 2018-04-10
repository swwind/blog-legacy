layout: post
title: '教程: 用Sublime Text 3编译和运行C++程序'
date: 2017-03-24 14:58:03
tags: sublime
categories: 教程
---

前言
------------
咳咳，如果你dev用惯了，看他不爽，想换个IDE，那么推荐用Sublime Text这款软件。由于服务器在国外，所以下载可能会有点慢，所以提供一个百度网盘链接：[jvgp](http://pan.baidu.com/s/1i5tDUFb)。链接挂了跟我说。

安装编译器
------------
把 安装目录/mingwXX/bin/的路径加到环境变量里。
然后打开控制台输入`g++ --version`看看是否正常。

添加Build System
------------
打开Sublime Text，点击Tools -> Build System -> New Build System...，再把下面的东西复制进去

```json
{
	"cmd": ["g++", "${file}", "-o", "${file_path}/${file_base_name}", "-O2", "-std=c++11"],
	"file_regex": "^(..[^:]*):([0-9]+):?([0-9]+)?:?(.*)$",
	"working_dir": "${file_path}",
	"encoding": "utf-8",
	"selector": "source.c++",
	"variants":
	[
		{
			"name": "Run",
			"cmd": ["cmd", "/C", "start", "cmd", "/c", "${file_path}/${file_base_name}.exe &pause"]
		}
	]
}
```

接着保存为cpp.sublime-build，再点击Tools -> Build System -> CPP就完成啦。

使用说明
-----------
`Ctrl+Shift+B`打开菜单，选择cpp是编译，选择cpp-Run是运行（自带pause）
`Ctrl+B`重复上一操作

总结
-----------
貌似这个编辑器还可以安装各种强大的插件。。具体可以另找教程。

