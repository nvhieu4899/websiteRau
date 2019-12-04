var express = require('express');
var router = express.Router();
var product = require('../models/product');
var user = require("../models/user");
/* GET home page. */
router.get('/', (req, res, next) => {
    product.find((err, callback) => {
        res.render('index', { title: 'Rau - Rau sạch cho mọi nhà', products: callback, user: req.user });
    }).limit(8)
}); 

router.get("/dang-xuat", (req, res) => {
    req.logout();
    res.redirect("/");
});
module.exports = router;