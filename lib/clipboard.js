_.each(clipboards, function(c){
  var client = new ZeroClipboard( $("#"+ c.button)[0] );
  
  var resolveTags = function(str){
    return str.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  }

  client.on( "ready", function( readyEvent ) {
    client.on("copy", function(event){
      var puttingData;
      if(typeof c.content === "function"){
        puttingData = c.content();
      } else {
        puttingData = resolveTags($("#" + c.content).html());
      }
      event.clipboardData.setData("text/plain", puttingData);
    });
  } );

});
