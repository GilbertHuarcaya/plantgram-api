const express = require('express');
const router = express.Router();
const controller = require('../controllers/plant_profile.controller');
const { authenticateToken } = require("../controllers/auth.controller");

router.post('/', authenticateToken, controller.createProfile);
router.get('/', controller.getAllProfiles);
router.get('/:id', controller.getProfileById);
router.get('/user/:userId', controller.getProfilesByUser);
router.delete('/:id', authenticateToken, controller.deleteProfile);

module.exports = router;
