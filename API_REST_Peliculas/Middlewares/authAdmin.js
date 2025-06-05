const jwt = require('jsonwebtoken');
const JWT_SECRET = 'tu_clave_secreta_jwt';

const authAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.rol.toLowerCase() !== 'administrador') {
        return res.status(403).json({ message: 'Acceso denegado: se requiere rol admin' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};

module.exports = authAdmin;
