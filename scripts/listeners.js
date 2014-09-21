
function createSelection(field, start, end) {
  if( field.createTextRange ) {
    var selRange = field.createTextRange();
    selRange.collapse(true);
    selRange.moveStart('character', start);
    selRange.moveEnd('character', end);
    selRange.select();
  } else if( field.setSelectionRange ) {
    field.setSelectionRange(start, end);
  } else if( typeof field.selectionStart != 'undefined' ) {
    field.selectionStart = start;
    field.selectionEnd = end;
  }
}

function installListeners(graph, layout, sourceMap){
  _.each(graph.nodes, function(node){
    var nodeElement = layout.getNodeElement(node);
    console.log("install listener for " + node)
    nodeElement.hover(function(){
      var sourceRef = _.first(_.filter(sourceMap.nodes, function(s){
        return s[0].node == node;
      }));
      if(sourceRef.length == 0) return;
      createSelection($("#edges")[0], sourceRef[0].startPosition, sourceRef[0].endPosition);
    });
  });
  _.each(graph.connections, function(edge){
    var edgeElement = layout.getEdgeElement(edge);
    edgeElement.hover(function(){
      var sourceRef = _.first(_.filter(sourceMap.edges, function(s){
        return s.edge.from == edge.from && s.edge.to == edge.to;
      }));
      createSelection($("#edges")[0], sourceRef.startPosition, sourceRef.endPosition);
    });
  });
}
