import React, { createContext, useContext, useState, useEffect } from "react";

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

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            try {
                const decoded: { id: number; role: "user" | "admin" } =
                    JSON.parse(atob(savedToken.split(".")[1]));
                setUser({ id: decoded.id, role: decoded.role });
                setToken(savedToken);
            } catch (error) {
                console.error("Failed to parse token:", error);
                localStorage.removeItem("token");
            }
        }
    }, []);

    const login = (newToken: string) => {
        try {
            const decoded: { id: number; role: "user" | "admin" } = JSON.parse(
                atob(newToken.split(".")[1])
            );
            setUser({ id: decoded.id, role: decoded.role });
            setToken(newToken);
            localStorage.setItem("token", newToken);
        } catch (error) {
            console.error("Failed to decode token during login:", error);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
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
