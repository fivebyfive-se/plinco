const mongoose = require('mongoose');

module.exports = async () => {
    const conn = await mongoose.createConnection(process.env.MONGO_URI);

    conn.model('PostSchema', require('./schemas/post-schema'));
};

