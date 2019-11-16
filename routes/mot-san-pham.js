var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var async = require('async');

router.get('', async(req, res, next) => {
    const id = req.query.productId;
    if (id != null) {
        let displayProd, rela;
        const productFind = Product.findById(id);
        const relaProductFind = Product.find().limit(4);
        displayProd = await productFind.exec();
        rela = await relaProductFind.exec();
        res.render('mot-san-pham', { title: 'Sản phẩm - ' + displayProd.name, sp: displayProd, relaProducts: rela });
    }
});

module.exports = router;