---
title: 计划对 Valine 评论系统做的一些更改
date: 2018-06-16 20:03:53
tags: valine
categories: 颓废
---

[Valine 评论系统](https://github.com/xCss/Valine) 本人用了已经有好久了。

近期觉得有些地方可以进行适当的更改。

## 用户记录

Valine 原本是使用 localStore 来储存 username、email 和 link 的。

并且每次新填写的时候都会在 leancloud 上面使用邮箱注册一个账户。（用于回复提醒，下面会解释

这样会造成一个非常不好的问题：**冒充用户**。

于是我觉得可以做一个简单的用户注册和登录的系统，基于 leancloud 原生的用户 API。

但是考虑到受众面，一般人都懒得在一个无名小站注册。

如果我强制需要登录才能评论的话，很对人就会把说到嘴边的话塞回去。

如果我开放匿名评论的话，估计大家也都懒得注册了。

所以我现在是进退两难。

如果您有什么建议的话，请告诉我。
十分感谢！

![password-joke](/img/password-joke.jpg)
*图源：[Telegram@programmerhumor][phumor]*

## 回复提醒

Valine 是采用 leancloud 的通过邮箱找回密码功能发送回复提醒邮件的。

显然在技术方面是无法发送具体回复页面的 url 的。

这样的话这个提醒功能就显得非常鸡肋。

我的解决办法是：使用脚本自动扫描评论并向被回复者发送邮件。

显然这个办法也是太 naive 了。

于是我又陷入了挣扎当中。

![email-joke](/img/email-joke.jpg)
*图源：[Telegram@programmerhumor][phumor]*

赶紧来个人给我提个建议啊啊啊啊

[phumor]: https://t.me/programmerhumor


