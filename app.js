var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('./passport/passport');
const session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/san-pham');
var aboutRouter = require('./routes/ve-chung-toi');
var cartRouter = require('./routes/gio-hang');
var checkOutRouter = require('./routes/thanh-toan');
var loginRouter = require('./routes/dang-nhap');
var registerRouter = require('./routes/dang-ki');
var singleProductRouter = require('./routes/mot-san-pham');
var userInfoRouter = require('./routes/thong-tin');

mongoose.connect('mongodb+srv://customer:' + encodeURI('0766976947') + '@doanckweb-f3fht.mongodb.net/CustomerSite', { useNewUrlParser: true }, function(err) {
    if (err) throw err;
    console.log('Successfully connected');
});
var app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));


app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/san-pham', productRouter);
app.use('/ve-chung-toi', aboutRouter);
app.use('/gio-hang', cartRouter);
app.use('/thanh-toan', checkOutRouter);
app.use('/dang-nhap', loginRouter);
app.use('/dang-ki', registerRouter);
app.use('/chi-tiet', singleProductRouter);
app.use('/thong-tin', userInfoRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;