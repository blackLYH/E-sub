/*
   * 图片上传
   * */
var imagename;
var imageold;

function uploadfile() {
    var file = document.getElementById("file");
    var formData = new FormData();
    if (file.files[0].type != "image/jpeg" && file.files[0].type != "image/png") {
        alert("格式错误，重新选择！");
        return;
    }
    formData.append('file', file.files[0]);
    imagename = file.files[0].name;
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
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
            var road = "images/head/" + file.files[0].name;
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