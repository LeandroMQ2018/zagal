
// URL base para la API, donde se realizarán las solicitudes
const API_URL = "http://localhost:4000/api";

// Función para crear una nueva tarea en un proyecto específico
export const createTask = async (projectId, taskData, token) => {
  // Realiza una solicitud POST a la ruta /proyectos/:projectId/tareas
  const response = await fetch(`${API_URL}/proyectos/${projectId}/tareas`, {
    method: "POST", // Método HTTP utilizado para la solicitud
    headers: {
      "Content-Type": "application/json", // Indica que se está enviando un objeto JSON
      Authorization: `Bearer ${token}`, // Incluye el token de autorización en la cabecera
    },
    body: JSON.stringify(taskData), // Convierte los datos de la tarea a formato JSON
  });
  
  // Devuelve la respuesta en formato JSON
  return response.json();
};

// Función para obtener todas las tareas de un proyecto específico
export const getTasks = async (projectId, token) => {
  // Realiza una solicitud GET a la ruta /proyectos/:projectId/tareas
  const response = await fetch(`${API_URL}/proyectos/${projectId}/tareas`, {
    method: "GET", // Método HTTP utilizado para la solicitud
    headers: {
      Authorization: `Bearer ${token}`, // Incluye el token de autorización en la cabecera
    },
  });
  
  // Devuelve la respuesta en formato JSON
  return response.json();
};

// Función para actualizar una tarea existente
export const updateTask = async (taskId, taskData, token) => {
  // Realiza una solicitud PUT a la ruta /tareas/:taskId
  const response = await fetch(`${API_URL}/tareas/${taskId}`, {
    method: "PUT", // Método HTTP utilizado para la solicitud
    headers: {
      "Content-Type": "application/json", // Indica que se está enviando un objeto JSON
      Authorization: `Bearer ${token}`, // Incluye el token de autorización en la cabecera
    },
    body: JSON.stringify(taskData), // Convierte los datos de la tarea a formato JSON
  });
  
  // Devuelve la respuesta en formato JSON
  return response.json();
};

// Función para eliminar una tarea
export const deleteTask = async (taskId, token) => {
  // Realiza una solicitud DELETE a la ruta /tareas/:taskId
  const response = await fetch(`${API_URL}/tareas/${taskId}`, {
    method: "DELETE", // Método HTTP utilizado para la solicitud
    headers: {
      Authorization: `Bearer ${token}`, // Incluye el token de autorización en la cabecera
    },
  });
  
  // Devuelve la respuesta en formato JSON
  return response.json();
};
