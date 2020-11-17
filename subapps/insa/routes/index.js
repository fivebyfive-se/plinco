const { Router } = require('express');

const ensureHttps = require('$middleware/ensure-https');
const themeCookie = require('$middleware/theme-cookie');
const prismic = require('$middleware/prismic');

const router = Router();

router
    .use(ensureHttps)
    .use(themeCookie)
    .use(prismic)


    .get('/', async (req, res) => {
        const api = await req.getPrismicApi();
        const document = await api.getByUID('textpage', 'insa', { lang: req.lang });
        res.render('index', { document });
    })

    .get('/languages/:lang', (req, res) => {
        res.cookie('language', req.params.lang, { maxAge: 900000, httpOnly: true });
        res.redirect(req.header('Referer') || '/');
    })

    .get('/themes/:name', (req, res) => {
        res.cookie('theme', req.params.name, { maxAge: 900000, httpOnly: true });
        res.redirect(req.header('Referer') || '/');
    })
;

module.exports = router;
 