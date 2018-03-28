var express = require('express');
var multer  = require('multer');
var shell = require('shelljs');
var path = require("path");
var moment = require("moment");
var uploadfile;
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,"/../public/uploads/video"));
    },
    filename: function (req, file, cb) {
        var date = new Date();
        cb(null, file.originalname);
        uploadfile = file.originalname;
    }
});

var upload = multer({ storage: storage });

var router = express.Router();

/* GET home page. */
router.post('/upload', upload.single('avatar'), function (req, res, next) {
    res.send('文件上传成功'+ req.file.path);
    console.log(uploadfile);
    console.log(req.body);

});

module.exports = router;