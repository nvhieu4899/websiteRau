var Product = require('../models/product');
var Category = require('../models/category');
let Handlebars = require('../hbs');
let PAGE_SIZE = 8;
let singleProductController = async(req, res, next) => {
    let id = req.query.productId;
    try {
        let displayProd = await Product.getProductById(id);
        let rela = await Product.relativeProduct(id);
        res.render('mot-san-pham', {
            title: displayProd.name,
            sp: displayProd,
            relaProducts: rela
        });
    } catch (err) {
        next();
    }
}
module.exports.singleProduct = singleProductController;
const allProductController = async(req, res, next) => {
    let p = req.query.p;
    if (!p) p = 1;
    try {
        const category = await Category.getAllCategories();
        const display_product = await Product.getProductAtPage(p, PAGE_SIZE);
        const TOTAL_SIZE = await Product.getTotalPage(PAGE_SIZE, null);
        res.render('san-pham', {
            title: 'Sản phẩm',
            products: display_product,
            categorys: category,
            pagination: {
                page: p,
                pageCount: TOTAL_SIZE,
                limit: 4
            }
        });
    } catch (err) {
        next();
    }
}
module.exports.allProduct = allProductController;

module.exports.categoryProductController = async(req, res, next) => {
    const cateId = req.param('id');
    let p = req.query.p;
    if (!p) p = 1;
    try {
        const display_product = await Product.getProductsByCategory(cateId, p, PAGE_SIZE);
        const cates = await Category.getAllCategories();
        const TOTAL_SIZE = await Product.getTotalPage(PAGE_SIZE, cateId);
        res.render('san-pham', {
            title: 'Sản phẩm',
            products: display_product,
            categorys: cates,
            pagination: {
                page: p,
                pageCount: TOTAL_SIZE,
                limit: 4
            }
        });
    } catch (err) {
        throw err;
    }
}


module.exports.homepageFeatureProduct = async(req, res, next) => {
    let FeatureProduct = await Product.getProductAtPage(1, 8);
    res.render('index', {
        title: 'Rau - Rau sạch cho mọi nhà',
        products: FeatureProduct,
        user: req.user
    });
}
module.exports.filterAllProductController = async(req, res, next) => {
    const display_product = await Product.filter(req.query, PAGE_SIZE);
    const categories = await Category.getAllCategories();
    res.render('san-pham', {
        title: 'Sản phẩm',
        products: display_product,
        categorys: categories,
        pagination: {
            page: 1,
            pageCount: 3,
            limit: 4
        }
    });
}

module.exports.filterAllProductController_Ajax = async(req, res, next) => {
    const display_product = await Product.filter(req.query, PAGE_SIZE);
    const categories = await Category.getAllCategories();
    res.status(200);
    res.setHeader('Content-type', 'application/json');
    res.send(JSON.stringify(display_product));
}
module.exports.categoryProductController_Ajax = async(req, res, next) => {
    const cateId = req.param('id');
    let p = req.query.p;
    if (!p) p = 1;
    try {
        const display_product = await Product.getProductsByCategory(cateId, p, PAGE_SIZE);
        const cates = await Category.getAllCategories();
        const TOTAL_SIZE = await Product.getTotalPage(PAGE_SIZE, cateId);
        res.render('sp-box-template', { products: display_product }, (err, html) => {
            res.send(html);
        });
    } catch (err) {
        throw err;
    }
}
module.exports.allProduct_ajax = async(req, res, next) => {
    let p = req.query.p;
    if (!p) p = 1;
    try {
        const category = await Category.getAllCategories();
        const display_product = await Product.getProductAtPage(p, PAGE_SIZE);
        const TOTAL_SIZE = await Product.getTotalPage(PAGE_SIZE, null);
        res.render('sp-box-template', { products: display_product, layout: 'sp-box-template' }, (err, html) => {
            res.send(html);
        });
    } catch (err) {
        next();
    }
}