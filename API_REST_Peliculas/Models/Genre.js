const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  status: { type: String, required: true, enum: ['Activo', 'Inactivo'], default: 'Activo' },
  description: { type: String, required: true, minlength: 10 }
}, { timestamps: true });


module.exports = mongoose.model('Genre', GenreSchema, 'genres');