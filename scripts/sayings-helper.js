'use strict';
// 把 source/sayingview/sayings.yml 暴露给模板，供首页副标题使用。
// 使用：模板里 <%- JSON.stringify(get_sayings()) %>
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

let _cache = null;
let _mtime = 0;

function load() {
  const file = path.join(hexo.source_dir, 'sayingview', 'sayings.yml');
  let stat;
  try {
    stat = fs.statSync(file);
  } catch (e) {
    return [];
  }
  if (_cache && _mtime === stat.mtimeMs) return _cache;
  try {
    const raw = fs.readFileSync(file, 'utf8');
    const data = yaml.load(raw);
    _cache = Array.isArray(data) ? data.filter((x) => x && x.text) : [];
    _mtime = stat.mtimeMs;
  } catch (e) {
    hexo.log.warn('sayings.yml parse error: ' + e.message);
    _cache = [];
  }
  return _cache;
}

hexo.extend.helper.register('get_sayings', load);
