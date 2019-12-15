var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');


router.get('/san-pham', async(req, res, next) => {
    const displayProduct = productController.allProduct_ajax(req, res, next);
})


module.exports = router;