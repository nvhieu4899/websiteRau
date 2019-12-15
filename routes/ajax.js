var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');


router.get('/san-pham', async(req, res, next) => {
    const displayProduct = productController.allProduct_ajax(req, res, next);
})

router.get('/san-pham/loai/:id', async(req, res, next) => {
    productController.categoryProductController_Ajax(req, res, next);
});
module.exports = router;