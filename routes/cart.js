var express = require('express');
var router = express.Router();
const cartController = require('../controllers/cartController');
// var Product = require('../models/product');
// var Cart = require('../models/cart');
// var Order = require('../models/order');


router.get('/add-to-cart/:id', async(req, res, next) => {
    cartController.addToCart(req, res, next);
});

router.get('/remove/:id', (req, res, next) => {
    cartController.removeFromCart(req, res, next);
});

router.get('/gio-hang', function (req, res, next) {
    cartController.gioHang(req, res, next);
});

router.get('/thanh-toan', isLoggedIn, function(req, res, next) {
    cartController.getThanhToan(req, res, next);
});

router.post('/thanh-toan', isLoggedIn, function(req, res, next) {
    cartController.postThanhToan(req, res, next);
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("../users/dang-nhap");
    }
}
