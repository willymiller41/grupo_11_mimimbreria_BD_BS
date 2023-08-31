const express = require('express');
const app = express();
const path = require('path');
const mainRoutes = require('./routers/mainRoutes');
const productsRoutes = require('./routers/productsRoutes');
const usersRoutes = require('./routers/usersRoutes');
const adminRoutes = require('./routers/adminRoutes');
const cartRoutes = require('./routers/cartRoutes');
const session = require('express-session');
const cookie = require('cookie-parser');
const methodOverride = require('method-override');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

const apiProductsRouter = require('./routers/api/productsAPIRoutes')
const apiUsersRouter = require('./routers/api/usersAPIRoutes')

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
app.use(cookie());
app.use(userLoggedMiddleware);

app.set('view engine', 'ejs');
app.set('views', './src/views');
// app.use(express.static("public"));
app.use(express.static(path.resolve(__dirname, '../public')));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(methodOverride('_method'));

app.get('/', mainRoutes);
app.get('/nuestraHistoria', mainRoutes);
app.get('/tuHuellaDeCarbono', mainRoutes);
app.get('/videoArtesanos', mainRoutes);
app.use("/users", usersRoutes);
app.use('/products', productsRoutes);
app.use('/admin', adminRoutes);
app.use('/carts', cartRoutes);

//APIs
app.use('/api/products',apiProductsRouter);
app.use('/api/users',apiUsersRouter);

app.use((req, res, next) => {
  res.status(404).render("partials/error404");
})

app.listen('3000', ()=>{
    console.log('Servidor funcionando en el puerto 3000');
})