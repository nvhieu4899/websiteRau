var express = require('express');
var router = express.Router();

var Product = require('../models/product');
var Cart = require('../models/cart');
var Order = require('../models/order');

module.exports.addToCart = async(req, res, next) => {
    let productId = req.params.id;
    let cart = new Cart(req.session.cart ? req.session.cart : {});
    let product = await Product.getProductById(productId);
    if (product) {
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.send(req.session.cart.totalQty.toString());
    } else {
        res.send("failure");
    }
};

module.exports.removeFromCart = (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/cart/gio-hang');
};

module.exports.gioHang = function(req, res, next) {
    if (!req.session.cart) {
        return res.render('gio-hang', { products: null });
    }
    var cart = new Cart(req.session.cart);
    res.render('gio-hang', { products: cart.generateArray(), totalPrice: cart.totalPrice });
};

module.exports.getThanhToan = function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/gio-hang');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    // res.render('thanh-toan', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
    res.render('thanh-toan', { total: cart.totalPrice });
};

module.exports.postThanhToan = function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/gio-hang');
    }
    var cart = new Cart(req.session.cart);
    var order = new Order({
        user: req.user,
        cart: cart,
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        date: new Date(),
        status: 0
    });
    order.save(function(err, result) {
        req.session.cart = null;
        res.redirect('/');
    });
};