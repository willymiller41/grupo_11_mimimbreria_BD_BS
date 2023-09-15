const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { allowedNodeEnvironmentFlags } = require('process');

module.exports = {
    'list': async (req, res) =>{
        let response = {data: {}};
        try {
            const [products, categories] = await Promise.all([db.Products.findAll({include: [{association: 'categories'}]}), db.Categories.findAll({include: [{association: 'products'}]})])
            response.data.count = products.length;
            response.data.countByCategory = {};
            categories.forEach(category => {
                response.data.countByCategory[category.category] = category.products.length
            });
            response.data.countByOrder = 0;
            products.forEach(product => {
                response.data.countByOrder += product.order
            });
            response.data.products = products.map( (product) =>{
                return {
                    id: product.id,
                    product: product.product,
                    description: product.description,
                    price: product.price,
                    discount: product.discount,
                    stock: product.stock,
                    image: `/img/products/${product.image}`,
                    category: product.categories.category,
                    detail: `api/products/${product.id}`
                }
            })
            return res.json(response);
        } catch (e) {
            response.msg = "Hubo un error";
            return res.json(response);
        }
    },

    'detail': async (req, res) =>{
        let response = {};
        try {
            const product = await db.Products.findByPk(req.params.id, {include: [{association: 'categories'}]});
            response.meta = {
                status: 200,
                total: product.length,
                url: `api/products/${req.params.id}`
            }
            response.data = {
                id: product.id,
                product: product.product,
                description: product.description,
                price: product.price,
                discount: product.discount,
                stock: product.stock,
                image: `/img/products/${product.image}`,
                category: product.categories.category
            }
            return res.json(response);
        } catch (e) {
            response.msg = "Hubo un error";
            return res.json(response);
        }
    }
}