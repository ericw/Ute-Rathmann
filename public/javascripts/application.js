$(function() {
  $("img,li").css({opacity:0});

  //Beginning fading in stuff if on live server if not seen the intro in 1 day
  if(true || location.href.split(".").length > 1 && !$.cookie('viewed_intro') == '1'){
    $.cookie('viewed_intro', '1', { expires: 1 });
    var logo = $("#logo");
    logo.css({opacity:1})
    logo.css("left",$(window).width()/2);
    logo.css("width",0);
    logo.show();
    logo.animate({opacity: 1.0, width: "600px"}, 2000, "easeInOutQuad", function(){
      logo.animate({opacity: 0.0}, 500, function(){
        logo.remove();

        var cnt = 0;
        $("li").animate({opacity:1},500);
        $("img").each(function(i){
          cnt += 50;
          var self = this;
          setTimeout(function() {
            $(self).animate({opacity:1},1000);
          },cnt);
        });

      });
    });
  //If develop or just already seen the intro, just show cities  
  } else {
    console.log('dev');
    //$(".cities li").show();
  }

})
