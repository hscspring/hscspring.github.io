---
title: 观点
date: 2025-12-23 08:00:00
---

<div id="sv-root">
  <div class="sv-toolbar">
    <span class="sv-counter"><span id="sv-index">–</span> / <span id="sv-total">–</span></span>
    <div class="sv-actions">
      <button type="button" id="sv-prev" class="sv-btn" title="上一条（←）">‹ 上一条</button>
      <button type="button" id="sv-random" class="sv-btn sv-btn-primary" title="随机（空格）">随机一条</button>
      <button type="button" id="sv-next" class="sv-btn" title="下一条（→）">下一条 ›</button>
      <button type="button" id="sv-auto" class="sv-btn sv-btn-ghost" title="自动播放（每 8 秒）">自动播放</button>
    </div>
  </div>

  <div class="sv-card" id="sv-card">
    <div class="sv-quote-mark">&ldquo;</div>
    <blockquote class="sv-text" id="sv-text">正在加载…</blockquote>
    <div class="sv-comment" id="sv-comment" hidden></div>
    <div class="sv-tags" id="sv-tags"></div>
    <div class="sv-meta">
      <span class="sv-source" id="sv-source"></span>
      <span class="sv-date" id="sv-date"></span>
    </div>
  </div>

  <p class="sv-hint">提示：按 <kbd>空格</kbd> 随机，<kbd>←</kbd> / <kbd>→</kbd> 切换。</p>
</div>

<style>
#sv-root {
  max-width: 760px;
  margin: 1.2em auto 2em;
  font-family: inherit;
}
#sv-root .sv-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 14px;
}
#sv-root .sv-counter {
  color: #888;
  font-size: 14px;
  letter-spacing: 0.5px;
}
#sv-root .sv-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
#sv-root .sv-btn {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid rgba(81, 165, 168, 0.4);
  background: rgba(255, 255, 255, 0.6);
  color: rgb(81, 165, 168);
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 14px;
  cursor: pointer;
  transition: background .18s ease, color .18s ease, transform .18s ease, box-shadow .18s ease;
  line-height: 1.4;
}
#sv-root .sv-btn:hover {
  background: rgb(81, 165, 168);
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(81, 165, 168, 0.25);
}
#sv-root .sv-btn[disabled] {
  opacity: .5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
#sv-root .sv-btn-primary {
  background: rgb(81, 165, 168);
  color: #fff;
}
#sv-root .sv-btn-primary:hover {
  background: rgb(64, 146, 149);
}
#sv-root .sv-btn-ghost.sv-active {
  background: #f0a500;
  border-color: #f0a500;
  color: #fff;
}
#sv-root .sv-card {
  position: relative;
  background: #fff;
  border-radius: 14px;
  padding: 44px 40px 28px;
  min-height: 200px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(81, 165, 168, 0.15);
  transition: opacity .28s ease, transform .28s ease;
  opacity: 1;
  transform: translateY(0);
}
#sv-root .sv-card.sv-leaving {
  opacity: 0;
  transform: translateY(6px);
}
#sv-root .sv-quote-mark {
  position: absolute;
  top: -8px;
  left: 20px;
  font-size: 84px;
  line-height: 1;
  color: rgba(81, 165, 168, 0.18);
  font-family: Georgia, "Times New Roman", serif;
  user-select: none;
  pointer-events: none;
}
#sv-root .sv-text {
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: 22px;
  line-height: 1.75;
  color: #2b2b2b;
  font-weight: 500;
}
#sv-root .sv-comment {
  margin-top: 14px;
  padding: 10px 14px;
  background: rgba(81, 165, 168, 0.06);
  border-left: 3px solid rgba(81, 165, 168, 0.5);
  color: #555;
  font-size: 14px;
  line-height: 1.7;
  font-style: italic;
  border-radius: 4px;
}
#sv-root .sv-tags {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
#sv-root .sv-tag {
  display: inline-block;
  padding: 2px 10px;
  background: rgba(81, 165, 168, 0.1);
  color: rgb(81, 165, 168);
  border-radius: 999px;
  font-size: 12px;
  line-height: 1.6;
}
#sv-root .sv-meta {
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
  color: #888;
  font-size: 13px;
  flex-wrap: wrap;
}
#sv-root .sv-source {
  text-align: right;
  flex: 1;
  min-width: 0;
}
#sv-root .sv-source a {
  color: rgb(81, 165, 168);
  text-decoration: none;
  border-bottom: 1px dashed rgba(81, 165, 168, 0.5);
}
#sv-root .sv-source a:hover {
  color: rgb(64, 146, 149);
  border-bottom-style: solid;
}
#sv-root .sv-date {
  color: #bbb;
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
#sv-root .sv-hint {
  margin-top: 14px;
  color: #aaa;
  font-size: 13px;
  text-align: center;
}
#sv-root .sv-hint kbd {
  background: #f3f3f3;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1px 6px;
  font-size: 12px;
  color: #555;
  font-family: Menlo, Consolas, monospace;
}
#sv-root .sv-error {
  color: #c0392b;
  font-size: 14px;
}
@media (max-width: 560px) {
  #sv-root .sv-card { padding: 36px 22px 22px; }
  #sv-root .sv-text { font-size: 18px; line-height: 1.7; }
  #sv-root .sv-quote-mark { font-size: 64px; left: 10px; }
  #sv-root .sv-toolbar { justify-content: flex-start; }
  #sv-root .sv-meta { flex-direction: column; align-items: flex-start; }
  #sv-root .sv-source { text-align: left; }
}
</style>

