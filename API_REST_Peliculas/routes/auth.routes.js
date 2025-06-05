const express = require('express');
const router = express.Router();

const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const SECRET_KEY = process.env.SECRET_KEY || "tu_clave_secreta_jwt";
const client = new OAuth2Client("757470978448-8sp8rbnl0ffpt5rfnh3k59dokm675s91.apps.googleusercontent.com");

// Helpers
function camposRequeridos(obj, campos) {
  return campos.every(campo => obj[campo]);
}

function formatearUsuario(usuario) {
  return {
    id: usuario._id,
    email: usuario.email,
    nombre: usuario.nombre,
    rol: usuario.rol,
  };
}

async function crearUsuario({ email, nombre, clave, rol }) {
  const existe = await Usuario.findOne({ email });
  if (existe) throw new Error("Email ya registrado");

  const nuevoUsuario = new Usuario({ email, nombre, clave, rol });
  await nuevoUsuario.save();
  return nuevoUsuario;
}

// POST /signup - Solo si se envía un rol explícito
router.post('/signup', async (req, res) => {
  const { email, nombre, clave, rol } = req.body;

  if (!camposRequeridos(req.body, ['email', 'nombre', 'clave', 'rol'])) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  const rolesPermitidos = ['usuario', 'docente', 'administrador'];
  if (!rolesPermitidos.includes(rol)) {
    return res.status(400).json({ message: `Rol inválido. Solo se permiten: ${rolesPermitidos.join(', ')}` });
  }

  try {
    const usuario = await crearUsuario({ email, nombre, clave, rol });
    res.status(201).json({ message: "Usuario creado correctamente", usuario: formatearUsuario(usuario) });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST /registro - Para registros públicos, rol por defecto es 'usuario'
router.post('/registro', async (req, res) => {
  console.log("BODY recibido en /registro:", req.body);

  // Extraer campos desde el body
  const { email, nombre, clave,rol } = req.body;
  // const rol = req.body.rol || 'usuario'; // Usa 'usuario' si no se proporciona

  // Verificación de campos obligatorios
  if (!email || !nombre || !clave || !rol) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  // Validar que el rol esté dentro de los permitidos
  const rolesPermitidos = ['usuario', 'docente', 'administrador'];
  if (!rolesPermitidos.includes(rol)) {
    return res.status(400).json({
      message: `Rol inválido. Solo se permiten: ${rolesPermitidos.join(', ')}`
    });
  }

  try {
    // Verifica si ya existe el correo
    const existente = await Usuario.findOne({ email });
    if (existente) {
      return res.status(400).json({ message: "Email ya registrado" });
    }

    // Crear nuevo usuario
    const usuario = await crearUsuario({ email, nombre, clave, rol });

    // Respuesta exitosa
    res.status(201).json({
      message: "Usuario registrado correctamente",
      usuario: formatearUsuario(usuario)
    });
  } catch (error) {
    console.error("Error en /registro:", error);
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  const { email, clave } = req.body;

  if (!camposRequeridos(req.body, ['email', 'clave'])) {
    return res.status(400).json({ message: "Email y clave son obligatorios" });
  }

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(401).json({ message: "Usuario no encontrado" });

    const claveValida = await usuario.validarClave(clave);
    if (!claveValida) return res.status(401).json({ message: "Clave incorrecta" });

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, nombre: usuario.nombre, rol: usuario.rol },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login exitoso", token, usuario: formatearUsuario(usuario) });
  } catch (error) {
    res.status(500).json({ message: error.message || "Error en el servidor" });
  }
});

// POST /google - Login con Google
router.post('/google', async (req, res) => {
  const { idToken } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: "757470978448-8sp8rbnl0ffpt5rfnh3k59dokm675s91.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;

    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      usuario = new Usuario({
        email,
        nombre: name,
        clave: googleId,
        rol: 'docente', // por defecto si es nuevo
      });
      await usuario.save();
    }

    const token = jwt.sign({
      id: usuario._id,
      email: usuario.email,
      nombre: usuario.nombre,
      rol: usuario.rol
    }, SECRET_KEY, { expiresIn: "1h" });

    res.json({
      message: "Login con Google exitoso",
      token,
      usuario: formatearUsuario(usuario)
    });
  } catch (error) {
    res.status(401).json({ message: "Token de Google inválido" });
  }
});

module.exports = router;