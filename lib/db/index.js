const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);
const models = require('./models')(sequelize, DataTypes, { paranoid: true });
const { Post, JsonSchema } = models;
JsonSchema.hasMany(Post);
Post.hasOne(JsonSchema);


module.exports = models;
