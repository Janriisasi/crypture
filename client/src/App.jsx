import React from "react";
import {AnimatePresence} from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/loginpage";
import Homepage from "./pages/homepage";
import Formpage from "./pages/formpage";

// Custom query param handler
const HomepageWithToast = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const action = queryParams.get('action');
  
  return <Homepage initialAction={action} />;
};

//Protected Route
const ProtectedRoute = ({ children }) => {
  // Check if user is logged in
  const isAuthenticated = localStorage.getItem('user') !== null;
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If authenticated, render children
  return children;
};

const App = () => {
  return (
    <AnimatePresence mode={"wait"}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/homepage" 
          element={
            <ProtectedRoute>
              <HomepageWithToast />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/formpage" 
          element={
            <ProtectedRoute>
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