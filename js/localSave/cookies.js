(function($){
	$.Cookies=(function cookies(){
		cookies.hasCookies=function(){
			if(cookiesArr().length==0){
				return false;
			}
			else if(cookiesArr().length==1&&cookiesArr()[0]==""){
				return false;
			}
			else{
				return true;
			}
		};
		cookies.setCookies=function(cookieName,cookieValue,extendDay){
			var d = new Date();
			if(extendDay==null){
				document.cookie = cookieName + "=" + cookieValue;
			}
			else{
				d.setTime(d.getTime()+(extendDay*24*60*60*1000));
				var expires = "expires="+d.toGMTString();
				document.cookie = cookieName + "=" + cookieValue + "; " + expires;
			}
			
		};
		cookies.getCookies=function(cookieName){
			var name=cookieName+"=";
			var cArr=cookiesArr();
			for(var i=0;i<cArr.length;i++){
				var c=cArr[i].trim();
				if(c.indexOf(name)==0){
					return c.substring(name.length,c.length);
				}
			}
			return "";
		};
		cookies.deleteCookies=function(cookieName){
			if(cookieName==null){
				var names=document.cookie.match(/[^ =;]+(?=\=)/g); 
				if (names) { 
					for (var i = names.length; i--;) {
						document.cookie=names[i]+'=0;expires=' + new Date(0).toUTCString()
					}
				}
			}
			else{
				document.cookie = cookieName+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
			}
			
		}
		function cookiesArr(){
			//console.log("cc:"+document.cookie.split(";")[0])
			return document.cookie.split(";");
		}
		return cookies;
	})()
})(jQuery);