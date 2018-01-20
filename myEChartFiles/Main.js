getOnlineInfo();
getNoticeInfo();
getTop5Message();

function getOnlineInfo() {
	var urlStr = getUrlDeviceReports();
	$.ajax({
		type: "get",
		url: urlStr,
		async: true,
		success: function(res) {
			var onlineSpan = document.getElementById("onlineCount");
			var offlineSpan = document.getElementById("offlineCount");
			var on = res.results.onlineInfo.online;
			var off = res.results.onlineInfo.total - on;

			onlineSpan.innerHTML = on + "个";
			offlineSpan.innerHTML = off + "个";
		},
		error: function(err) {

		}
	});
}

function getNoticeInfo() {
	var urlStr = getUrlNoticeLast();
	$.ajax({
		type: "get",
		url: urlStr,
		async: true,
		success: function(res) {

			var notice_h3 = document.getElementById("notice_title");
			var notice_c = document.getElementById("niotice_content");
			var notice_t = document.getElementById("notice_time");

			notice_h3.innerHTML = res.results.noticeTitle;
			notice_c.innerHTML = res.results.noticeContent;
			notice_t.innerHTML = res.results.publishDate;

		},
		error: function(err) {

		}
	});
}

function getSystemInfo () {
	var urlStr = getSiteGisControllers();
	
	$.ajax({
		type:"get",
		url:urlStr,
		async:true,
		success:function (res) {
			
		},
		error:function (err) {
			
		}
	});
}

function getTop5Message() {

	var pageSize = 5;
	var lastId = "";
	var status = "1";
	var eventType = "1,2";
	var urlStr = getSiteGisSensorsEvents();
	urlStr += "&pageSize=" + pageSize;
	urlStr += "&eventType=" + eventType;
	urlStr += "&lastId=" + lastId;
	urlStr += "&status=" + status;

	var docListStr = "";

	var cell_item_html_str = "<li class={{msg_type}}><a href=#><div class=cell_top><span class=dev_name>{{controllerType}}</span><span class=message_time>{{eventTime}}</span></div><div class=cell_bottom><span class=alert_type>报警类型：<span class=alert_type_color>{{eventType}}</span></span></div></a></li>";

	$.ajax({
		type: "get",
		url: urlStr,
		async: true,
		success: function(res) {

			var resultsType = typeof res.results;
			if(resultsType == "object") {
				var msgDataArr = res.results;
				var li_class_type = "";
				for(var i = 0; i < msgDataArr.length; i++) {
					var _cell_str = cell_item_html_str;

					var tempDic = msgDataArr[i];
					
					
					for(var k in tempDic) {
						
						if (k == "eventClass") {
							var msg_code = tempDic[k]["code"];
							if (msg_code == "1") {
								li_class_type = "main_cell_alarm";
							} else if (msg_code == "2") {
								li_class_type = "main_cell_fault";
							}
							_cell_str = _cell_str.replace('{{' + "msg_type" + '}}', li_class_type);
							
						} else if (k == "eventTime") {
							var firendStr = getTimeStringWithTimeStemp(tempDic[k]);
							_cell_str = _cell_str.replace('{{' + k + '}}', firendStr);
						} else {
							_cell_str = _cell_str.replace('{{' + k + '}}', tempDic[k]);
						}
						
					}

					docListStr += _cell_str;
				}
				
				var messageUl = document.getElementById("message_list_ul");
				messageUl.innerHTML = docListStr;
				
			}

		},
		error: function(err) {

		}
	});
}

$(document).ready(function() {

	makeEchart();
	runTest();

});

function runTest() {

	var imageBox = $(".bg_div");
	var bannerBg = $("#banner");

	var imageBoxWidth = $(imageBox).width();
	var imageNum = 2;

	var bodyW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var totalWidth = imageNum * bodyW;
	var delaytime = 4000;
	var speed = 700;
	var offsetIndex = 1;

	//重设背景宽度
	$(imageBox).css({
		'width': imageBoxWidth + 'px'
	});
	$(bannerBg).css({
		'width': totalWidth + 'px'
	});

	var rollTest = function() {

		if(offsetIndex == 1) {
			offsetIndex = 0;
		} else {
			offsetIndex = 1;
		}
		$(imageBox).animate({
			left: "-" + offsetIndex * imageBoxWidth + "px",
			speed
		});
	}

	var timer = setInterval(rollTest, delaytime);

}

function makeEchart() {
	var chart_do = document.getElementById('main_chart_circle');
	var cirChart = echarts.init(chart_do);

	var legendArr = [];
	var dataSource = [{
		name: "在线设备",
		value: 720,
		itemStyle: {
			color: '#fdbc83',
		}
	}, {
		name: "离线设备",
		value: 470,
		itemStyle: {
			color: '#3bb0fc',
		}
	}];

	var option = {
		visualMap: {
			show: false,
			min: 0,
			max: 0,
			inRange: {
				colorLightness: [0, 1]
			}
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		legend: {
			orient: 'vertical',
			x: 'left',
			data: legendArr
		},
		calculable: true,
		series: [{
			name: '访问来源',
			type: 'pie',
			radius: ['50%', '70%'],
			avoidLabelOverlap: false,
			label: {
				normal: {
					show: false,
					position: 'center',
					lineStyle: {
						color: 'rgba(255, 255, 255, 0.3)'
					}
				},
				emphasis: {
					show: false,
					position: 'center',
					lineStyle: {
						color: 'rgba(255, 255, 255, 0.3)'
					}
				}
			},
			labelLine: {
				normal: {
					show: true,
					lineStyle: {
						color: 'rgba(255, 255, 255, 0.3)'
					}
				}
			},

			data: dataSource
		}]
	};

	cirChart.setOption(option);
}