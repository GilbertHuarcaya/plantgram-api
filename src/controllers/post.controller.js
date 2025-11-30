const Post = require('../models/post.model');

exports.createPost = async (req, res) => {
  try {
    // Accept image_url directly from the client and map to media for compatibility
    const { user_id, title, description, image_url, species_id, plant_profile_id, tags } = req.body;
    const postData = {
      user_id,
      title,
      description,
      species_id: species_id || null,
      plant_profile_id: plant_profile_id || null,
      tags: Array.isArray(tags) ? tags : (tags ? [tags] : [])
    };
    if (image_url) {
      postData.image_url = image_url;
      postData.media = { type: 'image', url: image_url };
    }
    const post = new Post(postData);
    await post.save();
    const populated = await Post.findById(post._id).populate('user_id', 'username full_name profile_pic').populate('species_id', 'common_name scientific_name');
    res.status(201).json(populated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const page = Math.max(0, parseInt(req.query.page || '0'));
    const limit = Math.max(1, parseInt(req.query.limit || '20'));
    const posts = await Post.find()
      .sort({ created_at: -1 })
      .skip(page * limit)
      .limit(limit)
      .populate('user_id', 'username full_name profile_pic')
      .populate('species_id', 'common_name scientific_name')
      .populate('plant_profile_id', 'nickname species profile_pic');

    // If request carried an authenticated user (maybeAuthenticate), include liked/saved flags
    const postIds = posts.map(p => p._id);
    let likedSet = new Set();
    let savedSet = new Set();
    try {
      if (req.user && req.user.id) {
        const Like = require('../models/like.model');
        const Save = require('../models/save.model');
        const userId = req.user.id || req.user._id;
        const likes = await Like.find({ post_id: { $in: postIds }, user_id: userId }).select('post_id');
        const saves = await Save.find({ post_id: { $in: postIds }, user_id: userId }).select('post_id');
        likes.forEach(l => likedSet.add(String(l.post_id)));
        saves.forEach(s => savedSet.add(String(s.post_id)));
      }
    } catch (err) {
      // ignore per-user flag lookup errors; still return base posts
      console.warn('Error fetching per-user like/save flags', err.message || err);
    }

    // Map posts to include counts (already stored) and flags for the requesting user
    const out = posts.map(p => {
      const po = p.toObject();
      po.likes_count = po.likes_count || 0;
      po.saves_count = po.saves_count || 0;
      po.comments_count = po.comments_count || 0;
      po.liked_by_user = likedSet.has(String(po._id));
      po.saved_by_user = savedSet.has(String(po._id));
      return po;
    });

    res.json(out);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user_id', 'username full_name profile_pic')
      .populate('species_id', 'common_name scientific_name')
      .populate('plant_profile_id', 'nickname species profile_pic');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    // Include user flags if possible
    const po = post.toObject();
    po.likes_count = po.likes_count || 0;
    po.saves_count = po.saves_count || 0;
    po.comments_count = po.comments_count || 0;
    if (req.user && req.user.id) {
      try {
        const Like = require('../models/like.model');
        const Save = require('../models/save.model');
        const userId = req.user.id || req.user._id;
        const liked = await Like.findOne({ post_id: po._id, user_id: userId });
        const saved = await Save.findOne({ post_id: po._id, user_id: userId });
        po.liked_by_user = !!liked;
        po.saved_by_user = !!saved;
      } catch (err) {
        po.liked_by_user = false;
        po.saved_by_user = false;
      }
    } else {
      po.liked_by_user = false;
      po.saved_by_user = false;
    }
    res.json(po);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
