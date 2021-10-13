---
title: "Learning Introduction"
description: ""
lead: ""
date: 2021-09-03T00:35:10+08:00
lastmod: 2021-09-03T00:35:10+08:00
draft: false
images: [head.jpg]
menu:
  docs:
    parent: "learning"
weight: 010
toc: true
---

### [Traj Planning](/docs/learning/traj_planning/20210903_traj_planning)
##### · [Real-time Trajectory Optimization for Autonomous Vehicle Racing](/docs/learning/traj_planning/20210903_rt_traj_optimization_for_racing)
  - 一篇本科论文，从汽车模型开始，介绍了怎么建模，构建 QP 问题，线性化处理；比较全面，且有代码示例；
  - 因为里面涉及到比较多 **凸优化** 的知识，所以深入阅读有门槛；
##### · [Optimal Trajectory Generation for Dynamic Street Scenarios in a Frenet Frame](/docs/learning/traj_planning/20210916_optimal_traj_in_frenet_frame)
- 自动驾驶经典论文，介绍了 **Frenet 坐标系** 下的轨迹生成，并根据代价选择最优路径；
- 基于采样的方法实现，涉及一些多项式拟合的东西；
- 论文不是很友好，但代码比较清晰；

##### · [Reactive Nonholonomic Trajectory Generation via Parametric Optimal Control](/docs/learning/traj_planning/20210924_reactive_nonholonomic_traj_gen)
- 论文很难懂
- 主要贡献在于 **三阶曲率多项式** 的公式推导及求解
- Apollo EM planner 引用过
##### · [Motion Planning for Autonomous Driving with a Conformal Spatiotemporal Lattice](/docs/learning/traj_planning/20210926_motion_planning_with_conform_spatio_lattice)
- 使用 **三阶曲率多项式** ，并引用了 **Thomas M. Howard** 博士论文中对雅克比求导的方法；
- 给出一种可行的时空网格（Lattice Vertex）构造和 **搜索** 方法，Apollo 引用文献；
- 给出来高速公路场景下的仿真结果，可以实现超车、换道、转弯减速；
##### [A Real-Time Motion Planner with Trajectory Optimization for Autonomous Vehicles](/docs/learning/traj_planning/20211008_realtime_motion_planner_with_optimization)
- Apollo EM-planner 参考文献
- 通过状态空间采样，得到轨迹初值；并生成速度曲线
- 循环迭代优化 path 和speed，减小计算量


### Spline
  - [cubic_spline](/docs/learning/spline/20210917_cubic_spline) 简单描述了常见的 **三次样条曲线**
