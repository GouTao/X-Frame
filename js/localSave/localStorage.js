(function($){
	$.LocalStorage=(function theLocalStorage(){
		theLocalStorage.isSurpport=function(){
			if(window.localStorage){
				return true;
			}
			else{
				return false;
			}
		}
		theLocalStorage.setLocalStorage=function(localStorageName,localStorageValue){
			try{
				localStorage.setItem(localStorageName,localStorageValue);
			}catch(e){
				alert("Failed save localStorage\n"+e.msg);
			}
		};
		theLocalStorage.getLocalStorage=function(localStorageName){
			if(localStorageName!=null){
				if(localStorage[localStorageName]){
					return localStorage.getItem(localStorageName);
				}
				else{
					return "";
				}
			}
			else{
				var localStorageInfoArr=[];
				for(var i=0;i<localStorage.length;i++){
					var key=localStorage.key(i);
					var obj=new Object();
					obj[key]=localStorage.getItem(key);
					localStorageInfoArr.push(obj);
				}
				return localStorageInfoArr;
			}
		};
		theLocalStorage.deleteLocalStorage=function(localStorageName){
			if(localStorageName==null){
				localStorage.clear();
			}
			else{
				try{
					localStorage.removeItem(localStorageName);
				}catch(e){
					console.log("No value matches the key")
				}	
			}
			
		};
		theLocalStorage.localStorageChange=function(callback){
			window.removeEventListener("storage");
			window.addEventListener("storage",function(e){
				callback(e);
			},false);
		}
		return theLocalStorage;
	})()
})(jQuery);