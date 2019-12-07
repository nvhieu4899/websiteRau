var Product = require('../models/product');
var Category = require('../models/category');
const singleProductController = async(req, res, next) => {
    const id = req.query.productId;
    if (id != null) {
        try {

            const displayProd = await Product.getProductById(id);
            const rela = await Product.relativeProduct(id);
            res.render('mot-san-pham', { title: displayProd.name, sp: displayProd, relaProducts: rela });
        } catch (err) {
            next();
        }
    }
}
module.exports.singleProduct = singleProductController;
const allProductController = async(req, res, next) => {
    const id = req.query.loai;
    if (id == null || id === "") {
        Product.find((err, callback) => {
            if (err)
                res.sendStatus(404);
            Category.find(function(err, cat) {
                if (!err)
                    res.render('san-pham', { title: 'Sản phẩm - Tất cả', products: callback, categorys: cat });
                else next();
            });
        })
    } else {
        try {
            const categories = await Category.find();
            const cate = await Category.findById(id);
            const displayProduct = await Product.getProductsByCategory(id);
            res.render('san-pham', { title: 'Sản phẩm - ' + cate.name, products: displayProduct, categorys: categories });
        } catch (err) {
            next();
        }
    }


}
module.exports.allProduct = allProductController;

module.exports.homepageFeatureProduct = async(req, res, next) => {
    const FeatureProduct = await Product.getProductAtPage(1, 1);
    res.render('index', { title: 'Rau - Rau sạch cho mọi nhà', products: FeatureProduct, user: req.user });
}