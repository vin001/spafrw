$(document).ready(function(){
	
	console.log("a ready!!!!!");
	
	$("#index").bind("click",function(){
		content.load("index");
	});

	$("#b").bind("click",function(){
		content.load("second");
	});
	
	$("#popadd").bind("click",function(){
		content.attach("pop");
	});
	
	$("#popdel").bind("click",function(){
		content.remove("pop");
	});

	$("#popadd2").bind("click",function(){
		content.attach("pop2");
	});
	
	$("#popdel2").bind("click",function(){
		content.remove("pop2");
	});
});