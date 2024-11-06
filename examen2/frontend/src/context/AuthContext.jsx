import React, { createContext, useState } from "react";

// Crea un contexto para la autenticación
export const AuthContext = createContext();

// Componente proveedor de contexto para manejar la autenticación
export const AuthProvider = ({ children }) => {
  // Establece el token inicial desde localStorage si existe, de lo contrario será null
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Función para iniciar sesión y guardar el token
  const login = (jwtToken) => {
    localStorage.setItem("token", jwtToken); // Guarda el token en localStorage
    setToken(jwtToken); // Actualiza el estado de token con el nuevo valor
  };

  // Función para cerrar sesión y eliminar el token
  const logout = () => {
    localStorage.removeItem("token"); // Elimina el token de localStorage
    setToken(null); // Resetea el estado de token a null
  };

  // Proporciona el token y las funciones de login y logout a los componentes hijos
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
