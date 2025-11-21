const express = require('express');
const router = express.Router();
const controller = require('../controllers/upload.controller');
const upload = require('../config/multer.config');
const { authenticateToken } = require('../controllers/auth.controller');

// Subir una sola imagen (requiere autenticación)
router.post('/single', authenticateToken, upload.single('image'), controller.uploadImage);

// Subir múltiples imágenes (requiere autenticación)
router.post('/multiple', authenticateToken, upload.array('images', 10), controller.uploadMultipleImages);

// Eliminar una imagen (requiere autenticación)
router.delete('/:filename', authenticateToken, controller.deleteImage);

// Obtener una imagen (público)
router.get('/:filename', controller.getImage);

module.exports = router;
