var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
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
        default: "1"
    }
});
const model = mongoose.model('users', UsersSchema, 'users');
module.exports.model = model;
module.exports.checkIfExists = async(usr) => {
    try {
        let user = await model.findOne({ username: usr });
        if (user) return true;
    } catch (err) {
        return false;
    }
    return false;
}
module.exports.createNewUser = async(username, email, password) => {
    bcrypt.hash(password, saltRounds, async(err, hash) => {
        try {
            await model.create({
                username: username,
                email: email,
                password: hash
            });
            return true;
        } catch (err) {
            return false;
        }
    });

};