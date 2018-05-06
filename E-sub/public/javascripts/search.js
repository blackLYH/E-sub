var onSearchClick = function() {
    //获取超找的值
    var search = document.getElementById("search").value;
    var desc =document.getElementById("search-desc");
    var result = function(r) {
        var sr = document.getElementById("search-result")
        sr.innerHTML="";
        var items ='';
        for(var i = 0; i < r.length; i++) {
            var item='<div class="result-item"><div class="name"><label>'+r[i].name+'</label></div><div class="info"><label>Owner:</label><a class="b">'+r[i].owner+' </a><label class="a">Time:</label><label class="b">'+r[i].time+'</label><label class="a">Price:</label><label class="b">'+r[i].price+'</label><a class="c" href="'+r[i].durl+'">下载</a><a class="c" style="margin-right: 10px;" onclick="">查看详情</a></div><div class="line"></div></div>';
            items+=item;
        }
        sr.innerHTML = items;
    }
    doingSearch(search, result);
    desc.style.display=""
}

var doingSearch = function(search, result) {
    console.log("查找的内容是："+search)
    var r = [{
        name:"字幕测试1",
        owner:"hxm",
        time:"2018-7-6",
        price:"free",
        durl:"#"
    },
        {
            name:"字幕测试2",
            owner:"hxm",
            time:"2018-7-6",
            price:"free",
            durl:"#"
        },
        {
            name:"字幕测试3",
            owner:"hxm",
            time:"2018-7-6",
            price:"free",
            durl:"#"
        }]
    result(r);
}