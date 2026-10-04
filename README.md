# 王德才 · 个人求职作品集网站

> 一个用于求职面试展示的个人网站，包含首页个人展示、教育背景、工作经历、项目展示、技能特长等核心区块。

## 技术栈

- 纯 HTML + CSS + JavaScript（无框架、无构建步骤）
- 字体：Fraunces（serif display）+ IBM Plex Mono（technical mono）
- 部署目标：GitHub Pages / Netlify / Vercel / Cloudflare Pages

## 项目结构

```
portfolio/
├── index.html          # 单页主文件（包含所有区块）
├── styles/
│   └── main.css        # 主题、布局、动效
├── scripts/
│   └── main.js         # 导航、滚动渐显、技能进度条
└── README.md           # 本文档
```

## 本地预览

由于使用了 Google Fonts CDN，需要一个本地服务器（直接打开 `index.html` 也能看，但字体可能加载失败）。

```bash
# Python 3
python -m http.server 8080

# Node.js (使用 npx)
npx serve

# 或者
npx http-server -p 8080
```

打开浏览器访问 <http://localhost:8080>。
