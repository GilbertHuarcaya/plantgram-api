const mongoose = require('mongoose');
const { Schema } = mongoose;

const MediaSchema = new Schema({ type: String, url: String }, { _id: false });

const PostSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String },
  description: { type: String },
  media: MediaSchema,
  tags: [String],
  species_id: { type: Schema.Types.ObjectId, ref: 'Species', default: null },
  likes_count: { type: Number, default: 0 },
  comments_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', PostSchema);
