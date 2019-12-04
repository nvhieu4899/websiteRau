var express = require('express');
var router = express.Router();
var passport = require('../passport/passport');
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('dang-nhap', { title: 'Đăng nhập', error: "" });
});

router.post('/', passport.authenticate('local', {
    failureRedirect: '/dang-nhap',
    successRedirect: '/',
    failureMessage: 'Sai username hoặc password',
    successMessage: 'Đăng nhập thành công'
}));
module.exports = router;