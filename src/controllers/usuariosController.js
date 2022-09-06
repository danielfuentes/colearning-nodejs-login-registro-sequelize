const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const {
  check,
  validationResult,
  body
} = require('express-validator');

//Aquí requiero la Base  de Datos.
const db = require('../database/models/');

//Aquí hago la asociación al módelo correspondiente
const User = db.User;



const usuariosController = {

    login: function(req,res){
        res.render(path.resolve(__dirname, '../views/usuarios/login'));
    },
    ingresar: (req, res) => {
      
      db.User.findAll()
      .then((users) => {		
        //Aquí guardo los errores que vienen desde la ruta, valiendome del validationResult
        let errors = validationResult(req);
        
        let usuarioLogueado = [];
        
        if(req.body.email != '' && req.body.password != ''){
          usuarioLogueado = users.filter(function (user) {
            return user.email === req.body.email  
          });
          //Aquí verifico si la clave que está colocando es la misma que está hasheada en la Base de datos - El compareSync retorna un true ó un false
          if(bcrypt.compareSync(req.body.password,usuarioLogueado[0].password)=== false){
            usuarioLogueado = [];
          }
        }
        //console.log(usuarioLogueado);
        //return res.send(usuarioLogueado);
        //Aquí determino si el usuario fue encontrado ó no en la Base de Datos
        if (usuarioLogueado.length === 0) {
          return res.render(path.resolve(__dirname, '../views/usuarios/login'),{ errors: [{ msg: "Credenciales invalidas" }] });
        } else {
          //Aquí guardo en SESSION al usuario logueado
          req.session.usuario = usuarioLogueado[0];
        }
        //Aquí verifico si el usuario le dio click en el check box para recordar al usuario 
        if(req.body.recordarme){
          res.cookie('email',usuarioLogueado[0].email,{maxAge: 1000 * 60 * 60 * 24})
        }
        return res.redirect('/');   //Aquí ustedes mandan al usuario para donde quieran (Perfil- home)

      })
    },

    registro: function(req,res){
      res.render(path.resolve(__dirname, '../views/usuarios/registro'));
    },
    //Este es el método donde guardo al usuario que se está registrando
    create: (req, res) => {
      //En esta variable guardo lo enviado desde la ruta, con respecto a los errores encontrados en la carga de los datos por parte del usuario
      let errors = validationResult(req);
      //return res.send(errors);
      //Aquí determino si hay ó no errores encontrados
      if(!errors.isEmpty()) {
        return res.render(path.resolve(__dirname, '../views/usuarios/registro'), {
          errors: errors.errors,  old: req.body
        });
      } 
      //Si todo marcha sobre ruedas, entonces 
      // Generamos el usuario a partir de los datos del request
      // - Ignoramos repassword, ya que no nos interesa guardarla
      // - Hasheamos la contraseña

      let user = {
        firstName:req.body.first_name,
        lastName: req.body.last_name,
        email:req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        provincia: Number(req.body.provincia),
        avatar: req.file ? req.file.filename : '',
        role: 1
      };

      User
      .create(user)
      .then((storedUser) => {
          return  res.redirect('/login');
      })
      .catch(error => console.log(error));
    },

    logout: (req,res) =>{
      req.session.destroy();
      res.cookie('email',null,{maxAge: -1});
      res.redirect('/')
    }

}
module.exports = usuariosController;
