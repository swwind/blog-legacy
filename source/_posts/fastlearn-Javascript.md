---
layout: post
title: 速学 Javascript
date: 2017-09-22 18:24:35
tags: javascript
categories: 教程
---

# 先决要求

对以下内容有一定的了解：

- C/C++/Java（必须有深入的了解）
- HTML（有点了解即可）

## 运行方法

你可以在此页面中按`F12`打开开发者工具，切换到控制台（console），然后直接输入代码即可运行。
别跟我说你是 IE 内核的浏览器就行了。
如果你找不到控制台的话自己写个网页加个 `<script>` 标签即可。

# 基础语法

## 变量的定义与删除

### 定义变量

使用`var`关键字进行定义。
重复的定义不会清空原来变量的值。

**样例代码：**
```javascript
var x; // 定义了一个变量 x
var y = 2; // 给 y 赋初值为 2
console.log(y); // 此函数用来输出内容到控制台，自动换行
z = 6; // 其实有赋初值的话可以不用 var 关键字，但我不建议这么做
var k = z + y; // 运算 z+y 并将值赋给 k
console.log(k) // 其实每条语句后面不一定要用分号，但在一些容易出问题的地方还是加上比较好
var k
console.log(k) // k 的值不会被改变
```

**运行输出：**
```text
2
8
8
```

### 关于删除变量

你可以使用`delete`关键字来删除变量。
如果成功删除变量`delete`关键字会返回`true`，否则返回`false`。

**样例代码：**
```javascript
var x = 'fangbo is our red sun'
console.log(delete x)
console.log(x)
```

**运行输出（Edge）：**
```text
true
undefined // undefined 的意思是变量 x 未定义
```

**运行输出（Chrome/Firefox）：**
```text
false
fangbo is our red sun
```

至于为什么在不同的浏览器中有不同的结果，请参阅[这篇文章](http://blog.sina.com.cn/s/blog_54da57aa01012z64.html)。并且尽量不要使用这个关键字（反正一般也用不到）。

## 数据类型

你在定义变量的时候不需要指定类型，Javascript拥有**动态类型**。
你可以使用`typeof`关键字来获取变量的类型。
如果你没有给一个变量赋过值，那么他的类型将会是`undefined`。
`typeof`关键字本身的返回值类型是`string`。

**样例代码：**
```javascript
var kkk
console.log(typeof kkk) // undefined

kkk = "I love bilibili" // 赋值字符串，单双引号都可以，于是没有 char 这个概念
console.log(typeof kkk) // string

kkk = 3 // 赋值数字
console.log(typeof kkk) // number

console.log(typeof typeof kkk) // string
```

**运行输出：**
```text
undefined
string
number
string
```

## 函数

Javascript 中用`function`关键字来定义函数。

### 定义函数

Javascript 中定义函数有3种方法。

```javascript
// func 为程序名称，括号内的是参数。
function func (a, b) {
	console.log(typeof a + ' ' + typeof b); // 使用加号连接字符串
	console.log(a + ' ' + b); // 只要加法的其中一项是字符串，其结果就是字符串
	console.log('');
}

// 下面两种和第一种等效
// 变量也可以是函数
var func = function (a, b) {
	console.log(typeof a + ' ' + typeof b);
	console.log(a + ' ' + b);
	console.log('');
}
// 这是 lambda 表达式
var func = (a, b) => {
	console.log(typeof a + ' ' + typeof b);
	console.log(a + ' ' + b);
	console.log('');
}
```

### 参数

在调用函数的时候不必写满所有参数，此时定义时多余的参数将会是 undefined。
当然也可以多写参数，多余的参数将被忽略。

**样例代码：**
```javascript
func(233, 'I love bilibili');
func(false);
func(123, 345, 567);
```

**运行输出：**
```text
number string
233 I love bilibili

boolean undefined
false undefined

number number
123 345

```

如果你要定义一个不定参数数量的函数，请使用`function_name.arguments`来获取所有参数组成的数组。

**样例代码：**
```javascript
function print () {
	var args = print.arguments;
	console.log(typeof args);
	// for 语句和 C/C++/Java 相同
	for (var i = 0; i < args.length; i++)
		console.log('args[' + i + '] = ' + args[i]);
}

print(2325, 35235, 23623, 6, 243, 6, 543, 6);
```

**运行输出：**
```text
object
args[0] = 2325
args[1] = 35235
args[2] = 23623
args[3] = 6
args[4] = 243
args[5] = 6
args[6] = 543
args[7] = 6
```

### 返回值

使用`return`关键字返回函数返回值。
`return`后面的参数也是可选的，如果没有返回任何东西函数的返回值将是`undefined`。

**样例代码：**
```javascript
function func (a, b) {
	if (a > b)
		return a;
	return;
}
console.log(func(56, 34));
console.log(func(34, 56));
```

**运行输出：**
```text
56
undefined
```

### 函数内变量的作用域

在函数里面定义的变量的作用域仅在函数内部，函数返回后当即失效。

**样例代码：**
```javascript
function func () {
	var x = 2;
	console.log('In function: ' + typeof x);
}
func();
console.log('Out of function: ' + typeof x);
```

**运行输出：**
```text
In function: number
Out of function: undefined
```

函数可以调用外部的变量。

**样例代码：**
```javascript
var x = 0;
console.log(x);
// 可以用括号把匿名函数括起来，并在后面用小括号加参数进行调用。
// 但这样做基本上只是为了新开一个空间防止变量名冲突。
// 这样使用时注意前面必须使用分号隔开，否则将会编译错误。
(function (a) {
	x = a;
})(52);
console.log(x);
```

**运行输出：**
```text
0
52
```

至此，我们愉快地学完了基础部分。
你现在是不是这副表情？
![rscl](/img/rscl.jpg)

# Javascript 对象

> JavaScript 中的所有事物都是对象：字符串、数字、数组、日期，等等。
在 JavaScript 中，对象是拥有属性和方法的数据。
> <p class="speaker">[w3school](http://www.w3school.com.cn/js/js_obj_intro.asp)</p>

其实 Javascript Object 和 C/C++/Java 中的`Map<key, value>`很像。
Javascript 中的元素可以用`object_name.key`或者`object_name['key']`进行存储。
如果`object_name`中没有`key`这个元素，将会返回`undefined`，或者你可以将其赋值。
具体见如下代码。

**样例代码：**
```javascript
var szb = new Object()
szb.name = "SHENZHEBEI"
szb.type = "dalao"
console.log(typeof szb.orz)
szb.orz = function () {
	console.log('orz ' + this.name)
}
szb.orz()
```

**运行输出：**
```text
undefined
orz SHENZHEBEI
```

有一种方便一点的定义方法。使用如下形式：`{key1:value1,key2:value2,...,keyn:valuen}`。
关于逗号的使用方法：逗号是将每个键值对分开来的符号，你只需要在每两个键值对之间加上逗号即可。
~~虽然在最后一项的后面加上逗号也不会出错~~

**样例代码：**
```javascript
var szb = {
	name: "SHENZHEBEI",
	type: "dalao",
	orz: function () {
		console.log('orz ' + this.name)
	}
}
szb.orz()
```

**运行输出：**
```text
orz SHENZHEBEI
```

然后、、、好像没了？？？
![huaji](/img/huaji.png)

现在你应该能看懂任意一份 Javascript 代码了吧。

关于类型转换、自带函数、HTML 关联、jQuery 等东西还请自行 google。
（其实 [w3school](http://www.w3school.com.cn/) 的确是个不错的网站）
じゃ、さようなら。
