---
layout: post
title: hexo-generator-search 更好的搜索引擎
date: 2017-10-08 21:26:25
tags: hexo
categories: 颓废
---

# 前言

偶然间发现了 github 上的一个 hexo 站内搜索插件 [hexo-generator-search](https://github.com/PaicHyperionDev/hexo-generator-search)。
于是我在主题中新建了一个 `/search` 页面，但在之后的测试搜索中发现了各种问题。
于是折腾了两个晚上终于是把搜索功能搞好了。
总结一下问题和方法。

# 问题

1. **是否支持正则表达式不清楚**

  比如说你搜索 `|` 会直接爆炸。

2. **HTML 转义字符会萎掉**

  比如说你搜索 `&` 会搜出 `&lt;` 和 `&gt;`。

3. **无法让用户选择是否忽略大小写**

  ~~虽然这点没卵用但是有总比没有显得逼格高一点~~



# 解决方法

针对上述的问题我们来进行魔改。

1. 加一个支持选择是否使用正则表达式的按钮

2. 将输入的字符串进行一次 HTML 转义然后再匹配

3. 同 1 加一个按钮

这样我们的初步功能就写好了。

然而还有一些优化的地方

1. 搜 `|` 将会返回所有的页面。

  用 `regex.test('')` 来进行特判。

2. 搜 `&??` 会将原文中的 `&` 匹配成 `&;`

  将正则表达式中所有满足 `/&[^;]*;/g` 的前后各加一个括号。

  ```javascript
  keywords.forEach((s, i) => keywords[i] = s.replace(/&[^;]*;/gi, (r) => '('+r+')'))
  ```

然后清楚的区分 `string.indexOf(string)` 和 `string.match(regular)` 两个方法就行了。

## 第一次解决代码

**代码：[防止占版面](https://github.com/swwind/roigu/blob/fdafd29781a6a2a53f216901ba3fdd0ef6da7c99/source/js/search.js)**

才过去了一天不到，我又发现了问题：
搜 `amp` 会把所有的 `&` 转换成 `&amp;`. . .

一气之下我就~~颓废了一个下午~~把它修好了。

现在再出问题我就去吃 htr 了！~~flag~~

## 第二次解决代码

**代码：[防止占版面](https://github.com/swwind/roigu/blob/7616e37e01b40d280ce3253b6f865ca1ebd4c396/source/js/search.js)**

当天晚上就又发现问题了...
当我尝试搜索 `-` 时就死循环了...

后来我发现是因为不开正则表达式的时候默认是以 `/[\s\-]+/g` 来分割关键字的。。。
然后分割出了一个空集。。。
然后我在后面 `while(find) replace` 的时候就死循环了。。。

Oh motherf\*\*ker...

然后我又改了好久。。。

-----

**10.3 update**

不久又出问题了。

搜索 `0` 的时候会爆炸。。。

然后我又改好了。。。

## 目前最终代码

```javascript
// Copy form https://github.com/PaicHyperionDev/hexo-generator-search
// I fixed lots of bugs ......
// Who can tell me who wrote this f**king code???
// Now there will not be any bugs... If you find out one, please tell me.
// it need jquery
// path       -> search.xml 的位置
// search_id  -> 搜索输入的 文本框 的 id
// content_id -> 搜索输出的 div 的 id
// regex_id   -> 是否正则表达式的 checkbox 的 id
// search_id  -> 是否忽略大小写的 checkbox 的 id
var searchFunc = function(path, search_id, content_id, regex_id, case_id) {
	'use strict';
	document.getElementById(content_id).innerHTML = '<p class="search-failed">Preloading ...</p>'
	var randomString = function () {
		return String.fromCharCode(Math.floor(Math.random()*10000)+545155) 
	}
	function htmlEncode (value) {
		return $('<div/>').text(value).html();
	}
	function htmlDecode (value) {
		return $('<div/>').html(value).text();
	}
	var fuck = randomString();
	$.ajax({
		url: path,
		dataType: "xml",
		success: function( xmlResponse ) {
			// get the contents from search data
			var datas = $( "entry", xmlResponse ).map(function() {
				return {
					title: $("title", this).text(),
					content: $("content", this).text(),
					url: $("url", this).text()
				};
			}).get();
			var $input = document.getElementById(search_id);
			var $regex = document.getElementById(regex_id);
			var $case = document.getElementById(case_id)
			if (!$input || !$regex || !$case) return;
			var $resultContent = document.getElementById(content_id);
			var $fun = function(){
				var str = '<ul class="search-result-list">';                
				var keywords = $regex.checked
					? [$input.value.trim()]
					: ($case.checked
						? $input.value.trim().toLowerCase()
						: $input.value.trim()).split(/\s+/);
				if ($input.value.trim().length <= 0)
					return $resultContent.innerHTML = '';
				if ($regex.checked)
					try {
						var k = new RegExp(keywords[0]);
						if (k.test('') || k.test(' '))
							return $resultContent.innerHTML = '<p class="search-failed">Everything is Matched</p>';
					} catch (e) {
						return $resultContent.innerHTML = '<p class="search-failed">Regular Was Wrong</p>';
					}
				$resultContent.innerHTML = "";
				// console.log(keywords.toString()) // 正常
				var flag = 0;
				// perform local searching
				datas.forEach(function(data) {
					var isMatch = false;
					var content_index = [];                                                       
					if (!data.title || data.title.trim() === '') {
						data.title = "Untitled";
					}
					var data_title = $case.checked
						? data.title.trim().toLowerCase()
						: data.title.trim();     
					var data_content = $case.checked
						? data.content.trim().replace(/<[^>]+>/g,"").toLowerCase()
						: data.content.trim().replace(/<[^>]+>/g,"");
					data_title = htmlDecode(data_title);
					data_content = htmlDecode(data_content);
					var data_url = data.url;
					var index_title = -1;
					var index_content = -1;
					var first_occur = -1;
					// only match artiles with not empty contents
					if (data_content !== '') {
						keywords.forEach(function(keyword, i) {
							if ($regex.checked) {
								var reg = new RegExp(keyword, $case.checked ? 'i' : '');
								index_title = (data_title.match(reg) || {index:-1}).index;
								index_content = (data_content.match(reg) || {index:-1}).index;
							} else {
								index_title = data_title.indexOf(keyword);
								index_content = data_content.indexOf(keyword);
							}
							if (index_title > -1 || index_content > -1) {
								isMatch = true;
								if (index_content < 0) {
									index_content = 0;
								}
								if (first_occur == -1) {
									first_occur = index_content;
								}
								// content_index.push({index_content:index_content, keyword_len:keyword_len});
							}
						});
					} else {
						isMatch = false;
					}
					// show search results
					if (isMatch) {
						flag = 1;
						str += '<li><a href="' + data_url + '">';
						var content = data_content;
						if (first_occur >= 0) {
							// cut out 100 characters
							var start = first_occur - 20;
							var end = first_occur + 80;
							if(start < 0){
								start = 0;
							}
							if(start == 0){
								end = 100;
							}
							if(end > content.length){
								end = content.length;
							}
							var match_content = content.substr(start, end); 
							// highlight all keywords
							var ohno = new Array();
							keywords.forEach(function (keyword) {
								while (fuck.indexOf(keyword) > -1 || match_content.indexOf(fuck) > -1
										|| data_title.indexOf(fuck) > -1 || ohno.indexOf(fuck) > -1)
									fuck = randomString();
								ohno.push(fuck)
							})
							keywords.forEach(function(keyword, i){
								if ($regex.checked) {
									match_content = htmlEncode(match_content);
									data_title = htmlEncode(data_title)
									keyword = htmlEncode(keyword).replace(/&[^;]*;/g, (s) => '('+s+')');
									var regS = new RegExp(keyword, $case.checked ? "gi" : "g");
									match_content = match_content.replace(regS,
										(s) => '<span class="search-keyword">'+s+'</span>');
									data_title = data_title.replace(regS,
										(s) => '<span class="search-keyword">'+s+'</span>');
								} else {
									// console.log('keyword = ' + keyword)
									// console.log(match_content)
									while (match_content.indexOf(keyword) > -1)
										match_content = match_content.replace(keyword, ohno[i]);
									// console.log(data_title)
									while (data_title.indexOf(keyword) > -1)
										data_title = data_title.replace(keyword, ohno[i]);
									// console.log('get out')
								}
							});
							if (!$regex.checked) {
								data_title = htmlEncode(data_title);
								match_content = htmlEncode(match_content);
								keywords.forEach(function (keyword, i) {
									while (match_content.indexOf(ohno[i]) > -1)
										match_content = match_content.replace(ohno[i], (s) =>
											'<span class="search-keyword">'+htmlEncode(keyword)+'</span>');
									while (data_title.indexOf(ohno[i]) > -1)
										data_title = data_title.replace(ohno[i], (s) =>
											'<span class="search-keyword">'+htmlEncode(keyword)+'</span>');
								})
							}
							str += '<p class="search-result-title">' + data_title + '</p>'
							str += '<p class="search-result">' + match_content + '...</p>'
						}
						str += "</a></li>";
					}
				});
				str += "</ul>";
				$resultContent.innerHTML = flag ? str : '<p class="search-failed">Nothing Matched</p>';
			}
			$input.addEventListener('input', $fun);
			$regex.addEventListener('click', $fun);
			$case.addEventListener('click', $fun);
			$resultContent.innerHTML = '';
			if ($input.value) $fun();
		}
	});
}
```

贝爷保佑，永无 BUG
<span class="meiryo">お願い。。</span>
