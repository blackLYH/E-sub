var express = require('express');
var mysql   = require('mysql');
var router = express.Router();
var fs = require('fs');
var path = require("path");




var sqlURL='45.76.169.253';

var sqlUSER='root';




router.get('/', function(req, res, next) {
    res.render('./mine_buy');
});

module.exports = router;