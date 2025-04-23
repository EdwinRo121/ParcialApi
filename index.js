const express = require('express');
const client = require('./bd.js');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/api/prueba', (req, res) => {
  res.send('API funcionando correctamente 🚀');
});

// Api de REstaurante

// Crear restaurante
app.post('/api/insertar/restaurante', (req, res) => {
  const { id_rest, nombre, ciudad, direccion, fecha_apertura } = req.body;
  const query = 'INSERT INTO restaurante (id_rest, nombre, ciudad, direccion, fecha_apertura) VALUES ($1, $2, $3, $4, $5)';
  client.query(query, [id_rest, nombre, ciudad, direccion, fecha_apertura])
    .then(() => {
      res.status(201).json({ mensaje: "Restaurante creado con éxito" });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Obtener todos los restaurantes
app.get('/api/obtener/restaurantes', (req, res) => {
  client.query('SELECT * FROM restaurante')
    .then(result => {
      res.status(200).json({ data: result.rows });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Actualizar restaurante
app.put('/api/actualizar/restaurante/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, ciudad, direccion, fecha_apertura } = req.body;
  const query = 'UPDATE restaurante SET nombre=$1, ciudad=$2, direccion=$3, fecha_apertura=$4 WHERE id_rest=$5';
  client.query(query, [nombre, ciudad, direccion, fecha_apertura, id])
    .then(result => {
      if (result.rowCount === 0) {
        res.status(404).json({ mensaje: "Restaurante no encontrado" });
      } else {
        res.status(200).json({ mensaje: "Restaurante actualizado con éxito" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Eliminar restaurante
app.delete('/api/eliminar/restaurante/:id', (req, res) => {
  const { id } = req.params;
  client.query('DELETE FROM restaurante WHERE id_rest = $1', [id])
    .then(result => {
      if (result.rowCount === 0) {
        res.status(404).json({ mensaje: "Restaurante no encontrado" });
      } else {
        res.status(200).json({ mensaje: "Restaurante eliminado con éxito" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// Crear empleado
app.post('/api/insertar/empleado', (req, res) => {
    const { id_empleado, nombre, rol, id_rest } = req.body;
    const query = 'INSERT INTO empleado (id_empleado, nombre, rol, id_rest) VALUES ($1, $2, $3, $4)';
    client.query(query, [id_empleado, nombre, rol, id_rest])
      .then(() => res.status(201).json({ mensaje: "Empleado creado con éxito" }))
      .catch(error => res.status(500).json({ error: error.message }));
  });
  
  // Obtener todos los empleados
  app.get('/api/obtener/empleados', (req, res) => {
    client.query('SELECT * FROM empleado')
      .then(result => res.status(200).json({ data: result.rows }))
      .catch(error => res.status(500).json({ error: error.message }));
  });
  
  // Actualizar empleado
  app.put('/api/actualziar/empleado/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, rol, id_rest } = req.body;
    const query = 'UPDATE empleado SET nombre=$1, rol=$2, id_rest=$3 WHERE id_empleado=$4';
    client.query(query, [nombre, rol, id_rest, id])
      .then(result => {
        if (result.rowCount === 0) return res.status(404).json({ mensaje: "Empleado no encontrado" });
        res.status(200).json({ mensaje: "Empleado actualizado con éxito" });
      })
      .catch(error => res.status(500).json({ error: error.message }));
  });
  
  // Eliminar empleado
  app.delete('/api/eliminar/empleado/:id', (req, res) => {
    const { id } = req.params;
    client.query('DELETE FROM empleado WHERE id_empleado = $1', [id])
      .then(result => {
        if (result.rowCount === 0) return res.status(404).json({ mensaje: "Empleado no encontrado" });
        res.status(200).json({ mensaje: "Empleado eliminado con éxito" });
      })
      .catch(error => res.status(500).json({ error: error.message }));
  });
//Apis de Productos
// Crear producto
app.post('/api/insertar/producto', (req, res) => {
    const { id_prod, nombre, precio } = req.body;
    const query = 'INSERT INTO producto (id_prod, nombre, precio) VALUES ($1, $2, $3)';
    client.query(query, [id_prod, nombre, precio])
      .then(() => res.status(201).json({ mensaje: "Producto creado con éxito" }))
      .catch(error => res.status(500).json({ error: error.message }));
  });
  
  // Obtener todos los productos
  app.get('/api/obtener/productos', (req, res) => {
    client.query('SELECT * FROM producto')
      .then(result => res.status(200).json({ data: result.rows }))
      .catch(error => res.status(500).json({ error: error.message }));
  });
  
  // Actualizar producto
  app.put('/api/actualizar/producto/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    const query = 'UPDATE producto SET nombre=$1, precio=$2 WHERE id_prod=$3';
    client.query(query, [nombre, precio, id])
      .then(result => {
        if (result.rowCount === 0) return res.status(404).json({ mensaje: "Producto no encontrado" });
        res.status(200).json({ mensaje: "Producto actualizado con éxito" });
      })
      .catch(error => res.status(500).json({ error: error.message }));
  });
  
  // Eliminar producto
  app.delete('/api/eliminar/producto/:id', (req, res) => {
    const { id } = req.params;
    client.query('DELETE FROM producto WHERE id_prod = $1', [id])
      .then(result => {
        if (result.rowCount === 0) return res.status(404).json({ mensaje: "Producto no encontrado" });
        res.status(200).json({ mensaje: "Producto eliminado con éxito" });
      })
      .catch(error => res.status(500).json({ error: error.message }));
  });
// Crear pedido
app.post('/api/insertar/pedido', (req, res) => {
    const { id_pedido, fecha, id_rest, total } = req.body;
    const query = 'INSERT INTO pedido (id_pedido, fecha, id_rest, total) VALUES ($1, $2, $3, $4)';
    client.query(query, [id_pedido, fecha, id_rest, total])
      .then(() => res.status(201).json({ mensaje: "Pedido creado con éxito" }))
      .catch(error => res.status(500).json({ error: error.message }));
  });
  
  // Obtener todos los pedidos
  app.get('/api/obtener/pedidos', (req, res) => {
    client.query('SELECT * FROM pedido')
      .then(result => res.status(200).json({ data: result.rows }))
      .catch(error => res.status(500).json({ error: error.message }));
  });
  
  // Actualizar pedido
  app.put('/api/actualizar/pedido/:id', (req, res) => {
    const { id } = req.params;
    const { fecha, id_rest, total } = req.body;
    const query = 'UPDATE pedido SET fecha=$1, id_rest=$2, total=$3 WHERE id_pedido=$4';
    client.query(query, [fecha, id_rest, total, id])
      .then(result => {
        if (result.rowCount === 0) return res.status(404).json({ mensaje: "Pedido no encontrado" });
        res.status(200).json({ mensaje: "Pedido actualizado con éxito" });
      })
      .catch(error => res.status(500).json({ error: error.message }));
  });
  
  // Eliminar pedido
  app.delete('/api/eliminar/pedido/:id', (req, res) => {
    const { id } = req.params;
    client.query('DELETE FROM pedido WHERE id_pedido = $1', [id])
      .then(result => {
        if (result.rowCount === 0) return res.status(404).json({ mensaje: "Pedido no encontrado" });
        res.status(200).json({ mensaje: "Pedido eliminado con éxito" });
      })
      .catch(error => res.status(500).json({ error: error.message }));
  });
// Crear detalle de pedido
app.post('/api/insertar/detalle', (req, res) => {
    const { id_detalle, id_pedido, id_prod, cantidad, subtotal } = req.body;
    const query = 'INSERT INTO detallepedido (id_detalle, id_pedido, id_prod, cantidad, subtotal) VALUES ($1, $2, $3, $4, $5)';
    client.query(query, [id_detalle, id_pedido, id_prod, cantidad, subtotal])
      .then(() => res.status(201).json({ mensaje: "Detalle de pedido creado con éxito" }))
      .catch(error => res.status(500).json({ error: error.message }));
  });
  
  // Obtener todos los detalles
  app.get('/api/obtener/detalles', (req, res) => {
    client.query('SELECT * FROM detallepedido')
      .then(result => res.status(200).json({ data: result.rows }))
      .catch(error => res.status(500).json({ error: error.message }));
  });
  
  // Actualizar detalle
  app.put('/api/actualizar/detalle/:id', (req, res) => {
    const { id } = req.params;
    const { id_pedido, id_prod, cantidad, subtotal } = req.body;
    const query = 'UPDATE detallepedido SET id_pedido=$1, id_prod=$2, cantidad=$3, subtotal=$4 WHERE id_detalle=$5';
    client.query(query, [id_pedido, id_prod, cantidad, subtotal, id])
      .then(result => {
        if (result.rowCount === 0) return res.status(404).json({ mensaje: "Detalle no encontrado" });
        res.status(200).json({ mensaje: "Detalle actualizado con éxito" });
      })
      .catch(error => res.status(500).json({ error: error.message }));
  });
  
  // Eliminar detalle
  app.delete('/api/eliminar/detalle/:id', (req, res) => {
    const { id } = req.params;
    client.query('DELETE FROM detallepedido WHERE id_detalle = $1', [id])
      .then(result => {
        if (result.rowCount === 0) return res.status(404).json({ mensaje: "Detalle no encontrado" });
        res.status(200).json({ mensaje: "Detalle eliminado con éxito" });
      })
      .catch(error => res.status(500).json({ error: error.message }));
  });
        

// Servidor encendido
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
