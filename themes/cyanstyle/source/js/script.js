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

  // Caption
  $('.article-entry').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      if (alt) $(this).after('<span class="caption">' + alt + '</span>');

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
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
