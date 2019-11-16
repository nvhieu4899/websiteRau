var express = require('express');
var router = express.Router();
var Product = require('../models/product');


router.get('/sp', (req, res, next) => {
    const id = req.query.productId;
    const prod = Product.findById(id, (err, data) => {
        if (err) throw err;
        res.render('mot-san-pham', { title: 'Sản phẩm - ' + data.name, sp: data });
    })
});

module.exports = router;