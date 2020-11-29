const { Model } = require('sequelize');
const Permissions = require('../enums/permissions');
const Visibility = require('../enums/visibility');

class Circle extends Model {
    async getPermissionsFor(user) {
        const circleUser = user 
            ? (await this.sequelize.models.CircleUser.findOne({ where: { circle_id: this.circle_id, user_id: user.user_id }}))
            : null;
        return circleUser ? circleUser.permissions : Permissions.NONE;
    }

    async visibleTo(user) {
        if (this.getDataValue('visibility') === Visibility.ALL) {
            return true;
        }
        return (await this.getPermissionsFor(user)) !== Permissions.NONE; 
    }
    async editableBy(user) {
        const perms = await this.getPermissionsFor(user);
        return perms === Permissions.EDIT || perms === Permissions.ADMIN;
    }
    async adminableBy(user) {
        return (await this.getPermissionsFor(user)) === Permissions.ADMIN;
    }
}

module.exports = (sequelize, DataTypes, options = {}) => {
    Circle.init({
        uid: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        name: { type: DataTypes.STRING(255), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        content: { type: DataTypes.JSONB, allowNull: false },
        visibility: {
            type: DataTypes.ENUM,
            values: [ Visibility.ALL, Visibility.GROUP ]
        },
        schema_id: {
            type: DataTypes.UUID,
            references: {
                model: 'JsonSchema',
                key: 'uid'
            }
        },
        parent_id: { // NULL is root
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'Circle',
                key: 'uid'
            }
        }
    }, { sequelize, modelName: 'Circle', ...options});
    
    return sequelize.models.Circle;
}
