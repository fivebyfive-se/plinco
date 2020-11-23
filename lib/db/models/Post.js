module.exports = (sequelize, DataTypes, options = {}) => {
    const Post = sequelize.define('Post', {
        title: { type: DataTypes.STRING(255), allowNull: false },
        intro: { type: DataTypes.TEXT, allowNull: true },
        body: { type: DataTypes.TEXT, allowNull: true },
        content: { type: DataTypes.JSONB, allowNull: false }
    }, options);
    return Post;
}
