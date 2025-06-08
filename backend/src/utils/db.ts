import mongoose from "mongoose";

/**
 * Utilidad para conectar a MongoDB usando la variable de entorno MONGO_URI.
 * Uso: llamo a esta función al iniciar la app para asegurar que la base de datos está conectada.
 */
export const connectDB = async () => {
  return mongoose.connect(process.env.MONGO_URI as string);
};
