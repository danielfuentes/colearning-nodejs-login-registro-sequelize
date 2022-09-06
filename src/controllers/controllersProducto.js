const path = require('path');
const db = require('../database/models');
const Product = db.Product;

module.exports = {
    index: (req,res) =>{
        Product.findAll()
        .then(relojes =>{
            //return res.send(relojes);
            return res.render(path.resolve(__dirname, '../views/productos/productos'), {relojes})
        })
        .catch(error => res.send(error))        
    }

}