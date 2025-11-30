const Save = require('../models/save.model');

exports.savePost = async (req, res) => {
  try {
    // Prefer authenticated user when available
    const userIdFromToken = req.user && (req.user.id || req.user._id);
    const user_id = req.body.user_id || userIdFromToken;
    if (!user_id) return res.status(400).json({ error: 'user_id is required' });

    const body = Object.assign({}, req.body, { user_id });
    const s = new Save(body);
    await s.save();
    // increment post saves counter
    try { await require('../models/post.model').findByIdAndUpdate(body.post_id, { $inc: { saves_count: 1 } }); } catch(e) {}
    // populate post for convenience
    const populated = await Save.findById(s._id).populate('post_id');
    res.status(201).json(populated);
  } catch (err) {
    if (err && err.code === 11000) return res.status(409).json({ error: 'Already saved' });
    res.status(400).json({ error: err.message });
  }
};

exports.unsavePost = async (req, res) => {
  try {
    const s = await Save.findOneAndDelete({ user_id: req.params.userId, post_id: req.params.postId });
    if (!s) return res.status(404).json({ error: 'Save not found' });
    // decrement post saves counter
    try { await require('../models/post.model').findByIdAndUpdate(req.params.postId, { $inc: { saves_count: -1 } }); } catch(e) {}
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

exports.getSavesSummary = async (req, res) => {
  try {
    const postId = req.params.postId;
    const count = await Save.countDocuments({ post_id: postId });
    let saved_by_user = false;
    const userIdFromToken = req.user && (req.user.id || req.user._id);
    if (userIdFromToken) {
      const exists = await Save.findOne({ post_id: postId, user_id: userIdFromToken });
      saved_by_user = !!exists;
    }
    res.json({ count, saved_by_user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
