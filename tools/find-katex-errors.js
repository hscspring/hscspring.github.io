'use strict';
// 扫描 source/ 下所有 .md，尝试用 katex 渲染里面的行内/块公式，
// 找出会报错的那一条及其所在文件位置。用法: node scripts/find-katex-errors.js
const fs = require('fs');
const path = require('path');
const katex = require('katex');

const ROOT = path.resolve(__dirname, '..', 'source');

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const s = fs.statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (/\.(md|markdown)$/i.test(name)) out.push(p);
  }
  return out;
}

// 先去掉 ``` 代码块，避免代码里的 $ 被误当成公式
function stripCodeBlocks(src) {
  return src.replace(/```[\s\S]*?```/g, (m) => m.replace(/[^\n]/g, ' '));
}

function findBlocks(src) {
  const text = stripCodeBlocks(src);
  const items = [];
  // 块公式 $$...$$（跨行）
  const blockRe = /\$\$([\s\S]+?)\$\$/g;
  let m;
  while ((m = blockRe.exec(text))) {
    items.push({ kind: 'block', latex: m[1], index: m.index });
  }
  // 行内 $...$（不跨行、不是 $$）
  const inlineRe = /(^|[^\$])\$([^\n\$]+?)\$(?!\$)/g;
  while ((m = inlineRe.exec(text))) {
    items.push({ kind: 'inline', latex: m[2], index: m.index + m[1].length });
  }
  return items;
}

function lineColOf(src, idx) {
  const before = src.slice(0, idx);
  const line = before.split('\n').length;
  const col = idx - before.lastIndexOf('\n');
  return { line, col };
}

const files = walk(ROOT);
let totalErr = 0;
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  const items = findBlocks(src);
  for (const it of items) {
    try {
      katex.renderToString(it.latex, {
        displayMode: it.kind === 'block',
        throwOnError: true,
        strict: 'ignore',
      });
    } catch (e) {
      totalErr++;
      const pos = lineColOf(src, it.index);
      const rel = path.relative(process.cwd(), f);
      console.log('----------------------------------------');
      console.log(`${rel}:${pos.line}  [${it.kind}]`);
      console.log(`  formula: ${it.latex.replace(/\n/g, '\\n').slice(0, 200)}`);
      console.log(`  error  : ${e.message}`);
    }
  }
}
console.log('========================================');
console.log(`total errors: ${totalErr}`);
