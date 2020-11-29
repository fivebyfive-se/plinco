const { Router } = require('express');

const injectmodels = require('$middleware/inject-models');

const route_lti = require('./lti');
const route_mail = require('./mail');
const route_post = require('./post');
const router = Router();

router
    .use(injectmodels)
    
    .use('/lti', route_lti)
    .use('/mail', route_mail)
    .use('/post', route_post)

    .get('/', (req, res) => res.sendStatus(200))
;

module.exports = router;
