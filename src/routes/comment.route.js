const express = require('express');
const router = express.Router();
const controller = require('../controllers/comment.controller');
const { authenticateToken } = require("../controllers/auth.controller");

router.post("/", authenticateToken, controller.createComment);
router.get('/post/:postId', controller.getCommentsByPost);
router.delete("/:id", authenticateToken, controller.deleteComment);

module.exports = router;
