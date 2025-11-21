const express = require('express');
const router = express.Router();
const controller = require('../controllers/post.controller');
const { authenticateToken } = require("../controllers/auth.controller");
const upload = require('../config/multer.config');

// Crear post con posible media (imagen)
router.post('/', authenticateToken, upload.single('media'), controller.createPost);
router.get('/', controller.getPosts);
router.get('/:id', controller.getPostById);
// Actualizar post (posible nuevo media)
router.put('/:id', authenticateToken, upload.single('media'), controller.updatePost);
router.delete('/:id', authenticateToken, controller.deletePost);

module.exports = router;
