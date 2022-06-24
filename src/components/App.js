import React from "react";

import SignUp from "./signup/SignUp";
import Dashboard from "./dashboard/Dashboard";
import Login from "./login/Login";
import ForgotPassword from "./forgotpassword/ForgotPassword";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateProfile from "./updateprofile/UpdateProfile";
import Workout from "./workout/Workout";
import "./app.scss";

function App() {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/dashboard/workout" element={<Workout />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
