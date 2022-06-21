import React from "react";

import SignUp from "./SignUp";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/loginscreen" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
