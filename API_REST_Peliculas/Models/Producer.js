const mongoose = require('mongoose');

const ProducerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  country: { type: String, required: true }, // País de origen de la Producer
  foundedYear: { type: Number, required: true }, // Año de fundación
  status: { type: String, required: true, enum: ['Activo', 'Inactivo'], default: 'Activo' }
}, { timestamps: true });

module.exports = mongoose.model('Producer', ProducerSchema, 'producers');
