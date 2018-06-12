var express = require('express');
var multer  = require('multer');
var shell = require('shelljs');
var path = require("path");
var moment = require("moment");
var iconv = require('iconv-lite');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var Dictionary = require('dictionaryjs')

var uploadfile;
var sqlURL = '45.76.169.253';
var sqlUSER = 'root';
var fs = require('fs');
var languageList = new Dictionary.Dictionary();
languageList.set("简体中文","zh-CN");
languageList.set("繁體中文","zh-TW");
languageList.set("English","en");
languageList.set("Afaraf","af");
languageList.set("Arabic","ar");
languageList.set("az?rbaycan dili","az");
languageList.set("беларуская мова","be");
languageList.set("български език","bg");
languageList.set("Bengali","bn");
languageList.set("bosanski jezik","bs");
languageList.set("català, valencià","ca");
languageList.set("нохчийн мотт","ceb");
languageList.set("Czech","cs");
languageList.set("Cymraeg","cy");
languageList.set("dansk","da");
languageList.set("Deutsch","de");
languageList.set("ελληνικ?","el");
languageList.set("Esperanto","eo");
languageList.set("Espa?ol","es");
languageList.set("eesti, eesti keel","et");
languageList.set("euskara, euskera","eu");
languageList.set("Persian","fa");
languageList.set("suomi, suomen kieli","fi");
languageList.set("fran?ais, langue fran?aise","fr");
languageList.set("Gaeilge","ga");
languageList.set("Galego","gl");
languageList.set("Gujarati","gu");
languageList.set("Hausa","ha");
languageList.set("Hindi","hi");
languageList.set("Hmoob","hmn");
languageList.set("hrvatski jezik","hr");
languageList.set("Kreyòl ayisyen","ht");
languageList.set("magyar","hu");
languageList.set("Armenian","hy");
languageList.set("Bahasa Indonesia","id");
languageList.set("Igbo","ig");
languageList.set("íslenska","is");
languageList.set("Italiano","it");
languageList.set("日本語 (にほんご)","ja");
languageList.set("Georgian","ka");
languageList.set("?аза? т?л?","kk");
languageList.set("Khmer","km");
languageList.set("Kannada","kn");
languageList.set("한국어","ko");
languageList.set("latine, lingua latina","la");
languageList.set("Lao","lo");
languageList.set("lietuvi? kalba","lt");
languageList.set("Latvie?u Valoda","lv");
languageList.set("fiteny malagasy","mg");
languageList.set("te reo Māori","mi");
languageList.set("македонски ?азик","mk");
languageList.set("Malayalam","ml");
languageList.set("Norsk","no");
languageList.set("chiChe?a, chinyanja","ny");
languageList.set("Punjabi","pa");
languageList.set("j?zyk polski, Polszczyzna","pl");
languageList.set("Português","pt");
languageList.set("Roman?","ro");
languageList.set("русский","ru");
languageList.set("Sinhala","si");
languageList.set("Sloven?ina, Slovensky Jazyk","sk");
languageList.set("Slovenski Jezik, Sloven??ina","sl");
languageList.set("Soomaaliga, af Soomaali","so");
languageList.set("Shqip","sq");
languageList.set("српски ?език","sr");
languageList.set("Sesotho","st");
languageList.set("Basa Sunda","su");
languageList.set("Svenska","sv");
languageList.set("Kiswahili","sw");
languageList.set("Tamil","ta");
languageList.set("Telugu","te");
languageList.set("то?ик?, to?ikī, Tajik","tg");
languageList.set("Thai","th");
languageList.set("Wikang Tagalog","tl");
languageList.set("Türk?e","tr");
languageList.set("Укра?нська","uk");
languageList.set("Urdu","ur");
languageList.set("O?zbek, ?збек, Uzbek","uz");
languageList.set("Ti?ng Vi?t","vi");
languageList.set("Yiddish","yi");
languageList.set("Yorùbá","yo");
languageList.set("isiZulu","zu");
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
router.post('/upload',upload.single('upload_file'), function (req, res, next) {
    if(!req.file){
        res.json({error:"没有文件上传"});
        return ;
    }
    var sourcelanguage = languageList.get(req.body["sourcelanguage"]);
    var targetlanguage = languageList.get(req.body["detlanguage"]);
    var bh = req.body["bh"];
    var bm = req.body["bm"];
    var bs = req.body["bs"];
    var user = req.body['user'];
    console.log(req.body['user']);
    console.log(req.body["detlanguage"]);
    console.log(sourcelanguage);
    console.log(targetlanguage);
    var filename = uploadfile;
    console.log(filename);
    filename = filename.split(".")[0];
    var subPath = path.join(__dirname,"/../public/uploads/subtitle/");
    var videoPath = path.join(__dirname,"/../public/uploads/video/");
    var translatePath =  path.join(__dirname,"/../public/python/translate.py");
    var timeAddPath =  path.join(__dirname,"/../public/python/timeAdd.py");
    shell.exec('ffmpeg -i '+videoPath+ uploadfile +' -acodec copy -y -vn '+videoPath+ filename + '.m4a');
    shell.exec('autosub '+videoPath+ filename + '.m4a -S '+sourcelanguage+' -D '+sourcelanguage+' -o '+subPath+filename+'.srt');
    if(sourcelanguage != targetlanguage){
        shell.exec('python3 '+translatePath+ ' '+ sourcelanguage +' ' +targetlanguage + ' '+subPath+filename+'.srt ' + subPath+filename+targetlanguage+'.srt');
    }
    if(targetlanguage == sourcelanguage)
        targetlanguage = '';

    shell.exec('python3 '+timeAddPath+' '+subPath+filename+targetlanguage+'.srt '+bs+' '+bm+' '+bh);
    var connection = mysql.createConnection({
        host: sqlURL,
        user: sqlUSER,
        password: '123456',
        database: 'esub'
    });
    connection.connect();
    var sql = 'insert into subtitle(title,publisher,price,path,language) values(?,?,?,?,?)';
    var piss = [filename+targetlanguage, user, 20,subPath,targetlanguage];
    connection.query(sql, piss, function (err, result) {
        if (err) { //注册失败
            console.log('[INSERT ERROR] - ', err.message);
        }
        else { //注册成功

            console.log("写入数据库");
        }
    });
    connection.end();
    shell.exec('cat '+subPath+filename+targetlanguage+'.srt',  {encoding: 'gbk'},function(code, stdout, stderr) {
        console.log('Exit code:', code);

        //console.log('Program output:', stdout);
        var decodedText = iconv.decode(stdout, 'gbk');
        console.log('Program real:',decodedText);

        res.json({"success":decodedText,"file":subPath+filename+targetlanguage+'.srt'});
        //console.log('Program stderr:', stderr);
    });
    //res.json({"result":{message:"文件上传成功!"}});

});

