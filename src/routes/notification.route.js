const express = require('express');
const router = express.Router();
const controller = require('../controllers/notification.controller');

router.post('/', controller.createNotification);
router.get('/user/:userId', controller.getNotificationsForUser);
router.put('/:id/read', controller.markRead);

module.exports = router;
