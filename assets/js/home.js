$(document).ready(function(){

  var prevScrollTop;

  var $body = $('body');
  var $header = $('#main-header');
  var $intro = $('#section-intro');


  setTimeout(function () {
    $body.addClass('loading');

    setTimeout(function () {
      $body.addClass('loaded');
    }, 1000)

  }, 400);












  function getScrollTop(){
    var scrollTop;

    if(window.pageYOffset){
      scrollTop = window.pageYOffset;
    }else{
      scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    }

    return scrollTop;
  }



  function loop(){
    var scrollTop = getScrollTop();


    if(scrollTop > $intro.height() + 10){
      $header.addClass('trans');

      if(scrollTop < prevScrollTop) {
        $header.addClass('show');
      }
      else if(scrollTop > prevScrollTop){
        $header.removeClass('show');
      }

    } else{
      $header.removeClass('show');
    }



    if(scrollTop < 100) {
      $header.removeClass('fixed');
      $header.removeClass('trans');
    }
    else {
      $header.addClass('fixed');
    }

    prevScrollTop = scrollTop;

    requestAnimationFrame(loop);
  }

  loop();





});