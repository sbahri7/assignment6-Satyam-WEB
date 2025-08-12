const { Sequelize } = require("sequelize");
const mongoose = require('mongoose');

// Check if environment variable exists
if (!process.env.PG_CONNECTION_STRING) {
  throw new Error('PG_CONNECTION_STRING environment variable is not defined');
}

// set up sequelize to point to our postgres database
const sequelize = new Sequelize(process.env.PG_CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const Sector = sequelize.define('Sector', {
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true,
    autoIncrement: true,
  },
  sector_name: {
    type: Sequelize.STRING, 
    allowNull: false,
  },
},
  {
  timestamps: false,
});

const Project = sequelize.define('Project', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  
  feature_img_url: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  summary_short: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  intro_short: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  impact: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  original_source_url: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, 
{
  timestamps: false
});

Project.belongsTo(Sector, { foreignKey: 'sector_id' });

module.exports = { sequelize, Sector, Project };
