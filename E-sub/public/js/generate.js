var uploading = function(position) {
	var uf2 = document.getElementById("uf2");
	var uploadBack = document.getElementById("upload-back");
	console.log(position)
	var a = 150 * position / 100;
	uploadBack.style.height = a + "px";
	uf2.innerText = position + "%";
}

var uploadBtn = function() {
	var opCenter = document.getElementById("op-center");
	var opBottom = document.getElementById("op-bottom");
	var uploadView = document.getElementById("doing-view");
	opCenter.style.display = "none";
	opBottom.style.display = "none";
	uploadView.style.display = "block";

	var endUpload = function() {
		var uploading = document.getElementById("uploading");
		var generating = document.getElementById("generating");
		uploading.style.display = "none"
		generating.style.display = "block"
	}

	var endGenerating = function(url) {
		var generated = document.getElementById("generated");
		var generating = document.getElementById("generating");
		var d = document.getElementById("download-url");
		generating.style.display = "none";
		generated.style.display = "block";
		d.href = url;

	}
	
	uploadDoing(uploading, endUpload, endGenerating);
}

/**
 * 点击上传按钮后的操作
 * @param {Object} endUpload 结束上传时调用，进入生成等待界面
 * @param {Object} uploading 更新上传状态函数 uploading(int_position)
 * @param {Object} endGenerating 结束生成，给予下载地址
 */
var uploadDoing = function(uploading, endUpload, endGenerating) {
	//获取开始时分秒，结束时分秒。-1表示没有选择，0-59表示对应时间
	var bh = $('#begin-hour option:selected').val()
	var bm = $('#begin-minute option:selected').val()
	var bs = $('#begin-second option:selected').val()
	
	var eh = $('#end-hour option:selected').val()
	var em = $('#end-minute option:selected').val()
	var es = $('#end-second option:selected').val()
	
	//获取语言，ml: 视屏语言， rl:字幕语言。1:中文，2:英文，3:日语，4:韩语，5:法语，6:俄语
	var ml = $('#movie-language option:selected').val()
	var rl = $('#result-language option:selected').val()

	uploading(1);
	uploading(2);
	uploading(100);
	endUpload();
	endGenerating("#");
}