var tools={
	$:function (selector, isAll, parent) {
		// 判断是否传了父级对象
		parent = parent || document;
		if(isAll){
			return parent.querySelectorAll(selector);
		}
		return parent.querySelector(selector);
	},
	move: function (obj, attr, end, time) {
		// 先清除上一次的timer
		clearInterval(obj.timer);
		// 获取起点值
		let start = parseInt(this.getStyle(obj, attr));
		// 计算总距离
		let distance = end - start;
		// 根据时间计算总步数, 为了避免超出终点值，向下取整
		let steps = Math.floor(time / 20);
		// 速度
		let speed = distance / steps;
		// 开始运动
		let n = 0; // 记录当前步数
		obj.timer = setInterval(function () {
			n++;
			obj.style[attr] = start + n*speed + "px";
			// 如果到达终点（步数走完）
			if(n === steps) {
				clearInterval(obj.timer);
				// 有可能距离终点还差0.几步
				obj.style[attr] = end + "px";
			}
		}, 20);
	},
	getStyle: function (obj, attr) {
		if(obj.currentStyle) {
			// IE兼容
			return obj.currentStyle[attr];
			
		}else{
			return getComputedStyle(obj, false)[attr];
		}
	},
}