---
title: 函数式编程学习笔记
date: 2018-10-9 11:05:07
tags:
  - 函数式
  - haskell
categories: 颓废
---

## 前言

近年来，函数式编程正在越来越受到欢迎。

{% blockquote 阮一峰 http://www.ruanyifeng.com/blog/2012/04/functional_programming.html %}
不仅最古老的函数式语言Lisp重获青春，而且新的函数式语言层出不穷，比如Erlang、clojure、Scala、F#等等。目前最当红的Python、Ruby、Javascript，对函数式编程的支持都很强，就连老牌的面向对象的Java、面向过程的PHP，都忙不迭地加入对匿名函数的支持。越来越多的迹象表明，函数式编程已经不再是学术界的最爱，开始大踏步地在业界投入实用。
{% endblockquote %}

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

### 函数式与非函数式的比较

> 筛选出一个数组中所有的数字成员。

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

### Ramda

[Ramda](http://ramdajs.com/) 是一个提供 JavaScript 函数式编程的函数库。
想要了解的请自行 google，这里不做展开。

## Haskell 入门

Haskell 第一眼给人的印象就是：懵逼。

他和普通的非函数式语言完全不同。

学过的人知道他在写什么。

没学过的人连他写的东西怎么运行都不知道（特别是几个奇怪的运算符）。

现在我们尝试学习 Haskell。

### 输出

#### 输出字符串

```haskell
-- 定义主函数（可省略，因为有自动类型推断）
main :: IO ()
-- 实现主函数
-- 输出 hello world
main = putStrLn "hello world"
```

`putStrLn` 函数用来输出字符串。

调用函数不需要括号，所有函数全部支持柯里化。

#### 输出其他任何东西

```haskell
main :: IO ()
main = do
  print "hello world"
  print [1 .. 3]
-- 输出：
-- hello world
-- [1,2,3] 
```

`do` 关键字的作用是执行多条语句（多个函数？），使用缩进来判断是否在同一个块内。

### 函数的声明

你只需要把每个参数的类型和返回值的类型用 `->` 连接起来就行了。

如果没有返回值，使用 `()`（Unit /ˈjuːnɪt/） 表示 `void`。

函数将自动返回最后一次运行的表达式的计算结果。

```haskell
add :: Int -> Int -> Int
add a b = a + b
```

### 调用函数

你不需要使用括号和逗号，直接在函数名后面输入参数即可。

由于函数是从左到右执行的，所以有时候需要括号来调整优先级。

```haskell
main :: IO ()
main = print (add 1 2)
```

如果你觉得用括号太愚蠢了，就用 `$` 运算符。

```haskell
main = print $ add 1 2
-- 输出 3
```

`$` 的定义：

```haskell
infixr 0 $ -- 优先级最低，从右至左执行
($) :: (a -> b) -> a -> b
f $ x = f x
```

### 自带柯里化

```haskell
-- 其实运算符也是个函数
add = (+)

main :: IO ()
main = print $ map (add 5) [1, 2, 3]
-- 输出：[6,7,8]
```

### where 关键字

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
main = print $ isOdd 4
  where
    isOdd x = x `mod` 2 == 1
```

### 例题和题解

**这一部分请自行观察代码理解**。

> List 相关。

```haskell
main = do
  print $ 1 : [4, 5] -- [1,4,5] :: [Int]
  print $ 'f' : "oobar" -- "foobar" :: String (= [Char])
  print $ "foo" ++ "bar" -- "foobar"
```

> 给定三个数，判断是否为三角形的三条边。

```haskell
isTriangle :: Int -> Int -> Int -> Bool
isTriangle a b c
| a + b <= c = False
| a + c <= b = False
| b + c <= a = False
| otherwise  = True
```

> 计算阶乘。

`Integer` 是高精度整数。

```haskell
frac :: Integer -> Integer
frac 0 = 1
frac n = n * frac (n - 1)

main :: IO ()
main = print $ frac 100
```

> 计算斐波那契数列。

先来一个 $O(F_n)$ 暴力。

```haskell
fib 0 = 0
fib 1 = 1
fib n = fib (n - 1) + fib (n - 2)
```

然后学一个优美一点的写法。

```haskell
fib a b = a : fib b (a + b)
main = print $ take 20 $ fib 1 1
```

我们来分析一下这种写法。

首先 Haskell 进行自动类型推断，根据 `:` 和下文给出的参数可以推出，`fib` 应该返回 `[Integer]`。

由于 Haskell 有惰性求值，所以不用担心调用的时候会无限递归。

`take 20` 用于取 list 的前 20 项。

`takeWhile (<= 20)` 用于取 list 前面所有满足 $\le 20$ 的元素，遇到第一个不满足的即返回。

~~其实都是字面意思~~

### 结尾

作者的忠告：

> **永远不要想着用 Haskell 写 OI 题，这是在浪费时间。**

想要训练和深入理解，可以去 codewars 上做题练习。

