var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    cart: { type: Object, required: true },
    address: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, default: new Date() },
    status: { type: Number, default: 0 }
});

module.exports = mongoose.model('Order', schema);