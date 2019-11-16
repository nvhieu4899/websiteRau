var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('san-pham', { title: 'Sản phẩm' });
});

router.get('/san-pham', function(req, res, next) {
    res.render('rau-cu', { title: 'Sản phẩm - Rau củ' });
});

module.exports = router;