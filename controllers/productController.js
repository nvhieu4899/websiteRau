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
            const productFind = Category.findById(id);
            const displayProd = await productFind.exec();
            const relaProductFind = Product.find({ category: displayProd.id });
            const rela = await relaProductFind.exec();
            const cat = await Category.find();
            Category.find(function(err, cat) {
                if (!err)
                    res.render('san-pham', { title: 'Sản phẩm - ' + displayProd.name, products: rela, categorys: cat });
            });
        } catch (err) {
            next();
        }
    }


}
module.exports.allProduct = allProductController;

module.exports.homepageFeatureProduct = async(req, res, next) => {
    const FeatureProduct = await Product.find({}).limit(8);
    res.render('index', { title: 'Rau - Rau sạch cho mọi nhà', products: FeatureProduct, user: req.user });
}