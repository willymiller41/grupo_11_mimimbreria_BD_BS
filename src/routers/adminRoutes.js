const express = require("express");
const router = express.Router();
const adminController = require('../controllers/adminController');
const { body } = require('express-validator');

validations = [
    body('newRol').notEmpty().withMessage('Debe ingresar el nuevo rol')
]

router.get("/adminProducts", adminController.productsList);
router.get("/adminUsers", adminController.usersList);
router.get("/adminUsersEditRol/:id", adminController.usersEditRol);
router.post("/adminUsersEditRol/:id", validations, adminController.usersSaveRol);

module.exports = router;