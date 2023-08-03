const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get("/adminProducts", authMiddleware, adminMiddleware, adminController.productsList);
router.get("/adminUsers", authMiddleware, adminMiddleware, adminController.usersList);
router.get("/adminUsersEditRol/:id", authMiddleware, adminMiddleware, adminController.usersEditRol);
router.post("/adminUsersEditRol/:id", authMiddleware, adminMiddleware, adminController.usersSaveRol);

module.exports = router;