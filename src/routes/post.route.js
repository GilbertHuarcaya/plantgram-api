const express = require('express');
const router = express.Router();
const controller = require('../controllers/post.controller');
const { authenticateToken } = require("../controllers/auth.controller");

router.post('/', authenticateToken, controller.createPost);
router.get('/', controller.getPosts);
router.get('/:id', controller.getPostById);
router.put('/:id', authenticateToken, controller.updatePost);
router.delete('/:id', authenticateToken, controller.deletePost);

module.exports = router;
