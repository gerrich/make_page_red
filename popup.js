function $$$(sel){
	return document.querySelectorAll(sel);

}

document.addEventListener('DOMContentLoaded', function() {

	var test_btn = $$$('#test_btn')[0];
	document.getElementById('test_btn').addEventListener('click', test);

	
});


function test(event){
	var inp = $$$('#debug_inp')[0];
	var debug_div = $$$('#debug_div')[0];
	debug_div.innerHTML = "HELLO: " + event;
	chrome.extension.sendMessage({msg: 'SOMETHING', data: inp.value});



}