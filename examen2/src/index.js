import app from "./app.js"; 
import { connectDB } from "./db.js"; 
import { config } from "./config.js"; 

// Llama a la función para establecer la conexión a la base de datos
connectDB(); 

// Inicia el servidor en el puerto especificado en la configuración
app.listen(config.port, () => {
  console.log(`Servidor corriendo en el puerto ${config.port}`); // Mensaje de confirmación de que el servidor está activo
});
