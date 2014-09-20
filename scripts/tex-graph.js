function latexDir(p1, p2){
  if(p1.x-p2.x < 0 && p1.y - p2.y < 0)
    return "south east";
  if(p1.x-p2.x > 0 && p1.y - p2.y < 0)
    return "south west";
  if(p1.x-p2.x < 0 && p1.y - p2.y > 0)
    return "north east";
  if(p1.x-p2.x > 0 && p1.y - p2.y > 0)
    return "north west";
  if(p1.x-p2.x == 0 && p1.y-p2.y > 0)
    return "north";
  if(p1.x-p2.x == 0 && p1.y-p2.y < 0)
    return "south";
  if(p1.x-p2.x < 0 && p1.y-p2.y == 0)
    return "east";
  if(p1.x-p2.x > 0 && p1.y-p2.y == 0)
    return "west";
  return "???";
}

function createTex(graph, layout){
  // no visual yet
  return;
  var templ = Template("tikzbase");
  var nodes = {};
  layout.eachNode(function(n,data){
    nodes[n] = data;
  });
  layout.eachEdge(function(e,u,v,data){
    var node = nodes[u];
    data.outDir = latexDir(node, data.points[0]);
    if(u == v) {
      data.inDir = latexDir(node, data.points[data.points.length-1]);
    } else {
      data.inDir = latexDir(data.points[data.points.length-1], node);
    }
  })
  $("#tex-code").html(templ({
    layout: layout,
    properties: {
      straightLines: $("#straight")[0].checked
    }
  }));
}
