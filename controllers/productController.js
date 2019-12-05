var Product = require('../models/product');
var Category = require('../models/category');
const singleProductController = async(req, res, next) => {
    const id = req.query.productId;
    if (id != null) {
        let displayProd, relaProd;
        Product.findById(id, (err, callback) => {
            displayProd = callback;
            Product.find({ category: displayProd.category, _id: { $ne: displayProd.id } }, (error2, callback2) => {
                relaProd = callback2;
                res.render('mot-san-pham', { title: 'Sản phẩm - ' + displayProd.name, sp: displayProd, relaProducts: relaProd });
            }).limit(4);
        })
    }
}
module.exports.singleProduct = singleProductController;
const allProductController = async(req, res, next) => {
    const id = req.query.loai;
    if (id == null) {
        Product.find((err, callback) => {
            if (err)
                res.sendStatus(404);
            Category.find(function(err, cat) {
                if (!err) res.render('san-pham', { title: 'Sản phẩm - Tất cả', products: callback, categorys: cat });
            });
        })
    } else {
        let displayProd, rela;
        const productFind = Category.findById(id);
        displayProd = await productFind.exec();
        const relaProductFind = Product.find({ category: displayProd.id });
        rela = await relaProductFind.exec();
        Category.find(function(err, cat) {
            if (!err) res.render('san-pham', { title: 'Sản phẩm - ' + displayProd.name, products: rela, categorys: cat });
        });
    }
}
module.exports.allProduct = allProductController;