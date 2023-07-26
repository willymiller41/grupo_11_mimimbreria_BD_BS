const path = require('path');
const {validationResult} = require("express-validator")
const db = require('../database/models')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  //Home de productos
  productslist: (req, res) => {
    db.Products.findAll(
        {include: ['categories']})
        .then((products)=>{
            db.Categories.findAll()
        .then((categories)=>{
          res.render(path.join(__dirname, "../views/admin/adminProducts"), {products, categories, toThousand})
        })
      })
	},

  userslist: (req, res) => {
    db.Users.findAll({include: ['roles']})
    .then((users)=>{
      db.Roles.findAll()
      .then((roles)=>{
        res.render(path.join(__dirname, "../views/admin/adminUsers"), {users, roles})
      })
    })
  },

  listCategory: (req, res) => {
    db.Products.findAll(
        {include: ['categories'],
        where: {category_id: req.params.id}})
        .then((products)=>{
            db.Categories.findAll()
        .then((categories)=>{
          res.render(path.join(__dirname, "../views/products/productList"), {products, categories, toThousand})
        })
      })
	},

  //Detalle de producto
  productDetail: (req, res) => {
    db.Products.findByPk(req.params.id, {include: ['categories']})
    .then((product)=>{
      db.Categories.findAll()
      .then((categories)=>{
        db.Products.findAll({include: ['categories']})
        .then((products) =>{
          res.render(path.join(__dirname, "../views/products/productDetail"), {products, product, categories, toThousand})
        })
      })
    })
  },
  
  //Agregar producto
  productCreate: (req, res) => {
    db.Categories.findAll()
      .then((categories)=>{
        res.render(path.join(__dirname, "../views/products/productCreate"), {categories})
      })
  },

  //Guardar producto
  productStore: (req, res) => {
    let errors = validationResult(req);
    if (errors.errors.length > 0) {
      db.Categories.findAll()
        .then((categories)=>{
          res.render(path.join(__dirname, "../views/products/productCreate"), {categories, errors: errors.mapped(), oldData: req.body})
        })
    }else{
      db.Products.create({
        product: req.body.name,
        description: req.body.description,
        price: req.body.price,
        discount: req.body.discount,
        stock: req.body.stock,
        order: req.body.order,
        image: req.file.filename,
        category_id: req.body.category
      })
        .then((producto)=>{
          res.redirect('/products/list')
        })
      }
  },

  //Editar producto
  productEdit: (req, res) => {
    db.Products.findByPk(req.params.id, {include: ['categories']})
      .then((product)=>{
        db.Categories.findAll()
          .then((categories)=>{
            res.render(path.join(__dirname, "../views/products/productEdit"), {product, categories})
          })
      })
  },

  //Guardar producto editado
  productUpdate: (req, res) => {
    db.Products.update({
      name: req.body.name,
      price: req.body.price,
      category_id: req.body.category,
      description: req.body.description,
      image: req.file,
      stock: req.body.stock
    },{
      where: {
        id: req.params.id
      }
    })
      .then((producto)=>{
        res.redirect('/products/list')
      })
  },

  //Eliminar producto
  productDelete: (req, res) => {
    db.Products.destroy({
      where: {
        id: req.params.id
      }
    })
      .then((producto)=>{
        res.redirect('/products/list')
      })
  },

  //Buscar producto
  productSearch: (req, res) => {
    let search = req.body.search;
    if(search != ""){
      db.Products.findAll({
        where: {
          name: {
            [db.Sequelize.Op.like]: '%' + search + '%'
          }
        }
      })
        .then((producto)=>{
          console.log(producto);
          res.render(path.join(__dirname, "../views/products/productsSearch"), {producto, toThousand})
        })
    }else{
      res.redirect("/");
    }
  },
        
  //Carrito de compras
  shoppingCart: (req, res) => {
    res.render(path.join(__dirname, "../views/products/shoppingCart"))
  }
  
}