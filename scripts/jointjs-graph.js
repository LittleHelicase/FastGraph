
// Thanks to David Durman
// http://www.daviddurman.com/automatic-graph-layout-with-jointjs-and-dagre.html
// self loops are missing.. https://gist.github.com/DavidDurman/d4250dd3abe5efc9a1af

function makeLink(parentElementLabel, childElementLabel) {

    return new joint.dia.Link({
        source: { id: parentElementLabel },
        target: { id: childElementLabel },
        attrs: { '.marker-target': { d: 'M 4 0 L 0 2 L 4 4 z' } },
        smooth: false
    });
}

function makeElement(label) {

    var maxLineLength = _.max(label.split('\n'), function(l) { return l.length; }).length;

    // Compute width/height of the rectangle based on the number 
    // of lines in the label and the letter size. 0.6 * letterSize is
    // an approximation of the monospace font letter width.
    var letterSize = 8;
    var width = 2 * (letterSize * (0.6 * maxLineLength + 1));
    var height = 2 * ((label.split('\n').length + 1) * letterSize);

    return new joint.shapes.basic.Rect({
        id: label,
        size: { width: width, height: height },
        attrs: {
            text: { text: label, 'font-size': letterSize, 'font-family': 'monospace' },
            rect: {
                width: width, height: height,
                rx: 5, ry: 5,
                stroke: '#555'
            }
        }
    });
}

function layoutGraph(graphData, selector){
  var graph = new joint.dia.Graph;

  var paper = new joint.dia.Paper({

      el: $(selector),
      width: $("body").width(),
      height: $("body").height(),
      gridSize: 1,
      model: graph
  });
  
  var edgeMapping = {};
  var toString = function(edge) { return edge.from + "->" + edge.to };
  
  var elements = _.map(graphData.nodes, function(node) {
    return makeElement(node);
  });
  var links = _.map(graphData.connections, function(edge) {
    var link = makeLink(edge.from, edge.to);;
    edgeMapping[toString(edge)] = link;
    return link
  });
  
  graph.resetCells(_.union(elements, links));
  
  var layout = joint.layout.DirectedGraph.layout(graph, { setLinkVertices: false });

  V(paper.viewport).translate(-layout.width,-layout.height);
  V(paper.viewport).scale(2);
  V(paper.viewport).translate($("body").width()/2, $("body").height()/2);
  console.log(layout);
  console.log(graph);
  
  return {
    getNodeElement: function(node){
      console.log(graph.getCell(node));
      return $("g[model-id='"+node+"']");
    },
    getEdgeElement: function(edge){
      var link = edgeMapping[toString(edge)];
      return $("g[model-id='"+link.id+"']");
    }
  }
}
