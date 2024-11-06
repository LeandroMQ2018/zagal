

// URL base para la API, donde se realizarán las solicitudes
const API_URL = "http://localhost:4000/api";

// Función para crear un nuevo proyecto
export const createProject = async (projectData) => {
  // Realiza una solicitud POST a la ruta /proyectos
  const response = await fetch(`${API_URL}/proyectos`, {
    method: "POST", // Método HTTP utilizado para la solicitud
    headers: {
      "Content-Type": "application/json", // Indica que se está enviando un objeto JSON
    },
    body: JSON.stringify(projectData), // Convierte los datos del proyecto a formato JSON
  });
  
  // Devuelve la respuesta en formato JSON
  return response.json();
};

// Función para obtener todos los proyectos
export const getProjects = async () => {
  // Realiza una solicitud GET a la ruta /proyectos
  const response = await fetch(`${API_URL}/proyectos`, {
    method: "GET", // Método HTTP utilizado para la solicitud
    headers: {
      "Content-Type": "application/json", // Indica que se espera un objeto JSON
    },
  });
  
  // Devuelve la respuesta en formato JSON
  return response.json();
};

// Función para actualizar un proyecto existente
export const updateProject = async (id, projectData, token) => {
  // Realiza una solicitud PUT a la ruta /proyectos/:id
  const response = await fetch(`${API_URL}/proyectos/${id}`, {
    method: "PUT", // Método HTTP utilizado para la solicitud
    headers: {
      "Content-Type": "application/json", // Indica que se está enviando un objeto JSON
      Authorization: `Bearer ${token}`, // Incluye el token de autorización en la cabecera
    },
    body: JSON.stringify(projectData), // Convierte los datos del proyecto a formato JSON
  });
  
  // Devuelve la respuesta en formato JSON
  return response.json();
};

// Función para eliminar un proyecto
export const deleteProject = async (id, token) => {
  // Realiza una solicitud DELETE a la ruta /proyectos/:id
  const response = await fetch(`${API_URL}/proyectos/${id}`, {
    method: "DELETE", // Método HTTP utilizado para la solicitud
    headers: {
      Authorization: `Bearer ${token}`, // Incluye el token de autorización en la cabecera
    },
  });
  
  // Devuelve la respuesta en formato JSON
  return response.json();
};
