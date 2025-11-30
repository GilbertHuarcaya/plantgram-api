const express = require('express');
const router = express.Router();
const controller = require('../controllers/like.controller');
const { authenticateToken } = require("../controllers/auth.controller");

router.post('/', authenticateToken, controller.like);
router.delete('/:postId/:userId', authenticateToken, controller.unlike);
router.get('/post/:postId', controller.getLikesForPost);
// summary route for counts + current user flag
const { maybeAuthenticate } = require('../controllers/auth.controller');
router.get('/post/:postId/summary', maybeAuthenticate, controller.getLikesSummary);

module.exports = router;
