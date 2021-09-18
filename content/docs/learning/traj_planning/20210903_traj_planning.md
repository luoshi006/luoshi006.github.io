---
title: "Traj Planning"
description: ""
lead: ""
date: 2021-09-03T00:35:10+08:00
lastmod: 2021-09-03T00:35:10+08:00
draft: false
weight: 50
images: [""]
tags: ["traj"]
contributors: ["luoshi006"]
menu:
  docs:
    parent: "learning"
weight: 020
---

---
## Traj Planning

- [Real-time Trajectory Optimization for Autonomous Vehicle Racing](/docs/learning/traj_planning/20210903_rt_traj_optimization_for_racing)
    - 一篇本科论文，从汽车模型开始，介绍了怎么建模，构建 QP 问题，线性化处理；比较全面，且有代码示例；
    - 因为里面涉及到比较多 **凸优化** 的知识，所以深入阅读有门槛；
- [Optimal Trajectory Generation for Dynamic Street Scenarios in a Frenet Frame](/docs/learning/traj_planning/20210916_optimal_traj_in_frenet_frame)
    - 自动驾驶经典论文，介绍了 **Frenet 坐标系** 下的轨迹生成，并根据代价选择最优路径；
    - 基于采样的方法实现，涉及一些多项式拟合的东西；
    - 论文不是很友好，但代码比较清晰；
