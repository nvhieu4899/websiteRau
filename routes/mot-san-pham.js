var express = require('express');
var router = express.Router();
var Product = require('../models/product');


router.get('', (req, res, next) => {
    const id = req.query.productId;
    if (id != null) {
        let prod = Product.findById(id, (err, data) => {
            if (err) res.sendStatus(404);
            res.render('mot-san-pham', { title: 'Sản phẩm - ' + data.name, sp: data });
        })
    }
});

module.exports = router;