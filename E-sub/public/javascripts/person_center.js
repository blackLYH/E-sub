var tab_items = ["tab-person","tab-history","tab-cost","tab-help"];

var showItem = function(num){
    console.log(num)
    for(var i=0; i < tab_items.length; i++){
        document.getElementById(tab_items[i]).style.display="none";
    }
    document.getElementById(tab_items[num]).style.display="block";
}
var onTabClick = function (e) {
    var num = e.dataset.id;
    showItem(num)
}