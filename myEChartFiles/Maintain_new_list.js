var requesting = false;

var pageSize = 20;
var listDataArr = new Array();

var docList = document.getElementById('maintain_list');
var docStr = '';

var baseUrl = "http://183.220.115.100:8888/";
var taskUrl = "api/repair/task/list";
var lastId = "";
var repairStatus = "0";//处理状态(0:所有；1:未处理 2:已处理)
var userToken = "b0a28375-36bf-469e-947f-25071372b0c8";

taskUrl = baseUrl + taskUrl + "?token=" + userToken + "&repairStatus=" + repairStatus + "&pageLastId=" + lastId + "&pageSize=" + pageSize; 


getDataSource();

function getDataSource() {
	
	$.ajax({
		type: "get",
		url: taskUrl,
		async: true,
		success: function (res) {
			var results = res.results;
			if (results.length > 0) {
				makeTableList(results);
			}
		},
		error: function (err) {
			
		}
	});
}

function makeTableList (dataArray) {
	console.log(dataArray);
	var docuList = document.getElementById('maintain_list');
	
	var maintainList = "<a class=linkLabel><li><div class=item_top><img class=projectImg src={{imageUrl}} /><div class=itemRight><div class=itemRight_top>{{siteName}}</div><div class=itemRight_middle><span class=alarmType>{{eventType}}</span><span class=alarmTime>{{eventTime}}</span></div><div class=itemRight_bottom>地址：{{fixAddress}}</div></div></div><div class=maintainNum>维保单号：{{taskId}}</div><div class=appointTime>{{status}}：{{dateTime}}</div></li></a>";
	
	for (var i = 0; i < dataArray.length; i++) {
		
		var tempDic = dataArray[i];
		var _maintainList = maintainList;
		
		var dataTime = formatDateTime(tempDic["dateTime"], 5);
		var msgTime = formatDateTime(tempDic["eventTime"], 8);
		var addr = getAddrWithLevelDict(tempDic["fixAddress"]);
		for (var k in tempDic) {
			if (k == "dateTime") {
				_maintainList = _maintainList.replace("{{" + "dateTime" + "}}",dataTime);
			} else if (k == "fixAddress") {
				_maintainList = _maintainList.replace("{{" + "fixAddress" + "}}",addr);
			} else if (k == "eventTime") {
				_maintainList = _maintainList.replace("{{" + "eventTime" + "}}",msgTime);
			} else {
				_maintainList = _maintainList.replace("{{" + k + "}}",tempDic[k]);
			}
		}
		docStr += _maintainList;
	}
	docuList.innerHTML = docStr;
}

