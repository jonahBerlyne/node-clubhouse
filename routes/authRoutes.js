const express = require('express');
const router = express.Router();

const {
 sign_up_get,
 sign_up_post,
 log_in_get,
 log_in_post,
 log_out_get
} = require("../controllers/authController");

router.get('/sign-up', sign_up_get);
router.post('/sign-up', sign_up_post);
router.get('/log-in', log_in_get);
router.post('/log-in', log_in_post);
router.get('/log-out', log_out_get);

module.exports = router;