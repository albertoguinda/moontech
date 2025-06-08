import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { authRouter } from "./routes/auth";
import { usersRouter } from "./routes/users";
import { logsRouter } from "./routes/logs";

// Cargo las variables de entorno desde el archivo .env
dotenv.config();

// Creo la app de Express
const app = express();
// El puerto se obtiene de .env (por defecto 3000)
const PORT = process.env.PORT || 3000;

// Habilito CORS para permitir peticiones del frontend
app.use(cors());
// Permito recibir y enviar JSON en las peticiones
app.use(express.json());

// Enruto las APIs de autenticación, usuarios y logs en sus respectivos endpoints
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/logs", logsRouter);

// Conecto a MongoDB usando la variable de entorno MONGO_URI
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    // Si la conexión es correcta, arranco el servidor Express
    app.listen(PORT, () =>
      console.log(`Servidor backend corriendo en puerto ${PORT}`)
    );
  })
  .catch((err) => {
    // Si falla la conexión, informo y cierro el proceso
    console.error(err);
    process.exit(1);
  });
