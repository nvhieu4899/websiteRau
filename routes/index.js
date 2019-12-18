var express = require('express');
var router = express.Router();
const productControllers = require('../controllers/productController');
var Product = require('../models/product');
var Cart = require('../models/cart');

/* GET home page. */
router.get('/', (req, res, next) => {
    productControllers.homepageFeatureProduct(req, res, next);
});

router.get('/add-to-cart/:id', function (req, res, next) {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.getProductById(productId, function (err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

module.exports = router;