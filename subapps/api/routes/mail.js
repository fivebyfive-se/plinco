const { Router } = require('express');

const router = Router();

module.exports = router
    .get('/post/:token', (req, res) => {
        const { token } = req.params;
        // Find user by token
        res.send(200);
    })