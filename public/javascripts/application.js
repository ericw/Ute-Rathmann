$(function() {
  $("img,li,#logo,#header").css({opacity:0});

  var logo = $("#logo");
  //Beginning fading in stuff if on live server if not seen the intro in 1 day
  if($("#front").length > 0 && location.href.split(".").length > 1 && !$.cookie('viewed_intro') == '1'){
    $.cookie('viewed_intro', '1', { expires: 1 });
    logo.css({opacity:1})
    logo.css("left",$(window).width()/2);
    logo.css("width",0);
    logo.show();
    logo.animate({opacity: 1.0, width: 700}, 1500, "easeInCubic", function(){
      setTimeout(function() { // delay fadeout
        logo.animate({opacity: 0.0}, 500, "easeOutCubic", function(){
          logo.remove();
          $("#header").animate({opacity: 1},500);
          fadeInImages();
        });        
      },1000);
    });
  //If develop or just already seen the intro, just show cities  
  } else {
    $("#header").css({opacity:1});
    logo.remove();
    fadeInImages();
  }

  function fadeInImages() {
    var cnt = 0;
    $("li").animate({opacity:1},500);
    $("img").each(function(i){
      cnt += 50;
      var self = this;
      setTimeout(function() {
        $(self).animate({opacity:1},1000,"easeInQuad");
      },cnt);
    });    
  }
  
  var dock = new MacStyleDock(
      document.getElementById('dock'),
      [
        {
          name      : '/images/thumbs100/Akohle1',
          extension : '.jpg',
          sizes     : [100, 130],
          onclick   : function(){
                        alert('You clicked on the first icon');
                      }
        },
        {
          name      : '/images/thumbs100/Akohle2',
          extension : '.jpg',
          sizes     : [100, 130],
          onclick   : function(){
                        alert('You clicked on the first icon');
                      }
        },
        {
          name      : '/images/thumbs100/Akohle4',
          extension : '.jpg',
          sizes     : [100, 130],
          onclick   : function(){
                        alert('You clicked on the first icon');
                      }
        },
        {
          name      : '/images/thumbs100/akt-laubbach-001',
          extension : '.jpg',
          sizes     : [100, 130],
          onclick   : function(){
                        alert('You clicked on the first icon');
                      }
        },
        {
          name      : '/images/thumbs100/akt-laubbach-002',
          extension : '.jpg',
          sizes     : [100, 130],
          onclick   : function(){
                        alert('You clicked on the first icon');
                      }
        },
        {
          name      : '/images/thumbs100/akt-030',
          extension : '.jpg',
          sizes     : [100, 130],
          onclick   : function(){
                        alert('You clicked on the second icon');
                      }
        }
      ],
      100,
      130,
      2);

  var dock = new MacStyleDock(
      document.getElementById('dock2'),
      [
        {
          name      : '/images/thumbs100/Akohle1',
          extension : '.jpg',
          sizes     : [100, 130],
          onclick   : function(){
                        alert('You clicked on the first icon');
                      }
        },
        {
          name      : '/images/thumbs100/Akohle2',
          extension : '.jpg',
          sizes     : [100, 130],
          onclick   : function(){
                        alert('You clicked on the first icon');
                      }
        },
        {
          name      : '/images/thumbs100/Akohle4',
          extension : '.jpg',
          sizes     : [100, 130],
          onclick   : function(){
                        alert('You clicked on the first icon');
                      }
        },
        {
          name      : '/images/thumbs100/akt-laubbach-001',
          extension : '.jpg',
          sizes     : [100, 130],
          onclick   : function(){
                        alert('You clicked on the first icon');
                      }
        },
        {
          name      : '/images/thumbs100/akt-laubbach-002',
          extension : '.jpg',
          sizes     : [100, 130],
          onclick   : function(){
                        alert('You clicked on the first icon');
                      }
        },
        {
          name      : '/images/thumbs100/akt-laubbach-004',
          extension : '.jpg',
          sizes     : [100, 130],
          onclick   : function(){
                        alert('You clicked on the first icon');
                      }
        },
        {
          name      : '/images/thumbs100/akt-laubbach-003',
          extension : '.jpg',
          sizes     : [100, 130],
          onclick   : function(){
                        alert('You clicked on the first icon');
                      }
        },
        {
          name      : '/images/thumbs100/akt-030',
          extension : '.jpg',
          sizes     : [100, 130],
          onclick   : function(){
                        alert('You clicked on the second icon');
                      }
        }
      ],
      100,
      130,
      2);


});