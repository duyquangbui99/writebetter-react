import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "../styles/Login.css";
import googleIcon from "../assets/google-icon.svg";

const Login = () => {
    const { user, signIn, signOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const initUser = async () => {
            if (!user) return;

            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                const now = new Date().toISOString();
                const userData = {
                    personal_info: {
                        name: user.displayName || "No Name",
                        email: user.email || "No Email",
                    },
                    personal_preference: {
                        theme: "default",
                        fontSize: "medium",
                    },
                    sys_user_info: {
                        accountCreated: now,
                        lastLogin: now,
                    },
                    // ✅ Initialize editors array
                    editors: []
                };
                await setDoc(userRef, userData);
                console.log("New user profile created with editors array");
            } else {
                console.log("User already exists");
            }

            // Redirect after login
            navigate("/editor");
        };

        initUser();
    }, [user, navigate]);

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">WriteBetter</h1>
                <p className="login-subtitle">Enhance your writing with AI assistance</p>

                {user ? (
                    <div className="login-user-info">
                        <p className="welcome-message">
                            Welcome, {user.displayName || "User"} to WriteBetter!
                        </p>
                        <button className="signout-button" onClick={signOutUser}>
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div className="login-actions">
                        <button className="login-button" onClick={signIn}>
                            <img className="google-icon" src={googleIcon} alt="Google" />
                            Sign in with Google
                        </button>
                        <p className="login-helper-text">
                            Sign in to save your work and access advanced features
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
