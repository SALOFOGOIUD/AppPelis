const express = require('express');
const router = express.Router();
const Producer = require('../Models/Producer');
const authAdmin = require('../middlewares/authAdmin');

// GET - Select de objetos (público)
router.get('/', async (req, res) => {
  try {
    const producers = await Producer.find();
    res.json(producers);
  } catch (error) {
    console.error("Error en GET /Producers:", error);    
    res.status(500).json({ message: "Error al obtener los productores", error });
  }
});

// POST - Crear productor (solo admin)
router.post('/', authAdmin, async (req, res) => {
  try {
    const { name, country, foundedYear, status } = req.body;

    if (!name || !country || !foundedYear || !status) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const newProducer = new Producer({ name, country, foundedYear, status });
    const savedProducer = await newProducer.save();

    console.log("Guardado correctamente Producer");
    res.status(201).json(savedProducer);
  } catch (error) {
    console.error("Error en POST /Producers:", error);
    res.status(500).json({ message: "Error al crear el productor", error: error.message });
  }
});

// PUT - Actualizar productor (solo admin)
router.put('/:id', authAdmin, async (req, res) => {
  try {
    const { name, country, foundedYear, status } = req.body;

    const updatedProducer = await Producer.findByIdAndUpdate(
      req.params.id,
      { name, country, foundedYear, status, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedProducer) {
      return res.status(404).json({ message: "Productor no encontrado" });
    }

    console.log("Actualizado correctamente Producer");
    res.json(updatedProducer);
  } catch (error) {
    console.error("Error en PUT /Producers:", error);    
    res.status(500).json({ message: "Error al actualizar el productor", error });
  }
});

// DELETE - Eliminar productor (solo admin)
router.delete('/:id', authAdmin, async (req, res) => {
  try {
    const deletedProducer = await Producer.findByIdAndDelete(req.params.id);

    if (!deletedProducer) {
      return res.status(404).json({ message: "Productor no encontrado" });
    }

    console.log("Eliminado correctamente Producer");
    res.json({ message: "Productor eliminado exitosamente" });
  } catch (error) {
    console.error("Error en DELETE /Producers:", error);    
    res.status(500).json({ message: "Error al eliminar el productor", error });
  }
});

module.exports = router;
