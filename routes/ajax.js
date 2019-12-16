var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');

router.get('/san-pham', async(req, res, next) => {
    if (!req.query.sortBy) productController.allProduct_ajax(req, res, next);
    else productController.filterAllProductController_Ajax(req, res, next);
})

router.get('/san-pham/loai/:id', async(req, res, next) => {
    productController.categoryProductController_Ajax(req, res, next);
});
router.post('/users/dang-ki', async(req, res, next) => {
    userController.registerAjax(req, res, next);
});




module.exports = router;