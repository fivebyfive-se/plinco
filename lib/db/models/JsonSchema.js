module.exports = (sequelize, DataTypes, options = {}) => {
    const JsonSchema = sequelize.define('JsonSchema', {
        name: { type: DataTypes.STRING(64), allowNull: false },
        content: { type: DataTypes.JSONB, allowNull: false }
    }, options);
    return JsonSchema;
}
