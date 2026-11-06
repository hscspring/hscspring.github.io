(function($){
  // Mark the current top-level navigation item.
  var currentPath = window.location.pathname.replace(/index\.html$/, '');
  $('.main-navigation .nav-menu a').each(function(){
    var linkPath = new URL(this.href, window.location.origin).pathname.replace(/index\.html$/, ''),
      isCurrent = linkPath === '/' ? currentPath === '/' : currentPath.indexOf(linkPath) === 0;
    if (isCurrent){
      $(this).parent('li').addClass('current-menu-item');
      $(this).attr('aria-current', 'page');
    }
  });

  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  $('#nav-search-btn').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function(){
    startSearchAnim();
    $searchWrap.removeClass('on');
    stopSearchAnim();
  });

  // Full-text search shared by the sidebar and the global dialog.
  var searchIndex = null,
    searchIndexPromise = null;

  var loadSearchIndex = function(){
    if (searchIndex) return Promise.resolve(searchIndex);
    if (searchIndexPromise) return searchIndexPromise;

    searchIndexPromise = fetch('/search.json')
      .then(function(response){
        if (!response.ok) throw new Error('Search index request failed');
        return response.json();
      })
      .then(function(data){
        data.forEach(function(post){
          post._title = (post.title || '').toLowerCase();
          post._tags = (post.tags || []).join(' ').toLowerCase();
          post._categories = (post.categories || []).join(' ').toLowerCase();
          post._content = (post.content || '').toLowerCase();
        });
        searchIndex = data;
        return searchIndex;
      })
      .catch(function(error){
        searchIndexPromise = null;
        throw error;
      });
    return searchIndexPromise;
  };

  var escapeSearchRegExp = function(text){
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  var escapeSearchHtml = function(text){
    return String(text || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  var highlightSearchText = function(text, terms){
    var expression = new RegExp(terms.map(escapeSearchRegExp).sort(function(a, b){
      return b.length - a.length;
    }).join('|'), 'gi');
    return escapeSearchHtml(text).replace(expression, function(match){
      return '<mark>' + match + '</mark>';
    });
  };

  var searchExcerpt = function(content, lowerContent, terms){
    if (!content) return '';
    var first = -1;
    terms.forEach(function(term){
      var index = lowerContent.indexOf(term);
      if (index !== -1 && (first === -1 || index < first)) first = index;
    });
    if (first === -1) return '';

    var start = Math.max(0, first - 46),
      end = Math.min(content.length, first + 92),
      text = content.slice(start, end);
    return (start ? '…' : '') + highlightSearchText(text, terms) + (end < content.length ? '…' : '');
  };

  $('.local-search').each(function(){
    var $search = $(this),
      $input = $search.find('.local-search-input'),
      $status = $search.find('.local-search-status'),
      $results = $search.find('.local-search-results'),
      limit = parseInt($search.attr('data-search-limit'), 10) || 8,
      timer;

    var setSearchStatus = function(message){
      $status.text(message || '');
    };

    var renderSearchResults = function(hits, query, total){
      if (!hits.length){
        $results.empty();
        setSearchStatus('无匹配结果');
        return;
      }

      var terms = query.toLowerCase().split(/\s+/).filter(Boolean),
        html = hits.map(function(hit){
          var post = hit.item,
            title = highlightSearchText(post.title, terms),
            labels = (post.tags && post.tags.length ? post.tags : post.categories || []).slice(0, 2),
            meta = (post.date || '') + (labels.length ? ' · ' + labels.join(', ') : ''),
            context = searchExcerpt(post.content, post._content, terms);
          return '<a href="' + escapeSearchHtml(post.url) + '" class="search-hit">'
            + '<div class="search-title">' + title + '</div>'
            + '<div class="search-meta">' + escapeSearchHtml(meta) + '</div>'
            + (context ? '<div class="search-excerpt">' + context + '</div>' : '')
            + '</a>';
        }).join('');

      setSearchStatus('共 ' + total + ' 条匹配，显示前 ' + hits.length);
      $results.html(html);
    };

    var runSearch = function(query){
      if (!searchIndex) return;
      if (!query){
        $results.empty();
        setSearchStatus('共 ' + searchIndex.length + ' 篇文章可搜索');
        return;
      }

      var terms = query.toLowerCase().split(/\s+/).filter(Boolean),
        hits = [];
      searchIndex.forEach(function(post){
        var searchable = post._title + ' ' + post._tags + ' ' + post._categories + ' ' + post._content;
        if (!terms.every(function(term){ return searchable.indexOf(term) !== -1; })) return;

        var score = 0;
        terms.forEach(function(term){
          if (post._title.indexOf(term) !== -1) score += 8;
          if (post._tags.indexOf(term) !== -1) score += 4;
          if (post._categories.indexOf(term) !== -1) score += 2;
          if (post._content.indexOf(term) !== -1) score += 1;
        });
        hits.push({item: post, score: score});
      });
      hits.sort(function(a, b){ return b.score - a.score; });
      renderSearchResults(hits.slice(0, limit), query, hits.length);
    };

    $input.on('input', function(){
      var query = $.trim($input.val());
      clearTimeout(timer);
      if (!query){
        $results.empty();
        setSearchStatus(searchIndex ? '共 ' + searchIndex.length + ' 篇文章可搜索' : '输入关键词开始搜索');
        return;
      }

      timer = setTimeout(function(){
        setSearchStatus('加载索引...');
        loadSearchIndex().then(function(){
          runSearch($.trim($input.val()));
        }).catch(function(){
          setSearchStatus('索引加载失败');
        });
      }, 120);
    }).on('focus', function(){
      if (!$input.val()){
        setSearchStatus(searchIndex ? '共 ' + searchIndex.length + ' 篇文章可搜索' : '输入关键词开始搜索');
      }
    });
  });

  var trapDialogFocus = function($dialog, event){
    if (event.key !== 'Tab') return;
    var $focusable = $dialog
      .find('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')
      .filter(':visible');
    if (!$focusable.length) return;

    var first = $focusable[0],
      last = $focusable[$focusable.length - 1];
    if (event.shiftKey && document.activeElement === first){
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last){
      event.preventDefault();
      first.focus();
    }
  };

  var $globalSearch = $('#global-search-dialog'),
    $globalSearchInput = $globalSearch.find('.local-search-input'),
    globalSearchPreviousFocus = null;

  var closeGlobalSearch = function(){
    if ($globalSearch.prop('hidden')) return;
    $globalSearch.prop('hidden', true);
    $('body').removeClass('global-search-open');
    $('.global-search-trigger').attr('aria-expanded', 'false');
    if (globalSearchPreviousFocus && globalSearchPreviousFocus.focus){
      globalSearchPreviousFocus.focus();
    }
  };

  $('.global-search-trigger').on('click', function(){
    globalSearchPreviousFocus = this;
    $globalSearch.prop('hidden', false);
    $('body').addClass('global-search-open');
    $(this).attr('aria-expanded', 'true');
    $('.menu-toggle.toggled-on').trigger('click');
    setTimeout(function(){ $globalSearchInput.focus(); }, 0);
  });
  $globalSearch.find('.global-search-close').on('click', closeGlobalSearch);
  $globalSearch.on('click', function(event){
    if (event.target === this) closeGlobalSearch();
  });
  $(document).on('keydown', function(event){
    if (event.key === 'Escape' && !$globalSearch.prop('hidden')){
      closeGlobalSearch();
    } else if (!$globalSearch.prop('hidden')){
      trapDialogFocus($globalSearch, event);
    }
  });

  // Reading progress for long posts, measured against the article body only.
  var $readingContent = $('.single-post .entry-content');
  if ($readingContent.length){
    var $readingProgress = $('<div class="article-reading-progress" aria-hidden="true"><span></span></div>').appendTo('body'),
      $readingProgressBar = $readingProgress.find('span'),
      readingFrame = null;

    var updateReadingProgress = function(){
      readingFrame = null;
      var contentTop = $readingContent.offset().top,
        contentHeight = $readingContent.outerHeight(),
        viewportHeight = window.innerHeight || document.documentElement.clientHeight,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop,
        readableDistance = Math.max(contentHeight - viewportHeight, 1),
        progress = Math.max(0, Math.min(1, (scrollTop - contentTop) / readableDistance)),
        isLongPost = contentHeight > viewportHeight * 1.35;

      $readingProgress.prop('hidden', !isLongPost);
      $readingProgressBar.css('transform', 'scaleX(' + progress + ')');
    };

    var requestReadingProgressUpdate = function(){
      if (readingFrame !== null) return;
      readingFrame = window.requestAnimationFrame(updateReadingProgress);
    };

    $(window).on('scroll.articleProgress resize.articleProgress load.articleProgress', requestReadingProgressUpdate);
    requestReadingProgressUpdate();
  }

  // Copy action for Hexo code blocks.
  $('.single-post figure.highlight').each(function(){
    var $block = $(this),
      $lines = $block.find('.code .line'),
      $tools = $('<div class="code-block-tools"></div>'),
      $copy = $('<button class="code-block-copy" type="button">复制</button>');

    $tools.append($copy).prependTo($block);

    var getCodeText = function(){
      if ($lines.length){
        return $lines.map(function(){ return this.textContent; }).get().join('\n');
      }
      return $block.find('.code pre, pre').first().text();
    };

    var fallbackCopyCode = function(text){
      var $textarea = $('<textarea class="code-copy-fallback" aria-hidden="true"></textarea>')
        .val(text)
        .appendTo('body')
        .select();
      var copied = false;
      try { copied = document.execCommand('copy'); } catch (error) { copied = false; }
      $textarea.remove();
      return copied ? Promise.resolve() : Promise.reject();
    };

    $copy.on('click', function(){
      var text = getCodeText(),
        copyPromise = navigator.clipboard && window.isSecureContext
          ? navigator.clipboard.writeText(text)
          : fallbackCopyCode(text);

      copyPromise.then(function(){
        $copy.text('已复制').addClass('is-copied');
        setTimeout(function(){ $copy.text('复制').removeClass('is-copied'); }, 1600);
      }).catch(function(){
        $copy.text('复制失败');
        setTimeout(function(){ $copy.text('复制'); }, 1600);
      });
    });
  });

  // Article share
  $('.article-share').each(function(){
    var $share = $(this),
      $trigger = $share.find('.article-share-trigger'),
      $panel = $share.find('.article-share-panel'),
      $copy = $share.find('.article-share-copy'),
      $shareX = $share.find('.article-share-x'),
      $qrToggle = $share.find('.article-share-qr-toggle'),
      $qrSave = $share.find('.article-share-qr-save'),
      $qr = $share.find('.article-share-qr'),
      $qrCode = $share.find('.article-share-qr-code'),
      $status = $share.find('.article-share-status'),
      url = $share.attr('data-share-url'),
      title = $share.attr('data-share-title'),
      qrRendered = false,
      statusTimer;

    $shareX.attr('href', 'https://x.com/intent/post?text=' + encodeURIComponent(title) + '&url=' + encodeURIComponent(url));

    var setStatus = function(message){
      clearTimeout(statusTimer);
      $status.text(message);
      if (message){
        statusTimer = setTimeout(function(){
          $status.text('');
        }, 2200);
      }
    };

    var setPanelOpen = function(open){
      $panel.prop('hidden', !open);
      $trigger.attr('aria-expanded', open ? 'true' : 'false');
    };

    var copyUrl = function(){
      if (navigator.clipboard && window.isSecureContext){
        return navigator.clipboard.writeText(url);
      }

      return new Promise(function(resolve, reject){
        var textarea = document.createElement('textarea');
        textarea.value = url;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy') ? resolve() : reject();
        } catch (error){
          reject(error);
        }
        document.body.removeChild(textarea);
      });
    };

    $trigger.on('click', function(){
      var useNativeShare = navigator.share && window.matchMedia && window.matchMedia('(max-width: 767px)').matches;

      if (useNativeShare){
        navigator.share({title: title, url: url}).catch(function(error){
          if (error && error.name !== 'AbortError'){
            setPanelOpen(true);
          }
        });
        return;
      }

      setPanelOpen($panel.prop('hidden'));
    });

    $copy.on('click', function(){
      copyUrl().then(function(){
        setStatus('链接已复制');
      }).catch(function(){
        setStatus('复制失败，请从地址栏复制');
      });
    });

    $qrToggle.on('click', function(){
      var open = $qr.prop('hidden');

      if (open && !qrRendered){
        if (window.QRCode){
          new QRCode($qrCode[0], {
            text: url,
            width: 168,
            height: 168,
            colorDark: '#222222',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.M
          });
          $qrCode.find('img').attr('alt', '本文链接二维码');
          qrRendered = true;
        } else {
          setStatus('二维码组件加载失败');
          return;
        }
      }

      $qr.prop('hidden', !open);
      $qrToggle.attr('aria-expanded', open ? 'true' : 'false').text(open ? '收起二维码' : '显示二维码');
    });

    $qrSave.on('click', function(){
      var canvas = $qrCode.find('canvas')[0];

      if (!canvas){
        setStatus('二维码尚未生成');
        return;
      }

      canvas.toBlob(function(blob){
        if (!blob){
          setStatus('二维码导出失败');
          return;
        }

        var file;
        try {
          file = new File([blob], 'yam-gift-qrcode.png', {type: 'image/png'});
        } catch (error){
          file = null;
        }

        if (file && navigator.share && navigator.canShare && navigator.canShare({files: [file]})){
          navigator.share({
            files: [file],
            title: title,
            text: title
          }).catch(function(error){
            if (error && error.name !== 'AbortError'){
              setStatus('系统分享失败，请尝试保存二维码');
            }
          });
          return;
        }

        var objectUrl = URL.createObjectURL(blob),
          link = document.createElement('a');
        link.href = objectUrl;
        link.download = 'yam-gift-qrcode.png';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function(){
          URL.revokeObjectURL(objectUrl);
        }, 1000);
        setStatus('二维码已保存或打开');
      }, 'image/png');
    });

    $(document).on('click', function(event){
      if (!$share[0].contains(event.target)){
        setPanelOpen(false);
      }
    }).on('keydown', function(event){
      if (event.key === 'Escape'){
        setPanelOpen(false);
      }
    });
  });

  // Article image viewer
  var $articleImages = $('.single-post .entry-content img').filter(function(){
    var $link = $(this).closest('a');
    if (!$link.length) return true;

    var imageUrl = this.currentSrc || this.src,
      linkUrl = $link[0].href;
    return linkUrl === imageUrl;
  });

  if ($articleImages.length){
    var lightboxHtml = [
      '<div class="article-image-lightbox" hidden role="dialog" aria-modal="true" aria-label="图片查看器">',
        '<div class="article-image-lightbox-toolbar">',
          '<button class="article-image-lightbox-original" type="button">查看原图</button>',
          '<button class="article-image-lightbox-close" type="button" aria-label="关闭图片">关闭</button>',
        '</div>',
        '<div class="article-image-lightbox-stage">',
          '<img src="" alt="">',
        '</div>',
        '<p class="article-image-lightbox-caption"></p>',
      '</div>'
    ].join(''),
      $lightbox = $(lightboxHtml).appendTo('body'),
      $lightboxStage = $lightbox.find('.article-image-lightbox-stage'),
      $lightboxImage = $lightbox.find('img'),
      $lightboxCaption = $lightbox.find('.article-image-lightbox-caption'),
      $lightboxOriginal = $lightbox.find('.article-image-lightbox-original'),
      $lightboxClose = $lightbox.find('.article-image-lightbox-close'),
      previousFocus = null;

    var setOriginalSize = function(original){
      $lightboxStage.toggleClass('is-original', original);
      $lightboxImage.toggleClass('is-original', original);
      $lightboxOriginal.text(original ? '适应屏幕' : '查看原图').attr('aria-pressed', original ? 'true' : 'false');
      if (!original){
        $lightboxStage.scrollTop(0).scrollLeft(0);
      }
    };

    var openLightbox = function(image){
      var source = image.currentSrc || image.src,
        alt = image.alt || '';

      previousFocus = document.activeElement;
      setOriginalSize(false);
      $lightboxImage.attr({src: source, alt: alt});
      $lightboxCaption.text(alt).toggle(!!alt);
      $lightbox.prop('hidden', false);
      $('body').addClass('article-image-lightbox-open');
      $lightboxClose.focus();
    };

    var closeLightbox = function(){
      $lightbox.prop('hidden', true);
      $lightboxImage.attr({src: '', alt: ''});
      $('body').removeClass('article-image-lightbox-open');
      if (previousFocus && previousFocus.focus){
        previousFocus.focus();
      }
    };

    $articleImages.each(function(){
      $(this).addClass('article-image-zoom').attr({
        tabindex: '0',
        role: 'button',
        'aria-label': (this.alt ? this.alt + '，' : '') + '点击查看大图'
      });
    }).on('click', function(event){
      event.preventDefault();
      openLightbox(this);
    }).on('keydown', function(event){
      if (event.key === 'Enter' || event.key === ' '){
        event.preventDefault();
        openLightbox(this);
      }
    });

    $lightboxOriginal.on('click', function(){
      setOriginalSize(!$lightboxImage.hasClass('is-original'));
    });
    $lightboxImage.on('click', function(){
      setOriginalSize(!$lightboxImage.hasClass('is-original'));
    });
    $lightboxStage.on('click', function(event){
      if (event.target === this){
        closeLightbox();
      }
    });
    $lightboxClose.on('click', closeLightbox);
    $lightbox.on('click', function(event){
      if (event.target === this){
        closeLightbox();
      }
    });
    $(document).on('keydown', function(event){
      if (event.key === 'Escape' && !$lightbox.prop('hidden')){
        closeLightbox();
      } else if (!$lightbox.prop('hidden')){
        trapDialogFocus($lightbox, event);
      }
    });
  }

  // Mobile nav
  var $container = $('#container'),
    isMobileNavAnim = false,
    mobileNavAnimDuration = 200;

  var startMobileNavAnim = function(){
    isMobileNavAnim = true;
  };

  var stopMobileNavAnim = function(){
    setTimeout(function(){
      isMobileNavAnim = false;
    }, mobileNavAnimDuration);
  }

  $('#main-nav-toggle').on('click', function(){
    if (isMobileNavAnim) return;

    startMobileNavAnim();
    $container.toggleClass('mobile-nav-on');
    stopMobileNavAnim();
  });

  $('#wrap').on('click', function(){
    if (isMobileNavAnim || !$container.hasClass('mobile-nav-on')) return;

    $container.removeClass('mobile-nav-on');
  });
  
    // link
    var $linkUl = $('#link-list');
    var $list = $('#link-list li');
    $linkUl.empty();
    var count = $list.length;
    for(var i = 0; i < count; i++)
    {
        var ran = Math.floor(Math.random() * $list.length);
        $linkUl.append($list.eq(ran));
        $list.splice(ran, 1);
    }
})(jQuery);
