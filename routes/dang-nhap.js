var express = require('express');
var router = express.Router();
var db = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('dang-nhap', { title: 'Đăng nhập', error: "" });
});

router.post('/', function (req, res, next) {
    if (req.body.username && req.body.password) {
        // db.user.find({
        //     username: req.body.username,
        //     password: req.body.password
        // }).exec(function (err, result) {
        //     if (err) {
        //         console.log("err");
        //     }
        //     else if (result) {
        //         console.log(result);
        //         if (result.length == 0) {
        //             res.render('./dang-nhap', { error: "Loi!" });
        //         } else {
        //             console.log(result);
        //             res.redirect('/');
        //         }
        //     }
        // })
        db.user.find({
            username: req.body.username
        }).exec(function (err, result) {
            if (err) {
                console.log('err');
                console.log(err);
            }
            else if (result) {
                console.log(result);
                console.log(result[0].password);
                bcrypt.compareSync(req.body.password, result[0].password, function (err, result_mini) {
                    console.log(result_mini);
                    if (err) throw err;
                    if (result_mini == true) {
                        console.log("1");
                        res.redirect('/');
                    }
                    else {
                        console.log("2");
                        res.redirect('/');
                    }
                });
                // bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
                //     if (err) { throw (err); }
                //     console.log(hash);

                //     bcrypt.compare(result[0].password, hash, function (err, result_mini) {
                //         console.log(result_mini);
                //         if (err) throw err;
                //         if (result_mini == true) {
                //             console.log("1");
                //             res.redirect('/');
                //         }
                //         else {
                //             console.log("2");
                //             res.redirect('/');
                //         }
                //     });
                // });
            }
        })
    }
    else {
        res.render('./dang-nhap', { error: "Hãy điền đầy đủ thông tin!" });
    }
});


module.exports = router;