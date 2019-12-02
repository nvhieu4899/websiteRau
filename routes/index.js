var express = require('express');
var router = express.Router();
var product = require('../models/product');
var user = require('../models/user');
/* GET home page. */
router.get('/', async(req, res, next) => {
    const userid = req.query.username;
    if (userid == null)
        product.find((err, callback) => {
            res.render('index', { title: 'Rau - Rau sạch cho mọi nhà', products: callback });
        }).limit(8)
    else {
        const userfind = user.findOne({ username: userid });
        const userfound = await userfind.exec();
        product.find((err, callback) => {
            res.render('index', { title: 'Rau - Rau sạch cho mọi nhà', products: callback, user: userfound });
        }).limit(8)
    }
});
module.exports = router;