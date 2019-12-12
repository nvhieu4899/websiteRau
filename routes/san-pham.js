var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');


router.get('/', async(req, res, next) => {
    productController.allProduct(req, res, next);
});
router.get('/chi-tiet', async(req, res, next) => {
    productController.singleProduct(req, res, next);
});
router.get('/:id', async(req, res, next) => {
    productController.categoryProductController(req, res, next);
})
module.exports = router;