const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');
const path = require("path");
const { body } = require('express-validator');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//Seteo de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.join(__dirname, "../../public/img/avatars"))
    },

    filename: (req, file, cb) =>{
        const newFileName = 'usuario_' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName)
    }
})

const upload = multer({ storage })

usersRegisterValidations = [
    body('name').notEmpty().withMessage('Debe ingresar su nombre'),
    body('surname').notEmpty().withMessage('Debe ingresar su apellido'),
    body('email').notEmpty().withMessage('Debe ingresar su email').bail().isEmail().withMessage('Email inválido'),
    body('address').notEmpty().withMessage('Debe ingresar su dirección'),
    body('code').notEmpty().withMessage('Debe indicar su código postal'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        if(!file){
            throw new Error('Debe seleccionar una imagen');
        }else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error('Debe seleccionar una imagen con una extensión válida');
            }else{
                return true;
            }
        }
    }),
    body('password').notEmpty().withMessage("Debe ingresar una contraseña").bail().isLength({min:6}).withMessage('El password debe tener al menos 6 caracteres').bail(),
    body('password2').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Las contraseñas no coinciden');
        } else {
            return value;
        }
    })
]

usersLoginValidations = [
    body('email').notEmpty().withMessage('Debe ingresar su email').bail().isEmail().withMessage('Email inválido'),
    body('password').notEmpty().withMessage("Debe ingresar una contraseña").bail().isLength({min:6}).withMessage('El password debe tener al menos 6 caracteres').bail(),
]

router.get("/login", guestMiddleware, usersController.login);
router.post("/login", usersLoginValidations, usersController.loginProcess);
router.get("/register", guestMiddleware, usersController.register);
router.post("/register", upload.single('avatar'), usersRegisterValidations, usersController.registerProcess);
router.get("/profile", authMiddleware, usersController.profile);
router.get("/logout", usersController.logout);
router.get("/edit/:id", authMiddleware, usersController.userEdit);
router.post("/edit/:id", upload.single('avatar'), usersRegisterValidations, usersController.userEditProcess);


module.exports = router;