/**
 * Processes a html Element with the given ID
 */
function Template(id){
  var html = $("#"+id).html();
  html = html.replace(/&lt;%/g, "<%").replace(/%&gt;/g, "%>");
  return _.template(html);
}