function formatDateTime(timeStamp, showType) {
	/*
	 * 时间是：24小时🈯制的时间 
	 * showType : 0----> yyyy-MM-dd HH:mm:ss
	 * showType : 1----> HH:mm:ss
	 * showType : 2----> yyyy-MM-dd
	 * showType : 3----> MM-dd
	 * showType : 4----> dd
	 * showType : 5----> MM-dd hh:mm
	 * showType : 6----> hh:mm
	 * showType : 7----> hh
	 * showType : 8----> yyyy-MM-dd HH:mm
	 */
	var date = new Date();
	date.setTime(timeStamp);
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;

	if(showType == 0) {
		return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
	} else if(showType == 1) {
		return h + ':' + minute + ':' + second;
	} else if(showType == 2) {
		return y + '-' + m + '-' + d;
	} else if(showType == 3) {
		return m + '-' + d;
	} else if(showType == 4) {
		return d;
	} else if(showType == 5) {
		return m + '-' + d + ' ' + h + ':' + m;
	} else if(showType == 6) {
		return h + ':' + m;
	} else if(showType == 7) {
		return h;
	} else if(showType == 8) {
		return y + '-' + m + '-' + d + ' ' + h + ':' + minute;
	} else {
		return y + '-' + m + '-' + d;;
	}
}

function getTimeStringWithTimeStemp(tempStr) {

	var timeStempType = typeof tempStr;
	
	if (timeStempType == "string") {
		tempStr = parseInt(tempStr);
	}
	
	var currentDate = new Date;
	
	currentDate = currentDate.getTime() / 1000.0;
	
	if(timeStempType == "number") {
		tempStr = tempStr / 1000.0;
		var timeAgoInterval = currentDate - tempStr;
		var msgDay = formatDateTime(tempStr, 4);
		var curDay = formatDateTime(currentDate, 4);

		if(timeAgoInterval < 60.0) {
			return "刚刚";
		} else if(timeAgoInterval >= 60.0 && timeAgoInterval < (60 * 60)) {

			var minutes = timeAgoInterval / 60.0;
			minutes = minutes.toFixed(0);
			var str = minutes + "分钟前";
			return str;
		} else if(timeAgoInterval >= (60 * 60) && curDay == msgDay && timeAgoInterval < (24 * 60 * 60)) {
			var str = formatDateTime(tempStr, 6);
			return str;
		} else {
			var str = formatDateTime(tempStr, 3);
			return str;
		}
		return "未知时间";
	}
}

function getAddrWithLevelDict (addrDict) {
	
	var str = "";
	
	var eleType = typeof addrDict;
	if (eleType == "object") {
		
		var dic = addrDict.parseJSON();
		
		for (var i = 0; i < dic.ength; i++) {
			var k = "level" + (i + 1);
			var v = dic[k];
			var vt = typeof v;
			if (vt == "string") {
				str += v;
			}
		}
	} else if (eleType == "string") {
		
		var dic = JSON.parse(addrDict);
		var i = 0;
		for (var k in dic) {
			var indx = i + 1;
			var level = "level" + indx.toString();
			var v = dic[level];
			var vt = typeof v;
			if (vt == "string") {
				str += v;
			}
			i ++ ;
		}
	}
	
	return str;
}

/*
 * base
 * 
 * */

function getUserToken() {
	return "5a03442b-e179-49a1-b1b4-5ca55be62a5d";
}

function getTokenKey () {
	return "token";
}

function getBaseUrl() {
	
//	return "http://www.iot-x.com.cn:8888/";
	
	return "http://183.220.115.100:8888/";
}


/*
 * url
 * 
 * */

// 此方法不能被外部调用
function makeFullUrl (tempUrl) {
	var t = typeof tempUrl ;
	
	if (t != "string") {
		console.log("请求的url错误");
		return "";
	} else if (t.length == 0) {
		console.log("url长度为0");
		return "";
	}
	
	return getBaseUrl() + tempUrl + "?" + getTokenKey() + "=" + getUserToken();
}

function getUrlDeviceReports() {
	return makeFullUrl("api/device/reports");
}

function getUrlNoticeLast () {
	
	return makeFullUrl("api/notice/last");
}

function getSiteGisSensorsEvents () {
	return makeFullUrl("api/siteGis/sensorsEvents");
}

function getSiteGisControllers () {
	return makeFullUrl("api/siteGis/controllers");
}

