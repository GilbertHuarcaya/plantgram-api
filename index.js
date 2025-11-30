require('dotenv').config();
const rateLimit = require("express-rate-limit");
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Connect to DB (will log connection info)
require('./src/db');

const authRoutes = require('./src/routes/auth.route');
const userRoutes = require('./src/routes/user.route');
const postRoutes = require('./src/routes/post.route');
const speciesRoutes = require('./src/routes/species.route');
const commentRoutes = require('./src/routes/comment.route');
const followRoutes = require('./src/routes/follow.route');
const likeRoutes = require('./src/routes/like.route');
const plantProfileRoutes = require('./src/routes/plant_profile.route');
const saveRoutes = require('./src/routes/save.route');
const notificationRoutes = require('./src/routes/notification.route');
const uploadRoutes = require('./src/routes/upload.route');

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Demasiadas peticiones desde esta IP, intenta más tarde.",
  statusCode: 429,
});

const app = express();
// Configure Helmet but allow cross-origin resource loading for static assets
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cors());

app.use(limiter);

app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => res.json({ ok: true, msg: 'Plantgram API' }));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/species', speciesRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/follows', followRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/plant-profiles', plantProfileRoutes);
app.use('/api/saves', saveRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/upload', uploadRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Plantgram API listening on port ${port}`));
