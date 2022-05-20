var Web_Get = Array(),IS_Login = false,IS_Admin = false,CFG_Url_Ajax = "//hsajax.app/",Loading_Photo_Number = Array(),Slider_Photo_Time;
var CFG_Url_Web = window.location.protocol + '//' + location.host + '/';
var CFG_Url_Dedication = Array('http://avplay.cc/','http://269.la/','http://hsvideo.cc/');
var TMP_Domain = location.host.split('.');
var CFG_Domain_Top = TMP_Domain[TMP_Domain.length-2] + '.' + TMP_Domain[TMP_Domain.length-1];
var CFG_Server_Type = 1;
var _czc = _czc || [];

//页面开始加载
$(function(){
	$('body').append('<script async src="https://www.googletagmanager.com/gtag/js?id=UA-117694078-2"></script><script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag(\'js\', new Date());gtag(\'config\', \'UA-117694078-2\');</script>');
	
	$('#Search-Val').bind('keypress',function(event){if(event.keyCode == "13"){To_Search()}});
	
	Web_Get = Get_Get();
	
	if(Web_Get['t'] == '' || Web_Get['t'] == null || Web_Get['t'] == 'undefined'){
		Web_Get['t'] = 'index';
	}
	
	if(parseInt(Web_Get['p']) > 0){$('.title-box .show-page').removeClass('hide');}

	var TMP_Type = Web_Get['t'];
	if(TMP_Type.indexOf('/')>-1){
		TMP_Type = TMP_Type.split('/')[0];
	}
	$('[data-nav="'+TMP_Type+'"]').addClass('active');
	
	_czc.push(["_trackEvent",'Sys','Request',Web_Get['t']]);
	
	if(Web_Get['s'] != '' && Web_Get['s'] != null && Web_Get['s'] != 'undefined'){
		$('#Search-Val').val(decodeURIComponent(Web_Get['s']));
		$('#Search-Del').removeClass('hide');
		_czc.push(["_trackEvent",TMP_Type,'Search',Web_Get['s']]);
	}
	if(Web_Get['class'] != '' && Web_Get['class'] != null && Web_Get['class'] != 'undefined'){
		_czc.push(["_trackEvent",TMP_Type,'Class',Web_Get['class']]);
	}
	
	//$('body').append('<script async src="https://static.xycdn.cc/all/Speed-Test/Speed.js"></script>');
});


//转到指定页面
function To_Url(Url){
	window.location.href = Url;
}

//分页跳转
function To_Page(Page){
	window.location.href = Page_Url+Page;
}

//加载图片
function Loading_Photo(Class){
	var Number = 0;
	var Residue = 0;
	$('[data-type="'+Class+'"]').each(function(){
		if($(this).data('photo') != null){
			if($(this).data('photo') != ''){
				if(Number < 6){
					Number++;
					$(this).attr('src',$(this).data('photo'));
					$(this).data('photo','');
			   }else{
				   Residue++;
			   }
			}
		}
	});
	
	if(Loading_Photo_Number[Class] < 6 || Residue > 0){
		Loading_Photo_Number[Class]++;
		setTimeout("Loading_Photo('"+Class+"')",1000);
	}else{
		
	}
}

//获取GET
function Get_Get(GET,Is_Str){
	var Result_Get = Array();
	var Result_Str = '';
	var TMP_Get = location.search.substring(1) +'&'+ GET;
	var TMP_Array_1 = TMP_Get.split('&');
	var TMP_Array_2 = Array();
	for($i=0;$i<TMP_Array_1.length+1;$i++){
		if(TMP_Array_1[$i] != undefined){
			TMP_Array_2 = TMP_Array_1[$i].split('=');
			TMP_Array_2[1] = decodeURIComponent(TMP_Array_2[1]);
			if(TMP_Array_2[0] != '' && TMP_Array_2[0] != undefined){
				if(TMP_Array_2[1] != '' && TMP_Array_2[1] != undefined){
					Result_Get[TMP_Array_2[0]] = TMP_Array_2[1];
				}
			}
		}
	}
	
	if(Is_Str == true){
		var TMP_Key;
		for(TMP_Key in Result_Get){
			Result_Str += TMP_Key + '=' + Result_Get[TMP_Key] + '&';
		}
		Result_Str = Result_Str.substr(0,Result_Str.length-1);
		return Result_Str;
	}else{
		return Result_Get;
	}
}

