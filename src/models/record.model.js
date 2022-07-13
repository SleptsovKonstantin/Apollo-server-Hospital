module.exports = (sequelize, Sequelize) => {
  const Record = sequelize.define("records", {
    name: {
      type: Sequelize.STRING, 
    },
    doctor: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.STRING,
    },    
    complaint: {
      type: Sequelize.STRING,
    },
    user: {
      type: Sequelize.STRING,
    }
  });

  return Record;
};