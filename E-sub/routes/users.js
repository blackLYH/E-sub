var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var email = require("../public/javascripts/email");
var fs = require('fs');
var NodeRSA = require('node-rsa');
var multer = require('multer');
var taiPasswordStrength = require("tai-password-strength")
var sha512 = require('../public/javascripts/sha512');
var real_password;

var sqlURL = '45.76.169.253';
var sqlUSER = 'root';

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/getForget_change', function (req, res, next) {

    var account = req.body["teleNum"];
    var password = req.body["password"];
    var privatePem = fs.readFileSync('./public/private.pem').toString();
    var privatekey = new NodeRSA(privatePem);
    privatekey.setOptions({encryptionScheme: 'pkcs1'});
    var decrypted = privatekey.decrypt(password, 'utf8');
    password = decrypted;
    password = password.substring(0, password.length - 64);
    var strengthTester = new taiPasswordStrength.PasswordStrength();
    strengthTester.addCommonPasswords(taiPasswordStrength.commonPasswords);
    strengthTester.addTrigraphMap(taiPasswordStrength.trigraphs);
    var password_strength = strengthTester.check(password).strengthCode;

    var salt = 'NhTOqqJqLm6WsCEpPJkgrz1gPFhBA4vqn8tUEXrnLRmlVqKmqNpJVvS4Ix3Cws7F5ew5IjhQSnsioZVE2QLxGJ3NLLLXk9MhLphAX0Sl5dfdiJ3SHalqRzjMwi7BMu8w7Gj8OY6imGCwPcM6D1PK28';
    var composure = password + salt;
    var hash01 = sha512(composure);
    password = hash01.toString('hex');

    if (real_password == password) {
        console.log("两次密码相同");
        res.json({success: 'same password'});
        return;
    }
    var connection = mysql.createConnection({
        host: sqlURL,
        user: sqlUSER,
        password: '123456',
        database: 'esub'
    });
    connection.connect();
    var sql = 'update account set password= ?,pwd_strength=? where mail= ? ';
    var piss = [password, password_strength, account];
    connection.query(sql, piss, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        else {
            console.log("密码正确");
            res.json({success: 'password correct'});
            return;
        }
    });
    connection.end();
});

