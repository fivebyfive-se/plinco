const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);
const models = require('./models')(sequelize, DataTypes, { paranoid: true });

module.exports = async () => {
   //#region N:M
    models.User.belongsToMany(models.Circle, { through: 'UserCircles' });
    models.Circle.belongsToMany(models.User, { through: 'UserCircles' });
    
    models.Post.belongsToMany(models.Circle, { through: 'PostCircles' });
    models.Circle.belongsToMany(models.Post, { through: 'PostCircles' });
    //#endregion

    await sequelize.sync();
    
    return { sequelize, models };
};
