$(function() {
  var cnt = 0;
  $("img").css({opacity:0});
  $("img").each(function(i){
    cnt += 50;
    var self = this;
    setTimeout(function() {
      $(self).animate({opacity:1},1000);
    },cnt);
    //logo.remove();
  });
})

// Beginning fading in stuff if on live server if not seen the intro in 1 day
//if(location.href.split(".").length > 1 && !$.cookie('viewed_intro') == '1'){
//  $.cookie('viewed_intro', '1', { expires: 1 });
  //var logo = $("#logo");
  //logo.css("top", "200px").css("left", ($(window).width()/2)-400).css("opacity", 0.0).css("width", 0);
  //logo.show();
//  logo.animate({opacity: 1.0, width: "800px"}, 1000, "easeinout", function(){
//    logo.animate({opacity: 0.0}, 2000, function(){
      // var cnt = 0;
      // $("img").each(function(i){
      //   cnt += 2000;
      //   var self = this;
      //   setTimeout(function() {
      //     $(self).fadeIn(2000);
      //   },cnt);
      //   //logo.remove();
      // });
//    });
//  });
// If develop or just already seen the intro, just show cities  
//}else{
  //$(".cities li").show();
//}