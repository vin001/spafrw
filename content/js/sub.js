$(document).ready(function(){
	console.log("sub page loaded!!");
	
	$("#index").bind("click",function(){
		content.load("index");
	});
	
	//content.remove("header");
});