const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a rutas
app.use('/api', require('./rutas/restaurante'));
app.use('/api', require('./rutas/empleado'));
app.use('/api', require('./rutas/producto'));
app.use('/api', require('./rutas/pedido'));
app.use('/api', require('./rutas/detalle'));
app.use('/api', require('./rutas/consultas'));


// Ruta de prueba
app.get('/api/prueba', (req, res) => {
  res.send('API funcionando correctamente 🚀');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}/api`);
});
