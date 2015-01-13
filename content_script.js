
function short_url(url) {
	if (url.search('^\/')) {
		return url;
	}
	return url.replace('^http:\/\/([^\/ ]+)\/', '');
}
function check_common_prefix(a,b) {
	var i = 0;
	for (; i < a.length && i < b.length; ++i) {
		if (a.charAt(i)!=b.charAt(i)) break;
	}
	for (var j = i; j < a.length; ++j) {
		if (a.charAt(j) == '\/') return false;
	}
	for (var j = i; j < b.length; ++j) {
		if (b.charAt(j) == '\/') return false;
	}
	return true;
}
function detect_pager() {
	var main_url = short_url(document.URL);
	var els = document.querySelectorAll('a');
	for(var i = 0; i < els.length; ++i) {
		var url = short_url(els[i].href);
		// check common prefix contains all slashes% '/'
		if(check_common_prefix(url, main_url)) {
			console.log('pager: ' + els[i].href);
		}
	}
}

function process_mvideo() {
	console.log('process_mvideo');
	var els = document.querySelectorAll('.product-tile.showcompare');
	if (els.length > 0) {
		console.log("" + els.length + " elements found");
		for(var i = 0; i < els.length; ++i) {
			els[i].className += ' red_border';
			var price_el = els[i].querySelector('.product-price-current');
			var title_el = els[i].querySelector('.product-tile-title-link');
			console.log('el: ' + i + " title: " + title_el.innerText +' price:' + price_el.innerText + " href:" + title_el.href);
		}	
	} else {
		console.log("none found");
	}
}

function process_ion() {
	console.log('process_ion');
	var els = document.querySelectorAll('li.catalog_item');  
	if (els.length > 0) {
		console.log("" + els.length + " elements found");
		for(var i = 0; i < els.length; ++i) {
			var price_el = els[i].querySelector('span.price');
			var title_el = els[i].querySelector('a.catalog_item_link');

			console.log('el: ' + i + " title: " + title_el.innerText +' price:' + price_el.innerText + " href:" + title_el.href);
		}
	} else {
		console.log("none found");
	}
}

function process_ulmart() {
	console.log('process_ulmart');
	var els = document.querySelectorAll('section.b-product.b-product_list-item-w-foto');
	if (els.length > 0) {
		console.log("" + els.length + " elements found");
		for(var i = 0; i < els.length; ++i) {
			var price_el = els[i].querySelector('span.b-price__num');
			var title_el = els[i].querySelector('div h3 a.js-gtm-product-click');

			console.log('el: ' + i + " title: " + title_el.innerHTML +' price:' + price_el.innerText + " href:" + title_el.href);
		}
	} else {
		console.log("none found");
	}
}

function process_yandex() {
	console.log('process_yandex');
	var els = document.querySelectorAll('div.serp-item');
	for(var i = 0; i < els.length; ++i) {
		if (/serp-adv__item/.test(els[i].className)) {
			var title_el = els[i].querySelector('a.serp-item__title-link');
			var text_el = els[i].querySelector('div.serp-item__text');
			console.log("Ad: " + i + " title: " + title_el.innerText + " text: " + text_el.innerText + " href:" + title_el.href);
		} else if (/serp-item_plain_yes/.test(els[i].className)) {
			var title_el = els[i].querySelector('a.serp-item__title-link');
			var text_el = els[i].querySelector('div.serp-item__text');
			console.log("Doc: " + i + " title: " + title_el.innerText + " text: " + text_el.innerText + " href:" + title_el.href);
		} else {
			console.log('unknown: ' + i);
		}
	}
}

function process_google() {
	console.log('process_google');
	var els = document.querySelectorAll('div.srg li.g');
	for(var i = 0; i < els.length; ++i) {
		try {
			var title_el = els[i].querySelector('div.rc h3.r a');
			var text_el = els[i].querySelector('div.s div span.st');
			console.log("Doc: " + i + " title: " + title_el.innerText + " text: " + text_el.innerText + " href:" + title_el.href);
		}
		catch(err) {
			console.log('unknown: ' + i);
		}
	}

	var ads = document.querySelectorAll('div#rhs div div ol li.ads-ad');
	for (var i = 0; i < ads.length; ++i) {
		var el = ads[i];
		try {
			var title_el = el.querySelectorAll('h3 a')[1];
			var text_el = el.querySelector('div.ads-creative');
			console.log("Side Ad: " + i + " title: " + title_el.innerText + " text: " + text_el.innerText + " href:" + title_el.href);
		} catch(err) {
			console.log('bad ad');
		}		
	}

	ads = document.querySelectorAll('div#tvcap div._Ak ol li');
	for (var i = 0; i < ads.length; ++i) {
		var el = ads[i];
		try {
			var title_el = el.querySelectorAll('h3 a')[1];
			var text_el = el.querySelector('div.ads-creative');
			console.log("Top Ad: " + i + " title: " + title_el.innerText + " text: " + text_el.innerText + " href:" + title_el.href);
		} catch(err) {
			console.log('bad ad');
		}		
	}
}

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
    	var url = document.URL;

    	console.log('NOPE url:' + url);
    	//detect_pager();
    	if (/^(https?:\/\/)?(www\.)?mvideo\.ru/i.test(url)) {
    		process_mvideo();
    	} else if (/^(https?:\/\/)?(www\.)?i\-on\.ru/i.test(url)) {
    		process_ion();
    	} else if (/^(https?:\/\/)?(www\.)?ulmart\.ru/i.test(url)) {
    		process_ulmart();
    	} else if (/^(https?:\/\/)?(www\.)?yandex\.ru/i.test(url)) {
    		process_yandex();
    	} else if (/^(https?:\/\/)?(www\.)?google\.[a-z]+/i.test(url)) {
    		process_google();
    	}
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