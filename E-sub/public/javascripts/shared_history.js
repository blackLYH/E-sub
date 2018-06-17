console.log(getCookie("user"));
var userInfo;
var user = {"account": getCookie("user")};
$.ajax({
    url: "/users/MyShare",
    type: "POST",
    dataType: "JSON",
    data: user,
    success: function (data, textStatus) {
        userInfo = data["success"];
        console.log(userInfo);
        console.log(userInfo.length);
        for(i=0;i<userInfo.length;i++){
            sh_add_item(i+1,userInfo[i].title,userInfo[i].title,userInfo[i].upload_time,userInfo[i].price,userInfo[i].download_count);
        }
        //sh_add_item(1, "字幕名称", "摘要：发违法而阿尔额肺癌我飞啊飞阿尔法而发放安肺癌飞啊飞", "2018-8-9", "10", "20");
    },
    statusCode: {
        404: function () {
            alert('404，页面不存在');
        }
    }
});

function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}

var list_container = document.getElementById("list_container");
var sh_add_item = function (num, name, introduction, time, price, download_times) {
    var list_item = document.createElement("div");
    list_item.className = "list_item";
    var html = '<h3>' + name + '</h3>' +
        '<p>' + introduction + '</p>' +
        '<div class="bottom">' +
        '<div class="left">' +
        '<label>分享时间:</label>' +
        '<span>' + time + '</span>' +
        '<label>价格:</label>' +
        '<span id="orgin_price_' + num + '">' + price + '</span>' +
        '<label>被下载次数:</label>' +
        '<span>' + download_times + '</span>' +
        '</div>' +
        '<div class="right">' +
        '<div class="link" data-num="' + num + '" onclick="onViewDetailClick(this)">查看内容</div>' +
        '<div class="link" data-num="' + num + '" onclick="onCancelShareClick(this)">取消分享</div>' +
        '<div class="link"data-num="' + num + '" onclick="onModifyPriceClick(this)">修改价格</div>' +
        '</div>' +
        '</div>';
    list_item.innerHTML = html;
    list_container.appendChild(list_item);
}



var on_pop_close = function () {
    document.getElementById("pop_window").style.display = "none";
}
var on_mpop_close = function () {
    document.getElementById("mprice_pop_window").style.display = "none";
}



var onViewDetailClick = function (e) {
    var content = getContentByNum(e.dataset.num);
    document.getElementById("pop_window_content").innerText = content;
    document.getElementById("pop_window").style.display = "block";
}

var onCancelShareClick = function (e) {
    var num = e.dataset.num;
    if (e.innerText == "取消分享") {
        var success = function () {
            e.innerText = "分享";
        }
        cancelShare(num, success);
    } else {
        var success = function () {
            e.innerText = "取消分享";
        }
        toShare(num, success);
    }
}

var modify_num = -1;
var onModifyPriceClick = function (e) {
    var num = e.dataset.num;
    modify_num = num;
    var pop = document.getElementById("mprice_pop_window");
    var oprice = document.getElementById("orgin_price_" + num).innerText;
    pop.style.display = "block";
    document.getElementById("oprice").innerText = oprice;

    var mb = document.getElementById("mdify_btn");
    mb.disabled = false;
    mb.innerText = "修改";
    document.getElementById("n_email_btn").disabled = false;
    document.getElementById("n_email_code").value = "";
    document.getElementById("new_price").value = "";
}

var getEmailCode = function (e) {

}

var onMdifyClick = function (e) {
    e.disabled = true;
    document.getElementById("n_email_btn").disabled = true;

    var nprice = document.getElementById("new_price").value;
    var n_email_code = document.getElementById("n_email_code").value;
    e.innerText = "等待回应";
    var success = function () {
        e.innerText = "修改成功";
        document.getElementById("orgin_price_" + modify_num).innerText=nprice;
        on_mpop_close();
    }
    var fail = function () {

    }

    modifyPriceOption(userInfo[modify_num-1].subtitle_ID, nprice, n_email_code, success, fail);
}

/**
 * 添加列表，1，2，3是id后边的函数会使用
 */
