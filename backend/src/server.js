import express from "express";
import { connection } from "./config/db.js";
import cors from "cors";
import Auth from "./routes/auth.routes.js";
import Profesion from "./routes/profesion.routes.js";
import TipoDocumento from "./routes/tipoDocumento.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 5000;

// app.get("/", async (req, res) => {
//   const result = await connection.query("SELECT 1 + 1 AS result");
//   res.json(result);
// });

app.use(express.json());
app.use(cors());

app.use(Auth);
app.use("/profesiones", Profesion);
app.use("/tipo-documentos", TipoDocumento);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
