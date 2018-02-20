---
title: Hexo 借助 LeanCloud 实现统计文章阅读次数功能
date: 2017-10-27 19:40:45
tags: [hexo, leancloud]
categories: 颓废
desc: 瞎折腾博客
---

# 前言

偶然想要在博客里加一个统计阅读次数的东西。
首先可以想到的是用 php 来储存阅读次数。
但是事实上 github pages 和 coding pages 并不会让你跑 php（你有钱除外）。
所以只能另寻他路。

当我在开始使用 [Valine](https://github.com/xCss/Valine) 的时候接触到了 [LeanCloud](https://leancloud.cn)。
经过查找资料后，得知 LeanCloud 是一家 BaaS 提供商。

关于 BaaS 的定义，我直接贴 wiki 了：

> Mobile backend as a service (MBaaS), also known as "backend as a service" (BaaS), is a model for providing web app and mobile app developers with a way to link their applications to backend cloud storage and APIs exposed by back end applications while also providing features such as user management, push notifications, and integration with social networking services. These services are provided via the use of custom software development kits (SDKs) and application programming interfaces (APIs). BaaS is a relatively recent development in cloud computing, with most BaaS startups dating from 2011 or later. Although a fairly nascent industry, trends indicate that these services are gaining mainstream traction with enterprise consumers.
> <span class="speaker">[Wikipedia](https://en.wikipedia.org/wiki/Mobile_backend_as_a_service)</span>

一句话解释，就是一个在线的数据库。
LeanCloud 的免费版每月有请求数量的限制（30,000次/天），但是作为统计阅读次数来用的话肯定够用了。

# 阅读文档

经过我大致的浏览后，整理出来以下几个可能用的到的东西。

## 初始化

链接：https://leancloud.cn/docs/sdk_setup-js.html#初始化

```javascript
var APP_ID = '*********************************';
var APP_KEY = '************************';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});
```

## 保存

链接：https://leancloud.cn/docs/leanstorage_guide-js.html#保存对象

```javascript
// 声明类型
var Todo = AV.Object.extend('Todo');
// 新建对象
var todo = new Todo();
// 设置名称
todo.set('name', '工作');
// 设置优先级
todo.set('priority', 1);
todo.save().then(function (todo) {
  console.log('objectId is ' + todo.id);
}, function (error) {
  console.error(error);
});
```

## 询问

链接：https://leancloud.cn/docs/leanstorage_guide-js.html#比较查询

```javascript
var query = new AV.Query('Todo');
query.equalTo('priority', 1);
query.find().then(function (results) {
  // do something...
}, function (error) {
  console.error(error);
});
```

# 综合

有了以上三个样例就可以开发了。
想要锻炼一下自己的同学可以尝试自己写一个出来。
没有学过 javascript 的同学使用下面我已经写好的。
关于如何获取 App ID 和 App Key，请参阅 [这篇文章](https://valine.js.org/#/quickstart?id=获取appid和appkey)。

```javascript
// 三个参数：
// app_id: 就是 LeanCloud 应用中提供的 App ID
// app_key: 同上
// res_id: 表示阅读次数的元素的 id，如果元素不存在就不进行询问。
var request_read_times = function (app_id, app_key, res_id) {
	if (!app_id || !app_key) return console.error('Read_Counter: Check your appid and appkey!');
	var page_path = window.location.pathname.replace(/index\.(html|htm)$/,"")

	try {
		if (!AV) return console.error('Can not find object "AV".');
		var res_element = document.getElementById(res_id);
		if (!res_element) return;
		res_element.innerHTML = '?';
		try {
			AV.init({
				appId: app_id,
				appKey: app_key
			});
		} catch (e) {
		}
		var query = new AV.Query('Read_Count');
		var Read_Count = AV.Object.extend('Read_Count');
		query.equalTo('link', page_path);
		query.find().then(function (todo) {
			if (!todo.length) {
				res_element.innerHTML = '1';
				todo = [new Read_Count()];
				todo[0].set('link', page_path);
				todo[0].set('value', 1);
				show('您是第一位访问该文章的用户！')
			} else {
				res_element.innerHTML = todo[0].attributes.value + 1;
				todo[0].set('value', todo[0].attributes.value + 1);
			}
			todo[0].save().then(function (todo) {
			}, function (error) {
				console.error('Failed to load read times, with error message: ' + error.message);
			});
		}, function (error) {
			res_element.innerHTML = '1';
			var todo = new Read_Count();
			todo.set('link', page_path);
			todo.set('value', 1);
			todo.save().then(function () {
				show('您是第一位访问该文章的用户！')
			}, function () {
				console.error('Initialize failed');
			})
		});
	} catch (e) {
		console.error('Read_Counter: Check your appid and appkey!')
	}
}
```

