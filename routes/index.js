var express = require('express');
var router = express.Router();
const productControllers = require('../controllers/productController');
var Product = require('../models/product');
var Cart = require('../models/cart');

/* GET home page. */
router.get('/', (req, res, next) => {
    productControllers.homepageFeatureProduct(req, res, next);
});

router.get('/add-to-cart/:id', async (req, res, next) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    let product = await Product.getProductById(productId);

    if (product) {
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/san-pham');
    } else {
        res.redirect('/');
    }
});

router.get('/gio-hang', function (req, res, next) {
    if (!req.session.cart) {
        return res.render('gio-hang', { products: null });
    }
    var cart = new Cart(req.session.cart);
    res.render('gio-hang', { products: cart.generateArray(), totalPrice: cart.totalPrice });
});

module.exports = router;