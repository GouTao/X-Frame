var basic=(function layStyle(){
	var pageRoute=[];
	var tempPage,targPage;
	var $mask
	$(window).on("resize",layout);
	$(window).bind('orientationchange',layout);
	$(document).ready(function(){
		$mask=$("<div class='mask'></div>");
		$('body').append($mask);
		$mask.css("display","none");
		$mask.on("mouseup",function(){
			$("[data-role='slideBar']").each(function(){
				if($(this).css("z-index")=="10000"){
					$(this).addClass("slideChange slideOut").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(e){
						if($(e.target).attr("data-role")=="slideBar"){
							$(this).removeClass("slideChange slideOut");
							$(this).css('display',"none");
							$(this).css('z-index',"1");
							$mask.css("display","none");
						}
					})
				}
			})
		})
		$("[data-role='page']").each(function(){
			if($(this).children("[data-role='header']")[0]!=undefined){
				$(this).children("[data-role='content']").addClass("withHeader")
			}
			if($(this).children("[data-role='footer']")[0]!=undefined){
				$(this).children("[data-role='content']").addClass('withFooter');
			}
		})
		layout();
		tempPage=$("[data-role='page']:first-child");
	})
	
	layStyle.to=function(pageID){
		pageRoute.push(tempPage);
		$("[data-role='page']").css("z-index","1");
		$("#"+pageID).css("z-index","100");
		$("#"+pageID).children("[data-role='header']").css('position','absolute');
		$("#"+pageID).children("[data-role='footer']").css('position','absolute');
		tempPage.children("[data-role='header']").css('position','absolute');
		tempPage.children("[data-role='footer']").css('position','absolute');
		$("#"+pageID).css("display","block");
		$mask.css("display","block");
		tempPage.addClass("pageChange-half pageIn-half");
		
		if($("#"+pageID).find("[data-role='nav']")[0]!=undefined){
			$("#"+pageID).find("[data-role='nav']").children("li").each(function(){
				$(this).removeClass('active');
			})
			$("#"+pageID).find("[data-role='nav']").children("li:first-child").addClass('active');
			$("#"+pageID).find("[data-role='page-mode']").each(function(){
				$(this).removeClass('active');
			})
			$("#"+pageID).find("[data-role='page-mode']:first-child").addClass('active');
		}
		
		$("#"+pageID).addClass("pageChange pageIn").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(e){
			if($(e.target).attr("data-role")=="page"){
				$("#"+pageID).removeClass("pageChange pageIn");
				tempPage.removeClass('pageChange-half pageIn-half');
				$("#"+pageID).children("[data-role='header']").css('position','fixed');
				$("#"+pageID).children("[data-role='footer']").css('position','fixed');
				$mask.css("display","none")
				tempPage.css('display','none');
				tempPage=$("#"+pageID);
			}
		});
	}
	layStyle.back=function(){
		targPage=pageRoute[pageRoute.length-1];
		//$("[data-role='page']").css("z-index","1");
		//targPage.css("z-index","100");
		targPage.children("[data-role='header']").css('position','absolute');
		targPage.children("[data-role='footer']").css('position','absolute');
		tempPage.children("[data-role='header']").css('position','absolute');
		tempPage.children("[data-role='footer']").css('position','absolute');
		targPage.css("display","block");
		$mask.css("display","block");
		tempPage.addClass("pageChange-half pageOut-half");
		if(targPage.find("[data-role='nav']")[0]!=undefined){
			targPage.find("[data-role='nav']").children("li").each(function(){
				$(this).removeClass('active');
			})
			targPage.find("[data-role='nav']").children("li:first-child").addClass('active');
			targPage.find("[data-role='page-mode']").each(function(){
				$(this).removeClass('active');
			})
			targPage.find("[data-role='page-mode']:first-child").addClass('active');
		}
		targPage.addClass("pageChange pageOut").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(e){
			if($(e.target).attr("data-role")=="page"){
				targPage.removeClass("pageChange pageOut");
				tempPage.removeClass('pageChange-half pageOut-half');
				targPage.children("[data-role='header']").css('position','fixed');
				targPage.children("[data-role='footer']").css('position','fixed');
				$mask.css("display","none")
				tempPage.css('display','none');
				pageRoute.splice(pageRoute.length-1,1);
				tempPage=targPage;
			}
		});
	}
	
	layStyle.slideBarIn=function(slideID){
		$("[data-role='slideBar']").each(function(){
			if($(this).attr("data-slideBar")==slideID){
				$(this).css('display',"block");
				$(this).css('z-index',"10000");
				$mask.css("display","block");
				$(this).addClass("slideChange slideIn").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(e){
					if($(e.target).attr("data-role")=="slideBar"){
						$(this).removeClass("slideChange slideIn");
						$(this).css("right","0");
					}
				})
			}
		})
	}
	layStyle.slideBarOut=function(slideID){
		$("[data-role='slideBar']").each(function(){
			if($(this).attr("data-slideBar")==slideID){
				$(this).addClass("slideChange slideOut").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(e){
					if($(e.target).attr("data-role")=="slideBar"){
						$(this).removeClass("slideChange slideOut");
						$(this).css('display',"none");
						$(this).css('z-index',"1");
						$mask.css("display","none");
					}
				})
			}
		})
	}
	
	
	$("[data-role='page-lead']").each(function(){
		$(this).on("mouseup",function(e){
			if($(this).attr("data-target")!="back"){
				layStyle.to($(this).attr("data-target"));
			}
			else{
				layStyle.back();
			}
		})
		
	})
	
	$("[data-role='slide-lead']").each(function(){
		$(this).on("mouseup",function(e){
			layStyle.slideBarIn($(this).attr("data-target"));
		})
	})
	
	$("[data-role='slide-back']").each(function(){
		$(this).on("mouseup",function(e){
			layStyle.slideBarOut($(this).parents("[data-role='slideBar']").attr("data-slideBar"));
		})
	})
	
	$("[data-role='nav']").each(function(){
		$(this).children("li").css("width",((1/$(this).children('li').length)*100).toString()+"%");
	})
	
	$("[data-role='nav'] li").each(function(){
		if($(this).find('span')[0]==undefined){
			$(this).find('label').css({
				"margin-top":"0px",
				"line-height":"50px",
				"line-hight":"50px",
				"font-size": "0.8em"
			})
		}
		
		if($(this).find('label')[0]==undefined){
			$(this).find('span').css({
				"margin-top":"0px",
				"line-height":"50px",
				"line-hight":"50px",
				"font-size": "1em"
			})
		}
		
		$(this).on("mouseup",function(e){
			if($(this).hasClass('active')){
				return;
			}
			else{
				$(this).parent().children('li').each(function(){
					$(this).removeClass('active');
				})
				$(this).addClass('active');
				$(this).parents("[data-role='page']").find("[data-role='content']").children("[data-role='page-mode']").each(function(){
					$(this).removeClass('active  animated fadeIn');
				})
				$("[mode='"+$(this).attr("mode-target")+"']").addClass('active animated fadeIn');
			}
		})
	})
	
	function layout(){
		$("body").css("width",$(window).width());
		$("[data-role='header']").children("h4").css("width",$(window).width()-120);
		$("[data-role='content']").css("height",$(window).height());
		$mask.css({
			"width":"100%",
			"height":$(window).height(),
			"z-index":5000,
			"opacity":"0",
			"position":"fixed",
			"top":"0",
			"left":"0"
		})
		$("[data-role='slideBar']").css({
			"height":$(window).height(),
			"overflow-x": "hidden",
			"overflow-y": "auto"
		});
	}
	return layStyle
})()
