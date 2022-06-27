import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import List from "../List/List";
import ListElement from "../listElement/ListElement";
import { onAuthStateChanged } from "firebase/auth";
import "./dashboard.scss";
import { auth } from "../../dataBase/firebase";

export default function Dashboard() {
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserName(user.email);
    } else {
      setUserName("No logged user");
    }
  });

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
      {userName}
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
