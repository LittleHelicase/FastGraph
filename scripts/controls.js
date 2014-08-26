$("input").change(update);
$("input[type='text']").keyup(update);
var intervalID;
$(".range").mousedown(function(){
  intervalID = setInterval(update,10);
});
$(".range").mouseup(function(){
  clearInterval(intervalID);
});

$(".ui.checkbox").checkbox();
$('.ui.radio.checkbox').checkbox();
window.onhashchange = function(){
  $("#edges").val(decodeURI(location.hash.slice(1)));
  update();
};
$(function(){
  $("#edges").val(decodeURI(location.hash.slice(1)));
  update();
});

$(".accordion").accordion();
      $('.tabular.menu .item').tab({history:false});