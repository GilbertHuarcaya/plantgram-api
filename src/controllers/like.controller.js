const Like = require('../models/like.model');
const Post = require('../models/post.model');

exports.like = async (req, res) => {
  try {
    // Use authenticated user when available
    const userIdFromToken = req.user && (req.user.id || req.user._id);
    const user_id = req.body.user_id || userIdFromToken;
    const post_id = req.body.post_id;
    if (!user_id) return res.status(400).json({ error: 'user_id is required' });
    if (!post_id) return res.status(400).json({ error: 'post_id is required' });

    const body = Object.assign({}, req.body, { user_id, post_id });
    const l = new Like(body);
    await l.save();
    // increment post counter
    await Post.findByIdAndUpdate(post_id, { $inc: { likes_count: 1 } });
    const populated = await Like.findById(l._id).populate('user_id', 'username full_name');
    res.status(201).json(populated);
  } catch (err) {
    if (err && err.code === 11000) return res.status(409).json({ error: 'Already liked' });
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

// Summary endpoint: returns count and whether authenticated user liked this post
exports.getLikesSummary = async (req, res) => {
  try {
    const postId = req.params.postId;
    const count = await Like.countDocuments({ post_id: postId });
    let liked_by_user = false;
    const userIdFromToken = req.user && (req.user.id || req.user._id);
    if (userIdFromToken) {
      const exists = await Like.findOne({ post_id: postId, user_id: userIdFromToken });
      liked_by_user = !!exists;
    }
    res.json({ count, liked_by_user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
