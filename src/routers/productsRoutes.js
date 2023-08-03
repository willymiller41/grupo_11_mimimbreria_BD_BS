const express = require("express");
const router = express.Router();
const productsController = require('../controllers/productsController');
const multer = require('multer');
const path = require("path");
const { body } = require('express-validator');
const editorMiddleware = require('../middlewares/editorMiddleware');
const authMiddleware = require('../middlewares/authMiddleware')

//Seteo de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, path.join(__dirname, "../../public/img/products"))
    },

    filename: (req, file, cb) =>{
        const newFileName = 'producto_' + Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const upload = multer({ storage });

validations = [
    body('name').notEmpty().withMessage('Debe ingresar el nombre del producto'),
    body('description').notEmpty().withMessage('Debe completar la descripción del producto'),
    body('price').notEmpty().withMessage('Debe indicar el precio'),
    body('category').notEmpty().withMessage('Debe indicar una categoría'),
    body('stock').notEmpty().withMessage('Debe indicar el stock'),
    body('image').custom((value, { req }) => {
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
    })
]

router.get("/list", productsController.list);
router.get("/list/:id", productsController.listCategory);
router.get("/create/", authMiddleware, editorMiddleware, productsController.productCreate);
router.post("/create/", authMiddleware, editorMiddleware, upload.single('image'), validations, productsController.productStore);
router.get("/detail/:id/", productsController.productDetail);
router.get("/edit/:id", authMiddleware, editorMiddleware, productsController.productEdit);
router.post('/edit/:id', upload.single('image'), productsController.productUpdate);
router.get('/delete/:id', authMiddleware, editorMiddleware, productsController.productDelete);
router.post('/search', productsController.productSearch);

module.exports = router;


