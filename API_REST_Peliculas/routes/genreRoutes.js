const express = require('express');
const router = express.Router();
const Genre = require('../Models/Genre');
const authAdmin = require('../middlewares/authAdmin');

// GET - Select de objetos (público)
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (error) {
    console.error("Error en GET /genres:", error);    
    res.status(500).json({ message: "Error al obtener los géneros", error });
  }
});

// POST - Creación de objetos (solo admin)
router.post('/', authAdmin, async (req, res) => {
  try {
    const { name, status, description } = req.body;
    if (!name || !status || !description) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const newGenre = new Genre({ name, status, description });
    const savedGenre = await newGenre.save();
    
    console.log("Guardado correctamente género");
    res.status(201).json(savedGenre);
  } catch (error) {
    console.error("Error en POST /genres:", error);
    res.status(500).json({ message: "Error al crear el género", error: error.message });
  }
});

// PUT - Actualizar objetos (solo admin)
router.put('/:id', authAdmin, async (req, res) => {
  try {
    const { name, status, description } = req.body;
    const updatedGenre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name, status, description, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedGenre) {
      return res.status(404).json({ message: "Género no encontrado" });
    }

    console.log("Actualizado correctamente género");
    res.json(updatedGenre);
  } catch (error) {
    console.error("Error en PUT /genres:", error);    
    res.status(500).json({ message: "Error al actualizar el género", error });
  }
});

// DELETE - Eliminar objeto (solo admin)
router.delete('/:id', authAdmin, async (req, res) => {
  try {
    const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
    if (!deletedGenre) {
      return res.status(404).json({ message: "Género no encontrado" });
    }

    console.log("Eliminado correctamente género");
    res.json({ message: "Género eliminado exitosamente" });
  } catch (error) {
    console.error("Error en DELETE /genres:", error);    
    res.status(500).json({ message: "Error al eliminar el género", error });
  }
});

module.exports = router;
