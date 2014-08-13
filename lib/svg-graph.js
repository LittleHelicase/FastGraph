
function drawGraph(graph, selector){
  var g = new dagreD3.Digraph();

  for(var i=0; i<graph.nodes.length; i++){
    g.addNode(graph.nodes[i], {label: graph.nodes[i]});
  }

  for(var i=0; i<graph.connections.length; i++){
    var from = graph.connections[i].from;
    var to = graph.connections[i].to;
    g.addEdge(null, from, to);
  }

  var svg = d3.select(selector).append("svg").append("g");
  var renderer = new dagreD3.Renderer();
  var layout = dagreD3.layout()
                      .rankSep(graph.settings.levelDist)
                      .edgeSep(graph.settings.edgeDist);
  return renderer.layout(layout).run(g, svg);
}
