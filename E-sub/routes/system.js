var express = require('express');
var multer  = require('multer');
var shell = require('shelljs');
var path = require("path");
var moment = require("moment");
var iconv = require('iconv-lite');
var Dictionary = require('dictionaryjs')
var uploadfile;
var fs = require('fs');

var languageList = new Dictionary.Dictionary();
languageList.set("简体中文","zh-CN");
languageList.set("繁體中文","zh-TW");
languageList.set("English","en");
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

// app.use(multer({//设置文件上传到的位置
//     dest: '/../public/uploads/video',
//     rename: function (fieldname, filename) {
//         uploadfile = filename;
//         return filename;
//     }
// }));

var upload = multer({ storage: storage });

var router = express.Router();

/* GET home page. */
router.post('/upload',upload.single('upload_file'), function (req, res, next) {
    if(!req.file){
        res.json({error:"没有文件上传"});
        return ;
    }
    var sourcelanguage = languageList.get(req.body["sourcelanguage"]);
    var targetlanguage = languageList.get(req.body["detlanguage"]);
    console.log(sourcelanguage);
    console.log(targetlanguage);
    var filename = uploadfile;
    console.log(filename);
    filename = filename.split(".")[0];
    var subPath = path.join(__dirname,"/../public/uploads/subtitle/");
    var videoPath = path.join(__dirname,"/../public/uploads/video/");
    var translatePath =  path.join(__dirname,"/../public/python/translate.py");
    shell.exec('ffmpeg -i '+videoPath+ uploadfile +' -acodec copy -y -vn '+videoPath+ filename + '.m4a');
    shell.exec('autosub '+videoPath+ filename + '.m4a -S '+sourcelanguage+' -D '+sourcelanguage+' -o '+subPath+filename+'.srt');
    if(sourcelanguage != targetlanguage){
        shell.exec('python3 '+translatePath+ ' '+ sourcelanguage +' ' +targetlanguage + ' '+subPath+filename+'.srt ' + subPath+filename+targetlanguage+'.srt');
    }
    if(targetlanguage == sourcelanguage)
        targetlanguage = '';
    shell.exec('cat '+subPath+filename+targetlanguage+'.srt',  {encoding: 'gbk'},function(code, stdout, stderr) {
        console.log('Exit code:', code);

        //console.log('Program output:', stdout);
        var decodedText = iconv.decode(stdout, 'gbk');
        console.log('Program real:',decodedText);
        res.json({"success":decodedText});
        //console.log('Program stderr:', stderr);
    });
    //res.json({"result":{message:"文件上传成功!"}});

});

router.post('/search', function (req, res, next) {
    var query_name = req.body["search"];
    console.log(query_name);
    var shellPath = path.join(__dirname,"/../public/uploads/subtitle/shell.sh ");
    shell.exec('. '+shellPath+ query_name +'',function(code, stdout, stderr) {
        console.log('Exit code:', code);

        console.log('Program output:', stdout);
        var decodedText = iconv.decode(stdout, 'gbk');
        console.log('Program real:',decodedText);
        res.json({"success":decodedText});
        //console.log('Program stderr:', stderr);
    });

    // var child = shell.exec('ls',{async:true});
    // child.stdout.on(){
    //
    // }
    // res.render('search',{file_name : query_name});


});


module.exports = router;