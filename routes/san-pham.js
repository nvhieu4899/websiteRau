var express = require('express');
var router = express.Router();
var Product = require('../models/product')
var Category = require('../models/category')
var async = require('async');

router.get('', async(req, res, next) => {
    const id = req.query.loai;
    if (id == null) {
        Product.find((err, callback) => {
            if (err)
                res.sendStatus(404);
            Category.find(function(err,cat){
                if (!err) res.render('san-pham', { title: 'Sản phẩm - Tất cả', products: callback, categorys: cat });
            });
        })
    } else
    {
        let displayProd, rela;
        const productFind = Category.findById(id);
        displayProd = await productFind.exec();
        const relaProductFind = Product.find({ category: displayProd.id});
        rela = await relaProductFind.exec();
        Category.find(function(err,cat){
            if (!err) res.render('san-pham', { title: 'Sản phẩm - ' + displayProd.name, products: rela, categorys: cat });
        });
    }
});



module.exports = router;