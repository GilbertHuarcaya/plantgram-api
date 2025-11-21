const Notification = require('../models/notification.model');

exports.createNotification = async (req, res) => {
  try {
    const n = new Notification(req.body);
    await n.save();
    res.status(201).json(n);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getNotificationsForUser = async (req, res) => {
  try {
    const list = await Notification.find({ user_id: req.params.userId }).sort({ created_at: -1 }).limit(100);
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.markRead = async (req, res) => {
  try {
    const n = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    if (!n) return res.status(404).json({ error: 'Notification not found' });
    res.json(n);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
