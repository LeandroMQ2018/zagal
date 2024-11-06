import dotenv from "dotenv"; 
dotenv.config(); // Carga las variables de entorno desde un archivo .env

// Exporta la configuración como un objeto
export const config = {
  port: process.env.PORT || 4000, // Establece el puerto, por defecto es 4000
  mongoURI: process.env.MONGODB_URI, // URI de conexión a la base de datos MongoDB
  jwtSecret: process.env.JWT_SECRET, // Clave secreta para firmar tokens JWT, debe estar definida
};
