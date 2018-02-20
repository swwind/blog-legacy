---
layout: post
title: Hexo Roigu 主题中文使用说明
date: 2017-10-04 20:39:36
tags: hexo
categories: 教程
desc: 这是文章的 desc 属性，表示文章的简述（可以没有）
sora: true
warning: 本主题完全不支持 IE！！！
---

## 预览图

你已经在预览了。

## 主题配置

配置文件`_config.yml`注释都写在里边，自己看去，我还良心的用了中文。<span class="truth">其实是不会英语</span>

## 页面的开关

```yaml
---
layout: post|page # 必须，页面类型
title: The title of the article # 必须，页面标题
date: 2017-10-04 20:39:36 # 必须，发表时间
tags: tag | [tag1, tag2, ..., tagx] # 可选，标签，默认为空
categories: category # 可选，分类，默认为空
comments: true # 可选，评论，默认为 true
toc: true # 可选，文章目录，默认为 true
mathjax: true # 可选，是否开启数学公式，默认为 true
desc: The description of the article # 可选，表示文章的简述，默认为空

# 下面是一些文章顶部的模板

sora: false # 可选，文章顶部的那个穹妹，默认为 false
warning: 本主题完全不支持 IE！！！ # 可选，警告框
---
```

**注意：**本主题不使用 `<!-- more -->` 来区分前言和正文，请使用 `desc` 属性代替。

### 关于 MathJax 与 Markdown 冲突的解决办法

我们可以通过修改 Markdown 来实现对 MathJax 的支持。
具体方法如下：

1. 找到并打开`./node_modules/marked/lib/marked.js`。

2. 找到
  ```javascript
  escape: /^\\([\\`*{}\[\]()# +\-.!_>])/,
  ```
  将其替换为
  ```javascript
  escape: /^\\([`*\[\]()# +\-.!_>])/,
  ```
  这一步是取消了 Markdown 对`\\`、`\{`、`\}`的转义。

3. 找到
  ```javascript
  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  ```
  将其替换为
  ```javascript
  em: /^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  ```
  这一步取消了对`_Italic_`的转义，若要继续使用斜体请使用`*Italic*`。

## 特殊页面

### tags 标签云

输入以下代码

```text
$ hexo n page "tags"
```

之后打开`/source/tags/index.md`，将其改为如下内容

```text
---
layout: tags
---
```

之后就可以在`localhost:4000/tags/`看到标签云页面了。（[预览](/tags)）

### categories 分类云

输入以下代码

```text
$ hexo n page "categories"
```

之后打开`/source/categories/index.md`，将其改为如下内容

```text
---
layout: categories
---
```

之后就可以在`localhost:4000/categories/`看到标签云页面了。（[预览](/categories)）

### links 友情链接

输入以下代码

```text
$ hexo n page "links"
```

之后打开`/source/links/index.md`，将其改为如下内容

```text
---
layout: links
---
```

之后就可以在`localhost:4000/links/`看到标签云页面了。（[预览](/links)）

### search 站内搜索

如果要启用的话请先导入`hexo-generator-search`插件。
具体方法如下：

1. 在 hexo 博客的根目录下输入以下指令：
  ```bash
  $ npm install hexo-generator-search --save
  ```

2. 打开根目录中的 `_config.yml`，添加以下内容：
  ```yaml
  search:
    path: search.xml
    field: post|page|all
  ```
  其中的`field`表示搜索的范围，`post`为全部文章，`page`为全部页面，`all`包括了`post`和`page`。

3. 在根目录输入
  ```bash
  $ hexo n page "search"
  ```

4. 打开 /source/search.md，将其改为如下
  ```markdown
  ---
  layout: search
  mathjax: false
  ---
  ```

然后你就可以在`/search`页面搜索了。（[预览](/search)）
具体可以参见 https://github.com/PaicHyperionDev/hexo-generator-search

## 内置类

请参考我的另两篇文章。
[Hexo Roigu 主题自带 class 一览](/2017/10/22/Hexo-Roigu-主题自带-class-一览/)
[Roigu 主题的更新](/2018/02/18/主题更新/)

## 常见问题

### 为什么是整个博客的色调是黑白的？

**答：**因为我不会配色。每次配出来的页面都惨不忍睹。。。

### 文章顶部为什么有穹妹？

**答：**那是因为我为了方便你们查看 `sora: true` 属性。<span class="truth meiryo">私は変態じゃないです</span> 

### ~~博主怎么这么帅？~~

~~**答：**哈哈哈这是当然~~

## 待修复的 BUG

Edge 浏览器中的阅读次数统计不正常。

似乎是因为 Edge 浏览器的 `window.location.pathname` 支持中文字符的锅。

可以用 `encodeURI(decodeURI(window.location.href))` 解决。
