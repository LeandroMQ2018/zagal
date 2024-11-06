// Importa mongoose para trabajar con MongoDB
import mongoose from "mongoose";

// Define el esquema para el modelo Tarea
const tareaSchema = new mongoose.Schema(
  {
    // Referencia al proyecto al que pertenece la tarea (obligatorio)
    proyecto: {
      type: mongoose.Schema.Types.ObjectId, // Tipo ObjectId para referenciar otro documento
      ref: "Proyecto", // Referencia al modelo Proyecto
      required: true, // Este campo es obligatorio
    },
    // Título de la tarea (obligatorio)
    titulo: {
      type: String, // Tipo de dato String
      required: true, // Este campo es obligatorio
      trim: true, // Elimina espacios en blanco al inicio y al final
    },
    // Descripción de la tarea (opcional)
    descripcion: {
      type: String, // Tipo de dato String
      trim: true, // Elimina espacios en blanco
      default: "", // Valor por defecto es una cadena vacía
    },
    // Estado de la tarea (opcional)
    estado: {
      type: String, // Tipo de dato String
      enum: ["pendiente", "en progreso", "completada"], // Valores permitidos
      default: "pendiente", // Valor por defecto es "pendiente"
    },
    // Prioridad de la tarea (opcional)
    prioridad: {
      type: Number, // Tipo de dato Number
      min: 1, // Valor mínimo permitido es 1
      max: 5, // Valor máximo permitido es 5
      default: 3, // Valor por defecto es 3
    },
  },
  {
    timestamps: true, // Agrega campos createdAt y updatedAt automáticamente
  }
);

// Exporta el modelo Tarea
export default mongoose.model("Tarea", tareaSchema);
