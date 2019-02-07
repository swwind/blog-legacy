---
title: 自己写一个 lightdm 主题
date: 2019-02-08 02:13:58
tags: lightdm
categories: 教程
---

lightdm 是一个非常好用的 desktop manager，其中有一个插件 lightdm-webkit2-greeter 使得你可以用 HTML 自定义登录界面。

哇，这不是吊炸天。

_本文内容均在 Arch Linux 下测试有效_

# 安装 lightdm

```bash
sudo pacman -S lightdm lightdm-webkit2-greeter

sudo vim /etc/lightdm/lightdm.conf
#=> greeter-session=lightdm-webkit2-greeter

sudo systemctl enable lightdm.service
# 同时 disable 掉其他 DM
```

重启，确保 lightdm 工作正常。

如果 lightdm 崩了，切 tty 即可改回原来的 DM。

如果工作正常，那么就可以开始写主题啦\~\\(≧▽≦)/~。

# 写主题

首先我们创建一个文件夹，命名为主题的名字，比如叫做 `ass-we-can`。

进入这个文件夹，创建一个 `index.theme` 文件，写入以下内容（根据需要魔改）：

```conf
[theme]
name=ass-we-can
description=Deek Dark Fantasy
engine=lightdm-webkit-greeter
url=index.html
```

接着我们创建一个 `index.html` 文件，这将会在登录的时候自动加载。

自动加载的时候会在全局中定义一个 `lightdm` 对象，该对象保存了登录的选项和 API。

可以导入[这个脚本](https://github.com/swwind/lightdm-theme-gradient/blob/master/assets/js/mock.js)来生成该对象来模拟登录，以便在浏览器中预览和调试。

简单看一下上面的脚本就可以知道一些重要的数据的保存方法，这里不再赘述。

讲讲登录的流程。

> 下文中 `user` 指 `lightdm.users[]` 中选中的一项。
> `session`、`language` 同理。

**第一步**

调用 `lightdm.start_authentication(user.name)` 开始认证用户 `user`。

**第二步**

认证用户时，调用 `lightdm.provide_secret(password)` 确认用户密码：

- 无论密码是否正确，都将调用全局中的 `authentication_complete` 函数作为回调函数；
- 如果密码正确，`lightdm.is_authenticated` 将会是 `true`，这时候调用 `lightdm.login(lightdm.authentication_user, session.key)` 即可以该用户身份登录 `session`。
- 如果密码错误，`lightdm.is_authenticated` 将会是 `false`。

如果要再次输入密码或者切换用户，必须使用 `lightdm.cancel_authentication()` 取消当前用户的认证，之后才能回到第一步重新认证。

<span class="truth" title="你知道的太多了">language 应该用在哪边我不知道。。。</span>
<span class="truth" title="你知道的太多了">不选好像也没什么问题。。</span>

**记住密码/记住选择**

直接用 `localStorage` 保存即可，记住不要保存之后马上 `login`，这样可能会没有时间保存。

稍微留一点时间放放登录动画，或者监听修改，一修改就保存。

# 安装主题

```bash
sudo vim /etc/lightdm/lightdm-webkit2-greeter.conf
#=> webkit_theme = ass-we-can

sudo cp -r ass-we-can /usr/share/lightdm-webkit/themes/ass-we-can
# 注意不能偷懒用软连接，否则会出问题
```

然后就可以 logout 看好戏了。

----

~~最后暴露写作目的~~

> 推销一个我 fork 的主题： <https://github.com/swwind/lightdm-theme-gradient>
> 预览地址： <https://stoic-meninsky-7063ba.netlify.com/>

[end]
