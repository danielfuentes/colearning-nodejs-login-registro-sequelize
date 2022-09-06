const express = require('express');
const router = express.Router();
const path = require('path');

//Aquí requiero la Base  de Datos.   Esto lo hago para validar si el usuario está o no ya registrado
const db = require('../database/models/');

//Aquí creo hago la asociación al módelo correspondiente
const User = db.User;




//Requiero el paquete para comparar las contraseñas  que tengo hash (Pueden instalar el paquete bcrypt o bcryptjs)
const bcrypt = require('bcryptjs');
//Requiero fs ya que debo leer el archivo json de usuarios y verificar si el usuario que se está registrando existe o no
const fs = require('fs');
//Requiero Multer, ya que voy a permitir que el usuario que se registre suba su avatar
const multer = require('multer');

//Requiero el paquete expres-validator
const {
    check,
    validationResult,
    body
} = require('express-validator');

//Requerir el modulo de los controladores
const usuariosController = require(path.resolve(__dirname, '../controllers/usuariosController'));



//Aquí le incoporé lo referido a la carga de la imagen
//Aquí dispongo la información del storage para tratamiento de guardado imagenes
//https://www.npmjs.com/package/multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/images/usuarios'));    //Aquí deben indicar donde van a guardar la imagen
    },
    filename: function (req, file, cb) {
      cb(null, 'foto' + '-' + Date.now()+ path.extname(file.originalname));      // Funciona como el UNIQID() --- de PHP
    }
  })
   
const upload= multer({ storage })


// Métodos que pueden utilizar en sus controladores: index - show - edit - delete - create - update - login - ingresar - registro

router.get('/login',usuariosController.login);
//Solo ejecuto las validaciones básicas y todas las demas las voy a verificar desde el controlador
router.post('/ingresar', [
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
], usuariosController.ingresar);


router.get('/registro', usuariosController.registro);

User.findAll()
    .then((users) => {

    router.post('/registro', upload.single('avatar'),[
      //Aquí incoporé otras validaciones, para que las tengan de guía para sus proyectos  
      check('first_name').isLength({
            min: 1
          }).withMessage('El campo nombre no puede estar vacío'),
      check('last_name').isLength({min: 1   
          }).withMessage('El campo apellido no puede estar vacío'),
      check('email').isEmail().withMessage('Agregar un email válido'),

      //Aquí valido el Password   
      check('password').isLength({min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caractéres al menos una letra y un número'),
      //Aquí valido si eusuario existe o no en la tabla de usuarios Por el campo email)
      body('email').custom(function (value) {
        let contador = 0;
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == value) {
                contador++;
            }
        }
        if (contador > 0) {
            return false;   // Si retorno falso no aparece el mensaje de error
        } else {
            return true;    //Si retorno true, aparece el mensaje de error
        }
      }).withMessage('Usuario ya se encuentra registrado'),

    //Aquí valido la confimación del password dispuesto por el usuario
    check('confirm_password').isLength({min: 6 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 6 caractéres'),

    //Aquí valido si las contraseñas son iguales o no
    //El ( value ) viene a ser el valor que viaje en el name del del input del campo 
    //El valor { req } corresponde a lo que viene desde el formulario

    body('confirm_password').custom((value, {req}) =>{
            if(req.body.password == value ){
                return true    // Si yo retorno un true  no se muestra el error     
            }else{
                return false   // Si retorno un false si se muestra el error
            }    
    }).withMessage('Las contraseñas deben ser iguales'),

    //Aquí obligo a que el usuario seleccione su avatar
    body('avatar').custom(function (value, { req }) {
      let ext
      if(req.file != undefined ){
          return true
      }else{
          ext = ""+path.extname(req.files[0].filename).toLowerCase();
      }
      //console.log(ext);
      if (
          ext == ".jpg" ||
          ext == ".jpeg" ||
          ext == ".png" ||
          ext == ".gif"){
              return true;
          }
          return false;
    }).withMessage('Solo debe seleccionar archivos  con extensión JPG, JPEG, PNG o GIF')
    ], usuariosController.create)
  })
  .catch((errors) => {
      console.log(errors);
})
    
//Esta es la ruta que se activa al momento que el usuario desea salir de la página
router.get('/logout', usuariosController.logout);

module.exports = router;