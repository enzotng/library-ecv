import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    id: number;
    role: "user" | "admin";
}

interface AuthContextProps {
    user: User | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            const decoded: any = JSON.parse(atob(savedToken.split(".")[1]));
            setUser({ id: decoded.id, role: decoded.role });
            setToken(savedToken);
        }
    }, []);

    const login = (newToken: string) => {
        const decoded: any = JSON.parse(atob(newToken.split(".")[1]));
        setUser({ id: decoded.id, role: decoded.role });
        setToken(newToken);
        localStorage.setItem("token", newToken);

        if (decoded.role === "admin") {
            navigate("/admin");
        } else {
            navigate("/dashboard");
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
