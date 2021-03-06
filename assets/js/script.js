---
layout: null
---

// Variables
var sidebar    = $("#sidebar"),
    container  = $("#post"),
    content    = $("#pjax");

// Detect window size, if less than 1280px add class "mobile" to sidebar therefore it will be auto hide when trigger the pjax request in small screen devices.
if ($(window).width() <= 1280) {
  sidebar.addClass("mobile");
}
var valine = new Valine();

$.expr[':'].external = function(obj){
    return !obj.href.match(/^mailto\:/)
           && (obj.hostname != location.hostname)
           && !obj.href.match(/^javascript\:/)
           && !obj.href.match(/^$/)
};

// Tags switcher
$("#tags-ul").on("click","li",function(event){
  $(this).addClass("active").siblings().removeClass("active");
  $(".pl-all").hide();
  $("." + $(this).attr("id")).delay(50).fadeIn(350);
});

// If sidebar has class "mobile", hide it after clicking.
$("#pl-container").on("click","a.pl-all",function() {
  $(this).addClass("active").siblings().removeClass("active");
  if (sidebar.hasClass("mobile")) {
    sidebar.removeClass("fullscreen");
    content.removeClass("fullscreen");
  }
});

$(document).mouseup(function(e){
  if(!sidebar.is(e.target) && sidebar.has(e.target).length === 0) {
    if(sidebar.hasClass("mobile") && sidebar.hasClass("fullscreen")) {
      sidebar.removeClass("fullscreen");
      content.removeClass("fullscreen");
    }
  }
});

// Enable fullscreen.
$("#js-fullscreen").on("click", function() {
  if (sidebar.hasClass("fullscreen")) {
    sidebar.removeClass("fullscreen");
    content.delay(300).queue(function(){
      $(this).removeClass("fullscreen").dequeue();
    });
  } else {
    sidebar.addClass("fullscreen");
    content.delay(200).queue(function(){
      $(this).addClass("fullscreen").dequeue();
    });
  }
});

$("#mobile-avatar").on("click", function(){
    sidebar.removeClass("fullscreen");
    content.removeClass("fullscreen");
});

//Search Box
/**
 * Created by zteliuyw on 15/5/28.
 */
$(function(){
    //搜索框文字变化时间
    $("#search-input").keyup(function(){
        //$("#s-box").hide("slow");
        var text = $("#search-input").val().toLowerCase();
        //console.log(text);
        if(text =="" || text==undefined){
            $("#pl-container").find("a").show();
        }else{
            $("#pl-container").find("a").hide();
            $(".pl-title").each(function(){
                var htmlstr = $(this).html().toLowerCase();
                if(htmlstr.indexOf(text) != -1){
                    $(this).parent().show();
                }
            });
        }
    });
});

// Pjax
$(document).pjax("#avatar, #mobile-avatar, .pl-all", "#pjax", { fragment: "#pjax", timeout: 10000 });
$(document).on({
  "pjax:click": function() {
    content.removeClass("fadeIn").addClass("fadeOut");
  },
  "pjax:start": function() {
  },
  "pjax:end": function() {
    container.scrollTop(0);
    content.removeClass("fadeOut").addClass("fadeIn");
    afterPjax();
  }
});

// Re-run scripts for post content after pjax
function afterPjax() {
  // Open links in new tab
    // https://stackoverflow.com/questions/12041935/how-to-automatically-add-target-blank-to-external-links-only
  $("a:external").attr({"rel":"noopener", "target":"_blank"});
  $(document).pjax("[href^='/']", "#pjax", { fragment: "#pjax", timeout: 10000 });

  // Smooth scrolling
  $("#markdown-toc").on("click", "a", function() {
    var target = $(this.hash);
    container.animate({scrollTop: target.offset().top + container.scrollTop() - 70}, 500, function() { });
  });

  $("#markdown-toc").find("a").each(function() {
      href = $(this).attr('href');
      $(this).attr('href', decodeURIComponent(href));
  });

  // Scrolling highlight
  $("#post").scroll(function() {
          $(":header").each(function() {
          if($(window).scrollTop() + $(window).height()/3 >= $(this).offset().top) {
              var id = $(this).attr("id");
              $("a").parent().removeClass("active");
              $("a[href='#"+id+"']").parent().addClass("active").parent().parent().addClass("active");
          }
      });
  });

  $("script[type='math/tex']").replaceWith(function() {
    var tex = $(this).html();
    return katex.renderToString(tex.replace(/%.*/g, ''), {displayMode: false});
  });
  $("script[type='math/tex; mode=display']").replaceWith(function() {
    var tex = $(this).html();
    return katex.renderToString(tex.replace(/%.*/g, ''), {displayMode: true});
  });

  {% if site.analytics.google %}
  ga('send', 'pageview', window.location.pathname);
  {% endif %}

  valine.init({
    el: "#comment" ,
    notify:false,
    verify:false,
    appId: "{{site.leancloud.app_id}}",
    appKey: "{{site.leancloud.app_key}}",
    placeholder: "LONG MAY THE SUN SHINE!",
    path:window.location.pathname,
    visitor:true,
    avatar:"retro"
  });
  var url = window.location.toString();
  var id = decodeURIComponent(url).split('#');
  if (id.length>1) {
    var target = $("#"+id[1]);
    container.delay(700).animate({scrollTop: target.offset().top + container.scrollTop() - 70}, 500, function() { });
  }
}afterPjax();

