// Importa Router de Express para definir rutas
import { Router } from "express";
// Importa funciones para la validación de datos
import { body, validationResult } from "express-validator";
// Importa los controladores de autenticación
import { register, login } from "../controllers/auth.controller.js";

// Crea una instancia del enrutador
const router = Router();

// Ruta para el registro de un nuevo usuario
router.post(
  "/register",
  [
    // Validaciones para el campo email
    body("email")
      .isEmail()
      .withMessage("Ingrese un email válido"), // Mensaje de error personalizado

    // Validaciones para el campo password
    body("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"), // Mensaje de error personalizado
  ],
  (req, res, next) => {
    // Verifica si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() }); // Responde con un error 400 y los detalles de los errores
    }
    next(); // Si no hay errores, continúa al siguiente middleware
  },
  register // Llama al controlador de registro
);

// Ruta para el inicio de sesión
router.post(
  "/login",
  [
    // Validaciones para el campo email
    body("email").isEmail(),

    // Validación para el campo password
    body("password").notEmpty(),
  ],
  login // Llama al controlador de inicio de sesión
);

// Exporta el enrutador para que se pueda utilizar en otras partes de la aplicación
export default router;
