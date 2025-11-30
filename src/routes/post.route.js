const express = require('express');
const router = express.Router();
const controller = require('../controllers/post.controller');
const { authenticateToken, maybeAuthenticate } = require("../controllers/auth.controller");

router.post('/', authenticateToken, controller.createPost);
router.get('/', maybeAuthenticate, controller.getPosts);
router.get('/:id', maybeAuthenticate, controller.getPostById);
router.put('/:id', authenticateToken, controller.updatePost);
router.delete('/:id', authenticateToken, controller.deletePost);

module.exports = router;
