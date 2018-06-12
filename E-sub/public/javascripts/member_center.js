/*
   * 图片上传
   * */
var imagename;
var imageold;



//**********
/*
        三个参数
        file：一个是文件(类型是图片格式)，
        w：一个是文件压缩的后宽度，宽度越小，字节越小
        objDiv：一个是容器或者回调函数
        photoCompress()
         */
function photoCompress(file,w,objDiv){
    var ready=new FileReader();
    /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
    ready.readAsDataURL(file);
    ready.onload=function(){
        var re=this.result;
        canvasDataURL(re,w,objDiv)
    }
}
function canvasDataURL(path, obj, callback){
    var img = new Image();
    img.src = path;
    img.onload = function(){
        var that = this;
        // 默认按比例压缩
        var w = that.width,
            h = that.height,
            scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        var quality = 0.7;  // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if(obj.quality && obj.quality <= 1 && obj.quality > 0){
            quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64);
    }
}
/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 *            用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData){
    var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}
//**********


function uploadfile() {
    var file = document.getElementById("file");
    var formData = new FormData();
    if (file.files[0].type != "image/jpeg" && file.files[0].type != "image/png") {
        alert("格式错误，重新选择！");
        return;
    }

    imagename = file.files[0].name;

    var date = new Date();
    var seperator1 = "_";
    var seperator2 = "_";
    var month1 = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month1 >= 1 && month1 <= 9) {
        month1 = "0" + month1;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month1 + seperator1 + strDate
        + "_" + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();

    imagename = getCookie("user") + '_' + currentdate + '_' + imagename;
    console.log(file.files[0]);
    if(file.files[0].size/1024>1025){//如果大于1m
        photoCompress(file.files[0], {
            quality: 0.2
        }, function(base64Codes){
            //console.log("压缩后：" + base.length / 1024 + " " + base);
            var bl = convertBase64UrlToBlob(base64Codes);
            console.log("bl"+bl);
            formData.append("file", bl,imagename); // 文件对象
            f(formData);
        });
    }else {
        formData.append('file', file.files[0],imagename);
        f(formData);
    }
    //console.log(file.files[0]);



}

function f(formData) {


    $.ajax({
        url: '/users/upload',
        type: 'POST',
        data: formData,
        // async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            if (200 === data.code) {
                $('#result').html("上传成功！");
                $('#img').attr('src', data.data);
            } else {
                $('#result').html("上传失败！");
            }
            var road = "images/head/" +imagename;
            document.getElementById('userimg1').src = road;
        },
        error: function () {
            $("#result").html("与服务器通信发生错误");
        }
    });
}

var sex;
var useraccount;

//alert("接受的cookie："+getCookie("user"));
var user = {"account": getCookie("user")};


