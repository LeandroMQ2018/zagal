// Importa mongoose para interactuar con MongoDB
import mongoose from "mongoose";

// Define el esquema para el modelo User
const userSchema = new mongoose.Schema(
  {
    // Nombre del usuario (obligatorio)
    nombre: {
      type: String, // Tipo de dato String
      required: true, // Este campo es obligatorio
      trim: true, // Elimina espacios en blanco al inicio y al final
    },
    // Correo electrónico del usuario (obligatorio y único)
    email: {
      type: String, // Tipo de dato String
      required: true, // Este campo es obligatorio
      unique: true, // El valor debe ser único en la colección
    },
    // Contraseña del usuario (obligatorio)
    password: {
      type: String, // Tipo de dato String
      required: true, // Este campo es obligatorio
    },
  },
  {
    timestamps: true, // Agrega campos createdAt y updatedAt automáticamente
  }
);

// Exporta el modelo User
export default mongoose.model("User", userSchema);
