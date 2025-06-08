import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

// Defino el router de usuarios. Todas las rutas están protegidas por autenticación JWT.
export const usersRouter = Router();

usersRouter.use(authMiddleware); // Aplico protección de rutas para requerir autenticación

usersRouter.get("/", getUsers);       // GET /api/users - Listado de usuarios (sin contraseñas)
usersRouter.post("/", createUser);    // POST /api/users - Crear usuario nuevo (cifrado)
usersRouter.put("/:id", updateUser);  // PUT /api/users/:id - Actualizar datos de un usuario (cifra nueva password si se pasa)
usersRouter.delete("/:id", deleteUser); // DELETE /api/users/:id - Eliminar usuario

// Todas las rutas cumplen con las buenas prácticas REST y aplican control de acceso desde middleware.
