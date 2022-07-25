const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const strategy = (username, password, done) => {
 User.findOne({ username }, (err, user) => {
   if (err) { 
     return done(err);
   }
   if (!user) {
     return done(null, false, { message: "Incorrect username" });
   }
   bcrypt.compare(password, user.password, (err, res) => {
     if (res) {
       return done(null, user);
     } else {
       return done(null, false, { message: "Incorrect password" });
     }
   });
 });
}

const serializeUser = (user, done) => done(null, user._id);

const deserializeUser = (_id, done) => {
  User.findById(_id, (err, user) => {
    done(err, user);
  });
}

const authenticate = passport => {
 passport.use(new LocalStrategy(strategy));
 passport.serializeUser(serializeUser);
 passport.deserializeUser(deserializeUser);
}

module.exports = authenticate;