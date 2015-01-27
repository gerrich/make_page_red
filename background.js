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
chrome.runtime.onMessage.addListener(function(request, sender, callback) {
	console.log("chrome.runtime.onMessage.addListener()" + request.action);
    if (request.action == "xhttp") {
        var xhttp = new XMLHttpRequest();
        var method = request.method ? request.method.toUpperCase() : 'GET';

        xhttp.onload = function() {
            callback(xhttp.responseText);
        };
        xhttp.onerror = function() {
            // Do whatever you want on error. Don't forget to invoke the
            // callback to clean up the communication port.
            callback();
        };
        xhttp.open(method, request.url, true);
        if (method == 'POST') {
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhttp.send(request.data);
        return true; // prevents the callback from being called too early on return
    }
});

function test_crawler() {
	chrome.tabs.query({'active': true}, function(tabs) {
		console.log('dbg 1.1 ' + tabs[0].id);
	  	chrome.tabs.update(tabs[0].id, {url: 'http://yandex.ru'}, function(){
	  		console.log('tab updated');
	  	});
	  	//chrome.tabs.executeScript(tabs[0].id, 'console.log("dododod");');
	  	console.log('dbg 1.2');
	});
	//someOtherFunction();
}

var glbalObj = {
	someFunc: function(params){
		return {data: 'global DATA'}; 

	},
	callback: 0
};


chrome.commands.onCommand.addListener(function(command) {
	console.log('Command:', command);

	if (command == 'test_crawler') {
		console.log("DBG 1");
		test_crawler();
		console.log("DBG 2");
		return;
	}
    chrome.tabs.insertCSS(null, {file: "content.css"}, function(){
		chrome.tabs.executeScript(null, {file: "content_script.js"}, function(){
	 		console.log('Script executed ');
	 		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    			chrome.tabs.sendMessage(tabs[0].id, {action: "SendIt", msg: 'CALLFUNC', params: {method: command, data: null}}, function(response) {});
    		});
	 	});
	});
});

