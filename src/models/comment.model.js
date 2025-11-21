const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  post_id: { type: Schema.Types.ObjectId, ref: 'Post', required: true, index: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  text: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
