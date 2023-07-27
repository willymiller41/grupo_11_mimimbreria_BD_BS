const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get("/adminProducts", adminController.productsList);
router.get("/adminUsers", adminController.usersList);
router.get("/adminUsersEditRol/:id", adminController.usersEditRol);
router.post("/adminUsersEditRol/:id", adminController.usersSaveRol);

module.exports = router;