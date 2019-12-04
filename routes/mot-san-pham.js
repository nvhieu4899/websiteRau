var express = require('express');
var router = express.Router();
var Product = require('../models/product');
// Callback way of writing code.
router.get('', (req, res, next) => {
    const id = req.query.productId;
    if (id != null) {
        let displayProd, relaProd;
        Product.findById(id, (err, callback) => {
            displayProd = callback;
            Product.find({ category: displayProd.category, _id: { $ne: displayProd.id } }, (error2, callback2) => {
                relaProd = callback2;
                res.render('mot-san-pham', { title: 'Sản phẩm - ' + displayProd.name, sp: displayProd, relaProducts: relaProd });
            }).limit(4);
        })
    }
});
module.exports = router;