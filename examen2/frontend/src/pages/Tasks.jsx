import React, { useContext, useEffect, useState } from "react"; 
import { AuthContext } from "../context/AuthContext"; 
import { getTasks, createTask, updateTask, deleteTask } from "../api/task"; 
import { useParams } from "react-router-dom"; 
import './Tasks.css'; 

const Tasks = () => {
  const { token } = useContext(AuthContext); // Obtiene el token del contexto
  const { projectId } = useParams(); // Obtiene el ID del proyecto de los parámetros de la URL
  const [tasks, setTasks] = useState([]); // Estado para las tareas
  const [newTask, setNewTask] = useState({ // Estado para la nueva tarea
    titulo: "",
    descripcion: "",
    estado: "pendiente",
    prioridad: 3,
  });
  const [editingTask, setEditingTask] = useState(null); // Estado para manejar la tarea en edición

  // Efecto para obtener las tareas al cargar el componente
  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getTasks(projectId, token); // Llama a la API para obtener las tareas
      setTasks(tasksData); // Actualiza el estado con los datos de las tareas
    };
    fetchTasks();
  }, [projectId, token]); // Dependencias del efecto

  // Maneja la creación o actualización de una tarea
  const handleCreateOrUpdateTask = async (e) => {
    e.preventDefault(); // Previene la recarga de la página
    if (editingTask) {
      // Actualiza la tarea existente
      const updatedTask = await updateTask(editingTask._id, newTask, token);
      setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))); // Actualiza el estado con la tarea editada
      setEditingTask(null); // Resetea el estado de edición
    } else {
      // Crea una nueva tarea
      const newTaskData = await createTask(projectId, newTask, token);
      setTasks([...tasks, newTaskData]); // Añade la nueva tarea al estado
    }
    setNewTask({ titulo: "", descripcion: "", estado: "pendiente", prioridad: 3 }); // Resetea el formulario
  };

  // Maneja la edición de una tarea
  const handleEditTask = (task) => {
    setNewTask(task); // Rellena el formulario con los datos de la tarea a editar
    setEditingTask(task); // Establece la tarea en edición
  };

  // Maneja la eliminación de una tarea
  const handleDeleteTask = async (id) => {
    await deleteTask(id, token); // Llama a la API para eliminar la tarea
    setTasks(tasks.filter((task) => task._id !== id)); // Actualiza el estado para eliminar la tarea
  };

  // Maneja cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Extrae el nombre y valor del input
    setNewTask((prevData) => ({ ...prevData, [name]: value })); // Actualiza el estado de la nueva tarea
  };

  return (
    <div>
      <h1>Tarea</h1>
      <button onClick={() => setEditingTask(null)}>agregar tarea</button> {/* Botón para agregar una nueva tarea */}

      <form onSubmit={handleCreateOrUpdateTask}> {/* Formulario para crear o editar tareas */}
        <input
          type="text"
          name="titulo"
          placeholder="Título de la tarea"
          value={newTask.titulo}
          onChange={handleInputChange} // Maneja el cambio en el input
          required // Campo obligatorio
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción de la tarea"
          value={newTask.descripcion}
          onChange={handleInputChange} // Maneja el cambio en el input
        />
        <select name="estado" value={newTask.estado} onChange={handleInputChange}> {/* Selección para el estado de la tarea */}
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En Progreso</option>
          <option value="completada">Completada</option>
        </select>
        <input
          type="number"
          name="prioridad"
          placeholder="Prioridad"
          min="1"
          max="5"
          value={newTask.prioridad}
          onChange={handleInputChange} // Maneja el cambio en el input
        />
        <button type="submit">{editingTask ? "Actualizar Tarea" : "Guardar Tarea"}</button> {/* Cambia el texto del botón según el modo */}
      </form>

      <ul>
        {tasks.map((task) => ( // Mapea sobre las tareas para mostrarlas
          <li key={task._id}>
            <strong>{task.titulo}</strong> - {task.descripcion}
            <button onClick={() => handleEditTask(task)}>Editar</button> {/* Botón para editar la tarea */}
            <button onClick={() => handleDeleteTask(task._id)}>Eliminar</button> {/* Botón para eliminar la tarea */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks; // Exporta el componente Tasks
