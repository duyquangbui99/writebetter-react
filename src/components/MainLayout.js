import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/MainLayout.css";

const MainLayout = ({ children }) => {
    const { user, signOutUser } = useAuth();
    const navigate = useNavigate();

    // Handle Sign Out
    const handleSignOut = async () => {
        console.log(user);
        // await signOutUser();
        // navigate("/"); // Redirect to Login
    };

    return (
        <div className="main-layout">
            {/* Top Navigation Bar */}
            <div className="navbar">
                <h1 className="app-title">Write Better</h1>
                {user && (
                    <button className="signout-button" onClick={handleSignOut}>
                        Sign Out
                    </button>
                )}
            </div>

            {/* Main Content Area */}
            <div className="content">
                {children} {/* This renders the page inside MainLayout */}
            </div>
        </div>
    );
};

export default MainLayout;
