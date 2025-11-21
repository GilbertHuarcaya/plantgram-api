const express = require('express');
const router = express.Router();
const controller = require('../controllers/save.controller');

router.post('/', controller.savePost);
router.delete('/:userId/:postId', controller.unsavePost);
router.get('/user/:userId', controller.getSavedByUser);

module.exports = router;
