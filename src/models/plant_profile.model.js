const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlantProfileSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  nickname: { type: String },
  species: { type: String },
  species_id: { type: Schema.Types.ObjectId, ref: 'Species' },
  notes: { type: String },
  profile_pic: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PlantProfile', PlantProfileSchema);
