import React from "react";
import AuthForm from "../../components/Auth/AuthForm";
import Image from "../../assets/images/svg/illus_00001.svg";

import "./AuthPage.css";

const AuthPage: React.FC = () => {
    return (
        <div className="authWrapper">
            <div className="authImage">
                <img src={Image} alt="Library" />
            </div>
            <div className="authForm">
                <AuthForm />
            </div>
        </div>
    );
};

export default AuthPage;
