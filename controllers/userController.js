var db = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const register = (req, res, next) => {
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
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            db.create({
                username: req.body.username,
                email: req.body.email,
                password: hash
            }).then(function(data) {
                if (data) {
                    res.redirect('/user/dang-nhap');
                }
            });
        });
    }
}

module.exports.register = register;
module.exports.registerAjax = (req, res, next) => {
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
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            db.create({
                username: req.body.username,
                email: req.body.email,
                password: hash
            }).then(function(data) {
                if (data) {
                    res.redirect('/user/dang-nhap');
                }
            });
        });
    }
}