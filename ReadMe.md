# Yam Blog (hscspring.github.io)

[https://yam.gift](https://yam.gift) ｜ Powered by Hexo 7

## 仓库分布

| Repo | 可见性 | 用途 |
|---|---|---|
| `hscspring/hscspring.github.io` | 公开 | Hexo 配置 / 主题 / 自定义脚本 / `pics/` |
| `hscspring/blog-source` | **私有** | `source/` 全量备份（`_posts` + 各页面 + `og.jpg` + `CNAME`） |
| `hscspring/hscspring.github.io` (master 分支) | 公开 | `hexo d` 自动产出的 `public/` 静态站，GitHub Pages 服务它 |

> 公开 repo 的 `.gitignore` 排除 `source/`，所以源文是私密的；构建产物（已渲染好的 HTML）则全公开。

## 日常工作流（写完文章后）

```bash
# 1) 备份 source 到私有库
cd source
git add .
git commit -m "新文章: xxx"
git push

# 2) 构建 + 部署博客
cd ..
nvm use            # 切到 .nvmrc 指定的 Node 22
hexo g -d
```

> 如果忘了 push source 直接 `hexo g -d`，对线上网站没影响（部署的是 `public/`）；只是私有库当天的备份会缺，下次记得补 push。

## 新机器初次拉取

```bash
git clone git@github.com:hscspring/hscspring.github.io.git
cd hscspring.github.io
git clone git@github.com:hscspring/blog-source.git source
nvm install        # 按 .nvmrc 装 Node 22.21.1
npm i
npx hexo g         # 验证能 build 出来
```

## 关键技术决策

- **Node 版本**：22.21.1（见 `.nvmrc`），早期是 12，2025 年升级
- **Markdown 渲染**：`hexo-renderer-markdown-it` + `@renbaoshuo/markdown-it-katex` 插件，**服务端预渲染公式**，KaTeX CSS 通过 CDN 加载
- **公式书写**：`$inline$` 行内 + `$$display$$` 块级，注意 LaTeX 内部用半角括号；Nunjucks 已通过 `scripts/disable-nunjucks.js` 全局禁用，避免 `{{ }}` 冲突
- **首页副标题**：`themes/cyanstyle/layout/_partial/header.ejs` 在构建期从 `source/sayingview/sayings.yml` 随机抽取一句（替代了原来的 hitokoto.us）
- **本地搜索**：`scripts/search-generator.js` 构建期生成 `search.json`，侧栏 `_widget/search.ejs` 原生 JS 懒加载，无第三方依赖
- **评论**：Waline，自托管在 Vercel + LeanCloud，绑域名 `comment.yam.gift`（与 toolhub 共用同一后端）。前端走 jsDelivr CDN。配置项见 `themes/cyanstyle/_config.yml` 的 `waline.serverURL`
- **自定义域名**：`source/CNAME` 在 `_config.yml` 的 `skip_render` 中，每次 build 自动复制到 `public/CNAME`
- **OG 封面**：`source/og.jpg`（站点级别），`_config.yml` 里 `image: https://yam.gift/og.jpg`

## 常见坑

- **公式里出现 `{#` 等被 markdown-it 当注释处理**：用空格隔开或转义
- **KaTeX 报 `unicodeTextInMathMode` 警告**：math block 里的中文全角括号 `（）` 改成半角 `()`
- **`hexo g` 报 Nunjucks 错误**：`scripts/disable-nunjucks.js` 应该已经搞定了；如果还出现，检查脚本是否被误删
- **诊断 KaTeX 错误**：`node tools/find-katex-errors.js` 可定位具体出错的文章

## 文件用途

| 路径 | 说明 |
|---|---|
| `scripts/disable-nunjucks.js` | 禁用 Nunjucks 解析，避免 LaTeX 与模板语法冲突 |
| `scripts/sayings-helper.js` | 注册 `get_sayings()` helper，构建期读 `sayings.yml` |
| `scripts/search-generator.js` | 生成 `search.json` 索引 |
| `tools/find-katex-errors.js` | 一次性诊断脚本，找 KaTeX 渲染错误 |
| `add_ref.py` | 给 markdown 链接加上标引用编号的小工具 |
