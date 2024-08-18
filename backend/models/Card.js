const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { timestamps: true });

CardSchema.index({ title: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

module.exports = mongoose.model('Card', CardSchema);
