const User = require('../models/user.model');
const fs = require('fs');
const path = require('path');

exports.createUser = async (req, res) => {
  try {
    // si viene un archivo, guardarlo como profile_pic
    if (req.file) {
      req.body.profile_pic = `/uploads/${req.file.filename}`;
    }

    const user = new User(req.body);
    await user.save();

    const userObj = user.toObject();
    delete userObj.password_hash;

    res.status(201).json(userObj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ created_at: -1 }).limit(100);
    // Remover password_hash de la respuesta
    const sanitizedUsers = users.map(user => {
      const userObj = user.toObject();
      delete userObj.password_hash;
      return userObj;
    });

    res.json(sanitizedUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    // Remover password_hash de la respuesta
    const userObj = user.toObject();
    delete userObj.password_hash;
    res.json(userObj);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Si se sube una nueva imagen, eliminar la anterior (si existe)
    if (req.file) {
      if (user.profile_pic && user.profile_pic.startsWith('/uploads/')) {
        const oldFilename = user.profile_pic.replace('/uploads/', '');
        const oldPath = path.join(__dirname, '../../uploads', oldFilename);
        if (fs.existsSync(oldPath)) {
          try { fs.unlinkSync(oldPath); } catch (e) { /* ignore */ }
        }
      }
      req.body.profile_pic = `/uploads/${req.file.filename}`;
    }

    Object.assign(user, req.body);
    await user.save();

    const userObj = user.toObject();
    delete userObj.password_hash;

    res.json(userObj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // eliminar imagen de perfil si existe
    if (user.profile_pic && user.profile_pic.startsWith('/uploads/')) {
      const filename = user.profile_pic.replace('/uploads/', '');
      const filePath = path.join(__dirname, '../../uploads', filename);
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
      }
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
