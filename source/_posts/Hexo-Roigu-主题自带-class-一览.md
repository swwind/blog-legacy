---
title: Hexo Roigu 主题自带内容一览
date: 2017-10-22 18:44:45
tags: hexo
categories: 颓废
desc: Hexo 的 Roigu 主题是一款精简至极的主题。其中含有不少有趣的内容。
sora: true
---

Hexo 的 Roigu 主题是一款精简至极的主题。其中含有不少有趣的内容。

# 自带 Class

## Truth

这表示的是真相（黑幕）：
**注意：** `title` 属性如果没有进行定义将被默认初始化为「你知道的太多了」。

```html
<span class="truth">只有把鼠标移上来才能看到。</span>
<span class="truth" title="不存在的">这句话设置了 title 属性</span>
<span class="truth" title>如果你不想要有 title 属性，请这样使用</span>
```

<span class="truth">只有把鼠标移上来才能看到。</span>
<span class="truth" title="不存在的">这句话设置了 title 属性</span>
<span class="truth" title>如果你不想要有 title 属性，请这样使用</span>

## Speaker

在使用 blockquote 的时候用来表示引用的地方。

```html
> 真実は いつも ふたつ
> <span class="speaker">工藤 新一</span>
```

> 真実は いつも ふたつ
> <span class="speaker">工藤 新一</span>

## Meiryo

当你发现微软雅黑这个字体不能很好地显示日语汉字的时候，可以使用 Meiryo 字体（<span class="meiryo">あいうえお</span>）进行日语的显示。
~~后来发现用 `lang="ja"` 就行了。。。~~

```html
> <span class="meiryo">真実は いつも ふたつ</span>
> <span class="speaker meiryo">工藤 新一</span>
```

> <span class="meiryo">真実は いつも ふたつ</span>
> <span class="speaker meiryo">工藤 新一</span>

## Hidden Text

这个字体是纯白的。只有 Ctrl + A 才能看到的。

```html
<span class="hide">你看不到我</span>
```

<span class="hide">你看不到我</span>

## Placeholder

这是首页右上角搜索框的样式，你也可以拿来用。

```html
<input type="text" class="better-placeholder" placeholder="你的名字？">
```

<input type="text" class="better-placeholder" placeholder="你的名字？">

## Under Line

鼠标移上去会有下划线出现。
**注意：**这个 class 要是中间有换行就会萎掉。

```html
<span class="under_line">SZB 太强了！！！</span>
```

<span class="under_line">SZB 太强了！！！</span>

## Checkbox

复选框。<span class="truth">其实这个我是抄 [vijos](https://vijos.org) 的</span>

```html
<label><input type="checkbox">这是一个复选框</label>
<label><input type="checkbox" checked>这个是选中了的</label>
```

<label><input type="checkbox">这是一个复选框</label>
<label><input type="checkbox" checked>这个是选中了的</label>

# 自带 Function

## Show

这是一个提示框。
**用法：**`show(msg, [timeout])`

```html
<button onclick="show('今天天气真好');show('紗霧ちゃんは可愛いですね', 2000);">点击中大奖</button>
```

<button onclick="show('今天天气真好');show('紗霧ちゃんは可愛いですね', 2000);">点击中大奖</button>

# 后记

等更新吧，估计后面还有。
