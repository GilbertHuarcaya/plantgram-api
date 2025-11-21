const express = require('express');
const router = express.Router();
const controller = require('../controllers/follow.controller');
const { authenticateToken } = require("../controllers/auth.controller");

router.post('/', authenticateToken, controller.follow);
router.delete('/:follower/:following', authenticateToken, controller.unfollow);
router.get('/followers/:userId', controller.getFollowers);
router.get('/following/:userId', controller.getFollowing);

module.exports = router;
