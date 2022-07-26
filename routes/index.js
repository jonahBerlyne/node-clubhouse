const express = require('express');
const router = express.Router();

const {
  msgs_get
} = require('../controllers/msgController');

/* GET home page. */
router.get('/', msgs_get);

module.exports = router;