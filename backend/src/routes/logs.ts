import { Router } from "express";
import { getLogs } from "../controllers/logController";
import { authMiddleware } from "../middleware/authMiddleware";

// Todas las rutas de logs están protegidas, solo accesibles para usuarios autenticados.
export const logsRouter = Router();

logsRouter.use(authMiddleware); // Aplico el middleware de autenticación a todas las rutas de este router

logsRouter.get("/", getLogs); // Recupero todos los logs de conexiones desde la base de datos
