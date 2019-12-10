var Product = require('../models/product');
var Category = require('../models/category');
const Handlebars = require('../hbs');
const PAGE_SIZE = 8;
const singleProductController = async(req, res, next) => {
    const id = req.query.productId;
    if (id != null) {
        try {
            const displayProd = await Product.getProductById(id);
            const rela = await Product.relativeProduct(id);
            res.render('mot-san-pham', {
                title: displayProd.name,
                sp: displayProd,
                relaProducts: rela
            });
        } catch (err) {
            next();
        }
    }
}
module.exports.singleProduct = singleProductController;
const allProductController = async(req, res, next) => {
    const id = req.query.loai;
    if (!id) {
        try {
            let p = req.query.p;
            if (p == null || p === "") p = 1;
            const displayProduct = await Product.getProductAtPage(p, PAGE_SIZE);
            const categories = await Category.find();
            const TOTAL_SIZE = await Product.getTotalPage(PAGE_SIZE);
            res.render('san-pham', {
                title: 'Sản phẩm',
                products: displayProduct,
                categorys: categories,
                page_url: req.originalUrl,
                pagination: {
                    page: p,
                    pageCount: TOTAL_SIZE,
                    limit: 4,
                    page_url: req.originalUrl
                },
                user: req.user
            });

        } catch (err) {
            next();
        }

    } else {
        try {
            let p = req.query.p;
            let name = req.query.productName;
            if (p == null || p === "") p = 1;
            const categories = await Category.find();
            const cate = await Category.findById(id);
            const TOTAL_SIZE = await Product.getTotalPage(PAGE_SIZE);
            const displayProduct = await Product.getProductsByCategory(id);
            res.render('san-pham', {
                title: 'Sản phẩm - ' + cate.name,
                products: displayProduct,
                categorys: categories,
                page_url: req.originalUrl,
                pagination: {
                    page: p,
                    pageCount: TOTAL_SIZE,
                    limit: 4,
                },
                user: req.user
            });
        } catch (err) {
            next();
        }
    }
}
module.exports.allProduct = allProductController;

module.exports.homepageFeatureProduct = async(req, res, next) => {
    const FeatureProduct = await Product.getProductAtPage(1, 8);
    res.render('index', {
        title: 'Rau - Rau sạch cho mọi nhà',
        products: FeatureProduct,
        user: req.user
    });

}