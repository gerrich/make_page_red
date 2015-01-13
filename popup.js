function $$$(sel){
	return document.querySelectorAll(sel);

}

document.addEventListener('DOMContentLoaded', function() {
	var test_btn = $$$('#test_btn')[0];
	if (test_btn) {
		test_btn.addEventListener('click', test);
	}
});

function appendHTML(params){
	var debug_div = $$$('#debug_div')[0];
	debug_div.innerHTML += "<p>" + params + '</p>';
}

function test(event){
	var inp = $$$('#debug_inp')[0];
	var debug_div = $$$('#debug_div')[0];
	debug_div.innerHTML += "HELLO: " + event;
	
	chrome.extension.getBackgroundPage().glbalObj.callback = function(params){
		appendHTML("callback: " + params);
	}
	debug_div.innerHTML += '<br>FROM GLOBAL: ' + chrome.extension.getBackgroundPage().glbalObj.someFunc({test: '1231231'});


	chrome.extension.sendMessage({msg: 'SOMETHING', data: inp.value});
}