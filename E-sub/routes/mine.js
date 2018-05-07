var express = require('express');
var mysql   = require('mysql');
var router = express.Router();
var fs = require('fs');
var path = require("path");
var ffmpeg = require('fluent-ffmpeg');
var https = require('https');
var http=require('http');




var sqlURL='45.76.169.253';

var sqlUSER='root';




router.get('/', function(req, res, next) {
    res.render('./mine_buy');

   // console.log("+++++++++++++++++++");

    //NOW BEGIN VIDEO TEST

  //  https://3gaanhctoghzdrpbsfahdr.ourdvsss.com/live-play.acgvideo.com/live/782/live_15641218_2165382.flv?wsSecret=379e075446d323e7e80de07fd490e5fc&wsTime=5ac8c785&wshc_tag=0&wsts_tag=5af04676&wsid_tag=daf93230&wsiphost=ipdbm

    var file = fs.createWriteStream("./public/online_video/233.mp4");

    var request = https.get("https://3gaanhctoghzdrpbsfahdr.ourdvsss.com/live-play.acgvideo.com/live/782/live_15641218_2165382.flv?wsSecret=379e075446d323e7e80de07fd490e5fc&wsTime=5ac8c785&wshc_tag=0&wsts_tag=5af04676&wsid_tag=daf93230&wsiphost=ipdbm", function(response) {
        response.pipe(file);
    });






    //NOW END VIDEO TEST

    return;

});

module.exports = router;