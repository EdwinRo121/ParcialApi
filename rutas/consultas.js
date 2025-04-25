
const express = require('express');
const router = express.Router();
const client = require('../bd');

//Obtener productos de un pedido específico
router.get('/pedido/productos/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT producto.id_prod, producto.nombre, producto.precio, detalle_pedido.cantidad, detalle_pedido.subtotal
    FROM detalle_pedido
    INNER JOIN producto ON detalle_pedido.id_prod = producto.id_prod
    WHERE detalle_pedido.id_pedido = $1
  `;
  client.query(query, [id])
    .then(result => res.status(200).json({ data: result.rows }))
    .catch(error => res.status(500).json({ error: error.message }));
});

//  Obtener los productos más vendidos 
router.get('/productos/mas_vendidos/:cantidad', (req, res) => {
  const { cantidad } = req.params;
  const query = `
    SELECT producto.id_prod, producto.nombre, SUM(detalle_pedido.cantidad) AS total_vendidos
    FROM detalle_pedido
    INNER JOIN producto ON detalle_pedido.id_prod = producto.id_prod
    GROUP BY producto.id_prod, producto.nombre
    HAVING SUM(detalle_pedido.cantidad) > $1
    ORDER BY total_vendidos DESC
  `;
  client.query(query, [cantidad])
    .then(result => res.status(200).json({ data: result.rows }))
    .catch(error => res.status(500).json({ error: error.message }));
});

//Obtener el total de ventas 

router.get('/ventas/restaurante/:id', (req, res) => {
    const { id } = req.params;
    const query = `
      SELECT restaurante.id_rest, restaurante.nombre, SUM(pedido.total) AS total_ventas
      FROM restaurante
      INNER JOIN pedido ON restaurante.id_rest = pedido.id_rest
      WHERE restaurante.id_rest = $1
      GROUP BY restaurante.id_rest, restaurante.nombre
    `;
    client.query(query, [id])
      .then(result => res.status(200).json({ data: result.rows }))
      .catch(error => res.status(500).json({ error: error.message }));
  });
//Obtener los pedidos por fecha específica
router.get('/pedidos/fecha/:fecha', (req, res) => {
  const { fecha } = req.params;
  const query = 'SELECT * FROM pedido WHERE fecha = $1';
  client.query(query, [fecha])
    .then(result => res.status(200).json({ data: result.rows }))
    .catch(error => res.status(500).json({ error: error.message }));
});

//Obtener los empleados por rol en un restaurante
router.get('/empleados/:rol/:id_rest', (req, res) => {
    const { rol, id_rest } = req.params;
    const query = 'SELECT * FROM empleado WHERE rol = $1 AND id_rest = $2';
    client.query(query, [rol, id_rest])
      .then(result => res.status(200).json({ data: result.rows }))
      .catch(error => res.status(500).json({ error: error.message }));
  });

module.exports = router;
