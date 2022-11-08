import React from "react";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />{" "}
      </Routes>
    </div>
  );
}


export default App;
