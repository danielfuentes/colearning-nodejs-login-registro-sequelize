const path = require('path');
const db = require('../database/models');
const Product = db.Product;
const Category = db.Category;
//Aqui hacen esto para lograr activalos operadores en sus querys (like - count - max) 
const Op = db.Sequelize.Op;

//Esto es otra forma de declarar los Modelos en nuestro controlador
//const Product = db.Product; 
//const Category = db.category;
//const TipoPago = db.TipoPago;
//Otra forma
//const {Product,Category,TipoPago} = require('../database/models');


module.exports = {
    index: (req,res) =>{
        Product.findAll({
            include : [{association : 'category'}]
        })   
        .then(relojes =>{
            //return res.send(relojes);
            res.render(path.resolve(__dirname, '..', 'views', 'admin', 'administrar'),{relojes});
        })
        .catch(error => res.send(error))
    },
    create: (req, res) =>{
        Category.findAll()
        .then(categorias =>{
            res.render(path.resolve(__dirname, '..','views','admin','create'), {categorias});
        } )
        
    },
    save: (req,res)=>{
        //req.body.image = req.file.filename;
        //return res.send(req.body);
        const _body = { 
        //return res.send(_body);
            name : req.body.nombre,
            description: req.body.descripcion,
            price: req.body.precio,
            discount: req.body.descuento,
            image : req.file.filename,
            categoryId : req.body.categoria
        }    
        //return res.send(_body);
        Product.create(_body)
        .then(reloj =>{
            res.redirect('/administrar');
        })
        .catch(error => res.send(error))
    },
    show: (req,res)=>{
        Product.findByPk(req.params.id, {
            include : [{association : 'category'}]
        })  
        .then(miReloj =>{
            res.render(path.resolve(__dirname, '..','views','admin','detail'), {miReloj})
        })  
        .catch(error => res.send(error))
    },
    destroy: (req,res) =>{
        Product.destroy({
            where: {
                id : req.params.id
            }
        })
        .then(()=>  res.redirect('/administrar'))
        .catch(error => res.send(error))
    },
    edit: (req,res) =>{
        const categorias = Category.findAll()
        const productos= Product.findByPk(req.params.id,{
            include : [{association : 'category'}]
        })
        Promise.all([productos,categorias])  
        .then( ([relojEditar, categorias]) =>{
            //return res.send(categorias);
            res.render(path.resolve(__dirname, '..','views','admin','edit'), {relojEditar, categorias})
        })  
        .catch(error => res.send(error))        
    },
    update: (req,res) =>{
        Product.update ({
                name:req.body.nombre,
                price: req.body.precio,
                description : req.body.descripcion,
                discount: req.body.descuento,
                image: req.file ? req.file.filename : req.body.oldImagen,
                categoryId : req.body.categoria
            }, {
                where: {
                    id:req.params.id
               }
            })
            .then(()=> res.redirect('/administrar'))
            .catch(error =>res.send(error))
    },
    search: ( req, res) =>{
        Product.findAll({
            include : [{association : 'category'}],
            where:{
                name: {[Op.like]: `%${req.query.search}%`}
            }
        })
        .then(resultado => { res.render(path.resolve(__dirname, '..', 'views', 'admin', 'administrar'),{relojes: resultado});})
        .catch(error => res.send(error))
    }


}