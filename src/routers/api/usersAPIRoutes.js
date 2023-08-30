const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController');

//Rutas
//Listado de usuariios
router.get('/list', usersAPIController.list);
//Detalle de un producto
//router.get('/:id', productsAPIController.detail);
//Agregar un producto
//router.post('/create', productsAPIController.create);
//Modificar un producto
//router.put('/update/:id', productsAPIController.update);
//Eliminar un producto
//router.delete('/delete/:id', productsAPIController.destroy);

module.exports = router;