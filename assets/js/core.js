$(document).ready(function(){

  var prevScrollTop;
  var homeValueLoad = false;

  var $header = $('#main-header');
  var windowHeight = $(window).height();

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


    if($('#value-proposition').length > 0) {

      if(scrollTop > $('#section-intro > div.intro > div.content > div > h1').offset().top && !homeValueLoad) {

        homeValueLoad = true;
        console.log(1);
        var objects = document.getElementsByClassName('value-icon');

        for(var i = 0; i < objects.length; i++)
        {
          var svgDoc = objects[i].contentDocument;
          var styleElement = svgDoc.createElementNS("http://www.w3.org/2000/svg", "style");
          styleElement.textContent = ".cls-1 ,.cls-2,.cls-3,.cls-4, .cls-5, .cls-6{ animation: dash 7s linear normal; -webkit-animation-fill-mode: forwards; }";
          svgDoc.getElementsByTagName('defs')[0].appendChild(styleElement);
        }
      }
    }


    if(scrollTop > windowHeight + 10){
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




  setTimeout(function () {
    loop();
  }, 1000);





});