# Page configs

## Normal configs

### layout

It can be `post`, `page`, `search`, `tags`, `categories`, `links`。

Name       | Usage
---------- | -----
post       | Normal post.
page       | A single page.
search     | Search page.
tags       | Tag cloud page.
categories | Category cloud page.
links      | Links page.

Maybe I would add more layouts.

Welcome pull requests!

### title

The title of the post/page.

### date

The date when you created the post/page.

### tags

The tags of the post/page.

### categories

The categories of the post/page.

## Special configs

### comments :: Bool

Default: `true`

Whether to allow comments on this page if you have a comment system.

### toc :: Bool

Default: `true`

Enable article directories.

### list_number :: Bool

Default: `true`

Enable TOC list numbers if toc is enable.

### mathjax :: Bool

Default: `true`.

Enable mathjax on this page.

### desc :: String

Default: `undefined`.

Artical description.

!> Roigu Theme did not use `<!-- more -->` to distinguish between preface and body.

## Magicial configs

### sora :: Bool

Default: `false`.

A template means that this post/page is about sisters.

Idea from <https://moegirl.org>

### warning :: String

Default: `undefined`

A big warning at the top of the article.

