const Comment = require('../models/comment.model');

exports.createComment = async (req, res) => {
  try {
    // Ensure we associate the comment with the authenticated user when available
    const userIdFromToken = req.user && (req.user.id || req.user._id);
    const user_id = req.body.user_id || userIdFromToken;
    if (!user_id) return res.status(400).json({ error: 'user_id is required' });
    const { post_id, text } = req.body;
    if (!post_id) return res.status(400).json({ error: 'post_id is required' });
    if (!text) return res.status(400).json({ error: 'text is required' });

    const c = new Comment({ post_id, user_id, text });
    await c.save();
    // increment post comments counter
    try { await require('../models/post.model').findByIdAndUpdate(post_id, { $inc: { comments_count: 1 } }); } catch(e) {}
    const populated = await Comment.findById(c._id).populate('user_id', 'username full_name');
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId || req.query.post_id;
    if (!postId) {
      // If no post id is provided, return all comments (paginated could be added later)
      const comments = await Comment.find().sort({ created_at: 1 }).populate('user_id', 'username full_name');
      return res.json(comments);
    }
    const comments = await Comment.find({ post_id: postId }).sort({ created_at: 1 }).populate('user_id', 'username full_name');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Backwards/compat: support query param GET /api/comments?post_id=... via route GET '/'
exports.getComments = async (req, res) => {
  try {
    const postId = req.query.post_id;
    if (!postId) return res.json([]);
    const comments = await Comment.find({ post_id: postId }).sort({ created_at: 1 }).populate('user_id', 'username full_name');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const c = await Comment.findByIdAndDelete(req.params.id);
    if (!c) return res.status(404).json({ error: 'Comment not found' });
    // decrement post comments counter
    try { await require('../models/post.model').findByIdAndUpdate(c.post_id, { $inc: { comments_count: -1 } }); } catch(e) {}
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
