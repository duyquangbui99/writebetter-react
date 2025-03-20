import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import googleIcon from "../assets/google-icon.svg";

const Login = () => {
    const { user, signIn, signOutUser } = useAuth();
    const navigate = useNavigate(); // Initialize navigate function

    // Redirect to /editor if user is logged in
    useEffect(() => {
        if (user) {
            navigate("/editor"); // Redirect user to editor page
        }
    }, [user, navigate]);

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">WriteBetter</h1>
                <p className="login-subtitle">Enhance your writing with AI assistance</p>

                {user ? (
                    <div className="login-user-info">
                        <p className="welcome-message">Welcome, {user.displayName} to WriteBetter!</p>
                        <button className="signout-button" onClick={signOutUser}>Sign Out</button>
                    </div>
                ) : (
                    <div className="login-actions">
                        <button className="login-button" onClick={signIn}>
                            <img className="google-icon" src={googleIcon} alt="Google" />
                            Sign in with Google
                        </button>
                        <p className="login-helper-text">Sign in to save your work and access advanced features</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
