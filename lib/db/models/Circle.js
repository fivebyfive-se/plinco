module.exports = (sequelize, DataTypes, options = {}) => {
    const Circle = sequelize.define('Circle', {
        uid: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        name: { type: DataTypes.STRING(255), allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: true },
        circleType: {
            type: DataTypes.ENUM,
            values: [ 'arena', 'group' ]
        }
    }, options);
    return Circle;
}
