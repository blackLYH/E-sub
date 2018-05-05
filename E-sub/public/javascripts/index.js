var file;


var a=getCookie("user");
console.log(a);

$("#u85").text(a);
function member_center() {

    if(a==null){
        alert("请登陆！");
        window.location.href = '/login';
    }
    else {
        setCookie("user", getCookie("user"));
        window.location.href = '/member_center';
    }
    //console.log(getCookie("user"));

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
}

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}

function quit() {
    window.location.href = '/login';
}


function upload_file() {
    var file1 = $("#filename")[0].files;
    var button = document.getElementById("upload");
    var progress = document.querySelector('#progress');
    var progressbar = document.getElementById("progressbar");
    button.onprogress = setProgress;
    console.log(file1[0].type);
    var sourcelangue = document.getElementById("u101_input");
    var detlangue = document.getElementById("u97_input");
    var text = document.getElementById("u130_input");
    var data = new FormData();
    //为FormData对象添加数据
    $.each(file1, function (i, file) {
        data.append('upload_file', file);
    });
    data.append('sourcelanguage', sourcelangue.value);
    data.append('detlanguage', detlangue.value);
    var xhr = new XMLHttpRequest();
    xhr.onload = uploadSuccess;
    xhr.upload.addEventListener("progress", setProgress, false);
    xhr.open("POST", "/system/upload", true);
    xhr.send(data);

    function uploadSuccess(event) {
        if (xhr.readyState == 4) {
            var result = JSON.parse(xhr.responseText);
            text.value = result["success"];
            var t = result["file"].split("/");
            file = t[t.length - 1];
        }
    }

    function setProgress(event) {
        if (event.lengthComputable) {
            var complete = Number.parseInt(event.loaded / event.total * 100);

            progressbar.max = event.total;
            progressbar.value = event.loaded;
            progress.innerHTML = complete + '%';
            if (complete >= 100) {
                progress.innerHTML = "字幕生成中"
            }
        }
    }
}

function get_filename() {
    if (file == "" || file == undefined) return;

    var data = {
        "files": file
    }
    //data.append('file','shell.sh');
    var url = "/system/download";
    var xhr = new XMLHttpRequest();

    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.responseType = "blob";
    xhr.onload = function () {
        // 请求完成
        if (this.status === 200) {
            // 返回200
            var blob = this.response;
            var reader = new FileReader();
            reader.readAsDataURL(blob);    // 转换为base64，可以直接放入a表情href
            reader.onload = function (e) {
                // 转换完成，创建一个a标签用于下载
                var a = document.createElement('a');
                a.download = file;
                a.href = e.target.result;
                $("body").append(a);    // 修复firefox中无法触发click
                a.click();
                $(a).remove();
            }
        }
    };
    xhr.send("files=" + file);
}

function search() {
    var searchContent = document.getElementById("searchText").value;
    var json = {"search": searchContent}
    var text = document.getElementById("u130_input");
    $.ajax({
        url: "/system/search",
        type: "POST",
        dataType: "json",
        data: json,

        success: function (data, textStatus) {
            var result = data["success"];
            file = data["file"];

            text.value = result;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        },
        complete: function (XMLHttpRequest, textStatus) {

        },
        statusCode: {
            404: function () {
                window.location.href = '/error';
                console.log('404，页面不存在');
            }
        }
    });
}