module.exports = (sequelize, DataTypes, options = {}) => {
    const JsonSchema = sequelize.define('JsonSchema', {
        uid: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        name: { type: DataTypes.STRING(64), allowNull: false },
        content: { type: DataTypes.JSONB, allowNull: false }
    }, options);
    return JsonSchema;
}
