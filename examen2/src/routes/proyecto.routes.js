// Importa Router de Express para definir rutas
import { Router } from "express";
// Importa los controladores para manejar la lógica de proyectos
import { 
  crearProyecto, 
  obtenerProyectos, 
  actualizarProyecto, 
  eliminarProyecto 
} from "../controllers/proyecto.controller.js";

// Crea una instancia del enrutador
const router = Router();

// Ruta para crear un nuevo proyecto
router.post("/proyectos", crearProyecto); // No requiere token

// Ruta para obtener todos los proyectos del usuario
router.get("/proyectos", obtenerProyectos); // No requiere token

// Ruta para actualizar un proyecto existente por ID
router.put("/proyectos/:id", actualizarProyecto); // No requiere token

// Ruta para eliminar un proyecto existente por ID
router.delete("/proyectos/:id", eliminarProyecto); // No requiere token

// Exporta el enrutador para que se pueda utilizar en otras partes de la aplicación
export default router;
