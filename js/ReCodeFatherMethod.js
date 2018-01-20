function test () {
	alert("没有采纳数");
}

function test (a) {
	alert("有一个参数");
}

function test (a,b) {
	//可以查看形参的个数
	alert("我的形参个数：[" + test.length + "] 实际传入的参数个数为：[" + arguments.length + "]");
}


