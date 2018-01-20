function arrayTestFunction () {
	
	//创建一个数组
	var array = [];
	var array1 = new Array();
	var array2 = new Array(1,1,2,2,3,3);
//	var eve = event.target;
	var array3 = new Array(50);//注意：这里的50是：数组的长度是50，而不是有一个元素是50.
	
	
//	alert(array3);
	
	//数组的长度
//	array2.length = 
    //数组中元素的获取
//  array2[0] = ;//获取第一个元素
	
	//数组的长度 是可变的
	//js当中的数组是个：伪对象 ----->即：数组中有3个元素，但是我们去取index = 30 ，这样做，是不会崩溃的
	//如果要改变数组的长度,则:
	//array3的长度为30个元素，如果数组原来没有30个，则现在放了几个null去填充，如果原来的数组个数超过30个，则去掉index = 29之后的元素
	array3.length = 30;
	
	
	
	array.prototype = true;
	
	//1.增加原素
	array.push(1,2,3,4,5,6); // 将数组当中 添加元素（添加在数组的最后）
	array.unshift(14,15); // 在数组的最前面 添加元素
	array.push(5,6,7); //继续增加元素
	array1.push(1,1,1,2);
	//在index=3的位置，添加一个元素：10，index=3之后的元素统统保留，类似于插入一个元素
	array[3] = 10;	
	//拼接数组
	// array.concat([a,b,c,d]);在数组 array的后面追加 另一个数组 [a,b,c,d]当中的所有元素，并赋值给一个新的数组cc
	var cc = array.concat(["a","b","c","d"]);
	
	//把元素按照ascii表的大小，进行排序
	cc.sort();
	//在元素个元素之间添加一个 标识符 然后输出
	cc.join("-");
	alert("cc = " + cc.join("-"));//注意：这里如果输出 cc ,而不是 cc.join("-")，则看不到 添加的“-” ;
	
	
	
	
	//2.删除某个或多个元素
	array.pop();//删除最后一个元素
	array.shift();//删掉第一个元素
	array.splice(3);//保留数组当中的最后 x 个元素,其余的都删除掉
	//括号当中需要填写2~3个参数
	/*
	 1.开始删除的index
	 2.删除的长度
	 3.删除之后，在这个index 后面追加一个元素 (这个参数可以不写)
	 
	 * */
	//例如：array.splice(1,2);的意思是：去掉array中的 从index=1的位置开始（包括index=1），的连续的3个元素
	array.splice(1,2);
	
	//array.splice(1,2,"w shi xin shou");
	//去掉array中的 从index=1的位置开始（包括index=1），的连续的2个元素,之后再添加一个"w shi xin shou"
	array.splice(1,2,"w shi xin shou");
	
	
	//3.替换一个指定元素的值
	
	
	
	//4.获取/查询指定range的元素
	
	//这个数组本身没有任何变化，但是这个slice方法，会有一个返回值，如下
	var bb = array.slice(1,2);
	//注意：这个(1,2)只一个 类似于高中学习的区间的概念 ：[1,2) ==>包含1，步包含2 =====>1 <= X < 2 ; 
	//这个时候 bb = "2";即 数组中 index=1开始，取1个元素，返回出去,并赋值给bb;
	
	
	
	
	
	//
	
	
//	array2.sort();
	
	array.reverse(); // 将数组中的元素次序反转
	
	var p1 = array[0];
	var p2 = this[1];
	
//	alert(p2);
	
	
	
	
	
	
	
}


