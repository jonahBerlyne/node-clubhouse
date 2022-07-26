const Msg = require("../models/msgModel");
const { body, validationResult } = require("express-validator");

const msgs_get = (req, res, next) => {
 Msg.find({}, 'author text')
    .sort({ createdAt: 'desc' })
    .populate('author')
    .exec((err, msgs) => {
     if (err) {
      return next(err);
     }
     res.render('index', { 
      msgs,
      user: req.user 
     });
    });
}

const msg_create_get = (req, res) => res.render('msg_form', {
 msg: undefined,
 errors: undefined
});

const msg_create_post = [
 body("msg", "Text field must not be empty.")
     .trim()
     .isLength({ min: 1 })
     .escape(),
 
 (req, res, next) => {
  const errors = validationResult(req);
  const msg = new Msg({
   author: req.user,
   text: req.body.msg
  });

  if (!errors.isEmpty()) {
   res.render("msg_form", {
    msg,
    errors: errors.array()
   });
   return;
  } else {
   msg.save(err => {
    if (err) {
     return next(err);
    }
    res.redirect("/");
   });
  }
 }
];

const msg_delete_post = (req, res, next) => {
 Msg.findByIdAndRemove(req.body.msgid, err => {
  if (err) {
   return next(err);
  }
  res.redirect("/");
 });
}

module.exports = {
 msgs_get,
 msg_create_get,
 msg_create_post,
 msg_delete_post
};