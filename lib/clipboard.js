_.each(clipboards, function(c){
  var client = new ZeroClipboard( $("#"+ c.button)[0] );
  
  var resolveTags = function(str){
    return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  }

  client.on( "ready", function( readyEvent ) {
    client.on("copy", function(event){
      // set clipboard data
      var puttingData = resolveTags($("#" + c.content).html());
      event.clipboardData.setData("text/plain", puttingData);
    });
  } );

});
