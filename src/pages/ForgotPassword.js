import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions.");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <div className="account-container">
      <h1 className="reset-title">Password Reset</h1>
      {error && <p>{error}</p>}
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <label>Email address</label>
        <input type="email" ref={emailRef} required />
        <button disabled={loading} className="account-button" type="submit">
          Reset Password
        </button>
      </form>
      <div className="account-help">
        <Link className="account-link" to="/login">
          Log in
        </Link>
      </div>
      <div className="account-help">
        Need an account?{" "}
        <Link className="account-link" to="/signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
