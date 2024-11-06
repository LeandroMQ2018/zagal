import React, { useContext, useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { loginUser } from "../api/auth"; 
import { AuthContext } from "../context/AuthContext"; 
import './Login.css'; 

const Login = () => {
  const navigate = useNavigate(); 
  const { login } = useContext(AuthContext); // Obtiene la función de login del contexto
  const [formData, setFormData] = useState({ email: "", password: "" }); // Estado para los datos del formulario

  // Maneja el cambio en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Actualiza el estado del formulario
  };

  // Maneja el envío del formulario
  const handleLogin = async (e) => {
    e.preventDefault(); // Previene la recarga de la página
    const response = await loginUser(formData); // Llama a la API para iniciar sesión
    if (response.token) {
      login(response.token); // Si hay un token, llama a la función de login del contexto
      navigate("/projects"); // Redirige al usuario a la página de proyectos
    } else {
      alert("Credenciales incorrectas"); // Alerta si las credenciales son incorrectas
    }
  };

  return (
    <div className="container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange} // Maneja el cambio en el input de email
          placeholder="Correo electrónico"
          required // Hace el campo obligatorio
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange} // Maneja el cambio en el input de contraseña
          placeholder="Contraseña"
          required // Hace el campo obligatorio
        />
        <button type="submit">Iniciar Sesión</button> {/* Botón para enviar el formulario */}
      </form>

      {/* Botón para navegar a la página de registro */}
      <button className="register-button" onClick={() => navigate("/register")}>Registrarse</button>
    </div>
  );
};

export default Login; // Exporta el componente Login