$.ajax({
    url: "/users/member_center",
    type: "POST",
    dataType: "JSON",
    data: user,
    success: function (data, textStatus) {
        var userInfo = data["success"];
        useraccount = userInfo[0].account;
        var userphone = userInfo[0].phone;
        var usermail = userInfo[0].mail;
        var usersex = userInfo[0].sex;
        var userbirthday_year = userInfo[0].birthday_year;
        var userbirthday_month = userInfo[0].birthday_month;
        var userbirthday_day = userInfo[0].birthday_day;
        var userblood = userInfo[0].blood;
        var userimage = userInfo[0].image;

        var login_info=data["login_info"];

        var login_info_one=login_info.split("****");

        var login_info_more1=login_info_one[login_info_one.length-2].split("$$$");
        var login_info_more2=login_info_one[login_info_one.length-3].split("$$$");

        var logintime = login_info_more1[3].split("_");
        var logintime1 = login_info_more2[3].split("_");
        $("#t11").append(logintime[0]+"年"+logintime[1]+"月"+logintime[2]+"日"+logintime[3]+"时"
            +logintime[4]+"分"+logintime[5]+"秒");
        $("#t12").append(login_info_more1[0]);
        $("#t14").append(login_info_more1[1]);
        $("#t13").append(login_info_more1[2]);


        $("#t21").append(logintime1[0]+"年"+logintime1[1]+"月"+logintime1[2]+"日"+logintime1[3]+"时"
            +logintime1[4]+"分"+logintime1[5]+"秒");
        $("#t22").append(login_info_more2[0]);
        $("#t24").append(login_info_more2[1]);
        $("#t23").append(login_info_more2[2]);

        imageold = userimage;

        if(userimage=="system_default.jpg"){

            imagename="system_default.jpg";
            imageold="system_default.jpg";

        }
        var password_strength = userInfo[0].pwd_strength;

        $("#username1").text(useraccount);
        $("#username2").text(useraccount);
        document.getElementById('userimg1').src = "images/head/" + userimage;
        document.getElementById('userimg2').src = "images/head/" + userimage;
        sex = usersex;
        if (usersex == "man") {
            document.getElementById("man").checked = true;
            document.getElementById("women").checked = false;
            document.getElementById("other").checked = false;
        }
        else if (usersex == "woman") {
            document.getElementById("man").checked = false;
            document.getElementById("women").checked = true;
            document.getElementById("other").checked = false;
        }
        else if (usersex == "other") {
            document.getElementById("man").checked = false;
            document.getElementById("women").checked = false;
            document.getElementById("other").checked = true;
        }
        else {
            document.getElementById("men").checked = false;
            document.getElementById("women").checked = false;
            document.getElementById("other").checked = false;
        }

        if(userbirthday_year==null)
            userbirthday_year="年";
        if(userbirthday_month==null)
            userbirthday_month="月";
        if(userblood==null)
            userblood="未知";

        console.log(userbirthday_year+userbirthday_month+userblood);
        document.getElementById("year").value=userbirthday_year;
        document.getElementById("month").value=userbirthday_month;
        document.getElementById("blood").value=userblood;

        // var sl = $("#u363_input");
        // var ops = document.getElementById(userbirthday_year);
        // ops.eq(0).val(userbirthday_year).text(userbirthday_year).prop("selected", true);
        // var sl = $("#u364_input");
        // var ops = sl.find("option");
        // ops.eq(0).val(userbirthday_month).text(userbirthday_month).prop("selected", true);
        // var sl = $("#u367_input");
        // var ops = sl.find("option");
        // ops.eq(0).val(userblood).text(userblood).prop("selected", true);

    },
    statusCode: {
        404: function () {
            alert('404，页面不存在');
        }
    }
});

function clearcookie() {
    setCookie("user",null);
    window.location.href = '/login';
}

function setCookie(name, value) {
    /*
    *--------------- setCookie(name,value) -----------------
    * setCookie(name,value)
    * 功能:设置得变量name的值
    * 参数:name,字符串;value,字符串.
    * 实例:setCookie('username','baobao')
    *--------------- setCookie(name,value) -----------------
    */
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    location.href = "/member_center"; //接收页面.
    location.href = "/index";
    location.href = "/vip_center";
    location.href = "/MyShare";
}

function getCookie(name) {
    /*
    *--------------- getCookie(name) -----------------
    * getCookie(name)
    * 功能:取得变量name的值
    * 参数:name,字符串.
    * 实例:alert(getCookie("baobao"));
    *--------------- getCookie(name) -----------------
    */
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}

function radioclick(a) {
    if (a == 1) {
        document.getElementById("man").checked = true;
        document.getElementById("women").checked = false;
        document.getElementById("other").checked = false;
        sex = "man";
    }
    else if (a == 2) {
        document.getElementById("man").checked = false;
        document.getElementById("women").checked = true;
        document.getElementById("other").checked = false;
        sex = "woman";
    }
    else {
        document.getElementById("man").checked = false;
        document.getElementById("women").checked = false;
        document.getElementById("other").checked = true;
        sex = "other";
    }
}

function saveInfo() {
    var ddl1 = document.getElementById("year")
    var index1 = ddl1.selectedIndex;
    var ddl2 = document.getElementById("month")
    var index2 = ddl2.selectedIndex;
    var ddl3 = document.getElementById("blood")
    var index3 = ddl3.selectedIndex;

    var Value_year = ddl1.options[index1].value;
    var Value_month = ddl2.options[index2].value;
    var Value_blood = ddl3.options[index3].value;

    console.log(Value_year+Value_month);
    var user_save = {
        "account": useraccount,
        "year": Value_year,
        "month": Value_month,
        "blood": Value_blood,
        "sex": sex,
        "image": imagename,
        "old": imageold
    };

    $.ajax({
        url: "/users/member_center_save",
        type: "POST",
        dataType: "JSON",
        data: user_save,
        success: function (data, textStatus) {
            var userInfo = data["success"];
            if (userInfo == "ok") {
                alert("保存成功！");
                window.location.href = '/member_center';
            }
        },
        statusCode: {
            404: function () {
                alert('404，页面不存在');
            }
        }
    });
}

function clickimg() {
    document.getElementById("file").click();
}