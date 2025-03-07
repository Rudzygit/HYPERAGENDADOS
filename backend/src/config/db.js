import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: "127.0.0.1", // Según la imagen que enviaste
    user: "root",
    password: "1234", // Si no tienes contraseña, déjalo vacío
    database: "hyperagendados",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export default pool;
