const path = require('path');
const {validationResult} = require("express-validator")
const db = require('../database/models')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  //Home de productos
  list: (req, res) => {
    db.Products.findAll(
        {include: ['categories']})
        .then((products)=>{
            db.Categories.findAll()
        .then((categories)=>{
          res.render(path.join(__dirname, "../views/products/productList"), {products, categories, toThousand})
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
/* const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../database/product.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsController = {
   
    list: function(req, res){
        res.render('products/productList', {products});
    },

    detail: function(req, res){
        const producto = products.find(p => p.id == req.params.id)
        const productosCategory = products.filter(p => p.category == producto.category)
        res.render('products/productDetail', {productosCategory, producto});
    },

    edit: function(req, res){
        const producto = products.find(p => p.id == req.params.id)
        res.render('products/productEdit', {producto});
    },

    productModify: (req, res) => {
        const producto = products.find(p => p.id == req.params.id)
        producto.name = req.body.name;
        producto.price = req.body.price;
        producto.description = req.body.description;
        producto.category = req.body.category;
        if(req.file){
          producto.imagen = req.file.filename;
        }
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/products');
      },
    
    create: function(req, res){
        res.render('products/productCreate');
    },

    store: function(req, res){
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
            return res.render(path.join(__dirname, "../views/products/productCreate"), {errors: resultValidation.mapped(), oldData: req.body});
        }
        if(req.file){
            if(products.length == 0){
                var producto = {
                    id: 1,
                    ...req.body,
                    image: req.file.filename
                  }
            }else{
                var producto = {
                    id: products[products.length -1].id + 1,
                    ...req.body,
                    image: req.file.filename
                }
            }
            products.push(producto);
            let productsJson = JSON.stringify(products);
            fs.writeFileSync(productsFilePath, productsJson);
            return res.render('products/productList', {products});
        }
    },

    storeEdited: function(req, res){
        const producto = products.find(p => p.id == req.params.id)
        producto.name = req.body.name;
        producto.price = req.body.price;
        producto.description = req.body.description;
        producto.category = req.body.category;
        if(req.file){
          producto.image = req.file.filename;
        }
        producto.offer = req.body.offer;
        producto.order = req.body.order;
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
        res.redirect('/products');
    },

    delete: (req, res) => {
        const producto = products.find(p => p.id == req.params.id);
        fs.unlinkSync(path.join(__dirname, `../../public/img/products/${producto.image}`));
        products.splice(products.indexOf(producto), 1);
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ''));
        res.redirect('/products');
    }

 };
 
 module.exports = productsController; */