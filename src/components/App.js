import React from "react";

import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
