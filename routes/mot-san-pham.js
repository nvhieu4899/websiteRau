var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var async = require('async');

router.get('', async(req, res, next) => {
    const id = req.query.productId;
    if (id != null) {
        let displayProd, rela;
        const productFind = Product.findById(id);
        displayProd = await productFind.exec();
        const relaProductFind = Product.find({ category: displayProd.category, _id: { $ne: displayProd.id } }).limit(4);
        rela = await relaProductFind.exec();
        res.render('mot-san-pham', { title: 'Sản phẩm - ' + displayProd.name, sp: displayProd, relaProducts: rela });
    }
});

module.exports = router;