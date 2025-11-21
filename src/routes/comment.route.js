const express = require('express');
const router = express.Router();
const controller = require('../controllers/comment.controller');

router.post('/', controller.createComment);
router.get('/post/:postId', controller.getCommentsByPost);
router.delete('/:id', controller.deleteComment);

module.exports = router;
