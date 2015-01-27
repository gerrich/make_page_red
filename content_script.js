
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

var ion_rule = {
'selector': 'li.catalog_item',
'name': 'product',
'expected': 'many',
'sub_rules':[
	{
		'selector': 'span.price',
		'name': 'price',
		'expected': 'one',
		'type': 'text'
	},
	{
		'selector': 'a.catalog_item_link',
		'name': 'link',
		'type': 'link',
		'expected': 'one'
	}
]
};

function process_generic(rule_set) {
	for (var key in rule_set) {
		var rule = rule_set[key];
		if 
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
function make_features(el_group) {
	

	var sum_h = 0;
	var sum_h2 = 0;
	var sum_w = 0;
	var sum_w2 = 0;
	var min_h = 1e9;
	var max_h = 0;
	var min_w = 1e9;
	var max_w = 0;
	for (var i in el_group.els) {
		var el = el_group.els[i];
		var rect = el.getBoundingClientRect();
		sum_h += rect.height;
		sum_w += rect.width;
		sum_h2 += rect.height * rect.height;
		sum_w2 += rect.width * rect.width;
		min_h = Math.min(min_h, rect.height);
		max_h = Math.max(max_h, rect.height);
		min_w = Math.min(min_w, rect.width);
		max_w = Math.max(max_w, rect.width);
	}
	var _n = 1.0 / el_group.els.length;
	return [el_group.mass, el_group.surface, el_group.els.length,
		min_h, max_h, min_w, max_w,
		sum_h*_n, sum_w*_n,
		sum_h2*_n - sum_h*sum_h*_n*_n,
		sum_w2*_n - sum_w*sum_w*_n*_n
	];
}

function iterate_elements(action) {
	var pairs = [[document.body, '']];
	for(; pairs.length > 0;) {
		var pair = pairs.pop();
		action(pair[0], pair[1]);
		var child_list = pair[0].childNodes;
		for (var i in child_list) {
			var tag_name = pair[0].nodeName;
			if (typeof tag_name == 'undefined') continue;
			pairs.push([child_list[i], pair[1] + "." + tag_name]);
		}
	}
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
    iterate_elements(function visit_action(el, path){
      console.log('visit ' + path);
      if (typeof el.getBoundingClientRect == 'undefined') {return;}
      var rect = el.getBoundingClientRect();
      console.log('visit 2');
      //console.log("element N" + i + " : " + rect.left + " " + rect.top + " " + rect.width + " " + rect.height + " - " + els[i].tagName);
      //console.log("path: " + get_path(els[i]));
      console.log((rect.width + rect.height) + "	" + (rect.width - rect.height) + "	" +  get_path(el) + " " + el.className + ' ' + get_el_description(el, 3));
      var class_name = get_path(el) + " :: " + get_el_description(el, 3);
      if (!(class_name in el_groups)) { el_groups[class_name] = {mass:0, els:[]}; }
      el_groups[class_name].mass += (rect.width + rect.height);
      el_groups[class_name].els.push(el);
    });
    
    /*
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
    */

    var el_group_list = [];
    for (var key in el_groups) {
    	if (el_groups[key].els.length < 2) { continue; }
    	update_group(el_groups[key]);
    	el_group_list.push(el_groups[key]);
    }

    el_group_list.sort(function(a,b){return b.path.localeCompare(a.path);});

    for (var i = 1; i < el_group_list.length;) {
    	if (el_group_list[i-1].path == el_group_list[i].path) {
    		var new_els = merge_node_list(el_group_list[i-1].els, el_group_list[i].els);
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
		var report = {url: document.URL, groups:[]};
		var good_ids = [];
		for (var i in el_group_list) {
			var rel_depth = get_rel_depth(sel, el_group_list[i].els);
			if (rel_depth >=0) {
				good_ids.push(i);
			}
			var features = make_features(el_group_list[i]);
			features.push(0);
			report.groups.push(features);
		}

		var id = global_counter.make_red++;
		if (good_ids.length > 0) {
			var min_key = Math.min.apply(Math, good_ids);
			var features = report.groups[min_key];
			features[features.length - 1] = 1;
			var group = el_group_list[min_key];
			try {
		    	for (var j = 0; j < group.els.length; ++j) {
		    		make_red(group.els[j], id);
		    	}
	    	} catch(err) {
	    		console.log(err);
	    	}
		}

		var report_data = JSON.stringify(report);
		test_request(report_data);
		return;
	}

	//var urls= [url1, "ya.ru"];
	


    el_group_list.sort(function(a,b){return b.surface - a.surface;});
    //el_group_list = function(p1){asdasd}();
   	
   	tmp=[];
   	for (var i in el_group_list) {
   		var group = el_group_list[i];
   		var is_bad = false;
   		for (var j in group.els) {
   			if (group.els[j].innerText.length == 0) {
   				is_bad = true;
   				break;
   			}
   		}
   		if (!is_bad) {
   			tmp.push(group);
   		}
   	}
   	el_group_list = tmp;


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

function make_red(el, id) {
	el.className += ' red_border';
	 
	if (id == null) { return; }
	var span = document.createElement("div");
	var text = document.createTextNode("#" + id);
	span.appendChild(text);
	span.className = 'right_mark';
	el.appendChild(span);
}

function take_selection(id) {
	var sel = window.getSelection();
	
	if (sel.rangeCount > 0) {
		var range = sel.getRangeAt(0); //(i);
		if (range.collapsed) {
			console.log("take_selection... COLLAPSED");
			return null;
		}
		console.log("take_selection..." + range.toString());
		console.log("CAC: " + range.commonAncestorContainer.nodeName + " -> " + up_tag(range.commonAncestorContainer).nodeName);
		make_red(up_tag(range.commonAncestorContainer), id);
		//up_tag(range.startContainer).className += ' red_border_4';
		//up_tag(range.endContainer).className += ' red_border_5';
		return up_tag(range.commonAncestorContainer);
	} else {
		console.log("take_selection... NONE");
		return null;
	}	
}

function test_request(text) {
	console.log('send request...');
	chrome.runtime.sendMessage({
		    method: 'POST',
		    action: 'xhttp',
		    url: 'http://localhost:8000/',
		    data: text
		}, function(responseText) {
	    	console.log('response' + responseText);
		}
	);

	/*
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:8000/", true);
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
	    // WARNING! Might be evaluating an evil script!
	    //var resp = eval("(" + xhr.responseText + ")");
	    //...
	    console.log('response: ' + xhr.responseText);
	  }
	}
	xhr.send(text);
	*/
}
function test_write() {
	chrome.fileSystem.getDisplayPath(fileEntry, function(path) {
    	console.log(path)
  	});
	chrome.fileSystem.chooseEntry({type: 'saveFile'}, function(writableFileEntry) {
	    writableFileEntry.createWriter(function(writer) {
	      writer.onerror = errorHandler;
	      writer.onwriteend = function(e) {
	        console.log('write complete');
	      };
	      writer.write(new Blob(['1234567890'], {type: 'text/plain'}));
	    }, errorHandler);
	});
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
    	//take_selection('S');	
    	var els = document.getElementsByTagName("*");
    	for(var i in els){
    		if(/product/i.test(els[i].className)){
    			els[i].className += ' red_border';
    		} 
    	}
    } else if (params.method == 'test_write'){
    	test_request("HELLO WORLD!");
    } else {
    	console.log('Unregistered method name');
    }
	return {data: 'OK'};        
}

// TODO: make persistent storage
var global_counter = {
	'make_red': 0
};

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