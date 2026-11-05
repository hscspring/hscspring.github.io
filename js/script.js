(function($){
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
