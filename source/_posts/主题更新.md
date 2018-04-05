---
title: Roigu 主题更新
date: 2018-02-18 16:30:43
tags: hexo
categories: 颓废
---

学了学 hexo 脚本插件的操作。

于是添加了一点东西到本主题中。

### 黑幕（truth）

你不用再写 HTML 了！

使用以下语法即可：

```markdown
{% truth [title] %}
content
{% endtruth %}
```

{% truth 你知道的太多了 %}
我不会告诉你我在写这个的时候因为拼错了一个单词而浪费了半个钟头。
{% endtruth %}

当然原来的 HTML 语法还是支持的啦！

### 备注（remark）

使用以下语法：

```markdown
{% remark %}
content
{% endremark %}
```

{% remark %}
~~备注的上面“备注”两个字无法翻译为多国语言。~~
~~因为我找不到 hexo 插件里的翻译函数。~~
于是就手写了一个强行支持了
{% endremark %}

### 引用（blockquote）

使用以下语法：

```markdown
{% blockquote [author] [link] %}
content
{% endblockquote %}
```

{% blockquote Wikipedia https://zh.wikipedia.org/wiki/Wikipedia:%E5%9D%8F%E7%AC%91%E8%AF%9D%E5%92%8C%E5%88%A0%E9%99%A4%E7%9A%84%E8%83%A1%E8%AF%9D/GitHub %}

GitHub，也称GayHub， 是一个以 Git 为主要交流工具的同性交友网站。

截止到 2017 年，GitHub 已经有超过 3 千万用户和 6300 万房间，事实上已经成为世界上最大的同性交友网站以及最活跃的程序猿搞基场所。

{% endblockquote %}

{% remark %}
~~引用文本中的 **Markdown** 代码目前还不能正常解析，正在寻找解决方法。~~
~~其实备注中也一样。~~
~~暂时可以用 HTML 补救。~~
已解决问题。
{% endremark %}

### 音乐播放器（APlayer）

使用以下语法：

```markdown
{% aplayer url [title] [author] %}
```

{% aplayer "http://lc-xg0skcxl.cn-n1.lcfile.com/6da6b5bbef2c8c30e4d4.mp3" "Spirits" "KOKIA" %}

{% remark %}
功能还不完善，请等待更新。
~~或者你可以直接使用 hexo-tag-aplayer~~
吐槽一句：Aplayer 为毛不能直接从 mp3 文件中获取封面呢。。。
{% endremark %}

### Youtube 播放器

使用以下语法：

```markdown
{% youtube id %}
```

{% youtube OGteaLxUVO0 %}

### bilibili 播放器

使用以下语法：

```markdown
{% bilibili av-id page %}
```

**注意：**av-id 填的是数字就行了，page 默认为 1（P1）

{% bilibili 15132751 %}

{% remark %}
由于一些原因，bilibili 对外链播放器有白名单限制。因此该标签暂时不能使用。
目前我们会将其编译成一个视频小卡片（<span class="truth" title="QAQ">你永远不会知道我找 appkey 用了多久</span>。
P.S. 白名单：<https://static.hdslb.com/player/js/whitelist.js>
<span class="truth" title="惊喜">不填 av-id 有惊喜</span>
{% endremark %}

### 视频播放器（DPlayer）

使用以下语法：

```markdown
{% dplayer url %}
```

{% dplayer http://i.snssdk.com/neihan/video/playback/?video_id=c147d111e5e446099210addc2298c93f&quality=480p&line=0&is_gif=0.mp4 %}

{% remark %}
DPlayer 的功能还有很多，本主题只是提供一个简单的接口。
~~或者你可以直接使用 hexo-tag-dplayer~~
{% endremark %}
