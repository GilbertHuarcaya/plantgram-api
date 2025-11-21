const PlantProfile = require('../models/plant_profile.model');

exports.createProfile = async (req, res) => {
  try {
    const p = new PlantProfile(req.body);
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getProfilesByUser = async (req, res) => {
  try {
    const list = await PlantProfile.find({ user_id: req.params.userId });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const p = await PlantProfile.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ error: 'Profile not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
