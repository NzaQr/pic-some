import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Dashboard.css";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <div className="account-container">
      <h2 className="account-title">Profile</h2>
      {error && <p className="error">{error}</p>}
      <p className="profile-info">
        <strong>Email:</strong>
        {`${currentUser.email}`}
      </p>
      <Link to="/update-profile" className="account-link">
        Update Profile
      </Link>
      <div className="w-100 text-center mt-2">
        <button
          className="account-button profile-button"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
