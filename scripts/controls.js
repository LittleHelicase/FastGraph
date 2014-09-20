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

function getInputs(){
  return {
    edgeString:    $("#edges").val(),
    edgeDistance:  $("#edgeDist").val(),
    levelDistance: $("#levelDist").val(),
    directed: $("#directed")[0].checked,
    layoutDir: ($("#topDown")[0].checked) ? "TB" : "LR"
  }
}

function updateFields(graph){
  $("#nodes").html(_.reduce(graph.nodes, function(rest,n){
    return rest + Template("labels")({node:n});
  }, ""));
  location.hash = "#" + encodeURI($("#edges").val());
}
