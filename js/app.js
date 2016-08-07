define(function(){
	var start = function(){
		$("#enterApp").removeClass("btn-unable").on("click",function(){
			$Xframe.to("pageFirst");
		})
	}
	return {
		start:start
	}
})
