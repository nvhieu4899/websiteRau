var express = require('express');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');
var router = express.Router();
var db = require('../models/user');
var passport = require('passport');


passport.initialize();
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!bcrypt.compareSync(password, user.password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    // Coi lai cai nay ne... 
    User.getUserById(id, function (err, user) {
        done(err, user);
    });
});

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('dang-nhap', { title: 'Đăng nhập', error: "" });
});

router.post('/', passport.authenticate('local', { failureRedirect: '/dang-nhap' }),
    (req, res) => {
        res.redirect('/');
    });

module.exports = router;