router.post('/search',function (req, res, next) {
    var query_name = req.body["search"];
    var connection = mysql.createConnection({
        host: sqlURL,
        user: sqlUSER,
        password: '123456',
        database: 'esub'
    });
    connection.connect();
    console.log(query_name);
    var shellPath = path.join(__dirname,"/../public/uploads/shell.sh ");
    shell.exec('. '+shellPath+ query_name +'',function(code, stdout, stderr) {
        console.log('Program output:', stdout);
        var decodedText = iconv.decode(stdout, 'gbk');
        var result = decodedText.split(" ");
        if(result[0]==""){
            res.json({"success":null});
            return;
        }
        var _getSubtitle = function (name, callback) {
            var pos = name.lastIndexOf(".");
            name = name.substring(0,pos);
            console.log(name);
            var sql = "select * from subtitle where title=?";
            connection.query(sql, name, function (err, results) {
                if (!err) {
                   // console.log(results);
                    callback(results);
                } else {
                    callback(error());
                }
            });
            function error() {
                return "database error";
            }
        }
       // var result = ["storyboard.srt"];
        var subtitleInfo =[];
        for(var i = 0;i < result.length;i ++){
            if(result[i]=="" || result[i]=='\n')
                break;
            console.log('Program real:',result[i]);
            // to do search the database
            var getSubtitle = function (name, callback) {
                return _getSubtitle(name, callback);
            }
            getSubtitle(result[i], function (data) {
                var subtitle = data;
                console.log(subtitle);
                if(subtitle==""){
                    res.json({"success":null});
                    return;
                }
                var title = subtitle[0].title;
                var subtitleID = subtitle[0].subtitle_ID;
                var videoID = subtitle[0].video_ID;
                var publisher = subtitle[0].publisher;
                var time = subtitle[0].upload_time;
                var price = subtitle[0].price;
                subtitleInfo.push({subtitle:title,Time:time,subtitleID:subtitleID,videoID:videoID,Owner:publisher,price:price});
                if(subtitleInfo.length == result.length){
                    res.json({"success":subtitleInfo});
                    return;
                }
            });
        }
        connection.end();
    });
});

router.post('/download', function(req, res, next) {

    var fileName = req.body["files"];
    if(fileName == undefined) {
        res.end(404);
        return ;
    }
    var result = fileName.split("/");
    fileName = result[result.length-1];
    //fileName = "shell.sh" //测试用
    var filePath = path.join(__dirname, "/../public/uploads/subtitle/"+fileName);
    var stats = fs.statSync(filePath);
    if(stats.isFile()){
        res.set({
            'Content-Type': 'application/force-download',
            'Content-Disposition': 'attachment; filename='+fileName,
            'Content-Length': stats.size
        });
        fs.createReadStream(filePath).pipe(res);
    } else {
        res.end(404);
    }
});


module.exports = router;