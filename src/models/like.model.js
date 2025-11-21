const mongoose = require('mongoose');
const { Schema } = mongoose;

const LikeSchema = new Schema({
  post_id: { type: Schema.Types.ObjectId, ref: 'Post', required: true, index: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  created_at: { type: Date, default: Date.now }
});

LikeSchema.index({ post_id: 1, user_id: 1 }, { unique: true });

module.exports = mongoose.model('Like', LikeSchema);
