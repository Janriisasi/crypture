import React from "react";
import {AnimatePresence} from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/loginpage";
import Homepage from "./pages/homepage";
import Formpage from "./pages/formpage";

//Protected Route
const ProtectedRoute = ({ children }) => {
  // Check if user is logged in
  const isAuthenticated = localStorage.getItem('user') !== null;
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If authenticated, error
  return children;
};

const App = () => {
  return (
    <AnimatePresence mode={"wait"}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route 
          path="/homepage" 
          element={
            <ProtectedRoute>
              <Homepage />
              <Formpage />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/homepage" />} />
      </Routes>
    </Router>
    </AnimatePresence>
  );
}

export default App;