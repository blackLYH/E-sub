var onSearchClick = function() {
	//获取超找的值
	var search = document.getElementById("search").value;
	var desc =document.getElementById("search-desc");
	var result = function(r) {
		var sr = document.getElementById("search-result")
		sr.innerHTML="";
		var items ='';
		for(var i = 0; i < r.length; i++) {
			var item='<div class="result-item"><div class="name"><label>'+r[i].name+'</label></div><div class="info"><label>来源:</label><a class="b">'+r[i].owner+' </a><label class="a">时间:</label><label class="b">'+r[i].time+'</label><label class="a">价格:</label><label class="b">'+r[i].price+'</label><a class="c" href="'+r[i].durl+'">下载</a><a class="c" style="margin-right: 10px;" onclick="onViewDetailClick(this)"   data-num="'+r[i].id+'">查看详情</a></div><div class="line"></div></div>';
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
		id:"1",
		name:"梁宇航 有多少梁宇航,梁宇航同名同姓_百度知道",
		owner:"hxm",
		time:"2018-7-6",
		price:"free",
		durl:"#"
	},
	{
		id:"2",
		name:"梁宇航 - 梁宇航 - 网易博客",
		owner:"hxm",
		time:"2018-7-6",
		price:"free",
		durl:"#"
	},
	{
		id:"3",
		name:"L-梁宇航的微博_微博",
		owner:"hxm",
		time:"2018-7-6",
		price:"free",
		durl:"#"
	}]
	result(r);
}

var onViewDetailClick = function (e) {
	var content = getContentByNum(e.dataset.num);
	console.log(e.dataset.num)
    document.getElementById("pop_window_content").innerText = content;
    document.getElementById("pop_window").style.display = "block";
}
var on_pop_close = function () {
    document.getElementById("pop_window").style.display = "none";
}

var getContentByNum = function (num) {
    console.log(num)
    return "轻轻戴上耳机，聆听《卖炭翁》的“可怜身上衣正单，心忧炭贱愿天寒。”那悲戚的声音轻轻环绕在耳边。让人寒由心生，不经为买炭老翁的孤苦凄凉清抹一行清泪。一瞬，岳飞壮志饥餐胡虏肉，笑谈渴饮匈奴血。待从头，收拾旧山河，朝天阙的英雄气势又打动了我。当所有人误会岳飞时，他只想从新再做一番伟业，来证明自己是清白的。他不想解释。这样的气概，乃真英雄。每次闭上眼睛，世界便会陷入黑暗。这是，耳朵就会变得格外灵敏。轻轻聆听着周围的声音，会发现很多用眼睛发现不到的事情。[由Www.DuanMeiWen.Com整理]放下耳机，听听大自然的语言。鸟儿发出欢快的叫声，仿佛在说：“夏天来了，我的宝宝也要出生了。”不经为鸟妈妈而感到快乐。还有几只娇柔的小鸟，几年后，他们会发出更好听的歌声。作别小鸟，风又轻轻吹过树叶，发出一阵沙沙沙沙的声音，让人心平气和。这就是静心吧！当我感悟人生的时候，邻房传来一阵嘈杂的叫声，哦，原先是邻居吵架了。这种声音一点也不赏心悦目。却透露这人性与平常，也不失一种成长的韵味。但是，不一会儿，邻房又传来一阵欢声笑语，真是变幻莫测呀！我的嘴角也不自觉的拐出了一个奇特的幅度。聆听很好玩不是吗？";
}