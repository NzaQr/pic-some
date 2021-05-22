import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Login.css";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard");
    } catch {
      setError("Incorrect email or password.");
    }
    setLoading(false);
  };

  return (
    <div className="account-container">
      <h1 className="account-title">Log in</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email address</label>
        <input type="email" ref={emailRef} required />
        <label>Password</label>
        <input type="password" ref={passwordRef} required />
        <button disabled={loading} className="account-button" type="submit">
          Log in
        </button>
      </form>
      <Link className="forgot-password" to="/forgot-password">
        Forgot Password?
      </Link>
      <div className="account-help">
        Need an account?{" "}
        <Link className="account-link" to="/signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
