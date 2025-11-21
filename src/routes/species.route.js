const express = require('express');
const router = express.Router();
const controller = require('../controllers/species.controller');

router.post('/', controller.createSpecies);
router.get('/', controller.getSpecies);
router.get('/:id', controller.getSpeciesById);

module.exports = router;
