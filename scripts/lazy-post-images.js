'use strict';

function addAttribute(tag, name, value) {
  const existing = new RegExp('\\s' + name + '\\s*=', 'i');
  if (existing.test(tag)) return tag;
  return tag.replace(/\/?>$/, ' ' + name + '="' + value + '"$&');
}

hexo.extend.filter.register('after_post_render', function (data) {
  if (data.layout !== 'post' || !data.content) return data;

  let imageIndex = 0;
  data.content = data.content.replace(/<img\b[^>]*>/gi, function (tag) {
    imageIndex += 1;
    if (imageIndex === 1) return tag;

    return addAttribute(addAttribute(tag, 'loading', 'lazy'), 'decoding', 'async');
  });

  return data;
});
