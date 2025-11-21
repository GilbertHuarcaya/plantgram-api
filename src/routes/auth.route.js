const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');

// Rutas públicas
router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.get('/verify', controller.verifyToken);

module.exports = router;
