import React from "react";
import {AnimatePresence} from "framer-motion";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage";
import Formpage from "./pages/formpage";

const App = () => {
  return (
    <AnimatePresence mode={"wait"}>
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
              <Homepage />
          } 
        />
        <Route 
          path="/formpage" 
          element={
              <Formpage />
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    </AnimatePresence>
  );
}

export default App;