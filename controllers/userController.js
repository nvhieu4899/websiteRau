var db = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const register = async(req, res, next) => {
    let user = new db({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        authen: "1"
    });
    if (db.checkIfExists(req.body.username)) {
        res.render('dang-ki', {
            error: 'Username đã tồn tại!'
        });
    } else {
        const isSuccess = await db.createNewUser(req.body.username, req.body.email, req.body.password);
        if (isSuccess) res.redirect('/dang-nhap');
    }
}

module.exports.register = register;
module.exports.registerAjax = async(req, res, next) => {
    if (await db.checkIfExists(req.body.username)) {
        res.render('dang-ki', {
            error: 'Username đã tồn tại!',
            layout: 'dang-ki'
        }, (err, html) => {
            res.send(html);
        });
    } else {
        const isSuccess = await db.createNewUser(req.body.username, req.body.email, req.body.password);
        if (isSuccess) res.redirect('/dang-nhap');
    }
}