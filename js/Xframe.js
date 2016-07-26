var $Xframe=(function layStyle(){
	var pageRoute=[];
	var tempPage,targPage;
	var $mask
	var loading=$("<div id='loading' style='display:none'>"+
				"<div>"+
					"<span class='glyphicon glyphicon-globe'><p style='font-size: 0.3em;'>LOADING...</p></span>"+
				"</div>"+
			"</div>")
	$("body").append(loading)
	$(window).on("resize",layout);
	$(window).bind('orientationchange',layout);
	$(document).ready(function(){
		$mask=$("<div class='mask' style='background-color:rgba(0,0,0,0.3)'></div>");
		$('body').append($mask);
		$mask.css("display","none");
		$mask.on("mouseup",function(){
			$mask.css("opacity","0");
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
			if($($(this).children("[data-role='content']")[0]).hasClass("VMcontent")){
				if($($(this).children("[data-role='content']")[0]).hasClass("withHeader")){
					$($(this).children("[data-role='content']")[0]).css("padding-top","50px");
					$($(this).children("[data-role='content']")[0]).css("padding-bottom","50px")
				}
				if($($(this).children("[data-role='content']")[0]).hasClass("withFooter")){
					$($(this).children("[data-role='content']")[0]).css("padding-top","50px");
					$($(this).children("[data-role='content']")[0]).css("padding-bottom","50px");
				}
			}
		})
		layout();
		tempPage=$("[data-role='page']:first-child");
		
		$("[data-role='page-lead']").each(function(){
			pageLead($(this));
		});
		
		$("[data-role='slide-lead']").each(function(){
			slideLead($(this));
		})
		
		$("[data-role='slide-back']").each(function(){
			slideBack($(this));
		})
		
		$("[data-role='nav']").each(function(){
			navLay($(this));
		})
		
		$("[data-role='nav'] li[data-role!='page-lead']").each(function(){
			navLead($(this));
		})
		
		$($("[data-role='page']")[0]).attr("inited","true").trigger("init");
	})
	
	//布局
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
		$("#loading").css("width",$(window).width());
		$("#loading").css("height",$(window).height());
	}
	
	//页面切换
	function pageLead($target){
		$target.unbind("mouseup").on("mouseup",function(e){
			if($(this).attr("data-target")!="back"){
				if($(this).attr("data-direction")){
					if($(this).attr("data-direction") == "reverse"){
						layStyle.to($(this).attr("data-target"),"reverse");
					}
					else{
						layStyle.to($(this).attr("data-target"),"normal");
					}
				}
				else{
					layStyle.to($(this).attr("data-target"),"normal");
				}
			}
			else{
				layStyle.back();
			}
		})
	}
	
	//调出边侧栏
	function slideLead($target){
		$target.unbind("mouseup").on("mouseup",function(e){
			layStyle.slideBarIn($(this).attr("data-target"));
		})
	}
	
	//边侧栏消失
	function slideBack($target){
		$target.unbind("mouseup").on("mouseup",function(e){
			layStyle.slideBarOut($(this).parents("[data-role='slideBar']").attr("data-slideBar"));
		})
	}
	
	//布局下部导航
	function navLay($target){
		$target.children("li").css("width",((1/$target.children('li').length)*100).toString()+"%");
		$target.children("li").each(function(){
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
		})
	}
	//下部导航栏事件
	function navLead($target){
		$target.unbind("mouseup").on("mouseup",function(e){
			if($(this).hasClass('active')){
				return;
			}
			else{
				if($("[mode='"+$(this).attr("mode-target")+"']")[0]!=undefined){
					$(this).parent().children('li').each(function(){
						$(this).removeClass('active');
					})
					$(this).addClass('active');
					var mode=$(this).attr("mode-target");
					$(this).parents("[data-role='page']").find("[data-role='content']").children("[data-role='page-mode']").each(function(){
						if($(this).attr("mode")==mode){
							$(this).addClass('active animated fadeIn');
						}
						else{
							$(this).removeClass('active  animated fadeIn');

						}
					})
					mode=null;
				}
			}
		})
	}
	
	//刷新动态添加的列表
	layStyle.refresh=function(type,container){
		switch (type){
			case "page-lead":
				$(container).children("[data-role='page-lead']").each(function(){
					pageLead($(this));
				});
				break;
			case "slide-lead":
				$(container).children("[data-role='slide-lead']").each(function(){
					slideLead($(this));
				});
				break;
			case "slide-back":
				$(container).children("[data-role='slide-back']").each(function(){
					slideBack($(this));
				});
				break;
			case "nav":
				navLay($(container));
				$(container).children("li[data-role!='page-lead']").each(function(){
					navLead($(this));
				})
				break;
			default:
				break;
		}
	}
	
	//页面切换至指定id
	layStyle.to=function(pageID,type){
		if($("#"+pageID).attr("inited")==undefined){
			$("#"+pageID).trigger("init");
			$("#"+pageID).attr("inited","true")
		}
		else{
			$("#"+pageID).trigger("show");
		}
		pageRoute.push(tempPage);
		if(type != "reverse"){
			$("[data-role='page']").css("z-index","1");
			$("#"+pageID).css("z-index","100");
		}
		$("#"+pageID).children("[data-role='header']").css('position','absolute');
		$("#"+pageID).children("[data-role='footer']").css('position','absolute');
		tempPage.children("[data-role='header']").css('position','absolute');
		tempPage.children("[data-role='footer']").css('position','absolute');
		$("#"+pageID).css("display","block");
		$mask.css("display","block");
		if(type == "reverse"){
			tempPage.addClass("pageChange-half pageOut-half");
		}
		else{
			tempPage.addClass("pageChange-half pageIn-half");
		}
//		if($("#"+pageID).find("[data-role='nav']")[0]!=undefined){
//			$("#"+pageID).find("[data-role='nav']").children("li").each(function(){
//				$(this).removeClass('active');
//			})
//			if($("#"+pageID).find("[data-role='nav']").children("li:first-child").attr("mode-target")!=undefined){
//				$("#"+pageID).find("[data-role='nav']").children("li:first-child").addClass('active');
//			}
//			$("#"+pageID).find("[data-role='page-mode']").each(function(){
//				$(this).removeClass('active');
//			})
//			$("#"+pageID).find("[data-role='page-mode']:first-child").addClass('active');
//			
//			$("#"+pageID).trigger("show");
//		}
		if(type == "reverse"){
			$("#"+pageID).addClass("pageChange pageOut");
		}
		else{
			$("#"+pageID).addClass("pageChange pageIn");
		}
		$("#"+pageID).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(e){
			if($(e.target).attr("data-role")=="page"){
				$("#"+pageID).removeClass("pageChange pageIn pageOut");
				tempPage.removeClass('pageChange-half pageIn-half pageOut-half');
				$("#"+pageID).children("[data-role='header']").css('position','fixed');
				$("#"+pageID).children("[data-role='footer']").css('position','fixed');
				$mask.css("display","none")
				tempPage.css('display','none');
				tempPage.trigger("hide");
				tempPage=$("#"+pageID);
			}
		});
	}
	//页面直接返回上一个id
	layStyle.back=function(){
		targPage=pageRoute[pageRoute.length-1];
		targPage.children("[data-role='header']").css('position','absolute');
		targPage.children("[data-role='footer']").css('position','absolute');
		tempPage.children("[data-role='header']").css('position','absolute');
		tempPage.children("[data-role='footer']").css('position','absolute');
		targPage.css("display","block");
		$mask.css("display","block");
		tempPage.addClass("pageChange-half pageOut-half");
		targPage.addClass("pageChange pageOut").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(e){
			if($(e.target).attr("data-role")=="page"){
				targPage.removeClass("pageChange pageOut");
				tempPage.removeClass('pageChange-half pageOut-half');
				targPage.children("[data-role='header']").css('position','fixed');
				targPage.children("[data-role='footer']").css('position','fixed');
				$mask.css("display","none")
				tempPage.css('display','none');
				pageRoute.splice(pageRoute.length-1,1);
				tempPage.trigger("hide");
				tempPage=targPage;
			}
		});
	}
	//边侧栏出现
	layStyle.slideBarIn=function(slideID){
		$("[data-role='slideBar']").each(function(){
			if($(this).attr("data-slideBar")==slideID){
				$(this).css('display',"block");
				$(this).css('z-index',"10000");
				$mask.css("display","block");
				$mask.css("opacity","1");
				$(this).addClass("slideChange slideIn").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(e){
					if($(e.target).attr("data-role")=="slideBar"){
						$(this).removeClass("slideChange slideIn");
						$(this).css("right","0");
					}
				})
			}
		})
	}
	//编程栏消失
	layStyle.slideBarOut=function(slideID){
		$("[data-role='slideBar']").each(function(){
			if($(this).attr("data-slideBar")==slideID){
				$mask.css("opacity","0");
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
	
	//显示load界面
	layStyle.loadShow=function(){
		$("#loading").show();
	}
	//隐藏load界面
	layStyle.loadHide=function(){
		$("#loading").hide();
	}
	return layStyle
})()
