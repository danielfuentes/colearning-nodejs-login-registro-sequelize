module.exports = (sequelize, dataTypes) => {
  let alias = 'User';
  let cols = {
      id: {
          type: dataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      firstName: dataTypes.STRING,
      lastName: dataTypes.STRING,
      email: dataTypes.STRING,
      password: dataTypes.STRING,
      avatar: dataTypes.STRING,
      role: dataTypes.INTEGER
  };
  /*let config = {
      tableName: 'users',
      timestamps: false
  };*/
      
  
  const User = sequelize.define(alias, cols)
  return User;
}