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
        res.render('form-dang-ki', {
            error: 'Username đã tồn tại!',
            layout: 'form-dang-ki'
        }, (err, html) => {
            res.send(html);
        });
    } else {
        await User.createNewUser(req.body.username, req.body.email, req.body.password);
        res.render('form-dang-ki', {
            error: 'Đăng kí thành công',
            layout: 'form-dang-ki'
        }, (err, html) => {
            res.send(html);
        });
    }
}