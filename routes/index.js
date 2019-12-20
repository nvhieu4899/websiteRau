var express = require('express');
var router = express.Router();
const productControllers = require('../controllers/productController');
var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');

/* GET home page. */
router.get('/', (req, res, next) => {
    productControllers.homepageFeatureProduct(req, res, next);
});

router.get('/add-to-cart/:id', async(req, res, next) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    try {

        let product = await Product.getProductById(productId);


        if (product) {
            cart.add(product, product.id);
            req.session.cart = cart;
            console.log(req.session.cart.item);

            res.send(req.session.cart.totalQty.toString());
        } else {
            res.redirect('/');
        }
    } catch (err) {
        throw err;
    }
});

router.get('/remove/:id', (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/gio-hang');
});

router.get('/gio-hang', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('gio-hang', { products: null });
    }
    var cart = new Cart(req.session.cart);
    res.render('gio-hang', { products: cart.generateArray(), totalPrice: cart.totalPrice });
});

router.get('/thanh-toan', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/gio-hang');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    // res.render('thanh-toan', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
    res.render('thanh-toan', { total: cart.totalPrice });
});

router.post('/thanh-toan', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/gio-hang');
    }
    var cart = new Cart(req.session.cart);
    var order = new Order({
        user: req.user,
        cart: cart,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    });
    order.save(function(err, result) {
        // req.flash('success', 'Successfully bought product!');
        req.session.cart = null;
        res.redirect('/');
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("users/dang-nhap");
    }
}