import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import profesionRoutes from "./routes/profesion.routes.js";
import tipoDocumentoRoutes from "./routes/tipoDocumento.routes.js";
import citaRoutes from "./routes/cita.routes.js";
import userRoutes from "./routes/user.routes.js";
import funcionalidadesRoutes from "./routes/funcionalidades.routes.js"; // Importar funcionalidades
import authMiddleware from "./middlewares/auth.middleware.js"; // Middleware de autenticación

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);
app.use(express.json());

// Definir rutas
app.use("/api/auth", authRoutes);
app.use("/api/profesiones", profesionRoutes);
app.use("/api/tipo-documentos", tipoDocumentoRoutes);
app.use("/api/citas", citaRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/funcionalidades", authMiddleware, funcionalidadesRoutes); // Aplicar autenticación a funcionalidades

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
