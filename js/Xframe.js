var $Xframe=(function layStyle(){
	var pageRoute=[];
	var tempPage,targPage;
	var $mask,$loading;
	$(window).on("resize",layout);
	$(window).bind('orientationchange',layout);
	$(document).ready(function(){
		$loading=$("<div id='loading' style='display:none'>"+
					"<div style='width:100%'>"+
						"<div class='rotateAnimate'></div><p style='font-size: 0.3em;'>LOADING...</p>"+
					"</div>"+
				"</div>")
		$("body").append($loading);
		$mask=$("<div class='mask' style='background-color:rgba(0,0,0,0.3)'></div>");
		$('body').append($mask);
		$mask.css("display","none");
		$mask.on("mouseup",function(){
			$mask.css("opacity","0");
			$("[data-role='slideBar']").each(function(){
				if($(this).css("z-index")=="10000"){
					if($(this).attr("direction")=="left"){
						$(this).addClass("slideChange leftSlideOut");	
					}
					else{
						$(this).addClass("slideChange rightSlideOut");
					}
					$("[data-role='page']").each(function(){
						$(this).removeClass('blur');
					})
					$(this).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(e){
						if($(e.target).attr("data-role")=="slideBar"){
							$(this).removeClass("slideChange leftSlideOut rightSlideOut");
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
		
		$("[data-role='mode-head']").each(function(){
			modeHead($(this));
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
		
		$(".btn-head-right").each(function(){
			btnHead($(this));
		})
		$(".btn-head-left").each(function(){
			btnHead($(this));
		})
		
		$(".head-search").each(function(){
			headSearch($(this));
		})
		$("[data-role='page-bind']").each(function(){
			if($(this).attr("bind-action")&&$(this).attr("bind-action")=="auto"){
				console.log("auto load")
				bindLoad($(this),null);
			}
		})
		
		$($("[data-role='page']")[0]).attr("inited","true").trigger("init");
	})
	//mode头部
	function modeHead($target){
		
	}
	
	//头部导航按钮
	function btnHead($target){
		if($target.children("label").length!=0){
			$target.css("line-height","35px");
		}
	}
	
	//头部搜索
	function headSearch($target){
		var $delete = $("<span class='glyphicon glyphicon-remove-circle deletHeaderSearch'></span>");
		$target.append($delete);
		$delete.css("opacity","0");
		$target.children("input").each(function(){
			$(this).unbind("focusin").on("focusin",function(){
				$(this).next("span").css("opacity","1");
			});
			$(this).unbind("focusout").on("focusout",function(){
				$(this).next("span").css("opacity","0");
			})
		})
		$target.children(".deletHeaderSearch").each(function(){
			$(this).unbind("click").on("click",function(){
				$(this).prev("input").val("");
			})
		})
	}
	
	//布局
	function layout(){
		$("body").css("width",$(window).width());
		$("[data-role='header']").children("h4").css("width",$(window).width()-120);
		$("[data-role='header']").children(".head-search").css("width",$(window).width()-120);
		$(".head-search").children("input").css("width",$(window).width()-150);
		$("[data-role='content']").css("height",$(window).height());
		//console.log($(".outContent").parent().hasClass("withHead"))
		//console.log($($(".outContent").parent("[data-role='content']")[0]).height())
		$(".outContent").css({
			"width":"100%",
			"height":$($(".outContent").parent("[data-role='content']")[0]).height()
		})
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
		$("#loading div div").css("left",$(window).width()/2-15);
		$("#loading div div").css("top",$(window).height()/2-50);
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
			if($(this).attr("data-direction")){
				if($(this).attr("data-direction")!="left"){
					layStyle.slideBarIn($(this).attr("data-target"),"right");
				}
				else{
					layStyle.slideBarIn($(this).attr("data-target"),"left");
				}
			}
			else{
				layStyle.slideBarIn($(this).attr("data-target"),"left");
			}
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
		if($target.hasClass("unnormal")){
			return;
		}
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
					$(this).parents("[data-role='page']").find("[data-role='content']").find("[data-role='page-mode']").each(function(){
						if($(this).attr("mode")==mode){
							if($(this).attr("mode-name")!=""){
								$(this).parents("[data-role='page']").find("[data-role='header'] h4").html($(this).attr("mode-name"))
							}
							$(this).addClass('active animated fadeIn');
							$(this).parents("[data-role='page']").find("[data-role='content']").animate({scrollTop:0},0)
						}
						else{
							$(this).removeClass('active  animated fadeIn');

						}
					})
					$(this).parents("[data-role='page']").find("[data-role='header']").find("[data-role='mode-head']").each(function(){
						if($(this).attr("data-target")==mode){
							$(this).show();
						}
						else{
							$(this).hide();

						}
					})
					mode=null;
				}
			}
		})
	}
	
	function bindLoad($target,loaded){
		var theurl = $target.attr('data-bind');
		if(theurl != ""){
			$.ajax({
				type:"get",
				url:theurl,
				async:true,
				dataType:"html",
				success:function(res){
					$target.append(res);
					if(loaded != null){
						loaded($target);
					}
				},
				error:function(){
					$target.html("加载出错...")
				}
			});
		}
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
		$("#"+pageID).css("display","block");
		try{
			$("#"+pageID).children("[data-role='header']").css('position','absolute');
			$("#"+pageID).children("[data-role='footer']").css('position','absolute');
			tempPage.children("[data-role='header']").css('position','absolute');
			tempPage.children("[data-role='footer']").css('position','absolute');
		}catch(e){}
		
		
		$mask.css("display","block");
		if(type == "reverse"){
			tempPage.addClass("pageChange-half pageOut-half");
		}
		else{
			tempPage.addClass("pageChange-half pageIn-half");
		}
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
				try{
					$("#"+pageID).children("[data-role='header']").css('position','fixed');
					$("#"+pageID).children("[data-role='footer']").css('position','fixed');	
				}catch(e){}
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
		try{
			targPage.children("[data-role='header']").css('position','absolute');
			targPage.children("[data-role='footer']").css('position','absolute');
			tempPage.children("[data-role='header']").css('position','absolute');
			tempPage.children("[data-role='footer']").css('position','absolute');
		}catch(e){}
		
		targPage.css("display","block");
		$mask.css("display","block");
		tempPage.addClass("pageChange-half pageOut-half");
		targPage.addClass("pageChange pageOut").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(e){
			if($(e.target).attr("data-role")=="page"){
				targPage.removeClass("pageChange pageOut");
				tempPage.removeClass('pageChange-half pageOut-half');
				try{
					targPage.children("[data-role='header']").css('position','fixed');
					targPage.children("[data-role='footer']").css('position','fixed');
				}catch(e){}
				$mask.css("display","none")
				tempPage.css('display','none');
				pageRoute.splice(pageRoute.length-1,1);
				tempPage.trigger("hide");
				tempPage=targPage;
			}
		});
	}
	//边侧栏出现
	layStyle.slideBarIn=function(slideID,direction){
		$("[data-role='page']").each(function(){
			$(this).addClass('blur');
		})
		$("[data-role='slideBar']").each(function(){
			if($(this).attr("data-slideBar")==slideID){
				$(this).css('display',"block");
				$(this).css('z-index',"10000");
				$mask.css("display","block");
				$mask.css("opacity","1");
				if(direction=="left"){
					$(this).addClass("slideChange leftSlideIn");
					$(this).attr("direction","left");
				}
				else{
					$(this).addClass("slideChange rightSlideIn");
					$(this).attr("direction","right");
				}
				$(this).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(e){
					if($(e.target).attr("data-role")=="slideBar"){
						$(this).removeClass("slideChange leftSlideIn rightSlideIn");
						if($(this).attr("direction")=="right"){
							$(this).css("right","0");
						}
					}
				})
			}
		})
	}
	//边侧栏消失
	layStyle.slideBarOut=function(slideID){
		$("[data-role='page']").each(function(){
			$(this).removeClass('blur');
		})
		$("[data-role='slideBar']").each(function(){
			if($(this).attr("data-slideBar")==slideID){
				$mask.css("opacity","0");
				if($(this).attr("direction")=="left"){
					$(this).addClass("slideChange leftSlideOut");	
				}
				else{
					$(this).addClass("slideChange rightSlideOut");
				}
				$(this).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(e){
					if($(e.target).attr("data-role")=="slideBar"){
						$(this).removeClass("slideChange leftSlideOut rightSlideOut");
						$(this).css('display',"none");
						$(this).css('z-index',"1");
						$mask.css("display","none");
					}
				})
			}
		})
	}
	
	//回到某个页面的第一个模块
	layStyle.pageReshow=function(pageID){
		if($("#"+pageID).find("[data-role='nav']")[0]!=undefined){
			$("#"+pageID).find("[data-role='nav']").children("li").each(function(){
				$(this).removeClass('active');
			})
			if($("#"+pageID).find("[data-role='nav']").children("li:first-child").attr("mode-target")!=undefined){
				$("#"+pageID).find("[data-role='nav']").children("li:first-child").addClass('active');
			}
			$("#"+pageID).find("[data-role='page-mode']").each(function(){
				$(this).removeClass('active');
			})
			$("#"+pageID).find("[data-role='page-mode']:first-child").addClass('active');
			$("#"+pageID).find("[data-role='mode-head']").each(function(){
				$(this).hide();
			})
			$("#"+pageID).find("[data-role='mode-head']:first-of-type").show();
		}
	}
	
	//显示load界面
	layStyle.loadShow=function(){
		$("#loading").show();
	}
	//隐藏load界面
	layStyle.loadHide=function(type){
		if(type != "fadeOut"){
			$("#loading").hide();
		}
		else{
			$("#loading").addClass("animated fadeOut")
			$("#loading").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(e){
				$("#loading").remove("animated fadeOut");
				$("#loading").hide();
			})
		}
	}
	//加载页面碎片
	layStyle.bindPageLoad=function($target,loaded){
		bindLoad($target,loaded)
	}
	return layStyle
}
)()
