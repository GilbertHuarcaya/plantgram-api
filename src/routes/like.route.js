const express = require('express');
const router = express.Router();
const controller = require('../controllers/like.controller');

router.post('/', controller.like);
router.delete('/:postId/:userId', controller.unlike);
router.get('/post/:postId', controller.getLikesForPost);

module.exports = router;
