// Importa Router de Express para definir rutas
import { Router } from "express";
// Importa los controladores para manejar la lógica de tareas
import { 
  crearTarea, 
  obtenerTareas, 
  actualizarTarea, 
  eliminarTarea 
} from "../controllers/tarea.controller.js";
// Importa el middleware para verificar tokens de autenticación
import { verificarToken } from "../middlewares/auth.middleware.js";

// Crea una instancia del enrutador
const router = Router();

// Ruta para crear una nueva tarea dentro de un proyecto específico
router.post("/proyectos/:proyectoId/tareas", verificarToken, crearTarea);

// Ruta para obtener todas las tareas de un proyecto específico
router.get("/proyectos/:proyectoId/tareas", verificarToken, obtenerTareas);

// Ruta para actualizar una tarea específica por ID
router.put("/tareas/:id", verificarToken, actualizarTarea);

// Ruta para eliminar una tarea específica por ID
router.delete("/tareas/:id", verificarToken, eliminarTarea);

// Exporta el enrutador para que se pueda utilizar en otras partes de la aplicación
export default router;
