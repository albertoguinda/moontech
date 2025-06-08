// Cargar variables de entorno desde .env
import dotenv from "dotenv";
dotenv.config();

// Importar dependencias de Express y Socket.IO
import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import mongoose from "mongoose";

// Importar rutas principales de la app
import { authRouter } from "./routes/auth";   // Rutas de autenticación
import { usersRouter } from "./routes/users"; // Rutas de usuarios
import { logsRouter } from "./routes/logs";   // Rutas de logs

// Conexión a MongoDB usando la URI del .env
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/moontech")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => {
    console.error("Error al conectar a MongoDB:", err);
    process.exit(1);
  });

// Crear app de Express y el servidor HTTP
const app = express();
app.use(cors());           // Permitir CORS en desarrollo
app.use(express.json());   // Parsear JSON automáticamente

// Rutas de la API REST
app.use("/api/auth", authRouter);      // Endpoints de auth
app.use("/api/users", usersRouter);    // Endpoints de usuarios
app.use("/api/logs", logsRouter);      // Endpoints de logs

// Crear el servidor HTTP y el servidor de WebSockets
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: "*" }, // Permitir cualquier origen (¡ojo en producción!)
});

// Exportar io para emitir logs o eventos en tiempo real desde controladores
export { io };

// Eventos WebSocket (opcional, pero recomendado para depuración)
io.on("connection", (socket) => {
  console.log("Cliente conectado a WebSocket:", socket.id);
  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// 6. Arrancar el servidor en el puerto configurado
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
