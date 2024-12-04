import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import "./AuthForm.css";

const AuthForm: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/auth/test")
            .then((res) => res.json())
            .then(console.log)
            .catch(console.error);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const url = isLogin ? "/auth/login" : "/auth/register";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "An error occurred");
            }

            const data = await response.json();

            if (isLogin) {
                login(data.token);

                const decoded: any = JSON.parse(atob(data.token.split(".")[1]));
                navigate(decoded.role === "admin" ? "/admin" : "/dashboard");
            } else {
                alert("Account created successfully! You can now log in.");
                setIsLogin(true);
            }
        } catch (err: any) {
            setError(err.message || "An error occurred");
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-form-title">{isLogin ? "Login" : "Sign Up"}</h2>
            <form onSubmit={handleSubmit} className="auth-form-content">
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="auth-input" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="auth-input" />
                {error && <p className="auth-error">{error}</p>}
                <button type="submit" className="auth-button">
                    {isLogin ? "Login" : "Sign Up"}
                </button>
            </form>
            <div className="auth-toggle">
                {isLogin ? (
                    <p>
                        Don't have an account?{" "}
                        <button type="button" onClick={() => setIsLogin(false)} className="auth-toggle-button">
                            Sign Up
                        </button>
                    </p>
                ) : (
                    <p>
                        Already have an account?{" "}
                        <button type="button" onClick={() => setIsLogin(true)} className="auth-toggle-button">
                            Login
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
};

export default AuthForm;
