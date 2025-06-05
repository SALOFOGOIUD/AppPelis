const mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true}}
  , { timestamps: true });

module.exports = mongoose.model('Type', TypeSchema, 'types');