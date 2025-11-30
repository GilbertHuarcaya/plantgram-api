const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const JWT_SECRET = process.env.JWT_SECRET || 'plantgram-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Registro de nuevo usuario
exports.signup = async (req, res) => {
  try {
    const { username, email, password, full_name, bio, profile_pic } = req.body;

    // Validar campos requeridos
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email y password son requeridos' });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario o email ya existe' });
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const user = new User({
      username,
      email,
      password_hash,
      full_name: full_name || '',
      bio: bio || '',
      profile_pic: profile_pic || ''
    });

    await user.save();

    // Generar token
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Remover password_hash de la respuesta
    const userResponse = user.toObject();
    delete userResponse.password_hash;

    res.status(201).json({
      ok: true,
      message: 'Usuario creado exitosamente',
      token,
      user: userResponse
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos requeridos
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y password son requeridos' });
    }

    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }

    // Generar token
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Remover password_hash de la respuesta
    const userResponse = user.toObject();
    delete userResponse.password_hash;

    res.json({
      ok: true,
      message: 'Login exitoso',
      token,
      user: userResponse
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Verificar token
exports.verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password_hash');

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      ok: true,
      user
    });
  } catch (err) {
    res.status(401).json({ error: 'Token invalido o expirado' });
  }
};

// Middleware para proteger rutas
exports.authenticateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalido o expirado' });
  }
};

// Try to authenticate if Authorization header is present; don't fail when missing or invalid.
exports.maybeAuthenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return next();
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    // ignore errors and continue without user
    return next();
  }
};
