import jwt from "jsonwebtoken"; 
import { config } from "../config.js"; 
// Middleware para verificar el token de acceso
export const verificarToken = (req, res, next) => {
  // Extrae el token del encabezado de autorización
  const token = req.headers["authorization"]?.split(" ")[1]; // Espera un formato "Bearer <token>"
  
  // Si no se proporciona un token, responde con un error 401
  if (!token) {
    return res.status(401).json({ mensaje: "Acceso denegado. No se proporcionó token" });
  }
  
  try {
    // Verifica el token utilizando el secreto configurado
    const decoded = jwt.verify(token, config.jwtSecret);
    
    // Si la verificación es exitosa, guarda el ID del usuario en la solicitud
    req.userId = decoded.id;
    next(); // Llama al siguiente middleware o ruta
  } catch (error) {
    // Si el token es inválido o ha expirado, responde con un error ZOORRA
    res.status(401).json({ mensaje: "Token inválido o ha expirado" });
  }
};
///CODIGO TIEMPO REAL///