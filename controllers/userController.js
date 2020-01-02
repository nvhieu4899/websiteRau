var db = require('../models/user').model;
var User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const register = async(req, res, next) => {
    let user = new db({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        authen: "1"
    });
    if (await User.checkIfExists(req.body.username)) {
        res.render('dang-ki', {
            error: 'Username đã tồn tại!'
        });
    } else {
        const isSuccess = await User.createNewUser(req.body.username, req.body.email, req.body.password);
        if (isSuccess) res.redirect('/dang-nhap');
    }
}
module.exports.register = register;
module.exports.registerAjax = async(req, res, next) => {
    if (await User.checkIfExists(req.body.username)) {
        res.send("username_duplicate");
    } else {
        await User.createNewUser(req.body.username, req.body.email, req.body.password);
        res.send("success");
    }
}
module.exports.modifyUserInfo = async(req, res, next) => {
    let updateEmail = req.body.email ? req.body.email : req.user.email;
    let updateGender = req.body.gender ? req.body.gender : req.user.gender;
    let updateAddress = req.body.address ? req.body.address : req.user.address;
    let updateFullname = req.body.address ? req.body.address : req.user.address;
    if (await User.checkIfExistedEmail(updateEmail)) {
        res.send("used-email");
        next();
    }
    if (await User.updateInfoUser()) {
        res.send("success");
    } else {
        res.send("failure");
    }
}
module.exports.updatePass = async(req, res, next) => {
    console.log(req.user);
    if (!bcrypt.compareSync(req.body.password, req.user.password)) {
        res.send("Wrong pass");
    } else {
        await User.updatePassword(req.user._id, req.body.newpass);
        res.send("success");
    }
}