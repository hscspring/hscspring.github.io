'use strict';

const CONTENT_LIMIT = 200;

function stripHtml(html) {
  return (html || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
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
      content: stripHtml(p.content).slice(0, CONTENT_LIMIT),
    }));

  return {
    path: 'search.json',
    data: JSON.stringify(data),
  };
});
