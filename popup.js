function $$$(sel){
	return document.querySelectorAll(sel);

}

document.addEventListener('DOMContentLoaded', function() {
	var test_btn = $$$('#test_btn')[0];
	if (test_btn) {
		test_btn.addEventListener('click', test);
	}
	var auto_btn = $$$('#auto_btn')[0];
	if (auto_btn) {
		auto_btn.addEventListener('click', on_auto_click);
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


	chrome.extension.sendMessage({msg: 'SOMETHING', method: 'custom_action', data: inp.value});
}

function on_auto_click(event) {
	chrome.extension.sendMessage({msg: 'SOMETHING', method: 'auto_action', data: null});
}
