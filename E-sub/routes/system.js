var express = require('express');
var multer  = require('multer');
var shell = require('shelljs');
var path = require("path");
var moment = require("moment");
var iconv = require('iconv-lite');

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

    var filename = uploadfile;
    filename = filename.split(".")[0];
    shell.exec('ffmpeg -i /uploads/video/'+ uploadfile +' -acodec copy -y -vn /uploads/video/'+ filename + '.m4a');
    shell.exec('autosub ../public/uploads/video/'+ filename + '.m4a -S en -D en');

});

router.post('/search', function (req, res, next) {
    var query_name = req.body["search"];
    console.log(query_name);

    shell.exec('. /root/lyh/E-sub/E-sub/public/uploads/subtitle/shell.sh '+ query_name +'',  {encoding: 'gbk'},function(code, stdout, stderr) {
        console.log('Exit code:', code);

        //console.log('Program output:', stdout);
        var decodedText = iconv.decode(stdout, 'gbk');
        console.log('Program real:',decodedText)
        
        //console.log('Program stderr:', stderr);
    });
    // var child = shell.exec('ls',{async:true});
    // child.stdout.on(){
    //
    // }
    // res.render('search',{file_name : query_name});


});


module.exports = router;