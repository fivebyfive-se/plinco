const Permissions = require('$models/enums/permissions');

module.exports = async (req, res, next) => {
    const { sequelize, models } = await require('$models')();

    req.models = models;
    req.sequelize = sequelize;

    req.requestModels = {
        user: null,
        post: null,
        circle: null
    };

    if (req.params.postId) {
        req.requestModels.post = await models.Post.findOne({ where: { uid: req.params.postId }});
    }
    if (req.params.circleId) {
        req.requestModels.circle = await models.Circle.findOne({ where: { uid: req.params.circleId }});
    }
    if (req.params.requestToken) {
        req.requestModels.user = await models.User.findOne({ where: { requestToken: req.params.requestToken }});
    }

    next();
};