function POST_Error(){
	
}

//直接填写URL方式提交数据
function Ajax_POST(Url,Data,Type,Success,Error,Loading_Tag){
	if(!Loading_Tag){Loading_Tag='#Loading-Box';}
	if(Data != ''){var Url_Type = 'POST';}
	else{var Url_Type = 'GET';}
	
	$.ajax({
		type: Url_Type,
		url: Url,
		data: Data,
		dataType: Type,
		cache: false,
		crossDomain: true,
		beforeSend: function(xhr){xhr.withCredentials = true},
		xhrFields: {withCredentials: true},
		error: function(){
			Error(Url);
		},
		success:function(Xml){
			Success(Xml);
		}
	});
}

//系统组合请求方式提交数据
function Ajax_Data(Url,Madel,Ajax_Header,Ajax_Class,Ajax_Type,POST_Data,Success,Error,Data_Type,Ajax_Remark,Loading_Tag){
	if(!Data_Type){Data_Type = 'xml';}
	//if(!Loading_Tag){Loading_Tag='#Loading-Box';}
	if(POST_Data != ''){var Url_Type = 'POST';}
	else{var Url_Type = 'GET';}
	$.ajax({
		type: Url_Type,
		url: Url+'?m='+Madel+'&ajax_header='+Ajax_Header+'&ajax_class='+Ajax_Class+'&ajax_type='+Ajax_Type+'&ajax_remark='+Ajax_Remark,
		data: POST_Data,
		dataType: Data_Type,
		cache: false,
		crossDomain: true,
		beforeSend: function(xhr){xhr.withCredentials = true},
		xhrFields: {withCredentials: true},
		error: function(){
			Error();
		},
		success: function(Data){
			Success(Data);
		}
	});
	if(Ajax_Header != 'admin' && Ajax_Header != 'user'){
		//_czc.push(["_trackPageview",'?name='+Page_Name+'&file='+Page_Type+'&operation=ajax'+'&ajax_header='+Ajax_Header+'&ajax_class='+Ajax_Class+'&ajax_type='+Ajax_Type+'&ajax_remark='+Ajax_Remark]);
	}
	if(IS_Admin == true){
	   Admin_Tools('video');
		Admin_Tools('photo');
	}
}

//生成分页代码
function Get_List_Page(Data_Num,Show_Num,Page,Print,Print_Function,NoMax,Jump_Page,PF_Code){
	var Code = '';

	if(Jump_Page=='' || Jump_Page==null){Jump_Page = 'List_Page';}

	var Max_Page = Math.ceil(Data_Num/Show_Num);

	if(Max_Page<=0){var Max_Page = 1;}

	if(Page<=1){
		Code = Code +'<li class="prev"><a href="javascript:void(0)" onclick="'+Jump_Page+'(1)"><i class="fa fa-angle-double-left"></i></a></li>';
		Code = Code +'<li class="prev"><a href="javascript:void(0)" onclick="'+Jump_Page+'(1)"><i class="fa fa-angle-left"></i></a></li>';
	}else{
		Code = Code +'<li class="prev"><a href="javascript:void(0)" onclick="'+Jump_Page+'(1)"><i class="fa fa-angle-double-left"></i></a></li>';
		Code = Code +'<li class="prev"><a href="javascript:void(0)" onclick="'+Jump_Page+'('+(Page-1)+')"><i class="fa fa-angle-left"></i></a></li>';
	}

	if(Page<3){
		var Start = 1;
	}else if(Max_Page - Page <3 && Max_Page - Page != 0){
		var Start = Max_Page - 4;
	}else{
		var Start = Page-2;
	}

	for($i=Start;$i<Start+5;$i++){
		if($i>Max_Page){break;}
		if($i>0){
			if($i==Page){
				Code = Code +'<li class="active"><a href="javascript:void(0)">'+$i+'</a></li>';
			}else{
				Code = Code +'<li><a href="javascript:void(0)" onclick="'+Jump_Page+'('+$i+')">'+$i+'</a></li>';
			}
		}
	}

	if(Max_Page<=Page){
		Code = Code +'<li class="prev"><a href="javascript:void(0)" onclick="'+Jump_Page+'('+Max_Page+')"><i class="fa fa-angle-right"></i></a></li>';
		Code = Code +'<li class="next"><a href="javascript:void(0)" onclick="'+Jump_Page+'('+Max_Page+')"><i class="fa fa-angle-double-right"></i></a></li>';
	}else{
		Code = Code +'<li class="prev"><a href="javascript:void(0)" onclick="'+Jump_Page+'('+(Page+1)+')"><i class="fa fa-angle-right"></i></a></li>';
		Code = Code +'<li class="next"><a href="javascript:void(0)" onclick="'+Jump_Page+'('+Max_Page+')"><i class="fa fa-angle-double-right"></i></a></li>';
	}
	
	return Code;
}

