//document.body.style.backgroundColor = "red";

var a_arr = document.querySelectorAll('a');
for(var i = 0; i < a_arr.length; i++){
	a_arr[i].style.backgroundColor = "red";	
}

chrome.extension.sendMessage({msg: 'ANOTHER', data: a_arr.length});

function call_func(params){

	console.log('call_func');
	console.log(params);
}

chrome.extension.onMessage.addListener(function(request){

	console.log('onMessage');
	console.log(request);
	if(request.msg === 'CALLFUNC'){
		call_func(request.params);
	}
});