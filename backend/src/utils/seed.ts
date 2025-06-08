import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/User";
import bcrypt from "bcryptjs";

// Cargo variables de entorno (incluyendo MONGO_URI) desde el archivo .env.
// Así evito hardcodear credenciales sensibles en el código fuente.
dotenv.config();

// Me conecto a MongoDB utilizando la URI definida en el .env.
// Uso async/await y manejo de errores para asegurar una conexión robusta.
mongoose.connect(process.env.MONGO_URI as string).then(async () => {
  // Compruebo si ya existe un usuario admin para no duplicar el seeding.
  const exists = await User.findOne({ email: "admin@moontech.com" });
  if (!exists) {
    // Si no existe, creo el usuario admin con contraseña cifrada usando bcrypt.
    const hash = await bcrypt.hash("123456", 10);
    await User.create({ 
      nombre: "Admin", 
      password: hash, 
      email: "admin@moontech.com", 
      activo: true 
    });
    console.log("Usuario admin creado");
  } else {
    // Si ya existe, solo informo por consola.
    console.log("Usuario admin ya existe");
  }
  // Finalizo el proceso (es solo un script de seed inicial).
  process.exit();
}).catch(err => {
  // Si la conexión falla, informo el error y fuerzo la salida del proceso.
  console.error("Error conectando a la base de datos:", err);
  process.exit(1);
});
