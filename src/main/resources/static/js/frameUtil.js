var load;//进度条

/*
 * 列表中回车键搜索
 */
function keydownSerach(callBack) {
	document.onkeydown = function(e) {
		if (!e)
			e = window.event; //火狐中是 window.event
		if ((e.keyCode || e.which) == 13) {
			if (callBack == null)
				gridList();
			else
				callBack();
		}
	}
}

/**
 * 禁用form表单控件
 * @Author masl - 2018/3/9 13:50
 */
function displayForm() {
    var form = document.forms[0];
    for (var i = 0; i < form.length; i++) {
        var element = form.elements[i];
        if (element.type != "button" && element.type != "submit") {
            element.disabled = "true";
        }
    }
}

/**
 * 时间戳转换日期
 * @param timestamp
 * @returns {*}
 */
function timestampToTime(timestamp) {
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D+h+m+s;
}

//全选/取消
function checkAll(divId, strValue) {
	var d = document.getElementById("" + divId + "").getElementsByTagName("input");
	for (i = 0; i < d.length; i++) {
		if (d[i].type == "checkbox") {
			d[i].checked = document.getElementById("" + strValue + "").checked;
		}
	}
}
//------------------------------ 页面自动取赋值 start --------------------------------------/

/**
 * 自适应应高度
 */
function autoHeight(element, height) {
	resizeU();
	$(window).resize(resizeU);
	function resizeU() {
		if ($(element).length > 0)
			$(element).css("height", $(window).height() - height);
	}
}
/**********************************列表页中打开编辑 start********************************/

/**********************************列表页中打开编辑 end********************************/
/*
 * 将form中的值转换为键值对 形如：{name:'aaa',password:'tttt'}
 * 注意将同名的放在一个数组里
 * */
function getFormJson(frmId) {
	var o = {};
	var a = $("#" + frmId).serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push($.trim(this.value) || '');
		} else {
			o[this.name] = $.trim(this.value) || '';
		}
	});
	return o;
}

/**
 * 获取表单参数
 * @param frmId
 * @param isEncodeZH：是否编码中文
 * @returns 转换为键值对 形如："name=432&age=3"
 */
function getUrlParams(frmId,isEncodeZH) {
	var str = "";
	var f = "";
    //文本框 隐藏域 下拉框
    $("#"+frmId+" input[type='text'],#"+frmId+" input[type='hidden'],#"+frmId+" select").each(function () {
        if (isEmpty($(this).attr("name")))//name属性不能为空
            return;
        var val = $(this).val();
        if (val.length > 0){
        	str += f + $(this).attr("name")+"="+$.trim($(this).val());
            f="&";
        }
    });
    if(isEncodeZH)
    	str = encodeZH(str);
    return str;
}
/**
 * 利用正则编码中文字符串
 * @param text
 */
function encodeZH(text) {
    var re = /[\u0391-\uFFE5]+/;
    var arr = text.match(re);
    if (arr!=null && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
        	text = text.replace(arr[i], encodeURI(encodeURI(arr[i])));
        }
    }
    return text;
}
/*清空表单内容
 * $(':input','#myform') 
.not(':button, :submit, :reset, :hidden') 
.val('') 
.removeAttr('checked') 
.removeAttr('selected');*/
/**
 json 给form 表单进行赋值 Add by mashanlin 2015-07-04
 调用示例:json = { "usrname":"张三", "address":"湖北钟祥", "sex": "1", "hobby":["sing", "trance"]}; $('#editForm').formEdit(json);
**/
$.fn.formEdit = function(data) {
	return this.each(function() {
		var input, name;
		if (data == null) {
			this.reset();
			return;
		}
		for (var i = 0; i < this.length; i++) {
			input = this.elements[i];
			//checkbox的name可能是name[]数组形式
			name = (input.type == "checkbox") ? input.name.replace(/(.+)\[\]$/, "$1") : input.name;
			if (data[name] == undefined)
				continue;
			switch (input.type) {
			case "checkbox":
				if (data[name] == "") {
					input.checked = false;
				} else {
					//数组查找元素
					if (data[name].indexOf(input.value) > -1) {
						input.checked = true;
					} else {
						input.checked = false;
					}
				}
				break;
			case "radio":
				if (data[name] == "") {
					input.checked = false;
				} else if (input.value == data[name]) {
					input.checked = true;
				}
				break;
			case "select":
				if (data[name] == "") {
					$("[name='"+name+"']").attr("select",false);
				} else if (input.value == data[name]) {
					$("[name='"+name+"']").attr("select",true);
				}
				form.render(select);
				break;
			default:
				input.value = data[name];
			}
		}
	});
};

