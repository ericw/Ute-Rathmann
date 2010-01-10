$(function() {

  // prepare the container blocks
  function prepareForDisplay() {
    $(".series-container").each(function(i) {
      $(this)
        .width($("body").width())
        .css("left",($("body").width()+100)*i);
    });    
  }
  
  var $posHead = $("#pos-head");
  var pageCount = $(".series-container").length;
  var headerWidth = $("#header").width();
  $posHead.width(headerWidth/pageCount);
  $("#header a").width((headerWidth/pageCount));
  
  $(window).scroll(function() {
    var percentage = $(window).scrollLeft();
    var bod = $(document).width();
    $posHead.css("left",(percentage/bod)*$("#header").width());
  });
  
  prepareForDisplay();
  $(window).resize(prepareForDisplay);
  
  $("ul.thumbs li:first-child a").addClass("selected");
  
  $("a.start,a.vita,a.presse,a.kontakt").click(function() {
    scrollTo($(".series-container."+ this.className));
    return false;
  });

  $("#header a.series-link").click(function() {
    var idx = $("#header a").index(this)-2;
    scrollTo($(".series-container:nth-child("+ idx + ")"));
    return false;
  });
  
  $("a.kontakt").click(function() {
    $("#author_name").focus();
  });
  
  function scrollTo(el) {
    $('html, body').animate({
      scrollLeft: $(el).offset().left
    }, 500,"easeOutCubic");    
  }
  
  $("ul.thumbs a").click(function() {
    $(this)
      .parents(".thumbs")
        .find("a").removeClass("selected").end()
      .end()
      .addClass("selected");
    var args = $(this).attr("data").split(",");
    var $series = $(this).parents("div.series");
    var $img = $series.find("img.large");
    
    var SIDEBAR_WIDTH = 294;
    
    $img
      .animate({width:args[0],height:args[1]},"fast")
      .attr("src",args[2]);

    $series
      .animate({width:parseInt(args[0])+SIDEBAR_WIDTH,height:parseInt(args[1])+40},"fast")
      .css('overflow', 'visible');
    
    // set image metadata
    $series
      .find(".info:first h4").html(args[3]).end()
      .find(".info:first dd:nth-child(2)").html(args[4]).end()
      .find(".info:first dd:nth-child(4)").html(args[5]).end()
      .find(".info:first dd:nth-child(6)").html(args[6]);
    
    return false;
  });
  
  $("a.next, a[href=#next], .start h1, .start h2").click(function() {
    scrollTo($(this).parents("div.series-container").next());
    return false;
  });
  $("a.prev").click(function() {
    scrollTo($(this).parents("div.series-container").prev());
    return false;
  });

  //Beginning fading in logo if on live server if not seen the intro in 1 day
  if(true || location.href.split(".").length > 1 && !$.cookie('viewed_intro') == '1'){
    $.cookie('viewed_intro', '1', { expires: 1 });
    $("a[href=#next]:first").css({opacity:0});
    $.each($(".start h1, .start h2"),function(i) {
      $(this).data("width",$(this).width());
      var callback = i == 0 ? null : function() {$("a[href=#next]:first").animate({opacity:1},800,"easeInExpo");};
      $(this)
        .css({opacity:0,width:0})
        .animate({opacity: 1.0, width: $(this).data("width")}, 800, "easeInBack",callback);
    });
  }

  // function fadeInImages() {
  //   var cnt = 0;
  //   $("li").animate({opacity:1},500);
  //   $("img").each(function(i){
  //     cnt += 50;
  //     var self = this;
  //     setTimeout(function() {
  //       $(self).animate({opacity:1},1000,"easeInQuad");
  //     },cnt);
  //   });    
  // }

});
