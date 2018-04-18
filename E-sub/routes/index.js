var express = require('express');
var mysql   = require('mysql');
var router = express.Router();

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

    //function:cryption
    console.log("--------test sha-512 cryption------");

    var plaintext="jianghaha";

    var crypto = require("crypto");
    var cryption= crypto.createHash('sha512');
    cryption.update(plaintext);
    console.log(cryption.digest('hex')) ;
    console.log("--------test sha-512 cryption end------");
    //function end




    var account=req.body["Account"];
    var password_outside=req.body["Password"];

    console.log(account);
    console.log(password_outside);

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
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


        console.log(User.password);
        console.log(password_outside);

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

router.get('/getForget', function(req, res, next) {
    res.render('getForget', { title: 'Express' });
});



module.exports = router;
