var express = require('express');
var router = express.Router();
var Product = require('../models/product')

/* GET home page. */
router.get('/', function(req, res, next) {
    const category = req.query.category;
    if (category == null) {
        Product.find((err, callback) => {
            if (err)
                res.sendStatus(404);
            res.render('san-pham', { title: 'Sản phẩm - Tất cả', products: callback });
        })
    }
});


module.exports = router;