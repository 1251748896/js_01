
 $(document).ready(function(){

 var sWidth = $(document.body).width();
 var len = $('#pic1 .slidebar li').length;
 var timer;
 var index = 0;

 var focusBox = '<ul class="focusBox clearfix"></ul>';
 $('#pic1').append(focusBox);
 $('#pic1').width(sWidth);
 $('#pic1').height(sWidth*0.5625);
 $('#pic1 li').width(sWidth);

 //生成底部焦点
 for(var i=0;i<len;i++){
 	var li = document.createElement('li');
    $('.focusBox')[0].appendChild(li);
 }

//上一张
 $('#pic1 a.prev').click(function(){
 	index -=1;
 	if(index == -1){index = len-1}
 	showPic(index);
 });

//下一张
 $('#pic1 a.next').click(function(){
 	index +=1;
 	if(index == len){index=0}
  showPic(index);
 });

 $('#pic1').live({
  mouseenter:function(){
    $('#pic1 a.prev,#pic1 a.next').animate({"opacity":0.6},1000);
  },
  mouseleave:function(){
    $('#pic1 a.prev,#pic1 a.next').animate({"opacity":0},1000);
  }
 })
  
  //点击圆点时，进行切换
 $('#pic1 .focusBox li').click(function(){
 	index = $('#pic1 .focusBox li').index(this);
 	showPic(index); 
 }).eq(0).trigger('click');
 
 $('#pic1 .slidebar').css("width",sWidth * (len));

//定时器，定时进行切换
 $('#pic1').hover(function(){
 	clearInterval(timer);
    },function(){
	 	timer = setInterval(function(){
	 	showPic(index);
	 	index++;
	 	if(index == len){index = 0;}
        },2500);
 }).trigger('mouseleave');

 function showPic(index){
 	var nowLeft = -index * sWidth;
 	$('#pic1 .slidebar').stop(true,false).animate({left:nowLeft},500);
 	$('#pic1 .focusBox li').removeClass('cur').eq(index).addClass('cur');
  //$('.slidebar li').eq(index).fadeIn(800).siblings().hide();//淡出淡入效果
 }

});

