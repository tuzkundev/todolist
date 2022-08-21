import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import ToDo from "./components/ToDo";

import { Routes, Route } from "react-router-dom";

import "./";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<ToDo />} />
      </Routes>
    </div>
  );
}

export default App;
