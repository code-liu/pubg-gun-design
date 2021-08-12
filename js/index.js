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
      var winPos = $(window).scrollTop(),
        NodePos = [
          $('#track').offset().top - 70,
          $('#prize').offset().top - 70,
          $('#selection').offset().top - 70,
          $('#rules').offset().top - 70
        ],
        length = NodePos .length; 

      if (winPos <= NodePos[1]) {
        $('.j_menu_trigger').removeClass('active');
        $('.j_menu_trigger:nth-child(1)').addClass('active');
      } else {
        for (var i = 1; i < length; i++) {
          if ((i < length -1 && winPos < NodePos[i+1] && winPos >= NodePos[i]) || (i == length -1 && winPos <= NodePos[i])) {
            $('.j_menu_trigger').removeClass('active');
            $('.j_menu_trigger:nth-child('+ (i + 1) +')').addClass('active');
            break;
          }
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