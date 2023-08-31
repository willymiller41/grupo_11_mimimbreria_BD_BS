const db = require('../database/models')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const path = require("path");

let cartController = {

    cart: (req, res) => {
        db.Products.findAll(
            {include: ['categories']})
            .then((products)=>{
                db.Categories.findAll()
            .then((categories)=>{
              res.render(path.join(__dirname, "../views/carts/cart"), {products, categories, toThousand})
            })
          })
        }
    
 };
 
 module.exports = cartController;