const Comment = require('../models/comment.model');

exports.createComment = async (req, res) => {
  try {
    const c = new Comment(req.body);
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post_id: req.params.postId }).sort({ created_at: 1 }).populate('user_id', 'username full_name');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const c = await Comment.findByIdAndDelete(req.params.id);
    if (!c) return res.status(404).json({ error: 'Comment not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
