import mongoose from "mongoose"; 
import { config } from "./config.js"; 

// Función asíncrona para establecer la conexión a la base de datos
export const connectDB = async () => {
  try {
    // Intenta conectarse a MongoDB usando la URI de configuración
    await mongoose.connect(config.mongoURI); 
    console.log("Conexión a MongoDB exitosa"); // Mensaje de éxito al conectar
  } catch (error) {
    // Manejo de errores en caso de fallo en la conexión
    console.error("Error al conectar a MongoDB", error); 
  }
};
