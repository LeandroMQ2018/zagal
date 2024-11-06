
import mongoose from "mongoose";

// Define el esquema para el modelo Proyecto
const proyectoSchema = new mongoose.Schema(
  {
    // Referencia al usuario que creó el proyecto (opcional)
    usuario: {
      type: mongoose.Schema.Types.ObjectId, // Tipo ObjectId para referenciar a otro documento
      ref: "User", // Referencia al modelo User
      required: false, // Cambiado a false, ya que no es obligatorio
    },
    // Nombre del proyecto (obligatorio)
    nombre: {
      type: String, // Tipo de dato String
      required: true, // Este campo es obligatorio
      trim: true, // Elimina espacios en blanco al inicio y al final
    },
    // Descripción del proyecto (opcional)
    descripcion: {
      type: String, // Tipo de dato String
      trim: true, // Elimina espacios en blanco
      default: "", // Valor por defecto es una cadena vacía
    },
    // Fecha de inicio del proyecto (opcional)
    fechaInicio: {
      type: Date, // Tipo de dato Date
    },
    // Fecha de finalización del proyecto (opcional)
    fechaFin: {
      type: Date, // Tipo de dato Date
    },
  },
  {
    timestamps: true, // Agrega campos createdAt y updatedAt automáticamente
  }
);

// Exporta el modelo Proyecto
export default mongoose.model("Proyecto", proyectoSchema);
