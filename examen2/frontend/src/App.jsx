import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom"; 
import { useContext } from "react"; 
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 
import Projects from "./pages/Projects"; 
import Tasks from "./pages/Tasks"; 
import './App.css'; 

// Componente para proteger rutas
const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext); // Obtiene el token del contexto
  return token ? children : <Navigate to="/login" />; // Si hay un token, permite el acceso; de lo contrario, redirige a /login
};

// Barra de navegación con el botón de cerrar sesión
const Navbar = () => {
  const { logout } = useContext(AuthContext); // Obtiene la función de cerrar sesión del contexto

  return (
    <nav>
      <Link to="/projects">Projects</Link> {/* Enlace a la página de proyectos */}
      <button onClick={logout}>Cerrar Sesión</button> {/* Botón para cerrar sesión */}
    </nav>
  );
};

function App() {
  const { token } = useContext(AuthContext); // Obtiene el token del contexto

  return (
    <Router>
      {token && <Navbar />} {/* Muestra el navbar solo si el usuario está autenticado */}
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Navigate to="/register" />} /> {/* Redirige a la página de registro por defecto */}
        <Route path="/login" element={<Login />} /> {/* Ruta para inicio de sesión */}
        <Route path="/register" element={<Register />} /> {/* Ruta para registro */}

        {/* Rutas protegidas */}
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects /> {/* Solo accesible si el usuario está autenticado */}
            </PrivateRoute>
          }
        />
        <Route
          path="/projects/:projectId/tasks"
          element={
            <PrivateRoute>
              <Tasks /> {/* Solo accesible si el usuario está autenticado */}
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App; // Exporta el componente App
