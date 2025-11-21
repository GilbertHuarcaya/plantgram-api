const Post = require('../models/post.model');
const fs = require('fs');
const path = require('path');

exports.createPost = async (req, res) => {
  try {
    const body = { ...req.body };
    if (req.file) {
      body.media = { type: 'image', url: `/uploads/${req.file.filename}` };
    }

    const post = new Post(body);
    await post.save();
    res.status(201).json(post);
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
      .populate('species_id', 'common_name scientific_name');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user_id', 'username full_name profile_pic')
      .populate('species_id', 'common_name scientific_name');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Si se sube nuevo archivo, eliminar el anterior
    if (req.file) {
      if (post.media && post.media.url && post.media.url.startsWith('/uploads/')) {
        const oldFilename = post.media.url.replace('/uploads/', '');
        const oldPath = path.join(__dirname, '../../uploads', oldFilename);
        if (fs.existsSync(oldPath)) {
          try { fs.unlinkSync(oldPath); } catch (e) { /* ignore */ }
        }
      }
      post.media = { type: 'image', url: `/uploads/${req.file.filename}` };
    }

    // actualizar campos restantes
    const updatable = ['title', 'description', 'tags', 'species_id'];
    updatable.forEach(field => {
      if (req.body[field] !== undefined) post[field] = req.body[field];
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // eliminar media si existe
    if (post.media && post.media.url && post.media.url.startsWith('/uploads/')) {
      const filename = post.media.url.replace('/uploads/', '');
      const filePath = path.join(__dirname, '../../uploads', filename);
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
      }
    }

    await Post.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
