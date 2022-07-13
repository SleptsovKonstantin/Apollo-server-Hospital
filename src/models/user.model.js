module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    login: {
      type: Sequelize.STRING,
      unique: true 
    },
    password: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
