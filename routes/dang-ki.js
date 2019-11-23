var express = require('express');
var router = express.Router();
var db = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('dang-ki', {
        error: ""
    });
});

router.post('/', async function (req, res, next) {
    if (req.body.username && req.body.email && req.body.password) {
        let user = new db.user({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            authen: "1"
        });
        await user.save(async function (err, user_mini) {
            if (err) {
                console.log(err);
                res.render('dang-ki', {
                    error: ""
                });
            } else if (user_mini) {
                res.redirect('/');
            } else { }
        });
    } else {
        res.render('dang-ki', {
            error: 'Hãy nhập đầy đủ thông tin!'
        })
    }
});

module.exports = router;