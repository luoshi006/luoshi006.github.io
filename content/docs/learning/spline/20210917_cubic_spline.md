---
title: "Cubic Spline"
description: ""
lead: ""
date: 2021-09-17T15:56:35+08:00
lastmod: 2021-09-17T15:56:35+08:00
draft: false
images: [""]
tags: ["traj"]
contributors: ["luoshi006"]
menu:
  docs:
    parent: "learning"
weight: 042
---
---

> refs: [https://mathworld.wolfram.com/CubicSpline.html](https://mathworld.wolfram.com/CubicSpline.html)

<div align="center">
<img src="https://mathworld.wolfram.com/images/eps-gif/CubicSpline_700.gif" title="image" alt="cubic_spline" width="300"/>
</div>

## Summary

三次样条曲线由分段三次多项式组成，样条曲线依次穿过控制点 $m$ 。

不同的边界条件可以产生各种样条； **"natural"** 三次样条：终点处的二阶导数置为 $0$ 。

## Flow

对于一维的情况，给定 $n+1$ 个控制点 $(y_0, y_1, ... , y_n)$ [Bartels et al.]，第 $i$ 段曲线表示为：

$$ Y_i(t) = a_i + b_i t + c_i t^2 + d_i t^3$$

其中，$t \in [0,1]$ ， $i=0, ..., n-1$

对于**三阶多项式**，构造如下方程组：

$$Y_i(0) = y_i = a_i$$

$$Y_i(1) = y_{i+1} = a_i+b_i+c_i+d_i$$

$$Y'_i(0) = D_i = b_i$$

$$Y'_i(1) = D_{i+1}=b_i+2 c_i +3 d_i$$

四个未知数，四个方程，求解可得：

$$a_i = y_i$$

$$b_i=D_i$$

$$c_i = 3(y_{i+1}-y_i)-2D_i-D_{i+1}$$

$$d_i = 2(y_i-y_{i+1})+D_i+D_{i+1}$$

---

对于**分段曲线**，要求二阶导连续，则对于内部点：

$$Y_{i-1}(1)= y_i$$

$$Y'_{i-1}(1)=Y'_i(0)$$

$$Y_i(0) = y_i$$

$$Y''_{i-1}(1) = Y''_i(0)$$

对于端点：

$$Y_0(0) = y_0$$

$$Y_{n-1}(1)=y_n$$

$4(n-1)+2=4n-2$ 个方程，$4n$ 个未知数，所以仍需额外提供两个约束：

$$Y''_0(0) = 0$$

$$Y''_{n-1}(1) = 0$$

---

由以上公式，可以得到如下三对角系统（tridiagonal）

```md
$$\left[ \begin{matrix} 2&1&&&&& \\ 1&4&1&&&& \\ &1&4&1&&& \\ &&1&4&1&& \\ &&& \ddots & \ddots & \ddots & \\ &&&&1&4&1 \\&&&&&1&2 \end{matrix}  \right] \left[\begin{matrix} D_0\\D_1\\D_2\\D_3\\ \ddots \\D_{n-1} \\ D_n \end{matrix}\right] = \left[\begin{matrix} 3(y_1-y_0)\\3(y_2-y_0)\\3(y_3-y_1)\\ \ddots \\ 3(y_{n-1}-y_{n-3})\\3(y_n-y_{n-2}) \\ 3(y_n-y_{n-1})\end{matrix}\right]$$
```

<div align="center">
<img src="/docs/learning/spline/images/2021-09-17_19-52.png" title="image" alt="formulate" width="400"/>
</div>
如果曲线收尾相连，则

```md
$$\left[ \begin{matrix} 4&1&&&&&1 \\ 1&4&1&&&& \\ &1&4&1&&& \\ &&1&4&1&& \\ &&& \ddots & \ddots & \ddots & \\ &&&&1&4&1 \\1&&&&&1&4 \end{matrix}  \right] \left[\begin{matrix} D_0\\D_1\\D_2\\D_3\\ \ddots \\D_{n-1} \\ D_n \end{matrix}\right] = \left[\begin{matrix} 3(y_1-y_n)\\3(y_2-y_0)\\3(y_3-y_1)\\ \ddots \\ 3(y_{n-1}-y_{n-3})\\3(y_n-y_{n-2}) \\ 3(y_0-y_{n-1})\end{matrix}\right]$$
```

<div align="center">
<img src="/docs/learning/spline/images/2021-09-17_19-58.png" title="image" alt="formulate" width="400"/>
</div>