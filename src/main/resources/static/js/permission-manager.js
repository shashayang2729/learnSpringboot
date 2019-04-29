var permissionArray = null;
function getPermission(){
    //获取当前用户在该页面的按钮权限，并进行控制
    $.ajax({
        url:"/menu/getPermission",
        type:"post",
        dataType:"json",
        async: false,
        data:{},
        success:function(data){
            permissionArray = data.permArray;
        },
        error:function(){
            alert("获取按钮控制权限失败！");
        }
    });
}
function permissionManager(){
    if(permissionArray==null || permissionArray==''){
        getPermission();
    }
    var as = document.getElementsByTagName("a");
    for(var i=as.length-1;i>=0;i--){
        if(as[i].getAttribute("proCode")!= null && $.inArray(as[i].getAttribute("proCode"), permissionArray) == -1){
            removeElement(as[i]);
        }
    }
    var buttons = document.getElementsByTagName("button");
    for(var i=buttons.length-1;i>=0;i--){
        if(buttons[i].getAttribute("proCode")!= null && $.inArray(buttons[i].getAttribute("proCode"), permissionArray) == -1){
            removeElement(buttons[i]);
        }
    }
}

function removeElement(_element){
    var _parentElement = _element.parentNode;
    if(_parentElement){
        _parentElement.removeChild(_element);
    }
}