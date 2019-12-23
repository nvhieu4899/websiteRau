var express = require('express');
var router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/add-to-cart/:id', async(req, res, next) => {
    cartController.addToCart(req, res, next);
});

router.get('/remove/:id', (req, res, next) => {
    cartController.removeFromCart(req, res, next);
});

router.get('/', function(req, res, next) {
    cartController.gioHang(req, res, next);
});

router.get('/thanh-toan', isLoggedIn, function(req, res, next) {
    cartController.thanhToan(req, res, next);
});

router.post('/thanh-toan', isLoggedIn, function(req, res, next) {
    cartController.thanhToan(req, res, next);
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("users/dang-nhap");
    }
}
module.exports = router;