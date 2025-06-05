const express = require('express');
const router = express.Router();
const Type = require('../Models/Type');
const authAdmin = require('../middlewares/authAdmin'); 

// GET - Select de objetos (público)
router.get('/', async (req, res) => {
  try {
    const types = await Type.find();
    res.json(types);
  } catch (error) {
    console.error("Error en GET /Types:", error);    
    res.status(500).json({ message: "Error al obtener los tipos", error });
  }
});

// POST - Creación de objetos (solo admin)
router.post('/', authAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    const newType = new Type({ name, description });
    const savedType = await newType.save();
    console.log("Guardado correctamente Type");
    res.status(201).json(savedType);
  } catch (error) {
    console.error("Error en POST /Types:", error);
    res.status(500).json({ message: "Error al crear el tipo", error: error.message });
  }
});

// PUT - Actualizar objetos (solo admin)
router.put('/:id', authAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedType = await Type.findByIdAndUpdate(
      req.params.id,
      { name, description, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedType) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }
    res.json(updatedType);
    console.log("Actualizado correctamente Type");
  } catch (error) {
    console.error("Error en PUT /Types:", error);
    res.status(500).json({ message: "Error al actualizar el tipo", error });
  }
});

// DELETE - Eliminar objeto (solo admin)
router.delete('/:id', authAdmin, async (req, res) => {
  try {
    const deletedType = await Type.findByIdAndDelete(req.params.id);
    if (!deletedType) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }
    res.json({ message: "Tipo eliminado exitosamente" });
    console.log("Eliminado correctamente Type");
  } catch (error) {
    console.error("Error en DELETE /Types:", error);
    res.status(500).json({ message: "Error al eliminar el tipo", error });
  }
});

module.exports = router;
