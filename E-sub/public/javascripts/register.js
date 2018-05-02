var num = "";
var info;
var teleNum = document.getElementById("u50_input").value;
var reg_account = document.getElementById("u49_input").value;
var reg_password = document.getElementById("u58_input").value;
var reg_check = document.getElementById("u59_input").value;

function reg() {
    var teleNum = document.getElementById("u50_input").value;
    var reg_account = document.getElementById("u49_input").value;
    var reg_password = document.getElementById("u58_input").value;
    var reg_check = document.getElementById("u59_input").value;
    var info = {"teleNum": teleNum, "reg_account": reg_account, "reg_password": reg_password};
    var check = document.getElementById('u64_input');
    if (!check.checked) {
        alert("请阅读并接受《E-sub用户协议》及《E-sub隐私保护权声明》");
        return;
    }
    verifyCode();
}


function getCheckCode() {
    alert("验证码已发送");
    getCode();
    info = {"teleNum": teleNum, "account": reg_account};
    $.ajax({
        url: "/users/register_1",
        type: "POST",
        dataType: "JSON",
        data: info,
        success: function (data) {
            var respond_json = data["success"];
            if (respond_json == "NO account") {
                //发验证码
                info = {"teleNum": teleNum, "account": reg_account, "password": reg_password};
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
    var email = document.getElementById("u50_input").value;
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
    var email = document.getElementById("u50_input").value;
    var code = document.getElementById("u59_input").value;
    var teleNum = document.getElementById("u50_input").value;
    var reg_account = document.getElementById("u49_input").value;
    var reg_password = document.getElementById("u58_input").value;
    var reg_check = document.getElementById("u59_input").value;
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
            alert("请求失败")
        }
    });
}

function buttonLog() {
    window.location.href = '/login';
}


