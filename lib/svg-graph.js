function drawGraph(graph, selector){
  var g = new dagreD3.Graph();

  for(var i=0; i<graph.nodes.length; i++){
    g.addNode(graph.nodes[i], {label: graph.nodes[i]});
  }

  for(var i=0; i<graph.connections.length; i++){
    var from = graph.connections[i].from;
    var to = graph.connections[i].to;
    g.addEdge(null, from, to);
  }
  
  var renderer = new dagreD3.Renderer();
  
  var svg = d3.select(selector).append("svg");
  $(svg).css("margin", "0");
  svg.attr('width',$("#result").width());
  
  var svgGroup = svg.append("g");

//this isnt working anymore for some reason? prob gets overridden bei centering at the end

 var layout = dagreD3.layout()
                      .rankSep(graph.settings.levelDist)
                      .edgeSep(graph.settings.edgeDist);
                      
                      
// Set initial zoom to 75%
var initialScale = 0.75;

var oldZoom = renderer.zoom();
renderer.zoom(function(graph, svg) {
  var zoom = oldZoom(graph, svg);

  // We must set the zoom and then trigger the zoom event to synchronize
  // D3 and the DOM.
  zoom.scale(initialScale).event(svg);
  return zoom;
});

// Run the renderer. This is what draws the final graph.
var layout = renderer.layout(layout).run(g, svgGroup);

// Center the graph
var xCenterOffset = (svg.attr('width') - layout.graph().width * initialScale) / 2;
svgGroup.attr('transform', 'translate(' + xCenterOffset + ', 20)');
svg.attr('height', layout.graph().height * initialScale + 40);

  return layout;
}
