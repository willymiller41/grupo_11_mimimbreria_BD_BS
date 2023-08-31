const express = require("express");
const router = express.Router();
const cartController = require('../controllers/cartController');
console.log('estoy en el router de carrito')
router.get("/cart", cartController.cart);

module.exports = router;