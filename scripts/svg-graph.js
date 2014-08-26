function escapeHTML(string){
  return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function createSVG(graph){
  //THE ACTUAL CREATING
  $("#result").html("");
  $("#doWork").html("");
  var layout = drawGraph(graph, "#doWork", 
    {
      directed: $("#directed")[0].checked,
      layoutDir: ($("#topDown")[0].checked) ? "TB" : "LR"
    });
  $("#result").html($("#doWork").html());
  
  //CREATE COPYABLE SVG CODE
  $("#svg-code").html("&lt;!-- URL to Fastgraph: " + location.href + " --&gt;<br/>"+escapeHTML($("#doWork").html()));
  $("#result").find("svg").attr("class", "dagre");
  return layout;
}