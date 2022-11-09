import React from "react";
import Login from "./pages/Login/Login";
import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />{" "}
        <Route path="/" element={<Navigate to='/login' />} />{" "}
      </Routes>
    </div>
  );
}


export default App;
