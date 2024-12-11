const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express(); // Inicializa la aplicación antes de usarla

// Configuración de conexión a la base de datos usando las variables de Railway
const pool = new Pool({
  host: process.env.PGHOST, // Cambiado de PG_HOST a PGHOST
  port: process.env.PGPORT, // Cambiado de PG_PORT a PGPORT
  user: process.env.PGUSER, // Cambiado de PG_USER a PGUSER
  password: process.env.PGPASSWORD, // Cambiado de PG_PASSWORD a PGPASSWORD
  database: process.env.PGDATABASE, // Cambiado de PG_DATABASE a PGDATABASE
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
