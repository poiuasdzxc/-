function Carousel(){
	this.container=tools.$("#container");
	this.ul=this.container.querySelector("ul");
	this.imgs=this.ul.querySelectorAll("img");
	this.ol=this.container.querySelector("ol");
	this.goPrev=this.container.querySelector("#goPrev");
	this.goNext=this.container.querySelector("#goNext");
	this.btns=[];
	this.index = 0;
	this.lastIndex = 0;
	this.createBtns();
	this.bindEvents();
 	this.tab(this.goNext,this.goPrev);
	this.autoPlay();
	this.mouse();
	console.log(this.ul,this.ol); 	console.log(this.imgs);
	console.log(this.container,this.goNext);
}
Carousel.prototype={
	constructor:Carousel,
	// 创造Btns的方法
	createBtns:function(){
		for(let i=0;i<this.imgs.length-1;i++){
			this.li=document.createElement("li");
			this.li.innerHTML=i+1;
			this.ol.appendChild(this.li);
			this.btns.push(this.li);
			if(i===0) {this.btns[i].classList.add("ac");}
		}
	},
	bindEvents:function(){
		for(let j=0;j<this.imgs.length-1;j++){
			this.btns[j].onclick=()=>{
				this.index=j;
				this.changeImgs();
				this.lastIndex=this.index;
			}
		}
	},
	// 前后切换
	tab:function(obj1,obj2){
		obj1.onclick=function(){
			if(++this.index===this.imgs.length-1){
				this.changeImgs2();
				this.lastIndex=this.index;
				
			}else{
				this.changeImgs();
				this.lastIndex=this.index;
			}
			
		}.bind(this)
		obj2.onclick=function(){
			if(--this.index<0){
				
				this.changeImgs3();
				this.lastIndex=this.index;
				
			}else{
				this.changeImgs();
				this.lastIndex=this.index;
			}
			
		}.bind(this)
	},
	// 自动切换
	autoPlay:function(){
	 this.timer=setInterval(function(){
		 this.goNext.onclick();
	 },2000);	
	},
	// 鼠标事件
	mouse:function(){
		this.container.onmouseenter=function(){
			clearInterval(this.timer);
			console.log(this,1111);
		}.bind(this)
		this.container.onmouseleave=function(){
			this.autoPlay();
			console.log(this,2222);
		}.bind(this)
	},
	// 切换图片的方法
	changeImgs:function(){
		tools.move(this.ul,"top",-500*(this.index),700);
		this.btns[this.lastIndex].classList.remove("ac");
		this.btns[this.index].classList.add("ac");
	},
	changeImgs2:function(){
		tools.move(this.ul,"top",-500*(this.index),600);
		setTimeout(function(){
			this.ul.style.top = '0';
		}.bind(this),600)
		// this.ul.style.left = '0';
		this.index = 0;
		this.btns[this.lastIndex].classList.remove("ac");
		this.btns[this.index].classList.add("ac");
	},
	changeImgs3:function(){
// 		tools.move(this.ul,"left",-850*(this.index),700);
// 		setTimeout(function(){
// 			this.ul.style.left = '-3400px';
// 		}.bind(this),10)
	this.ul.style.top = '-2500px';
	tools.move(this.ul,"top",-500*(this.index+5),700);
		this.index = this.imgs.length-2;
		this.btns[this.lastIndex].classList.remove("ac");
		this.btns[this.index].classList.add("ac");
	},
	
}


new Carousel();