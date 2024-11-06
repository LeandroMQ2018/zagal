import Tarea from "../models/tarea.model.js"; 

// Función para crear una nueva tarea
export const crearTarea = async (req, res) => {
  const { titulo, descripcion, estado, prioridad } = req.body; // Desestructura los datos del cuerpo de la solicitud
  try {
    // Crea una nueva instancia del modelo Tarea, vinculando la tarea al proyecto correspondiente
    const nuevaTarea = new Tarea({
      proyecto: req.params.proyectoId, // Usa el ID del proyecto del parámetro de la solicitud
      titulo,
      descripcion,
      estado,
      prioridad,
    });
    // Guarda la nueva tarea en la base de datos
    const tareaGuardada = await nuevaTarea.save();
    // Responde con la tarea guardada
    res.json(tareaGuardada);
  } catch (error) {
    // Maneja errores, respondiendo con el mensaje de error
    res.status(500).json({ mensaje: error.message });
  }
};

// Función para obtener todas las tareas de un proyecto
export const obtenerTareas = async (req, res) => {
  // Busca todas las tareas asociadas al ID del proyecto proporcionado
  const tareas = await Tarea.find({ proyecto: req.params.proyectoId });
  // Responde con la lista de tareas
  res.json(tareas);
};

// Función para actualizar una tarea existente
export const actualizarTarea = async (req, res) => {
  // Busca la tarea por su ID y actualiza sus datos con el cuerpo de la solicitud
  const tareaActualizada = await Tarea.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Devuelve la tarea actualizada
  });
  // Responde con la tarea actualizada
  res.json(tareaActualizada);
};

// Función para eliminar una tarea
export const eliminarTarea = async (req, res) => {
  // Busca y elimina la tarea por su ID
  await Tarea.findByIdAndDelete(req.params.id);
  // Responde con un mensaje de éxito
  res.json({ mensaje: "Tarea eliminada correctamente" });
};
