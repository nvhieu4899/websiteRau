var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('thanh-toan', { title: 'Thanh toán' });
});

module.exports = router;