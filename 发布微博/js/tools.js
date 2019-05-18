var tools={
	$: function (selector, isAll, parent) {
		parent = parent || document;
		if(isAll){
			return parent.querySelectorAll(selector);
		}
		return parent.querySelector(selector);
	},
	setStyle: function (obj, attrJson) {
		for(var key in attrJson) {
			obj.style[key] = attrJson[key];
		}
	},
	getBodySize: function () {
		return {
			width: document.documentElement.clientWidth || document.body.clientWidth,
			height: document.documentElement.clientHeight || document.body.clientHeight
		}
	},
	
}