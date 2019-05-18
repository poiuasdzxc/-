function Post() {
	this.button=tools.$("button");
	this.container=tools.$("#container");
	console.log(this.button,this.container)
	this.bindEvents();
	
}
 Post.prototype={
	constrcutor: Post,
	// 绑事件
	bindEvents:function(){
		this.button.onclick=function(){
			this.postBox();
			console.log(1)
		}.bind(this)
		this.container.onclick= e=>{
			console.log(e.target)
			switch(e.target.id){
				case"okBtn":this.okBtnClick();
				case "closeBtn": this.closeBtnClick(); break;
			}
		}
		this.container.oncontextmenu=function(e){
			let left=e.clientX,top=e.clientY;
			this.target=e.target;
			this.contextmenu(left,top);
			e.preventDefault();
			
		}.bind(this)
// 		for (var key in this.arr){
// 			this.arr[key].onclick=function(){
// 				this.contextmenu();
// 			}.bind(this)
// 		}
	},
	// 弹出发布框的方法
	postBox:function(){
		// container里面添加内容
		this.container.innerHTML='<h4>发布框</h4><h6>内容显示区</h6><div class="top"><a id="closeBtn" class="close_btn" href="javascript:;">×</a><p><label>用户名：<input id="username" type="text"></label></p><p><label>内容：<textarea  value="" name="" id="content" cols="30" rows="10"></textarea></label></p><p><button id="okBtn" class="okBtn" type="button">发布</button></p></div>';
		// 居中显示
		this.showCenter(this.container);
		// modal遮罩
		this.modal=document.createElement("div");
		this.modal.className="modal";
		document.body.appendChild(this.modal);
		// 可拖拽
		this.drag(this.container,"h4");
		
	},
	showCenter:function(obj){
		tools.setStyle(obj,{
			display:"block",
			position:"absolute",
		});
		window.onresize=(function(center){
			let left=(tools.getBodySize().width-obj.offsetWidth)/2+"px";
			let top=(tools.getBodySize().height-obj.offsetHeight)/2+"px";
			tools.setStyle(obj,{left,top});
			return center;
		})();
	},
	// 拖拽
	drag:function(obj,title){
		this.obj=obj;
		this.title=this.obj.querySelector(title);
		console.log(this.obj,this.title)
		this.title.onmousedown=function(e){
			let x=e.offsetX,y=e.offsetY;
			console.log(22222);
			document.onmousemove= e=>{
				let left=e.clientX-x, top=e.clientY-y;
				tools.setStyle(this.obj,{
					left:left+"px",
					top:top+"px",
				});
			}
			this.title.onmouseup=function(){
				document.onmousemove=null;
			}.bind(this)
			return false;
		}.bind(this)
	},
		// 关闭按钮的方法
		closeBtnClick:function(){
			 this.box=this.container.querySelector("div");
			 // this.box.style.display="none";
			this.modal.remove();
		},
		// 确定按钮的方法
		okBtnClick:function(){
			this.username = tools.$("#username").value;
			this.content1=tools.$("#content").value;

			if(this.username===""||this.content===""){
				alert("用户名或密码不能为空");
			}else{
				this.h6=this.container.querySelector("h6");
				console.log(this.h6)
				this.span=document.createElement("p");
				this.span.className="text";
				 this.str="";
				  this.date=new Date();
				 this.str=`${this.date.getFullYear()}年${this.date.getMonth()+1}月${this.date.getDate()}日${this.date.getHours()}时${this.date.getMinutes()}分${this.date.getSeconds()}秒`;
				this.span.innerHTML=this.content1+"<br>"+this.str;
				console.log(this.span);
				this.h6.appendChild(this.span);
				
				
			}
		},
		// 右键撤销菜单
		contextmenu:function(left,top){
			console.log(123)
			this.arr=[];
			this.context=document.createElement("ul");
			this.context.className="contextmenu";
			this.context.innerHTML='<li id="ret">撤销</li><li>刷新</li>';
			this.context.style.left=left+"px";
			this.context.style.top=top+"px";
			document.body.appendChild(this.context);
			// this.arr.push(this.span);
			this.ret=this.context.querySelector("#ret");
			console.log(this.ret);
			 this.time=new Date();
			 this.subtime=0;
			this.subtime=this.time-this.date;
			console.log(this.subtime);
			// 判断两分钟
			this.ret.onclick=function(e){
				if(this.subtime<=60000){
					console.log(this.subtime);
					this.target.remove();
					console.log(789)
					this.context.remove();
				}
			}.bind(this)

// 			this.container.onclick= ()=>{
// 				console.log(123456)
// 				this.context.remove();
// 			}
		},
		
		
	
}
new Post();