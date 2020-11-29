const { Model } = require("sequelize");

class Post extends Model {
    async getPermissionsFor(user) {
        return (await this.getCircle()).getPermissionsFor(user);
    }

    async visibleTo(user) {
        return (await this.getCircle()).visibleTo(user);
    }
    async editableBy(user) {
        return (await this.getCircle()).editableBy(user);
    }
    async adminableBy(user) {
        return (await this.getCircle()).adminableBy(user);
    }
}

module.exports = (sequelize, DataTypes, options = {}) => {
    Post.init({
        uid: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        title: { type: DataTypes.STRING(255), allowNull: false },
        intro: { type: DataTypes.TEXT, allowNull: true },
        body: { type: DataTypes.TEXT, allowNull: true },
        content: { type: DataTypes.JSONB, allowNull: false },
        circle_id: {
            type: DataTypes.UUID,
            references: {
                model: 'Circle',
                key: 'uid'
            }
        },
        schema_id: {
            type: DataTypes.UUID,
            references: {
                model: 'JsonSchema',
                key: 'uid'
            }
        },
        creator_id: {
            type: DataTypes.UUID, 
            references: {
                model: 'User',
                key: 'uid'
            }
        }
    }, { sequelize, modelName: 'Post', ...options });

    return sequelize.models.Post;
}
