// Modelo Mongoose para almacenar logs de conexiones (login/logout) de usuarios.
// Cada log almacena fecha, referencia al usuario y tipo de evento (login/logout).

import mongoose, { Document, Schema, Types } from "mongoose";

// Interface para los logs, ayuda con el tipado en TypeScript
export interface ILog extends Document {
  fecha: Date;                // Fecha del evento
  usuario: Types.ObjectId;    // Referencia al usuario (populado en la consulta)
  login: boolean;             // true si es login, false si es logout
}

// Definición del esquema para los logs
const LogSchema: Schema = new Schema({
  fecha: { type: Date, default: Date.now },                 // Por defecto: ahora
  usuario: { type: Schema.Types.ObjectId, ref: "User" },    // Relación con colección users
  login: { type: Boolean, required: true },                 // true (login) / false (logout)
});

// Exporto el modelo listo para usar en controladores
export const Log = mongoose.model<ILog>("Log", LogSchema);
