$(document).ready(function(){
	console.log("index loaded");
	
	/*$("#sub").bind("click",function(){
		content.load("sub");
	})*/
	
	$("#sub").touch(function(){
		content.load("sub");
	},"touched");
	
	content.attach("header");
});