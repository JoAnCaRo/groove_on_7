const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

require('dotenv').config();
console.log('PGHOST:', process.env.PGHOST);
console.log('PGPORT:', process.env.PGPORT);
console.log('PGUSER:', process.env.PGUSER);
console.log('PGPASSWORD:', process.env.PGPASSWORD ? '****' : 'NOT SET'); // Oculta la contraseña
console.log('PGDATABASE:', process.env.PGDATABASE);

const app = express(); // Inicializa la aplicación antes de usarla

// Bloque temporal poara verificación
/* console.log('Configuración del pool:', {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
}); */

// Configuración de conexión a la base de datos usando las variables de Railway
/* const pool = new Pool({
  host: process.env.PGHOST, // Cambiado de PG_HOST a PGHOST
  port: process.env.PGPORT, // Cambiado de PG_PORT a PGPORT
  user: process.env.PGUSER, // Cambiado de PG_USER a PGUSER
  password: process.env.PGPASSWORD, // Cambiado de PG_PASSWORD a PGPASSWORD
  database: process.env.PGDATABASE, // Cambiado de PG_DATABASE a PGDATABASE
}); */

const pool = new Pool({
  host: 'junction.proxy.rlwy.net',
  port: 45870,
  user: 'postgres',
  password: 'YFZvBRQCLhLiRPnqbvjIoMUSoqtFCKve',
  database: 'railway',
});

// Prueba conexión
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa:', res.rows);
  }
});


// Middlewares
app.use(cors({ origin: 'http://localhost:3000' })); // Permite solicitudes solo desde el frontend local
app.use(bodyParser.json());

// Ruta para obtener eventos
app.get('/events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY date ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para añadir un evento
app.post('/events', async (req, res) => {
  const { date, name, location, map_link } = req.body;
  try {
    const result = await pool.query('INSERT INTO events (date, name, location, map_link) VALUES ($1, $2, $3, $4) RETURNING *', [date, name, location, map_link]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta para borrar un evento
app.delete('/events/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM events WHERE id = $1', [id]);
    res.json({ message: 'Evento eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Configuración del puerto
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
