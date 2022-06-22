import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.scss";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogOut() {
    setError("");
    try {
      await logout();
      navigate("/");
    } catch {
      setError("Failed to logout");
    }
  }
  return (
    <>
      <h2>Profile</h2>
      {error && <div>{error}</div>}
      <strong>Email:</strong> {currentUser.email}
      <Link to="/update-profile">Update Profile</Link>
      <div>Dashboard</div>
      <button onClick={handleLogOut}>Log Out</button>
    </>
  );
}
