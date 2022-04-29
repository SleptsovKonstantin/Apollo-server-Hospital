module.exports = (sequelize, Sequelize) => {
  const UserNew = sequelize.define("usersNew", {
    login: {
      type: Sequelize.STRING,
      unique: true 
    },
    password: {
      type: Sequelize.STRING,
    },
  });

  return UserNew;
};
