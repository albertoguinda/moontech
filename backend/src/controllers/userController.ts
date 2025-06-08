// Controlador para la gestión CRUD de usuarios en la aplicación.
// Todas las rutas deberían estar protegidas con autenticación JWT (ver middleware).

import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";

// GET /api/users
// Devuelve todos los usuarios (sin el campo password, por seguridad)
export const getUsers = async (_req: Request, res: Response) => {
  try {
    // Excluyo el campo password de la consulta
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error obteniendo usuarios" });
  }
};

// POST /api/users
// Crea un usuario con contraseña cifrada
export const createUser = async (req: Request, res: Response) => {
  const { nombre, password, email, activo } = req.body;
  try {
    // Cifro la contraseña antes de guardar
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ nombre, password: hash, email, activo });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Error creando usuario. ¿Quizá email ya registrado?" });
  }
};

// PUT /api/users/:id
// Actualiza un usuario, cifra la nueva contraseña solo si se indica
export const updateUser = async (req: Request, res: Response) => {
  const { nombre, password, email, activo } = req.body;
  const update: any = { nombre, email, activo };
  try {
    // Si envían password, la cifro antes de guardar
    if (password) update.password = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select("-password");
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Error actualizando usuario" });
  }
};

// DELETE /api/users/:id
// Borra un usuario por su id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "Usuario eliminado" });
  } catch (err) {
    res.status(400).json({ error: "Error eliminando usuario" });
  }
};
