const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get("/adminProducts", adminController.productslist);
router.get("/adminUsers", adminController.userslist);


module.exports = router;