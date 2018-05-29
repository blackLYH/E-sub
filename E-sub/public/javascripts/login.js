// var c = document.getElementById("container");
// var a = (window.innerHeight - c.offsetHeight) / 2 - 100;
// if (a > 0) {
//     c.style.marginTop = a + "px";
// }

// $(window).resize(function () {
//     var a = (window.innerHeight - c.offsetHeight) / 2 - 100;
//     if (a > 0) {
//         c.style.marginTop = a + "px";
//     }
// });

function tabClick(e) {

    e.className = "super-link focus-link"
    var lb = document.getElementById("login-tab-btn");
    var rb = document.getElementById("reg-tab-btn");
    if (e.id == "login-tab-btn") {
        lb.className = "focus-link";
        rb.className = "super-link";
        document.getElementById("login").style.display = "inline";
        document.getElementById("register").style.display = "none";
    } else if (e.id == "reg-tab-btn") {
        rb.className = "focus-link";
        lb.className = "super-link";
        document.getElementById("login").style.display = "none";
        document.getElementById("register").style.display = "inline";
    }
}

function login() {

    var account = document.getElementById("account_input").value;
    var password = document.getElementById("password_input").value;
    var crypt = new JSEncrypt();

    crypt.setPublicKey('-----BEGIN PUBLIC KEY-----\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoV3HuEo0QkS87MvvkumL\n' +
        'VxBnqYEea/khLUdZ15E7ShCzUnqMpA8nt8FXDoZJhLJC+zBv6sc1ugIg7n8mac2J\n' +
        '9DgRxCDgYrP79dpoXwQOhMzQKQ39/s0br865TCDma0sO3UkT2pJ9UVueuqg/nz3D\n' +
        'XXI390TsIWanC8l5pj28koxBKbYyeOEGs/VM4as4UrJ46FxB68o7EWgkMYWJJLJG\n' +
        '5aQbzOQOCkRhrDe+dCpyJCIM/qeepBUYNmq2c86mrnYVlEWbTt4pIJhLxN7yHSXH\n' +
        'i/9lFopLCVZIsJEWvVj1ficvy/VtTx09VG9mtDFgPl5v6EaS2rKU9ltp6HuQDeri\n' +
        'IwIDAQAB\n' +
        '-----END PUBLIC KEY-----\n');

    var salt = '-rMC](s\\s}>UW0,,3`{G)wj\')Sf{,uNdwet+y{WgQOwLQi-;Vb:+uqu)UUL`1hz-';
    var cryptdata = crypt.encrypt(password + salt);





    console.log("==================");

    var userAgent = window.navigator.userAgent;

    var browser="unknown";
    var loginIP="unknown";
    var loginPlace="unknown";

    if (userAgent.indexOf('Firefox') != -1) {
        browser="Firefox";
    }

    if (userAgent.indexOf('Edge') != -1) {
        browser="Edge";
    }
    if (userAgent.indexOf('opr') != -1) {
        browser="Opera";
    }

    if(userAgent.indexOf("safari") > 0 && userAgent.indexOf("chrome") < 0){
        browser="safari";
    }

    if (userAgent.indexOf('Chrome') != -1) {
        browser="Chrome";
    }

    if (userAgent.indexOf('NET') != -1 && userAgent.indexOf("rv") != -1) {
        browser="IE";
    }

   // alert(returnCitySN.cip);
  //  alert(returnCitySN.cname);

    loginIP=returnCitySN.cip;
    loginPlace=returnCitySN.cname;

    console.log(browser);

    var salt02="$$$";

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

    var login_info=loginIP+salt02+loginPlace+salt02+browser+salt02+currentdate;

    console.log("=======================");

    var transToBack = {"Account": account, "Password": cryptdata,"login_info":login_info};


    $.ajax({
        url: "/login/test",
        type: "POST",
        dataType: "JSON",
        data: transToBack,
        success: function (data, textStatus) {
            window.location.href = '/index';
        },
        error: function (data) {

            var respond_json = JSON.parse(data.responseText);
            if (respond_json.error == 'password wrong') {
                alert("password WRONG! please try again");
                window.location.href = "/login";
            }
            else if (respond_json.error == 'NO account') {
                alert("Account don't exist");
                window.location.href = "/login";
            }
        },
        success: function (data) {
            setCookie("user", account);
            alert("Welcome");
            window.location.href = "/choose";
        },
        statusCode: {
            200: function () {
                window.location.href = '/choose';
            },
            404: function () {
                window.location.href = '/error';
            }
        }
    });
}

function transToRegister() {
    window.location.href = '/register';
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
    location.href = "/index"; //接收页面.

}

