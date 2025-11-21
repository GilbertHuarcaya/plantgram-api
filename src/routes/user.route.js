const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const { authenticateToken } = require("../controllers/auth.controller");

router.post('/', authenticateToken, controller.createUser);
router.get('/', controller.getUsers);
router.get('/:id', controller.getUserById);
router.put('/:id', authenticateToken,  controller.updateUser);
router.delete('/:id', authenticateToken,  controller.deleteUser);

module.exports = router;
