const express = require('express');
const router = express.Router();
const client = require('../bd');

router.post('/detalle/insertar', (req, res) => {
  const { id_detalle, id_pedido, id_prod, cantidad, subtotal } = req.body;
  const query = 'INSERT INTO detalle_pedido (id_detalle, id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4, $5)';
  client.query(query, [id_detalle, id_pedido, id_prod, cantidad, subtotal])
    .then(() => res.status(201).json({ mensaje: "Detalle de pedido creado con éxito" }))
    .catch(error => res.status(500).json({ error: error.message }));
});

router.get('/detalle/obtener', (req, res) => {
  client.query('SELECT * FROM detalle_pedido')
    .then(result => res.status(200).json({ data: result.rows }))
    .catch(error => res.status(500).json({ error: error.message }));
});

router.put('/detalle/actualizar/:id', (req, res) => {
  const { id } = req.params;
  const { id_pedido, id_prod, cantidad, subtotal } = req.body;
  const query = 'UPDATE detalle_pedido SET id_pedido=$1, id_prod=$2, cantidad=$3, subtotal=$4 WHERE id_detalle=$5';
  client.query(query, [id_pedido, id_prod, cantidad, subtotal, id])
    .then(result => {
      if (result.rowCount === 0) {
        return res.status(404).json({ mensaje: "Detalle no encontrado" });
      }
      res.status(200).json({ mensaje: "Detalle actualizado con éxito" });
    })
    .catch(error => res.status(500).json({ error: error.message }));
});

router.delete('/detalle/eliminar/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM detalle_pedido WHERE id_detalle = $1';
  client.query(query, [id])
    .then(result => {
      if (result.rowCount === 0) {
        return res.status(404).json({ mensaje: "Detalle no encontrado" });
      }
      res.status(200).json({ mensaje: "Detalle eliminado con éxito" });
    })
    .catch(error => res.status(500).json({ error: error.message }));
});

module.exports = router;

