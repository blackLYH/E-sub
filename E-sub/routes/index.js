var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.post('/login/test', function(req, res, next) {
    console.log(req.body)

    //res.render('login', { title: 'Express' });
});

module.exports = router;
