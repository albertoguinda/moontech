import { Router } from "express";
import { register, login, logout } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

// Defino las rutas de autenticación.
// Registro y login están abiertos. Logout requiere autenticación previa.
export const authRouter = Router();

authRouter.post("/register", register); // Registro de nuevos usuarios
authRouter.post("/login", login);       // Login de usuario
authRouter.post("/logout", authMiddleware, logout); // Logout (protegido)
