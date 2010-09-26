$(function() {
  // header
  var $posHead = $("#pos-head");
  var pageCount = $(".series-container").length;
  var headerWidth = $("#header").width();

  // prepare the container blocks
  function prepareForDisplay() {
    if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      $("body").css({'overflowX':'auto'});
    };
    headerWidth = $("#header").width();
    $posHead.css("left",Math.floor(($(window).scrollLeft()/$(document).width())*headerWidth));
    $posHead.width(headerWidth/pageCount);
    $("#header a").width(headerWidth/pageCount);
    $("#header a:last").width($("#header a:last").width()-1);
        
    $(".series-container").each(function(i) {
      $(this)
        .width($("body").width())
        .css("left",($("body").width())*i);
      if(!(navigator.appName.indexOf("Microsoft")!=-1)) {
        $(this)
          .css("padding-top",(window.innerHeight/2)-400); // adjust for large windows        
      }
    });
  }

  $(window).scroll(function() {
    $posHead.css("left",Math.floor(($(window).scrollLeft()/$(document).width())*headerWidth));
  });
  
  prepareForDisplay();
  $(window).resize(prepareForDisplay);
  
  $("ul.thumbs li:first-child a").addClass("selected");
  
  $("a.start,a.vita,a.presse,a.kontakt").click(function() {
    if(history.pushState) {
      history.pushState({},"Ute Rathmann",$(this).attr("href"));
    }    
    scrollTo($(".series-container."+ this.className));
    return false;
  });

  $("#header a.series-link").click(function() {
    var idx = $("#header a").index(this)+1;
    scrollTo($(".series-container:nth-child("+ idx + ")"));
    if(history.pushState) {
      history.pushState({},"Ute Rathmann",$(this).attr("href"));
    }
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
    // eliminate buggy flickyness
    $(".series-container").css({'visibility':'visible'});
    
    //lazy load images
    $("ul.thumbs li:first-child a").each(function() { // :first for ie
      loadImage(this);
    });

    // check if to navigate to an image, etc
    if(location.pathname.search(/images/) != -1) {
      var $imgLink = $("ul.thumbs a[href=" + location.pathname + "]");
      var $imgSeries = $imgLink.parents(".series-container");
      $("#header").animate({top:0});
      // if it's the first image in a series it's already being loaded, so no need to load again
      if($imgLink.parents("li").prev().length != 0) {
        loadImage($imgLink);        
      }
      scrollTo($imgSeries);
    } else if (location.pathname.search(/kontakt|vita|presse/) != -1) {
      scrollTo("div." + location.pathname.substr(1));      
    }
    
  });

  // html5 history
  window.onpopstate = function(ev) {
    
    if(location.pathname.search(/images/) != -1) {
      var $imgLink = $("ul.thumbs a[href=" + location.pathname + "]");
      var $imgSeries = $imgLink.parents(".series-container");
      $("#header").animate({top:0});
      $imgLink.click();
      scrollTo($imgSeries);
      $("div.throbber").remove();
    } else if (location.pathname.search(/kontakt|vita|presse/) != -1) {
      scrollTo("div." + location.pathname.substr(1));      
    } else if (location.pathname == "/") {
      $("#header").animate({top:-20});
      scrollTo("div.start");
    }
  };
  
  $("ul.thumbs a").click(function() {
    //check if pushstate and don't add entry if we're already at the same image
    var args = $(this).attr("data").split(",");
    if(history.pushState && $(this).attr("href") != location.pathname) {
      history.pushState({},"Ute Rathmann",$(this).attr("href"));
    }
    loadImage(this);
    return false;
  });

  function loadImage(imageLink) {
    $(imageLink)
      .parents(".thumbs")
        .find("a").removeClass("selected").end()
      .end()
      .addClass("selected");
    var args = $(imageLink).attr("data").split(",");
    var $series = $(imageLink).parents("div.series");
    var $img = $series.find(".large-image");
        
    $img.html("");
    
    // hide buy link if kaufen=false
    var $buyLinkHide = $series.find("span.hide-buy-link");
    args[8] == 'false' ? $buyLinkHide.addClass("hidden") : $buyLinkHide.removeClass("hidden");

    // hide dimensions if not set
    var $sizeInfo = $series.find(".size");
    args[5].length == 0 ? $sizeInfo.addClass("hidden") : $sizeInfo.removeClass("hidden");
    
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
  }

  // links under presse
  $(".presse p.links a").click(function() {
    scrollTo($($(this).attr("href")));
    return false;
  });
  
  $("a.next, a[href=#next], .start h1 a, .start h2 a").click(function() {
    var nextCont = $(this).parents("div.series-container").next();
    scrollTo(nextCont);
    if(history.pushState) {
      history.pushState({},'Ute Rathmann',$(this).attr("href"));
    }
    return false;
  });
  
  $(".start h1 a,.start h2 a,a.next").click(function() {
    $("#header").animate({top:0});
  });

  // hacky solution to check where the scroll pos is and show nav bar if not 0
  setTimeout(function() {
    if($(window).scrollLeft() != 0) {
      $("#header").animate({top:0});
    }    
  },1000);
  
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
    if(history.pushState) {
      history.pushState({},'Ute Rathmann',$(this).attr("href"));
    }
    return false;
  });

  $("a.prev:first,#header a:first").click(function() {
    $("#header").animate({top:-20});
  });

  // intro anim
  $("a[href=#next]:first").css({opacity:0});
  $.each($(".start h1, .start h2,a.next:first"),function(i) {
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
  
  // share
  $(".share-link").click(function() {
    var img = $(this).parents(".sidebar").find(".thumbs a.selected");
    var wind = window.open('http://facebook.com/sharer.php?u=http%3A%2F%2Futerathmann.com' + encodeURIComponent(img.attr('href')), "fbshare","width=600,height=350");
    //wind.moveTo(200)
    return false;
  });

  // share on twitter
  $(".share-link.twitter").click(function() {
    var img = $(this).parents(".sidebar").find(".thumbs a.selected");
    var wind = window.open('http://twitter.com/share?url=http%3A%2F%2Futerathmann.com' + encodeURIComponent(img.attr('href')), "fbshare","width=600,height=300");
    //wind.moveTo(200)
    return false;
  });

  // buy interest
  $(".buy-link").click(function() {
    var data = $(this).parents(".sidebar").find("li a.selected").attr("data").split(",");
    $("#buy_name,#buy_email,#buy_message").val("");
    $("#buy-interest p span:first").text(data[3]);    
    $("#buy-interest").fadeIn(function() {
      $("#buy-interest #buy_id").val(data[7]);
      $("#buy-interest #buy_title").val(data[3]);
      $("#buy-interest #buy_name").focus();
    });
    return false;
  });
  
  $("#buy-form").submit(function() {
    if($("#buy_name").val() != "" && $("#buy_email").val() != "" && $("#buy_message").val()) {
      $.post("/images/buy",{"buy[id]":$("#buy_id").val(),"buy[title]":$("#buy_title").val(),"buy[name]":$("#buy_name").val(),"buy[email]":$("#buy_email").val(),"buy[message]":$("#buy_message").val()},function() {
        $("#buy-interest").fadeOut();
      });      
    }
    return false;
  });

  $("#buy-interest .close, #buy-interest div a").click(function() {
    $("#buy-interest").fadeOut();
    return false;
  });
  
  // $(".series-container.vita .more-info").click(function() {
  //   scrollDown($("#ausstellungen"));
  //   return false;    
  // });

});
