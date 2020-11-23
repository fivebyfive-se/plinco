const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);
const models = require('./models')(sequelize, DataTypes, { paranoid: true });


module.exports = { sequelize, models };