/*
 * 接收地址栏参数  key:参数名称
 * */
function getQuery(key) {
	var search = location.search.slice(1); //得到get方式提交的查询字符串
	var arr = search.split("&");
	for (var i = 0; i < arr.length; i++) {
		var ar = arr[i].split("=");
		if (ar[0] == key) {
			if (ar[1] == 'undefined') {
				return "";
			} else {
				return ar[1];
			}
		}
	}
	return "";
}
/*--------------------------------------------------*/
/* 
请求Ajax 带返回值
*/
function ajax(url, postData, callBack) {
	//loading(false);
	$.ajax({
		type : 'post',
		dataType : "json",
		url : url,
		data : postData,
		cache : false,
		async : false,
		success : function(data) {
			callBack(data);
		},
		error : function(data) {
			showErrorMsg("error:" + JSON.stringify(data) + "url:" + url);
		},
		complete : function(XHR, TS) {
			XHR = null;
		}
	});
}

/*
 * 验证是否为空
 */
function isEmpty(str) {
	var isOK = false;
	if (str == undefined || str == "" || str == "null") {
		isOK = true;
	}
	return isOK;
}

//=================弹框 start========================
/*
 * 弹出确认对话框
 * msg: 显示消息 callBack：函数
 * */
function showConfirmMsg(msg, callBack) {
    if(isEmpty(msg)){
        msg = "确认操作吗？";
    }
    layer.confirm(msg, {
        btn: ['确定','取消'] //按钮
    }, function(){
        if (callBack != null)
            callBack();
    }, function(){

    });
}
/**
 * 弹出成功提醒
 * @param msg
 */
function showSuccMsg(msg) {
    layer.msg(msg, {icon: 1});
}
/**
 * 弹出错误提醒
 * @param msg
 */
function showErrorMsg(msg) {
    layer.msg(msg, {icon: 2});
}
/**
 * 弹出警告提醒
 * @param msg
 */
function showWarnMsg(msg) {
    layer.msg(msg, {icon: 5});
}
/*
 * 弹出网页
 */
function openDlg( _url, _title,_width, _height, _isMax, _endFun) {
    if(isEmpty(_isMax)){
        _isMax = false;
    }
    if(isEmpty(_width)){
        _width = 500;
    }
    if(isEmpty(_height)){
        _height = 350;
    }
    var dlg = layer.open({
        type: 2,
        title: _title,
        shade: 0.6,
        //skin: 'layui-layer-lan',
        //skin: 'layui-layer-molv', //样式类名
        maxmin: _isMax, //开启最大化最小化按钮
        area: [_width+"px", _height+"px"],
        content: _url,
        end: function(rsp){
            if(_endFun!=null){
                _endFun(rsp);
            }
        }
    });
    return dlg;
    //layer.full(index); // 最大化
}
//窗口关闭 msg 不为空时先提醒后关闭窗口
function closeDlg(msg) {
    if(!isEmpty(msg)){
        showSuccMsg(msg);
        setTimeout(function () {
            parent.$(".layui-layer-close").trigger("click");
        },500);
    }else{
        parent.$(".layui-layer-close").trigger("click");
    }
}

