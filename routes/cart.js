var express = require('express');
var router = express.Router();
const cartController = require('../controllers/cartController');
<<<<<<< HEAD
// var Product = require('../models/product');
// var Cart = require('../models/cart');
// var Order = require('../models/order');

=======
>>>>>>> d92ed0961793de59c4704ca17bedc675c669317f

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
    cartController.getThanhToan(req, res, next);
});

router.post('/thanh-toan', isLoggedIn, function(req, res, next) {
    cartController.postThanhToan(req, res, next);
});

<<<<<<< HEAD
module.exports = router;

=======
>>>>>>> d92ed0961793de59c4704ca17bedc675c669317f
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
<<<<<<< HEAD
        res.redirect("../users/dang-nhap");
    }
}
=======
        res.redirect("users/dang-nhap");
    }
}
module.exports = router;
>>>>>>> d92ed0961793de59c4704ca17bedc675c669317f
