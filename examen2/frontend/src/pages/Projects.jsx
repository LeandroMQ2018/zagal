import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext"; 
import { getProjects, createProject, updateProject, deleteProject } from "../api/project"; 
import { useNavigate } from "react-router-dom"; 
import './Projects.css'; 

const Projects = () => {
  const { token } = useContext(AuthContext); // Obtiene el token de autenticación
  const [projects, setProjects] = useState([]); // Estado para la lista de proyectos
  const [showForm, setShowForm] = useState(false); // Estado para mostrar/ocultar el formulario
  const [newProject, setNewProject] = useState({ // Estado para los datos del nuevo proyecto
    nombre: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
  });
  const [editingProject, setEditingProject] = useState(null); // Estado para el proyecto que se está editando
  const navigate = useNavigate(); // Inicializa el hook de navegación

  // Efecto para obtener la lista de proyectos al cargar el componente
  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData = await getProjects(token); 
      if (Array.isArray(projectsData)) {
        setProjects(projectsData); // Actualiza el estado con los proyectos
      } else {
        console.error("La respuesta de la API no es un array:", projectsData);
        setProjects([]); // Si la respuesta no es válida, resetea el estado
      }
    };
    fetchProjects();
  }, [token]); // Dependencia en el token

  // Maneja la creación o actualización de un proyecto
  const handleCreateOrUpdateProject = async (e) => {
    e.preventDefault(); // Previene la recarga de la página
    if (editingProject) {
      // Actualiza un proyecto existente
      const updatedProject = await updateProject(editingProject._id, newProject, token);
      setProjects(projects.map((proj) => (proj._id === updatedProject._id ? updatedProject : proj))); // Actualiza la lista de proyectos
      setEditingProject(null); // Resetea el proyecto en edición
    } else {
      // Crea un nuevo proyecto
      const newProjectData = await createProject(newProject, token);
      setProjects([...projects, newProjectData]); // Agrega el nuevo proyecto a la lista
    }
    // Resetea el formulario
    setNewProject({ nombre: "", descripcion: "", fechaInicio: "", fechaFin: "" });
    setShowForm(false); // Oculta el formulario
  };

  // Maneja la edición de un proyecto
  const handleEditProject = (project) => {
    setNewProject(project); // Rellena el formulario con los datos del proyecto a editar
    setEditingProject(project); // Establece el proyecto en edición
    setShowForm(true); // Muestra el formulario
  };

  // Maneja la eliminación de un proyecto
  const handleDeleteProject = async (id) => {
    await deleteProject(id, token); // Llama a la API para eliminar el proyecto
    setProjects(projects.filter((project) => project._id !== id)); // Actualiza la lista de proyectos
  };

  // Maneja cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevData) => ({ ...prevData, [name]: value })); // Actualiza el estado del proyecto
  };

  return (
    <div>
      <h1>Proyecto</h1>
      <button onClick={() => setShowForm(!showForm)}>agregar proyecto</button> {/* Botón para mostrar/ocultar el formulario */}

      {showForm && (
        <form onSubmit={handleCreateOrUpdateProject}>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del proyecto"
            value={newProject.nombre}
            onChange={handleInputChange} // Maneja el cambio en el input
            required // Campo obligatorio
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción del proyecto"
            value={newProject.descripcion}
            onChange={handleInputChange} // Maneja el cambio en el input
          />
          <input
            type="date"
            name="fechaInicio"
            placeholder="Fecha de inicio"
            value={newProject.fechaInicio}
            onChange={handleInputChange} // Maneja el cambio en el input
          />
          <input
            type="date"
            name="fechaFin"
            placeholder="Fecha de fin"
            value={newProject.fechaFin}
            onChange={handleInputChange} // Maneja el cambio en el input
          />
          <button type="submit">{editingProject ? "Actualizar Proyecto" : "Guardar Proyecto"}</button> {/* Cambia el texto del botón según el modo */}
        </form>
      )}

      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <strong>{project.nombre}</strong> - {project.descripcion}
            <button onClick={() => handleEditProject(project)}>Editar</button> {/* Botón para editar el proyecto */}
            <button onClick={() => handleDeleteProject(project._id)}>Eliminar</button> {/* Botón para eliminar el proyecto */}
            <button onClick={() => navigate(`/projects/${project._id}/tasks`)}>Ver tarea</button> {/* Navega a la vista de tareas del proyecto */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects; // Exporta el componente Projects
