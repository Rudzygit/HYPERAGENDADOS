import mysql from "mysql2/promise";
import "dotenv/config";

// Verificación de que las variables de entorno se están cargando
console.log("📌 Configuración de la base de datos:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? "********" : "NO DEFINIDA",
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Crear el pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Verificación de conexión inicial
async function verificarConexion() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Conexión a MySQL establecida correctamente.");
    connection.release();
  } catch (error) {
    console.error("❌ Error en la conexión a MySQL:", error.message);
  }
}

verificarConexion();

export default pool;
