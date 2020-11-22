const { Router } = require('express');

const lti_app = require('./lti');

const router = Router();

router
    .get('/', (req, res) => res.sendStatus(200))
    .use('/lti', lti_app)
;

module.exports = router;
