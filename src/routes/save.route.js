const express = require('express');
const router = express.Router();
const controller = require('../controllers/save.controller');
const { authenticateToken } = require("../controllers/auth.controller");

router.post('/', authenticateToken, controller.savePost);
router.delete('/:userId/:postId', authenticateToken, controller.unsavePost);
router.get('/user/:userId', authenticateToken, controller.getSavedByUser);
// summary: count + whether current user saved it (if token provided)
const { maybeAuthenticate } = require('../controllers/auth.controller');
router.get('/post/:postId/summary', maybeAuthenticate, controller.getSavesSummary);

module.exports = router;
