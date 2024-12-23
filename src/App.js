import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import React Router
import AppCard from "./AppCard";
import LummiApp from "./Lummiapp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppCard />} /> {/* Main page with AppCard */}
        <Route path="/lummiapp" element={<LummiApp />} /> {/* Page for LummiApp */}
      </Routes>
    </Router>
  );
}

export default App;
