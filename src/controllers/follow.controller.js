const Follow = require('../models/follow.model');

exports.follow = async (req, res) => {
  try {
    const f = new Follow(req.body);
    await f.save();
    res.status(201).json(f);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.unfollow = async (req, res) => {
  try {
    const f = await Follow.findOneAndDelete({ follower_id: req.params.follower, following_id: req.params.following });
    if (!f) return res.status(404).json({ error: 'Follow relation not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const list = await Follow.find({ following_id: req.params.userId }).populate('follower_id', 'username full_name');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const list = await Follow.find({ follower_id: req.params.userId }).populate('following_id', 'username full_name');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
