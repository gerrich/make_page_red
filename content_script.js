function call_func(params){
	if (0) {
		var foo = function(el) {
          if (el.tagName == "IMG") {
            var src = el.getAttribute("data-original");
            if (src != null) {
              console.log("got image: " + src);
            }// else {
            //  src = el.getAttribute("src");
            //  if (src != null) {
             //   console.log("got image: " + src);
            //  }
           // }     
          }
          if (el.tagName == "LINK") {
            if (el.getAttribute("type") == "text/css") {
              console.log("css", el.getAttribute("href"))
            }
          }
        };
        var get_path = function (el) {
          var path = '';
          while(el != null) {
            path = el.tagName + "." + path;
            el = el.parentElement;
          }
          return path;
        };
        var els = document.getElementsByTagName("*");
        for (var i = 0; i < els.length; ++i) {
          var rect = els[i].getBoundingClientRect();
          //console.log("element N" + i + " : " + rect.left + " " + rect.top + " " + rect.width + " " + rect.height + " - " + els[i].tagName);
          //console.log("path: " + get_path(els[i]));
          console.log((rect.width + rect.height) + "	" + (rect.width - rect.height) + "	" +  get_path(els[i]) + " " + els[i].className);
          
          foo(els[i]);
        }
    } else {

    	console.log('NOPE');
    }
	return {data: 'OK'};        
}



chrome.extension.onMessage.addListener(function extensionOnMessage(request)
{
	console.log('onMessage');
	console.log(request);
	if(request.msg === 'CALLFUNC'){
		var result = call_func(request.params);
		chrome.extension.sendMessage({msg: 'FROMCONTENT', data: result});
	}
	chrome.extension.onMessage.removeListener(extensionOnMessage);
});