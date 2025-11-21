require('dotenv').config();
const rateLimit = require("express-rate-limit");
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

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

const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Demasiadas peticiones desde esta IP, intenta más tarde.",
  statusCode: 429,
});

const app = express();
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(cors());

app.use(limiter);

app.use(bodyParser.json());

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Plantgram API listening on port ${port}`));
