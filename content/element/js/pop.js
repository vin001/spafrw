$(document).ready(function(){
	
	console.log("pop ready!!");
	
	$("#at1,#at2").bind("click",function(){
		alert($(this).attr("id"));
	});
	
});