module.exports = (sequelize, DataTypes, options = {}) => {
    const Post = sequelize.define('Post', {
        uid: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        title: { type: DataTypes.STRING(255), allowNull: false },
        intro: { type: DataTypes.TEXT, allowNull: true },
        body: { type: DataTypes.TEXT, allowNull: true },
        content: { type: DataTypes.JSONB, allowNull: false },
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
    }, options);
    return Post;
}
