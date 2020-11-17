require('module-alias/register');

const express = require('express');
const vhost = require('vhost');

const web_app = require('@web/index.js');
const api_app = require('@api/index.js');
const insa_app = require('@insa/index.js');

const port = process.env.PORT || 3000;

express()
    .use(vhost(/api\.plinco\.local|api\.plinco\.org|api\.plinco\.net|api\.plinco\.rest/, api_app))
    .use(vhost(/plinco\.local|www\.plinco\.org|www\.plinco\.net/, web_app))
    .use(vhost(/insa\.local|www\.insa\.report/, insa_app))
    

    .listen(port, () => {
        console.log(`Listening on ${port}`);
    });
