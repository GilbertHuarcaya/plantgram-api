const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotificationSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true }, // recipient
  actor_id: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: String },
  data: { type: Schema.Types.Mixed },
  read: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);
