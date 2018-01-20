
function getServerData (appToken) {
	var xhsUrl = "http://183.220.115.100:8088/api/index/sites";
	
	appToken = "c6517583-cb0c-432d-bea4-5bca70505c60";
	
	$.ajax({
		
		type:"GET",
		url:xhsUrl,
		async:true,
		dataType:"json",
		data:{
			"token":appToken,
			//"version":"2",
		},
		success:function (res) {
			callBackXHS(res);
		}
	});
}

function  callBackFun (data) {
	
}
