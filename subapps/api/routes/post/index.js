const { Router } = require('express');
const router = Router();

// const Permissions = require('$models/enums/permissions');

module.exports = router
    .get('/:postId/:requestToken?', async (req, res) => {
        const { post, user } = req.requestModels;
        const visible = post ? post.visibleTo(user) : false;

        if (!visible) {
            res.sendStatus(400).send();
        } else {
            res.send(post);
        }
    })

    .post('/:requestToken', async (req, res) => {
        const { user } = req.requestModels;
        const { post } = req.body;
        
        const circle = await post.getCircle();
        const canEdit = circle && await circle.editableBy(user);

        if (canEdit) {
            const [ record ] = await req.models.Post.upsert(post);
            res.send(record);
        } else {
            res.sendStatus(400).send();
        }
    })

    .delete('/:postId/:requestToken', async (req, res) => {
        const { user, post } = req.requestModels;
        
        if (await post.editableBy(user)) {
            res.send(await req.models.Post.destroy(post));
        } else {
            res.sendStatus(400).send();
        }
    })
    
    .get('/suggest/:requestToken', async (req, res) => {
        res.send([ ]); // list of suggested posts
    })
;