var express = require('express');
var router = express.Router();
const productControllers = require('../controllers/productController');
/* GET home page. */
router.get('/', (req, res, next) => {
    productControllers.homepageFeatureProduct(req, res, next);
});


module.exports = router;