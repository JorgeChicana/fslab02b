const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Servidor WebSocket activo");
});

// Evento de conexión
io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.emit("mensaje", "Bienvenido al servidor en tiempo real");

  socket.on("mensaje-cliente", (data) => {
    console.log("Mensaje recibido:", data);
    io.emit("mensaje", data); // enviar a todos
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));


/*
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
*/