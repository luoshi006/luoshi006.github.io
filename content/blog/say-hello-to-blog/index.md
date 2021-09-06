---
title: "Say hello to my Blog 👋"
description: ""
lead: "hello world."
date: 2021-09-03T00:35:10+08:00
lastmod: 2021-09-03T00:35:10+08:00
draft: false
weight: 50
images: [""]
contributors: ["luoshi006"]
---
---
## load image test
- Markdown
    - ![md_img](image/no.jpg)
- Html adjust size
    - <img src="image/no.jpg" title="image" alt="1 title" width="100"/>
- float image
    - <img src="image/no.jpg" title="image" alt="1 title" width="100" style="float: left;margin:0 20px 10px 0"/>text on the right<br><br>float with html<br><br><br>
### Image path

> [https://stackoverflow.com/questions/56750481/wrong-path-with-images-on-hugo-page](https://stackoverflow.com/questions/56750481/wrong-path-with-images-on-hugo-page)

对于如下的目录结构，图像分别位于 `page bundle` 页面目录和 `static` 目录
```md
├── content
│   └── path
│       └── page-name
│           ├── images
│           │   └── Image1.png
│           └── index.md
├── static
│   └── images
│       └── Image1.png
```
可通过如下方式引用图片
```html
<!-- page bundle image -->
![Image1](/path/page-name/images/Image1.png)

<!-- static image -->
![Image1](/images/Image1.png)
```
