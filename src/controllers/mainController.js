const path = require('path');
const {validationResult} = require("express-validator")
const db = require('../database/models')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  //Home de de la web
  index: (req, res) => {
    db.Products.findAll(
        {where: {order: 1}},
        {include: ['categories']})
        .then((products)=>{
            db.Categories.findAll()
        .then((categories)=>{
          res.render(path.join(__dirname, "../views/main/index"), {products, categories, toThousand})
        })
      })
	},

  //Nuestra Historia
  nuestraHistoria: (req, res) => {
/*     db.Categories.findAll()
      .then((categories)=>{
        res.render(path.join(__dirname, "../views/main/nuestraHistoria"), {categories})
      }) */
      res.render(path.join(__dirname, "../views/main/nuestraHistoria"))
    },

  tuHuellaDeCarbono: (req, res) => {
/*     db.Categories.findAll()
    .then((categories)=>{
      res.render(path.join(__dirname, "../views/main/tuHuellaDeCarbono"), {categories})
    }) */
    res.render(path.join(__dirname, "../views/main/tuHuellaDeCarbono"))
  },
  
  videoArtesanos: (req, res) => {
    /*     db.Categories.findAll()
        .then((categories)=>{
          res.render(path.join(__dirname, "../views/main/tuHuellaDeCarbono"), {categories})
        }) */
        res.render(path.join(__dirname, "../views/main/videoArtesanos"))
      }
  
}





/* const { log } = require('console');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/product.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const mainController = {

    index: function(req, res){
        res.render('main/index', {products})
    },

    nuestraHistoria: function(req, res){
        res.render('main/nuestraHistoria')
    }

 };
 
 module.exports = mainController; */