function nihao () {
	//单击，双击出发 ajks值的变化，鼠标移动，键盘按下，表单，页面事件, 都可以出发事件
	
	//js的事件机制
	
	alert("测试单击事件");
}

function eventObject () {
	//声明一个事件对象
	
	
	
}

function showMove (event) {
	
	//在不同的浏览器是可能会有不同的显示
	//注意：火狐浏览器的event是必须以参数的形式传递及拿来的，所以参数当中必须有一个event
	var  eve = window.event || event;
	
//	alert(eve);

    //获取鼠标的值
    //这里会用到xy坐标轴中的 象限的概念 -- >坐标算法，和 oc相同
    
//  alert("鼠标的位置(x:"+eve.x+",y:"+eve.y+")");// 如果这样写输出语句，同样是违背了适配浏览器的，所以：

    var x = eve.x || eve.pageX;
	var y = eve.y || eve.pageY;

     alert("鼠标的位置(x:"+x+",y:"+y+")");
    
}

function showKey (event) {
	//和上面一样，也需要获取事件
	
	var  eve = window.event || event;
	
	//获取事件的值====键盘上按下的值
	
	var code = eve.charCode || eve.keyCode;
	
	//输出事件的值
	
	alert(code);
	
}

