import mongoose, { Document, Schema } from "mongoose";

/**
 * Modelo de usuario para la colección 'users'.
 * Defino aquí la estructura de los documentos de usuario:
 *  - nombre: Alfanumérico, requerido.
 *  - password: Alfanumérico, requerido, se almacena cifrado con bcrypt.
 *  - email: Único y requerido.
 *  - activo: Booleano, por defecto true.
 */
export interface IUser extends Document {
  nombre: string;
  password: string;
  email: string;
  activo: boolean;
}

const UserSchema: Schema = new Schema({
  nombre:   { type: String, required: true },
  password: { type: String, required: true }, // Siempre guardo hash, nunca plano.
  email:    { type: String, unique: true, required: true },
  activo:   { type: Boolean, default: true },
});

export const User = mongoose.model<IUser>("User", UserSchema);
