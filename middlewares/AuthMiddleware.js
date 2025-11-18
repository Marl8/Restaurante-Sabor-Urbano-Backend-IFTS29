import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token){
        return res.status(401).json({ message: "Token requerido" });
    } 

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // contiene { id, role }
        next();
        } catch (error) {
            res.status(403).json({ message: "Token inválido" });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user.role !== "Admin") {
        return res.status(403).json({ message: "Acceso denegado: Rol Admin requerido" });
    }
    next();
};