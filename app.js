const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require("express-session");

const passport = require("passport");
const authenticate = require("./modules/authenticator");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/authRoutes');
const msgRouter = require('./routes/msgRoutes');

require('dotenv').config();

const app = express();

const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => console.log("connected to mongodb"))
        .catch(err => console.log(err));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

authenticate(passport);

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(session({ 
  secret: "cats", 
  resave: false, 
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', msgRouter);
app.use('/users', usersRouter);

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