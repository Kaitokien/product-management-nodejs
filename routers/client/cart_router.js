const express = require('express');
const router = express.Router();
const controller = require("../../controllers/client/cart_controller.js")

router.post('/add/:productId', controller.add);

module.exports = router;