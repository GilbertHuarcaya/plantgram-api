const Save = require('../models/save.model');

exports.savePost = async (req, res) => {
  try {
    const s = new Save(req.body);
    await s.save();
    res.status(201).json(s);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.unsavePost = async (req, res) => {
  try {
    const s = await Save.findOneAndDelete({ user_id: req.params.userId, post_id: req.params.postId });
    if (!s) return res.status(404).json({ error: 'Save not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSavedByUser = async (req, res) => {
  try {
    const list = await Save.find({ user_id: req.params.userId }).populate('post_id');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
