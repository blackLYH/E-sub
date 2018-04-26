var express = require('express');
var mysql   = require('mysql');
var router = express.Router();
var fs = require('fs');
var path = require("path");



var sqlURL='45.76.169.253';

var sqlUSER='root';




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.post('/login/test', function(req, res, next) {


    var NodeRSA = require('node-rsa');

     var fs = require('fs');

      var privatePem = fs.readFileSync('./private.pem').toString();

      var privatekey=new NodeRSA(privatePem);

    privatekey.setOptions({encryptionScheme: 'pkcs1'});


    var account=req.body["Account"];
    var password_outside=req.body["Password"];

    var decrypted=privatekey.decrypt(password_outside,'utf8');


    password_outside=decrypted;

    password_outside=password_outside.substring(0,password_outside.length-64);


/*
    console.log("==================================");
    var sha512 = require('sha512')
    var textsha512="123";
    var hash = sha512(textsha512);
    console.log(hash.toString('hex'));
    console.log("==================================");
    */

    var sha512 = require('sha512');

    var salt='NhTOqqJqLm6WsCEpPJkgrz1gPFhBA4vqn8tUEXrnLRmlVqKmqNpJVvS4Ix3Cws7F5ew5IjhQSnsioZVE2QLxGJ3NLLLXk9MhLphAX0Sl5dfdiJ3SHalqRzjMwi7BMu8w7Gj8OY6imGCwPcM6D1PK28';

    var composure=password_outside+salt;

    var hash01=sha512(composure);

   password_outside=hash01.toString('hex');

    console.log(password_outside);

    var connection = mysql.createConnection({
        host     : sqlURL,
        user     : sqlUSER,
        password : '123456',
        database : 'esub'
    });

    connection.connect();


    var _getUser = function(name, callback) {

        var sql = "SELECT password FROM  account  WHERE account=?";

        connection.query(sql, account, function (err, results) {
            if (!err) {
                var res = hasUser(results)
                callback(res);

            } else {
                callback(error());
            }
        });

        function hasUser(results) {
           // console.log(results);
            if (results.length == 0) {
                return "not exist";
            }
            else {
                return results[0];
            }
        }
        function error() {
            return "database error";
        }
    }

    var getUser = function(name, callback){
        return _getUser(name, callback);
    }



    getUser(password_outside, function(data) {
        var User = data;

        if(User.password==undefined){
            console.log("食屎啦你没注册的");

            res.status(404);

            res.json({error:'NO account'});

            return;

        }


        /*
        var hash03=sha512(User.password+salt);

        var encrypt03=hash03.toString();

        var hash04=sha512(encrypt03);

        User.password=hash04.toString();
        */

      //  console.log(User.password);
      //  console.log(password_outside);

        if (User.password!=password_outside) {

            console.log("nimabi");
            res.status(404);

            res.json({error:'password wrong'});



        } else {

            console.log("nima");

           res.json({success:'password correct'});


        }

    });


    //res.render('login', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Express' });
});

router.post('/register', function(req, res, next) {
    console.log(req.body)

    //res.render('login', { title: 'Express' });
});

// router.get('/download', function(req, res, next) {
//
//     var shellPath = path.join(__dirname,"/../public/uploads/subtitle/");
//     fs.readdir(shellPath, function(err, results){
//         if(err) throw err;
//         if(results.length>0) {
//
//             var files = [];
//             results.forEach(function(file){
//                 if(fs.statSync(path.join(shellPath, file)).isFile()){
//                     files.push(file);
//                 }
//             })
//             console.log(files);
//             res.render('files', {files:files});
//         } else {
//             res.end('当前目录下没有文件');
//         }
//     });
//     console.log(shellPath);
//     // var f = fs.createReadStream(path);
//     // console.log("ok");
//     // res.writeHead(200, {
//     //     'Content-Type': 'application/force-download',
//     //     'Content-Disposition': 'attachment; filename='+'shell.sh'
//     // });
//     //
//     // f.pipe(res);
// });

router.get('/getForget', function(req, res, next) {
    res.render('getForget', { title: 'Express' });
});

router.get('/member_center', function(req, res, next) {
    res.render('member_center', { title: 'Express' });
});



module.exports = router;
