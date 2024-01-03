const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const fs = require('fs');

const db = require('../database/models')

module.exports = {
  login: (req, res) => {
    res.render(path.join(__dirname, "../views/users/login"))
  },

  register: (req, res) => {
    res.render(path.join(__dirname, "../views/users/register"))
  },

  registerProcess: (req, res) => {
    db.Users.findAll(
      { where: { email: req.body.email } }
    ).then((users) => {
       if(users.length > 0){
        try {
          let imageFile = req.file.filename
          //console.log(imageFile)
          fs.unlinkSync(path.join(__dirname, "../../public/img/avatars/")+ imageFile)
          //console.log('Archivo eliminado')
        } catch(err) {
          console.error('Error eliminando archivo', err)
        }
        return res.render(path.join(__dirname, "../views/users/register"), {errors: {email:{msg:"El email ya está registrado"}}, oldData: req.body});
        }else{  
          let errors = validationResult(req);
            if (errors.errors.length > 0) {
              res.render(path.join(__dirname, "../views/users/register"), {errors: errors.mapped(), oldData: req.body})
            }else{
              if(req.file){
                avatar_image = req.file.filename
              }else{
                avatar_image = 'img_profile_default.jpg'
              }
              db.Users.create({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                code: req.body.code,
                // avatar: req.file.filename,
                // Asigno una imagen por defecto
                avatar: avatar_image,
                password: bcrypt.hashSync(req.body.password, 10),
                role_id: 3,
              })
                .then((user)=>{
                  return res.redirect('/users/login')
                }
              )
            }
        }
      }
      )
  },
  
  loginProcess: (req, res) => {
    db.Users.findAll()
    .then((users) => {		
      let errors = validationResult(req);
      let usuarioLogueado = [];
      if(req.body.email != '' && req.body.password != ''){
        usuarioLogueado = users.filter(function (user) {
          if (user.email == req.body.email) {
            return user;
          }
        });

        if (usuarioLogueado[0] == undefined) {
          return res.render(path.join(__dirname, "../views/users/login"), {errors: {email:{msg:"El email no está registrado"}}});
        }else{

          //Aquí verifico si la clave que está colocando es la misma que está hasheada en la Base de datos - El compareSync retorna un true ó un false
          if(bcrypt.compareSync(req.body.password,usuarioLogueado[0].password) === false){
            usuarioLogueado = [];
            return res.render(path.join(__dirname, "../views/users/login"), {errors: {email:{msg:"Credenciales inválidas"}}});
          }
        }
      }
      //Aquí determino si el usuario fue encontrado ó no en la Base de Datos
      if (usuarioLogueado.length === 0) {
        return res.render(path.resolve(__dirname, '../views/users/login'),{ errors: errors.mapped(), oldData: req.body });
      } else {
        //Aquí guardo en SESSION al usuario logueado
        req.session.userLogged = usuarioLogueado[0];
      }
      //Aquí verifico si el usuario le dio click en el check box para recordar al usuario 
      if(req.body.recordarPassword){
        res.cookie('email',usuarioLogueado[0].email,{maxAge: 1000 * 60 * 60 * 24})
      }
      if(usuarioLogueado[0].role_id === 1){
        return res.redirect('/users/profile');
      }
      return res.redirect('/products/list');
    })
  },

  profile: (req, res) => {
    res.render(path.join(__dirname, "../views/users/profile"), {user: req.session.userLogged});
  },

  logout: function(req, res){
    req.session.destroy();
    res.clearCookie('userEmail');
    res.redirect('/');
  },

  userEdit: (req, res) => {
    db.Users.findByPk(req.params.id, {include: ['roles']})
    .then((user)=>{
      res.render(path.join(__dirname, "../views/users/userEdit"), {user})
    })
  },
  
  userEditProcess: (req, res) => {
    if(req.file){
      db.Users.update({
        name: req.body.name,
        surname: req.body.price,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        code: req.body.code,
        avatar: req.file.filename,
      },{
        where: {
          id: req.params.id
        }
      })
      .then(()=>{
        db.Users.findAll()
        .then((users) => {		
          let usuarioLogueado = [];
          usuarioLogueado = users.filter(function (user) {
            if (user.id == req.params.id) {
              return user;
            }
          })
          req.session.userLogged = usuarioLogueado[0];
          return res.redirect('/users/profile')
        })
      })
    }else{
      db.Users.update({
        name: req.body.name,
        surname: req.body.price,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        code: req.body.code,
      },{
        where: {
          id: req.params.id
        }
      })
      .then(()=>{
        db.Users.findAll()
        .then((users) => {		
          let usuarioLogueado = [];
          usuarioLogueado = users.filter(function (user) {
            if (user.id == req.params.id) {
              return user;
            }
          })
          req.session.userLogged = usuarioLogueado[0];
          return res.redirect('/users/profile')
        })
      })
    }
  }  
}