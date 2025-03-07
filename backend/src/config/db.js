import mysql from "mysql2/promise";
import "dotenv/config";

const pool = mysql.createPool({
  host: process.env.DB_HOST, // Según la imagen que enviaste
  user: "root",
  password: process.env.DB_PASSWORD, // Si no tienes contraseña, déjalo vacío
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