<script src="https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/dist/js-yaml.min.js"></script>
<script>
(function () {
  var card = document.getElementById('sv-card');
  var textEl = document.getElementById('sv-text');
  var commentEl = document.getElementById('sv-comment');
  var tagsEl = document.getElementById('sv-tags');
  var sourceEl = document.getElementById('sv-source');
  var dateEl = document.getElementById('sv-date');
  var idxEl = document.getElementById('sv-index');
  var totalEl = document.getElementById('sv-total');
  var btnPrev = document.getElementById('sv-prev');
  var btnNext = document.getElementById('sv-next');
  var btnRandom = document.getElementById('sv-random');
  var btnAuto = document.getElementById('sv-auto');

  var quotes = [];
  var current = 0;
  var autoTimer = null;

  function disableControls(disabled) {
    [btnPrev, btnNext, btnRandom, btnAuto].forEach(function (b) {
      if (disabled) b.setAttribute('disabled', 'disabled');
      else b.removeAttribute('disabled');
    });
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function formatDate(d) {
    if (!d) return '';
    if (typeof d === 'string') return d;
    if (d instanceof Date && !isNaN(d)) {
      var y = d.getFullYear();
      var m = String(d.getMonth() + 1).padStart(2, '0');
      var day = String(d.getDate()).padStart(2, '0');
      return y + '-' + m + '-' + day;
    }
    return '';
  }

  function apply() {
    var q = quotes[current];
    if (!q) return;

    textEl.textContent = q.text || '';

    if (q.comment) {
      commentEl.textContent = '注：' + q.comment;
      commentEl.hidden = false;
    } else {
      commentEl.textContent = '';
      commentEl.hidden = true;
    }

    tagsEl.innerHTML = '';
    if (Array.isArray(q.tags)) {
      q.tags.forEach(function (t) {
        var span = document.createElement('span');
        span.className = 'sv-tag';
        span.textContent = '#' + t;
        tagsEl.appendChild(span);
      });
    }

    var parts = [];
    if (q.author) parts.push(escapeHtml(q.author));
    if (q.source) {
      if (q.url) {
        parts.push('<a href="' + escapeHtml(q.url) + '" target="_blank" rel="noopener">' + escapeHtml(q.source) + '</a>');
      } else {
        parts.push(escapeHtml(q.source));
      }
    } else if (q.url) {
      parts.push('<a href="' + escapeHtml(q.url) + '" target="_blank" rel="noopener">原文</a>');
    }
    sourceEl.innerHTML = parts.length ? '—— ' + parts.join(' · ') : '';

    dateEl.textContent = formatDate(q.date);
    idxEl.textContent = current + 1;
    card.classList.remove('sv-leaving');
  }

  function render(i, animate) {
    if (!quotes.length) return;
    if (i < 0) i = quotes.length - 1;
    if (i >= quotes.length) i = 0;
    current = i;
    if (animate) {
      card.classList.add('sv-leaving');
      setTimeout(apply, 220);
    } else {
      apply();
    }
  }

  function randomIndex() {
    if (quotes.length <= 1) return 0;
    var n;
    do { n = Math.floor(Math.random() * quotes.length); } while (n === current);
    return n;
  }

  btnPrev.addEventListener('click', function () { render(current - 1, true); });
  btnNext.addEventListener('click', function () { render(current + 1, true); });
  btnRandom.addEventListener('click', function () { render(randomIndex(), true); });
  btnAuto.addEventListener('click', function () {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
      btnAuto.classList.remove('sv-active');
      btnAuto.textContent = '自动播放';
    } else {
      autoTimer = setInterval(function () { render(randomIndex(), true); }, 8000);
      btnAuto.classList.add('sv-active');
      btnAuto.textContent = '停止播放';
    }
  });

  document.addEventListener('keydown', function (e) {
    var tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (!quotes.length) return;
    if (e.key === 'ArrowLeft') { render(current - 1, true); }
    else if (e.key === 'ArrowRight') { render(current + 1, true); }
    else if (e.key === ' ' || e.code === 'Space') { e.preventDefault(); render(randomIndex(), true); }
  });

  function init() {
    disableControls(true);
    fetch('./sayings.yml', { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.text();
      })
      .then(function (txt) {
        var data = (typeof jsyaml !== 'undefined') ? jsyaml.load(txt) : null;
        if (!Array.isArray(data) || !data.length) {
          throw new Error('观点数据为空或格式错误');
        }
        quotes = data.filter(function (q) { return q && q.text; });
        totalEl.textContent = quotes.length;
        current = Math.floor(Math.random() * quotes.length);
        disableControls(false);
        render(current, false);
      })
      .catch(function (err) {
        textEl.innerHTML = '<span class="sv-error">加载失败：' + escapeHtml(err.message) + '</span>';
        idxEl.textContent = '0';
        totalEl.textContent = '0';
      });
  }

  init();
})();
</script>
