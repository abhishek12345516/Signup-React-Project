import React, { useState } from "react";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Profile from "./components/Profile";
import { hashPassword } from "./utils/crypto";


export default function App() {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("login"); // 'login' | 'signup'

  const handleSignup = () => setMode("login");
  const handleLogin = (user) => setUser(user);
  const handleLogout = () => setUser(null);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div style={{ minWidth: "400px" }}>
        {!user && mode === "signup" && <SignupForm onSignup={handleSignup} />}
        {!user && mode === "login" && <LoginForm onLogin={handleLogin} />}
        {user && <Profile user={user} onLogout={handleLogout} />}


        {!user && (
          <div className="text-center mt-3">
            {mode === "login" ? (
              <>
                <span>Don't have an account? </span>
                <button className="btn btn-link p-0" onClick={() => setMode("signup")}>
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <span>Already have an account? </span>
                <button className="btn btn-link p-0" onClick={() => setMode("login")}>
                  Login
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