var sh_load = function () {
    // sh_add_item(1, "字幕名称", "摘要：发违法而阿尔额肺癌我飞啊飞阿尔法而发放安肺癌飞啊飞", "2018-8-9", "10", "20");
    // sh_add_item(2, "字幕名称", "摘要：发违法而阿尔额肺癌我飞啊飞阿尔法而发放安肺癌飞啊飞", "2018-8-9", "10", "20");
    // sh_add_item(3, "字幕名称", "摘要：发违法而阿尔额肺癌我飞啊飞阿尔法而发放安肺癌飞啊飞", "2018-8-9", "10", "20");
}
/**
 * 获取详细内容
 */
var getContentByNum = function (num) {
    console.log(num)
    return "轻轻戴上耳机，聆听《卖炭翁》的“可怜身上衣正单，心忧炭贱愿天寒。”那悲戚的声音轻轻环绕在耳边。让人寒由心生，不经为买炭老翁的孤苦凄凉清抹一行清泪。一瞬，岳飞壮志饥餐胡虏肉，笑谈渴饮匈奴血。待从头，收拾旧山河，朝天阙的英雄气势又打动了我。当所有人误会岳飞时，他只想从新再做一番伟业，来证明自己是清白的。他不想解释。这样的气概，乃真英雄。每次闭上眼睛，世界便会陷入黑暗。这是，耳朵就会变得格外灵敏。轻轻聆听着周围的声音，会发现很多用眼睛发现不到的事情。[由Www.DuanMeiWen.Com整理]放下耳机，听听大自然的语言。鸟儿发出欢快的叫声，仿佛在说：“夏天来了，我的宝宝也要出生了。”不经为鸟妈妈而感到快乐。还有几只娇柔的小鸟，几年后，他们会发出更好听的歌声。作别小鸟，风又轻轻吹过树叶，发出一阵沙沙沙沙的声音，让人心平气和。这就是静心吧！当我感悟人生的时候，邻房传来一阵嘈杂的叫声，哦，原先是邻居吵架了。这种声音一点也不赏心悦目。却透露这人性与平常，也不失一种成长的韵味。但是，不一会儿，邻房又传来一阵欢声笑语，真是变幻莫测呀！我的嘴角也不自觉的拐出了一个奇特的幅度。聆听很好玩不是吗？";
}

/**
 * 
 * @param {取消分享的id} num 
 * @param {取消分享成功后调用的函数} success 
 */
var cancelShare = function (num, success) {
    console.log("取消分享" + num)
    var Ifshare={"id":num,"IfShare":"N"};
    $.ajax({
        url: "/users/MyShare_change_share",
        type: "POST",
        dataType: "JSON",
        data: Ifshare,
        success: function (data, textStatus) {
            result = data["success"];
            if(result=="ok"){
                alert("修改成功");
                success();
            }
            else
                alert("修改不成功");

        },
        statusCode: {
            404: function () {
                alert('404，页面不存在');
            }
        }
    });

}

/**
 * 
 * @param {打开分享的id} num 
 * @param {分享成功后调用的函数} success 
 */
var toShare = function (num, success) {
    console.log("分享" + num);
    var Ifshare={"id":num,"IfShare":"Y"};
    $.ajax({
        url: "/users/MyShare_change_share",
        type: "POST",
        dataType: "JSON",
        data: Ifshare,
        success: function (data, textStatus) {
            result = data["success"];
            if(result=="ok"){
                alert("分享成功");
                success();
            }
            else
                alert("分享不成功");

        },
        statusCode: {
            404: function () {
                alert('404，页面不存在');
            }
        }
    });

}

/**
 * 修改价格的函数，修改成功后需要调用success函数来修改界面
 * @param {*} num 
 * @param {*} new_price 
 * @param {*} code 
 * @param {*} success 
 * @param {*} fail 
 */
var modifyPriceOption = function (num, new_price, code, success, fail) {
    console.log("修改" + num + "," + new_price + "," + code)
    var change_price={"id":num,"newprice":new_price};

    $.ajax({
        url: "/users/MyShare_change_price",
        type: "POST",
        dataType: "JSON",
        data: change_price,
        success: function (data, textStatus) {
            result = data["success"];
            if(result=="ok"){
                alert("修改成功");
                success();
            }
            else
                alert("修改不成功");

        },
        statusCode: {
            404: function () {
                alert('404，页面不存在');
            }
        }
    });

}


sh_load();

