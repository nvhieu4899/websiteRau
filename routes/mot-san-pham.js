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
        const relaProductFind = await Product.find({ category: displayProd.category, _id: { $ne: displayProd.id } }).limit(4);
        rela = await relaProductFind.exec();
        res.render('mot-san-pham', { title: 'Sản phẩm - ' + displayProd.name, sp: displayProd, relaProducts: rela });
    }
});

// // Callback way of writing code.
// router.get('', (req, res, next) => {
//     const id = req.query.productId;
//     if (id != null) {
//         let displayProd, relaProd;
//         Product.findById(id, (err, callback) => {
//             displayProd = callback;
//             Product.find({ category: displayProd.category, _id: { $ne: displayProd.id } }, (error2, callback2) => {
//                 relaProd = callback2; 
//                 res.render('mot-san-pham', { title: 'Sản phẩm - ' + displayProd.name, sp: displayProd, relaProducts: relaProd });
//             }).limit(4);
//         })
//     }
// // url param
// // multi - query
// });

// router.get('', async (req, res, next) => {
//     const id = req.query.productId;
//     if (id != null) {
//         let displayProd, relaProd;
//         await Product.findById(id, (err, callback) => {
//             displayProd = callback;
//         })
//         await Product.find({ category: displayProd.category, _id: { $ne: displayProd.id } }, (error2, callback2) => {
//             relaProd = callback2; 
//         }).limit(4);
//         res.render('mot-san-pham', { title: 'Sản phẩm - ' + displayProd.name, sp: displayProd, relaProducts: relaProd });
//     }
// // url param
// // multi - query
// });


module.exports = router;