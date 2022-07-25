const express = require('express');
const router = express.Router();

const { 
 msgs_get,
 msg_create_get,
 msg_create_post,
 msg_delete_post 
} = require("../controllers/msgController");

router.get("/", msgs_get);
router.get("/", msg_create_get);
router.post("/", msg_create_post);
router.post("/delete-msg", msg_delete_post);

module.exports = router;