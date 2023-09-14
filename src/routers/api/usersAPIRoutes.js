const express = require('express');
const router = express.Router();
const usersAPIController = require('../../controllers/api/usersAPIController');

//Rutas
//Listado de usuarios
router.get('/list', usersAPIController.list);
//Detalle de un usuario
router.get('/:id', usersAPIController.detail);
//Agregar un producto
//router.post('/create', productsAPIController.create);
//Modificar un producto
//router.put('/update/:id', productsAPIController.update);
//Eliminar un producto
//router.delete('/delete/:id', productsAPIController.destroy);

module.exports = router;