const express = require('express');
const router = express.Router();
const client = require('../bd');

router.post('/empleado/insertar', (req, res) => {
  const { id_empleado, nombre, rol, id_rest } = req.body;
  const query = 'INSERT INTO empleado (id_empleado, nombre, rol, id_rest) VALUES ($1, $2, $3, $4)';
  client.query(query, [id_empleado, nombre, rol, id_rest])
    .then(() => res.status(201).json({ mensaje: "Empleado creado con éxito" }))
    .catch(error => res.status(500).json({ error: error.message }));
});

router.get('/empleado/obtener', (req, res) => {
  client.query('SELECT * FROM empleado')
    .then(result => res.status(200).json({ data: result.rows }))
    .catch(error => res.status(500).json({ error: error.message }));
});

router.put('/empleado/actualizar/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, rol, id_rest } = req.body;
  const query = 'UPDATE empleado SET nombre=$1, rol=$2, id_rest=$3 WHERE id_empleado=$4';
  client.query(query, [nombre, rol, id_rest, id])
    .then(result => {
      if (result.rowCount === 0) {
        return res.status(404).json({ mensaje: "Empleado no encontrado" });
      }
      res.status(200).json({ mensaje: "Empleado actualizado con éxito" });
    })
    .catch(error => res.status(500).json({ error: error.message }));
});

router.delete('/empleado/eliminar/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM empleado WHERE id_empleado = $1';
  client.query(query, [id])
    .then(result => {
      if (result.rowCount === 0) {
        return res.status(404).json({ mensaje: "Empleado no encontrado" });
      }
      res.status(200).json({ mensaje: "Empleado eliminado con éxito" });
    })
    .catch(error => res.status(500).json({ error: error.message }));
});

module.exports = router;

