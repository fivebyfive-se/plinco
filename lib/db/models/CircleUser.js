const { Model } = require("sequelize");
const Permissions = require('../enums/permissions');

class CircleUser extends Model { }

module.exports = (sequelize, DataTypes, options = {}) => {
    CircleUser.init({
        permissions: {
            type: DataTypes.ENUM,
            values: [ Permissions.NONE, Permissions.READ, Permissions.EDIT, Permissions.ADMIN ]
        },
        circle_id: {
            type: DataTypes.UUID,
            references: {
                model: 'Circle',
                key: 'uid'
            }
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: 'User',
                key: 'uid'
            }
        }
    }, { sequelize, modelName: 'CircleUser', ...options });

    return sequelize.models.CircleUser;
}
