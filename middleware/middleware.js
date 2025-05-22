// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica que el token exista y esté en el formato correcto
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verifica y decodifica el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Puedes acceder luego a req.user.id, por ejemplo
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }
};

export default authMiddleware;
