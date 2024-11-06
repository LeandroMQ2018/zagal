// Middleware para manejar errores en la aplicación
export const errorHandler = (err, req, res, next) => {
  // Imprime el stack del error en la consola para facilitar el diagnóstico
  console.error(err.stack);
  
  // Envía una respuesta al cliente con el estado 500 (Error interno del servidor)
  res.status(500).json({ message: "Error interno del servidor" });
};
