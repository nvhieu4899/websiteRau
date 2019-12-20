var Product = require('../models/product');
var Category = require('../models/category');
let Handlebars = require('../hbs');
let PAGE_SIZE = 8;
var Comment = require('../models/comments');
let singleProductController = async(req, res, next) => {
    let id = req.query.productId;
    try {
        let displayProd = await Product.getProductById(id);
        let rela = await Product.relativeProduct(id);
        let comments = await Comment.getCommentsListOfAProduct(id, 1, 10);
        res.render('mot-san-pham', {
            title: displayProd.name,
            sp: displayProd,
            relaProducts: rela,
            user: req.user,
            comment: comments
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
        let total = await Product.allProductNumber();
        let totalPage = Math.ceil(total / PAGE_SIZE);
        res.render('san-pham', {
            title: 'Sản phẩm',
            products: display_product,
            categorys: category,
            user: req.user,
            pagination: {
                page: p,
                pageCount: totalPage,
                limit: 9
            }
        });
    } catch (err) {
        next();
    }
}
module.exports.allProduct = allProductController;

module.exports.categoryProductController = async(req, res, next) => {
    const cateId = req.params.id;
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
                limit: 9
            },
            user: req.user
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
};
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
        },
        user: req.user
    });
};
module.exports.categoryProductController_Ajax = async(req, res, next) => {
    const cateId = req.params.id;
    let p = req.query.p;
    if (!p) p = 1;
    try {
        const display_product = await Product.getProductsByCategory(cateId, p, PAGE_SIZE);
        const cates = await Category.getAllCategories();
        let total = Math.ceil(display_product.length / PAGE_SIZE);
        res.render('sp-box-template', {
            products: display_product,
            pagination: {
                page: p,
                pageCount: total,
                limit: 9
            },
            layout: 'sp-box-template'
        }, (err, html) => {
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
        let total = await Product.allProductNumber();
        let totalPage = Math.ceil(total / PAGE_SIZE);
        res.render('sp-box-template', {
            products: display_product,
            pagination: {
                page: p,
                pageCount: totalPage,
                limit: 9
            },
            layout: 'sp-box-template'
        }, (err, html) => {
            res.send(html);
        });
    } catch (err) {
        next();
    }
}
module.exports.filterAllProductController_Ajax = async(req, res, next) => {
    let p = 1;
    if (req.query.p) p = req.query.p
    const display_product = await Product.filter(req.query, p, PAGE_SIZE);
    let total = await Product.filterNumber(req.query);
    let totalPage = Math.ceil(total / PAGE_SIZE);

    res.render('sp-box-template', {
        products: display_product,
        pagination: {
            page: p,
            pageCount: totalPage,
            limit: 9
        },
        layout: 'sp-box-template'
    }, (err, html) => {
        res.send(html);
    });
};
module.exports.filterOneCategoryController_Ajax = async(req, res, next) => {
    let p = 1;
    if (req.query.p) p = req.query.p
    const display_product = await Product.filter(req.query, p, PAGE_SIZE);
    let total = await Product.filterNumber(req.query);
    let totalPage = Math.ceil(total / PAGE_SIZE);

    res.render('sp-box-template', {
        products: display_product,
        pagination: {
            page: p,
            pageCount: totalPage,
            limit: 9
        },
        layout: 'sp-box-template'
    }, (err, html) => {
        res.send(html);
    });
};
module.exports.addCommentController = async(req, res, next) => {
    try {
        productId = req.body.productId;
        if (req.body.username && req.body.content) {
            await Comment.addComment(productId, req.body.username, req.body.content);
            res.send("success")
        }
    } catch (err) {
        res.send("failure");
    }
}