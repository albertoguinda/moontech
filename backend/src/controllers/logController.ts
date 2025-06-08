// Controlador para logs de conexión/desconexión de usuarios.
// Este endpoint permite a un administrador consultar todos los logs, incluyendo información del usuario (poblada).

import { Request, Response } from "express";
import { Log } from "../models/Log";

// GET /api/logs
export const getLogs = async (_req: Request, res: Response) => {
  try {
    // Busco todos los logs y hago populate del usuario (solo nombre y email, sin datos sensibles)
    const logs = await Log.find().populate("usuario", "nombre email");

    // Devuelvo los logs en formato JSON
    res.json(logs);
  } catch (error) {
    // Gestión básica de errores (mejorable en entorno productivo)
    res.status(500).json({ error: "No se pudieron obtener los logs" });
  }
};
