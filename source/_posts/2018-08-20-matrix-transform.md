---
title: Matrix Transform
date: 2018-08-20 19:14:19
tags: [css, canvas]
categories: 颓废
desc: 本文来总结一下 CSS 的 transform 和 Canvas API 中的 transform 之间的区别。
---

本文来总结一下 CSS 的 transform 和 Canvas API 中的 transform 之间的区别。

## CSS

CSS 中的 matrix transform 需要有 6 个参数。

```css
transform: matrix(a, b, c, d, e, f);
```

这些参数代表了一个矩阵（Matrix）。

先看前四个参数，它们表示了一个 $2 \times 2$ 的矩阵：

$$
\begin{pmatrix}
a & c \\\\
b & d
\end{pmatrix}
$$

浏览器会进行以下运算来获得每个点变换后的坐标：

$$
\begin{pmatrix}
a & c \\\\
b & d
\end{pmatrix}
\times
\begin{pmatrix}
x \\\\
y
\end{pmatrix}
=
\begin{pmatrix}
ax+by \\\\
cx+dy
\end{pmatrix}
$$

对于旋转（rotation），你需要这么一个矩阵：

$$
\begin{pmatrix}
\cos\alpha & -\sin\alpha \\\\
\sin\alpha & \cos\alpha
\end{pmatrix}
$$

对于缩放（scale），你需要这么一个矩阵：

$$
\begin{pmatrix}
scaleX & 0 \\\\
0 & scaleY
\end{pmatrix}
$$

将他们相乘的结果就是应该填的参数 a, b, c, d。

但是这样无法表示偏移（translation），于是就多了两个参数 tx 和 ty。

接着我们就可以写一个简单的包装了。

```js
const cssTransform = (rotation, scaleX, scaleY, translateX, translateY) => {
  const sin = Math.sin(rotation);
  const cos = Math.cos(rotation);
  return [
    cos * scaleX, - sin * scaleX,
    sin * scaleY,   cos * scaleY,
    translateX, translateY
  ];
}
```

Test:

<div style="background:url(/img/huaji.png);width:30px;height:30px;display:inline-block;" id="huaji"></div>

Rotation:
<input type="range" oninput="cssinput()" id="css-rotation" value="0">

ScaleX:
<input type="range" oninput="cssinput()" id="css-scalex" value="50">

ScaleY:
<input type="range" oninput="cssinput()" id="css-scaley" value="50">

TranslateX:
<input type="range" oninput="cssinput()" id="css-translatex" value="50">

TranslateY:
<input type="range" oninput="cssinput()" id="css-translatey" value="50">

<script type="text/javascript">
const $ = (id) => document.getElementById(id);
const cssTransform = (rotation, scaleX, scaleY, translateX, translateY) => {
  const sin = Math.sin(rotation);
  const cos = Math.cos(rotation);
  return [
    cos * scaleX, - sin * scaleX,
    sin * scaleY,   cos * scaleY,
    translateX, translateY
  ];
}
const cssinput = () => {
  const r = $('css-rotation').value / 50 * Math.PI;
  const sx = $('css-scalex').value / 50;
  const sy = $('css-scaley').value / 50;
  const tx = $('css-translatex').value - 50;
  const ty = $('css-translatey').value - 50;
  $('huaji').style.transform = `matrix(${cssTransform(r, sx, sy, tx, ty)})`;
}
</script>

## Canvas

canvas 同样也提供了 transform 函数用来进行变换。

**但是，变换的目标是画布而不是对象。**

也就是说，同样的参数在 css 中是自转，到 canvas 中就变成绕原点公转了。

所以你需要写一个相对变换的函数。

根据仔细的思考，我们发现 rotation 和 scale 是不用变的，需要求的是新的 translation。

所以很快就能写出这么一个函数。

```js
const canvasTransform = (x, y, w, h, r, sx, sy, tx, ty) => {
  const sin = Math.sin(r);
  const cos = Math.cos(r);
  const cx = x + w / 2;
  const cy = y + h / 2;
  const nx = cos * cx * sx + sin * cy * sy;
  const ny = sin * cx * sx - cos * cy * sy;
  return [ cos * sx, - sin * sx, sin * sy, cos * sy, cx - nx + tx, ny + cy + ty ];
}
```

Test:

<canvas width="200" height="200"></canvas>

Rotation:
<input type="range" oninput="canvasinput()" id="canvas-rotation" value="0">

ScaleX:
<input type="range" oninput="canvasinput()" id="canvas-scalex" value="50">

ScaleY:
<input type="range" oninput="canvasinput()" id="canvas-scaley" value="50">

TranslateX:
<input type="range" oninput="canvasinput()" id="canvas-translatex" value="50">

TranslateY:
<input type="range" oninput="canvasinput()" id="canvas-translatey" value="50">


<script type="text/javascript">
const canvasTransform = (x, y, w, h, r, sx, sy, tx, ty) => {
  const sin = Math.sin(r);
  const cos = Math.cos(r);
  const cx = x + w / 2;
  const cy = y + h / 2;
  const nx = cos * cx * sx + sin * cy * sy;
  const ny = sin * cx * sx - cos * cy * sy;
  return [ cos * sx, - sin * sx, sin * sy, cos * sy, cx - nx + tx, ny + cy + ty ];
}
const ctx = document.querySelector('canvas').getContext('2d');
const huaji = new Image();
huaji.src = '/img/huaji.png';
const canvasinput = () => {
  ctx.clearRect(0, 0, 200, 200);
  const r = $('canvas-rotation').value / 50 * Math.PI;
  const sx = $('canvas-scalex').value / 50;
  const sy = $('canvas-scaley').value / 50;
  const tx = $('canvas-translatex').value - 50;
  const ty = $('canvas-translatey').value - 50;
  ctx.setTransform(...canvasTransform(85, 85, 30, 30, r, sx, sy, tx, ty));
  ctx.drawImage(huaji, 85, 85, 30, 30);
}
huaji.onload = canvasinput;
</script>

经过个人测试，运行的效率还是可以的。

## 总结

~~Nvidia Fuck You!!!~~