function forget() {
    window.location.href = '/getForget';
}


/*
以下是注册的js
 */


var num = "";
var info;
var teleNum = document.getElementById("email_input").value;
var reg_account = document.getElementById("nickName_input").value;
var reg_password = document.getElementById("password2_input").value;
var reg_check = document.getElementById("checkcode_input").value;

function reg() {

    var teleNum = document.getElementById("email_input").value;
    var reg_account = document.getElementById("nickName_input").value;
    var reg_password = document.getElementById("password2_input").value;
    var reg_check = document.getElementById("checkcode_input").value;
    if(teleNum==""||reg_account==""||reg_password==""||reg_check==""){
        alert("不能为空！");
        return;
    }
    var info = {"teleNum": teleNum, "reg_account": reg_account, "reg_password": reg_password};
    verifyCode();
}


function getCheckCode() {

    reg_account = document.getElementById("nickName_input").value;

    var nickname = { "account": reg_account};

    $.ajax({
        url: "/users/register_1",
        type: "POST",
        dataType: "JSON",
        data: nickname,
        success: function (data) {
            var respond_json = data["success"];
            if (respond_json == "NO account") {
                //发验证码
                getCode();

            }
            else if (respond_json == "account exist") {
                alert("账号已存在!");
            }
        },
        statusCode: {
            404: function () {
                alert('404，页面不存在');
            }
        }
    });

}


//邮箱
function getCode() {


    var email = document.getElementById("email_input").value;
    if(email==""){
        alert("邮箱不能为空！");
        return;
    }
    var r = {
        "email": email
    }
    $.ajax({
        type: "get",
        url: "/users/getcode",
        data: r,
        success: function (data) {
            alert("已发送验证码，有效时间为30分钟")
        },
        error: function (data) {
            alert("验证码请求失败")
        }
    });
}

function verifyCode() {
    var email = document.getElementById("email_input").value;
    var code = document.getElementById("checkcode_input").value;


    var teleNum = document.getElementById("email_input").value;
    var reg_account = document.getElementById("nickName_input").value;
    var reg_password = document.getElementById("password2_input").value;
    var reg_check = document.getElementById("checkcode_input").value;
    r = {
        "email": email,
        "code": code
    }
    var crypt = new JSEncrypt();
    crypt.setPublicKey('-----BEGIN PUBLIC KEY-----\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoV3HuEo0QkS87MvvkumL\n' +
        'VxBnqYEea/khLUdZ15E7ShCzUnqMpA8nt8FXDoZJhLJC+zBv6sc1ugIg7n8mac2J\n' +
        '9DgRxCDgYrP79dpoXwQOhMzQKQ39/s0br865TCDma0sO3UkT2pJ9UVueuqg/nz3D\n' +
        'XXI390TsIWanC8l5pj28koxBKbYyeOEGs/VM4as4UrJ46FxB68o7EWgkMYWJJLJG\n' +
        '5aQbzOQOCkRhrDe+dCpyJCIM/qeepBUYNmq2c86mrnYVlEWbTt4pIJhLxN7yHSXH\n' +
        'i/9lFopLCVZIsJEWvVj1ficvy/VtTx09VG9mtDFgPl5v6EaS2rKU9ltp6HuQDeri\n' +
        'IwIDAQAB\n' +
        '-----END PUBLIC KEY-----\n');

    var salt = '-rMC](s\\s}>UW0,,3`{G)wj\')Sf{,uNdwet+y{WgQOwLQi-;Vb:+uqu)UUL`1hz-';
    var cryptdata = crypt.encrypt(reg_password + salt);
    info = {
        "teleNum": email, "account": reg_account, "password": cryptdata
    }
    $.ajax({
        type: "get",
        url: "/users/verifycode",
        data: r,
        success: function (data) {
            if (data == true) {
                alert("验证码正确");
                //跳转
                window.location.href = '/login';
                $.ajax({
                    url: "/users/register_2",
                    type: "POST",
                    dataType: "JSON",
                    data: info,
                    success: function (data, textStatus) {
                        var result = data["success"];
                        if (result == "register success") {
                            alert("注册成功！");
                        }
                        else {
                            alert("注册失败！");
                        }

                    },
                    statusCode: {
                        404: function () {
                            alert('404，页面不存在');
                        }
                    }
                });
            } else {
                alert("验证码错误或已过期");
            }
        },
        error: function (data) {
            alert("请求失败");
        }
    });
}

function buttonLog() {
    window.location.href = '/login';
}

function protocal() {
    window.open("/html/protocal.html");
}