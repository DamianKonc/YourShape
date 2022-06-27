import React from "react";
import { db } from "../dataBase/firebase";

import SignUp from "./signup/SignUp";
import Dashboard from "./dashboard/Dashboard";
import Login from "./login/Login";
import ForgotPassword from "./forgotpassword/ForgotPassword";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateProfile from "./updateprofile/UpdateProfile";
import Workout from "./workout/Workout";
import YourResults from "./yourResults/YourResults";
import Chest from "./chest/Chest";
import Back from "./back/Back";
import Legs from "./legs/Legs";
import Belly from "./belly/Belly";
import Biceps from "./biceps/Biceps";
import Triceps from "./triceps/Triceps";
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
            <Route path="/dashboard/yourresults" element={<YourResults />} />
            <Route path="/dashboard/workout/chest" element={<Chest />} />
            <Route path="/dashboard/workout/back" element={<Back />} />
            <Route path="/dashboard/workout/legs" element={<Legs />} />
            <Route path="/dashboard/workout/belly" element={<Belly />} />
            <Route path="/dashboard/workout/biceps" element={<Biceps />} />
            <Route path="/dashboard/workout/triceps" element={<Triceps />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
