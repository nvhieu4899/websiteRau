var mongoose = require('mongoose');
const Comment = new mongoose.Schema({
    productId: { type: String, require: true },
    name: { type: String, require: true },
    detail: { type: String, require: true },
    date: { type: Number, require: true }
});

const model = mongoose.model('Comment', Comment, 'comment');

module.exports.addComment = async(productId, name, detail) => {
    try {
        var now = new Date().getTime();
        let commentAdd = new model({
            productId: productId,
            name: name,
            detail: detail,
            date: now
        })
        commentAdd.save(function(err, comm) {
            if (err) return null;
            else return comm;
        });
    } catch (err) {
        return null;
    }
};
module.exports.getCommentsListOfAProduct = async(proId, pageIndex, pageSize) => {
    try {
        let comments = model.find({
            productId: proId
        }).skip((pageIndex - 1) * pageSize).limit(pageSize).lean();
        return comments;
    } catch (err) { return null; }
};
module.exports.getNumberOfCommentsOfAProduct = async(proId) => {
    try {
        let comments = await model.find({
            productId: proId
        }).lean();
        return comments.length;
    } catch (err) { return 0; }
}