getDtuListData();

function getDtuListData() {
	// bull_site : 688e09a9-3891-4181-aad4-26ba5d4dccbe
	// 开发内侧 : 79d6d42b-4c04-4e21-86bc-862bd09ce7b0         
	var siteTToken = "79d6d42b-4c04-4e21-86bc-862bd09ce7b0";
	
	/*
	 * 电气火灾监控 ： 1 
	 * 消防电源监控 ： 2
	 * 防火门监控   ： 3
	 * 气体灭火监控 ： 4
	 * 
	 * 
	 * 
	 * 
 	 * */
	
	var sysCode = "";
	var urlStr = getDeviceDtu() + "&siteToken=" + siteTToken;

	$.ajax({
		type: "get",
		url: urlStr,
		async: true,
		success: function(res) {
			
			var results = res.results;
			var resultsType = typeof results;
			if(resultsType == "object") {
				makeDtuListLi(results);
			}
		},
		error: function(err) {

		}
	});

}

function makeDtuListLi(dataArr) {
	var doc_dtuList = "";
	var dtuList_li = "<li class=dtu_list_li><a href=#><img class=dtu_status_type src=../img/{{online_status_left}} /><div class=cell_right_bg><div class=fir_right><img class=dtu_onlne_icon src=../img/{{onlineIcon}} /><span class=dtu_online_text>{{onlineStatusText}}</span><img class=dtu_single_icon src=../img/{{signal}} /><span class=dtu_hardwareId></span></div><div class=sec_right><span class=dtu_addr_name>{{address}}</span></div><div class=thi_right><span class=dtu_alarm>报警</span><span class=dtu_alarm_count>{{alertCount}}个</span><span class=dtu_fault>故障</span><span class=dtu_fault_count>{{faultCount}}个</span><span class=dtu_normal>正常</span><span class=dtu_normal_count>{{normalCount}}个</span></div></div></a></li>";

console.log("1111111");
console.log(dataArr);
console.log("2222222");
for(var i = 0; i < dataArr.length; i++) {
		var tempDic = dataArr[i];
		var _dtuList_li = dtuList_li;

		for(var k in tempDic) {

			var tempValueStr = tempDic[k];
			var tempKey = k;
			if(k == "address") {
				tempValueStr = getAddrWithLevelDict(tempDic[k]);
			} else if(k == "totalCount") {
				var normalCount = tempDic[k] - tempDic["alertCount"] - tempDic["faultCount"];
				tempValueStr = normalCount;
				tempKey = "normalCount";
			} else if (k == "online") {
			    tempValueStr = getDtuImgStatusImgName(tempDic);
				tempKey = "online_status_left";
				var iconName = getOnlineIconImgName(tempDic);
				_dtuList_li = _dtuList_li.replace('{{' + "onlineIcon" + '}}', iconName);
				var onLineStatusText = getOnlineStatusText(tempDic);
				_dtuList_li = _dtuList_li.replace('{{' + "onlineStatusText" + '}}', onLineStatusText);
			} else if (k == "signal") {
				var signImgName = getSignalImgName(tempDic[k]);
				tempValueStr = signImgName;
			}
			_dtuList_li = _dtuList_li.replace('{{' + tempKey + '}}', tempValueStr);
		}

		doc_dtuList += _dtuList_li;
	}

	var ul_list = document.getElementById("dtu_list");
	ul_list.innerHTML = doc_dtuList;
}

function getDtuImgStatusImgName (dic) {
	
	var onImg = "pdg正常.png";
	var offImg = "pdg离线.png";
	
	return getImgName(dic, onImg, offImg);
}

function getOnlineIconImgName (dic) {
	var onImg = "pdg有信号.png";
	var offImg = "pdg无信号.png";
	
	return getImgName(dic, onImg, offImg);
}

function getImgName (dic, onImg, offImg) {
	var stats = getOnlineStatus(dic);
	if (stats == true) {
		return onImg;
	} else if (stats == false) {
		return offImg;
	} 
	console.log("online字段数据，于约定形式不同");
	return offImg;
}

function getOnlineStatus (dic) {
	
	var online = dic["online"];
	var signal = dic["signal"];
	var strength = getDtuSignalStrength(signal);
	if (online == true && strength > 0) {
		//当且仅当 在线&&信号强度 > 0，才能显示为：在线
		return true;
	}
	return false;
}

function getOnlineStatusText (dic) {
	var staus = getOnlineStatus(dic);
	if (status == true) {
		return "在线";
	}
	return "离线" ;
}

function getSignalImgName (signal) {
	var num = getDtuSignalStrength(signal);
	if (num == 0) {
		return "无信号.png";
	}
	var imgName = num + "格.png";
	return imgName;
}

function getDtuSignalStrength (signal) {
	
	if (signal > 30) {
		signal = 30 ;
	} else if (signal < 0) {
		signal = 0 ;
	}
	var strength = signal % 6 ;
	if (strength > 0) {
		strength += 1;
	} else {
		strength = 0;
	}
	return strength;
}

