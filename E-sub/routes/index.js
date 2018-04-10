var express = require('express');
var mysql   = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.post('/login/test', function(req, res, next) {



    console.log("boom");

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

    connection.query('select password from account where account=?',account, function (error, results) {
        if (error) throw error;
        console.log('password: ', results[0].password);
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

module.exports = router;
