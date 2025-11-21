const Species = require('../models/species.model');

exports.createSpecies = async (req, res) => {
  try {
    const s = new Species(req.body);
    await s.save();
    res.status(201).json(s);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getSpecies = async (req, res) => {
  try {
    const list = await Species.find().sort({ created_at: -1 }).limit(200);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSpeciesById = async (req, res) => {
  try {
    const s = await Species.findById(req.params.id);
    if (!s) return res.status(404).json({ error: 'Species not found' });
    res.json(s);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
