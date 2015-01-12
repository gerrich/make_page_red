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


chrome.extension.onMessage.addListener(function(request){

    console.log(request);

    if(request.msg === 'SOMETHING'){
		chrome.tabs.executeScript(null, {file: "content_script.js"}, function(){
	 		console.log('Script executed ');
	 		chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    			chrome.tabs.sendMessage(tabs[0].id, {action: "SendIt", msg: 'CALLFUNC', params: {data: request.data}}, function(response) {});
    		});
	 	});
 	}

});



