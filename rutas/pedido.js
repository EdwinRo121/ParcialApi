const express = require('express');
const router = express.Router();
const client = require('../bd');

router.post('/pedido/insertar', (req, res) => {
  const { id_pedido, fecha, id_rest, total } = req.body;
  const query = 'INSERT INTO pedido (id_pedido, fecha, id_rest, total) VALUES ($1, $2, $3, $4)';
  client.query(query, [id_pedido, fecha, id_rest, total])
    .then(() => res.status(201).json({ mensaje: "Pedido creado con éxito" }))
    .catch(error => res.status(500).json({ error: error.message }));
});

router.get('/pedido/obtener', (req, res) => {
  client.query('SELECT * FROM pedido')
    .then(result => res.status(200).json({ data: result.rows }))
    .catch(error => res.status(500).json({ error: error.message }));
});

router.put('/pedido/actualizar/:id', (req, res) => {
  const { id } = req.params;
  const { fecha, id_rest, total } = req.body;
  const query = 'UPDATE pedido SET fecha=$1, id_rest=$2, total=$3 WHERE id_pedido=$4';
  client.query(query, [fecha, id_rest, total, id])
    .then(result => {
      if (result.rowCount === 0) {
        return res.status(404).json({ mensaje: "Pedido no encontrado" });
      }
      res.status(200).json({ mensaje: "Pedido actualizado con éxito" });
    })
    .catch(error => res.status(500).json({ error: error.message }));
});

router.delete('/pedido/eliminar/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM pedido WHERE id_pedido = $1';
  client.query(query, [id])
    .then(result => {
      if (result.rowCount === 0) {
        return res.status(404).json({ mensaje: "Pedido no encontrado" });
      }
      res.status(200).json({ mensaje: "Pedido eliminado con éxito" });
    })
    .catch(error => res.status(500).json({ error: error.message }));
});

module.exports = router;

