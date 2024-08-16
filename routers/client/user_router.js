const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/user_controller.js")
const validate = require('../../validates/client/user_validate.js');

router.get('/register', controller.register);

router.post(
  '/register', 
  validate.registerPost,
  controller.registerPost
);

module.exports = router;