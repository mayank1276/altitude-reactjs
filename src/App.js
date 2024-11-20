import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Welcome from "./components/welcome";
import "./App.css";

function App() {
  return (
    <Routes>
    <Route path="/" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/welcome" element={<Welcome />} />
  </Routes>
  );
}

export default App;
