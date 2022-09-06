const path = require('path');
const fs = require('fs');
const db = require('../database/models');
const Product = db.Product;
module.exports = {
    index: function(req,res){
        Product.findAll()
            .then(relojes => res.render(path.resolve(__dirname, '..', 'views','web','index'),{relojes}))
            .catch(err => res.send(err))
    },
    nosotros: function(req,res){
        res.sendFile(path.resolve(__dirname, '..', 'views','web','nosotros.html'))
    },
    contacto: function(req,res){
        res.sendFile(path.resolve(__dirname, '..', 'views','web','contacto.html'))
    }}