var cw = 1;
var email;
function sele_Change() {
    var ways = document.getElementById("ways");
    cw = ways.options[ways.selectedIndex].value;

    var wl = document.getElementById("warming_label");
    if(cw == 1) {
        wl.innerText = "输入手机号:";
    } else if(cw == 2) {
        wl.innerText = "输入邮箱:";
    }
}

//检查输入
function input_change(e) {

    var ei = document.getElementById("error_img");
    if(cw == 1) {
        var phone_re = /^1[34578]\d{9}$/;

        if(phone_re.test(e)) {
            ei.style.display = "none";
        } else {
            ei.style.display = "inline";
            alert("手机号错误！");
            return;
        }
    } else if(cw == 2) {
        var email_re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if(email_re.test(e)) {
            ei.style.display = "none";
            getCheckCode();

        } else {
            ei.style.display = "inline";
            alert("邮箱错误！");
            return;
        }
    }
}

/*
/users/forget_1
传参数：info = {"email": email};
功能：判断email是否存在
存在："account exist"
不存在："NO account"
 */


/*
/users/forget_2
传参数：info = {"teleNum": email,  "password": cryptdata};
功能：将email账户的password修改为新的（已加密）
存在："update success"
不存在：""
 */

function getCheckCode() {
    email = document.getElementById("email").value;
    info = {"email": email};
    $.ajax({
        url: "/users/forget_1",
        type: "POST",
        dataType: "JSON",
        data: info,
        success: function (data) {
            var respond_json = data["success"];
            if (respond_json == "NO account") {
                //发验证码
                getCode();
            }
            else if (respond_json == "account exist") {
                alert("账号已存在!");
                //不发验证码
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
    email = document.getElementById("email").value;
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

    var code = document.getElementById("code").value;
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;
    if(password1!=password2){
        alert("密码不一致");
        return;
    }

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
    var cryptdata = crypt.encrypt(password1 + salt);
    info = {
        "teleNum": email,  "password": cryptdata
    }
    $.ajax({
        type: "get",
        url: "/users/verifycode",
        data: r,
        success: function (data) {
            if (data == true) {
                alert("验证码正确");
                //跳转

                $.ajax({

                    url: "/users/forget_2",
                    type: "POST",
                    dataType: "JSON",
                    data: info,
                    success: function (data, textStatus) {
                        var result = data["success"];
                        if (result == "update success") {
                            alert("修改成功！");
                        }
                        else {
                            alert("修改失败！");
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
            alert("请求失败")
        }
    });
}