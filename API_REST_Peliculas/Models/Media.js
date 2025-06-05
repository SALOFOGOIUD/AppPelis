const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  serial: { type: Number, required: true, unique: true },
  title: { type: String, required: true, unique: true },
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'Tipo', required: true },
  director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true },
  producer: { type: mongoose.Schema.Types.ObjectId, ref: 'Productora', required: true },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genero', required: true },
  releaseYear: { type: Number, required: true },
  duration: { type: Number, required: true },
  synopsis: { type: String, required: true }, 
  status: { type: String, required: true, enum: ['Activo', 'Inactivo'], default: 'Activo' }
}, { timestamps: true });

module.exports = mongoose.model('Media', MediaSchema, 'medias');