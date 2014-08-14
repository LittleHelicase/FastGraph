
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

  var svg = d3.select(selector).append("svg");
  var svgGroup = svg.append("g")
  var renderer = new dagreD3.Renderer();
  var layout = dagreD3.layout()
                      .rankSep(graph.settings.levelDist)
                      .edgeSep(graph.settings.edgeDist);
                      
  var initialScale = 0.75;
  var oldZoom = renderer.zoom();
  renderer.zoom(function(graph, svg) {
    var zoom = oldZoom(graph, svg);

    zoom.scale(initialScale).event(svg);
    return zoom;
  });
  var layout = renderer.layout(layout).run(g, svgGroup);
  
  var xCenterOffset = (svg.attr('width') - layout.graph().width * initialScale) / 2 + 350;
  svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 20)');
  svg.attr('height', layout.graph().height * initialScale + 40);
  
  return layout;
}
