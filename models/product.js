var mongoose = require('mongoose');
var product = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    img: { type: String, required: false },
    rate: { type: Number, required: false },
    rateCount: { type: Number, required: false },
    sold: { type: Number, required: false },
    available: { type: Number, required: false },
    salePrice: { type: Number, required: false },
    category: { type: String, required: false }
});

const model = mongoose.model('Product', product, 'product');
model.createIndexes({ name: "text" });
module.exports.allProductNumber = async() => {
    try {
        let products = await model.find({}).lean();
        return products.length;
    } catch (err) { return 0; }
}
const paginateProduct = async(pageIndex, pageSize) => {
    try {
        return await model.find({}).skip(pageSize * (pageIndex - 1)).limit(pageSize).lean();
    } catch (err) {
        return null;
    }
}
module.exports.getProductAtPage = paginateProduct;
const relativeProduct = async(productId) => {
    try {
        const product = await model.findById(productId);
        const relaProd = await model.find({ category: product.category, _id: { $ne: productId } });
        return relaProd;
    } catch (err) {
        return null;
    }
}
module.exports.relativeProduct = relativeProduct;

const getProductById = async(productId) => {
    try {
        return await model.findById(productId);
    } catch (err) {
        return null;
    }
}
module.exports.getProductById = getProductById;
module.exports.filter = async(query, pageIndex, pageSize) => {
    let minCost = Number.MIN_SAFE_INTEGER;
    let maxCost = Number.MAX_SAFE_INTEGER;
    if (query.minCost) minCost = query.minCost;
    if (query.maxCost) maxCost = query.maxCost;

    let productQuery = model.find({ price: { $lte: maxCost, $gte: minCost } });
    if (query.productName)
        productQuery = productQuery.where('name').regex(query.productName);
    if (query.category)
        productQuery = productQuery.where('category').equals(query.category);
    let order = 0;

    if (query.orderBy == 1) order = 1;
    else if (query.orderBy == 2) order = -1;
    if (order)
        if (query.sortBy == 1)
            productQuery = productQuery.sort({ price: order });
        else if (query.sortBy == 2)
        productQuery = productQuery.sort({ sold: order });
    else
        productQuery = productQuery.sort({ available: order });

    try {
        return await productQuery.skip(pageSize * (pageIndex - 1)).limit(pageSize).exec();
    } catch (err) {
        return null;
    }
}

module.exports.filterWithCate = async(cateid, query, pageIndex, pageSize) => {
    let minCost = Number.MIN_SAFE_INTEGER;
    let maxCost = Number.MAX_SAFE_INTEGER;
    if (query.minCost) minCost = query.minCost;
    if (query.maxCost) maxCost = query.maxCost;

    let productQuery = model.find({ price: { $lte: maxCost, $gte: minCost }, category: cateid });
    if (query.productName)
        productQuery = productQuery.where('name').regex(query.productName);
    if (query.category)
        productQuery = productQuery.where('category').equals(query.category);
    let order = 0;

    if (query.orderBy == 1) order = 1;
    else if (query.orderBy == 2) order = -1;
    if (order)
        if (query.sortBy == 1)
            productQuery = productQuery.sort({ price: order });
        else if (query.sortBy == 2)
        productQuery = productQuery.sort({ sold: order });
    else
        productQuery = productQuery.sort({ available: order });

    try {
        return await productQuery.skip(pageSize * (pageIndex - 1)).limit(pageSize).exec();
    } catch (err) {
        return null;
    }
}

module.exports.filterWithCateNumber = async(cateid, query) => {
    let minCost = Number.MIN_SAFE_INTEGER;
    let maxCost = Number.MAX_SAFE_INTEGER;
    if (query.minCost) minCost = query.minCost;
    if (query.maxCost) minCost = query.maxCost;

    let productQuery = model.find({ price: { $lte: maxCost, $gte: minCost }, category: cateid });
    if (query.productName)
        productQuery = productQuery.where('name').regex(query.productName);
    if (query.category)
        productQuery = productQuery.where('category').equals(query.category);
    let order = 0;

    if (query.orderBy == 1) order = 1;
    else if (query.orderBy == 2) order = -1;
    if (order)
        if (query.sortBy == 1)
            productQuery = productQuery.sort({ price: order });
        else if (query.sortBy == 2)
        productQuery = productQuery.sort({ sold: order });
    else
        productQuery = productQuery.sort({ available: order });

    try {
        let products = await productQuery.lean().exec();
        return products.length;
    } catch (err) {
        return 0;
    }
}

module.exports.filterNumber = async(query) => {
    let minCost = Number.MIN_SAFE_INTEGER;
    let maxCost = Number.MAX_SAFE_INTEGER;
    if (query.minCost) minCost = query.minCost;
    if (query.maxCost) minCost = query.maxCost;
    let productQuery = model.find({ price: { $lte: maxCost, $gte: minCost } });
    if (query.productName)
        productQuery = productQuery.where('name').regex(query.productName);
    let order = 0;
    if (query.orderBy == 1) order = 1;
    else if (query.orderBy == 2) order = -1;
    if (order)
        if (query.sortBy == 1)
            productQuery = productQuery.sort({ price: order });
        else if (query.sortBy == 2)
        productQuery = productQuery.sort({ sold: order });
    else
        productQuery = productQuery.sort({ available: order });
    try {
        let products = await productQuery.lean().exec();
        return products.length;
    } catch (err) {
        return 0;
    }
}



module.exports.getProductsByCategory = async(categoryId, pageIndex = 1, pageSize = 8) => {
    try {
        return await model.find({ category: categoryId }).skip((pageIndex - 1) * pageSize).limit(pageSize).lean();
    } catch (err) {
        return null;
    }
}
module.exports.getTotalPagecategory = async(pageSize, categoryId) => {
    try {
        const count = await model.count({ category: categoryId });
        return Math.ceil(count / pageSize);
    } catch (e) {
        return null;
    }
};

module.exports.getProductByName = async(ten, pageIndex, pageSize) => {
    return await model.find({ name: { $regex: ten } }).skip((pageIndex - 1) * pageSize).limit(pageSize);
};