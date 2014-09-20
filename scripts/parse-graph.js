var makeEdge = function(edgeString){
  var parts = edgeString.split("->");
  if(parts.length != 2 || parts[0].trim() == "" || parts[1].trim() == ""){
    return null;
  }
  return {from: parts[0].trim(), to: parts[1].trim()};
};

function getEdges(edgeString){
  var edgeStrings = edgeString.split(",");
  return _.compact(
    _.map(edgeStrings, makeEdge));
}

function getNodes(edgeString){
  var edgeStrings = edgeString.split(",");
  //extracting nodes from the edgeStrings
  return _.chain(edgeStrings)
    .map(function(n){return n.trim().split("->");})
    .flatten()
    .filter(function(n){ return n != "";})
    .uniq()
    .sort()
    .value();
}


function createSourceMap(description){
  var edgeStrings = description.edgeString.split(",");
  var edgeStringMap = _.chain(edgeStrings)
    .reduce(function(last, edge){
      var l = last[last.length - 1];
      var edgeObj = makeEdge(edge);
      if(edgeObj != null){
        last.push(
          {
            startPosition:l.endPosition,
            endPosition:l.endPosition + edge.length+1,
            edge: edgeObj,
            edgeString: edge
          });
      }
      return last;
    },[{startPosition: 0, endPosition:0}])
    .rest()
    .value();
    
  var nodes = getNodes(description.edgeString);
    
  var nodeStringMap = _.map(nodes, function(node){
    return _.compact(_.map(edgeStringMap, function(edge){
      var splitter = edge.edgeString.indexOf("->");
      if(node == edge.edge.from){
        return { 
          node: node, 
          startPosition:edge.startPosition,
          endPosition: edge.startPosition + splitter
        };
      } else if( node == edge.edge.to) {
        return { 
          node: node, 
          startPosition:edge.startPosition + splitter + 2,
          endPosition: edge.endPosition
        }; 
      } else {
        return null;
      }
    }));
  });
  
  return {nodes: nodeStringMap, edges: edgeStringMap};
}

function createGraph(description){

  var nodes = getNodes(description.edgeString);
  var edges = getEdges(description.edgeString);

  return {nodes: nodes, connections: edges, settings: description};
}
