function createGraph(){
  var makeEdge = function(edgeString){
    var parts = edgeString.split("->");
    if(parts.length != 2 || parts[0].trim() == "" || parts[1].trim() == ""){
      return null;
    }
    return {from: parts[0].trim(), to: parts[1].trim()};
  };

  var edgeStrings = $("#edges").val().split(",");
  //extracting nodes from the edgeStrings
  var nodes = _.compact(_.flatten(_.map(edgeStrings,function(n){return n.trim().split("->")})));

  if(nodes[0] == null || nodes[0].trim() == "") nodes = [null];
  var edges = _.compact(
    _.map(edgeStrings, makeEdge));
  var edgeNodes = _.uniq(
    _.compact(
    _.union(nodes,
    _.flatten(
    _.map(edges, function(edge){ return [edge.from, edge.to]})))));

    edgeNodes.sort();

  $("#nodes").html(_.reduce(edgeNodes, function(rest,n){
    return rest + Template("labels")({node:n});
  }, ""));

  var graphSettings = {
    edgeDist:$("#edgeDist").val(),
    levelDist:$("#levelDist").val()
  };
  return {nodes: edgeNodes, connections: edges, settings: graphSettings};
}