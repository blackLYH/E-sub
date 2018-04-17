var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/getForget_change', function(req, res, next) {
    //res.render('getForget', { title: 'Express' });
});

router.post('/getForget_account', function(req, res, next) {


});


module.exports = router;
