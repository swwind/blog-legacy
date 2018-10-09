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
没有学过 javascript 的同学可以使用下面我已经写好了的。
~~其实绝大部分主题都有自带~~

```javascript
window.requestReadTimes = (appId, appKey, res) => {
  if (!appId || !appKey) return console.error('ReadCounter: Check your appid and appkey!');
  var page_path = encodeURI(decodeURI(window.location.pathname)).replace(/index\.html?$/,"")

  // prepare
  if (!AV) return console.error('Error: Can not find object "AV".');
  var el = document.querySelector(res);
  if (!el) return;
  el.innerHTML = '?';
  if (!AV.applicationId && !AV.applicationKey)
    AV.init(appId, appKey);
  // work
  var query = new AV.Query('Counter');
  var ReadCount = AV.Object.extend('Counter');
  query.equalTo('link', page_path);
  query.find().then(todo => {
    let obj = todo[0] || new ReadCount({link: page_path, value: 0});
    obj.increment('value');
    return obj.save()
  }).then(obj => {
    el.innerHTML = obj.get('value');
  }).catch(err => {
    console.error('Failed to save read times, with error message: ' + err.message);
  });
}
```

但是你会发现 IE11 不资瓷 Primise 和 ES6 呢。
那怎么办办呢？
我们可不能轻易的放弃支持 IE 的梦想。<span class="truth" title="你知道的太多了">然而我已经放弃了</span>
你只需要一个类似 Bluebird 的 Primise 仓库，并且使用 Babel 来转译就可以了。


