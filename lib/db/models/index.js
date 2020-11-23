const fs = require('fs');

module.exports = (sequelize, DataTypes, options = {}) => {
    const models = [];
    fs.readdirSync(__dirname + '/').forEach((file) => {
        if (file.match(/\.js$/) !== null && file !== 'index.js') {
            models.push(require('./' + file)(sequelize, DataTypes, options));
        }
    });
    return models;
}
