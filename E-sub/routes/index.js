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


    var account=req.body["Account"];
    var password_outside=req.body["Password"];

    console.log(account);
    console.log(password_outside);

    


    //res.render('login', { title: 'Express' });
});

module.exports = router;
