var mongoose = require('mongoose');
var UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        default: "no_id"
    },
    email: {
        type: String,
        default: "a@gmail.com"
    },
    password: {
        type: String,
        default: "0"
    },
    authen: {
        type: String,
        default: "0"
    }
});
const model = mongoose.model('users', UsersSchema, 'users');
module.exports.model = model;
module.exports.checkIfExists = async(username) => {
    try {
        const user = await model.findOne({ username: username });
        if (user) return true;
        else return false;
    } catch (err) {
        return false;
    }
}