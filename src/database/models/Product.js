module.exports = (sequelize,DataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        price : DataTypes.DECIMAL,
        discount: DataTypes.INTEGER,
        image: DataTypes.STRING,
        categoryId: DataTypes.INTEGER
    }
    /*
    let config ={
        tableName: 'products',
        timestamps: true,
        underscore: true
    }
    */
    const Product = sequelize.define(alias, cols);
    Product.associate = function(models){
        Product.belongsTo(models.Category, {
            as : 'category',
            foreignKey : 'categoryId'
        })
    }
    return Product;
}