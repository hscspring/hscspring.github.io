'use strict';

function removeSpansByClass(html, className) {
  const spanPattern = /<\/?span\b[^>]*>/gi;
  let output = '';
  let lastIndex = 0;
  let skipDepth = 0;
  let match;

  while ((match = spanPattern.exec(html))) {
    const tag = match[0];
    const closing = /^<\/span/i.test(tag);

    if (!skipDepth) {
      const classMatch = tag.match(/\bclass=(['"])(.*?)\1/i);
      const classes = classMatch ? classMatch[2].split(/\s+/) : [];
      if (!closing && classes.indexOf(className) !== -1) {
        output += html.slice(lastIndex, match.index);
        skipDepth = 1;
      }
    } else if (closing) {
      skipDepth -= 1;
      if (!skipDepth) lastIndex = spanPattern.lastIndex;
    } else {
      skipDepth += 1;
    }
  }

  if (!skipDepth) output += html.slice(lastIndex);
  return output;
}

function stripHtml(html) {
  const proseOnly = (html || '')
    .replace(/<h2\b[^>]*>\s*(?:Reference|References|参考文献)\s*<\/h2>[\s\S]*$/i, ' ')
    .replace(/<figure\b[^>]*class=(['"])[^'"]*\bhighlight\b[^'"]*\1[^>]*>[\s\S]*?<\/figure>/gi, ' ')
    .replace(/<pre\b[^>]*>[\s\S]*?<\/pre>/gi, ' ');

  return removeSpansByClass(proseOnly, 'katex')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<math[^>]*>[\s\S]*?<\/math>/gi, ' ')
    .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/https?:\/\/\S+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

hexo.extend.generator.register('search_json', function (locals) {
  const posts = locals.posts.sort('-date').toArray();
  const data = posts
    .filter((p) => p.published !== false)
    .map((p) => ({
      title: p.title || '',
      url: '/' + p.path,
      date: p.date ? p.date.format('YYYY-MM-DD') : '',
      tags: p.tags ? p.tags.toArray().map((t) => t.name) : [],
      categories: p.categories ? p.categories.toArray().map((c) => c.name) : [],
      content: stripHtml(p.content),
    }));

  return {
    path: 'search.json',
    data: JSON.stringify(data),
  };
});
