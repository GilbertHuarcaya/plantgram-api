const mongoose = require('mongoose');
const { Schema } = mongoose;

const SpeciesSchema = new Schema({
  common_name: { type: String },
  scientific_name: { type: String, required: true, unique: true },
  family: { type: String },
  tags: [String],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Species', SpeciesSchema);
