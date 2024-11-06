import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";
import rutasAuth from "./routes/auth.routes.js";
import rutasProyecto from "./routes/proyecto.routes.js";
import rutasTarea from "./routes/tarea.routes.js";

// Crea una instancia de la aplicación Express
const app = express();

// Middleware para habilitar CORS en todas las rutas
app.use(cors());

// Middleware para registrar las solicitudes HTTP en la consola
app.use(morgan("dev"));

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// Middleware para parsear cookies de las solicitudes
app.use(cookieParser());

// Define las rutas de la API, agrupándolas bajo el prefijo "/api"
app.use("/api", rutasAuth); // Rutas de autenticación
app.use("/api", rutasProyecto); // Rutas de proyectos
app.use("/api", rutasTarea); // Rutas de tareas

// Middleware para manejar errores
app.use(errorHandler);

// Exporta la aplicación para que pueda ser utilizada en otros archivos
export default app;