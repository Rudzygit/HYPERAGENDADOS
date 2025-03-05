const express = require("express");
const mysql = require("mysql2");
const cors = require("cors"); // Importar el módulo cors
const app = express();
const port = 5000;

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: "localhost", // Dirección del servidor de la base de datos
  user: "root", // Usuario de la base de datos
  password: "1234", // Contraseña de la base de datos
  database: "hyperagendados", // Nombre de la base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Ruta de ejemplo para autenticar usuarios
app.post("/login", (req, res) => {
  const { usuario, contraseña } = req.body;

  const query = "SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?";
  connection.query(query, [usuario, contraseña], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    if (results.length > 0) {
      return res.status(200).json({ message: "Inicio de sesión exitoso" });
    } else {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});