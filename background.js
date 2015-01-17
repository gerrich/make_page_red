// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  /*
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"; '
  });
	*/


});


console.log('EXECUTING bacground.js');

chrome.extension.onMessage.addListener(function(request){

    console.log("chrome.extension.onMessage.addListener" + request);

    //chrome.windows.get(0, object getInfo, function callback)

    if(request.msg === 'SOMETHING'){
    	chrome.tabs.insertCSS(null, {file: "content.css"}, function(){
			chrome.tabs.executeScript(null, {file: "content_script.js"}, function(){
		 		console.log('Script executed ');
		 		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
	    			chrome.tabs.sendMessage(tabs[0].id, {action: "SendIt", msg: 'CALLFUNC', params: {method: request.method, data: request.data}}, function(response) {});
	    		});
		 	});
		});
 	} else if (request.msg === 'FROMCONTENT'){
 		if (glbalObj.callback){
 			console.log('FROMCONTENT has callback');
 			glbalObj.callback(request);
 		}
 	}
});

var glbalObj = {
	someFunc: function(params){
		return {data: 'global DATA'}; 

	},
	callback: 0
};


chrome.commands.onCommand.addListener(function(command) {
	console.log('Command:', command);

    chrome.tabs.insertCSS(null, {file: "content.css"}, function(){
		chrome.tabs.executeScript(null, {file: "content_script.js"}, function(){
	 		console.log('Script executed ');
	 		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    			chrome.tabs.sendMessage(tabs[0].id, {action: "SendIt", msg: 'CALLFUNC', params: {method: command, data: null}}, function(response) {});
    		});
	 	});
	});
});

