import React from "react";
import {AnimatePresence} from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/loginpage";
import Homepage from "./pages/homepage";
import Formpage from "./pages/formpage";

function App() {
  return (
    <AnimatePresence mode={"wait"}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/form" element={<Formpage />} />
      </Routes>
    </Router>
    </AnimatePresence>
  );
}

export default App;