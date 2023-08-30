const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
// const moment = require('moment');

module.exports = {
    'list': (req, res) => {
        db.Users.findAll({include: ['roles']})
        .then((users)=>{
            let response = {
                meta: {
                    status : 200,
                    total: users.length,
                    url: 'api/users/list'
                },
                data: users
            }
            res.json(response);
        })
    },
    
    'detail': (req, res) => {
        db.Products.findByPk(req.params.id, { include : ['categories'] })
        .then(product => {
            let respuesta = {
                meta: {
                    status: 200,
                    total: product.length,
                    url: 'api/:id'
                },
                data: product
            }
            res.json(respuesta);
        });
    },
}