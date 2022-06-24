import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import List from "../List/List";
import ListElement from "../listElement/ListElement";
import YourResults from "../yourResults/YourResults";
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
      <Logo></Logo>
      {error && <div>{error}</div>}
      <strong>Email:</strong> {currentUser.email}
      <List>
        <ListElement>
          <Link className="list-el-link" to="/dashboard/workout">
            Workout
          </Link>
        </ListElement>
        <ListElement>
          {" "}
          <Link className="list-el-link" to="/dashboard/yourresults">
            Your results
          </Link>
        </ListElement>
        <ListElement>
          <Link className="list-el-link" to="/update-profile">
            Update profile
          </Link>
        </ListElement>
        <ListElement className="dashboard-btn-container">
          <button className="dashboard-btn" onClick={handleLogOut}>
            Log Out
          </button>
        </ListElement>
      </List>
    </>
  );
}
