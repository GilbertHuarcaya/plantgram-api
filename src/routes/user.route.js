const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const { authenticateToken } = require("../controllers/auth.controller");
const upload = require('../config/multer.config');

// Crear usuario con posible imagen de perfil
router.post('/', authenticateToken, upload.single('profile_pic'), controller.createUser);
router.get('/', controller.getUsers);
router.get('/:id', controller.getUserById);
// Actualizar usuario (puede incluir nueva imagen de perfil)
router.put('/:id', authenticateToken, upload.single('profile_pic'), controller.updateUser);
router.delete('/:id', authenticateToken, controller.deleteUser);

module.exports = router;
