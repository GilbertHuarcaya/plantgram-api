const express = require('express');
const router = express.Router();
const controller = require('../controllers/notification.controller');
const { authenticateToken } = require("../controllers/auth.controller");

router.post('/', authenticateToken, controller.createNotification);
router.get('/user/:userId', authenticateToken, controller.getNotificationsForUser);
router.put('/:id/read', authenticateToken, controller.markRead);

module.exports = router;
