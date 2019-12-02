const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');
module.exports = function(passport) {
    passport.initialize();
    passport.use('local', new LocalStrategy(
        function(username, password, done) {
            User.findOne({ username: username }, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false); }
                if (!bcrypt.compareSync(password, user.password)) { return done(null, false); }
                return done(null, user);
            });
        }
    ));
}