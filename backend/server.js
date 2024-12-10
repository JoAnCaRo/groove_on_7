const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

app.use(cors());
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
  const { date, name, location } = req.body;
  try {
    const result = await pool.query('INSERT INTO events (date, name, location) VALUES ($1, $2, $3) RETURNING *', [date, name, location]);
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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
