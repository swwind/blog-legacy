---
title: 函数式编程学习笔记
date: 2018-05-1 11:05:07
tags: 函数式
categories: 颓废
---

## 前言

近年来，函数式编程正在越来越受到欢迎。

{% blockquote 阮一峰 http://www.ruanyifeng.com/blog/2012/04/functional_programming.html %}
不仅最古老的函数式语言Lisp重获青春，而且新的函数式语言层出不穷，比如Erlang、clojure、Scala、F#等等。目前最当红的Python、Ruby、Javascript，对函数式编程的支持都很强，就连老牌的面向对象的Java、面向过程的PHP，都忙不迭地加入对匿名函数的支持。越来越多的迹象表明，函数式编程已经不再是学术界的最爱，开始大踏步地在业界投入实用。
{% endblockquote %}

关于函数式编程的特点我就不讲了，想要了解的请阅读《[函数式编程初探 - 阮一峰](http://www.ruanyifeng.com/blog/2012/04/functional_programming.html)》

下面直接讲思路和代码的实现了。

本人建议面向过程/面向对象写惯的同学从 JavaScript 开始理解函数式编程会比较好。
<span class="truth" title="你看看人家 Haskell">看得懂语法至少不会使你马上就弃坑</span>

## 预备知识

我们假设所有人都会 JavaScript。

### 柯里化（Currying）

```js
const add = (a, b) => a + b; // 普通的一个 add 函数
const add = a => b => a + b; // 这样就是柯里化
```

这样有什么用呢？

打个比方，如果我们要将一个数组里面所有元素加 1，你就可以这样写

```js
let arr = [1, 2, 3];

arr.map(add(1)); // [2, 3, 4]
```

`add(1)` 将会返回一个函数 `b => 1 + b`，配合 `map` 使用即可。

如何自动将一个函数柯里化？

```js
// 模板
const curry = fn => {
  const _c = (restNum, argsList) => restNum === 0 ?
    fn(...argsList) : (...args) => _c(restNum - args.length, [...argsList, ...args]);

  return _c(fn.length, []);
}

// 使用方法

const add = curry((a, b) => a + b);
add(1)(2); // 3
add(1, 2); // 3
```

### 合并函数

```js
// 合并两个函数，从左到右执行
const pipe = (f, g) => x => g(f(x));
// 合并多个函数，从左到右执行
const compose = (...args) => args.reduce(pipe, args.shift())
```

### Ramda

[Ramda](http://ramdajs.com/) 是一个提供 JavaScript 函数式编程的函数库。
想要了解的请自行 google，这里不做展开。

### 函数式与非函数式的比较

将一个数组中所有的数字类型元素筛选出来。

普通写法

```js
const filter_list = arr => arr.filter(x => typeof x === 'number');
```

函数式

```js
const filter = f => a => a.filter(f);
const is = t => x => typeof x === t;

const filter_list = filter(is('number'));
```

可见函数式代码更加优美并且更加接近自然语言。

## Haskell 入门

Haskell 第一眼给人的印象就是：懵逼。

他和普通的非函数式语言完全不同。

学过的人知道他在写什么。

没学过的人连他写的东西怎么运行都不知道（特别是几个奇怪的运算符）。

现在我们尝试学习 Haskell。

### 基本操作

#### 输出字符串

```haskell
main :: IO () -- 定义主函数
-- 实现主函数
main = putStrLn "hello world" -- hello world
```

`putStrLn` 函数用来输出字符串。

#### 输出任何东西

```haskell
main :: IO ()
main = do print "hello world" -- "hello world"
          print [1 .. 3] -- [1,2,3]
```

`do` 关键字的作用是执行多条语句（多个函数？），使用缩进来判断是否在同一个块内。

### 函数的声明

你只需要把每个参数的类型和返回值的类型用 `->` 连接起来就行了。
如果没有返回值，使用 `()` 表示 `void`。
函数将自动返回最后一次运行的表达式的计算结果。

```haskell
add :: Int -> Int -> Int
add a b = a + b
```

### 调用函数

你不需要使用括号和逗号，直接在函数名后面输入参数即可。

```haskell
main :: IO ()
main = print (add 1 2) -- 3
```

是不是觉得用括号太愚蠢了
那就用 `$` 运算符

```haskell
main = print $ add 1 2 -- 3
```

你可以把 `$` 当作括号用
`$` 的定义：

```haskell
infixr 0 $ -- 优先级最低
($) :: (a -> b) -> a -> b
f $ x = f x
```

### 自带柯里化

```haskell
add = (+) -- 其实运算符也是个函数

main :: IO ()
main = print $ map (add 5) [1, 2, 3]
-- 输出：[6,7,8]
```

### 语法糖

给定三个数，判断是否为三角形的三条边。

```haskell
isTriangle :: Int -> Int -> Int -> Bool
isTriangle a b c
  | a + b <= c = False
  | a + c <= b = False
  | b + c <= a = False
  | otherwise  = True
-- 其实就是一堆 if else。。。
```

### 定语后置句

全部定义在外面

```haskell
isOdd :: Int -> Bool
isOdd x = x `mod` 2 == 1

main :: IO ()
main = print $ isOdd 4 -- False
```

使用 `where` 关键字

```haskell
main :: IO ()
main =
  print $ isOdd 4
  where
    isOdd x =
      x `mod` 2 == 1
```

### 深入学习

RTFM。





