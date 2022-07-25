const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/userModel');

const sign_up_get = (req, res) => res.render("sign-up-form");

const sign_up_post = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if (err) {
     return next(err);
    }
    const user = new User({
      username: req.body.username,
      password: hashedPassword
    }).save(err => {
      if (err) { 
        return next(err);
      }
      passport.authenticate("local") (req, res, () => {
        return res.redirect("/");
      });
    });
  });
}

const log_in_get = (req, res) => res.render("login-form");

const log_in_post = () => {
 passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/"
 });
}

const log_out_get = (req, res, next) => {
 req.logout(err => {
  if (err) {
   return next(err);
  }
  res.redirect("/");
 });
}

module.exports = {
 sign_up_get,
 sign_up_post,
 log_in_get,
 log_in_post,
 log_out_get
};