const express = require("express");
const os = require("os");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// Configuración de la base de datos
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.get("/", (req, res) => {
  res.send("Hola desde Render con PostgreSQL");
});

app.get("/info", (req, res) => {
  res.json({
    hostname: os.hostname(),
    platform: os.platform(),
    env: process.env.NODE_ENV || "no definido"
  });
});

// Endpoint para probar DB
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error_: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en ${PORT}`));