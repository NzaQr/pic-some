import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Signup.css";
export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account.");
    }
    setLoading(false);
  };

  return (
    <div className="account-container">
      <h1 className="signup-title">Sign Up</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" ref={emailRef} required />
        <label>Password</label>
        <input type="password" ref={passwordRef} required />
        <label>Password Confirm</label>
        <input type="password" ref={passwordConfirmRef} required />
        <button disabled={loading} className="account-button" type="submit">
          Sign Up
        </button>
      </form>
      <div className="account-help">
        Already have an account?{" "}
        <Link className="account-link" to="/login">
          Log In
        </Link>
      </div>
    </div>
  );
}
