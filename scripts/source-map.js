

function createSourceMap(graph){
  var layout = drawGraph(sMapGraph, "#doWork",
    {
      directed: $("#directed")[0].checked,
      layoutDir: ($("#topDown")[0].checked) ? "TB" : "LR"
    });
    
  
  
}
