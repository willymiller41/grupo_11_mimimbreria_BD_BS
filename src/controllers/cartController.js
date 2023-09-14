const db = require('../database/models')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const path = require("path");

let cartController = {

  cart: (req, res) => {
    res.render(path.join(__dirname, "../views/carts/cart"), {user: req.session.userLogged});
  }
    
 };
 
 module.exports = cartController;