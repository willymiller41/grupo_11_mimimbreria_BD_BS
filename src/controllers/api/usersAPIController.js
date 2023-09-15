const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
// const moment = require('moment');

module.exports = {
    'list': async (req, res) =>{
        let response = {data: {}};
        try {
            const users = await db.Users.findAll();

            response.data.count = users.length;
            response.data.users = users.map( (user) =>{
                return {
                    id: user.id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    avatar: `/img/avatars/${user.avatar}`,
                    detail: `api/users/${user.id}`
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
            const user = await db.Users.findByPk(req.params.id, {attributes: {exclude: ['password', 'role_id']}});
            response.meta = {
                status: 200,
                total: user.length,
                url: `api/users/${req.params.id}`
            }
            response.data = user
            response.data.avatar = `/img/avatars/${user.avatar}`
            return res.json(response);
        } catch (e) {
            response.msg = "Hubo un error";
            return res.json(response);
        }
    }

}