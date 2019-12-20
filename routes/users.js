var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
var passport = require('../passport/passport');
var Order = require('../models/order');
var Cart = require('../models/cart');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/dang-ki', function(req, res, next) {
    res.render('dang-ki', {
        title: "Đăng kí",
        error: ""
    });
});

router.post('/dang-ki', function(req, res, next) {
    userController(req, res, next);
});
router.get('/dang-nhap', (req, res, next) => {
    res.render('dang-nhap', { title: 'Đăng nhập', error: "" });
});

router.post('/dang-nhap', passport.authenticate('local', {
    failureRedirect: '/users/dang-nhap',
    successRedirect: '/'
}));
router.get('/thong-tin', function(req, res, next) {
    // res.render('thong-tin', { title: 'Thông tin người dùng', user: req.user });
    Order.find({user: req.user}, function(err, orders) {
        if (err) {
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function(order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('thong-tin', { orders: orders });
    });
});
router.get("/dang-xuat", (req, res) => {
    req.logout();
    res.redirect("/");
});
module.exports = router;

