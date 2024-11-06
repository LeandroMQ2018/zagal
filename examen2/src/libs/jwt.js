import jwt from "jsonwebtoken"; 
import { config } from "../config.js"; 

// Función para crear un token de acceso
export const createAccessToken = (payload) => {
  // Genera y devuelve un token firmado usando el payload proporcionado
  return jwt.sign(payload, config.jwtSecret, { expiresIn: "1d" }); // El token expirará en 1 día
};
