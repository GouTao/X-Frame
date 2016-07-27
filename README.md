# X-Frame
用来开发移动端web页面webApp的自用轻框架

/＊＊＊＊页面＊＊＊＊／
定义一个页面
<div data-role="page" id="pageID">
  <div data-role="header"></div>
  <div data-role="content:></div>
  <div data-role="footer"></div>
</div>
页面切换
<element data-role="page-lead" data-target="pageID"></element>  //当前页面向左方退出，新页面从右方进入
<element data-role="page-lead" data-target="pageID" data-direction="reverse"></element>  //当前页面向又方退出，新页面从左方进入

／＊＊＊＊header按钮＊＊＊＊＊／
...
<div data-role="mode-head" data-target="pm1">
	<div class="btn-head-left" data-role="slide-lead" data-target="userSlide" >
		<span class="glyphicon glyphicon-th-list"></span>
	</div>
	<div class="btn-head-right" data-role="page-lead" data-target="pageEdit" data-direction="right">
		<span class="glyphicon glyphicon-file"></span>
		<label>新帖</label>
	</div>
</div>
...

/＊＊＊＊页面模块＊＊＊＊／
定义单一页面不同模块
...
<div data-role="content>
  <div data-role="page-mode" mode="modeNameX" mode-name="modeX"></div>
  <div data-role="page-mode" mode="modeNameY"></div>
  <div data-role="page-mode" mode="modeNameZ"></div>
</div>
...
可以为不同的模块添加对应的标题栏
...
<div data-role="header">
  <h4></h4>     //自动绑定mode-name属性，如果相应模块存在此属性
  <div data-role="mode-head" data-target="modeNameX"></div>
  <div data-role="mode-head" data-target="modeNameX"></div>
  <div data-role="mode-head" data-target="modeNameX"></div>
</div>
...
可以在页面切换不同的模块
...
<div data-role="footer">
	<ul data-role="nav">
		<li mode-target="modeNameX" class="active">
			<span class="glyphicon glyphicon-home"></span>  //使用bootstrap字体图标
			<label>首页</label>
		</li>
		<li data-role="page-lead" data-target="pageSearch">
			//不使用任何图片图标
			<label>搜索</label>
		</li>
		<li mode-target="modeNameY">
			<span class="glyphicon glyphicon-comment"></span>
			<label>消息</label>
		</li>
		<li mode-target="modeNameZ">
			<span>  //自定义图片
				<img src="img/user-normal.png" class="normal"/>
				<img src="img/user-checked.png" class="checked"/>
			</span>
			<label>账户</label>
		</li>
	</ul>
</div>

／＊＊＊＊侧滑栏＊＊＊＊／
定义一个侧滑栏
<div data-role="slideBar" data-slideBar="slideID" style="background-color: black;">
	<button data-role="slide-back" class="btn btn-primary btn-block">return</button>   //返回按钮
</div>
跳转到侧滑栏
<element data-role="slide-lead" data-target="slideID" ></element>  //默认从左边出现
<element data-role="slide-lead" data-target="slideID" data-direction="right"></element>  //从右边出现

／＊＊＊＊一些方法＊＊＊＊／
$Xframe.to(pageID,direction)  //跳转到某一页，direction不填为从左至右，值right为从右至左
$Xframe.refresh(type,container)  //type为刷新类型，container为需要刷新的组件（值为jq选择器条件）
$Xframe.pageReshow(pageID)   //重置某一个页面到第一个page-mode，如果该页面存在page-mode
$Xframe.loadShow()/$Xframe.loadHide()   //显示或者隐藏加在等待覆盖层

