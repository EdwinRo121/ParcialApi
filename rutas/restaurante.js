const express = require('express');
const router = express.Router();
const client = require('../bd');

// Crear restaurante
router.post('/restaurante/insertar', (req, res) => {
  const { id_rest, nombre, ciudad, direccion, fecha_apertura } = req.body;
  const query = 'INSERT INTO restaurante (id_rest, nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4, $5)';
  client.query(query, [id_rest, nombre, ciudad, direccion, fecha_apertura])
    .then(() => res.status(201).json({ mensaje: "Restaurante creado con éxito" }))
    .catch(error => res.status(500).json({ error: error.message }));
});

// Obtener todos los restaurantes
router.get('/restaurante/obtener', (req, res) => {
  client.query('SELECT * FROM restaurante')
    .then(result => res.status(200).json({ data: result.rows }))
    .catch(error => res.status(500).json({ error: error.message }));
});

// Actualizar restaurante
router.put('/restaurante/actualizar/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, ciudad, direccion, fecha_apertura } = req.body;
  const query = 'UPDATE restaurante SET nombre=$1, ciudad=$2, direccion=$3, fecha_apertura=$4 WHERE id_rest=$5';
  client.query(query, [nombre, ciudad, direccion, fecha_apertura, id])
    .then(result => {
      if (result.rowCount === 0) {
        return res.status(404).json({ mensaje: "Restaurante no encontrado" });
      }
      res.status(200).json({ mensaje: "Restaurante actualizado con éxito" });
    })
    .catch(error => res.status(500).json({ error: error.message }));
});

// Eliminar restaurante
router.delete('/restaurante/eliminar/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM restaurante WHERE id_rest = $1';
  client.query(query, [id])
    .then(result => {
      if (result.rowCount === 0) {
        return res.status(404).json({ mensaje: "Restaurante no encontrado" });
      }
      res.status(200).json({ mensaje: "Restaurante eliminado con éxito" });
    })
    .catch(error => res.status(500).json({ error: error.message }));
});
module.exports = router;
