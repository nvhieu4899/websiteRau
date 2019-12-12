var mongoose = require('mongoose');
var Category = new mongoose.Schema({
    name: { type: String, required: true }
});
var model = mongoose.model('Category', Category, 'category');
module.exports.getAllCategories = async() => {
    return await model.find({});
}
module.exports.getCategoryById = async(id) => {
    return await model.findById(id);
}