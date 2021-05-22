import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./UpdateProfile.css";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="account-container">
      <h2 className="update-title">Update Profile</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          ref={emailRef}
          required
          defaultValue={currentUser.email}
        />
        <label>Password</label>
        <input
          type="password"
          ref={passwordRef}
          placeholder="Leave blank to keep same password"
        />
        <label>Password Confirmation</label>
        <input
          type="password"
          ref={passwordConfirmRef}
          placeholder="Leave blank to keep same password"
        />
        <button disabled={loading} className="account-button" type="submit">
          Update
        </button>
      </form>
      <Link className="account-link" to="/dashboard">
        Cancel
      </Link>
    </div>
  );
}