//显示信息提示
function Show_Prompt_Box(Type,Msg){
	if(Type=='1'){
		$("#Prompt-Box button").attr('class','bg-primary');
		var Msg_Title = '系统提示';
	}else if(Type=='2'){
		$("#Prompt-Box button").attr('class','bg-success');
		var Msg_Title = '操作成功';
	}else if(Type=='3'){
		$("#Prompt-Box button").attr('class','bg-warning');
		var Msg_Title = '操作失败';
	}else if(Type=='4'){
		$("#Prompt-Box button").attr('class','bg-danger');
		var Msg_Title = '操作错误';
	}else{
		$("#Prompt-Box button").attr('class','');
		var Msg_Title = Type;
	}

	$("#Prompt-Box .title").html(Msg_Title+'<span class="close" onclick="$(\'#Prompt-Box\').hide(500);">×</span>');
	$("#Prompt-Box .content").html(Msg);
	$("#Prompt-Box").removeClass('animated');
	$("#Prompt-Box").removeClass('slideInDown');
	$("#Prompt-Box").show();
	$("#Prompt-Box").addClass('animated slideInDown');
	$('body,html').animate({crollTop:0}, 500);
}


//localStorage 删除全部.
function LS_Del_All(){
	if(window.Storage && window.localStorage && window.localStorage instanceof Storage){
	   return localStorage.clear();
	}else{
		return false;
	}
}

//localStorage 删除指定.
function LS_Del(Key){
	if(window.Storage && window.localStorage && window.localStorage instanceof Storage){
	   return localStorage.removeItem(Key);
	}else{
		return false;
	}
}

//localStorage 设置值.
function LS_Set(Key,Val){
	if(window.Storage && window.localStorage && window.localStorage instanceof Storage){
	   return localStorage.setItem(Key,Val);
	}else{
		return false;
	}
}

//localStorage 取出值.
function LS_Get(Key){
	if(window.Storage && window.localStorage && window.localStorage instanceof Storage){
		if(localStorage.getItem(Key) == null){
		   return '';
		}else{
			return localStorage.getItem(Key);
		}
	}else{
		return '';
	}
}

//localStorage 转Cookies.
function LS_To_Cookies(){
	var TMP_Key = '';
	var TMP_Content = '';
	var TMP_Cookies = '';
	for($i=0;$i<localStorage.length;$i++){
		TMP_Key = localStorage.key($i);
		TMP_Content = localStorage.getItem(TMP_Key);
		if(TMP_Content.length <= 4095 && TMP_Content.indexOf(';')<0 && TMP_Content!=''){
		   TMP_Cookies += TMP_Key + '=' + TMP_Content + ';';
		}
	}
	document.cookie = TMP_Cookies;
}

//localStorage 取Cookies的值.
function Cookies_To_LS(){
	var TMP_Array_1 = document.cookie.split(";");
	for($i=0;$i<TMP_Array_1.length;$i++){
		var TMP_Array_2 = TMP_Array_1[$i].split("=");
		if(TMP_Array_2[0] != '' && TMP_Array_2[1] != ''){
		   localStorage.setItem(TMP_Array_2[0],TMP_Array_2[1]);
		}
	}
}

//取随机数,例如 getRandom(999); 取0-999之间任意一个.
function Get_Random(n){return Math.floor(Math.random()*n+1)}

//取字符串中间内容
function Get_Central_Str(Str,StarText,EndText){
	var Star = Str.indexOf(StarText);
	if(Star > -1){
		var End = Str.indexOf(EndText,Star+StarText.length);
		if(End > -1){
			return Str.substring(Star+StarText.length,End);
		}
	}
	return '';
}