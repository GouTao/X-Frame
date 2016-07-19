(function($){
	$.Session=(function session(){
		session.isSurpport=function(){
			if(window.sessionStorage){
				return true;
			}
			else{
				return false;
			}
		}
		session.setSession=function(sessionName,sessionValue){
			try{
				sessionStorage.setItem(sessionName,sessionValue);
			}catch(e){
				alert("Failed save session");
			}
		};
		session.getSession=function(sessionName){
			if(sessionName!=null){
				if(sessionStorage[sessionName]){
					return sessionStorage.getItem(sessionName);
				}
				else{
					return "";
				}
			}
			else{
				var sessionInfoArr=[];
				for(var i=0;i<sessionStorage.length;i++){
					var key=sessionStorage.key(i);
					var obj=new Object();
					obj[key]=sessionStorage.getItem(key);
					sessionInfoArr.push(obj);
				}
				return sessionInfoArr;
			}
		};
		session.deleteSession=function(sessionName){
			if(sessionName==null){
				sessionStorage.clear();	
			}
			else{
				try{
					sessionStorage.removeItem(sessionName);
				}catch(e){
					console.log("No value matches the key")
				}	
			}
		};
		return session;
	})()
})(jQuery);