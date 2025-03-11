import React from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { user, signIn, signOutUser } = useAuth();

    return (
        <div>
            <h1>Login</h1>
            {user ? (
                <>
                    <p>Welcome, {user.displayName}!</p>
                    <button onClick={signOutUser}>Sign Out</button>
                </>
            ) : (
                <button onClick={signIn}>Sign in with Google</button>
            )}
        </div>
    );
};

export default Login;
