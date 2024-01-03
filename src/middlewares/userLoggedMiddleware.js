const {Users} = require('../database/models');

module.exports = (req,res,next) =>{
    //Variable locals (super global - vive en las vistas )
    res.locals.isLogged = false;
    
    if(req.session.userLogged){
        res.locals.isLogged = req.session.userLogged;
        res.locals.userLogged = req.session.userLogged;
        return next();
    }else if(req.cookies.email){
        Users.findOne({
            where: {
               email: req.cookies.email
            }
        })
        .then(user =>{
            req.session.userLogged = user;
            res.locals.isLogged = user;
            return next();
    
        })
                
    }else{
        return next();
    }
}