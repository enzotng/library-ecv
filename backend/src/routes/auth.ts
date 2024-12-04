import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { users } from "../models/users";

const authRoutes = express.Router();
const SECRET_KEY = "your-secret-key";

authRoutes.post("/login", (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
        expiresIn: "1h",
    });

    res.status(200).json({ token });
});

const authenticateToken = (req: any, res: Response, next: () => void) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "Access denied" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

const authorizeRole =
    (role: "user" | "admin") => (req: any, res: Response, next: () => void) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };

export { authRoutes, authenticateToken, authorizeRole };
