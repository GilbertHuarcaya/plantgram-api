const Like = require('../models/like.model');
const Post = require('../models/post.model');

exports.like = async (req, res) => {
  try {
    const l = new Like(req.body);
    await l.save();
    // increment post counter
    await Post.findByIdAndUpdate(req.body.post_id, { $inc: { likes_count: 1 } });
    res.status(201).json(l);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.unlike = async (req, res) => {
  try {
    const l = await Like.findOneAndDelete({ post_id: req.params.postId, user_id: req.params.userId });
    if (!l) return res.status(404).json({ error: 'Like not found' });
    await Post.findByIdAndUpdate(req.params.postId, { $inc: { likes_count: -1 } });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLikesForPost = async (req, res) => {
  try {
    const list = await Like.find({ post_id: req.params.postId }).populate('user_id', 'username full_name');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
