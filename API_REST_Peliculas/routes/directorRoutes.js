const express = require('express');
const router = express.Router();
const Director = require('../Models/Director');
const authAdmin = require('../Middlewares/authAdmin');

// GET - No requiere autenticación
router.get('/', async (req, res) => {
  try {
    const Directors = await Director.find();
    res.json(Directors);
  } catch (error) {
    console.error("Error en GET /directors:", error);    
    res.status(500).json({ message: "Error al obtener los directores", error });
  }
});

// POST - Requiere rol admin
router.post('/', authAdmin, async (req, res) => {
  try {
    const { name, status } = req.body;
    if (!name || !status) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const newDirector = new Director({ name, status });
    const savedDirector = await newDirector.save();

    console.log("Guardado correctamente director");
    res.status(201).json(savedDirector);
  } catch (error) {
    console.error("Error en POST /directors:", error);
    res.status(500).json({ message: 'Error al crear el director', error: error.message });
  }
});

// PUT - Requiere rol admin
router.put('/:id', authAdmin, async (req, res) => {
  try {
    const { name, status } = req.body;
    const updatedDirector = await Director.findByIdAndUpdate(
      req.params.id,
      { name, status, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedDirector) {
      return res.status(404).json({ message: "director no encontrado" });
    }
    console.log("Actualizado correctamente director");
    res.json(updatedDirector);
  } catch (error) {
    console.error("Error en PUT /directors:", error);    
    res.status(500).json({ message: "Error al actualizar el director", error });
  }
});

// DELETE - Requiere rol admin
router.delete('/:id', authAdmin, async (req, res) => {
  try {
    const deletedDirector = await Director.findByIdAndDelete(req.params.id);
    if (!deletedDirector) {
      return res.status(404).json({ message: "director no encontrado" });
    }
    console.log("Eliminado correctamente director");
    res.json({ message: "director eliminado exitosamente" });
  } catch (error) {
    console.error("Error en DELETE /directors:", error);    
    res.status(500).json({ message: "Error al eliminar el director", error });
  }
});

module.exports = router;
