---
title: "Motion Planning with Conformal Spatiotemporal Lattice"
description: ""
lead: ""
date: 2021-09-26T11:35:10+08:00
lastmod: 2021-09-26T11:35:10+08:00
draft: false
images: [""]
tags: ["traj"]
contributors: ["luoshi006"]
menu:
  docs:
    parent: "learning"
weight: 024
---

---
> Motion Planning for Autonomous Driving with a Conformal Spatiotemporal Lattice  - - Matthew McNaughton

> -  [state_lattice](https://github.com/rxdu/robotnav/tree/devel/src/modules/planning/state_lattice)/src/**primitive_generator.cpp** 使用中心差分法求解 Jacobian，参考文中提到 Howard 论文

## I. Abstract

主要贡献主要是 Idea，给出一种可行的时空网格搜索方法，推迟时间相关网格的生成；同时，通过调整 Cost 能够实现跟随、超车、转弯减速等功能。

**目标场景**：有动态障碍物的结构化道路环境；




## III. Method

借用了 [Reactive Trajectory Generation ](/docs/learning/traj_planning/20210924_reactive_nonholonomic_traj_gen) 中的三阶多项式螺旋线：
$$
\begin{aligned}
\kappa(s)&=a+bs+cs^2+ds^3 \newline
\theta(s)&=\theta_0 + \int \kappa ds =\theta_0 + as+ \frac{bs^2}{2} + \frac{cs^3}{3}+ \frac{ds^4}{4}
\end{aligned}
\tag{1}
$$

明确的提到了 T. Howard 博士论文中雅克比矩阵的方法[p30]，以及 Fresnel 积分、Simpson 方法。初值通过 [Reactive Trajectory Generation ](/docs/learning/traj_planning/20210924_reactive_nonholonomic_traj_gen) 中提到的查表法获取。

对比 **五次多项式** ，可以省去验证曲线曲率可行性的步骤，而且可以设定终点曲率。



### A. Paths and Trajectories

定义 path $\tau_p$ : ${[x\ y\ \theta\ \kappa]}$ ，仅与曲线的形状有关，与时间无关。

定义路径的代价函数 $c_p(\tau_p)$ ，用于描述障碍物等代价；

### B. Spatiotemporal Lattice

直接在状态上扩展时间状态，会导致空间爆炸。所以，为节省 Graph-size，文章提出：

- 首先构建与时间无关的 Path Lattice 图
- 在搜索过程中，为每个 Lattice Vertex 分配时间和速度范围 $[t_i, t_{i+1})\times[v_j, v_{j+1})$ ，得到新的状态 $(x,y,a,\theta,k,[t_i, t_{i+1})\times[v_j, v_{j+1}))$ ，转换到 lattice 坐标： $(s,\mathscr{l},a,[t_i, t_{i+1})\times[v_j, v_{j+1}))$

### C. Why include acceleration in the state space?

在状态和 lattice vertex 中引入加速度，可以有效的表示轨迹上加减速运动的状态；而不仅仅是时间代价。

### D. Cost function

代价分为两部分：

- 只与曲线形状相关的代价 $(x\ y\ \theta\ \kappa)$；
- 与时间相关的代价 $a,t,v$；

代价描述的物理意义：

- 曲率变化率
- 横向加速度大小【舒适度】
- 指定优先选择的车道



### E. Picking the best final state

一般场景中，选取所有轨迹中代价最小的即可。

但在高速公路场景中，通常是没有 **终点** 的；在堵车场景中，每一条轨迹都无法到达终点；为 **安全** 考虑，通常要求规划的时间（minimum planning horizon）不小于 $t_h$ ，保证车辆能够在该时间内实现紧急停车，或做出合理应对行为。

选择的代价函数为：

- 抵达终点 lattice vertex $n_f$ 对应的轨迹代价 $\hat{c}(n_f)$；
- 对行驶距离更远的进行奖励 $s(n_f)$；
- 对超时的进行惩罚 $t(n_f)$；

$$ \mathop{argmin} \limits_{n_f} \left[ \hat{c}(n_f)-k_s(s(n_f))+k_t(t(n_f)) \right]\tag{6}$$

### F. World Representation

对轨迹采样得到离散点 $(x,y,t)$ ，同时以矩形包络表示车辆，进行障碍物检查；障碍物的状态与时间 $t$ 相关；



## IV. GPU Acceleration

> We now argue that an exhaustive search is necessary anyway for a driving application.

对多条轨迹进行代价计算、障碍物检查对 GPU 相对比较友好。

## V. Experimental Results

- 合适的横向加速度惩罚因子，可以实现车辆转弯时减速；
- 时间代价因子，可以让车辆适时超车；



## VI. Conclusions

因假设是高速公路场景，所以对 [5] 中的雅克比求导进行简化，作者说多项式螺旋线通过查表能够快速收敛，待验证。
