const mongoose = require('mongoose');
const { Schema } = mongoose;

const SaveSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  post_id: { type: Schema.Types.ObjectId, ref: 'Post', required: true, index: true },
  created_at: { type: Date, default: Date.now }
});

SaveSchema.index({ user_id: 1, post_id: 1 }, { unique: true });

module.exports = mongoose.model('Save', SaveSchema);
