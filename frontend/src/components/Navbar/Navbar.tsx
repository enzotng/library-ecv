import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { MagnifyingGlass, UserCircle } from "phosphor-react";

import "./Navbar.css";

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="/">MyLibrary</a>
            </div>

            <div className="navbar-search">
                <input type="text" placeholder="Rechercher un livre..." />
                <button>
                    <MagnifyingGlass size={20} color="#252525" />
                </button>
            </div>

            <div className="navbar-right">
                {user ? (
                    <div className="profile">
                        <a href="/profile">
                            <UserCircle size={32} />
                        </a>
                        <button onClick={logout} className="logout-button">
                            Logout
                        </button>
                    </div>
                ) : (
                    <button onClick={() => (window.location.href = "/login")}>Login</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
