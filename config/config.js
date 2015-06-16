var initial_alias = "index";
var initial_path = "/";

var base_config = {
	"contentHTMLDir" : "content/html",	
	"contentJSDir" : "content/js",	
}

var map_config = 
[
	{"alias": "index" ,"html":"index.html","js":"index.js"},
	{"alias": "sub" ,"html":"sub.html","js":"sub.js"},
];

var map_ele_config = 
[
	{"alias":"header","html":"header.html","js":"header.js","detach":true,"prepend":true,startHandler:"header_start"},	

 ];

var base_ele_config = {
	"contentHTMLDir" : "element/html",	
	"contentJSDir" : "element/js",	
}
