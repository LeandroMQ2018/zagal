import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import './Register.css'; 

const Register = () => {
  const navigate = useNavigate(); // Inicializa el hook de navegación
  const [formData, setFormData] = useState({ // Estado para los datos del formulario
    nombre: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState(""); // Estado para manejar errores

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target; // Extrae el nombre y valor del input
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Actualiza el estado del formulario
  };

  // Maneja el registro del usuario
  const handleRegister = async (e) => {
    e.preventDefault(); // Previene la recarga de la página
    setError(""); // Resetea el mensaje de error

    const response = await registerUser(formData); // Llama a la API para registrar el usuario
    if (response.message === "Usuario registrado exitosamente") {
      navigate("/login"); // Redirige al usuario a la página de login si el registro fue exitoso
    } else if (response.message === "El correo ya está registrado") {
      setError("El correo ya está en uso. Intenta con otro."); // Muestra un error si el correo ya está en uso
    } else {
      setError("Error al registrar el usuario"); // Muestra un error genérico en caso de fallo
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      <form onSubmit={handleRegister}> {/* Formulario de registro */}
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange} // Maneja el cambio en el input
          placeholder="Nombre"
          required // Campo obligatorio
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange} // Maneja el cambio en el input
          placeholder="Correo electrónico"
          required // Campo obligatorio
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange} // Maneja el cambio en el input
          placeholder="Contraseña"
          required // Campo obligatorio
        />
        <button type="submit">Registrarse</button> {/* Botón para enviar el formulario */}
      </form>
      {error && <p>{error}</p>} {/* Muestra el mensaje de error si existe */}

      <button onClick={() => navigate("/login")}>¿Ya tienes cuenta? Inicia sesión</button> {/* Navega a la página de inicio de sesión */}
    </div>
  );
};

export default Register; // Exporta el componente Register
