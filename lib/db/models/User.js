const { Model } = require('sequelize');
const { randomBytes, hash } = require('tweetnacl');
const { decodeUTF8, encodeUTF8 } = require('tweetnacl-util');

const hashText = (...text) => encodeUTF8(hash(text.map(decodeUTF8).join('')));

const hashPassword = (password) => {
    const salt = encodeUTF8(randomBytes(60));
    const hashedPassword = hashText(password, salt);
    return { salt, hashedPassword };
};

class User extends Model {
    validPassword(passwordToCheck) {
        return this.password === hashText(passwordToCheck, this.salt);
    }
}

module.exports = (sequelize, DataTypes, options = {}) => {
    User.init({
        uid: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
        email: { type: DataTypes.STRING, allowNull: false, validate: { isEmail: true } },
        password: { 
            type: DataTypes.TEXT, 
            allowNull: false,
            set (value) {
                const { salt, hashedPassword } = hashPassword(value);
                this.setDataValue('salt', salt);
                this.setDataValue('password', hashedPassword);
            }
        },
        salt: {
            type: DataTypes.TEXT
        },
        intro: { type: DataTypes.TEXT, allowNull: true },
        body: { type: DataTypes.TEXT, allowNull: true },
        content: { type: DataTypes.JSONB, allowNull: false }
    }, { sequelize, ...options });

    return User;
}
