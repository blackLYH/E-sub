var checkCode = "";//
var num = "";
var tele_page1;

creatCheckCode();

function nextStep() {
    tele_page1 = document.getElementById("u330_input").value;
    var input_checkCode_page1 = document.getElementById("u331_input").value;
    if (judgeTel(tele_page1)) {
        if (input_checkCode_page1.toUpperCase() != checkCode) {
            alert("验证码错误！");
            window.location.reload();
        }
        else {
            var account1 = {"account": tele_page1}
            $.ajax({
                url: "/users/getForget_account",
                type: "POST",
                dataType: "JSON",
                data: account1,
                success: function (data) {
                    alert("用户存在！");
                    var sl = $("#u347_input");
                    var ops = sl.find("option");
                    ops.eq(0).val(tele_page1).text("手机号修改：" + tele_page1).prop("selected", true);
                },
                error: function (data) {
                    window.location.reload();
                },
                statusCode: {
                    404: function () {
                        alert('404，页面不存在');
                    }
                }
            });

        }
    }
}

function nextStep2() {
    var reg_check_page2 = document.getElementById("u342_input").value;
    if (reg_check_page2.valueOf() == "" || reg_check_page2.valueOf() != num.valueOf()) {
        alert("验证码错误！请重新获取");
        document.getElementById("u342_input").value = "";
        num = "";
        window.location.reload();
    }
}

function buttonSure() {
    var newPasswoed_page3 = document.getElementById("u350_input").value;
    var newPasswoedAgain_page3 = document.getElementById("u353_input").value;
    if (newPasswoed_page3 != newPasswoedAgain_page3 || newPasswoed_page3 == "") {
        alert("密码错误！");
    }
    else {
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
        var cryptdata = crypt.encrypt(newPasswoed_page3 + salt);

        var info = {"forget_account": tele_page1, "forget_password": cryptdata};
        $.ajax({
            url: "/users/getForget_change",
            type: "POST",
            dataType: "JSON",
            data: info,
            success: function (data) {
                var respond_json = data["success"];
                if (respond_json == "same password") {
                    alert("相同的密码！");
                    document.getElementById("u350_input").value = "";
                    document.getElementById("u353_input").value = "";
                }
                else if (respond_json == "password correct") {
                    alert("修改成功！");
                }
            },
            error: function (XMLHttpRequest, textStatus) {
                // console.log(XMLHttpRequest);  //XMLHttpRequest.responseText    XMLHttpRequest.status   XMLHttpRequest.readyState
                // console.log(textStatus);
                $(".box").html("服务器错误！");
            },
            statusCode: {
                404: function () {
                    alert('404，页面不存在');
                    window.location.href = '/error';
                }
            }
        });
    }
}

function sendCheck() {
    num = Math.ceil(Math.random() * 899999 + 100000);
    alert("验证码：" + num);
}

function getCode() {
    email = document.getElementById("email").value;
    r = {
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
    email = document.getElementById("email").value;
    code = document.getElementById("code").value;
    r = {
        "email": email,
        "code": code
    }
    $.ajax({
        type: "get",
        url: "/users/verifycode",
        data: r,
        success: function (data) {
            if (data == true) {
                alert("验证码正确");
            } else {
                alert("验证码错误或已过期");
            }
        },
        error: function (data) {
            alert("请求失败")
        }
    });
}

function judgeTel(teleNum) {
    if (teleNum.length == 11 && teleNum.match("^1[3|4|5|7|8][0-9]\\d{4,8}$")) {
        return true;
    }
    else {
        alert("手机号错误");
        window.location.reload();
        return false;
    }
}

function creatCheckCode() {
    checkCode = "";
    /**生成一个随机数**/
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    /**生成一个随机色**/
    function randomColor(min, max) {
        var r = randomNum(min, max);
        var g = randomNum(min, max);
        var b = randomNum(min, max);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    drawPic();
    document.getElementById("u333").onclick = function (e) {
        checkCode = "";
        e.preventDefault();
        drawPic();
    }
    /**绘制验证码图片**/
    function drawPic() {
        var canvas = document.getElementById("canvas");
        var width = canvas.width;
        var height = canvas.height;
        var ctx = canvas.getContext('2d');
        ctx.textBaseline = 'bottom';

        /**绘制背景色**/
        ctx.fillStyle = randomColor(180, 240); //颜色若太深可能导致看不清
        ctx.fillRect(0, 0, width, height);
        /**绘制文字**/
        var str = 'ABCEFGHJKLMNPQRSTWXY123456789';
        for (var i = 0; i < 4; i++) {
            var txt = str[randomNum(0, str.length)];
            checkCode = checkCode + txt;

            ctx.fillStyle = randomColor(50, 160);  //随机生成字体颜色
            ctx.font = randomNum(15, 40) + 'px SimHei'; //随机生成字体大小
            var x = 10 + i * 20;
            var y = randomNum(25, 45);
            var deg = randomNum(-45, 45);
            //修改坐标原点和旋转角度
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(txt, 0, 0);
            //恢复坐标原点和旋转角度
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
        }
        /**绘制干扰线**/
        for (var i = 0; i < 8; i++) {
            ctx.strokeStyle = randomColor(40, 180);
            ctx.beginPath();
            ctx.moveTo(randomNum(0, width), randomNum(0, height));
            ctx.lineTo(randomNum(0, width), randomNum(0, height));
            ctx.stroke();
        }
        /**绘制干扰点**/
        for (var i = 0; i < 100; i++) {
            ctx.fillStyle = randomColor(0, 255);
            ctx.beginPath();
            ctx.arc(randomNum(0, width), randomNum(0, height), 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}

function log() {
    window.location.href = '/login';
}

function reg() {
    window.location.href = '/register';
}