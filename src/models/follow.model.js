const mongoose = require('mongoose');
const { Schema } = mongoose;

const FollowSchema = new Schema({
  follower_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  following_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  created_at: { type: Date, default: Date.now }
});

FollowSchema.index({ follower_id: 1, following_id: 1 }, { unique: true });

module.exports = mongoose.model('Follow', FollowSchema);
