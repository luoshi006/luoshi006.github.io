---
title: "A Real-Time Motion Planner with Optimization"
description: ""
lead: ""
date: 2021-10-08T11:42:18+08:00
lastmod: 2021-10-08T11:42:18+08:00
draft: false
images: [""]
tags: ["traj"]
contributors: ["luoshi006"]
menu:
  docs:
    parent: "learning"
weight: 025
---

> A Real-Time Motion Planner with Trajectory Optimization for Autonomous Vehicles -- Wenda Xu



## Abstract

首先搜索一条可行解，然后迭代优化 path 和 speed。



## Introduction

**Trajectory generation**

通常需要考虑三个约束： Kinematic, Dynamic, Road shape；

[Reactive Trajectory Generation ](/docs/learning/traj_planning/20210924_reactive_nonholonomic_traj_gen) 使用曲率多项式确保曲率变化率连续；

[Motion Planning with conform spatio lattice](/docs/learning/traj_planning/20210926_motion_planning_with_conform_spatio_lattice)  串联沿路的航点，生成轨迹；但是加速度并不连续；

[Optimal trajectory generation in Frenet frame](/docs/learning/traj_planning/20210916_optimal_traj_in_frenet_frame) 通过将横、纵向轨迹使用五次多项式描述；但是需要对每个轨迹点校验曲率，且曲率虽然连续，但是曲率的一阶导数频繁切换正负号，对方向盘控制并不友好；

**Search Algorithm**

在自动驾驶场景中，由于动态障碍物的不可预测性，启发函数通常效果一般；

若引入时间维度进行搜索，会导致搜索空间呈指数增长；

**Optimization method for planning**

如果只优化 path，对于高速场景和动态场景效果不佳；

## Algorithm Framework

算法由两部分构成： Traj Planning 和 Traj Optimization

<div align="center">
<img src="/docs/learning/traj_planning/images/2021-10-08_15-02.png" title="image" alt="alg frame" width="500"/>
</div>

### A. Trajectory Generation

Path 和 Speed 独立生成，然后组合成 Traj

#### 1) Path Generation

参考 [Motion Planning with conform spatio lattice](/docs/learning/traj_planning/20210926_motion_planning_with_conform_spatio_lattice)  中的采样方法，使用四阶多项式，保证曲率多项式在端点处连续。

##### a) Endpoint sampling

确定航点采样机制

每段路径的 $N$ 个终点均垂直于参考线；

##### b) Path model

使用四次多项式能够保证多段轨迹的拼接点处**曲率平滑**；四次多项式生成的轨迹更平滑；

由于四次多项式计算更复杂，所以，**仅用于第一段路径**；

#### 2) Speed Generation

此处，forward method/inverse method 是什么意思？

首先离散化 speed 空间，然后生成速度多项式：

$$v(s)=\rho_0 + \rho_1s + \rho_2s^2 + \rho_3s^3$$

四个约束分别是两端点的速度和加速度。所有节点处的加速度默认给 0，起点处按车的状态赋值。

### B. Cost function set

<div align="center">
<img src="/docs/learning/traj_planning/images/2021-10-08_17-13.png" title="image" alt="alg frame" width="500"/>
</div>

<div align="center">
<img src="/docs/learning/traj_planning/images/2021-10-08_17-14.png" title="image" alt="alg frame" width="500"/>
</div>

其中，$c^s_{obs}$ 和 $c^d_{obs}$ 也用于障碍物检测，使用 ref-16 中提到的快速检测方法，在 vehicle 一定阈值范围内的障碍物的代价为正无穷；附近的代价使用指数函数近似；

### C. Trajectory optimization

为保证实时性，搜索过程中的离散化是不可避免的；但是会影响结果的最优性。所以，引入优化器提升性能。

如果同时优化 path 和速度，计算复杂度较大，且维数太多不容易收敛；文章提出将 path 和 速度独立优化，通过几次迭代，能够收敛到较好结果。

#### 1) Path optimization

由于横向偏移和航向角的代价梯度很难求解，所以，采用不求解导数的单纯形法

#### 2) Speed optimization

也用单纯形法求解

### D. Optimization performance evaluation

通过实验对比，迭代求解能够有限的耗时内，获取较优的结果；

可行性验证实验对比了急转弯场景、静态障碍物绕行，超车场景；



## 结论

- 单纯形法的优化需要继续了解
