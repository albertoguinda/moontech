// Middleware de autenticación JWT para proteger rutas privadas.
// Si el token es válido, añade el usuario al request. Si no, bloquea el acceso.

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extiendo la interfaz Request para incluir la propiedad user
export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Extraigo el header Authorization
  const header = req.headers.authorization;

  // Si no existe, devuelvo error 401
  if (!header) {
    res.status(401).json({ error: "Token requerido" });
    return; // Importante: hago return para evitar que siga el flujo
  }

  // El token llega como 'Bearer <token>', así que divido por el espacio
  const token = header.split(" ")[1];

  try {
    // Verifico el token usando la clave secreta
    const user = jwt.verify(token, process.env.JWT_SECRET as string);

    // Asigno el usuario extraído del token a la request para usarlo en los controladores
    req.user = user;

    next(); // Continúo con la ejecución del siguiente middleware/controlador
  } catch (err) {
    // Si el token no es válido, devuelvo error 401
    res.status(401).json({ error: "Token inválido" });
    return;
  }
};
