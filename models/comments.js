var mongoose = require('mongoose');
const Comment = new mongoose.Model({
    productId: { type: String, require: true },
    name: { type: String, require: true },
    detail: { type: String, require: true },
    date: { type: Date, require: true }
});

const model = mongoose.model('comment', Comment, 'comment');

module.exports.addComment = async(productId, name, detail) => {
    try {
        await model.insert({
            productId: productId,
            name: name,
            detail: detail,
            date: new Date()
        });
    } catch (err) {
        return null;
    }
};
module.exports.getCommentsListOfAProduct = async(proId, pageIndex, pageSize) => {
    try {
        return await model.find({
            productId: proId
        }).skip((pageIndex - 1) * pageSize).limit(pageSize);
    } catch (err) { return null; }
};