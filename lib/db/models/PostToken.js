module.exports = (sequelize, DataTypes, options = {}) => {
    const PostToken = sequelize.define('PostToken', {
        uid: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        token: { type: DataTypes.UUID, allowNull: false, defaultValue: DataTypes.UUIDV4 },

        creator_id: {
            type: DataTypes.UUID, 
            references: {
                model: 'User',
                key: 'uid'
            }
        },
        circle_id: { // Which circle the posted message should be posted to
            type: DataTypes.UUID,
            references: {
                model: 'Circle',
                key: 'uid'
            }
        }
    }, options);
    return PostToken;
}
