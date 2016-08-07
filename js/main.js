require.config({
	paths:{
		jquery:"../bootstrap-3.3.5-dist/js/jquery.min",
		bootstrapJS:"../bootstrap-3.3.5-dist/js/bootstrap.min",
		hammerjs:"./hammer/hammer.min",
		hammerjq:"./hammer/jqhammer",
		appStart:"./app",
		pageFirst:"./pages/pageFirst",
		pageSearch:"./pages/pageSearch",
		pageMsg:"./pages/pageMsg"
	},
	
	shim:{
		'bootstrapJS':{
			deps:["jquery"]
		},
		'Xframe':{
			deps:["jquery"],
			exports:'$Xframe'
		}
　　　　}
})

var surpportModules = ["jquery","bootstrapJS","hammerjs","hammerjq",'Xframe'];
var pages = ["pageFirst","pageSearch","pageMsg"];

require(surpportModules,function(){
	require(pages,function(){
		require(["appStart"],function(app){
			app.start();
		})
	})
})
