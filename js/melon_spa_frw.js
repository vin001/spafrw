/*
 * Device Define
 */

var _isAndroid   = (/android/gi).test(navigator.appVersion),
	_isIDevice   = (/iphone|ipad/gi).test(navigator.appVersion),
	_isIE        = (/MSIE/gi).test(navigator.appVersion),
	_iasChrome   = (/Chrome/gi).test(navigator.appVersion),
	_isMobileWeb = (_isAndroid || _isIDevice);

/*
 * extend object
 */

function Class() { }
Class.prototype.construct = function() {};
Class.extend = function(name,def)
{
	var classDef = function() {
		if (arguments[0] !== Class) {
			this.construct.apply(this, arguments);
		}
	};
	
	var proto = new this(Class);
	var superClass = this.prototype;
	
	for (var n in def) {
		var item = def[n];
		if (item instanceof Function) item.$ = superClass;
		proto[n] = item;
	}
	
	classDef.prototype = proto;
	classDef.extend = this.extend;
	classDef.prototype.classname = name;
	
	return classDef;
};


/*
 * start module
 */

$(document).ready(function(){
	content._init();
});



/*
 * content load
 * */
var _ContentLoader = Class.extend("",{
	
	loadedPage : null,
	configUri : "config/config.js",
	subElement : [],
	
	_init : function(){
		var that = this;
		this._getConfigFile(function(){
			that._initHashData(that._loadInit);
		});
	},
	
	_loadInit : function(){
		content.load(initial_alias);
		var hash = location.hash.split("#").join("");
		if(hash == initial_alias){
			content._runScript(hash);
		}
	},
	
	_getConfigFile : function(fn){
		var thatFn = fn;
		$.getScript(this.configUri,function(data){
			eval(thatFn());
		});
	},
	
	_initHashData : function(fn){
		
		var that = this;
		var hash = location.hash.split("#").join("");
		
		$(window).bind('hashchange', function() {
			var hash = location.hash.split("#").join("");
			that._procHashData(hash);
		});
		
		if(initial_alias == hash || hash == "" ){
			eval(fn());
		}else{
			this._procHashData(hash);			
		}
	},
	
	_procHashData : function(hash){
		
		var _tmpHtml,_tmpJs;
		var config_base_html_path = base_config["contentHTMLDir"];
		var config_base_js_path   = base_config["contentJSDir"];
		
		_tmpHtml = map_config[this._getConfigMap(hash)]["html"];
		_tmpJs   = map_config[this._getConfigMap(hash)]["js"];
		
		if(hash == "" || hash == initial_alias){
			hash == initial_alias
			config_base_html_path = "";
			config_base_js_path = "js";
		}

		this._getRemoteData(config_base_html_path + "/" + _tmpHtml,hash);
	},
	
	_getRemoteData : function(uri,hash){
		
		var thatHash = hash;
		var that = this;
		
		$.get(uri).done(function(data){
			
			var body = (data.split("<body>")[1]).split("</body>")[0];
			var save = $('div[data-detach="true"]').detach();
			
			$('body').empty().append(save);
			$("body").prepend(body);
			
			var tmp_title = (data.split("<title>")[1]).split("</title>")[0];
			$("title").empty();
			$("title").html(tmp_title);
			
			that._runScript(thatHash);
		});
		
	},
	
	load : function(alias){
		this._changeHash(map_config[this._getConfigMap(alias)]);
	},
	
	_changeHash : function(obj){
		$(location).attr('href',window.location.pathname + '#' + obj["alias"]);
	},
	
	_runScript : function(alias){
		
		var config_base_js_path   = base_config["contentJSDir"];
		var that = this;
		
		if(alias == initial_alias){
			config_base_js_path = "js";
		}
		
		var thatAlias = alias;
		
		$.getScript(config_base_js_path + "/" + map_config[this._getConfigMap(alias)]["js"],
			function(data){
				that.loadedPage = thatAlias;
			}
		);
	},
	
	_getConfigMap : function(alias){
		for(var key in map_config){
			if(map_config[key]["alias"] == alias){
				return key;
			}
		}
	},
	
	attach : function(alias){
		
		var thatAlias = alias;
		var that = this;
		if(this.subElement.indexOf(alias) > -1){
			
		}else{
			$.get(base_ele_config["contentHTMLDir"] + "/" + map_ele_config[this._getEleConfigMap(alias)]["html"],function(data){
				$("body").append("<div id = '" + thatAlias + "' data-detach = '" + map_ele_config[that._getEleConfigMap(thatAlias)]["detach"] +  "'>" + data + "</div>");
			});
			$.getScript(base_ele_config["contentJSDir"] + "/" + map_ele_config[this._getEleConfigMap(alias)]["js"]);
			this.subElement.push(alias);
		}
	},
	
	remove : function(alias){
		$("#" + alias).remove();
		 this.subElement.splice(this.subElement.indexOf(alias),1);
		
	},
	
	_getEleConfigMap : function(alias){
		for(var key in map_ele_config){
			if(map_ele_config[key]["alias"] == alias){
				return key;
			}
		}
	},
	
});
/*
 * App Base Class
 */
var App = Class.extend("",{

});

/*
 * Application Class
 */
var Application = App.extend("Application",{

	
});


/*
 * Class Define 
 */
var content = new _ContentLoader();

