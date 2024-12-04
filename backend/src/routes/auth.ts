import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { users, User } from "../models/users";
import dotenv from "dotenv";
dotenv.config();

const authRoutes = express.Router();

const SECRET_KEY = process.env.SECRET_KEY || "default-fallback-key";

authRoutes.get("/test", (req: Request, res: Response) => {
    res.json({ message: "Proxy is working" });
});

authRoutes.post("/register", (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
    }

    const newUser: User = {
        id: users.length + 1,
        username,
        password,
        role: "user",
    };

    users.push(newUser);

    res.status(201).json({ message: "User registered successfully" });
});

authRoutes.post("/login", (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
        expiresIn: "1h",
    });

    res.status(200).json({ token });
});

export { authRoutes };
