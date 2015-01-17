
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

function get_el_description(el, depth) {
	if (depth == 0) {
		return el.nodeName;
	}
	var description = el.nodeName;
	description += '(';
	for (var i = 0; i < el.childNodes.length; ++i) {
		var child = el.childNodes[i];
		description += '+' + get_el_description(child, depth - 1);
	}
	description += ')';
	return description;
}
function get_path(el) {
  var path = '';
  while(el != null) {
    path = el.tagName + "." + path;
    el = el.parentElement;
  }
  return path;
};
function get_rel_depth(el, el_list) {
	for (var i in el_list) {
		if (el.isSameNode(el_list[i])) {
			return 0;
		}
		var pos = el.compareDocumentPosition(el_list[i]);
		console.log('pos: ' + pos);
		if (pos & 8) {
			depth = 0;
			while(!el.isSameNode(el_list[i])) {
				el = el.parentNode;
				++depth;
			}
			return depth;
		}
	}
	return -1;
}
function auto_action() {
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

    var el_groups = {};
    var els = document.getElementsByTagName("*");
    for (var i = 0; i < els.length; ++i) {
      var rect = els[i].getBoundingClientRect();
      //console.log("element N" + i + " : " + rect.left + " " + rect.top + " " + rect.width + " " + rect.height + " - " + els[i].tagName);
      //console.log("path: " + get_path(els[i]));
      console.log((rect.width + rect.height) + "	" + (rect.width - rect.height) + "	" +  get_path(els[i]) + " " + els[i].className + ' ' + get_el_description(els[i], 3));
      var class_name = get_path(els[i]) + " :: " + get_el_description(els[i], 3);
      if (!(class_name in el_groups)) { el_groups[class_name] = {mass:0, els:[]}; }
      el_groups[class_name].mass += (rect.width + rect.height);
      el_groups[class_name].els.push(els[i]);

      //foo(els[i]);
    }

    var el_group_list = [];
    for (var key in el_groups) {
    	if (el_groups[key].els.length < 2) { continue; }
    	update_group(el_groups[key]);
    	console.log("path: " + el_groups[key].path);
    	el_group_list.push(el_groups[key]);
    }

    el_group_list.sort(function(a,b){return b.path.localeCompare(a.path);});

    for (var i = 1; i < el_group_list.length;) {
    	if (el_group_list[i-1].path == el_group_list[i].path) {
    		console.log("combine 1.1");
    		var new_els = merge_node_list(el_group_list[i-1].els, el_group_list[i].els);
    		console.log("combine 1.2");
    		el_group_list[i-1].els = new_els;
    		el_group_list[i-1].mass = Math.max(el_group_list[i-1].mass, el_group_list[i].mass);
    		el_group_list.splice(i, 1);
    	} else { ++i; }
    }

    for (var i in el_group_list) {
    	el_group_list[i].surface = calc_group_surface(el_group_list[i].els);
    	console.log('surface: ' + el_group_list[i].surface);
    }

	var sel = take_selection();
	if (sel != null) {
		var good_groups = {};
		for (var i in el_group_list) {
			var rel_depth = get_rel_depth(sel, el_group_list[i].els);
			if (rel_depth >=0) {
				console.log("rel: " + rel_depth);
				good_groups[rel_depth] = el_group_list[i];
			}
		}
		console.log("@@@ 3");
		var keys = Object.keys(good_groups);
		console.log("@@@ 4: " + keys);
		if (keys.length > 0) {
			console.log("@@@ 5");
			var min_key = Math.min.apply(Math, keys);
			console.log("@@@ 6: " + min_key);
			var group = good_groups[min_key];
			try {
		    	for (var j = 0; j < group.els.length; ++j) {
		    		group.els[j].className += ' red_border';
		    	}
	    	} catch(err) {
	    		console.log(err);
	    	}
		}

		return;
	}

    el_group_list.sort(function(a,b){return b.surface - a.surface;});

    for (var i = 0; i < 6 && i < el_group_list.length; ++i) {
    	var group = el_group_list[i];
    	console.log('group_id: ' + i + ' size: '+ group.els.length + ' mass:' + group.mass + ' surface: ' + group.surface);
		try {
	    	for (var j = 0; j < group.els.length; ++j) {
	    		group.els[j].className += ' red_border_' + i;
	    	}
    	} catch(err) {
    		console.log(err);
    	}
    }
}

function update_group(group) {
	console.log("dbg 1");
	var node_list = group.els;
	var is_collision = false;
	var steps_up = 0;
	for(;;++steps_up) {
			console.log("dbg 2.1");
		var parent_list = [];
		for (var j = 0; j < node_list.length; ++j) {
			console.log("dbg 2.2.1");
			parent_list.push(node_list[j].parentNode);
			if (parent_list.length > 1 && parent_list[parent_list.length - 1] == parent_list[parent_list.length - 2]) {
				is_collision = true;
			}
		}
		if (is_collision) {
			break;
		}
		node_list = parent_list;
	}
	group.els = node_list;
	group.path = get_path(node_list[0]);
	// TODO:
	// set new group path
	// set new description
	// set new mass
}

// combine groups with same elements
function merge_node_list(a, b) {
	var i = 0;
	var j = 0;
	var c = [];
	console.log('merge 1 ' + a.length + ' ' + b.length);
	for (; i < a.length && j < b.length;) {
			console.log('merge 2.1 ' + i + " " + j );
		var pos = a[i].compareDocumentPosition(b[j]);
		if (pos & 2) {
			c.push(b[j]);
			++j;
		} else if (pos & 4) {
			c.push(a[i]);
			++i;
		} else {
			c.push(a[i]);
			++i;
			++j;
		}
	}
	console.log('merge 3.1');
	for(; i < a.length; ++i) {
		console.log('merge 4.1 ' + i);
		c.push(a[i]);
	}
	for(; j < b.length; ++j) {
		console.log('merge 4.2 ' + i);
		c.push(b[j]);
	}
	return c;
}

function calc_group_surface(els) {
	var sum = 0;
	console.log("param 1");
	//var mass = 0;
	for (var i in els) {
		var rect = els[i].getBoundingClientRect();
		sum += rect.width * rect.height;
		//mass += rect.width + rect.height;
	}
	return sum;
}

// select best group

/*
elements of best group:
has image
has link
text covers less then 50%

group -> step up until number of nodes decresed
*/

function up_tag(el) {
	if(typeof el.tagName === 'undefined') {
		return el.parentNode;
	}
	return el;
}
function take_selection() {
	var sel = window.getSelection();
	
	if (sel.rangeCount > 0) {
		var range = sel.getRangeAt(0); //(i);
		if (range.collapsed) {
			console.log("take_selection... COLLAPSED");
			return null;
		}
		console.log("take_selection..." + range.toString());
		console.log("CAC: " + range.commonAncestorContainer.nodeName + " -> " + up_tag(range.commonAncestorContainer).nodeName);
		up_tag(range.commonAncestorContainer).className += ' red_border';
		up_tag(range.startContainer).className += ' red_border_4';
		up_tag(range.endContainer).className += ' red_border_5';
		return up_tag(range.commonAncestorContainer);
	} else {
		console.log("take_selection... NONE");
		return null;
	}	
}

function call_func(params){
	console.log('call_func: ' + JSON.stringify(params));
	if (params.method == 'auto_action') {
		auto_action();
    } else if (params.method == 'custom_action'){
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
    } else if (params.method == "take_selection") {
    	take_selection();
    } else {
    	console.log('Unregistered method name');
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