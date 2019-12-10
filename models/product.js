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
const allProduct = async() => {
    return await this.find({});
}
module.exports.allProduct = allProduct;
const paginateProduct = async(pageIndex, pageSize) => {
    return await model.find({}).skip(pageSize * (pageIndex - 1)).limit(pageSize);
}
module.exports.getProductAtPage = paginateProduct;
const relativeProduct = async(productId) => {
    const product = await model.findById(productId);
    const relaProd = await model.find({ category: product.category, _id: { $ne: productId } });
    return relaProd;
}
module.exports.relativeProduct = relativeProduct;

const getProductById = async(productId) => {
    return await model.findById(productId);
}
module.exports.getProductById = getProductById;

module.exports.filter = async(productName, categoryId, minCost, maxCost, pageIndex, pageSize) => {

    if (minCost === "" || minCost == null) minCost = Number.MIN_SAFE_INTEGER;
    if (maxCost === "" || maxCost == null) maxCost = Number.MAX_SAFE_INTEGER;
    if (categoryId == null || categoryId === "") {
        return await model.find({
            name: { $regex: productName },
            price: { $min: minCost, $max: maxCost }
        }).skip(pageSize * (pageIndex - 1)).limit(page);
    } else {
        return await model.find({
            name: { $regex: productName },
            category: categoryId,
            price: { $min: minCost, $max: maxCost }
        }).skip(pageSize * (pageIndex - 1)).limit(page);
    }
}
module.exports.getProductsByCategory = async(categoryId, pageIndex = 1, pageSize = 8) => {
    return await model.find({ category: categoryId }).skip((pageIndex - 1) * pageSize).limit(pageSize);
}

module.exports.getTotalPage = async(pageSize, ten) => {
    try {
        var count;
        if (ten==null) count = await model.count({});
        else count = await model.count({name: { $regex: ten }});
        return Math.ceil(count / pageSize);

    } catch (e) {
        return 0;
    }
};

module.exports.getTotalPagecategory = async(pageSize, categoryId) => {
    try {
        const count = await model.count({category: categoryId});
        return Math.ceil(count / pageSize);

    } catch (e) {
        return 0;
    }
};

module.exports.getProductByName = async(ten, pageIndex, pageSize) => {
    return await model.find({name: { $regex: ten }}).skip((pageIndex - 1) * pageSize).limit(pageSize);
}