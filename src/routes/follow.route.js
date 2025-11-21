const express = require('express');
const router = express.Router();
const controller = require('../controllers/follow.controller');

router.post('/', controller.follow);
router.delete('/:follower/:following', controller.unfollow);
router.get('/followers/:userId', controller.getFollowers);
router.get('/following/:userId', controller.getFollowing);

module.exports = router;
