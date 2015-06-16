$(document).ready(function(){
	
	console.log("b ready!!!!!");

	$("#b").bind("click",function(){
		content.load("index");
	});

	$("#popadd").bind("click",function(){
		content.attach("pop");
	});
	
	$("#popdel").bind("click",function(){
		content.remove("pop");
	});
	
});