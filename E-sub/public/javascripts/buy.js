var tab_selected = 1;
var time_selected = 0;
var pay_method_selected = 0;

var superPrices= [249,149,29]
var normalPrices=[149,89,19];

var onSuperVipClick = function (e) {
    tab_selected = 1;
    document.getElementById("sub_super_vip").className = "sub-tab super-tab selected";
    document.getElementById("sub_normal_vip").className = "sub-tab normal-tab";
    document.getElementById("one_year_price").innerText="￥"+superPrices[0];
    document.getElementById("six_month_price").innerText="￥"+superPrices[1];
    document.getElementById("one_month_price").innerText="￥"+superPrices[2];
    changPrice();
}

var onNormalVipClick = function (e) {
    tab_selected=2;
    document.getElementById("sub_normal_vip").className = "sub-tab super-tab selected";
    document.getElementById("sub_super_vip").className = "sub-tab normal-tab";
    document.getElementById("one_year_price").innerText="￥"+normalPrices[0];
    document.getElementById("six_month_price").innerText="￥"+normalPrices[1];
    document.getElementById("one_month_price").innerText="￥"+normalPrices[2];
    changPrice();
}

var timeIds = ["time_one_year","time_six_month","time_one_month"]
var timeChooseClick = function(e){
    for(var i = 0; i < timeIds.length;i++){
        var p =document.getElementById(timeIds[i]);
        p.style.border="1px solid gray";
        p.childNodes[5].className="normal";
        p.childNodes[1].style.height="38px";
    }

    e.style.border = "2px solid red";
    e.childNodes[5].className="triangle-bottomright";
    e.childNodes[1].style.height="36px";
    time_selected = e.dataset.num;
    changPrice();
}

var payMethodIds = ["weixin-pay", "ali-pay","qq-pay"];
var onPayMethodChoose = function(e){
    for(var i = 0; i < payMethodIds.length;i++){
        var p =document.getElementById(payMethodIds[i]);
        p.style.border="1px solid gray";
        p.childNodes[3].className="normal";
    }

    e.style.border = "2px solid red";
    e.childNodes[3].className="triangle-bottomright";
    pay_method_selected = e.dataset.num;
    changPrice();
}

var changPrice =  function(){
    var mnp = document.getElementById("money_need_pay")
    var price;
    if(tab_selected == 1){
        //超级会员
        price = superPrices[time_selected];
    }else{
        //普通会员
        price = normalPrices[time_selected];
    }
    mnp.innerText="$"+price;

    var pqr = document.getElementById("pay_qrcode");
    pqr.src="./img/loading_qrcode.gif"

    var success =function(qr_url){
        pqr.src = qr_url;
    }

    getQRcode(price, pay_method_selected, success);
}

//传入 price价格数据， pay_method: 0微信 1支付宝 2QQ支付 ， success回调函数，需要传入得到的二维码图片的url
var getQRcode = function(price, pay_method, success){

    //成功后显示二维码
    success("./img/ecode.jpg")
}
