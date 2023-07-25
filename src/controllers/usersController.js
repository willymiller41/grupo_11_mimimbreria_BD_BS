const path = require('path');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

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
        return res.render(path.join(__dirname, "../views/users/register"), {errors: {email:{msg:"El email ya está registrado"}}, oldData: req.body});
        }else{  
          let errors = validationResult(req);
            if (errors.errors.length > 0) {
              res.render(path.join(__dirname, "../views/users/register"), {errors: errors.mapped(), oldData: req.body})
            }else{
              db.Users.create({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                code: req.body.code,
                avatar: req.file.filename,
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
            return res.render(path.join(__dirname, "../views/users/login"), {errors: {email:{msg:"credenciales inválidas"}}});
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
  }
}

/* let usersController = {
   
    login: function(req, res){
      return res.render('users/login');
    },

    processLogin: function(req,res){
      const resultValidation = validationResult(req);
      if(resultValidation.errors.length > 0){
        return res.render(path.join(__dirname, "../views/users/login"), {errors: resultValidation.mapped(), oldData: req.body});
      }
      const userToLogin = users.find(user => user.email === req.body.email);

      if(userToLogin){
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, userToLogin.password);
        if(isPasswordCorrect){
          req.session.userLogged = userToLogin;
          if(req.body.remember){
            res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60) * 60});
          }
          res.redirect('/profile');
        }else{
          return res.render(path.join(__dirname, "../views/users/login"), {errors: {password:{msg:"La contraseña es incorrecta"}}, oldData: req.body});
        }
      }else{
        return res.render(path.join(__dirname, "../views/users/login"), {errors: {email:{msg:"El email no está registrado"}}, oldData: req.body});
      }
    },
    
    register: function(req, res){
      res.render('users/register');
    },

    processRegister: function(req,res){
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
          return res.render(path.join(__dirname, "../views/users/register"), {errors: resultValidation.mapped(), oldData: req.body});
        }
        const userInDb = users.find(user => user.email === req.body.email);
        if(userInDb){
          return res.render(path.join(__dirname, "../views/users/register"), {errors: {email:{msg:"El email ya está registrado"}}, oldData: req.body});
        }
        console.log(users.length)
        const userToCreate = {
          id: users[users.length -1].id + 1,
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          code: req.body.code,
          password: bcrypt.hashSync(req.body.password, 10),
          avatar: req.file.filename,
          role: "user"
        };
        users.push(userToCreate);
        let usersJson = JSON.stringify(users);
        fs.writeFileSync(usersFilePath, usersJson);
    
        return res.redirect("/login");
    },

    profile: function(req, res){
      res.render('users/profile', {
        user: req.session.userLogged
      })
    },

    logout: function(req, res){
      req.session.destroy();
      res.clearCookie('userEmail');
      res.redirect('/');
    }
 };
 
 module.exports = usersController; */