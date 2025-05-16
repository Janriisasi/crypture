import React from "react";
import {AnimatePresence} from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage";
import Formpage from "./pages/formpage";

const App = () => {
  return (
    <AnimatePresence mode={"wait"}>
    <Router>
      <Routes>
        <Route 
          path="/homepage" 
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
      </Routes>
    </Router>
    </AnimatePresence>
  );
}

export default App;