//窗口关闭 msg 不为空时先提醒后关闭窗口
function closeDlgRefParent(msg) {
    if(!isEmpty(msg)){
        showSuccMsg(msg);
        setTimeout(function () {
            parent.$(".layui-layer-close").trigger("click");
            parent.location.reload();
        },500);
    }else{
        parent.$(".layui-layer-close").trigger("click");
        parent.location.reload();
    }
}
//=================弹框 end========================


//------------------------------ cookie start ------------------------------/
/*
* 获取 cookie
*/
function getCookie(sKey) {
	if (!sKey)
		return "";
	if (document.cookie.length > 0) {
		var startIndex = document.cookie.indexOf(sKey + "=")
		if (startIndex != -1) {
			startIndex = startIndex + sKey.length + 1
			var endIndex = document.cookie.indexOf(";", startIndex)
			if (endIndex == -1) {
				endIndex = document.cookie.length;
			}
			return decodeURIComponent(document.cookie.substring(startIndex, endIndex));
		}
	}
	return ""
}
/*
* 增加 cookie (iExpireSeconds:过期时间，单位：秒)
*/
function setCookie(sKey, sValue, iExpireSeconds) {
	if (!sKey)
		return;
	var expireDate = new Date();
	expireDate.setTime(expireDate.getTime() + iExpireSeconds * 1000);
	document.cookie = sKey + "=" + encodeURIComponent(sValue) + ";expires=" + expireDate.toGMTString() + ";";
}
/*
* 删除 cookie
*/
function deleteCookie(sKey) {
	if (!sKey)
		return;
	document.cookie = sKey + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
//------------------------------ cookie end ------------------------------/

//修改出错的input的外观
function showErrorTips(id, msg) {
	//tips 提示
	tips("#"+id, msg, 2000, 1, '#c11e1e');
	$("#"+id).css("border", "1px solid red");
	$("#"+id).focus();

	setTimeout(function () {
		$("#"+id).css("border", "1px solid #999");
    },2000);
}

/**
 * tips 提示
 * @param element:选择器，如：#id、.className
 * @param msg
 * @param direction:方向
 * @param color
 */
function tips(element, msg, timeout, direction, color) {
	if (isEmpty(color)) {
		color = "#3595CC";
	}
	if (isEmpty(timeout)) {
		timeout = 2000;
	}
	if (isEmpty(direction)) {
		direction = 1;
	}
	layer.tips(msg, element, {
		tips : [ direction, color ], time : timeout
	});
}

/**
 * 开户身份证性别判断
 */
function sexInfo(idcard) {
    var sexCode;
    switch (idcard.length) {
        case 15 :
            sexCode = idcard.substring(14, 1);
            break;
        case 18 :
            sexCode = idcard.substring(16, 1);
            break;
    }
    if ((sexCode % 2) == 0) {
        return 'F';
    } else {
        return 'M';
    }
}


// 获取多选框选择值
function getMulitSelectValue(id){
    var selectVal = document.getElementById(id);
    var value="";
    for(var i=0;i<selectVal.options.length;i++){
        if(selectVal.options[i].selected){
            value+= selectVal.options[i].value+",";
        }
    }
    return value;
}

// 获取多选框选择值
function getMulitSelectText(id){
    var selectVal = document.getElementById(id);
    var text="";
    for(var i=0;i<selectVal.options.length;i++){
        if(selectVal.options[i].selected){
            text+= selectVal.options[i].text+",";
        }
    }
    return text;
}

// 获取多选框选择值
function getMulitSelectObj(id){
    var uList=new Array();
    var selectVal = document.getElementById(id);
    for(var i=0;i<selectVal.options.length;i++){
        if(selectVal.options[i].selected){
            var obj = new KeyValueObj(selectVal.options[i].value, selectVal.options[i].text);
            uList.push(obj)
        }
    }
    return uList;
}

//JS传统方式下定义"类"
function KeyValueObj(id,name){
    this.id = id;
    this.name = name;
}