---
title: TensorFlow 学习笔记
date: 2018-07-10 11:03:39
tags: tensorflow
categories: 颓废
desc: 渐渐地步入了颓废的深渊
---

~~失踪人口回归~~

Google 的**机器学习**教程：[传送门](https://developers.google.com/machine-learning/crash-course/)。

## 安装

```cmd
pip3 install --upgrade tensorflow
```

## 入门

Google 的教程一直在推荐你用 `tf.estimator` 和 `pandas`，但是连个简单样例都没有，作为一个新手我一脸懵逼。

那我们就去网上找可以运行的样例吧。

一搜发现网上都是用 `numpy` 以及一堆和 `tf.estimator` 没有任何关系的模板。。。

那就把 Google 推荐的两个东西无视掉吧，，，

一个简单的 **线性回归（linear regression）** 学习模板：

```python
import tensorflow as tf
import numpy as np

# 造数据
x_data = np.float32(np.random.rand(1, 100)) # 随机 100 个输入数据
y_data = x_data * 4.2 + 5.2 # 计算标准输出

# 建模
# - 我们已经知道这是一个一次函数了，有两个未知量 w 和 b
w = tf.Variable(tf.zeros(1)) # 模型中一个可变的数字，初值为 0
b = tf.Variable(tf.zeros(1)) # 同上
y = w * x_data + b # 一次函数公式模型

# 求解
# - 设置损失（Loss）函数：误差的均方差
loss = tf.reduce_mean(tf.square(y - y_data))
# - 选择梯度下降的方法，0.5 是学习速率（learning rate）
optimizer = tf.train.GradientDescentOptimizer(0.5)
# - 迭代的目标：最小化损失函数
train = optimizer.minimize(loss)

# - 初始化所有全局变量
init = tf.global_variables_initializer()
# - 启动图 (graph)
sess = tf.Session()
sess.run(init)

# - 迭代，反复执行上面的最小化损失函数这一操作（train op），拟合平面
for step in range(0, 201):
  sess.run(train)
  if step % 20 == 0:
    print(step, sess.run(w), sess.run(b))
```

输出：

```text
0 [3.9204707] [7.2580767]
20 [3.9439363] [5.3347573]
40 [4.1385536] [5.232337]
60 [4.185255] [5.2077594]
80 [4.1964617] [5.201862]
100 [4.1991506] [5.2004466]
120 [4.1997967] [5.2001066]
140 [4.1999507] [5.2000256]
160 [4.1999884] [5.200006]
180 [4.199997] [5.2000012]
200 [4.199997] [5.2000012]
```

可以看到程序迭代了 200 次找到了最佳拟合：$\begin{cases}w=4.200\\\\b=5.200\end{cases}$。

------

那么对有四个**特征**的线性回归模型 tensorflow 的处理效果如何呢？

稍微改一下模板：

```python
x1_data = np.float32(np.random.rand(1, 100))
x2_data = np.float32(np.random.rand(1, 100))
x3_data = np.float32(np.random.rand(1, 100))
x4_data = np.float32(np.random.rand(1, 100))
y_data = x1_data * 5.2 + x2_data * 8.2 + x3_data * 9.2 + x4_data * 1.2 + 1.6

w1 = tf.Variable(tf.zeros(1))
w2 = tf.Variable(tf.zeros(1))
w3 = tf.Variable(tf.zeros(1))
w4 = tf.Variable(tf.zeros(1))
b = tf.Variable(tf.zeros(1))
y = (w1 * x1_data) + (w2 * x2_data) + (w3 * x3_data) + (w4 * x4_data) + b
```

然后我们将学习效率改成 0.2，再迭代 1000 次，可以看到以下结果：

```text
0 [2.859013] [3.4737022] [3.1260953] [2.9026427] [5.5858054]
100 [4.828743] [7.7254896] [8.7003565] [0.9192924] [2.4783878]
200 [5.1373687] [8.126683] [9.121572] [1.1248572] [1.7559142]
300 [5.189195] [8.1874275] [9.186127] [1.1855505] [1.6278231]
400 [5.198095] [8.197777] [9.1975155] [1.1973705] [1.6049733]
500 [5.199661] [8.199602] [9.1995535] [1.1995276] [1.6008905]
600 [5.1999393] [8.199928] [9.199921] [1.1999152] [1.6001594]
700 [5.1999903] [8.199985] [9.199983] [1.1999859] [1.6000301]
800 [5.1999946] [8.199988] [9.199987] [1.1999981] [1.6000166]
900 [5.1999946] [8.199988] [9.199987] [1.1999981] [1.6000166]
1000 [5.1999946] [8.199988] [9.199987] [1.1999981] [1.6000166]
```

可以看到学习的效果是非常好的，所得结果已经可以用来比较精准地预测数据了。

注意：如果我们没有改学习效率（依然是 0.5）的话，拟合的结果将会越来越大（最后变成 nan）。

这时候就要适当的调整学习效率，才能使程序在有限的时间内得到结果。

关于理想的学习速率，Google 提供了一个结论：

> 一维空间中的理想学习速率是 $\frac{1}{f(x)''}$（f(x) 对 x 的二阶导数的倒数）。
>
> 二维或多维空间中的理想学习速率是[海森矩阵](https://zh.wikipedia.org/wiki/海森矩阵)（由二阶偏导数组成的矩阵）的倒数。
>
> 广义凸函数的情况则更为复杂。

## 应用

有人用它写了一个 *chrome://dino* 的 AI。

[前端人工智能？TensorFlow.js 学会游戏通关 - 知乎](https://zhuanlan.zhihu.com/p/35451395)

（续


