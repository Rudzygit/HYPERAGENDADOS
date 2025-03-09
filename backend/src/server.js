import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import profesionRoutes from "./routes/profesion.routes.js";
import tipoDocumentoRoutes from "./routes/tipoDocumento.routes.js";
import citaRoutes from "./routes/cita.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profesiones", profesionRoutes);
app.use("/api/tipo-documentos", tipoDocumentoRoutes);
app.use("/api/citas", citaRoutes); 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
