import React from "react";
import LoginForm from "../components/LoginForm";

const Login: React.FC = () => {
    return (
        <div className="login-page">
            <h1>Welcome to the Library</h1>
            <LoginForm />
        </div>
    );
};

export default Login;
