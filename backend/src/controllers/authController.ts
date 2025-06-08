// Controlador de autenticación para la API REST de usuarios.
// Aquí implemento registro, login y logout, aplicando buenas prácticas de seguridad como hash de contraseñas y JWT.

import { Request, Response } from "express";
import { User } from "../models/User";
import { Log } from "../models/Log";
import bcrypt from "bcryptjs";         // Para cifrar y comparar contraseñas
import jwt from "jsonwebtoken";         // Para generar y verificar tokens JWT
import { AuthRequest } from "../middleware/authMiddleware"; // Tipado para acceder al usuario autenticado en logout
import { io } from "../index";          // Importo el socket.io exportado en index.ts

// Registro de usuario. (Solo lo uso para pruebas, el registro no está expuesto por defecto)
export const register = async (req: Request, res: Response) => {
  const { nombre, password, email } = req.body;
  const hash = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ nombre, password: hash, email });
    res.json({ id: user._id, nombre: user.nombre, email: user.email });
  } catch (err) {
    res.status(400).json({ error: "Email ya registrado" });
  }
};

// Login de usuario
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ error: "No existe usuario" });
    return;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(401).json({ error: "Credenciales inválidas" });
    return;
  }

  // Genero JWT de sesión
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "2h" });

  // Guardo log de conexión (login = true)
  const newLog = await Log.create({ usuario: user._id, login: true });

  // Websockets: Emite evento "nuevo-log" a todos los clientes conectados (¡poblado con usuario para mostrar bonito!)
  const populatedLog = await Log.findById(newLog._id).populate("usuario", "nombre email");
  io.emit("nuevo-log", populatedLog);

  res.json({
    token,
    user: { id: user._id, nombre: user.nombre, email: user.email }
  });
};

// Logout de usuario
export const logout = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;
  const newLog = await Log.create({ usuario: userId, login: false });

  // Websockets: Emite evento "nuevo-log" de logout a todos los clientes
  const populatedLog = await Log.findById(newLog._id).populate("usuario", "nombre email");
  io.emit("nuevo-log", populatedLog);

  res.json({ msg: "Logout registrado" });
};
