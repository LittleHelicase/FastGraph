(function(){
  var footer = $("#footer");
  var cnt = $("#content");
  var margin = Number(footer.css("margin-top").replace(/[^-\d\.]/g, ''));
  var wnd = $(window);
  // the footer is always at the bottom..
  var setFooterPosition = function(){
    var top = Number(cnt.offset().top);
    top = top + cnt.height() + margin;
    var height = footer.height();
    if(top + height < wnd.height()){
      footer.css("bottom", "0");
    } else {
      footer.css("bottom", "");
    } 
  }
  $("#content").resize(setFooterPosition);
  $(function(){setFooterPosition();});
  
}());
