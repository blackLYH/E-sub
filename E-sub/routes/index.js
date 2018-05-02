var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var fs = require('fs');
var path = require("path");
var sha512 = require('../public/javascripts/sha512');
var NodeRSA = require('node-rsa');


var sqlURL = '45.76.169.253';
var sqlUSER = 'root';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/index', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Express'});
});

router.post('/login/test', function (req, res, next) {
    var privatePem = fs.readFileSync('./public/private.pem').toString();
    var privatekey = new NodeRSA(privatePem);
    privatekey.setOptions({encryptionScheme: 'pkcs1'});
    var account = req.body["Account"];
    var password_outside = req.body["Password"];
    var decrypted = privatekey.decrypt(password_outside, 'utf8');

    password_outside = decrypted;
    password_outside = password_outside.substring(0, password_outside.length - 64);

    var salt = 'NhTOqqJqLm6WsCEpPJkgrz1gPFhBA4vqn8tUEXrnLRmlVqKmqNpJVvS4Ix3Cws7F5ew5IjhQSnsioZVE2QLxGJ3NLLLXk9MhLphAX0Sl5dfdiJ3SHalqRzjMwi7BMu8w7Gj8OY6imGCwPcM6D1PK28';
    var composure = password_outside + salt;
    var hash01 = sha512(composure);
    password_outside = hash01.toString('hex');

    var connection = mysql.createConnection({
        host: sqlURL,
        user: sqlUSER,
        password: '123456',
        database: 'esub'
    });

    connection.connect();
    var _getUser = function (name, callback) {
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
    var getUser = function (name, callback) {
        return _getUser(name, callback);
    }
    getUser(password_outside, function (data) {
        var User = data;

        if (User.password == undefined) {
            console.log("未注册用户");
            res.status(404);
            res.json({error: 'NO account'});
            return;
        }

        if (User.password != password_outside) {
            console.log("密码错误");
            res.status(404);
            res.json({error: 'password wrong'});
        } else {
            console.log("密码正确");
            res.json({success: 'password correct'});
        }
    });
});

router.get('/register', function (req, res, next) {
    res.render('register', {title: 'Express'});
});

router.post('/register', function (req, res, next) {
    console.log(req.body)
});

router.get('/getForget', function (req, res, next) {
    res.render('getForget', {title: 'Express'});
});

router.get('/member_center', function (req, res, next) {
    res.render('member_center');
});

module.exports = router;
