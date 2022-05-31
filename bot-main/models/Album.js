const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/sequelize");

const Album = sequelize.define("Album", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  serverId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  assignTo: {
    type: Sequelize.STRING,
    defaultValue: false,
  },
  isDone: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  archive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  dateCreated: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },

  review:{
    type: Sequelize.STRING,
    allowNull: true,
  },

  hasReview:{
    type: Sequelize.BOOLEAN,
    defaultValue:false,
  }
}); 

Album.sync();

module.exports = Album;
