var express = require('express');
var router = express.Router();
var db = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('dang-nhap', { title: 'Đăng nhập', error: "" });
});

router.post('/', async(req, res, next) => {
    const usernameCandidate = req.body.username;
    const passwordCandidate = req.body.password;

    const findUser = db.findOne({ username: usernameCandidate });
    let user = await findUser.exec();
    if (user) {
        bcrypt.compare(passwordCandidate, user.password, (err, compareResult) => {
            if (compareResult == true) {
                res.render('dang-nhap', { title: 'Đăng nhập', error: "Đăng nhập thành công" });
            } else {
                res.render('dang-nhap', { title: 'Đăng nhập', error: "Sai tên tài khoản hoặc mật khẩu" });
            }
        });
    } else {
        res.render('dang-nhap', { title: 'Đăng nhập', error: "Sai tên tài khoản hoặc mật khẩu không tìm thấy user" });
    }
});


module.exports = router;