import User from "../models/user.model.js"; 
import bcrypt from "bcryptjs"; 
import jwt from "jsonwebtoken"; 
import { config } from "../config.js";

// Función para registrar un nuevo usuario
export const register = async (req, res) => {
  const { email, password, nombre } = req.body; // Desestructura el cuerpo de la solicitud
  try {
    // Verifica si el correo ya está registrado en la base de datos
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" }); // Respuesta de error si el correo ya existe
    }

    // Hash de la contraseña utilizando bcrypt
    const passwordHash = await bcrypt.hash(password, 10);
    // Crea un nuevo usuario con los datos proporcionados
    const newUser = new User({
      email,
      password: passwordHash,
      nombre,
    });
    // Guarda el nuevo usuario en la base de datos
    await newUser.save();
    res.json({ message: "Usuario registrado exitosamente" }); // Respuesta de éxito
  } catch (error) {
    console.error("Error al registrar usuario:", error); // Registro del error
    res.status(500).json({ message: "Error al registrar usuario" }); // Respuesta de error genérica
  }
};

// Función para iniciar sesión de un usuario
export const login = async (req, res) => {
  const { email, password } = req.body; // Desestructura el cuerpo de la solicitud
  try {
    // Busca el usuario en la base de datos por su correo
    const user = await User.findOne({ email });
    // Verifica si el usuario existe y si la contraseña es correcta
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales incorrectas" }); // Respuesta de error si las credenciales son incorrectas
    }
    // Genera un token JWT usando el secreto configurado y el ID del usuario
    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: "1d" });
    res.cookie("token", token); // Guarda el token en una cookie
    res.json({ message: "Login exitoso", token }); // Respuesta de éxito que incluye el token
  } catch (error) {
    console.error("Error al iniciar sesión:", error); // Registro del error
    res.status(500).json({ message: "Error al iniciar sesión" }); // Respuesta de error genérica
  }
};
