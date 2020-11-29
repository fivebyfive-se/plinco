module.exports = (sequelize, DataTypes, options = {}) => {
    const CirclePost = sequelize.define('CirclePost', {
        circle_id: {
            type: DataTypes.UUID,
            references: {
                model: 'Circle',
                key: 'uid'
            }
        },
        post_id: {
            type: DataTypes.UUID,
            references: {
                model: 'Post',
                key: 'uid'
            }
        }
    }, options);
    return CirclePost;
}
