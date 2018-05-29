var onSearchClick = function() {
    //获取查找的值
    var search = document.getElementById("search").value;
    var desc =document.getElementById("search-desc");

    var result2 = function(r) {
        var sr = document.getElementById("search-result")
        sr.innerHTML="";
        var items ='';
        for(var i = 0; i < r.length; i++) {
            var time = r[i].Time.replace("Z","UTC");
            time = time.replace("T"," ");
            time = time.replace(".000","");
            var item='<div class="result-item"><div class="name"><label>'+r[i].subtitle+'</label></div><div class="info"><label>Owner:</label><a class="b">'+r[i].Owner+' </a><label class="a">Time:</label><label class="b">'+time+'</label><label class="a">Price:</label><label class="b">'+r[i].price+'</label><a class="c" href="uploads/subtitle/'+r[i].subtitle+'.srt" download="'+r[i].subtitle+'.srt">下载</a><a class="c" style="margin-right: 10px;" onclick="">查看详情</a></div><div class="line"></div></div>';
            items+=item;
        }
        sr.innerHTML = items;
    }
    doingSearch(search, result2);
    desc.style.display="";
}

var doingSearch = function(search, result2) {
    console.log("查找的内容是："+search);
    var json = {"search": search};
    $.ajax({
        url: "/system/search",
        type: "POST",
        dataType: "json",
        data: json,

        success: function (data, textStatus) {
            var result = data["success"];
            if(result == null){
                alert("没有此字幕！");
                return;
            }
            //console.log(result[subtitle]);
            console.log(result);
            //file = data["file"];
            result2(result);
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

function search() {
    var searchContent = document.getElementById("searchText").value;
    var json = {"search": searchContent}
    var text = document.getElementById("u130_input");

}