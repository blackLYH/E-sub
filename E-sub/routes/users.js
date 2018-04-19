var express = require('express');
var router = express.Router();
var mysql   = require('mysql');

var real_password;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/getForget_change', function(req, res, next) {


    var account=req.body["forget_account"];
    var password=req.body["forget_password"];
    console.log(account);
    console.log(password);

    if(real_password==password){
        console.log("SAME password!");

        res.json({success:'same password'});

        return;
    }

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '123456',
        database : 'esub'
    });

    connection.connect();

    var  sql = 'update account set password= ? where account= ? ';
    var piss=[password,account];
    console.log(sql);
    connection.query(sql,piss,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        else {

           console.log("asdf");

            res.json({success:'password correct'});

            return;
        }


    });

    connection.end();


});

router.post('/getForget_account', function(req, res, next) {


    console.log("test for forget");
    var account_outside=req.body["account"];

    console.log(account_outside);
  //  res.render('getForget', { title: 'Express' });
  //  var account_outside=req.body("account");
  //  console.log(account_outside);

    var password="haha";

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '123456',
        database : 'esub'
    });

    connection.connect();

    var _getUser = function(name, callback) {

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

    var getUser = function(name, callback){
        return _getUser(name, callback);
    }

    getUser(password, function(data) {


        var User = data;

        console.log(User.password);
        real_password=User.password;

        if(User.password==undefined){
            console.log("食屎啦你没注册的");
            res.status(404);
            res.json({error:'NO account'});
            return;
        }
        else {
            console.log("账号存在");
        }


    });



});


router.post('/register_1', function(req, res, next) {

    console.log("test for register");

    var account_outside=req.body["account"];

    console.log(account_outside);

    var password="haha";


    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '123456',
        database : 'esub'
    });

    connection.connect();

    var _getUser = function(name, callback) {

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

    var getUser = function(name, callback){
        return _getUser(name, callback);
    }

    getUser(password, function(data) {


        var User = data;

        console.log(User.password);
        real_password=User.password;

        if(User.password==undefined){
            console.log("确实是没注册的");
            res.json({success:'NO account'});
            return;
        }
        else {
            res.json({success:'account exist'});
        }


    });


});

router.post('/register_2', function(req, res, next){

    console.log("test for register02");

    var account=req.body["account"];
    var password=req.body["password"];
    console.log(account);
    console.log(password);

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '123456',
        database : 'esub'
    });

    connection.connect();

    var  sql = 'insert into account(account,password) values (?,?)';
    var piss=[account,password];
   // console.log(sql);
    connection.query(sql,piss,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        else {

            console.log("caonima");

            res.json({success:'register success'});

            return;

        }
    });
    connection.end();
});

module.exports = router;
