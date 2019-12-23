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

module.exports = router;