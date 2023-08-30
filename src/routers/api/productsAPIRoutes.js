const express = require('express');
const router = express.Router();
const productsAPIController = require('../../controllers/api/productsAPIController');

//Rutas
//Listado de productos
router.get('/list', productsAPIController.list);
//Detalle de un producto
router.get('/:id', productsAPIController.detail);
//Agregar un producto
//router.post('/create', productsAPIController.create);
//Modificar un producto
//router.put('/update/:id', productsAPIController.update);
//Eliminar un producto
//router.delete('/delete/:id', productsAPIController.destroy);

module.exports = router;