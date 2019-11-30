var express = require('express');
var router = express.Router();
var db = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('dang-ki', {
        title: "Đăng kí",
        error: ""
    });
});

router.post('/', function(req, res, next) {
    if (req.body.username && req.body.email && req.body.password) {
        console.log(req.body.password.length);
        if (req.body.password.length < 7) {
            res.render('dang-ki', {
                error: 'Password ít nhất 7 kí tự!'
            });
        } else {
            let user = new db({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                authen: "1"
            });
            db.countDocuments({ username: req.body.username }, function(err, count) {
                console.log(count);
                if (err) console.log("err");
                if (count > 0) {
                    //document exists
                    res.render('dang-ki', {
                        error: 'Username đã tồn tại!'
                    });
                } else {
                    console.log("Vo else");
                    // user.save(function (err, user_ok) {
                    //     if (err) {
                    //         console.log(err);
                    //         res.render('dang-ki', {
                    //             error: ""
                    //         });
                    //     } else if (user_ok) {
                    //         res.redirect('/');
                    //     }
                    // });
                    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                        db.create({
                            username: req.body.username,
                            email: req.body.email,
                            password: hash
                        }).then(function(data) {
                            if (data) {
                                res.redirect('/');
                            }
                        });
                    });
                }
            });
        }
    } else {
        res.render('dang-ki', {
            error: 'Hãy nhập đầy đủ thông tin!'
        });
    }
});

module.exports = router;