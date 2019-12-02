var express = require('express');
var router = express.Router();
var db = require('../models/user');
var passport = require('passport');
passport.initialize();
require('../passport/authenticate')(passport);

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('dang-nhap', { title: 'Đăng nhập', error: "" });
});

router.post('/', passport.authenticate('local', { failureRedirect: '/dang-nhap' }),
    (req, res) => {
        res.redirect('/');
    });

module.exports = router;