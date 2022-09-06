const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
//Requerir Sessión Cookies----------------
const session = require('express-session');
const cookies = require('cookie-parser');
//----------------------------------------

//Requerir el middleware que controla si el usuario está o no Logueado
const acceso = require('./middlewares/acceso');


//Debemos requerir nuestro Middleware de mantenimiento
//const mantenimiento = require('./middlewares/mantenimiento');

//Middlewares
//Para indicarle express la carpeta donde se encuentran los archivos estáticos
app.use(express.static(path.resolve(__dirname, '..', 'public')));
//Debemos indicar cual es el motor de plantillas que estamos usando EJS
app.set('view engine','ejs');
//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
//Middleware de aplicación el cual se encargue de controlar la posibilidad de usar otros métodos diferentes al GET y al POST, en nuestros formularios
app.use(methodOverride('_method'));

//Uso del Middleware de sessión
app.use(session({
    secret : 'TopSecret',
    resave : true,
    saveUninitialized : true
}));

//Aqui coloco el Middleware para activar lo referido a las cookies
app.use(cookies());

//Aquí requiero el Middleware de aplicación el cual controla si el usuario está o no Logueado
app.use(acceso);



//Llamo mi Middleware de aplicación - 
//app.use(mantenimiento);  //Le comente para ahora hacer un middleware de ruta

//Requerir las rutas
const webRoutes = require('./routes/web');

//Esta es la ruta para el manejo de usuarios con Base de Datos 
const usuariosRoutes = require('./routes/usuariosRoutes');
const productoRoutes = require('./routes/producto');
const adminRoutes = require('./routes/admin');

//Middleware de las rutas de mi proyecto
app.use(webRoutes);

//Lo uso para trabajar los usuarios con la Base de Datos
app.use(usuariosRoutes);
app.use(productoRoutes);
app.use(adminRoutes);

//Levantar servidor
app.listen(3001, 'localhost', ()=> console.log('Servidor corriendo en el puerto 3001'));
