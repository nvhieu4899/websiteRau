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
    },
    fullname: {
        type: String
    },
    address: {
        type: String
    },
    gender: {
        type: Boolean
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
module.exports.updateInfoUser = async(userid, fullname, email, address, gender) => {
    try {
        await model.findByIdAndUpdate(userid, {
            fullname: fullname,
            email: email,
            address: address,
            gender: gender
        });
        return true;
    } catch (err) {
        return false;
    }
}
module.exports.updatePassword = async(userid, password) => {
    try {
        let newpass = bcrypt.hashSync(password, saltRounds);
        await model.findByIdAndUpdate(userid, { password: newpass });
        return true;
    } catch (err) {
        return false;
    }
}
module.exports.findUserById = async(userid) => {
    try {
        return await model.findById(userid).lean();
    } catch (err) {
        return null;
    }
}
module.exports.checkIfExistedEmail = async(usrId, mail) => {
    try {
        let usr = model.findOne({ email: mail }).lean();
        if (usr._id === usrId) {
            return true;
        } else return false;
    } catch (err) {
        return false;
    }
}