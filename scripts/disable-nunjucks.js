'use strict';

// 全站关闭 Nunjucks 标签解析。
//
// 背景：Hexo 5+ 用 Nunjucks 解析文章中的 `{% tag %}` 和 `{{ var }}`。
// 本站不使用任何 Hexo tag（如 {% fancybox %} {% raw %} 等），
// 但大量老文章的 LaTeX 里包含 `{{...}}`，会被 Nunjucks 当成变量而报错。
// 为避免逐篇修改历史文章，这里对所有 markdown 渲染器统一关闭 Nunjucks。
//
// 实现方式：给渲染器函数挂 disableNunjucks = true。
// Hexo 在渲染时会读取 renderer.disableNunjucks 来跳过 Nunjucks 处理。
// 参考：node_modules/hexo/dist/hexo/post.js:367

hexo.on('ready', () => {
  const store = hexo.render.renderer.store || {};
  const storeSync = hexo.render.renderer.storeSync || {};
  ['md', 'markdown', 'mkd', 'mkdn', 'mdwn', 'mdtxt', 'mdtext'].forEach((ext) => {
    if (typeof store[ext] === 'function') store[ext].disableNunjucks = true;
    if (typeof storeSync[ext] === 'function') storeSync[ext].disableNunjucks = true;
  });
});
