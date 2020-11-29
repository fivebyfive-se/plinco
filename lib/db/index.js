const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);
const models = require('./models')(sequelize, DataTypes, { paranoid: true });

module.exports = async () => {
   //#region N:M
    models.User.belongsToMany(models.Circle, { through: models.CircleUser });
    models.Circle.belongsToMany(models.User, { through: models.CircleUser });
    
    // models.Post.belongsToMany(models.Circle, { through: models.CirclePost });
    // models.Circle.belongsToMany(models.Post, { through: models.CirclePost });
    //#endregion

    await sequelize.sync({ force: true });
    
    return { sequelize, models };
};
