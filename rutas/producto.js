const express = require('express');
const router = express.Router();
const client = require('../bd');

router.post('/producto/insertar', (req, res) => {
  const { id_prod, nombre, precio } = req.body;
  const query = 'INSERT INTO producto (id_prod, nombre, precio) VALUES ($1, $2, $3)';
  client.query(query, [id_prod, nombre, precio])
    .then(() => res.status(201).json({ mensaje: "Producto creado con éxito" }))
    .catch(error => res.status(500).json({ error: error.message }));
});

router.get('/producto/obtener', (req, res) => {
  client.query('SELECT * FROM producto')
    .then(result => res.status(200).json({ data: result.rows }))
    .catch(error => res.status(500).json({ error: error.message }));
});

router.put('/producto/actualizar/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;
  const query = 'UPDATE producto SET nombre=$1, precio=$2 WHERE id_prod=$3';
  client.query(query, [nombre, precio, id])
    .then(result => {
      if (result.rowCount === 0) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
      }
      res.status(200).json({ mensaje: "Producto actualizado con éxito" });
    })
    .catch(error => res.status(500).json({ error: error.message }));
});

router.delete('/producto/eliminar/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM producto WHERE id_prod = $1';
  client.query(query, [id])
    .then(result => {
      if (result.rowCount === 0) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
      }
      res.status(200).json({ mensaje: "Producto eliminado con éxito" });
    })
    .catch(error => res.status(500).json({ error: error.message }));
});

module.exports = router;