router.post('/getForget_account', function (req, res, next) {

    var account_outside = req.body["account"];
    var password = "haha";
    var connection = mysql.createConnection({
        host: sqlURL,
        user: sqlUSER,
        password: '123456',
        database: 'esub'
    });
    connection.connect();
    var _getUser = function (name, callback) {
        var sql = "SELECT password FROM  account  WHERE mail=?";
        connection.query(sql, account_outside, function (err, results) {
            if (!err) {
                var res = hasUser(results);
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
    var getUser = function (name, callback) {
        return _getUser(name, callback);
    }
    getUser(password, function (data) {
        var User = data;
        real_password = User.password;

        if (User.password == undefined) {
            console.log("该用户未注册");
            res.status(404);
            res.json({error: 'NO account'});
            return;
        }
        else {
            console.log("账号存在");
        }
    });
});

router.get('/verifycode', function (req, res, next) {
    var params = req.query;
    console.log("verifycode reqest : " + params.code)
    email.verifyCode(params.email, params.code, function () {
        res.send(true)
    }, function (e) {
        res.send(false)
    })
})

router.get('/getcode', function (req, res, next) {
    console.log("123");
    var params = req.query;
    console.log(params);
    email.sendCode(params.email, function () {
        res.send(true)
    })
})


router.post('/register_1', function (req, res, next) {

    var account_outside = req.body["account"];


    var password = "haha";
    var connection = mysql.createConnection({
        host: sqlURL,
        user: sqlUSER,
        password: '123456',
        database: 'esub'
    });
    connection.connect();
    var _getUser = function (name, callback) {
        var sql = "SELECT password FROM  account  WHERE account=?";
        connection.query(sql, account_outside, function (err, results) {
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
    var getUser = function (name, callback) {
        return _getUser(name, callback);
    }
    getUser(password, function (data) {
        var User = data;
        real_password = User.password;

        if (User.password == undefined) {
            console.log("确实是没注册的");
            res.json({success: 'NO account'});
            return;
        }
        else {
            res.json({success: 'account exist'});
        }
    });
});

router.post('/register_2', function (req, res, next) {

    var account = req.body["account"];
    var password = req.body["password"];

    var privatePem = fs.readFileSync('./public/private.pem').toString();
    var privatekey = new NodeRSA(privatePem);
    console.log("1231231231231312++++++");
    privatekey.setOptions({encryptionScheme: 'pkcs1'});
    var decrypted = privatekey.decrypt(password, 'utf8');
    password = decrypted;
    password = password.substring(0, password.length - 64);
    console.log("1231231231231312");
    var strengthTester = new taiPasswordStrength.PasswordStrength();
    strengthTester.addCommonPasswords(taiPasswordStrength.commonPasswords);
    strengthTester.addTrigraphMap(taiPasswordStrength.trigraphs);
    var password_strength = strengthTester.check(password).strengthCode;

    var salt = 'NhTOqqJqLm6WsCEpPJkgrz1gPFhBA4vqn8tUEXrnLRmlVqKmqNpJVvS4Ix3Cws7F5ew5IjhQSnsioZVE2QLxGJ3NLLLXk9MhLphAX0Sl5dfdiJ3SHalqRzjMwi7BMu8w7Gj8OY6imGCwPcM6D1PK28';
    var composure = password + salt;
    var hash01 = sha512(composure);
    password = hash01.toString('hex');
    var connection = mysql.createConnection({
        host: sqlURL,
        user: sqlUSER,
        password: '123456',
        database: 'esub'
    });
    console.log("456789");
    connection.connect();
    var defalut_headpic = 'system_defalut.jpg';
    var sql = 'insert into account(account,password,pwd_strength,image) values (?,?,?,?)';
    var piss = [account, password, password_strength, defalut_headpic];

    connection.query(sql, piss, function (err, result) {
        if (err) { //注册失败
            console.log('[INSERT ERROR] - ', err.message);
            return;
        }
        else { //注册成功
            res.json({success: 'register success'});
            console.log("写入数据库");
            return;
        }
    });
    connection.end();
});

router.post('/member_center', function (req, res, next) {
    var account = req.body["account"];
    var Filename="./public/log/"+account+".txt";
    var login_info = fs.readFileSync(Filename, 'utf-8');

    var connection = mysql.createConnection({
        host: sqlURL,
        user: sqlUSER,
        password: '123456',
        database: 'esub'
    });
    connection.connect();
    var sql = 'select * from account where account=?';
    var piss = account;
    connection.query(sql, piss, function (err, result) {
        if (err) {   //失败
            console.log('[Search account ERROR] - ', err.message);
            return;
        }
        else {  //成功
            res.json({success: result,login_info:login_info});
            return;
        }
    });
    connection.end();
});

router.post('/member_center_save', function (req, res, next) {
    var account = req.body["account"];
    var year = req.body["year"];
    var month = req.body["month"];
    var blood = req.body["blood"];
    var sex = req.body["sex"];
    var headpic = req.body["image"];
    var oldheadpic = req.body["old"];

    console.log("月"+month);

    var oldpath = './public/images/head/' + headpic;

    var gate;

    if(headpic==oldheadpic)
        gate=0;


    var date = new Date();
    var seperator1 = "_";
    var seperator2 = "_";
    var month1 = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month1 >= 1 && month1 <= 9) {
        month1 = "0" + month1;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month1 + seperator1 + strDate
        + "_" + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();

    headpic = account + '_' + currentdate + '_' + headpic;

    var newpath = './public/images/head/' + headpic;
    var deletepath = './public/images/head/' + oldheadpic;

    console.log(newpath);
    console.log(deletepath);
    console.log(oldpath);


    if(oldpath!="./public/images/head/system_default.jpg") {
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                throw err;
            }
            else {
                if (deletepath != "./public/images/head/system_default.jpg" && headpic != oldheadpic) {
                    fs.unlink(deletepath);
                }
            }
        });
    }

    var connection = mysql.createConnection({
        host: sqlURL,
        user: sqlUSER,
        password: '123456',
        database: 'esub'
    });
    connection.connect();
    var sql;
    var piss;

   // console.log(headpic);
   // console.log(oldheadpic);

    if (gate==0) {
        sql = 'update account set birthday_year=?,birthday_month=?,blood=?,sex=? where account=?';
        piss = [year, month, blood, sex, account];
    }
    else {
        sql = 'update account set birthday_year=?,birthday_month=?,blood=?,sex=?,image=? where account=?';
        piss = [year, month, blood, sex, headpic, account];
    }

    connection.query(sql, piss, function (err, result) {
        if (err) {
            console.log('[update account ERROR] - ', err.message);
            return;
        }
        else {
            res.json({success: "ok"});
            return;
        }
    });
    connection.end();
});


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/head')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({
    storage: storage
});

router.post('/upload', upload.single('file'), function (req, res, next) {
    var url = 'http://' + req.headers.host + '/images/' + req.file.originalname
    res.json({
        code: 200,
        data: url
    })
});

router.post('/Myshare', function (req, res, next) {

    var publisher = req.body["account"];

    var connection = mysql.createConnection({
        host: sqlURL,
        user: sqlUSER,
        password: '123456',
        database: 'esub'
    });
    connection.connect();
    var sql = 'select * from subtitle where publisher=?';
    var piss = publisher;

    connection.query(sql, piss, function (err, result) {
        if (err) {   //失败
            console.log('[Search account ERROR] - ', err.message);
            return;
        }
        else {  //成功
            res.json({success: result});
            return;
        }
    });
    connection.end();
});


module.exports = router;
