'use strict';

// 把 atom.xml / rss2.xml 里 content 内部的相对链接（href="/..."）补成绝对链接，
// 避免 RSS 订阅器 / 公众号转载时站内互链失效。
// 只改 feed 产物，不动文章源码。

const path = require('path');

hexo.extend.filter.register('after_generate', function () {
  const url = (hexo.config.url || '').replace(/\/+$/, '');
  if (!url) return;

  const route = hexo.route;
  const targets = route
    .list()
    .filter((p) => /(^|\/)(atom|rss2?|feed)\.xml$/i.test(p));

  if (!targets.length) return;

  return Promise.all(
    targets.map((p) => {
      return new Promise((resolve, reject) => {
        const stream = route.get(p);
        let buf = '';
        stream.on('data', (chunk) => (buf += chunk));
        stream.on('end', () => {
          // 只改 href="/..."（排除 "//" 协议相对、"http" 已绝对）
          const before = buf;
          buf = buf.replace(/href="\/(?!\/)/g, `href="${url}/`);
          buf = buf.replace(/<link>\/(?!\/)/g, `<link>${url}/`);
          // content 内部的 <a href="/..."> 已被第一条覆盖
          // 兼容 src="/..."（图片等资源）
          buf = buf.replace(/src="\/(?!\/)/g, `src="${url}/`);

          if (buf !== before) {
            route.set(p, buf);
            hexo.log.info(`Absolutized feed links in: ${p}`);
          }
          resolve();
        });
        stream.on('error', reject);
      });
    })
  );
});
