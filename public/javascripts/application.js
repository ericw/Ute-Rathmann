$(function() {
  
  // header
  var $posHead = $("#pos-head");
  var pageCount = $(".series-container").length;
  var headerWidth = $("#header").width();

  // prepare the container blocks
  function prepareForDisplay() {
    headerWidth = $("#header").width();
    $posHead.css("left",Math.floor(($(window).scrollLeft()/$(document).width())*headerWidth));
    $posHead.width(headerWidth/pageCount);
    $("#header a").width(headerWidth/pageCount);
    $("#header a:last").width($("#header a:last").width()-1);
    $(".series-container").each(function(i) {
      $(this)
        .width($("body").width())
        .css("left",($("body").width())*i);
    });    
  }
    
  $(window).scroll(function() {
    $posHead.css("left",Math.floor(($(window).scrollLeft()/$(document).width())*headerWidth));
  });
  
  prepareForDisplay();
  $(window).resize(prepareForDisplay);
  
  $("ul.thumbs li:first-child a").addClass("selected");
  
  $("a.start,a.vita,a.presse,a.kontakt").click(function() {
    scrollTo($(".series-container."+ this.className));
    return false;
  });

  $("#header a.series-link").click(function() {
    var idx = $("#header a").index(this)+1;
    scrollTo($(".series-container:nth-child("+ idx + ")"));
    return false;
  });
  
  $("a.kontakt").click(function() {
    $("#author_name").focus();
  });
  
  function scrollTo(el) {
    $('html, body').animate({
      scrollLeft: $(el).offset().left,
      scrollTop: $(el).offset().top
    }, 500,"easeOutCubic");    
  }

  function scrollDown(el) {
    $('html, body').animate({
      scrollTop: $(el).offset().top
    }, 500,"easeOutCubic");    
  }
  
  // lazy load all images after main content has loaded
  $(window).load(function() {
    $("ul.thumbs li:first-child a").click();
  });
  
  $("ul.thumbs a").click(function() {
    $(this)
      .parents(".thumbs")
        .find("a").removeClass("selected").end()
      .end()
      .addClass("selected");
    var args = $(this).attr("data").split(",");
    var $series = $(this).parents("div.series");
    var $img = $series.find(".large-image");
    
    $img.html("");
    
    // show throbber after 100ms wait for image to load
    var timer = setTimeout(function() {
      $("<div class='throbber'><div></div></div>").appendTo($img);
    },100);

    $("<img height='450'/>")
      .css({opacity:0})
      .attr("src",args[2])
      .animate({width:args[0],height:args[1]},100)
      .load(function() {
        clearTimeout(timer);
        $img.find("div").remove();
        $img.find("img").animate({opacity:1},500);
      })
      .appendTo($img);
    
    var SIDEBAR_WIDTH = 294;
    
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
  
  $(".start h1,.start h2,a.next").click(function() {
    $("#header").animate({top:0});
  });

  if($(window).scrollLeft() != 0) {
    $("#header").animate({top:0});
  }
  
  $(".more-info").click(function() {
    scrollDown($(this).parents(".series-container").find(".series-info"));
    return false;
  });

  $(".back").click(function() {
    scrollTo($(this).parents(".series-container"));
    return false;
  });
  
  $("a.prev").click(function() {
    scrollTo($(this).parents("div.series-container").prev());
    return false;
  });

  $("a.prev:first,#header a:first").click(function() {
    $("#header").animate({top:-20});
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

      var self = this;

      // wait until stuff is loaded before fading in
      $(window).load(function() {
        $(self).animate({opacity: 1.0, width: $(self).data("width")}, 800, "easeInBack",callback);
      })
    });
  }

  // kontakt form
  $("#contact-form").submit(function() {
    if($("#author_name").val() != "" && $("#author_email").val() != "" && $("#author_message").val() != "") {
      $.post("/kontakt-send",{'author[name]':$("#author_name").val(),'author[email]':$("#author_email").val(),'author[message]':$("#author_message").val()},function() {
          });
          $("#author_name,#author_email,#author_message").val("");
          $("#contact-form div strong").show().fadeOut(7000);
    } else {
      
    }
    return false;
  });

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
