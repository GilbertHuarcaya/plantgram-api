const express = require('express');
const router = express.Router();
const controller = require('../controllers/plant_profile.controller');
const { authenticateToken } = require("../controllers/auth.controller");
const upload = require('../config/multer.config');

// Crear perfil de planta (puede incluir imagen)
router.post('/', authenticateToken, upload.single('profile_pic'), controller.createProfile);
router.get('/user/:userId', controller.getProfilesByUser);
router.delete('/:id', authenticateToken, controller.deleteProfile);

module.exports = router;
