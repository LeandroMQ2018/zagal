import Proyecto from "../models/proyecto.model.js"; 
// Función para crear un nuevo proyecto
export const crearProyecto = async (req, res) => {
  const { nombre, descripcion, fechaInicio, fechaFin } = req.body; // Desestructura los datos del cuerpo de la solicitud
  try {
    // Crea una nueva instancia del modelo Proyecto con los datos recibidos
    const nuevoProyecto = new Proyecto({
      nombre,
      descripcion,
      fechaInicio,
      fechaFin,
    });
    // Guarda el nuevo proyecto en la base de datos
    const proyectoGuardado = await nuevoProyecto.save();
    // Responde con el proyecto guardado
    res.json(proyectoGuardado);
  } catch (error) {
    console.error("Error al crear el proyecto:", error); // Registra el error en la consola del backend
    res.status(500).json({ mensaje: "Error al crear el proyecto" }); // Responde con un error genérico
  }
};

// Función para obtener todos los proyectos de un usuario
export const obtenerProyectos = async (req, res) => {
  // Busca todos los proyectos relacionados con el ID de usuario almacenado en `req.userId`
  const proyectos = await Proyecto.find({ usuario: req.userId });
  // Responde con la lista de proyectos
  res.json(proyectos);
};

// Función para actualizar un proyecto existente
export const actualizarProyecto = async (req, res) => {
  // Busca el proyecto por su ID y actualiza sus datos con el cuerpo de la solicitud
  const proyectoActualizado = await Proyecto.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // Devuelve el proyecto actualizado
  });
  // Responde con el proyecto actualizado
  res.json(proyectoActualizado);
};

// Función para eliminar un proyecto
export const eliminarProyecto = async (req, res) => {
  // Busca y elimina el proyecto por su ID
  await Proyecto.findByIdAndDelete(req.params.id);
  // Responde con un mensaje de éxito
  res.json({ mensaje: "Proyecto eliminado correctamente" });
};
