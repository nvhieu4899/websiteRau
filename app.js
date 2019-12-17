const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const flash = require('connect-flash'); // to add some messages
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const passport = require('./passport/passport');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/san-pham');
const aboutRouter = require('./routes/ve-chung-toi');
const cartRouter = require('./routes/gio-hang');
const checkOutRouter = require('./routes/thanh-toan');
mongoose.connect('mongodb+srv://customer:' + encodeURI('0766976947') + '@doanckweb-f3fht.mongodb.net/CustomerSite', { useNewUrlParser: true }, function(err) {
    if (err) throw err;
    console.log('Successfully connected');
});
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(session({ secret: "cats" })); // secret de ra file .env environment 
app.use(session({
    secret: 'mysupersecret', 
    resave: false, 
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 3 * 60 * 60 * 1000 } // 3 hours
  }));

app.use((req, res, next) => {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});

app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/san-pham', productRouter);
app.use('/ve-chung-toi', aboutRouter);
app.use('/gio-hang', cartRouter);
app.use('/thanh-toan', checkOutRouter);
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