import React from "react";
import { useAuth } from "../../contexts/AuthContext";

import "./Navbar.css";

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                {user ? (
                    <>
                        {user.role === "admin" && (
                            <li>
                                <a href="/admin">Admin Dashboard</a>
                            </li>
                        )}
                        {user.role === "user" && (
                            <li>
                                <a href="/dashboard">User Dashboard</a>
                            </li>
                        )}
                        <li>
                            <button onClick={logout} className="logout-button">
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <li>
                        <a href="/login">Login</a>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
