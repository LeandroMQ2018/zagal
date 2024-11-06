// src/api/auth.js

// URL base para la API, donde se realizarán las solicitudes
const API_URL = "http://localhost:4000/api";

// Función para registrar un nuevo usuario
export const registerUser = async (userData) => {
  // Realiza una solicitud POST a la ruta /register
  const response = await fetch(`${API_URL}/register`, {
    method: "POST", // Método HTTP utilizado para la solicitud
    headers: { "Content-Type": "application/json" }, // Establece el tipo de contenido a JSON
    body: JSON.stringify(userData), // Convierte los datos del usuario a formato JSON
  });
  
  // Devuelve la respuesta en formato JSON
  return response.json();
};

// Función para iniciar sesión de un usuario
export const loginUser = async (credentials) => {
  // Realiza una solicitud POST a la ruta /login
  const response = await fetch(`${API_URL}/login`, {
    method: "POST", // Método HTTP utilizado para la solicitud
    headers: { "Content-Type": "application/json" }, // Establece el tipo de contenido a JSON
    body: JSON.stringify(credentials), // Convierte las credenciales a formato JSON
  });
  
  // Devuelve la respuesta en formato JSON
  return response.json();
};
