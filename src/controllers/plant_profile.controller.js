const PlantProfile = require('../models/plant_profile.model');
const fs = require('fs');
const path = require('path');

exports.createProfile = async (req, res) => {
  try {
    if (req.file) {
      req.body.profile_pic = `/uploads/${req.file.filename}`;
    }

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
    const p = await PlantProfile.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Profile not found' });

    if (p.profile_pic && p.profile_pic.startsWith('/uploads/')) {
      const filename = p.profile_pic.replace('/uploads/', '');
      const filePath = path.join(__dirname, '../../uploads', filename);
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
      }
    }

    await PlantProfile.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
