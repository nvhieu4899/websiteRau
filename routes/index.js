var express = require('express');
var router = express.Router();
var product = require('../models/product');
/* GET home page. */
router.get('/', (req, res, next) => {
    product.find((err, callback) => {
        res.render('index', { title: 'Rau - Rau sạch cho mọi nhà', products: callback, user: req.user });
    }).limit(8)
});
module.exports = router;