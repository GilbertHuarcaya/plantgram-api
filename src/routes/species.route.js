const express = require('express');
const router = express.Router();
const controller = require('../controllers/species.controller');
const { authenticateToken } = require("../controllers/auth.controller");

router.post('/', authenticateToken, controller.createSpecies);
router.get('/', controller.getSpecies);
router.get('/:id', controller.getSpeciesById);

module.exports = router;
