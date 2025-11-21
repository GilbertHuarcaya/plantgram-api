const express = require('express');
const router = express.Router();
const controller = require('../controllers/plant_profile.controller');

router.post('/', controller.createProfile);
router.get('/user/:userId', controller.getProfilesByUser);
router.delete('/:id', controller.deleteProfile);

module.exports = router;
