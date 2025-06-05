const mongoose = require('mongoose');

const DirectorSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    status: { type: String, required: true, enum: ['Activo', 'Inactivo'], default: 'Activo' }}
  , { timestamps: true });

module.exports = mongoose.model('Director', DirectorSchema, 'directors');