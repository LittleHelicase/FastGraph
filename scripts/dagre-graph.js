
function drawGraph(graph, selector){
  var g;
  if(graph.settings.directed){
    g = new dagreD3.Digraph();
  } else {
    g = new dagreD3.Graph();
  }

  for(var i=0; i<graph.nodes.length; i++){
    g.addNode(graph.nodes[i], {label: graph.nodes[i]});
  }

  for(var i=0; i<graph.connections.length; i++){
    var from = graph.connections[i].from;
    var to = graph.connections[i].to;
    if(!g.hasEdge(from + "->" + to)){
      g.addEdge(from + "->" + to, from, to);
    }
  }

  var svg = d3.select(selector).append("svg");
  $(svg).css("margin", "0");
  var svgGroup = svg.append("g")
  var renderer = new dagreD3.Renderer();
  var layout = dagreD3.layout()
                      .rankSep(graph.settings.levelDistance)
                      .edgeSep(graph.settings.edgeDistance);
                      
  var initialScale = 1.75;
  var oldZoom = renderer.zoom();
  renderer.zoom(function(graph, svg) {
    var zoom = oldZoom(graph, svg);

    zoom.scale(initialScale).event(svg);
    return zoom;
  });
  var layout = renderer.layout(layout).run(g, svgGroup);
  
  var xCenterOffset = (svg.attr('width') - layout.graph().width * initialScale) / 2 + 1000;
  svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 500)');
  svg.attr('height', layout.graph().height * initialScale + 40);
  
  return layout;
}
