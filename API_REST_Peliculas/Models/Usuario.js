const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  clave: { type: String, required: true },
  rol: { type: String, required: true }
});

usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('clave')) return next();
  const salt = await bcrypt.genSalt(10);
  this.clave = await bcrypt.hash(this.clave, salt);
  next();
});

usuarioSchema.methods.validarClave = async function(claveIngresada) {
  return await bcrypt.compare(claveIngresada, this.clave);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
