'use strict';

(function(){
  function throttle(fun, delay) {
    var last = null
    var deferTimer = null

    return function (args) {
        var that = this
        var _args = args
        var now = +new Date()

        if (last && now < last + delay) {
          clearTimeout(deferTimer)
          deferTimer = setTimeout(function () {
            last = now
            fun.apply(that, _args)
          }, delay)
        }else {
          last = now
          fun.apply(that, _args)
        }
    }
  }

  // document ready
  $(function() {
    var $rootEL = $("html, body")

    // 展示浮动层
    function isShowFixedLayer() {
      var KV_HEIGHT = $('#kv').height(),
        SCROLL_HEIGHT = $(document).scrollTop(),
        $hideLayer = $('.j_fixed_layer');

      KV_HEIGHT <= SCROLL_HEIGHT ? $hideLayer.removeClass('hide') : $hideLayer.addClass('hide');
    }
    isShowFixedLayer();

    // 浮动菜单点击触发页面滚动
    $('.j_menu .j_menu_trigger').click(function() {
      var $triggerEl = $(this),
        triggerId = $triggerEl.data('id'),
        targetOffsetTop = $('#'+ triggerId +'').offset().top;

      $rootEL.animate({ scrollTop: targetOffsetTop - 60 }, { duration: 500, easing: "swing" });
      return false;
    })

    // 返回顶部
    $('.j_top').click(function() {
      $rootEL.animate({ scrollTop: 0 }, { duration: 500, easing: "swing" });
      return false;
    })

    function isScrollChangeFixedMenu() {
      var scrollPos,
        i,
        l,
        navItem = $('.j_menu_trigger'),
        scrollItems = [$('#track'), $('#prize'), $('#selection'), $('#rules')];
      scrollPos = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      l = navItem.length;

      for (i = 0; l > i; i++) {
        var item = scrollItems[i];
        if (scrollPos > (item.offset().top - 80)) {
          navItem.removeClass('active');
          $(navItem[i]).addClass('active');
        }
      }
    }

    var throttleScroll = throttle(isScrollChangeFixedMenu, 300)

    // 文档滚动触发浮动层变化
    $(document).scroll(function() {
      isShowFixedLayer();
      throttleScroll()
    })
  })
})();