var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');


router.get('/', async(req, res, next) => {
    if (!req.query.sortBy)
        productController.allProduct(req, res, next);
    else
        productController.filterAllProductController_Ajax(req, res, next);
});
router.get('/chi-tiet', async(req, res, next) => {
    productController.singleProduct(req, res, next);
});
router.get('/loai/:id', async(req, res, next) => {
    productController.categoryProductController(req, res, next);
});
module.exports = router;